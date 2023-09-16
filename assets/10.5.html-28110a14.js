import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as s,d as t,w as e,b as n,e as u}from"./app-9da01d16.js";const l={},r=u(`<h1 id="_10-5-匿名字段和内嵌结构体" tabindex="-1"><a class="header-anchor" href="#_10-5-匿名字段和内嵌结构体" aria-hidden="true">#</a> 10.5 匿名字段和内嵌结构体</h1><h2 id="_10-5-1-定义" tabindex="-1"><a class="header-anchor" href="#_10-5-1-定义" aria-hidden="true">#</a> 10.5.1 定义</h2><p>结构体可以包含一个或多个 <strong>匿名（或内嵌）字段</strong>，即这些字段没有显式的名字，只有字段的类型是必须的，此时类型就是字段的名字。匿名字段本身可以是一个结构体类型，即 <strong>结构体可以包含内嵌结构体</strong>。</p><p>可以粗略地将这个和面向对象语言中的继承概念相比较，随后将会看到它被用来模拟类似继承的行为。Go 语言中的继承是通过内嵌或组合来实现的，所以可以说，在 Go 语言中，相比较于继承，组合更受青睐。</p><p>考虑如下的程序：</p><p>示例 10.8 <a href="examples/chapter_10/structs_anonymous_fields.go">structs_anonymous_fields.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> innerS <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	in1 <span class="token builtin">int</span>
	in2 <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> outerS <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	b    <span class="token builtin">int</span>
	c    <span class="token builtin">float32</span>
	<span class="token builtin">int</span>  <span class="token comment">// anonymous field</span>
	innerS <span class="token comment">//anonymous field</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	outer <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>outerS<span class="token punctuation">)</span>
	outer<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">6</span>
	outer<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token number">7.5</span>
	outer<span class="token punctuation">.</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">60</span>
	outer<span class="token punctuation">.</span>in1 <span class="token operator">=</span> <span class="token number">5</span>
	outer<span class="token punctuation">.</span>in2 <span class="token operator">=</span> <span class="token number">10</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;outer.b is: %d\\n&quot;</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span>b<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;outer.c is: %f\\n&quot;</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span>c<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;outer.int is: %d\\n&quot;</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span><span class="token builtin">int</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;outer.in1 is: %d\\n&quot;</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span>in1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;outer.in2 is: %d\\n&quot;</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span>in2<span class="token punctuation">)</span>

	<span class="token comment">// 使用结构体字面量</span>
	outer2 <span class="token operator">:=</span> outerS<span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7.5</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> innerS<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;outer2 is:&quot;</span><span class="token punctuation">,</span> outer2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>outer.b is: 6
outer.c is: 7.500000
outer.int is: 60
outer.in1 is: 5
outer.in2 is: 10
outer2 is:{6 7.5 60 {5 10}}
</code></pre><p>通过类型 <code>outer.int</code> 的名字来获取存储在匿名字段中的数据，于是可以得出一个结论：在一个结构体中对于每一种数据类型只能有一个匿名字段。</p><h2 id="_10-5-2-内嵌结构体" tabindex="-1"><a class="header-anchor" href="#_10-5-2-内嵌结构体" aria-hidden="true">#</a> 10.5.2 内嵌结构体</h2><p>同样地结构体也是一种数据类型，所以它也可以作为一个匿名字段来使用，如同上面例子中那样。外层结构体通过 <code>outer.in1</code> 直接进入内层结构体的字段，内嵌结构体甚至可以来自其他包。内层结构体被简单的插入或者内嵌进外层结构体。这个简单的“继承”机制提供了一种方式，使得可以从另外一个或一些类型继承部分或全部实现。</p><p>另外一个例子：</p><p>示例 10.9 <a href="examples/chapter_10/embedd_struct.go">embedd_struct.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> A <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	ax<span class="token punctuation">,</span> ay <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> B <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	A
	bx<span class="token punctuation">,</span> by <span class="token builtin">float32</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	b <span class="token operator">:=</span> B<span class="token punctuation">{</span>A<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3.0</span><span class="token punctuation">,</span> <span class="token number">4.0</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>ax<span class="token punctuation">,</span> b<span class="token punctuation">.</span>ay<span class="token punctuation">,</span> b<span class="token punctuation">.</span>bx<span class="token punctuation">,</span> b<span class="token punctuation">.</span>by<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>A<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>1 2 3 4
{1 2}
</code></pre><p><strong>练习 10.5</strong> <a href="exercises/chapter_10/anonymous_struct.go">anonymous_struct.go</a>：</p><p>创建一个结构体，它有一个具名的 <code>float32</code> 字段，2 个匿名字段，类型分别是 <code>int</code> 和 <code>string</code>。通过结构体字面量新建一个结构体实例并打印它的内容。</p><h2 id="_10-5-3-命名冲突" tabindex="-1"><a class="header-anchor" href="#_10-5-3-命名冲突" aria-hidden="true">#</a> 10.5.3 命名冲突</h2><p>当两个字段拥有相同的名字（可能是继承来的名字）时该怎么办呢？</p><ol><li>外层名字会覆盖内层名字（但是两者的内存空间都保留），这提供了一种重载字段或方法的方式；</li><li>如果相同的名字在同一级别出现了两次，如果这个名字被程序使用了，将会引发一个错误（不使用没关系）。没有办法来解决这种问题引起的二义性，必须由程序员自己修正。</li></ol><p>例子：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> A <span class="token keyword">struct</span> <span class="token punctuation">{</span>a <span class="token builtin">int</span><span class="token punctuation">}</span>
<span class="token keyword">type</span> B <span class="token keyword">struct</span> <span class="token punctuation">{</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">}</span>

<span class="token keyword">type</span> C <span class="token keyword">struct</span> <span class="token punctuation">{</span>A<span class="token punctuation">;</span> B<span class="token punctuation">}</span>
<span class="token keyword">var</span> c C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>规则 2：使用 <code>c.a</code> 是错误的，到底是 <code>c.A.a</code> 还是 <code>c.B.a</code> 呢？会导致编译器错误：<strong><code>ambiguous DOT reference c.a disambiguate with either c.A.a or c.B.a</code></strong>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> D <span class="token keyword">struct</span> <span class="token punctuation">{</span>B<span class="token punctuation">;</span> b <span class="token builtin">float32</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> d D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>规则1：使用 <code>d.b</code> 是没问题的：它是 <code>float32</code>，而不是 <code>B</code> 的 <code>b</code>。如果想要内层的 <code>b</code> 可以通过 <code>d.B.b</code> 得到。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,28);function d(k,v){const a=o("RouterLink");return c(),i("div",null,[r,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/10.4.html"},{default:e(()=>[n("带标签的结构体")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/10.6.html"},{default:e(()=>[n("方法")]),_:1})])])])}const f=p(l,[["render",d],["__file","10.5.html.vue"]]);export{f as default};
