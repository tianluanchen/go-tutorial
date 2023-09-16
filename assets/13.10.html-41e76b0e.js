import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c as r,a as s,b as n,d as a,w as o,e as t}from"./app-9da01d16.js";const d={},u=t(`<h1 id="_13-10-性能调试-分析并优化-go-程序" tabindex="-1"><a class="header-anchor" href="#_13-10-性能调试-分析并优化-go-程序" aria-hidden="true">#</a> 13.10 性能调试：分析并优化 Go 程序</h1><h2 id="_13-10-1-时间和内存消耗" tabindex="-1"><a class="header-anchor" href="#_13-10-1-时间和内存消耗" aria-hidden="true">#</a> 13.10.1 时间和内存消耗</h2><p>可以用这个便捷脚本 <em>xtime</em> 来测量：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
/usr/bin/time <span class="token parameter variable">-f</span> <span class="token string">&#39;%Uu %Ss %er %MkB %C&#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Unix 命令行中像这样使用 <code>xtime goprogexec</code>，这里的 progexec 是一个 Go 可执行程序，这句命令行输出类似：56.63u 0.26s 56.92r 1642640kB progexec，分别对应用户时间，系统时间，实际时间和最大内存占用。</p><h2 id="_13-10-2-用-go-test-调试" tabindex="-1"><a class="header-anchor" href="#_13-10-2-用-go-test-调试" aria-hidden="true">#</a> 13.10.2 用 go test 调试</h2><p>如果代码使用了 Go 中 <code>testing</code> 包的基准测试功能，我们可以用 gotest 标准的 <code>-cpuprofile</code> 和 <code>-memprofile</code> 标志向指定文件写入 CPU 或 内存使用情况报告。</p><p>使用方式：<code>go test -x -v -cpuprofile=prof.out -file x_test.go</code></p><p>编译执行 x_test.go 中的测试，并向 prof.out 文件中写入 cpu 性能分析信息。</p><h2 id="_13-10-3-用-pprof-调试" tabindex="-1"><a class="header-anchor" href="#_13-10-3-用-pprof-调试" aria-hidden="true">#</a> 13.10.3 用 pprof 调试</h2><p>你可以在单机程序 progexec 中引入 <code>runtime/pprof</code> 包；这个包以 pprof 可视化工具需要的格式写入运行时报告数据。对于 CPU 性能分析来说你需要添加一些代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> cpuprofile <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">&quot;cpuprofile&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;write cpu profile to file&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">*</span>cpuprofile <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
		f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">*</span>cpuprofile<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		pprof<span class="token punctuation">.</span><span class="token function">StartCPUProfile</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
		<span class="token keyword">defer</span> pprof<span class="token punctuation">.</span><span class="token function">StopCPUProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码定义了一个名为 cpuprofile 的 flag，调用 Go flag 库来解析命令行 flag，如果命令行设置了 cpuprofile flag，则开始 CPU 性能分析并把结果重定向到那个文件（<code>os.Create</code> 用拿到的名字创建了用来写入分析数据的文件）。这个分析程序最后需要在程序退出之前调用 <code>StopCPUProfile()</code> 来刷新挂起的写操作到文件中；我们用 <code>defer</code> 来保证这一切会在 <code>main()</code> 返回时触发。</p><p>现在用这个 flag 运行程序：<code>progexec -cpuprofile=progexec.prof</code></p><p>然后可以像这样用 gopprof 工具：<code>gopprof progexec progexec.prof</code></p>`,15),k={href:"https://github.com/gperftools/gperftools",target:"_blank",rel:"noopener noreferrer"},v=t(`<p>如果开启了 CPU 性能分析，Go 程序会以大约每秒 100 次的频率阻塞，并记录当前执行的 goroutine 栈上的程序计数器样本。</p><p>此工具一些有趣的命令：</p><p>1）<code>topN</code></p><p>用来展示分析结果中最开头的 N 份样本，例如：<code>top5</code><br> 它会展示在程序运行期间调用最频繁的 5 个函数，输出如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Total: 3099 samples
626 20.2% 20.2% 626 20.2% scanblock
309 10.0% 30.2% 2839 91.6% main.FindLoops
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第 5 列表示函数的调用频度。</p><p>2）<code>web</code> 或 <code>web 函数名</code></p><p>该命令生成一份 SVG 格式的分析数据图表，并在网络浏览器中打开它（还有一个 gv 命令可以生成 PostScript 格式的数据，并在 GhostView 中打开，这个命令需要安装 graphviz）。函数被表示成不同的矩形（被调用越多，矩形越大），箭头指示函数调用链。</p><p>3）<code>list 函数名</code> 或 <code>weblist 函数名</code></p><p>展示对应函数名的代码行列表，第 2 列表示当前行执行消耗的时间，这样就很好地指出了运行过程中消耗最大的代码。</p><p>如果发现函数 <code>runtime.mallocgc</code>（分配内存并执行周期性的垃圾回收）调用频繁，那么是应该进行内存分析的时候了。找出垃圾回收频繁执行的原因，和内存大量分配的根源。</p><p>为了做到这一点必须在合适的地方添加下面的代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> memprofile <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">&quot;memprofile&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;write memory profile to this file&quot;</span><span class="token punctuation">)</span>
<span class="token operator">...</span>

<span class="token function">CallToFunctionWhichAllocatesLotsOfMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token operator">*</span>memprofile <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">*</span>memprofile<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	pprof<span class="token punctuation">.</span><span class="token function">WriteHeapProfile</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
	f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用 <code>-memprofile flag</code> 运行这个程序：<code>progexec -memprofile=progexec.mprof</code></p><p>然后你可以像这样再次使用 gopprof 工具：<code>gopprof progexec progexec.mprof</code></p><p><code>top5</code>，<code>list 函数名</code> 等命令同样适用，只不过现在是以 Mb 为单位测量内存分配情况，这是 top 命令输出的例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Total: 118.3 MB
	66.1 55.8% 55.8% 103.7 87.7% main.FindLoops
	30.5 25.8% 81.6% 30.5 25.8% main.*LSG·NewLoop
	...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从第 1 列可以看出，最上面的函数占用了最多的内存。</p><p>同样有一个报告内存分配计数的有趣工具：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gopprof <span class="token parameter variable">--inuse_objects</span> progexec progexec.mprof
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于 web 应用来说，有标准的 HTTP 接口可以分析数据。在 HTTP 服务中添加</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token boolean">_</span> <span class="token string">&quot;http/pprof&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会为 /debug/pprof/ 下的一些 URL 安装处理器。然后你可以用一个唯一的参数——你服务中的分析数据的 URL 来执行 gopprof 命令——它会下载并执行在线分析。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gopprof http://localhost:6060/debug/pprof/profile <span class="token comment"># 30-second CPU profile</span>
gopprof http://localhost:6060/debug/pprof/heap <span class="token comment"># heap profile</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Go-blog（引用 15）中有一篇很好的文章用具体的例子进行了分析：分析 Go 程序（2011年6月）。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,26);function m(g,f){const c=p("ExternalLinkIcon"),e=p("RouterLink");return l(),r("div",null,[u,s("p",null,[n("gopprof 程序是 Google pprofC++ 分析器的一个轻微变种；关于此工具更多的信息，参见"),s("a",k,[n("https://github.com/gperftools/gperftools"),a(c)]),n(" 。")]),v,s("ul",null,[s("li",null,[a(e,{to:"/the-way-to-go/directory.html"},{default:o(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),a(e,{to:"/the-way-to-go/13.9.html"},{default:o(()=>[n("用（测试数据）表驱动测试")]),_:1})]),s("li",null,[n("下一章："),a(e,{to:"/the-way-to-go/14.0.html"},{default:o(()=>[n("协程（goroutine）与通道（channel）")]),_:1})])])])}const x=i(d,[["render",m],["__file","13.10.html.vue"]]);export{x as default};
