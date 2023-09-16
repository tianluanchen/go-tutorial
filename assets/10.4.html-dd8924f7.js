import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c,a as s,b as n,d as t,w as e,e as l}from"./app-9da01d16.js";const u={},r=s("h1",{id:"_10-4-带标签的结构体",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_10-4-带标签的结构体","aria-hidden":"true"},"#"),n(" 10.4 带标签的结构体")],-1),d=s("code",null,"reflect",-1),k=s("code",null,"reflect",-1),m=s("code",null,"reflect.TypeOf()",-1),v=l(`<p>示例 10.7 <a href="examples/chapter_10/struct_tag.go">struct_tag.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> TagType <span class="token keyword">struct</span> <span class="token punctuation">{</span> <span class="token comment">// tags</span>
	field1 <span class="token builtin">bool</span>   <span class="token string">&quot;An important answer&quot;</span>
	field2 <span class="token builtin">string</span> <span class="token string">&quot;The name of the thing&quot;</span>
	field3 <span class="token builtin">int</span>    <span class="token string">&quot;How much there are&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tt <span class="token operator">:=</span> TagType<span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">&quot;Barak Obama&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token function">refTag</span><span class="token punctuation">(</span>tt<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">refTag</span><span class="token punctuation">(</span>tt TagType<span class="token punctuation">,</span> ix <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ttType <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>tt<span class="token punctuation">)</span>
	ixField <span class="token operator">:=</span> ttType<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>ix<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v\\n&quot;</span><span class="token punctuation">,</span> ixField<span class="token punctuation">.</span>Tag<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>An important answer
The name of the thing
How much there are
</code></pre><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,5);function f(h,b){const a=p("RouterLink");return i(),c("div",null,[r,s("p",null,[n("结构体中的字段除了有名字和类型外，还可以有一个可选的标签 (tag)：它是一个附属于字段的字符串，可以是文档或其他的重要标记。标签的内容不可以在一般的编程中使用，只有包 "),d,n(" 能获取它。我们将在下一章（"),t(a,{to:"/the-way-to-go/11.10.html"},{default:e(()=>[n("第 11.10 节")]),_:1}),n("中深入的探讨 "),k,n(" 包，它可以在运行时自省类型、属性和方法，比如：在一个变量上调用 "),m,n(" 可以获取变量的正确类型，如果变量是一个结构体类型，就可以通过 Field 来索引结构体的字段，然后就可以使用 Tag 属性。")]),v,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/10.3.html"},{default:e(()=>[n("使用自定义包中的结构体")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/10.5.html"},{default:e(()=>[n("匿名字段和内嵌结构体")]),_:1})])])])}const y=o(u,[["render",f],["__file","10.4.html.vue"]]);export{y as default};
