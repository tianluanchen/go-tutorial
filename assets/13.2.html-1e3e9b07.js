import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as s,c as a,a as i,d as t,w as l,b as e,e as v}from"./app-9da01d16.js";const u={},c=v(`<h1 id="_13-2-自定义路由器设计" tabindex="-1"><a class="header-anchor" href="#_13-2-自定义路由器设计" aria-hidden="true">#</a> 13.2 自定义路由器设计</h1><h2 id="http路由" tabindex="-1"><a class="header-anchor" href="#http路由" aria-hidden="true">#</a> HTTP路由</h2><p>HTTP路由组件负责将HTTP请求交到对应的函数处理(或者是一个struct的方法)，如前面小节所描述的结构图，路由在框架中相当于一个事件处理器，而这个事件包括：</p><ul><li>用户请求的路径(path)(例如:/user/123,/article/123)，当然还有查询串信息(例如?id=11)</li><li>HTTP的请求方法(method)(GET、POST、PUT、DELETE、PATCH等)</li></ul><p>路由器就是根据用户请求的事件信息转发到相应的处理函数(控制层)。</p><h2 id="默认的路由实现" tabindex="-1"><a class="header-anchor" href="#默认的路由实现" aria-hidden="true">#</a> 默认的路由实现</h2><p>在3.4小节有过介绍Go的http包的详解，里面介绍了Go的http包如何设计和实现路由，这里继续以一个例子来说明：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func fooHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, &quot;Hello, %q&quot;, html.EscapeString(r.URL.Path))
}

http.HandleFunc(&quot;/foo&quot;, fooHandler)

http.HandleFunc(&quot;/bar&quot;, func(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, &quot;Hello, %q&quot;, html.EscapeString(r.URL.Path))
})

log.Fatal(http.ListenAndServe(&quot;:8080&quot;, nil))

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子调用了http默认的DefaultServeMux来添加路由，需要提供两个参数，第一个参数是希望用户访问此资源的URL路径(保存在r.URL.Path)，第二参数是即将要执行的函数，以提供用户访问的资源。路由的思路主要集中在两点：</p><ul><li>添加路由信息</li><li>根据用户请求转发到要执行的函数</li></ul><p>Go默认的路由添加是通过函数<code>http.Handle</code>和<code>http.HandleFunc</code>等来添加，底层都是调用了<code>DefaultServeMux.Handle(pattern string, handler Handler)</code>,这个函数会把路由信息存储在一个map信息中<code>map[string]muxEntry</code>，这就解决了上面说的第一点。</p><p>Go监听端口，然后接收到tcp连接会扔给Handler来处理，上面的例子默认nil即为<code>http.DefaultServeMux</code>，通过<code>DefaultServeMux.ServeHTTP</code>函数来进行调度，遍历之前存储的map路由信息，和用户访问的URL进行匹配，以查询对应注册的处理函数，这样就实现了上面所说的第二点。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
for k, v := range mux.m {
	if !pathMatch(k, path) {
		continue
	}
	if h == nil || len(k) &gt; n {
		n = len(k)
		h = v.h
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="beego框架路由实现" tabindex="-1"><a class="header-anchor" href="#beego框架路由实现" aria-hidden="true">#</a> beego框架路由实现</h2><p>目前几乎所有的Web应用路由实现都是基于http默认的路由器，但是Go自带的路由器有几个限制：</p><ul><li>不支持参数设定，例如/user/:uid 这种泛类型匹配</li><li>无法很好的支持REST模式，无法限制访问的方法，例如上面的例子中，用户访问/foo，可以用GET、POST、DELETE、HEAD等方式访问</li><li>一般网站的路由规则太多了，编写繁琐。我前面自己开发了一个API应用，路由规则有三十几条，这种路由多了之后其实可以进一步简化，通过struct的方法进行一种简化</li></ul><p>beego框架的路由器基于上面的几点限制考虑设计了一种REST方式的路由实现，路由设计也是基于上面Go默认设计的两点来考虑：存储路由和转发路由</p><h3 id="存储路由" tabindex="-1"><a class="header-anchor" href="#存储路由" aria-hidden="true">#</a> 存储路由</h3><p>针对前面所说的限制点，我们首先要解决参数支持就需要用到正则，第二和第三点我们通过一种变通的方法来解决，REST的方法对应到struct的方法中去，然后路由到struct而不是函数，这样在转发路由的时候就可以根据method来执行不同的方法。</p><p>根据上面的思路，我们设计了两个数据类型controllerInfo(保存路径和对应的struct，这里是一个reflect.Type类型)和ControllerRegistor(routers是一个slice用来保存用户添加的路由信息，以及beego框架的应用信息)</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type controllerInfo struct {
	regex          *regexp.Regexp
	params         map[int]string
	controllerType reflect.Type
}

type ControllerRegistor struct {
	routers     []*controllerInfo
	Application *App
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ControllerRegistor对外的接口函数有</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (p *ControllerRegistor) Add(pattern string, c ControllerInterface)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>详细的实现如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (p *ControllerRegistor) Add(pattern string, c ControllerInterface) {
	parts := strings.Split(pattern, &quot;/&quot;)

	j := 0
	params := make(map[int]string)
	for i, part := range parts {
		if strings.HasPrefix(part, &quot;:&quot;) {
			expr := &quot;([^/]+)&quot;

			//a user may choose to override the defult expression
			// similar to expressjs: ‘/user/:id([0-9]+)’
 
			if index := strings.Index(part, &quot;(&quot;); index != -1 {
				expr = part[index:]
				part = part[:index]
			}
			params[j] = part
			parts[i] = expr
			j++
		}
	}

	//recreate the url pattern, with parameters replaced
	//by regular expressions. then compile the regex

	pattern = strings.Join(parts, &quot;/&quot;)
	regex, regexErr := regexp.Compile(pattern)
	if regexErr != nil {

		//TODO add error handling here to avoid panic
		panic(regexErr)
		return
	}

	//now create the Route
	t := reflect.Indirect(reflect.ValueOf(c)).Type()
	route := &amp;controllerInfo{}
	route.regex = regex
	route.params = params
	route.controllerType = t

	p.routers = append(p.routers, route)

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="静态路由实现" tabindex="-1"><a class="header-anchor" href="#静态路由实现" aria-hidden="true">#</a> 静态路由实现</h3><p>上面我们实现的动态路由的实现，Go的http包默认支持静态文件处理FileServer，由于我们实现了自定义的路由器，那么静态文件也需要自己设定，beego的静态文件夹路径保存在全局变量StaticDir中，StaticDir是一个map类型，实现如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (app *App) SetStaticPath(url string, path string) *App {
	StaticDir[url] = path
	return app
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用中设置静态路径可以使用如下方式实现：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
beego.SetStaticPath(&quot;/img&quot;,&quot;/static/img&quot;)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="转发路由" tabindex="-1"><a class="header-anchor" href="#转发路由" aria-hidden="true">#</a> 转发路由</h3><p>转发路由是基于ControllerRegistor里的路由信息来进行转发的，详细的实现如下代码所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// AutoRoute
func (p *ControllerRegistor) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	defer func() {
		if err := recover(); err != nil {
			if !RecoverPanic {
				// go back to panic
				panic(err)
			} else {
				Critical(&quot;Handler crashed with error&quot;, err)
				for i := 1; ; i += 1 {
					_, file, line, ok := runtime.Caller(i)
					if !ok {
						break
					}
					Critical(file, line)
				}
			}
		}
	}()
	var started bool
	for prefix, staticDir := range StaticDir {
		if strings.HasPrefix(r.URL.Path, prefix) {
			file := staticDir + r.URL.Path[len(prefix):]
			http.ServeFile(w, r, file)
			started = true
			return
		}
	}
	requestPath := r.URL.Path

	//find a matching Route
	for _, route := range p.routers {

		//check if Route pattern matches url
		if !route.regex.MatchString(requestPath) {
			continue
		}

		//get submatches (params)
		matches := route.regex.FindStringSubmatch(requestPath)

		//double check that the Route matches the URL pattern.
		if len(matches[0]) != len(requestPath) {
			continue
		}

		params := make(map[string]string)
		if len(route.params) &gt; 0 {
			//add url parameters to the query param map
			values := r.URL.Query()
			for i, match := range matches[1:] {
				values.Add(route.params[i], match)
				params[route.params[i]] = match
			}

			//reassemble query params and add to RawQuery
			r.URL.RawQuery = url.Values(values).Encode() + &quot;&amp;&quot; + r.URL.RawQuery
			//r.URL.RawQuery = url.Values(values).Encode()
		}
		//Invoke the request handler
		vc := reflect.New(route.controllerType)
		init := vc.MethodByName(&quot;Init&quot;)
		in := make([]reflect.Value, 2)
		ct := &amp;Context{ResponseWriter: w, Request: r, Params: params}
		in[0] = reflect.ValueOf(ct)
		in[1] = reflect.ValueOf(route.controllerType.Name())
		init.Call(in)
		in = make([]reflect.Value, 0)
		method := vc.MethodByName(&quot;Prepare&quot;)
		method.Call(in)
		if r.Method == &quot;GET&quot; {
			method = vc.MethodByName(&quot;Get&quot;)
			method.Call(in)
		} else if r.Method == &quot;POST&quot; {
			method = vc.MethodByName(&quot;Post&quot;)
			method.Call(in)
		} else if r.Method == &quot;HEAD&quot; {
			method = vc.MethodByName(&quot;Head&quot;)
			method.Call(in)
		} else if r.Method == &quot;DELETE&quot; {
			method = vc.MethodByName(&quot;Delete&quot;)
			method.Call(in)
		} else if r.Method == &quot;PUT&quot; {
			method = vc.MethodByName(&quot;Put&quot;)
			method.Call(in)
		} else if r.Method == &quot;PATCH&quot; {
			method = vc.MethodByName(&quot;Patch&quot;)
			method.Call(in)
		} else if r.Method == &quot;OPTIONS&quot; {
			method = vc.MethodByName(&quot;Options&quot;)
			method.Call(in)
		}
		if AutoRender {
			method = vc.MethodByName(&quot;Render&quot;)
			method.Call(in)
		}
		method = vc.MethodByName(&quot;Finish&quot;)
		method.Call(in)
		started = true
		break
	}

	//if no matches to url, throw a not found exception
	if started == false {
		http.NotFound(w, r)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用入门" tabindex="-1"><a class="header-anchor" href="#使用入门" aria-hidden="true">#</a> 使用入门</h3><p>基于这样的路由设计之后就可以解决前面所说的三个限制点，使用的方式如下所示：</p><p>基本的使用注册路由：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
beego.BeeApp.RegisterController(&quot;/&quot;, &amp;controllers.MainController{})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>参数注册：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
beego.BeeApp.RegisterController(&quot;/:param&quot;, &amp;controllers.UserController{})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正则匹配：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
beego.BeeApp.RegisterController(&quot;/users/:uid([0-9]+)&quot;, &amp;controllers.UserController{})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,42);function o(m,b){const n=r("RouterLink");return s(),a("div",null,[c,i("ul",null,[i("li",null,[t(n,{to:"/build-web-app/preface.html"},{default:l(()=>[e("目录")]),_:1})]),i("li",null,[e("上一章: "),t(n,{to:"/build-web-app/13.1.html"},{default:l(()=>[e("项目规划")]),_:1})]),i("li",null,[e("下一节: "),t(n,{to:"/build-web-app/13.3.html"},{default:l(()=>[e("controller设计")]),_:1})])])])}const g=d(u,[["render",o],["__file","13.2.html.vue"]]);export{g as default};
