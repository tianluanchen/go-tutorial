import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as l,a as s,b as n,d as e,w as t,e as o}from"./app-9da01d16.js";const u={},d=o(`<h1 id="_5-6-标签与-goto" tabindex="-1"><a class="header-anchor" href="#_5-6-标签与-goto" aria-hidden="true">#</a> 5.6 标签与 goto</h1><p><code>for</code>、<code>switch</code> 或 <code>select</code> 语句都可以配合标签 (label) 形式的标识符使用，即某一行第一个以冒号 (<code>:</code>) 结尾的单词（gofmt 会将后续代码自动移至下一行）。</p><p>示例 5.13 <a href="examples/chapter_5/for6.go">for6.go</a>：</p><p>（标签的名称是大小写敏感的，为了提升可读性，一般建议使用全部大写字母）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

LABEL1<span class="token punctuation">:</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> j <span class="token operator">==</span> <span class="token number">4</span> <span class="token punctuation">{</span>
				<span class="token keyword">continue</span> LABEL1
			<span class="token punctuation">}</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;i is: %d, and j is: %d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本例中，<code>continue</code> 语句指向 <code>LABEL1</code>，当执行到该语句的时候，就会跳转到 <code>LABEL1</code> 标签的位置。</p><p>您可以看到当 <code>j==4</code> 和 <code>j==5</code> 的时候，没有任何输出：标签的作用对象为外部循环，因此 <code>i</code> 会直接变成下一个循环的值，而此时 <code>j</code> 的值就被重设为 <code>0</code>，即它的初始值。如果将 <code>continue</code> 改为 <code>break</code>，则不会只退出内层循环，而是直接退出外层循环了。另外，还可以使用 <code>goto</code> 语句和标签配合使用来模拟循环。</p><p>示例 5.14 <a href="examples/chapter_5/goto.go">goto.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	i<span class="token operator">:=</span><span class="token number">0</span>
	HERE<span class="token punctuation">:</span>
		<span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		i<span class="token operator">++</span>
		<span class="token keyword">if</span> i<span class="token operator">==</span><span class="token number">5</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">goto</span> HERE
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码会输出 <code>01234</code>。</p><p>使用逆向的 <code>goto</code> 会很快导致意大利面条式的代码，所以不应当使用而选择更好的替代方案。</p><p><strong>特别注意</strong> 使用标签和 <code>goto</code> 语句是不被鼓励的：它们会很快导致非常糟糕的程序设计，而且总有更加可读的替代方案来实现相同的需求。</p>`,12),r=s("code",null,"goto",-1),k=s("a",{href:"./examples/chapter_15/simple_tcp_server.go"},"simple_tcp_server.go",-1),v=o(`<p>定义但未使用标签会导致编译错误：<code>label … defined and not used</code>。</p><p>如果您必须使用 <code>goto</code>，应当只使用正序的标签（标签位于 <code>goto</code> 语句之后），但注意标签和 <code>goto</code> 语句之间不能出现定义新变量的语句，否则会导致编译失败。</p><p>示例 5.15 <a href="examples/chapter_5/got2o.go">goto2.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// compile error goto2.go:8: goto TARGET jumps over declaration of b at goto2.go:8</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		a <span class="token operator">:=</span> <span class="token number">1</span>
		<span class="token keyword">goto</span> TARGET <span class="token comment">// compile error</span>
		b <span class="token operator">:=</span> <span class="token number">9</span>
	TARGET<span class="token punctuation">:</span>  
		b <span class="token operator">+=</span> a
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a is %v *** b is %v&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>问题 5.3</strong> 请描述下面 <code>for</code> 循环的输出：</p><ol><li></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>i <span class="token operator">:=</span> <span class="token number">0</span>
<span class="token keyword">for</span> <span class="token punctuation">{</span> <span class="token comment">//since there are no checks, this is an infinite loop</span>
	<span class="token keyword">if</span> i <span class="token operator">&gt;=</span> <span class="token number">3</span> <span class="token punctuation">{</span> <span class="token keyword">break</span> <span class="token punctuation">}</span>
	<span class="token comment">//break out of this for loop when this condition is met</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Value of i is:&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	i<span class="token operator">++</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;A statement just after for loop.&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">7</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> i<span class="token operator">%</span><span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span> <span class="token keyword">continue</span> <span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Odd:&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,10);function m(b,g){const a=c("RouterLink");return i(),l("div",null,[d,s("p",null,[n("一个建议使用 "),r,n(" 语句的示例会在"),e(a,{to:"/the-way-to-go/15.1.html"},{default:t(()=>[n("第 15.1 章")]),_:1}),n(" 的 "),k,n(" 中出现：示例中在发生读取错误时，使用 goto 来跳出无限读取循环并关闭相应的客户端链接。")]),v,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/05.5.html"},{default:t(()=>[n("Break 与 continue")]),_:1})]),s("li",null,[n("下一章："),e(a,{to:"/the-way-to-go/06.0.html"},{default:t(()=>[n("函数")]),_:1})])])])}const _=p(u,[["render",m],["__file","05.6.html.vue"]]);export{_ as default};
