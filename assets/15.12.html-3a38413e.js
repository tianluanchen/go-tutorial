import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as s,d as t,w as e,b as n,e as l}from"./app-9da01d16.js";const u={},d=l(`<h1 id="_15-12-用-smtp-发送邮件" tabindex="-1"><a class="header-anchor" href="#_15-12-用-smtp-发送邮件" aria-hidden="true">#</a> 15.12 用 smtp 发送邮件</h1><p><code>smtp</code> 包实现了用于发送邮件的“简单邮件传输协议”（Simple Mail Transfer Protocol）。它有一个 <code>Client</code> 类型，代表一个连接到 SMTP 服务器的客户端：</p><ul><li><code>Dial()</code> 方法返回一个已连接到 SMTP 服务器的客户端 <code>Client</code></li><li>设置 <code>Mail</code>（from，即发件人）和 <code>Rcpt</code>（to，即收件人）</li><li><code>Data()</code> 方法返回一个用于写入数据的 <code>Writer</code>，这里利用 <code>buf.WriteTo(wc)</code> 写入</li></ul><p>示例 15.26 <a href="examples/chapter_15/smtp.go">smtp.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/smtp&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Connect to the remote SMTP server.</span>
	client<span class="token punctuation">,</span> err <span class="token operator">:=</span> smtp<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;mail.example.com:25&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// Set the sender and recipient.</span>
	client<span class="token punctuation">.</span><span class="token function">Mail</span><span class="token punctuation">(</span><span class="token string">&quot;sender@example.org&quot;</span><span class="token punctuation">)</span>
	client<span class="token punctuation">.</span><span class="token function">Rcpt</span><span class="token punctuation">(</span><span class="token string">&quot;recipient@example.net&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// Send the email body.</span>
	wc<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Data</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> wc<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	buf <span class="token operator">:=</span> bytes<span class="token punctuation">.</span><span class="token function">NewBufferString</span><span class="token punctuation">(</span><span class="token string">&quot;This is the email body.&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> buf<span class="token punctuation">.</span><span class="token function">WriteTo</span><span class="token punctuation">(</span>wc<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要认证，或有多个收件人时，也可以用 <code>SendMail()</code> 函数发送。它连接到地址为 <code>addr</code> 的服务器；如果可以，切换到 TLS（“传输层安全”加密和认证协议），并用 PLAIN 机制认证；然后以 <code>from</code> 作为发件人，<code>to</code> 作为收件人列表，<code>msg</code> 作为邮件内容，发出一封邮件：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">SendMail</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">,</span> a Auth<span class="token punctuation">,</span> from <span class="token builtin">string</span><span class="token punctuation">,</span> to <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> msg <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例 15.27 <a href="examples/chapter_15/smtp_auth.go">smtp_auth.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/smtp&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Set up authentication information.</span>
	auth <span class="token operator">:=</span> smtp<span class="token punctuation">.</span><span class="token function">PlainAuth</span><span class="token punctuation">(</span>
		<span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;user@example.com&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;mail.example.com&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>
	<span class="token comment">// Connect to the server, authenticate, set the sender and recipient,</span>
	<span class="token comment">// and send the email all in one step.</span>
	err <span class="token operator">:=</span> smtp<span class="token punctuation">.</span><span class="token function">SendMail</span><span class="token punctuation">(</span>
		<span class="token string">&quot;mail.example.com:25&quot;</span><span class="token punctuation">,</span>
		auth<span class="token punctuation">,</span>
		<span class="token string">&quot;sender@example.org&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;recipient@example.net&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;This is the email body.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,10);function r(k,m){const a=o("RouterLink");return c(),i("div",null,[d,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/15.11.html"},{default:e(()=>[n("与 websocket 通信")]),_:1})]),s("li",null,[n("下一章："),t(a,{to:"/the-way-to-go/16.0.html"},{default:e(()=>[n("常见的陷阱与错误")]),_:1})])])])}const g=p(u,[["render",r],["__file","15.12.html.vue"]]);export{g as default};
