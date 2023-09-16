import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as l,a as s,d as e,w as t,b as n,e as p}from"./app-9da01d16.js";const d={},u=p(`<h1 id="_11-2-接口嵌套接口" tabindex="-1"><a class="header-anchor" href="#_11-2-接口嵌套接口" aria-hidden="true">#</a> 11.2 接口嵌套接口</h1><p>一个接口可以包含一个或多个其他的接口，这相当于直接将这些内嵌接口的方法列举在外层接口中一样。</p><p>比如接口 <code>File</code> 包含了 <code>ReadWrite</code> 和 <code>Lock</code> 的所有方法，它还额外有一个 <code>Close()</code> 方法。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> ReadWrite <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Read</span><span class="token punctuation">(</span>b Buffer<span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token function">Write</span><span class="token punctuation">(</span>b Buffer<span class="token punctuation">)</span> <span class="token builtin">bool</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Lock <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> File <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    ReadWrite
    Lock
    <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,5);function r(k,v){const a=c("RouterLink");return i(),l("div",null,[u,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/11.1.html"},{default:t(()=>[n("接口是什么")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/11.3.html"},{default:t(()=>[n("如何检测和转换接口变量的类型：类型断言")]),_:1})])])])}const f=o(d,[["render",r],["__file","11.2.html.vue"]]);export{f as default};
