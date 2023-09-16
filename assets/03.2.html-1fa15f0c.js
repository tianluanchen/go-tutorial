import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as s,c as r,a as n,d as i,w as l,b as e,e as d}from"./app-9da01d16.js";const u="/go-tutorial/assets/3.2.goweb-00b6d314.png?raw=true",c={},v=d(`<h1 id="_3-2-go搭建一个web服务器" tabindex="-1"><a class="header-anchor" href="#_3-2-go搭建一个web服务器" aria-hidden="true">#</a> 3.2 Go搭建一个Web服务器</h1><p>前面小节已经介绍了Web是基于http协议的一个服务，Go语言里面提供了一个完善的net/http包，通过http包可以很方便的搭建起来一个可以运行的Web服务。同时使用这个包能很简单地对Web的路由，静态文件，模版，cookie等数据进行设置和操作。</p><h2 id="http包建立web服务器" tabindex="-1"><a class="header-anchor" href="#http包建立web服务器" aria-hidden="true">#</a> http包建立Web服务器</h2><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;net/http&quot;
	&quot;strings&quot;
	&quot;log&quot;
)

func sayhelloName(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()  //解析参数，默认是不会解析的
	fmt.Println(r.Form)  //这些信息是输出到服务器端的打印信息
	fmt.Println(&quot;path&quot;, r.URL.Path)
	fmt.Println(&quot;scheme&quot;, r.URL.Scheme)
	fmt.Println(r.Form[&quot;url_long&quot;])
	for k, v := range r.Form {
		fmt.Println(&quot;key:&quot;, k)
		fmt.Println(&quot;val:&quot;, strings.Join(v, &quot;&quot;))
	}
	fmt.Fprintf(w, &quot;Hello astaxie!&quot;) //这个写入到w的是输出到客户端的
}

func main() {
	http.HandleFunc(&quot;/&quot;, sayhelloName) //设置访问的路由
	err := http.ListenAndServe(&quot;:9090&quot;, nil) //设置监听的端口
	if err != nil {
		log.Fatal(&quot;ListenAndServe: &quot;, err)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个代码，我们build之后，然后执行web.exe,这个时候其实已经在9090端口监听http链接请求了。</p><p>在浏览器输入<code>http://localhost:9090</code></p><p>可以看到浏览器页面输出了<code>Hello astaxie!</code></p><p>可以换一个地址试试：<code>http://localhost:9090/?url_long=111&amp;url_long=222</code></p><p>看看浏览器输出的是什么，服务器输出的是什么？</p><p>在服务器端输出的信息如下：</p><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图3.8 用户访问Web之后服务器端打印的信息</p><p>我们看到上面的代码，要编写一个Web服务器很简单，只要调用http包的两个函数就可以了。</p><blockquote><p>如果你以前是PHP程序员，那你也许就会问，我们的nginx、apache服务器不需要吗？Go就是不需要这些，因为他直接就监听tcp端口了，做了nginx做的事情，然后sayhelloName这个其实就是我们写的逻辑函数了，跟php里面的控制层（controller）函数类似。</p></blockquote><blockquote><p>如果你以前是Python程序员，那么你一定听说过tornado，这个代码和他是不是很像，对，没错，Go就是拥有类似Python这样动态语言的特性，写Web应用很方便。</p></blockquote><blockquote><p>如果你以前是Ruby程序员，会发现和ROR的/script/server启动有点类似。</p></blockquote><p>我们看到Go通过简单的几行代码就已经运行起来一个Web服务了，而且这个Web服务内部有支持高并发的特性，我将会在接下来的两个小节里面详细的讲解一下Go是如何实现Web高并发的。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>',18);function b(p,m){const t=a("RouterLink");return s(),r("div",null,[v,n("ul",null,[n("li",null,[i(t,{to:"/build-web-app/preface.html"},{default:l(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节: "),i(t,{to:"/build-web-app/03.1.html"},{default:l(()=>[e("Web工作方式")]),_:1})]),n("li",null,[e("下一节: "),i(t,{to:"/build-web-app/03.3.html"},{default:l(()=>[e("Go如何使得web工作")]),_:1})])])])}const f=o(c,[["render",b],["__file","03.2.html.vue"]]);export{f as default};
