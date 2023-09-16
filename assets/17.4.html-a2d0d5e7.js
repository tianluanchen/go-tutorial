import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c as u,a as s,b as n,d as a,w as e,e as o}from"./app-9da01d16.js";const d={},r=o(`<h1 id="_17-4-运算符模式和接口" tabindex="-1"><a class="header-anchor" href="#_17-4-运算符模式和接口" aria-hidden="true">#</a> 17.4 运算符模式和接口</h1><p>运算符是一元或二元函数，它返回一个新对象而不修改其参数，类似 C++ 中的 <code>+</code> 和 <code>*</code>，特殊的中缀运算符（<code>+</code>，<code>-</code>，<code>*</code> 等）可以被重载以支持类似数学运算的语法。但除了一些特殊情况，Go 语言并不支持运算符重载：为了克服该限制，运算符必须由函数来模拟。既然 Go 同时支持面向过程和面向对象编程，我们有两种选择：</p><h2 id="_17-4-1-函数作为运算符" tabindex="-1"><a class="header-anchor" href="#_17-4-1-函数作为运算符" aria-hidden="true">#</a> 17.4.1 函数作为运算符</h2><p>运算符由包级别的函数实现，以操作一个或两个参数，并返回一个新对象。函数针对要操作的对象，在专门的包中实现。例如，假设要在包 <code>matrix</code> 中实现矩阵操作，就会包含 <code>Add()</code> 用于矩阵相加，<code>Mult()</code> 用于矩阵相乘，他们都会返回一个矩阵。这两个函数通过包名来调用，因此可以创造出如下形式的表达式：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>m <span class="token operator">:=</span> matrix<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>m1<span class="token punctuation">,</span> matrix<span class="token punctuation">.</span><span class="token function">Mult</span><span class="token punctuation">(</span>m2<span class="token punctuation">,</span> m3<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们想在这些运算中区分不同类型的矩阵（稀疏或稠密），由于没有函数重载，我们不得不给函数起不同的名称，例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> addSparseToDense <span class="token punctuation">(</span>a <span class="token operator">*</span>sparseMatrix<span class="token punctuation">,</span> b <span class="token operator">*</span>denseMatrix<span class="token punctuation">)</span> <span class="token operator">*</span>denseMatrix
<span class="token keyword">func</span> addDenseToDense <span class="token punctuation">(</span>a <span class="token operator">*</span>denseMatrix<span class="token punctuation">,</span> b <span class="token operator">*</span>denseMatrix<span class="token punctuation">)</span> <span class="token operator">*</span>denseMatrix
<span class="token keyword">func</span> addSparseToSparse <span class="token punctuation">(</span>a <span class="token operator">*</span>sparseMatrix<span class="token punctuation">,</span> b <span class="token operator">*</span>sparseMatrix<span class="token punctuation">)</span> <span class="token operator">*</span>sparseMatrix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这可不怎么优雅，我们能选择的最佳方案是将它们隐藏起来，作为包的私有函数，并暴露单一的 <code>Add()</code> 函数作为公共 API。可以在嵌套的 <code>switch</code> 断言中测试类型，以便在任何支持的参数组合上执行操作：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>a Matrix<span class="token punctuation">,</span> b Matrix<span class="token punctuation">)</span> Matrix <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> sparseMatrix<span class="token punctuation">:</span>
		<span class="token keyword">switch</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> sparseMatrix<span class="token punctuation">:</span>
			<span class="token keyword">return</span> <span class="token function">addSparseToSparse</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token punctuation">(</span>sparseMatrix<span class="token punctuation">)</span><span class="token punctuation">,</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span>sparseMatrix<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">case</span> denseMatrix<span class="token punctuation">:</span>
			<span class="token keyword">return</span> <span class="token function">addSparseToDense</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token punctuation">(</span>sparseMatrix<span class="token punctuation">)</span><span class="token punctuation">,</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span>denseMatrix<span class="token punctuation">)</span><span class="token punctuation">)</span>
		…
		<span class="token punctuation">}</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token comment">// 不支持的参数</span>
		…
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),k={href:"https://github.com/skelterjohn/go.matrix",target:"_blank",rel:"noopener noreferrer"},v=o(`<h2 id="_17-4-2-方法作为运算符" tabindex="-1"><a class="header-anchor" href="#_17-4-2-方法作为运算符" aria-hidden="true">#</a> 17.4.2 方法作为运算符</h2><p>根据接收者类型不同，可以区分不同的方法。因此我们可以为每种类型简单地定义 <code>Add</code> 方法，来代替使用多个函数名称：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>sparseMatrix<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>b Matrix<span class="token punctuation">)</span> Matrix
<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>denseMatrix<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>b Matrix<span class="token punctuation">)</span> Matrix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每个方法都返回一个新对象，成为下一个方法调用的接收者，因此我们可以使用<em>链式调用</em>表达式：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>m <span class="token operator">:=</span> m1<span class="token punctuation">.</span><span class="token function">Mult</span><span class="token punctuation">(</span>m2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>m3<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>比上一节面向过程的形式更简洁。</p><p>正确的实现同样可以基于类型，通过 <code>switch</code> 类型断言在运行时确定：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>sparseMatrix<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>b Matrix<span class="token punctuation">)</span> Matrix <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> sparseMatrix<span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token function">addSparseToSparse</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token punctuation">(</span>sparseMatrix<span class="token punctuation">)</span><span class="token punctuation">,</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span>sparseMatrix<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> denseMatrix<span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token function">addSparseToDense</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token punctuation">(</span>sparseMatrix<span class="token punctuation">)</span><span class="token punctuation">,</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span>denseMatrix<span class="token punctuation">)</span><span class="token punctuation">)</span>
	…
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token comment">// 不支持的参数</span>
		…
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次地，这比上一节嵌套的 <code>switch</code> 更简单。</p><h2 id="_17-4-3-使用接口" tabindex="-1"><a class="header-anchor" href="#_17-4-3-使用接口" aria-hidden="true">#</a> 17.4.3 使用接口</h2><p>当在不同类型上执行相同的方法时，创建一个通用化的接口以实现多态的想法，就会自然产生。</p><p>例如定义一个代数 <code>Algebraic</code> 接口：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Algebraic <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Add</span><span class="token punctuation">(</span>b Algebraic<span class="token punctuation">)</span> Algebraic
	<span class="token function">Min</span><span class="token punctuation">(</span>b Algebraic<span class="token punctuation">)</span> Algebraic
	<span class="token function">Mult</span><span class="token punctuation">(</span>b Algebraic<span class="token punctuation">)</span> Algebraic
	…
	<span class="token function">Elements</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后为我们的 <code>matrix</code> 类型定义 <code>Add()</code>，<code>Min()</code>，<code>Mult()</code>，……等方法。</p><p>每种实现上述 <code>Algebraic</code> 接口类型的方法都可以链式调用。每个方法实现都应基于参数类型，使用 <code>switch</code> 类型断言来提供优化过的实现。另外，应该为仅依赖于接口的方法，指定一个默认处理分支：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>denseMatrix<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>b Algebraic<span class="token punctuation">)</span> Algebraic <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> sparseMatrix<span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token function">addDenseToSparse</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">.</span><span class="token punctuation">(</span>sparseMatrix<span class="token punctuation">)</span><span class="token punctuation">)</span>
	…
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token keyword">for</span> x in <span class="token keyword">range</span> b<span class="token punctuation">.</span><span class="token function">Elements</span><span class="token punctuation">(</span><span class="token punctuation">)</span> …
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一个通用的功能无法仅使用接口方法来实现，你可能正在处理两个不怎么相似的类型，此时应该放弃这种运算符模式。例如，如果 <code>a</code> 是一个集合而 <code>b</code> 是一个矩阵，那么编写 <code>a.Add(b)</code> 没有意义。就集合和矩阵运算而言，很难实现一个通用的 <code>a.Add(b)</code> 方法。遇到这种情况，把包拆分成两个，然后提供单独的 <code>AlgebraicSet</code> 和 <code>AlgebraicMatrix</code> 接口。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,18);function m(b,g){const c=p("ExternalLinkIcon"),t=p("RouterLink");return l(),u("div",null,[r,s("p",null,[n("然而，更优雅和优选的方案是将运算符作为方法实现，标准库中到处都运用了这种做法。有关 Ryanne Dolan 实现的线性代数包的更详细信息，可以在 "),s("a",k,[n("https://github.com/skelterjohn/go.matrix"),a(c)]),n(" 找到。")]),v,s("ul",null,[s("li",null,[a(t,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),a(t,{to:"/the-way-to-go/17.3.html"},{default:e(()=>[n("可见性模式")]),_:1})]),s("li",null,[n("下一章："),a(t,{to:"/the-way-to-go/18.0.html"},{default:e(()=>[n("出于性能考虑的实用代码片段")]),_:1})])])])}const f=i(d,[["render",m],["__file","17.4.html.vue"]]);export{f as default};