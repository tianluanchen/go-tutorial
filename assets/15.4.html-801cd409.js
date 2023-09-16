import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as i,a as s,d as a,w as e,b as n,e as l}from"./app-9da01d16.js";const u="/go-tutorial/assets/15.4_fig15.1-005e8330.jpg?raw=true",r={},d=l(`<h1 id="_15-4-写一个简单的网页应用" tabindex="-1"><a class="header-anchor" href="#_15-4-写一个简单的网页应用" aria-hidden="true">#</a> 15.4 写一个简单的网页应用</h1><p>下边的程序在端口 <code>8088</code> 上启动了一个网页服务器；<code>SimpleServer()</code> 会处理 url/<code>test1</code> 使它在浏览器输出 <code>hello world</code>。<code>FormServer</code> 会处理 url/<code>test2</code>：如果 url 最初由浏览器请求，那么它是一个 <code>GET</code> 请求，返回一个 <code>form</code> 常量，包含了简单的 <code>input</code> 表单，这个表单里有一个文本框和一个提交按钮。当在文本框输入一些东西并点击提交按钮的时候，会发起一个 POST 请求。<code>FormServer()</code> 中的代码用到了 <code>switch</code> 来区分两种情况。请求为 POST 类型时，<code>name</code> 属性为 <code>inp</code> 的文本框的内容可以这样获取：<code>request.FormValue(&quot;inp&quot;)</code>。然后将其写回浏览器页面中。在控制台启动程序，然后到浏览器中打开 url <code>http://localhost:8088/test2</code> 来测试这个程序：</p><p>示例 15.10 <a href="examples/chapter_15/simple_webserver.go">simple_webserver.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> form <span class="token operator">=</span> <span class="token string">\`
	&lt;html&gt;&lt;body&gt;
		&lt;form action=&quot;#&quot; method=&quot;post&quot; name=&quot;bar&quot;&gt;
			&lt;input type=&quot;text&quot; name=&quot;in&quot; /&gt;
			&lt;input type=&quot;submit&quot; value=&quot;submit&quot;/&gt;
		&lt;/form&gt;
	&lt;/body&gt;&lt;/html&gt;
\`</span>

<span class="token comment">/* handle a simple get request */</span>
<span class="token keyword">func</span> <span class="token function">SimpleServer</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;&lt;h1&gt;hello, world&lt;/h1&gt;&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">FormServer</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;text/html&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">switch</span> request<span class="token punctuation">.</span>Method <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">:</span>
		<span class="token comment">/* display the form to the user */</span>
		io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> form<span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">:</span>
		<span class="token comment">/* handle the form data, note that ParseForm must
		   be called before we can extract form data */</span>
		<span class="token comment">//request.ParseForm();</span>
		<span class="token comment">//io.WriteString(w, request.Form[&quot;in&quot;][0])</span>
		io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> request<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">&quot;in&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/test1&quot;</span><span class="token punctuation">,</span> SimpleServer<span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/test2&quot;</span><span class="token punctuation">,</span> FormServer<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8088&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：当使用字符串常量表示 html 文本的时候，包含 <code>&lt;html&gt;&lt;body&gt;...&lt;/body&gt;&lt;/html&gt;</code> 对于让浏览器将它识别为 html 文档非常重要。</p><p>更安全的做法是在处理函数中，在写入返回内容之前将头部的 <code>content-type</code> 设置为 <code>text/html</code>：<code>w.Header().Set(&quot;Content-Type&quot;, &quot;text/html&quot;)</code>。</p><p><code>&quot;Content-Type&quot;</code> 会让浏览器认为它可以使用函数 <code>http.DetectContentType([]byte(form))</code> 来处理收到的数据。</p><p>练习 15.6 <a href="exercises/chapter_15/statistics.go">statistics.go</a></p><p>编写一个网页程序，可以让用户输入一连串的数字。计算出这些数字的均值和中值，并且打印出来，就像下边这张截图一样：</p><img src="`+u+'" style="zoom:80%;"><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>',11);function k(m,v){const t=p("RouterLink");return c(),i("div",null,[d,s("ul",null,[s("li",null,[a(t,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),a(t,{to:"/the-way-to-go/15.3.html"},{default:e(()=>[n("访问并读取页面")]),_:1})]),s("li",null,[n("下一节："),a(t,{to:"/the-way-to-go/15.5.html"},{default:e(()=>[n("确保网页应用健壮")]),_:1})])])])}const q=o(r,[["render",k],["__file","15.4.html.vue"]]);export{q as default};
