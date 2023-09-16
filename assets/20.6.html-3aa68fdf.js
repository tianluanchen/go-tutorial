import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c,a as s,b as n,d as t,w as e,e as i}from"./app-9da01d16.js";const u={},r=s("h1",{id:"_20-6-处理窗口",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_20-6-处理窗口","aria-hidden":"true"},"#"),n(" 20.6 处理窗口")],-1),d=s("code",null,"template",-1),k=s("code",null,"/",-1),v=s("code",null,"sign()",-1),m=s("code",null,"sign()",-1),g=s("code",null,"r.FormValue",-1),h=s("code",null,"signTemplate.Execute()",-1),b=s("code",null,"http.ResponseWriter",-1),_=i(`<p>编辑文件 helloworld2.go，用下面的 Go 代码替换它，并试运行：</p><p><u><a href="examples%5Cchapter_20%5Chelloapp%5Chello%5Chelloworld2_version3.go">Listing 20.4 helloworld2_version3.go:</a></u></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> hello

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;template&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> guestbookForm <span class="token operator">=</span> <span class="token string">\`
&lt;html&gt;
  &lt;body&gt;
    &lt;form action=&quot;/sign&quot; method=&quot;post&quot;&gt;
      &lt;div&gt;&lt;textarea name=&quot;content&quot; rows=&quot;3&quot; cols=&quot;60&quot;&gt;&lt;/textarea&gt;&lt;/div&gt;
      &lt;div&gt;&lt;input type=&quot;submit&quot; value=&quot;Sign Guestbook&quot;&gt;&lt;/div&gt;
    &lt;/form&gt;
  &lt;/body&gt;
&lt;/html&gt;
\`</span>
<span class="token keyword">const</span> signTemplateHTML <span class="token operator">=</span> <span class="token string">\`
&lt;html&gt;
  &lt;body&gt;
    &lt;p&gt;You wrote:&lt;/p&gt;
    &lt;pre&gt;{{html .}}&lt;/pre&gt;
  &lt;/body&gt;
&lt;/html&gt;
\`</span>

<span class="token keyword">var</span> signTemplate <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;sign&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>signTemplateHTML<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/sign&quot;</span><span class="token punctuation">,</span> sign<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">root</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;text/html&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Fprint</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> guestbookForm<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sign</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;text/html&quot;</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> signTemplate<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">&quot;content&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,4);function f(q,w){const a=p("RouterLink");return l(),c("div",null,[r,s("p",null,[n("正如我们在 "),t(a,{to:"/the-way-to-go/15.6.html"},{default:e(()=>[n("15.6")]),_:1}),n("/"),t(a,{to:"/the-way-to-go/15.7.html"},{default:e(()=>[n("7")]),_:1}),n(" 节中所看到的，"),d,n(" 包经常被用于 web 应用，所以也可以被用于 GAE 应用。下面的应用程序让用户输入一个文本。首先，一个留言簿表格显示出来（通过 "),k,n(" 根处理程序），当它被发布时，"),v,n(" 处理程序将这个文本替换到产生的 html 响应中。"),m,n(" 函数通过调用 "),g,n(" 获得窗口数据，并将其传递给 "),h,n("，后者将渲染的模板写入 "),b,n("。")]),_,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/20.5.html"},{default:e(()=>[n("使用用户服务和探索其 API")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/20.7.html"},{default:e(()=>[n("使用数据存储")]),_:1})])])])}const T=o(u,[["render",f],["__file","20.6.html.vue"]]);export{T as default};
