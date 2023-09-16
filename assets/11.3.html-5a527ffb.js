import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as i,a as s,d as e,w as t,b as n,e as l}from"./app-9da01d16.js";const u={},r=l(`<h1 id="_11-3-类型断言-如何检测和转换接口变量的类型" tabindex="-1"><a class="header-anchor" href="#_11-3-类型断言-如何检测和转换接口变量的类型" aria-hidden="true">#</a> 11.3 类型断言：如何检测和转换接口变量的类型</h1><p>一个接口类型的变量 <code>varI</code> 中可以包含任何类型的值，必须有一种方式来检测它的 <strong>动态</strong> 类型，即运行时在变量中存储的值的实际类型。在执行过程中动态类型可能会有所不同，但是它总是可以分配给接口变量本身的类型。通常我们可以使用 <strong>类型断言</strong> 来测试在某个时刻 <code>varI</code> 是否包含类型 <code>T</code> 的值：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>v <span class="token operator">:=</span> varI<span class="token punctuation">.</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span>       <span class="token comment">// unchecked type assertion</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong><code>varI</code> 必须是一个接口变量</strong>，否则编译器会报错：<code>invalid type assertion: varI.(T) (non-interface type (type of varI) on left)</code> 。</p><p>类型断言可能是无效的，虽然编译器会尽力检查转换是否有效，但是它不可能预见所有的可能性。如果转换在程序运行时失败会导致错误发生。更安全的方式是使用以下形式来进行类型断言：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> varI<span class="token punctuation">.</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>  <span class="token comment">// checked type assertion</span>
    <span class="token function">Process</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
<span class="token comment">// varI is not of type T</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果转换合法，<code>v</code> 是 <code>varI</code> 转换到类型 <code>T</code> 的值，<code>ok</code> 会是 <code>true</code>；否则 <code>v</code> 是类型 <code>T</code> 的零值，<code>ok</code> 是 <code>false</code>，也没有运行时错误发生。</p><p><strong>应该总是使用上面的方式来进行类型断言</strong>。</p><p>多数情况下，我们可能只是想在 <code>if</code> 中测试一下 <code>ok</code> 的值，此时使用以下的方法会是最方便的：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> varI<span class="token punctuation">.</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 11.4 <a href="examples/chapter_11/type_interfaces.go">type_interfaces.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Square <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	side <span class="token builtin">float32</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Circle <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	radius <span class="token builtin">float32</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Shaper <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> areaIntf Shaper
	sq1 <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>Square<span class="token punctuation">)</span>
	sq1<span class="token punctuation">.</span>side <span class="token operator">=</span> <span class="token number">5</span>

	areaIntf <span class="token operator">=</span> sq1
	<span class="token comment">// Is Square the type of areaIntf?</span>
	<span class="token keyword">if</span> t<span class="token punctuation">,</span> ok <span class="token operator">:=</span> areaIntf<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Square<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;The type of areaIntf is: %T\\n&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> u<span class="token punctuation">,</span> ok <span class="token operator">:=</span> areaIntf<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Circle<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;The type of areaIntf is: %T\\n&quot;</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;areaIntf does not contain a variable of type Circle&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>sq <span class="token operator">*</span>Square<span class="token punctuation">)</span> <span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> sq<span class="token punctuation">.</span>side <span class="token operator">*</span> sq<span class="token punctuation">.</span>side
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>ci <span class="token operator">*</span>Circle<span class="token punctuation">)</span> <span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> ci<span class="token punctuation">.</span>radius <span class="token operator">*</span> ci<span class="token punctuation">.</span>radius <span class="token operator">*</span> math<span class="token punctuation">.</span>Pi
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>The type of areaIntf is: *main.Square
areaIntf does not contain a variable of type Circle
</code></pre><p>程序中定义了一个新类型 <code>Circle</code>，它也实现了 <code>Shaper</code> 接口。 <code>if t, ok := areaIntf.(*Square); ok</code> 测试 <code>areaIntf</code> 里是否有一个包含 <code>*Square</code> 类型的变量，结果是确定的；然后我们测试它是否包含一个 <code>*Circle</code> 类型的变量，结果是否定的。</p><p><strong>备注</strong></p><p>如果忽略 <code>areaIntf.(*Square)</code> 中的 <code>*</code> 号，会导致编译错误：<code>impossible type assertion: Square does not implement Shaper (Area method has pointer receiver)</code>。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,18);function d(k,v){const a=p("RouterLink");return c(),i("div",null,[r,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/11.2.html"},{default:t(()=>[n("接口嵌套接口")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/11.4.html"},{default:t(()=>[n("类型判断：type-switch")]),_:1})])])])}const f=o(u,[["render",d],["__file","11.3.html.vue"]]);export{f as default};
