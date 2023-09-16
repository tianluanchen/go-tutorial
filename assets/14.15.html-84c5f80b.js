import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as p,c as l,a as s,d as e,w as o,b as n,e as i}from"./app-9da01d16.js";const r={},d=i(`<h1 id="_14-15-漏桶算法" tabindex="-1"><a class="header-anchor" href="#_14-15-漏桶算法" aria-hidden="true">#</a> 14.15 漏桶算法</h1><p>（译者注：翻译遵照原文，但是对于完全没听过这个算法的人来说比较晦涩，请配合代码片段理解）</p><p>考虑以下的客户端-服务器结构：客户端协程执行一个无限循环从某个源头（也许是网络）接收数据；数据读取到 <code>Buffer</code> 类型的缓冲区。为了避免分配过多的缓冲区以及释放缓冲区，它保留了一份空闲缓冲区列表，并且使用一个缓冲通道来表示这个列表：<code>var freeList = make(chan *Buffer,100)</code></p><p>这个可重用的缓冲区队列 (<code>freeList</code>) 与服务器是共享的。 当接收数据时，客户端尝试从 <code>freeList</code> 获取缓冲区；但如果此时通道为空，则会分配新的缓冲区。一旦消息被加载后，它将被发送到服务器上的 <code>serverChan</code> 通道：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> serverChan <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Buffer<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以下是客户端的算法代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">client</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">for</span> <span class="token punctuation">{</span>
       <span class="token keyword">var</span> b <span class="token operator">*</span>Buffer
       <span class="token comment">// Grab a buffer if available; allocate if not </span>
       <span class="token keyword">select</span> <span class="token punctuation">{</span>
           <span class="token keyword">case</span> b <span class="token operator">=</span> <span class="token operator">&lt;-</span>freeList<span class="token punctuation">:</span>
               <span class="token comment">// Got one; nothing more to do</span>
           <span class="token keyword">default</span><span class="token punctuation">:</span>
               <span class="token comment">// None free, so allocate a new one</span>
               b <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">)</span>
       <span class="token punctuation">}</span>
       <span class="token function">loadInto</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>         <span class="token comment">// Read next message from the network</span>
       serverChan <span class="token operator">&lt;-</span> b     <span class="token comment">// Send to server</span>
       
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务器的循环则接收每一条来自客户端的消息并处理它，之后尝试将缓冲返回给共享的空闲缓冲区：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">server</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        b <span class="token operator">:=</span> <span class="token operator">&lt;-</span>serverChan       <span class="token comment">// Wait for work.</span>
        <span class="token function">process</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
        <span class="token comment">// Reuse buffer if there&#39;s room.</span>
        <span class="token keyword">select</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> freeList <span class="token operator">&lt;-</span> b<span class="token punctuation">:</span>
                <span class="token comment">// Reuse buffer if free slot on freeList; nothing more to do</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>
                <span class="token comment">// Free list full, just carry on: the buffer is &#39;dropped&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是这种方法在 <code>freeList</code> 通道已满的时候是行不通的，因为无法放入空闲 <code>freeList</code> 通道的缓冲区会被“丢到地上”由垃圾收集器回收（故名：漏桶算法）。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,11);function u(k,v){const a=c("RouterLink");return p(),l("div",null,[d,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:o(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/14.14.html"},{default:o(()=>[n("并行化大量数据的计算")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/14.16.html"},{default:o(()=>[n("对 Go 协程进行基准测试")]),_:1})])])])}const b=t(r,[["render",u],["__file","14.15.html.vue"]]);export{b as default};
