import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as l,c as i,a as s,b as n,d as e,w as t,e as o}from"./app-9da01d16.js";const u={},r=o('<h1 id="版本-2-添加持久化存储" tabindex="-1"><a class="header-anchor" href="#版本-2-添加持久化存储" aria-hidden="true">#</a> 版本 2 - 添加持久化存储</h1><p>第 2 个版本的代码 <em>goto_v2</em> 见 <a href="examples/chapter_19/goto_v2">goto_v2</a>。</p><h1 id="_19-5-持久化存储-gob" tabindex="-1"><a class="header-anchor" href="#_19-5-持久化存储-gob" aria-hidden="true">#</a> 19.5 持久化存储：gob</h1><p>（本节代码见 <a href="examples/chapter_19/goto_v2/store.go">goto_v2/store.go</a> 和 <a href="examples/chapter_19/goto_v2/main.go">goto_v2/main.go</a>。）</p>',4),d=s("code",null,"map",-1),k=s("code",null,"URLStore()",-1),v=s("code",null,"encoding/gob",-1),m=o(`<p>通过 <code>gob</code> 包的 <code>NewEncoder()</code> 和 <code>NewDecoder()</code> 函数，可以指定数据要写入或读取的位置。返回的 <code>Encoder</code> 和 <code>Decoder</code> 对象提供了 <code>Encode</code> 和 <code>Decode</code> 方法，用于对文件写入和从中读取 Go 数据结构。提示：<code>Encoder</code> 实现了 <code>Writer</code> 接口，同样 <code>Decoder</code> 实现了 <code>Reader</code> 接口。我们在 <code>URLStore</code> 上增加一个新的 <code>file</code> 字段（<code>*os.File</code> 类型），它是用于读写已打开文件的句柄。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> URLStore <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	urls <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span>
	mu sync<span class="token punctuation">.</span>RWMutex
	file <span class="token operator">*</span>os<span class="token punctuation">.</span>File
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把这个文件命名为 store.gob，当初始化 <code>URLStore</code> 时将其作为参数传入：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> store <span class="token operator">=</span> <span class="token function">NewURLStore</span><span class="token punctuation">(</span><span class="token string">&quot;store.gob&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着，调整 <code>NewURLStore()</code> 函数：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewURLStore</span><span class="token punctuation">(</span>filename <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>URLStore <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token operator">&amp;</span>URLStore<span class="token punctuation">{</span>urls<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_APPEND<span class="token punctuation">,</span> <span class="token number">0644</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;URLStore:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	s<span class="token punctuation">.</span>file <span class="token operator">=</span> f
	<span class="token keyword">return</span> s
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),b=s("code",null,"NewURLStore()",-1),g=s("code",null,"*os.File",-1),f=s("code",null,"file",-1),_=s("code",null,"URLStore",-1),h=s("code",null,"store",-1),w=s("code",null,"s",-1),y=o(`<p>对 <code>OpenFile()</code> 的调用可能会失败（例如文件可能被删除或改名）。它会返回一个错误 <code>err</code>，注意 Go 是如何处理这种情况的：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_APPEND<span class="token punctuation">,</span> <span class="token number">0644</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;URLStore:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code>err</code> 不为 <code>nil</code>，表示确实发生了错误，那么输出一条消息并停止程序执行。这是处理错误的一种方式，大多数情况下错误应该返回给调用函数，但这种检测错误的模式在 Go 代码中也很普遍。在 <code>}</code> 之后可以确定文件被成功打开了。</p><p>打开该文件时启用了写入标志，更精确地说是“追加模式”。每当一对新的短/长 URL 在程序中创建后，我们通过 <code>gob</code> 把它存储到文件 &quot;store.gob&quot; 中。</p><p>为达到目的，定义一个新的结构体类型 <code>record</code>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> record <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Key<span class="token punctuation">,</span> URL <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以及新的 <code>save()</code> 方法，将给定的键和 URL 组成 <code>record</code> ，以 <code>gob</code> 编码的形式写入磁盘。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>URLStore<span class="token punctuation">)</span> <span class="token function">save</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	e <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>file<span class="token punctuation">)</span>
	<span class="token keyword">return</span> e<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>record<span class="token punctuation">{</span>key<span class="token punctuation">,</span> url<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>goto 程序启动时，磁盘上存储的数据必须读取到 <code>URLStore</code> 的 <code>map</code> 中。为此，我们编写 <code>load</code> 方法：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>URLStore<span class="token punctuation">)</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>file<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	d <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>file<span class="token punctuation">)</span>
	<span class="token keyword">var</span> err <span class="token builtin">error</span>
	<span class="token keyword">for</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">var</span> r record
		<span class="token keyword">if</span> err <span class="token operator">=</span> d<span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			s<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>Key<span class="token punctuation">,</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个新的 <code>load()</code> 方法会寻址 (<code>Seek</code>) 到文件的起始位置，读取并解码 (<code>Decode</code>) 每一条记录 (<code>record</code>)，然后用 <code>Set</code> 方法将数据存储到 <code>map</code> 中。再次注意无处不在的错误处理模式。文件的解码由一个无限循环完成，只要没有错误就会一直继续：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">for</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	…
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果得到了一个错误，可能是刚解码了最后一条记录，于是产生了 <code>io.EOF</code> (EndOfFile) 错误。若并非此种错误，表示产生了解码错误，用 <code>return err</code> 来返回它。对该方法的调用必须加入到 <code>NewURLStore()</code> 中：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewURLStore</span><span class="token punctuation">(</span>filename <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>URLStore <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token operator">&amp;</span>URLStore<span class="token punctuation">{</span>urls<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_APPEND<span class="token punctuation">,</span> <span class="token number">0644</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;Error opening URLStore:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	s<span class="token punctuation">.</span>file <span class="token operator">=</span> f
	<span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Error loading data in URLStore:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> s
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时在 <code>Put()</code> 方法中，当新的 URL 对加入到 <code>map</code> 中，也应该立即将它们保存到数据文件中：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>URLStore<span class="token punctuation">)</span> <span class="token function">Put</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		key <span class="token operator">:=</span> <span class="token function">genKey</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">Count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> s<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Error saving to URLStore:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> key
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;shouldn’t get here&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译并测试这第二个版本的程序，或直接使用现有的可执行程序，验证关闭服务器（在终端窗口可以按 CTRL+C）并重启后，短 URL 仍然有效。goto 程序第一次启动时，文件 store.gob 还不存在，因此当载入数据时会得到错误：</p><pre><code>2011/09/11 11:08:11 Error loading URLStore: open store.gob: The system cannot find the file specified.
</code></pre><p>结束进程并重启后，就能正常工作了。或者，可以在 goto 启动前先创建空的 store.gob 文件。</p><p><strong>备注：</strong> 当第二次启动 goto 时，可能会产生错误：</p><pre><code>Error loading URLStore: extra data in buffer
</code></pre><p>这是由于 <code>gob</code> 是基于流的协议，它不支持重新开始。在版本 4 中，会用 json 作为存储协议来补救此问题。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,23);function R(L,U){const a=c("RouterLink");return l(),i("div",null,[r,s("p",null,[n("当 goto 进程（监听在 8080 端口的 web 服务器）终止，这迟早会发生，内存 "),d,n(" 中缩短的 URL 就会丢失。要保留这些数据，就得将其保存到磁盘文件中。我们将修改 "),k,n("，使它可以保存数据到文件，且在 goto 启动时还原这些数据。为此我们使用 Go 标准库的 "),v,n(" 包：它用于序列化和反序列化，将数据结构转换为字节数组（确切地说是切片），反之亦然（见 "),e(a,{to:"/the-way-to-go/12.11.html"},{default:t(()=>[n("12.11 节")]),_:1}),n("）。")]),m,s("p",null,[n("现在，更新后的 "),b,n(" 函数接受一个文件名参数，它会打开该文件（见 "),e(a,{to:"/the-way-to-go/12.0.html"},{default:t(()=>[n("12 章")]),_:1}),n("），将返回的 "),g,n(" 作为 "),f,n(" 字段的值存储在 "),_,n(" 变量 "),h,n(" 中，即这里的本地变量 "),w,n(" 。")]),y,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/19.4.html"},{default:t(()=>[n("用户界面：web 服务端")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/19.6.html"},{default:t(()=>[n("用协程优化性能")]),_:1})])])])}const x=p(u,[["render",R],["__file","19.5.html.vue"]]);export{x as default};
