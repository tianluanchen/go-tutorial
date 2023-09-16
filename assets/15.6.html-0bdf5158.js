import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as u,a as s,b as n,d as a,w as p,e}from"./app-9da01d16.js";const k={},r=s("h1",{id:"_15-6-用模板编写网页应用",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_15-6-用模板编写网页应用","aria-hidden":"true"},"#"),n(" 15.6 用模板编写网页应用")],-1),d={href:"https://golang.org/doc/articles/wiki/",target:"_blank",rel:"noopener noreferrer"},v=s("code",null,"http://localhost:8080/view/page1",-1),m=e(`<p>接着，页面的文本内容从一个文件中读取，并显示在网页中。它包含一个超链接，指向编辑页面（<code>http://localhost:8080/edit/page1</code>）。编辑页面将内容显示在一个文本域中，用户可以更改文本，点击“保存”按钮保存到对应的文件中。然后回到阅读页面显示更改后的内容。如果某个被请求阅读的页面不存在（例如：<code>http://localhost:8080/edit/page999</code>），程序可以作出识别，立即重定向到编辑页面，如此新的 wiki 页面就可以被创建并保存。</p><p>wiki 页面需要一个标题和文本内容，它在程序中被建模为如下结构体，Body 字段存放内容，由字节切片组成。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Page <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Title <span class="token builtin">string</span>
	Body  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了在可执行程序之外维护 wiki 页面内容，我们简单地使用了文本文件作为持久化存储。程序、必要的模板和文本文件可以在 <a href="examples/chapter_15/wiki">wiki</a> 中找到。</p><p>示例 15.12 <a href="examples/chapter_15/wiki/wiki.go">wiki.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;io/ioutil&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;regexp&quot;</span>
	<span class="token string">&quot;text/template&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> lenPath <span class="token operator">=</span> <span class="token function">len</span><span class="token punctuation">(</span><span class="token string">&quot;/view/&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> titleValidator <span class="token operator">=</span> regexp<span class="token punctuation">.</span><span class="token function">MustCompile</span><span class="token punctuation">(</span><span class="token string">&quot;^[a-zA-Z0-9]+$&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> templates <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>template<span class="token punctuation">.</span>Template<span class="token punctuation">)</span>
<span class="token keyword">var</span> err <span class="token builtin">error</span>

<span class="token keyword">type</span> Page <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Title <span class="token builtin">string</span>
	Body  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tmpl <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;edit&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;view&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
		templates<span class="token punctuation">[</span>tmpl<span class="token punctuation">]</span> <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">ParseFiles</span><span class="token punctuation">(</span>tmpl <span class="token operator">+</span> <span class="token string">&quot;.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/view/&quot;</span><span class="token punctuation">,</span> <span class="token function">makeHandler</span><span class="token punctuation">(</span>viewHandler<span class="token punctuation">)</span><span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/edit/&quot;</span><span class="token punctuation">,</span> <span class="token function">makeHandler</span><span class="token punctuation">(</span>editHandler<span class="token punctuation">)</span><span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/save/&quot;</span><span class="token punctuation">,</span> <span class="token function">makeHandler</span><span class="token punctuation">(</span>saveHandler<span class="token punctuation">)</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;localhost:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;ListenAndServe: &quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">makeHandler</span><span class="token punctuation">(</span>fn <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">)</span> http<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		title <span class="token operator">:=</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path<span class="token punctuation">[</span>lenPath<span class="token punctuation">:</span><span class="token punctuation">]</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>titleValidator<span class="token punctuation">.</span><span class="token function">MatchString</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			http<span class="token punctuation">.</span><span class="token function">NotFound</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token function">fn</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> title<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">viewHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> title <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">load</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span> <span class="token comment">// page not found</span>
		http<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token string">&quot;/edit/&quot;</span><span class="token operator">+</span>title<span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusFound<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token function">renderTemplate</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;view&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">editHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> title <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">load</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		p <span class="token operator">=</span> <span class="token operator">&amp;</span>Page<span class="token punctuation">{</span>Title<span class="token punctuation">:</span> title<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token function">renderTemplate</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;edit&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">saveHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> title <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	body <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">&quot;body&quot;</span><span class="token punctuation">)</span>
	p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Page<span class="token punctuation">{</span>Title<span class="token punctuation">:</span> title<span class="token punctuation">,</span> Body<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">}</span>
	err <span class="token operator">:=</span> p<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	http<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token string">&quot;/view/&quot;</span><span class="token operator">+</span>title<span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusFound<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">renderTemplate</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> tmpl <span class="token builtin">string</span><span class="token punctuation">,</span> p <span class="token operator">*</span>Page<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	err <span class="token operator">:=</span> templates<span class="token punctuation">[</span>tmpl<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> p<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Page<span class="token punctuation">)</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	filename <span class="token operator">:=</span> p<span class="token punctuation">.</span>Title <span class="token operator">+</span> <span class="token string">&quot;.txt&quot;</span>
	<span class="token comment">// file created with read-write permissions for the current user only</span>
	<span class="token keyword">return</span> ioutil<span class="token punctuation">.</span><span class="token function">WriteFile</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> p<span class="token punctuation">.</span>Body<span class="token punctuation">,</span> <span class="token number">0600</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">load</span><span class="token punctuation">(</span>title <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Page<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	filename <span class="token operator">:=</span> title <span class="token operator">+</span> <span class="token string">&quot;.txt&quot;</span>
	body<span class="token punctuation">,</span> err <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Page<span class="token punctuation">{</span>Title<span class="token punctuation">:</span> title<span class="token punctuation">,</span> Body<span class="token punctuation">:</span> body<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们来通读代码：</p>`,7),b=e(`<li><p>首先导入必要的包。由于我们在构建网页服务器，<code>http</code> 当然是必须的。不过还导入了 <code>io/ioutil</code> 来方便地读写文件，<code>regexp</code> 用于验证输入标题，以及 <code>template</code> 来动态创建 html 文档。</p></li><li><p>为避免黑客构造特殊输入攻击服务器，我们用如下正则表达式检查用户在浏览器上输入的 URL（同时也是 wiki 页面标题）：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> titleValidator <span class="token operator">=</span> regexp<span class="token punctuation">.</span><span class="token function">MustCompile</span><span class="token punctuation">(</span><span class="token string">&quot;^[a-zA-Z0-9]+$&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>makeHandler</code> 会用它对请求管控。</p></li><li><p>必须有一种机制把 <code>Page</code> 结构体数据插入到网页的标题和内容中，可以利用 <code>template</code> 包通过如下步骤完成：</p><ol><li>先在文本编辑器中创建 html 模板文件，例如 view.html：</li></ol><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>{{.Title |html}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>[<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/edit/{{.Title |html}}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>edit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>]<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{printf &quot;%s&quot; .Body |html}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把要插入的数据结构字段放在 <code>{{</code> 和 <code>}}</code> 之间，这里是把 <code>Page</code> 结构体数据 <code>{{.Title |html}}</code> 和 <code>{{printf &quot;%s&quot; .Body |html}}</code> 插入页面（当然可以是非常复杂的 html，但这里尽可能地简化了，以突出模板的原理。）（<code>{{.Title |html}}</code> 和 <code>{{printf &quot;%s&quot; .Body |html}}</code> 语法说明详见后续章节）。</p><ol start="2"><li><code>template.Must(template.ParseFiles(tmpl + &quot;.html&quot;))</code> 把模板文件转换为 <code>*template.Template</code> 类型的对象，为了高效，在程序运行时仅做一次解析，在 <code>init()</code> 函数中处理可以方便地达到目的。所有模板对象都被保持在内存中，存放在以 html 文件名作为索引的 <code>map</code> 中：</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>templates <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>template<span class="token punctuation">.</span>Template<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种技术被称为<em>模板缓存</em>，是推荐的最佳实践。</p><ol start="3"><li>为了真正从模板和结构体构建出页面，必须使用：</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>templates<span class="token punctuation">[</span>tmpl<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> p<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它基于模板执行，用 <code>Page</code> 结构体对象 <code>p</code> 作为参数对模板进行替换，并写入 <code>ResponseWriter</code> 对象 <code>w</code>。必须检查该方法的 <code>error</code> 返回值，万一有一个或多个错误，我们可以调用 <code>http.Error()</code> 来明示。在我们的应用程序中，这段代码会被多次调用，所以把它提取为单独的函数 <code>renderTemplate()</code>。</p></li>`,3),g=s("code",null,"main()",-1),h=s("code",null,"ListenAndServe()",-1),f=s("code",null,"localhost:8080/",-1),w=s("code",null,"view",-1),y=s("code",null,"edit",-1),q=s("code",null,"save",-1),_={href:"http://ASP.NET",target:"_blank",rel:"noopener noreferrer"},R=s("p",null,[n("在此定义了 3 个处理函数，由于包含重复的启动代码，我们将其提取到单独的 "),s("code",null,"makeHandler()"),n(" 函数中。这是一个值得研究的特殊高阶函数：其参数是一个函数，返回一个新的闭包函数：")],-1),x=e(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">makeHandler</span><span class="token punctuation">(</span>fn <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">)</span> http<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		title <span class="token operator">:=</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path<span class="token punctuation">[</span>lenPath<span class="token punctuation">:</span><span class="token punctuation">]</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>titleValidator<span class="token punctuation">.</span><span class="token function">MatchString</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			http<span class="token punctuation">.</span><span class="token function">NotFound</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token function">fn</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> title<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>闭包封闭了函数变量 <code>fn</code> 来构造其返回值。但在此之前，它先用 <code>titleValidator.MatchString(title)</code> 验证输入标题 <code>title</code> 的有效性。如果标题包含了字母和数字以外的字符，就触发 <code>NotFound</code> 错误（例如：尝试 <code>localhost:8080/view/page++</code>）。<code>viewHandler</code>，<code>editHandler</code> 和 <code>saveHandler</code> 都是传入 <code>main()</code> 中 <code>makeHandler</code> 的参数，类型必须都与 <code>fn</code> 相同。</p></li><li><p><code>viewHandler</code> 尝试按标题读取文本文件，这是通过调用 <code>load()</code> 函数完成的，它会构建文件名并用 <code>ioutil.ReadFile</code> 读取内容。如果文件存在，其内容会存入字符串中。一个指向 <code>Page</code> 结构体的指针按字面量被创建：<code>&amp;Page{Title: title, Body: body}</code>。</p><p>另外，该值和表示没有 error 的 <code>nil</code> 值一起返回给调用者。然后在 <code>renderTemplate</code> 中将该结构体与模板对象整合。</p><p>万一发生错误，也就是说 wiki 页面在磁盘上不存在，错误会被返回给 <code>viewHandler</code>，此时会自动重定向，跳转请求对应标题的编辑页面。</p></li><li><p><code>editHandler</code> 基本上也差不多：尝试读取文件，如果存在则用“编辑”模板来渲染；万一发生错误，创建一个新的包含指定标题的 <code>Page</code> 对象并渲染。</p></li><li><p>当在编辑页面点击“保存”按钮时，触发保存页面内容的动作。按钮须放在 html 表单中，它开头是这样的：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/save/{{.Title |html}}<span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>POST<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这意味着，当提交表单到类似 <code>http://localhost/save/{Title}</code> 这样的 URL 格式时，一个 POST 请求被发往网页服务器。针对这样的 URL 我们已经定义好了处理函数：<code>saveHandler()</code>。在 request 对象上调用 <code>FormValue()</code> 方法，可以提取名称为 body 的文本域内容，用这些信息构造一个 <code>Page</code> 对象，然后尝试通过调用 <code>save()</code> 方法保存其内容。万一运行失败，执行 <code>http.Error</code> 以将错误显示到浏览器。如果保存成功，重定向浏览器到该页的阅读页面。<code>save()</code> 函数非常简单，利用 <code>ioutil.WriteFile()</code>，写入 <code>Page</code> 结构体的 <code>Body</code> 字段到文件 <code>filename</code> 中，之后会被用于模板替换占位符 <code>{{printf &quot;%s&quot; .Body |html}}</code>。</p></li></ul><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,3);function P(H,T){const o=c("ExternalLinkIcon"),t=c("RouterLink");return i(),u("div",null,[r,s("p",null,[n("以下程序是用 100 行以内代码实现可行的 wiki 网页应用，它由一组页面组成，用于阅读、编辑和保存。它是来自 Go 网站 codelab 的 wiki 制作教程，我所知的最好的 Go 教程之一，非常值得进行完整的实验，以见证并理解程序是如何被构建起来的（"),s("a",d,[n("https://golang.org/doc/articles/wiki/"),a(o)]),n("）。这里，我们将以自顶向下的视角，从整体上给出程序的补充说明。程序是网页服务器，它必须从命令行启动，监听某个端口，例如 8080。浏览器可以通过请求 URL 阅读 wiki 页面的内容，例如："),v,n("。")]),m,s("ul",null,[b,s("li",null,[s("p",null,[n("在 "),g,n(" 中网页服务器用 "),h,n(" 启动并监听 8080 端口。但正如 "),a(t,{to:"/the-way-to-go/15.2.html"},{default:p(()=>[n("15.2节")]),_:1}),n(" 那样，需要先为紧接在 URL "),f,n(" 之后， 以 "),w,n(", "),y,n(" 或 "),q,n(" 开头的 url 路径定义一些处理函数。在大多数网页服务器应用程序中，这形成了一系列 URL 路径到处理函数的映射，类似于 Ruby 和 Rails，Django 或 "),s("a",_,[n("ASP.NET"),a(o)]),n(" MVC 这样的 MVC 框架中的路由表。请求的 URL 与这些路径尝试匹配，较长的路径被优先匹配。如不与任何路径匹配，则调用 / 的处理程序。")]),R])]),x,s("ul",null,[s("li",null,[a(t,{to:"/the-way-to-go/directory.html"},{default:p(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),a(t,{to:"/the-way-to-go/15.5.html"},{default:p(()=>[n("确保网页应用健壮")]),_:1})]),s("li",null,[n("下一节："),a(t,{to:"/the-way-to-go/15.7.html"},{default:p(()=>[n("探索 template 包")]),_:1})])])])}const E=l(k,[["render",P],["__file","15.6.html.vue"]]);export{E as default};