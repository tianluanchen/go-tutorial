import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as p,a as e,b as a,d as t,w as s,e as i}from"./app-9da01d16.js";const r={},u=i(`<h1 id="_18-9-网络和网页应用" tabindex="-1"><a class="header-anchor" href="#_18-9-网络和网页应用" aria-hidden="true">#</a> 18.9 网络和网页应用</h1><h2 id="_18-9-1-模板" tabindex="-1"><a class="header-anchor" href="#_18-9-1-模板" aria-hidden="true">#</a> 18.9.1 模板：</h2><p>制作、解析并使模板生效：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> strTempl <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;TName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>strTemplateHTML<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在网页应用中使用 HTML 过滤器过滤 HTML 特殊字符：</p><p>使用 <code>{{html .}}</code> 或者通过一个字段 <code>FieldName {{ .FieldName |html }}</code></p>`,6),d=e("h2",{id:"链接",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),a(" 链接")],-1);function h(_,m){const n=l("RouterLink");return c(),p("div",null,[u,e("p",null,[a("使用缓存模板（参考"),t(n,{to:"/the-way-to-go/15.7.html"},{default:s(()=>[a("章节 15.7")]),_:1}),a("）")]),d,e("ul",null,[e("li",null,[t(n,{to:"/the-way-to-go/directory.html"},{default:s(()=>[a("目录")]),_:1})]),e("li",null,[a("上一节："),t(n,{to:"/the-way-to-go/18.8.html"},{default:s(()=>[a("协程 (goroutine) 与通道 (channel)")]),_:1})]),e("li",null,[a("下一节："),t(n,{to:"/the-way-to-go/18.10.html"},{default:s(()=>[a("其他")]),_:1})])])])}const g=o(r,[["render",h],["__file","18.9.html.vue"]]);export{g as default};
