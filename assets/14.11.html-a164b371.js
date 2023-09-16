import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as l,a as s,b as n,d as e,w as t,e as i}from"./app-9da01d16.js";const u={},r=s("h1",{id:"_14-11-限制同时处理的请求数",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_14-11-限制同时处理的请求数","aria-hidden":"true"},"#"),n(" 14.11 限制同时处理的请求数")],-1),d=s("a",{href:"examples/chapter_14/max_tasks.go"},"max_tasks.go",-1),k=s("code",null,"MAXREQS",-1),v=s("code",null,"handle()",-1),m=s("code",null,"sem",-1),h=s("code",null,"sem",-1),b=i(`<p>示例：14.16-<a href="examples/chapter_14/max_tasks.go">max_tasks.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">const</span> MAXREQS <span class="token operator">=</span> <span class="token number">50</span>

<span class="token keyword">var</span> sem <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> MAXREQS<span class="token punctuation">)</span>

<span class="token keyword">type</span> Request <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a<span class="token punctuation">,</span> b   <span class="token builtin">int</span>
	replyc <span class="token keyword">chan</span> <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">process</span><span class="token punctuation">(</span>r <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// do something</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handle</span><span class="token punctuation">(</span>r <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	sem <span class="token operator">&lt;-</span> <span class="token number">1</span> <span class="token comment">// doesn&#39;t matter what we put in it</span>
	<span class="token function">process</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>sem <span class="token comment">// one empty place in the buffer: the next request can start</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">server</span><span class="token punctuation">(</span>service <span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		request <span class="token operator">:=</span> <span class="token operator">&lt;-</span>service
		<span class="token keyword">go</span> <span class="token function">handle</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	service <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">server</span><span class="token punctuation">(</span>service<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方式，应用程序可以通过使用缓冲通道（通道被用作信号量）使协程同步其对该资源的使用，从而充分利用有限的资源（如内存）。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,4);function _(f,w){const a=p("RouterLink");return c(),l("div",null,[r,s("p",null,[n("使用带缓冲区的通道很容易实现这一点（参见 "),e(a,{to:"/the-way-to-go/14.2.html#1425-%E5%90%8C%E6%AD%A5%E9%80%9A%E9%81%93-%E4%BD%BF%E7%94%A8%E5%B8%A6%E7%BC%93%E5%86%B2%E7%9A%84%E9%80%9A%E9%81%93"},{default:t(()=>[n("14.2.5")]),_:1}),n("），其缓冲区容量就是同时处理请求的最大数量。程序 "),d,n(" 虽然没有做什么有用的事但是却包含了这个技巧：超过 "),k,n(" 的请求将不会被同时处理，因为当信号通道表示缓冲区已满时 "),v,n(" 函数会阻塞且不再处理其他请求，直到某个请求从 "),m,n(" 中被移除。"),h,n(" 就像一个信号量，这一专业术语用于在程序中表示特定条件的标志变量。")]),b,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/14.10.html"},{default:t(()=>[n("复用")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/14.12.html"},{default:t(()=>[n("链式协程")]),_:1})])])])}const E=o(u,[["render",_],["__file","14.11.html.vue"]]);export{E as default};
