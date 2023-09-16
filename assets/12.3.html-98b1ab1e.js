import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as i,a as s,d as t,w as e,b as n,e as l}from"./app-9da01d16.js";const u={},r=l(`<h1 id="_12-3-文件拷贝" tabindex="-1"><a class="header-anchor" href="#_12-3-文件拷贝" aria-hidden="true">#</a> 12.3 文件拷贝</h1><p>如何拷贝一个文件到另一个文件？最简单的方式就是使用 <code>io</code> 包：</p><p>示例 12.10 <a href="examples/chapter_12/filecopy.go">filecopy.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// filecopy.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">CopyFile</span><span class="token punctuation">(</span><span class="token string">&quot;target.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;source.txt&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Copy done!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">CopyFile</span><span class="token punctuation">(</span>dstName<span class="token punctuation">,</span> srcName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>written <span class="token builtin">int64</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	src<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>srcName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> src<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	dst<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>dstName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> dst<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>dst<span class="token punctuation">,</span> src<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 <code>defer</code> 的使用：当打开 <code>dst</code> 文件时发生了错误，那么 <code>defer</code> 仍然能够确保 <code>src.Close()</code> 执行。如果不这么做，<code>src</code> 文件会一直保持打开状态并占用资源。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,6);function d(k,v){const a=p("RouterLink");return c(),i("div",null,[r,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/12.2.html"},{default:e(()=>[n("文件读写")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/12.4.html"},{default:e(()=>[n("从命令行读取参数")]),_:1})])])])}const f=o(u,[["render",d],["__file","12.3.html.vue"]]);export{f as default};
