import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as i,a as s,d as t,w as e,b as n,e as l}from"./app-9da01d16.js";const u={},k=l(`<h1 id="_15-11-与-websocket-通信" tabindex="-1"><a class="header-anchor" href="#_15-11-与-websocket-通信" aria-hidden="true">#</a> 15.11 与 websocket 通信</h1><p>备注：Go 团队决定从 Go 1 起，将 <code>websocket</code> 包移出 Go 标准库，转移到 <code>code.google.com/p/go</code> 下的子项目 <code>websocket</code>，同时预计近期将做重大更改。</p><p><code>import &quot;websocket&quot;</code> 这行要改成：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> websocket <span class="token string">&quot;code.google.com/p/go/websocket&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>与 http 协议相反，websocket 是通过客户端与服务器之间的对话，建立的基于单个持久连接的协议。然而在其他方面，其功能几乎与 http 相同。在示例 15.24 中，我们有一个典型的 websocket 服务器，他会自启动并监听 websocket 客户端的连入。示例 15.25 演示了 5 秒后会终止的客户端代码。当连接到来时，服务器先打印 <code>new connection</code>，当客户端停止时，服务器打印 <code>EOF =&gt; closing connection</code>。</p><p>示例 15.24 <a href="examples/chapter_15/websocket_server.go">websocket_server.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;websocket&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">server</span><span class="token punctuation">(</span>ws <span class="token operator">*</span>websocket<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;new connection\\n&quot;</span><span class="token punctuation">)</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> ws<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot; =&gt; closing connection\\n&quot;</span><span class="token punctuation">)</span>
	ws<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span><span class="token string">&quot;/websocket&quot;</span><span class="token punctuation">,</span> websocket<span class="token punctuation">.</span><span class="token function">Handler</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:12345&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;ListenAndServe: &quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 15.25 <a href="examples/chapter_15/websocket_client.go">websocket_client.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
	<span class="token string">&quot;websocket&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ws<span class="token punctuation">,</span> err <span class="token operator">:=</span> websocket<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;ws://localhost:12345/websocket&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;http://localhost/&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;Dial: &quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">go</span> <span class="token function">readFromServer</span><span class="token punctuation">(</span>ws<span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5e9</span><span class="token punctuation">)</span>
    ws<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">readFromServer</span><span class="token punctuation">(</span>ws <span class="token operator">*</span>websocket<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> ws<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,10);function r(d,v){const a=p("RouterLink");return c(),i("div",null,[k,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/15.10.html"},{default:e(()=>[n("基于网络的通道 netchan")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/15.12.html"},{default:e(()=>[n("用 smtp 发送邮件")]),_:1})])])])}const f=o(u,[["render",r],["__file","15.11.html.vue"]]);export{f as default};