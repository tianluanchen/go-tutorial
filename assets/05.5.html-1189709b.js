import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as l,a as s,b as n,d as e,w as t,e as o}from"./app-9da01d16.js";const u={},r=o(`<h1 id="_5-5-break-与-continue" tabindex="-1"><a class="header-anchor" href="#_5-5-break-与-continue" aria-hidden="true">#</a> 5.5 break 与 continue</h1><p>您可以使用 <code>break</code> 语句重写 <a href="examples/chapter_5/for2.go">for2.go</a> 的代码：</p><p>示例 5.10 <a href="examples/chapter_5/for3.go">for3.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">for</span> <span class="token punctuation">{</span>
	i <span class="token operator">=</span> i <span class="token operator">-</span> <span class="token number">1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;The variable i is now: %d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">break</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此每次迭代都会对条件进行检查（<code>i &lt; 0</code>），以此判断是否需要停止循环。如果退出条件满足，则使用 <code>break</code> 语句退出循环。</p>`,5),d=s("code",null,"break",-1),k=s("code",null,"for",-1),v=s("code",null,"switch",-1),m=s("code",null,"select",-1),b=s("code",null,"break",-1),f=o(`<p>下面的示例中包含了嵌套的循环体（for4.go），<code>break</code> 只会退出最内层的循环：</p><p>示例 5.11 <a href="examples/chapter_5/for4.go">for4.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> j<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> j<span class="token operator">&gt;</span><span class="token number">5</span> <span class="token punctuation">{</span>
			    <span class="token keyword">break</span>   
			<span class="token punctuation">}</span>
			<span class="token function">print</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;  &quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>012345 012345 012345
</code></pre><p>关键字 <code>continue</code> 忽略剩余的循环体而直接进入下一次循环的过程，但不是无条件执行下一次循环，执行之前依旧需要满足循环的判断条件。</p><p>示例 5.12 <a href="examples/chapter_5/for5.go">for5.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">5</span> <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0 1 2 3 4 6 7 8 9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显然，<code>5</code> 被跳过了。</p><p>另外，关键字 <code>continue</code> 只能被用于 <code>for</code> 循环中。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,13);function g(h,_){const a=c("RouterLink");return i(),l("div",null,[r,s("p",null,[n("一个 "),d,n(" 的作用范围为该语句出现后的最内部的结构，它可以被用于任何形式的 "),k,n(" 循环（计数器、条件判断等）。但在 "),v,n(" 或 "),m,n(" 语句中（详见"),e(a,{to:"/the-way-to-go/13.0.html"},{default:t(()=>[n("第 13 章")]),_:1}),n("），"),b,n(" 语句的作用结果是跳过整个代码块，执行后续的代码。")]),f,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/05.4.html"},{default:t(()=>[n("for 结构")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/05.6.html"},{default:t(()=>[n("标签与 goto")]),_:1})])])])}const x=p(u,[["render",g],["__file","05.5.html.vue"]]);export{x as default};