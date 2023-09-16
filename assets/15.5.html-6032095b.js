import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as u,c as i,a as s,b as n,d as t,w as e,e as p}from"./app-9da01d16.js";const l={},r=s("h1",{id:"_15-5-确保网页应用健壮",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_15-5-确保网页应用健壮","aria-hidden":"true"},"#"),n(" 15.5 确保网页应用健壮")],-1),k=s("p",null,"当网页应用的处理函数发生 panic，服务器会简单地终止运行。这可不妙：网页服务器必须是足够健壮的程序，能够承受任何可能的突发问题。",-1),d=s("code",null,"defer",-1),v=s("code",null,"recover()",-1),m=p(`<p>为增强代码可读性，我们为页面处理函数创建一个类型：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> HandleFnc <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),b=s("code",null,"logPanics()",-1),h=p(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>function HandleFnc<span class="token punctuation">)</span> HandleFnc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> x <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;[%v] caught panic: %v&quot;</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span>RemoteAddr<span class="token punctuation">,</span> x<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">function</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> request<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们用 <code>logPanics()</code> 来包装对处理函数的调用：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/test1&quot;</span><span class="token punctuation">,</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>SimpleServer<span class="token punctuation">)</span><span class="token punctuation">)</span>
http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/test2&quot;</span><span class="token punctuation">,</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>FormServer<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,3),g=p(`<p>示例 15.11 <a href="examples/chapter_15/robust_webserver.go">robust_webserver.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> form <span class="token operator">=</span> <span class="token string">\`&lt;html&gt;&lt;body&gt;&lt;form action=&quot;#&quot; method=&quot;post&quot; name=&quot;bar&quot;&gt;
		&lt;input type=&quot;text&quot; name=&quot;in&quot;/&gt;
		&lt;input type=&quot;submit&quot; value=&quot;Submit&quot;/&gt;
	&lt;/form&gt;&lt;/html&gt;&lt;/body&gt;\`</span>

<span class="token keyword">type</span> HandleFnc <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span>

<span class="token comment">/* handle a simple get request */</span>
<span class="token keyword">func</span> <span class="token function">SimpleServer</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;&lt;h1&gt;hello, world&lt;/h1&gt;&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* handle a form, both the GET which displays the form
   and the POST which processes it.*/</span>
<span class="token keyword">func</span> <span class="token function">FormServer</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;text/html&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">switch</span> request<span class="token punctuation">.</span>Method <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">:</span>
		<span class="token comment">/* display the form to the user */</span>
		io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> form<span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">:</span>
		<span class="token comment">/* handle the form data, note that ParseForm must
		   be called before we can extract form data*/</span>
		<span class="token comment">//request.ParseForm();</span>
		<span class="token comment">//io.WriteString(w, request.Form[&quot;in&quot;][0])</span>
		io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> request<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">&quot;in&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/test1&quot;</span><span class="token punctuation">,</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>SimpleServer<span class="token punctuation">)</span><span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/test2&quot;</span><span class="token punctuation">,</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>FormServer<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8088&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>function HandleFnc<span class="token punctuation">)</span> HandleFnc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> x <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;[%v] caught panic: %v&quot;</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span>RemoteAddr<span class="token punctuation">,</span> x<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">function</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> request<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,3);function f(q,w){const a=c("RouterLink");return u(),i("div",null,[r,k,s("p",null,[n("首先能想到的是在每个处理函数中使用 "),d,n("/"),v,n("，不过这样会产生太多的重复代码。"),t(a,{to:"/the-way-to-go/13.5.html"},{default:e(()=>[n("13.5 节")]),_:1}),n("使用闭包的错误处理模式是更优雅的方案。我们把这种机制应用到前一章的简单网页服务器上。实际上，它可以被简单地应用到任何网页服务器程序中。")]),m,s("p",null,[n("我们的错误处理函数应用了 "),t(a,{to:"/the-way-to-go/13.5.html"},{default:e(()=>[n("13.5 节")]),_:1}),n("的模式，变成了以下的 "),b,n(" 函数：")]),h,s("p",null,[n("处理函数现在可以恢复 panic 调用，类似 "),t(a,{to:"/the-way-to-go/13.5.html"},{default:e(()=>[n("13.5 节")]),_:1}),n("中的错误检测函数。完整代码如下：")]),g,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/15.4.html"},{default:e(()=>[n("写一个简单的网页应用")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/15.6.html"},{default:e(()=>[n("用模板编写网页应用")]),_:1})])])])}const x=o(l,[["render",f],["__file","15.5.html.vue"]]);export{x as default};
