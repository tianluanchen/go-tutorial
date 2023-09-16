import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as s,d as e,w as t,b as n,e as i}from"./app-9da01d16.js";const u={},r=i(`<h1 id="_14-8-惰性生成器的实现" tabindex="-1"><a class="header-anchor" href="#_14-8-惰性生成器的实现" aria-hidden="true">#</a> 14.8 惰性生成器的实现</h1><p>生成器是指当被调用时返回一个序列中下一个值的函数，例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    <span class="token function">generateInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token number">0</span>
    <span class="token function">generateInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token number">1</span>
    <span class="token function">generateInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token number">2</span>
    <span class="token operator">...</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成器每次返回的是序列中下一个值而非整个序列；这种特性也称之为惰性求值：只在你需要时进行求值，同时保留相关变量资源（内存和 CPU）：这是一项在需要时对表达式进行求值的技术。例如，生成一个无限数量的偶数序列：要产生这样一个序列并且在一个一个的使用可能会很困难，而且内存会溢出！但是一个含有通道和 go 协程的函数能轻易实现这个需求。</p><p>在 14.12 的例子中，我们实现了一个使用 <code>int</code> 型通道来实现的生成器。通道被命名为 <code>yield</code> 和 <code>resume</code> ，这些词经常在协程代码中使用。</p><p>示例 14.12 <a href="examples/chapter_14/lazy_evaluation.go">lazy_evaluation.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> resume <span class="token keyword">chan</span> <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">integers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    yield <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
    count <span class="token operator">:=</span> <span class="token number">0</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">{</span>
            yield <span class="token operator">&lt;-</span> count
            count<span class="token operator">++</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> yield
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">generateInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;-</span>resume
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    resume <span class="token operator">=</span> <span class="token function">integers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">generateInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">//=&gt; 0</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">generateInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">//=&gt; 1</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">generateInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">//=&gt; 2    </span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有一个细微的区别是从通道读取的值可能会是稍早前产生的，并不是在程序被调用时生成的。如果确实需要这样的行为，就得实现一个请求响应机制。当生成器生成数据的过程是计算密集型且各个结果的顺序并不重要时，那么就可以将生成器放入到 go 协程实现并行化。但是得小心，使用大量的 go 协程的开销可能会超过带来的性能增益。</p><p>这些原则可以概括为：通过巧妙地使用空接口、闭包和高阶函数，我们能实现一个通用的惰性生产器的工厂函数 <code>BuildLazyEvaluator</code>（这个应该放在一个工具包中实现）。工厂函数需要一个函数和一个初始状态作为输入参数，返回一个无参、返回值是生成序列的函数。传入的函数需要计算出下一个返回值以及下一个状态参数。在工厂函数中，创建一个通道和无限循环的 go 协程。返回值被放到了该通道中，返回函数稍后被调用时从该通道中取得该返回值。每当取得一个值时，下一个值即被计算。在下面的例子中，定义了一个 <code>evenFunc</code> 函数，其是一个惰性生成函数：在 <code>main()</code> 函数中，我们创建了前 10 个偶数，每个都是通过调用 <code>even()</code> 函数取得下一个值的。为此，我们需要在 <code>BuildLazyIntEvaluator</code> 函数中具体化我们的生成函数，然后我们能够基于此做出定义。</p><p>示例 14.13 <a href="examples/chapter_14/general_lazy_evalution1.go">general_lazy_evalution1.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Any <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">type</span> EvalFunc <span class="token keyword">func</span><span class="token punctuation">(</span>Any<span class="token punctuation">)</span> <span class="token punctuation">(</span>Any<span class="token punctuation">,</span> Any<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    evenFunc <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>state Any<span class="token punctuation">)</span> <span class="token punctuation">(</span>Any<span class="token punctuation">,</span> Any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        os <span class="token operator">:=</span> state<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
        ns <span class="token operator">:=</span> os <span class="token operator">+</span> <span class="token number">2</span>
        <span class="token keyword">return</span> os<span class="token punctuation">,</span> ns
    <span class="token punctuation">}</span>
    
    even <span class="token operator">:=</span> <span class="token function">BuildLazyIntEvaluator</span><span class="token punctuation">(</span>evenFunc<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%vth even: %v\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token function">even</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">BuildLazyEvaluator</span><span class="token punctuation">(</span>evalFunc EvalFunc<span class="token punctuation">,</span> initState Any<span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Any <span class="token punctuation">{</span>
    retValChan <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Any<span class="token punctuation">)</span>
    loopFunc <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> actState Any <span class="token operator">=</span> initState
        <span class="token keyword">var</span> retVal Any
        <span class="token keyword">for</span> <span class="token punctuation">{</span>
            retVal<span class="token punctuation">,</span> actState <span class="token operator">=</span> <span class="token function">evalFunc</span><span class="token punctuation">(</span>actState<span class="token punctuation">)</span>
            retValChan <span class="token operator">&lt;-</span> retVal
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    retFunc <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Any <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">&lt;-</span> retValChan
    <span class="token punctuation">}</span>
    <span class="token keyword">go</span> <span class="token function">loopFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> retFunc
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">BuildLazyIntEvaluator</span><span class="token punctuation">(</span>evalFunc EvalFunc<span class="token punctuation">,</span> initState Any<span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    ef <span class="token operator">:=</span> <span class="token function">BuildLazyEvaluator</span><span class="token punctuation">(</span>evalFunc<span class="token punctuation">,</span> initState<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">ef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>0th even<span class="token punctuation">:</span> <span class="token number">0</span>
1th even<span class="token punctuation">:</span> <span class="token number">2</span>
2th even<span class="token punctuation">:</span> <span class="token number">4</span>
3th even<span class="token punctuation">:</span> <span class="token number">6</span>
4th even<span class="token punctuation">:</span> <span class="token number">8</span>
5th even<span class="token punctuation">:</span> <span class="token number">10</span>
6th even<span class="token punctuation">:</span> <span class="token number">12</span>
7th even<span class="token punctuation">:</span> <span class="token number">14</span>
8th even<span class="token punctuation">:</span> <span class="token number">16</span>
9th even<span class="token punctuation">:</span> <span class="token number">18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>练习14.12：<a href="exercises/chapter_14/general_lazy_evalution2.go">general_lazy_evaluation2.go</a><br> 通过使用 14.12 中工厂函数生成前 10 个斐波那契数</p><p>提示：因为斐波那契数增长很迅速，使用 <code>uint64</code> 类型。<br> 注：这种计算通常被定义为递归函数，但是在没有尾递归的语言中，例如 go 语言，这可能会导致栈溢出，但随着 go 语言中堆栈可扩展的优化，这个问题就不那么严重。这里的诀窍是使用了惰性求值。gccgo 编译器在某些情况下会实现尾递归。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,16);function k(d,v){const a=o("RouterLink");return c(),l("div",null,[r,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/14.7.html"},{default:t(()=>[n("新旧模型对比：任务和worker")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/14.9.html"},{default:t(()=>[n("实现 Futures 模式")]),_:1})])])])}const g=p(u,[["render",k],["__file","14.8.html.vue"]]);export{g as default};
