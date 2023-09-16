import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as l,a as s,d as t,w as e,b as n,e as i}from"./app-9da01d16.js";const u={},r=i(`<h1 id="_14-12-链式协程" tabindex="-1"><a class="header-anchor" href="#_14-12-链式协程" aria-hidden="true">#</a> 14.12 链式协程</h1><p>下面的演示程序 <a href="examples/chapter_14/chaining.go">chaining.go</a> 再次展示了启动巨量的 Go 协程是多么容易。这些协程已全部在 <code>main()</code> 函数中的 <code>for</code> 循环里启动。当循环完成之后，一个 <code>0</code> 被写入到最右边的通道里，于是 100,000 个协程开始执行，接着 <code>1000000</code> 这个结果会在 1.5 秒之内被打印出来。</p><p>这个程序同时也展示了如何通过 <code>flag.Int</code> 来解析命令行中的参数以指定协程数量，例如：<code>chaining -n=7000</code> 会生成 7000 个协程。</p><p>示例 14.17-<a href="examples/chapter_14/chaining.go">chaining.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;flag&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> ngoroutine <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token string">&quot;n&quot;</span><span class="token punctuation">,</span> <span class="token number">100000</span><span class="token punctuation">,</span> <span class="token string">&quot;how many goroutines&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> left <span class="token operator">&lt;-</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token operator">&lt;-</span>right <span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	leftmost <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> left<span class="token punctuation">,</span> right <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> leftmost
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token operator">*</span>ngoroutine<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		left<span class="token punctuation">,</span> right <span class="token operator">=</span> right<span class="token punctuation">,</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token function">f</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	right <span class="token operator">&lt;-</span> <span class="token number">0</span>      <span class="token comment">// bang!</span>
	x <span class="token operator">:=</span> <span class="token operator">&lt;-</span>leftmost <span class="token comment">// wait for completion</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>  <span class="token comment">// 100000, about 1.5 s</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（</p><p>译者注：原本认为 <code>leftmost</code> 的结果为 <code>1</code> ，认为只在最初做了一次赋值，实际结果为 <code>100000</code>（无缓存信道具有同步阻塞的特性）</p><ol><li><p>主线程的 <code>right &lt;- 0</code>，right 不是最初循环的那个 <code>right</code>，而是最终循环的 <code>right</code></p></li><li><p><code>for</code> 循环中最初的 <code>go f(left, right)</code> 因为没有发送者一直处于等待状态</p></li><li><p>当主线程的 <code>right &lt;- 0</code> 执行时，类似于递归函数在最内层产生返回值一般</p></li></ol><p>）</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,10);function d(k,m){const a=p("RouterLink");return c(),l("div",null,[r,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/14.11.html"},{default:e(()=>[n("限制同时处理的请求数")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/14.13.html"},{default:e(()=>[n("在多核心上并行计算")]),_:1})])])])}const f=o(u,[["render",d],["__file","14.12.html.vue"]]);export{f as default};