import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c as u,a as n,d as t,w as e,b as a,e as p}from"./app-9da01d16.js";const c="/go-tutorial/assets/4.1.login-f8db5a05.png?raw=true",r="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASMAAAAzCAIAAABT4/lVAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEDUlEQVR4nO2dW3bjIAxAyZzZUbr/FTRrynz4DCFICIExwc69px8tNrLAiIcipbf7/R4SHuHtTwAYwp9PKwDwFWBpADP4e6j05+89hHD7eXykbiQTEq+m5Wnh8/e+XcrkqNIAPAxb04YPyv11bz+P7SfVbbOirFwtjKJSad0qwZejrGlxMUmn9jjI0oGYFaprRSYzK5H3NwlpJW1IeG+jqox8FsYGfSiWto2/bQhmVpeNy/inOmTlbarplsrVRfIgsqUMc4LhFM9pcbSVDjl++gauupFrkmAsj+rj0ooYG4yl2SNyoiF4IlXh8hzi5R+y8ZNCtj3tHpmqd2SIZACbm4wRyfzdQXhH3uqbzgwpKl71eEQyF4jfI2LvG1U9pYZOaQAeFEv7lCoAF4YYEYAZYGkAM8DSAGaApQHMAEsDmAGWBjADLA1gBljaiy1SZKlgkaOVWaqxYbc+C77BCJb2xv4ktLGv+eiolNWiXnbqs3IOoR5hnMY9qSFREU/eWikUS8ZbqXI68uVkK7qpRo1JVe2c7lCILyv1s5FLUW3aEPnd+Yr2+82uNvWPIX9ZitFYWW/688pk3VBL6/TID1ocpvFc49ElZLJMX3vVxlbvb61YqlKSsEd+R/9X368xMDx9q8r3d8t82rJmjIxJY9dUarYslzlp8mZjDnY+109JH6MfmuSE9om5dXc6Sv7w/jf6xMmC5mSwKz8tnTyGNFtdlPz6DMfQp2kS7WhXidVObuca7h+k7hFJh8VMr87+Z411Q3X0g3pbVvj8/2VBB/Xt0fK7adVnNf1bsbJm1N35W2Wfh0DeL4/Fsor6OPV0bqu055ym6mP3Q1bFI8f2WGSi7Eeryu+UX9Lc6H//+62e04I5DqV8VcIKkJ/2Ys03dGGcljZE7Mc59ptVT0frMgitqGfdJveSU/hqsKYBzIAYEYAZYGkAM8DSAGaApQHMAEsDmMF1vPz7HfTqJ87xkufjaVuIqmTTh+C2cFiZ61jakIAjI0YkKywFmBuRCjH+vfrQkgQ1LANOQSU/zZ6DPXNzd7SOFFIKvZHKZLXUNjqpxnx5ykN74MKagQ7QjW5pt+RfqAVf/phqdaXyNOYtC6JT5Wf6yBvCh2Z6I1SyKd5y+6VpIwrnwto9yhdc2qFl5WkqjR1o0zRz23dWA3+HU1JezhqbYuoEpM4s2SXWtwvQdk4rrVHBl7d2pRHTPUdcqRPAT7+XPzWz0s5t5o5OPut52NcklXatrY/Dt/E9WN8j8rrJl2cl76+6sGWSUjXW26NPeqnpvFT1PVYdJB4vv1RSrWKc31gVT4frG3u+hLM0+Sx6Qoq+e8xO8N/DcRvOISyuHhiQnwYwA+IeAWaApQHMAEsDmAGWBjADLA1gBv8AEQJbuVemRncAAAAASUVORK5CYII=",d={},v=p(`<h1 id="_4-1-处理表单的输入" tabindex="-1"><a class="header-anchor" href="#_4-1-处理表单的输入" aria-hidden="true">#</a> 4.1 处理表单的输入</h1><p>先来看一个表单递交的例子，我们有如下的表单内容，命名成文件login.gtpl(放入当前新建项目的目录里面)</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/login<span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	用户名:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>username<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	密码:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>password<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>password<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>登录<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面递交表单到服务器的<code>/login</code>，当用户输入信息点击登录之后，会跳转到服务器的路由<code>login</code>里面，我们首先要判断这个是什么方式传递过来，POST还是GET呢？</p><p>http包里面有一个很简单的方式就可以获取，我们在前面web的例子的基础上来看看怎么处理login页面的form数据</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;html/template&quot;
	&quot;log&quot;
	&quot;net/http&quot;
	&quot;strings&quot;
)

func sayhelloName(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()       //解析url传递的参数，对于POST则解析响应包的主体（request body）
	//注意:如果没有调用ParseForm方法，下面无法获取表单的数据
	fmt.Println(r.Form) //这些信息是输出到服务器端的打印信息
	fmt.Println(&quot;path&quot;, r.URL.Path)
	fmt.Println(&quot;scheme&quot;, r.URL.Scheme)
	fmt.Println(r.Form[&quot;url_long&quot;])
	for k, v := range r.Form {
		fmt.Println(&quot;key:&quot;, k)
		fmt.Println(&quot;val:&quot;, strings.Join(v, &quot;&quot;))
	}
	fmt.Fprintf(w, &quot;Hello astaxie!&quot;) //这个写入到w的是输出到客户端的
}

func login(w http.ResponseWriter, r *http.Request) {
	fmt.Println(&quot;method:&quot;, r.Method) //获取请求的方法
	if r.Method == &quot;GET&quot; {
		t, _ := template.ParseFiles(&quot;login.gtpl&quot;)
		log.Println(t.Execute(w, nil))
	} else {
		//请求的是登录数据，那么执行登录的逻辑判断
		fmt.Println(&quot;username:&quot;, r.Form[&quot;username&quot;])
		fmt.Println(&quot;password:&quot;, r.Form[&quot;password&quot;])
	}
}

func main() {
	http.HandleFunc(&quot;/&quot;, sayhelloName)       //设置访问的路由
	http.HandleFunc(&quot;/login&quot;, login)         //设置访问的路由
	err := http.ListenAndServe(&quot;:9090&quot;, nil) //设置监听的端口
	if err != nil {
		log.Fatal(&quot;ListenAndServe: &quot;, err)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的代码我们可以看出获取请求方法是通过<code>r.Method</code>来完成的，这是个字符串类型的变量，返回GET, POST, PUT等method信息。</p><p>login函数中我们根据<code>r.Method</code>来判断是显示登录界面还是处理登录逻辑。当GET方式请求时显示登录界面，其他方式请求时则处理登录逻辑，如查询数据库、验证登录信息等。</p><p>当我们在浏览器里面打开<code>http://127.0.0.1:9090/login</code>的时候，出现如下界面</p><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果你看到一个空页面，可能是你写的 login.gtpl 文件中有错误，请根据控制台中的日志进行修复。</p><p>图4.1 用户登录界面</p><p>我们输入用户名和密码之后发现在服务器端是不会打印出来任何输出的，为什么呢？默认情况下，Handler里面是不会自动解析form的，必须显式的调用<code>r.ParseForm()</code>后，你才能对这个表单数据进行操作。我们修改一下代码，在<code>fmt.Println(&quot;username:&quot;, r.Form[&quot;username&quot;])</code>之前加一行<code>r.ParseForm()</code>,重新编译，再次测试输入递交，现在是不是在服务器端有输出你的输入的用户名和密码了。</p><p><code>r.Form</code>里面包含了所有请求的参数，比如URL中query-string、POST的数据、PUT的数据，所以当你在URL中的query-string字段和POST冲突时，会保存成一个slice，里面存储了多个值，Go官方文档中说在接下来的版本里面将会把POST、GET这些数据分离开来。</p><p>现在我们修改一下login.gtpl里面form的action值<code>http://127.0.0.1:9090/login</code>修改为<code>http://127.0.0.1:9090/login?username=astaxie</code>，再次测试，服务器的输出username是不是一个slice。服务器端的输出如下：</p><figure><img src="'+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图4.2 服务器端打印接收到的信息</p><p><code>request.Form</code>是一个url.Values类型，里面存储的是对应的类似<code>key=value</code>的信息，下面展示了可以对form数据进行的一些操作:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
v := url.Values{}
v.Set(&quot;name&quot;, &quot;Ava&quot;)
v.Add(&quot;friend&quot;, &quot;Jess&quot;)
v.Add(&quot;friend&quot;, &quot;Sarah&quot;)
v.Add(&quot;friend&quot;, &quot;Zoe&quot;)
// v.Encode() == &quot;name=Ava&amp;friend=Jess&amp;friend=Sarah&amp;friend=Zoe&quot;
fmt.Println(v.Get(&quot;name&quot;))
fmt.Println(v.Get(&quot;friend&quot;))
fmt.Println(v[&quot;friend&quot;])

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>Tips</strong>:<br> Request本身也提供了FormValue()函数来获取用户提交的参数。如r.Form[&quot;username&quot;]也可写成r.FormValue(&quot;username&quot;)。调用r.FormValue时会自动调用r.ParseForm，所以不必提前调用。r.FormValue只会返回同名参数中的第一个，若参数不存在则返回空字符串。</p></blockquote><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,21);function m(q,k){const s=i("RouterLink");return o(),u("div",null,[v,n("ul",null,[n("li",null,[t(s,{to:"/build-web-app/preface.html"},{default:e(()=>[a("目录")]),_:1}),n("ul",null,[n("li",null,[a("上一节: "),t(s,{to:"/build-web-app/04.0.html"},{default:e(()=>[a("表单")]),_:1})]),n("li",null,[a("下一节: "),t(s,{to:"/build-web-app/04.2.html"},{default:e(()=>[a("验证表单的输入")]),_:1})])])])])])}const A=l(d,[["render",m],["__file","04.1.html.vue"]]);export{A as default};
