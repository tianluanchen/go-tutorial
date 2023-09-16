import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as s,c as a,a as n,d as r,w as d,b as e,e as c}from"./app-9da01d16.js";const v="/go-tutorial/assets/3.3.http-08f5038d.png?raw=true",o="/go-tutorial/assets/3.3.illustrator-562f15eb.png?raw=true",u={},m=c('<h1 id="_3-3-go如何使得web工作" tabindex="-1"><a class="header-anchor" href="#_3-3-go如何使得web工作" aria-hidden="true">#</a> 3.3 Go如何使得Web工作</h1><p>前面小节介绍了如何通过Go搭建一个Web服务，我们可以看到简单应用一个net/http包就方便的搭建起来了。那么Go在底层到底是怎么做的呢？万变不离其宗，Go的Web服务工作也离不开我们第一小节介绍的Web工作方式。</p><h2 id="web工作方式的几个概念" tabindex="-1"><a class="header-anchor" href="#web工作方式的几个概念" aria-hidden="true">#</a> web工作方式的几个概念</h2><p>以下均是服务器端的几个概念</p><p>Request：用户请求的信息，用来解析用户的请求信息，包括post、get、cookie、url等信息</p><p>Response：服务器需要反馈给客户端的信息</p><p>Conn：用户的每次请求链接</p><p>Handler：处理请求和生成返回信息的处理逻辑</p><h2 id="分析http包运行机制" tabindex="-1"><a class="header-anchor" href="#分析http包运行机制" aria-hidden="true">#</a> 分析http包运行机制</h2><p>下图是Go实现Web服务的工作模式的流程图</p><figure><img src="'+v+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图3.9 http包执行流程</p><ol><li><p>创建Listen Socket, 监听指定的端口, 等待客户端请求到来。</p></li><li><p>Listen Socket接受客户端的请求, 得到Client Socket, 接下来通过Client Socket与客户端通信。</p></li><li><p>处理客户端的请求, 首先从Client Socket读取HTTP请求的协议头, 如果是POST方法, 还可能要读取客户端提交的数据, 然后交给相应的handler处理请求, handler处理完毕准备好客户端需要的数据, 通过Client Socket写给客户端。</p></li></ol><p>这整个的过程里面我们只要了解清楚下面三个问题，也就知道Go是如何让Web运行起来了</p><ul><li>如何监听端口？</li><li>如何接收客户端请求？</li><li>如何分配handler？</li></ul><p>前面小节的代码里面我们可以看到，Go是通过一个函数<code>ListenAndServe</code>来处理这些事情的，其实现源码如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func ListenAndServe(addr string, handler Handler) error {
	server := &amp;Server{Addr: addr, Handler: handler}
	return server.ListenAndServe()
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ListenAndServe</code>会初始化一个<code>sever</code>对象，然后调用了<code>Server</code>对象的方法<code>ListenAndServe</code>。其源码如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (srv *Server) ListenAndServe() error {
	if srv.shuttingDown() {
		return ErrServerClosed
	}
	addr := srv.Addr
	if addr == &quot;&quot; {
		addr = &quot;:http&quot;
	}
	ln, err := net.Listen(&quot;tcp&quot;, addr)
	if err != nil {
		return err
	}
	return srv.Serve(ln)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ListenAndServe</code>调用了<code>net.Listen(&quot;tcp&quot;, addr)</code>，也就是底层用TCP协议搭建了一个服务，最后调用<code>src.Serve</code>监控我们设置的端口。监控之后如何接收客户端的请求呢？</p><p><code>Serve</code>的具体实现如下(为突出重点，仅展示关键代码)，通过下面的分析源码我们可以看到客户端请求的具体处理过程：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (srv *Server) Serve(l net.Listener) error {
	...

	ctx := context.WithValue(baseCtx, ServerContextKey, srv)
	for {
		rw, err := l.Accept()
		...

		connCtx := ctx
		if cc := srv.ConnContext; cc != nil {
			connCtx = cc(connCtx, rw)
			if connCtx == nil {
				panic(&quot;ConnContext returned nil&quot;)
			}
		}
		tempDelay = 0
		c := srv.newConn(rw)
		c.setState(c.rwc, StateNew, runHooks) // before Serve can return
		go c.serve(connCtx)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数里面起了一个<code>for{}</code>，首先通过Listener接收请求：<code>l.Accept()</code>，其次创建一个Conn：<code>c := srv.newConn(rw)</code>，最后单独开了一个goroutine，把这个请求的数据当做参数扔给这个conn去服务：<code>go c.serve(connCtx)</code>。这个就是高并发体现了，用户的每一次请求都是在一个新的goroutine去服务，相互不影响。</p><p>那么如何具体分配到相应的函数来处理请求呢？我们继续分析conn的<code>serve</code>方法，其源码如下(为突出重点，仅展示关键代码)：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (c *conn) serve(ctx context.Context) {
    ...

	ctx, cancelCtx := context.WithCancel(ctx)
	c.cancelCtx = cancelCtx
	defer cancelCtx()

	c.r = &amp;connReader{conn: c}
	c.bufr = newBufioReader(c.r)
	c.bufw = newBufioWriterSize(checkConnErrorWriter{c}, 4&lt;&lt;10)

	for {
		w, err := c.readRequest(ctx)
        ...

		// HTTP cannot have multiple simultaneous active requests.[*]
		// Until the server replies to this request, it can&#39;t read another,
		// so we might as well run the handler in this goroutine.
		// [*] Not strictly true: HTTP pipelining. We could let them all process
		// in parallel even if their responses need to be serialized.
		// But we&#39;re not going to implement HTTP pipelining because it
		// was never deployed in the wild and the answer is HTTP/2.
		serverHandler{c.server}.ServeHTTP(w, w.req)
		w.cancelCtx()
        ...

	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>conn首先会解析request:<code>w, err := c.readRequest(ctx)</code>, 然后获取相应的handler去处理请求:<code>serverHandler{c.server}.ServeHTTP(w, w.req)</code>，<code>ServeHTTP</code>的具体实现如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (sh serverHandler) ServeHTTP(rw ResponseWriter, req *Request) {
	handler := sh.srv.Handler
	if handler == nil {
		handler = DefaultServeMux
	}
	if req.RequestURI == &quot;*&quot; &amp;&amp; req.Method == &quot;OPTIONS&quot; {
		handler = globalOptionsHandler{}
	}
	handler.ServeHTTP(rw, req)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>sh.srv.Handler</code>就是我们刚才在调用函数<code>ListenAndServe</code>时候的第二个参数，我们前面例子传递的是nil，也就是为空，那么默认获取<code>handler = DefaultServeMux</code>,那么这个变量用来做什么的呢？对，这个变量就是一个路由器，它用来匹配url跳转到其相应的handle函数，那么这个我们有设置过吗?有，我们调用的代码里面第一句不是调用了<code>http.HandleFunc(&quot;/&quot;, sayhelloName)</code>嘛。这个作用就是注册了请求<code>/</code>的路由规则，当请求uri为&quot;/&quot;，路由就会转到函数sayhelloName，DefaultServeMux会调用ServeHTTP方法，这个方法内部其实就是调用sayhelloName本身，最后通过写入response的信息反馈到客户端。</p><p>详细的整个流程如下图所示：</p><figure><img src="`+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图3.10 一个http连接处理流程</p><p>至此我们的三个问题已经全部得到了解答，你现在对于Go如何让Web跑起来的是否已经基本了解了呢？</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>',33);function b(p,h){const i=l("RouterLink");return s(),a("div",null,[m,n("ul",null,[n("li",null,[r(i,{to:"/build-web-app/preface.html"},{default:d(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节: "),r(i,{to:"/build-web-app/03.2.html"},{default:d(()=>[e("GO搭建一个简单的web服务")]),_:1})]),n("li",null,[e("下一节: "),r(i,{to:"/build-web-app/03.4.html"},{default:d(()=>[e("Go的http包详解")]),_:1})])])])}const x=t(u,[["render",b],["__file","03.3.html.vue"]]);export{x as default};
