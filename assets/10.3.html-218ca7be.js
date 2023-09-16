import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as i,c as p,a as s,d as t,w as e,b as n,e as l}from"./app-9da01d16.js";const u={},r=l(`<h1 id="_10-3-使用自定义包中的结构体" tabindex="-1"><a class="header-anchor" href="#_10-3-使用自定义包中的结构体" aria-hidden="true">#</a> 10.3 使用自定义包中的结构体</h1><p>下面的例子中，main.go 使用了一个结构体，它来自 struct_pack 下的包 <code>structPack</code>。</p><p>示例 10.5 <a href="examples/chapter_10/struct_pack/structPack.go">structPack.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> structPack

<span class="token keyword">type</span> ExpStruct <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Mi1 <span class="token builtin">int</span>
    Mf1 <span class="token builtin">float32</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 10.6 <a href="examples/chapter_10/main.go">main.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;./struct_pack/structPack&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    struct1 <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>structPack<span class="token punctuation">.</span>ExpStruct<span class="token punctuation">)</span>
    struct1<span class="token punctuation">.</span>Mi1 <span class="token operator">=</span> <span class="token number">10</span>
    struct1<span class="token punctuation">.</span>Mf1 <span class="token operator">=</span> <span class="token number">16.</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Mi1 = %d\\n&quot;</span><span class="token punctuation">,</span> struct1<span class="token punctuation">.</span>Mi1<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Mf1 = %f\\n&quot;</span><span class="token punctuation">,</span> struct1<span class="token punctuation">.</span>Mf1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>Mi1 = 10
Mf1 = 16.000000
</code></pre><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,9);function d(k,m){const a=o("RouterLink");return i(),p("div",null,[r,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/10.2.html"},{default:e(()=>[n("使用工厂方法创建结构体实例")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/10.4.html"},{default:e(()=>[n("带标签的结构体")]),_:1})])])])}const b=c(u,[["render",d],["__file","10.3.html.vue"]]);export{b as default};
