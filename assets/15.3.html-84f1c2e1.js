import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as u,a as s,b as n,d as a,w as e,e as o}from"./app-9da01d16.js";const r={},d=o(`<h1 id="_15-3-访问并读取页面数据" tabindex="-1"><a class="header-anchor" href="#_15-3-访问并读取页面数据" aria-hidden="true">#</a> 15.3 访问并读取页面数据</h1><p>在下边这个程序中，数组中的 url 都将被访问：会发送一个简单的 <code>http.Head()</code> 请求查看返回值；它的声明如下：<code>func Head(url string) (r *Response, err error)</code></p><p>返回的响应 <code>Response</code> 其状态码会被打印出来。</p><p>示例 15.7 <a href="examples/chapter_15/poll_url.go">poll_url.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> urls <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
	<span class="token string">&quot;http://www.google.com/&quot;</span><span class="token punctuation">,</span>
	<span class="token string">&quot;http://golang.org/&quot;</span><span class="token punctuation">,</span>
	<span class="token string">&quot;http://blog.golang.org/&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Execute an HTTP HEAD request for all url&#39;s</span>
	<span class="token comment">// and returns the HTTP status string or an error string.</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> url <span class="token operator">:=</span> <span class="token keyword">range</span> urls <span class="token punctuation">{</span>
		resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Head</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Error:&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token string">&quot;: &quot;</span><span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Status<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><pre><code>http://www.google.com/ : 302 Found
http://golang.org/ : 200 OK
http://blog.golang.org/ : 200 OK
</code></pre><p><em><strong>译者注</strong></em> 由于国内的网络环境现状，很有可能见到如下超时错误提示：</p>`,8),k={href:"http://www.google.com/",target:"_blank",rel:"noopener noreferrer"},v={href:"http://www.google.com/:",target:"_blank",rel:"noopener noreferrer"},m=o(`<p>在下边的程序中我们使用 <code>http.Get()</code> 获取并显示网页内容；<code>Get()</code> 返回值中的 <code>Body</code> 属性包含了网页内容，然后我们用 <code>ioutil.ReadAll()</code> 把它读出来：</p><p>示例 15.8 <a href="examples/chapter_15/http_fetch.go">http_fetch.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io/ioutil&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	res<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;http://www.google.com&quot;</span><span class="token punctuation">)</span>
	<span class="token function">checkError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	data<span class="token punctuation">,</span> err <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	<span class="token function">checkError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Got: %q&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">checkError</span><span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Get : %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当访问不存在的网站时，这里有一个 <code>checkError</code> 输出错误的例子：</p><pre><code>2011/09/30 11:24:15 Get: Get http://www.google.bex: dial tcp www.google.bex:80:GetHostByName: No such host is known.
</code></pre>`,5),g=s("em",null,[s("strong",null,"译者注")],-1),b={href:"http://google.com",target:"_blank",rel:"noopener noreferrer"},h=o(`<p>在下边的程序中，我们获取一个 Twitter 用户的状态，通过 <code>xml</code> 包将这个状态解析成为一个结构：</p><p>示例 15.9 <a href="examples/chapter_15/twitter_status.go">twitter_status.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/xml&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">/*这个结构会保存解析后的返回数据。
他们会形成有层级的 XML，可以忽略一些无用的数据*/</span>
<span class="token keyword">type</span> Status <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Text <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	XMLName xml<span class="token punctuation">.</span>Name
	Status  Status
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 发起请求查询推特 Goodland 用户的状态</span>
	response<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;http://twitter.com/users/Googland.xml&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 初始化 XML 返回值的结构</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span>xml<span class="token punctuation">.</span>Name<span class="token punctuation">{</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> Status<span class="token punctuation">{</span><span class="token string">&quot;&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
	<span class="token comment">// 将 XML 解析为我们的结构</span>
	xml<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>Body<span class="token punctuation">,</span> <span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;status: %s&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>Text<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>status: Robot cars invade California, on orders from Google: Google has been testing self-driving cars ... http://bit.ly/cbtpUN http://retwt.me/97p&lt;exit code=&quot;0&quot; msg=&quot;process exited normally&quot;/&gt;
</code></pre><p><strong>译者注</strong> 和上边的示例相似，你可能无法获取到 xml 数据，另外由于 Go 版本的更新，<code>xml.Unmarshal()</code> 函数的第一个参数必需是 <code>[]byte</code> 类型，而无法传入 <code>Body</code>。</p>`,6),f=s("code",null,"http",-1),_=o(`<ul><li><code>http.Redirect(w ResponseWriter, r *Request, url string, code int)</code>：这个函数会让浏览器重定向到 <code>url</code>（可以是基于请求 url 的相对路径），同时指定状态码。</li><li><code>http.NotFound(w ResponseWriter, r *Request)</code>：这个函数将返回网页没有找到，HTTP 404 错误。</li><li><code>http.Error(w ResponseWriter, error string, code int)</code>：这个函数返回特定的错误信息和 HTTP 代码。</li><li>另一个 <code>http.Request</code> 对象 <code>req</code> 的重要属性：<code>req.Method</code>，这是一个包含 <code>GET</code> 或 <code>POST</code> 字符串，用来描述网页是以何种方式被请求的。</li></ul><p>Go 为所有的 HTTP 状态码定义了常量，比如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>http<span class="token punctuation">.</span>StatusContinue		<span class="token operator">=</span> <span class="token number">100</span>
http<span class="token punctuation">.</span>StatusOK			<span class="token operator">=</span> <span class="token number">200</span>
http<span class="token punctuation">.</span>StatusFound		<span class="token operator">=</span> <span class="token number">302</span>
http<span class="token punctuation">.</span>StatusBadRequest		<span class="token operator">=</span> <span class="token number">400</span>
http<span class="token punctuation">.</span>StatusUnauthorized		<span class="token operator">=</span> <span class="token number">401</span>
http<span class="token punctuation">.</span>StatusForbidden		<span class="token operator">=</span> <span class="token number">403</span>
http<span class="token punctuation">.</span>StatusNotFound		<span class="token operator">=</span> <span class="token number">404</span>
http<span class="token punctuation">.</span>StatusInternalServerError	<span class="token operator">=</span> <span class="token number">500</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以使用 <code>w.header().Set(&quot;Content-Type&quot;, &quot;../..&quot;)</code> 设置头信息。</p><p>比如在网页应用发送 html 字符串的时候，在输出之前执行 <code>w.Header().Set(&quot;Content-Type&quot;, &quot;text/html&quot;)</code>（通常不是必要的）。</p>`,5),w=s("a",{href:"examples/chapter_15/http_fetch2.go"},"http_fetch2.go",-1),q=s("p",null,[n("练习 15.5：获取 json 格式的推特状态，就像示例 15.9 ("),s("a",{href:"exercises/chapter_15/twitter_status_json.go"},"twitter_status_json.go"),n(")")],-1),y=s("h2",{id:"链接",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),n(" 链接")],-1);function x(S,T){const p=c("ExternalLinkIcon"),t=c("RouterLink");return i(),u("div",null,[d,s("p",null,[n("​ Error: "),s("a",k,[n("http://www.google.com/"),a(p)]),n(" Head "),s("a",v,[n("http://www.google.com/:"),a(p)]),n(" dial tcp 216.58.221.100:80: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.")]),m,s("p",null,[g,n(" 和上一个例子相似，你可以把 "),s("a",b,[n("google.com"),a(p)]),n(" 更换为一个国内可以顺畅访问的网址进行测试")]),h,s("p",null,[n("我们会在 "),a(t,{to:"/the-way-to-go/15.4.html"},{default:e(()=>[n("15.4 节")]),_:1}),n(" 中用到 "),f,n(" 包中的其他重要的函数：")]),_,s("p",null,[n("练习 15.4：扩展 http_fetch.go 使之可以从控制台读取 url，使用 "),a(t,{to:"/the-way-to-go/12.1.html"},{default:e(()=>[n("12.1 节")]),_:1}),n("学到的接收控制台输入的方法 ("),w,n(")")]),q,y,s("ul",null,[s("li",null,[a(t,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),a(t,{to:"/the-way-to-go/15.2.html"},{default:e(()=>[n("一个简单的网页服务器")]),_:1})]),s("li",null,[n("下一节："),a(t,{to:"/the-way-to-go/15.4.html"},{default:e(()=>[n("写一个简单的网页应用")]),_:1})])])])}const E=l(r,[["render",x],["__file","15.3.html.vue"]]);export{E as default};
