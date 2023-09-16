import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as i,a as s,b as n,d as t,w as e,e as l}from"./app-9da01d16.js";const u={},d=l(`<h1 id="_6-8-闭包" tabindex="-1"><a class="header-anchor" href="#_6-8-闭包" aria-hidden="true">#</a> 6.8 闭包</h1><p>当我们不希望给函数起名字的时候，可以使用匿名函数，例如：<code>func(x, y int) int { return x + y }</code>。</p><p>这样的一个函数不能够独立存在（编译器会返回错误：<code>non-declaration statement outside function body</code>），但可以被赋值于某个变量，即保存函数的地址到变量中：<code>fplus := func(x, y int) int { return x + y }</code>，然后通过变量名对函数进行调用：<code>fplus(3,4)</code>。</p><p>当然，您也可以直接对匿名函数进行调用：<code>func(x, y int) int { return x + y } (3, 4)</code>。</p><p>下面是一个计算从 1 到 100 万整数的总和的匿名函数：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	sum <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">1e6</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		sum <span class="token operator">+=</span> i
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示参数列表的第一对括号必须紧挨着关键字 <code>func</code>，因为匿名函数没有名称。花括号 <code>{}</code> 涵盖着函数体，最后的一对括号表示对该匿名函数的调用。</p><p>下面的例子展示了如何将匿名函数赋值给变量并对其进行调用（<a href="examples/chapter_6/function_literal.go">function_literal.go</a>）：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		g <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token punctuation">}</span>
		<span class="token function">g</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot; - g is of type %T and has value %v\\n&quot;</span><span class="token punctuation">,</span> g<span class="token punctuation">,</span> g<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0 - g is of type func(int) and has value 0x681a80
1 - g is of type func(int) and has value 0x681b00
2 - g is of type func(int) and has value 0x681ac0
3 - g is of type func(int) and has value 0x681400
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到变量 <code>g</code> 代表的是 <code>func(int)</code>，变量的值是一个内存地址。</p><p>所以我们实际上拥有的是一个函数值：匿名函数可以被赋值给变量并作为值使用。</p><p><strong>练习 6.8</strong> 在 <code>main()</code> 函数中写一个用于打印 <code>Hello World</code> 字符串的匿名函数并赋值给变量 <code>fv</code>，然后调用该函数并打印变量 <code>fv</code> 的类型。</p><p>匿名函数像所有函数一样可以接受或不接受参数。下面的例子展示了如何传递参数到匿名函数中：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span>
	…
<span class="token punctuation">}</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请学习以下示例并思考（<a href="examples/chapter_6/return_defer.go">return_defer.go</a>）：函数 <code>f</code> 返回时，变量 <code>ret</code> 的值是什么？</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ret <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ret<span class="token operator">++</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code>ret</code> 的值为 <code>2</code>，因为 <code>ret++</code> 是在执行 <code>return 1</code> 语句后发生的。</p><p>这可用于在返回语句之后修改返回的 <code>error</code> 时使用。</p><p><strong>defer 语句和匿名函数</strong></p>`,21),r=s("code",null,"defer",-1),k=s("code",null,"go",-1),v=s("h2",{id:"链接",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),n(" 链接")],-1);function m(f,g){const a=p("RouterLink");return c(),i("div",null,[d,s("p",null,[n("关键字 "),r,n(" （详见"),t(a,{to:"/the-way-to-go/06.4.html"},{default:e(()=>[n("第 6.4 节")]),_:1}),n("）经常配合匿名函数使用，它可以用于改变函数的命名返回值。")]),s("p",null,[n("匿名函数还可以配合 "),k,n(" 关键字来作为 goroutine 使用（详见"),t(a,{to:"/the-way-to-go/14.0.html"},{default:e(()=>[n("第 14 章")]),_:1}),n("和"),t(a,{to:"/the-way-to-go/16.9.html"},{default:e(()=>[n("第 16.9 节")]),_:1}),n("）。")]),s("p",null,[n("匿名函数同样被称之为闭包（函数式语言的术语）：它们被允许调用定义在其它环境下的变量。闭包可使得某个函数捕捉到一些外部状态，例如：函数被创建时的状态。另一种表示方式为：一个闭包继承了函数所声明时的作用域。这种状态（作用域内的变量）都被共享到闭包的环境中，因此这些变量可以在闭包中被操作，直到被销毁，详见"),t(a,{to:"/the-way-to-go/06.9.html"},{default:e(()=>[n("第 6.9 节")]),_:1}),n(" 中的示例。闭包经常被用作包装函数：它们会预先定义好 1 个或多个参数以用于包装，详见下一节中的示例。另一个不错的应用就是使用闭包来完成更加简洁的错误检查（详见"),t(a,{to:"/the-way-to-go/16.10.html"},{default:e(()=>[n("第 16.10.2 节")]),_:1}),n("）。")]),v,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/06.7.html"},{default:e(()=>[n("将函数作为参数")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/06.9.html"},{default:e(()=>[n("应用闭包：将函数作为返回值")]),_:1})])])])}const _=o(u,[["render",m],["__file","06.8.html.vue"]]);export{_ as default};
