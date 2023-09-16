import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as a,c as t,a as n,d,w as r,b as e,e as u}from"./app-9da01d16.js";const v={},c=u(`<h1 id="_3-4-go的http包详解" tabindex="-1"><a class="header-anchor" href="#_3-4-go的http包详解" aria-hidden="true">#</a> 3.4 Go的http包详解</h1><p>前面小节介绍了Go怎么样实现了Web工作模式的一个流程，这一小节，我们将详细地解剖一下http包，看它到底是怎样实现整个过程的。</p><p>Go的http有两个核心功能：Conn、ServeMux</p><h2 id="conn的goroutine" tabindex="-1"><a class="header-anchor" href="#conn的goroutine" aria-hidden="true">#</a> Conn的goroutine</h2><p>与我们一般编写的http服务器不同, Go为了实现高并发和高性能, 使用了goroutines来处理Conn的读写事件, 这样每个请求都能保持独立，相互不会阻塞，可以高效的响应网络事件。这是Go高效的保证。</p><p>Go在等待客户端请求里面是这样写的：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
c, err := srv.newConn(rw)
if err != nil {
	continue
}
go c.serve()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们可以看到客户端的每次请求都会创建一个Conn，这个Conn里面保存了该次请求的信息，然后再传递到对应的handler，该handler中便可以读取到相应的header信息，这样保证了每个请求的独立性。</p><h2 id="servemux的自定义" tabindex="-1"><a class="header-anchor" href="#servemux的自定义" aria-hidden="true">#</a> ServeMux的自定义</h2><p>我们前面小节讲述conn.server的时候，其实内部是调用了http包默认的路由器，通过路由器把本次请求的信息传递到了后端的处理函数。那么这个路由器是怎么实现的呢？</p><p>它的结构如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type ServeMux struct {
	mu sync.RWMutex   //锁，由于请求涉及到并发处理，因此这里需要一个锁机制
	m  map[string]muxEntry  // 路由规则，一个string对应一个mux实体，这里的string就是注册的路由表达式
	hosts bool // 是否在任意的规则中带有host信息
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面看一下muxEntry</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type muxEntry struct {
	explicit bool   // 是否精确匹配
	h        Handler // 这个路由表达式对应哪个handler
	pattern  string  //匹配字符串
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着看一下Handler的定义</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)  // 路由实现器
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Handler是一个接口，但是前一小节中的<code>sayhelloName</code>函数并没有实现ServeHTTP这个接口，为什么能添加呢？原来在http包里面还定义了一个类型<code>HandlerFunc</code>,我们定义的函数<code>sayhelloName</code>就是这个HandlerFunc调用之后的结果，这个类型默认就实现了ServeHTTP这个接口，即我们调用了HandlerFunc(f),强制类型转换f成为HandlerFunc类型，这样f就拥有了ServeHTTP方法。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
	f(w, r)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>路由器里面存储好了相应的路由规则之后，那么具体的请求又是怎么分发的呢？请看下面的代码，默认的路由器实现了<code>ServeHTTP</code>：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (mux *ServeMux) ServeHTTP(w ResponseWriter, r *Request) {
	if r.RequestURI == &quot;*&quot; {
		w.Header().Set(&quot;Connection&quot;, &quot;close&quot;)
		w.WriteHeader(StatusBadRequest)
		return
	}
	h, _ := mux.Handler(r)
	h.ServeHTTP(w, r)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示路由器接收到请求之后，如果是<code>*</code>那么关闭链接，不然调用<code>mux.Handler(r)</code>返回对应设置路由的处理Handler，然后执行<code>h.ServeHTTP(w, r)</code></p><p>也就是调用对应路由的handler的ServerHTTP接口，那么mux.Handler(r)怎么处理的呢？</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (mux *ServeMux) Handler(r *Request) (h Handler, pattern string) {
	if r.Method != &quot;CONNECT&quot; {
		if p := cleanPath(r.URL.Path); p != r.URL.Path {
			_, pattern = mux.handler(r.Host, p)
			return RedirectHandler(p, StatusMovedPermanently), pattern
		}
	}	
	return mux.handler(r.Host, r.URL.Path)
}

func (mux *ServeMux) handler(host, path string) (h Handler, pattern string) {
	mux.mu.RLock()
	defer mux.mu.RUnlock()

	// Host-specific pattern takes precedence over generic ones
	if mux.hosts {
		h, pattern = mux.match(host + path)
	}
	if h == nil {
		h, pattern = mux.match(path)
	}
	if h == nil {
		h, pattern = NotFoundHandler(), &quot;&quot;
	}
	return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原来他是根据用户请求的URL和路由器里面存储的map去匹配的，当匹配到之后返回存储的handler，调用这个handler的ServeHTTP接口就可以执行到相应的函数了。</p><p>通过上面这个介绍，我们了解了整个路由过程，Go其实支持外部实现的路由器 <code>ListenAndServe</code>的第二个参数就是用以配置外部路由器的，它是一个Handler接口，即外部路由器只要实现了Handler接口就可以,我们可以在自己实现的路由器的ServeHTTP里面实现自定义路由功能。</p><p>如下代码所示，我们自己实现了一个简易的路由器</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;net/http&quot;
)

type MyMux struct {
}

func (p *MyMux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == &quot;/&quot; {
		sayhelloName(w, r)
		return
	}
	http.NotFound(w, r)
	return
}

func sayhelloName(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, &quot;Hello myroute!&quot;)
}

func main() {
	mux := &amp;MyMux{}
	http.ListenAndServe(&quot;:9090&quot;, mux)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="go代码的执行流程" tabindex="-1"><a class="header-anchor" href="#go代码的执行流程" aria-hidden="true">#</a> Go代码的执行流程</h2><p>通过对http包的分析之后，现在让我们来梳理一下整个的代码执行过程。</p><ul><li><p>首先调用Http.HandleFunc</p><p>按顺序做了几件事：</p><p>1 调用了DefaultServeMux的HandleFunc</p><p>2 调用了DefaultServeMux的Handle</p><p>3 往DefaultServeMux的map[string]muxEntry中增加对应的handler和路由规则</p></li><li><p>其次调用http.ListenAndServe(&quot;:9090&quot;, nil)</p><p>按顺序做了几件事情：</p><p>1 实例化Server</p><p>2 调用Server的ListenAndServe()</p><p>3 调用net.Listen(&quot;tcp&quot;, addr)监听端口</p><p>4 启动一个for循环，在循环体中Accept请求</p><p>5 对每个请求实例化一个Conn，并且开启一个goroutine为这个请求进行服务go c.serve()</p><p>6 读取每个请求的内容w, err := c.readRequest()</p><p>7 判断handler是否为空，如果没有设置handler（这个例子就没有设置handler），handler就设置为DefaultServeMux</p><p>8 调用handler的ServeHttp</p><p>9 在这个例子中，下面就进入到DefaultServeMux.ServeHttp</p><p>10 根据request选择handler，并且进入到这个handler的ServeHTTP</p><pre><code>  mux.handler(r).ServeHTTP(w, r)
</code></pre><p>11 选择handler：</p><p>A 判断是否有路由能满足这个request（循环遍历ServeMux的muxEntry）</p><p>B 如果有路由满足，调用这个路由handler的ServeHTTP</p><p>C 如果没有路由满足，调用NotFoundHandler的ServeHTTP</p></li></ul><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,31);function o(m,p){const i=s("RouterLink");return a(),t("div",null,[c,n("ul",null,[n("li",null,[d(i,{to:"/build-web-app/preface.html"},{default:r(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节: "),d(i,{to:"/build-web-app/03.3.html"},{default:r(()=>[e("Go如何使得web工作")]),_:1})]),n("li",null,[e("下一节: "),d(i,{to:"/build-web-app/03.5.html"},{default:r(()=>[e("小结")]),_:1})])])])}const x=l(v,[["render",o],["__file","03.4.html.vue"]]);export{x as default};
