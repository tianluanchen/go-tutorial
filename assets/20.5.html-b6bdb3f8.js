import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as i,c as u,a as s,b as n,d as a,w as e,e as l}from"./app-9da01d16.js";const r={},d=s("h1",{id:"_20-5-使用用户服务和探索其-api",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_20-5-使用用户服务和探索其-api","aria-hidden":"true"},"#"),n(" 20.5 使用用户服务和探索其 API")],-1),k=l(`<p>编辑 helloworld2.go 文件，用以下 Go 代码替换它：</p><p><u><a href="examples/chapter_20/helloapp/hello/helloworld2_version2.go">Listing 20.3 helloworld2_version2.go</a></u>:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> hello

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;appengine&quot;</span>
	<span class="token string">&quot;appengine/user&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c <span class="token operator">:=</span> appengine<span class="token punctuation">.</span><span class="token function">NewContext</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
	u <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">Current</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
	<span class="token keyword">if</span> u <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		url<span class="token punctuation">,</span> err <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">LoginURL</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Location&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span>
		w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusFound<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Hello, %v!&quot;</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过在浏览器中重新加载页面来测试它。你的应用程序会给你一个链接，当你遵循这个链接时，会把你重定向到适合测试你的应用程序的本地版本的谷歌登录页面。你可以在这个页面中输入任何你喜欢的用户名，你的应用程序将看到一个基于该用户名的假的 <code>user.User</code> 值。当你的应用程序在 App Engine 上运行时，用户将被引导到 Google 账户的登录页面，然后在成功登录或创建账户后，会被重定向到你的应用程序。</p><p><u>用户API：</u></p><p>为了访问这个，我们需要导入一些专门针对 GAE 的 Go 包，即一般的 <code>appengine</code> 和 <code>appengine/user</code>。</p><p>在处理程序中，我们首先需要制作一个与当前请求r相关联的Context对象，这在一行中完成：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>c <span class="token operator">:=</span> appengine<span class="token punctuation">.</span><span class="token function">NewContext</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>appengine.NewContext()</code> 函数在这里返回一个名为 <code>c</code> 的 <code>appengine.Context</code> 值：这是 Go App Engine SDK 中许多函数用来与 App Engine 服务通信的值。然后我们从这个上下文中测试是否已经有一个用户在此时登录，方法是：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code> u <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">Current</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果是这样的话，<code>user.Current</code> 会返回一个指向用户的 <code>user.User</code> 值的指针；否则会返回 <code>nil</code>。如果用户还没有登录，即 <code>u == nil</code> 时，通过调用用户的浏览器重定向到谷歌账户的登录界面。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>url<span class="token punctuation">,</span> err <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">LoginURL</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第 2 个参数 <code>r.URL.String()</code> 是当前请求的 url，这样谷歌账户登录机制可以在成功登录后进行<em>重定向</em>：它将在用户登录或注册新账户后将其送回这里。登录界面的发送是通过设置一个 Location 数据头并返回一个 HTTP 状态代码 302“Found”来完成的。</p><p><code>LoginURL()</code> 函数返回一个 error 值作为其第二个参数。尽管这里不太可能发生错误，但检查它并在适当的时候向用户显示错误是很好的做法（在这种情况下，用 http.Error helper）：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当用户登录后，我们使用与用户账户相关的名字显示一条个性化的信息：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Hello, %v!&quot;</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,17),v=s("code",null,"fmt.Fprintf()",-1),g=s("code",null,"*user.User",-1),m=s("code",null,"String()",-1),h={href:"http://code.google.com/appengine/docs/go/users/",target:"_blank",rel:"noopener noreferrer"},b=s("h2",{id:"链接",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),n(" 链接")],-1);function f(_,w){const t=o("RouterLink"),p=o("ExternalLinkIcon");return i(),u("div",null,[d,s("p",null,[n("GAE 提供了几个基于 Google 基础设施的有用服务。正如"),a(t,{to:"/the-way-to-go/20.1.html"},{default:e(()=>[n("第 20.1 节")]),_:1}),n("中提到的：GAE 提供了一个 Users 服务，它可以让你的应用程序与 Google 用户账户集成。有了用户服务，您的用户可以使用他们已经拥有的谷歌账户来登录您的应用程序。用户服务使您可以轻松地对该应用程序的问候语进行个性化处理。")]),k,s("p",null,[n("在这种情况下，"),v,n(" 函数调用 "),g,n(" 的 "),m,n(" 方法来获得字符串形式的用户名称。更多信息可以在这个参考资料中找到："),s("a",h,[n("http://code.google.com/appengine/docs/go/users/"),a(p)])]),b,s("ul",null,[s("li",null,[a(t,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),a(t,{to:"/the-way-to-go/20.4.html"},{default:e(()=>[n("建造你自己的 Hello world 应用")]),_:1})]),s("li",null,[n("下一节："),a(t,{to:"/the-way-to-go/20.6.html"},{default:e(()=>[n("处理窗口")]),_:1})])])])}const L=c(r,[["render",f],["__file","20.5.html.vue"]]);export{L as default};
