import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as l,a as s,b as n,d as t,w as e,e as i}from"./app-9da01d16.js";const u={},r=s("h1",{id:"_15-10-基于网络的通道-netchan",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_15-10-基于网络的通道-netchan","aria-hidden":"true"},"#"),n(" 15.10 基于网络的通道 netchan")],-1),d=s("p",null,[n("备注：Go 团队决定改进并重新打造 "),s("code",null,"netchan"),n(" 包的现有版本，它已被移至 "),s("code",null,"old/netchan"),n("。"),s("code",null,"old/"),n(" 目录用于存放过时的包代码，它们不会成为 Go 1.x 的一部分。本节仅出于向后兼容性讨论 "),s("code",null,"netchan"),n(" 包的概念。")],-1),k=s("code",null,"rpc",-1),m=s("code",null,"netchan",-1),v=s("code",null,"exporter",-1),h=s("code",null,"importer",-1),_=i(`<p>发送端示例代码如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>exp<span class="token punctuation">,</span> err <span class="token operator">:=</span> netchan<span class="token punctuation">.</span><span class="token function">NewExporter</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;netchanserver.mydomain.com:1234&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Error making Exporter: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> myType<span class="token punctuation">)</span>
err <span class="token operator">:=</span> exp<span class="token punctuation">.</span><span class="token function">Export</span><span class="token punctuation">(</span><span class="token string">&quot;sendmyType&quot;</span><span class="token punctuation">,</span> ch<span class="token punctuation">,</span> netchan<span class="token punctuation">.</span>Send<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Send Error: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接收端示例代码如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>imp<span class="token punctuation">,</span> err <span class="token operator">:=</span> netchan<span class="token punctuation">.</span><span class="token function">NewImporter</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;netchanserver.mydomain.com:1234&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Error making Importer: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> myType<span class="token punctuation">)</span>
err <span class="token operator">=</span> imp<span class="token punctuation">.</span><span class="token function">Import</span><span class="token punctuation">(</span><span class="token string">&quot;sendmyType&quot;</span><span class="token punctuation">,</span> ch<span class="token punctuation">,</span> netchan<span class="token punctuation">.</span>Receive<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Receive Error: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,5);function g(f,b){const a=p("RouterLink");return c(),l("div",null,[r,d,s("p",null,[n("一项和 "),k,n(" 密切相关的技术是基于网络的通道。类似 "),t(a,{to:"/the-way-to-go/14.0.html"},{default:e(()=>[n("14 章")]),_:1}),n("所使用的通道都是本地的，它们仅存在于被执行的机器内存空间中。"),m,n(" 包实现了类型安全的网络化通道：它允许一个通道两端出现由网络连接的不同计算机。其实现原理是，在其中一台机器上将传输数据发送到通道中，那么就可以被另一台计算机上同类型的通道接收。一个导出器 ("),v,n(") 会按名称发布（一组）通道。导入器 ("),h,n(") 连接到导出的机器，并按名称导入这些通道。之后，两台机器就可按通常的方式来使用通道。网络通道不是同步的，它们类似于带缓存的通道。")]),_,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/15.9.html"},{default:e(()=>[n("用 rpc 实现远程过程调用")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/15.11.html"},{default:e(()=>[n("与 websocket 通信")]),_:1})])])])}const x=o(u,[["render",g],["__file","15.10.html.vue"]]);export{x as default};
