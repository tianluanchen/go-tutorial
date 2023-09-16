import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as s,d as t,w as e,b as n,e as l}from"./app-9da01d16.js";const u={},d=l(`<h1 id="_16-9-闭包和协程的使用" tabindex="-1"><a class="header-anchor" href="#_16-9-闭包和协程的使用" aria-hidden="true">#</a> 16.9 闭包和协程的使用</h1><p>请看下面代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> values <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 版本 A：</span>
    <span class="token keyword">for</span> ix <span class="token operator">:=</span> <span class="token keyword">range</span> values <span class="token punctuation">{</span> <span class="token comment">// ix 是索引值</span>
        <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>ix<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 调用闭包打印每个索引值</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 版本 B：和 A 版本类似，但是通过调用闭包作为一个协程</span>
    <span class="token keyword">for</span> ix <span class="token operator">:=</span> <span class="token keyword">range</span> values <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>ix<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5e9</span><span class="token punctuation">)</span>
    <span class="token comment">// 版本 C：正确的处理方式</span>
    <span class="token keyword">for</span> ix <span class="token operator">:=</span> <span class="token keyword">range</span> values <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ix <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>ix<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span>ix<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5e9</span><span class="token punctuation">)</span>
    <span class="token comment">// 版本 D：输出值：</span>
    <span class="token keyword">for</span> ix <span class="token operator">:=</span> <span class="token keyword">range</span> values <span class="token punctuation">{</span>
        val <span class="token operator">:=</span> values<span class="token punctuation">[</span>ix<span class="token punctuation">]</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1e9</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0 1 2 3 4

4 4 4 4 4

1 0 3 4 2

10 11 12 13 14
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>版本 A 调用闭包 5 次打印每个索引值，版本 B 也做相同的事，但是通过协程调用每个闭包。按理说这将执行得更快，因为闭包是并发执行的。如果我们阻塞足够多的时间，让所有协程执行完毕，版本 B 的输出是：<code>4 4 4 4 4</code>。为什么会这样？在版本 B 的循环中，<code>ix</code> 变量实际是一个单变量，表示每个数组元素的索引值。因为这些闭包都只绑定到一个变量，这是一个比较好的方式，当你运行这段代码时，你将看见每次循环都打印最后一个索引值 <code>4</code>，而不是每个元素的索引值。因为协程可能在循环结束后还没有开始执行，而此时 <code>ix</code> 值是 <code>4</code>。</p><p>版本 C 的循环写法才是正确的：调用每个闭包时将 <code>ix</code> 作为参数传递给闭包。<code>ix</code> 在每次循环时都被重新赋值，并将每个协程的 <code>ix</code> 放置在栈中，所以当协程最终被执行时，每个索引值对协程都是可用的。注意这里的输出可能是 <code>0 2 1 3 4</code> 或者 <code>0 3 1 2 4</code> 或者其他类似的序列，这主要取决于每个协程何时开始被执行。</p><p>在版本 D 中，我们输出这个数组的值，为什么版本 B 不能而版本 D 可以呢？</p><p>因为版本 D 中的变量声明是在循环体内部，所以在每次循环时，这些变量相互之间是不共享的，所以这些变量可以单独的被每个闭包使用。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,10);function k(r,v){const a=o("RouterLink");return c(),i("div",null,[d,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/16.8.html"},{default:e(()=>[n("误用协程和通道")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/16.10.html"},{default:e(()=>[n("糟糕的错误处理")]),_:1})])])])}const f=p(u,[["render",k],["__file","16.9.html.vue"]]);export{f as default};
