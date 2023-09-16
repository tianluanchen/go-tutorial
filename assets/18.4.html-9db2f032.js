import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c,a as s,d as e,w as t,b as n,e as i}from"./app-9da01d16.js";const u={},r=i(`<h1 id="_18-4-结构体" tabindex="-1"><a class="header-anchor" href="#_18-4-结构体" aria-hidden="true">#</a> 18.4 结构体</h1><ul><li>创建：</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> struct1 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    field1 type1
    field2 type2
    …
<span class="token punctuation">}</span>
ms <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>struct1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>初始化：</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>ms <span class="token operator">:=</span> <span class="token operator">&amp;</span>struct1<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15.5</span><span class="token punctuation">,</span> <span class="token string">&quot;Chris&quot;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当结构体的命名以大写字母开头时，该结构体在包外可见。<br> 通常情况下，为每个结构体定义一个构建函数，并推荐使用构建函数初始化结构体（参考<a href="examples/chapter_10/person.go">例 10.2</a>）：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>ms <span class="token operator">:=</span> Newstruct1<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15.5</span><span class="token punctuation">,</span> <span class="token string">&quot;Chris&quot;</span><span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Newstruct1</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> f <span class="token builtin">float32</span><span class="token punctuation">,</span> name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>struct1 <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>struct1<span class="token punctuation">{</span>n<span class="token punctuation">,</span> f<span class="token punctuation">,</span> name<span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,8);function d(k,m){const a=p("RouterLink");return l(),c("div",null,[r,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/18.3.html"},{default:t(()=>[n("映射")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/18.5.html"},{default:t(()=>[n("接口")]),_:1})])])])}const b=o(u,[["render",d],["__file","18.4.html.vue"]]);export{b as default};
