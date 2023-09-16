import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as i,a as s,b as n,d as t,w as e,e as l}from"./app-9da01d16.js";const u={},d=s("h1",{id:"_11-6-使用方法集与接口",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_11-6-使用方法集与接口","aria-hidden":"true"},"#"),n(" 11.6 使用方法集与接口")],-1),r=s("a",{href:"examples%5Cchapter_10%5Cmethodset1.go"},"methodset1.go",-1),k=l(`<p>示例 11.5 <a href="examples/chapter_11/methodset2.go">methodset2.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> List <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l List<span class="token punctuation">)</span> <span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>List<span class="token punctuation">)</span> <span class="token function">Append</span><span class="token punctuation">(</span>val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">*</span>l <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token operator">*</span>l<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Appender <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Append</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">CountInto</span><span class="token punctuation">(</span>a Appender<span class="token punctuation">,</span> start<span class="token punctuation">,</span> end <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> start<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> end<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		a<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Lener <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">LongEnough</span><span class="token punctuation">(</span>l Lener<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> l<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">10</span> <span class="token operator">&gt;</span> <span class="token number">42</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// A bare value</span>
	<span class="token keyword">var</span> lst List
	<span class="token comment">// compiler error:</span>
	<span class="token comment">// cannot use lst (type List) as type Appender in argument to CountInto:</span>
	<span class="token comment">//       List does not implement Appender (Append method has pointer receiver)</span>
	<span class="token comment">// CountInto(lst, 1, 10)</span>
	<span class="token keyword">if</span> <span class="token function">LongEnough</span><span class="token punctuation">(</span>lst<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// VALID: Identical receiver type</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;- lst is long enough\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// A pointer value</span>
	plst <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>List<span class="token punctuation">)</span>
	<span class="token function">CountInto</span><span class="token punctuation">(</span>plst<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">// VALID: Identical receiver type</span>
	<span class="token keyword">if</span> <span class="token function">LongEnough</span><span class="token punctuation">(</span>plst<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// VALID: a *List can be dereferenced for the receiver</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;- plst is long enough\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>讨论</strong></p><p>在 <code>lst</code> 上调用 <code>CountInto</code> 时会导致一个编译器错误，因为 <code>CountInto</code> 需要一个 <code>Appender</code>，而它的方法 <code>Append</code> 只定义在指针上。 在 <code>lst</code> 上调用 <code>LongEnough</code> 是可以的，因为 <code>Len</code> 定义在值上。</p><p>在 <code>plst</code> 上调用 <code>CountInto</code> 是可以的，因为 <code>CountInto</code> 需要一个 <code>Appender</code>，并且它的方法 <code>Append</code> 定义在指针上。 在 <code>plst</code> 上调用 <code>LongEnough</code> 也是可以的，因为指针会被自动解引用。</p><p><strong>总结</strong></p><p>在接口上调用方法时，必须有和方法定义时相同的接收者类型或者是可以根据具体类型 <code>P</code> 直接辨识的：</p><ul><li>指针方法可以通过指针调用</li><li>值方法可以通过值调用</li><li>接收者是值的方法可以通过指针调用，因为指针会首先被解引用</li><li>接收者是指针的方法不可以通过值调用，因为存储在接口中的值没有地址</li></ul><p>将一个值赋值给一个接口时，编译器会确保所有可能的接口方法都可以在此值上被调用，因此不正确的赋值在编译期就会失败。</p><p><strong>译注</strong></p><p>Go 语言规范定义了接口方法集的调用规则：</p><ul><li>类型 <code>*T</code> 的可调用方法集包含接受者为 <code>*T</code> 或 <code>T</code> 的所有方法集</li><li>类型 <code>T</code> 的可调用方法集包含接受者为 <code>T</code> 的所有方法</li><li>类型 <code>T</code> 的可调用方法集<strong>不</strong>包含接受者为 <code>*T</code> 的方法</li></ul><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,13);function v(m,b){const a=p("RouterLink");return c(),i("div",null,[d,s("p",null,[n("在"),t(a,{to:"/the-way-to-go/10.6.html"},{default:e(()=>[n("第 10.6.3 节")]),_:1}),n("及例子 "),r,n(" 中我们看到，作用于变量上的方法实际上是不区分变量到底是指针还是值的。当碰到接口类型值时，这会变得有点复杂，原因是接口变量中存储的具体值是不可寻址的，幸运的是，如果使用不当编译器会给出错误。考虑下面的程序：")]),k,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/11.5.html"},{default:e(()=>[n("测试一个值是否实现了某个接口")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/11.7.html"},{default:e(()=>[n("第一个例子：使用 Sorter 接口排序")]),_:1})])])])}const g=o(u,[["render",v],["__file","11.6.html.vue"]]);export{g as default};
