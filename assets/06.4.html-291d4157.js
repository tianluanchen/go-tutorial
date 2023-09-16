import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as l,c as r,a as s,d as n,w as o,b as e,e as d}from"./app-9da01d16.js";const c="/go-tutorial/assets/6.4.hijack-a4a282ee.png?raw=true",u="/go-tutorial/assets/6.4.cookie-c0a4e471.png?raw=true",m="/go-tutorial/assets/6.4.setcookie-3e14848d.png?raw=true",v="/go-tutorial/assets/6.4.hijacksuccess-8d573c99.png?raw=true",p={},h=d(`<h1 id="_6-4-预防session劫持" tabindex="-1"><a class="header-anchor" href="#_6-4-预防session劫持" aria-hidden="true">#</a> 6.4 预防session劫持</h1><p>session劫持是一种广泛存在的比较严重的安全威胁，在session技术中，客户端和服务端通过session的标识符来维护会话， 但这个标识符很容易就能被嗅探到，从而被其他人利用。它是中间人攻击的一种类型。</p><p>本节将通过一个实例来演示会话劫持，希望通过这个实例，能让读者更好地理解session的本质。</p><h2 id="session劫持过程" tabindex="-1"><a class="header-anchor" href="#session劫持过程" aria-hidden="true">#</a> session劫持过程</h2><p>我们写了如下的代码来展示一个count计数器：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func count(w http.ResponseWriter, r *http.Request) {
	sess := globalSessions.SessionStart(w, r)
	ct := sess.Get(&quot;countnum&quot;)
	if ct == nil {
		sess.Set(&quot;countnum&quot;, 1)
	} else {
		sess.Set(&quot;countnum&quot;, (ct.(int) + 1))
	}
	t, _ := template.ParseFiles(&quot;count.gtpl&quot;)
	w.Header().Set(&quot;Content-Type&quot;, &quot;text/html&quot;)
	t.Execute(w, sess.Get(&quot;countnum&quot;))
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>count.gtpl的代码如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
Hi. Now count:{{.}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们在浏览器里面刷新可以看到如下内容：</p><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图6.4 浏览器端显示count数</p><p>随着刷新，数字将不断增长，当数字显示为6的时候，打开浏览器(以chrome为例）的cookie管理器，可以看到类似如下的信息：</p><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图6.5 获取浏览器端保存的cookie</p><p>下面这个步骤最为关键: 打开另一个浏览器(这里我打开了firefox浏览器),复制chrome地址栏里的地址到新打开的浏览器的地址栏中。然后打开firefox的cookie模拟插件，新建一个cookie，把按上图中cookie内容原样在firefox中重建一份:</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图6.6 模拟cookie</p><p>回车后，你将看到如下内容：</p><figure><img src="'+v+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图6.7 劫持session成功</p><p>可以看到虽然换了浏览器，但是我们却获得了sessionID，然后模拟了cookie存储的过程。这个例子是在同一台计算机上做的，不过即使换用两台来做，其结果仍然一样。此时如果交替点击两个浏览器里的链接你会发现它们其实操纵的是同一个计数器。不必惊讶，此处firefox盗用了chrome和goserver之间的维持会话的钥匙，即gosessionid，这是一种类型的“会话劫持”。在goserver看来，它从http请求中得到了一个gosessionid，由于HTTP协议的无状态性，它无法得知这个gosessionid是从chrome那里“劫持”来的，它依然会去查找对应的session，并执行相关计算。与此同时 chrome也无法得知自己保持的会话已经被“劫持”。</p><h2 id="session劫持防范" tabindex="-1"><a class="header-anchor" href="#session劫持防范" aria-hidden="true">#</a> session劫持防范</h2><h3 id="cookieonly和token" tabindex="-1"><a class="header-anchor" href="#cookieonly和token" aria-hidden="true">#</a> cookieonly和token</h3><p>通过上面session劫持的简单演示可以了解到session一旦被其他人劫持，就非常危险，劫持者可以假装成被劫持者进行很多非法操作。那么如何有效的防止session劫持呢？</p><p>其中一个解决方案就是sessionID的值只允许cookie设置，而不是通过URL重置方式设置，同时设置cookie的httponly为true,这个属性是设置是否可通过客户端脚本访问这个设置的cookie，第一这个可以防止这个cookie被XSS读取从而引起session劫持，第二cookie设置不会像URL重置方式那么容易获取sessionID。</p><p>第二步就是在每个请求里面加上token，实现类似前面章节里面讲的防止form重复递交类似的功能，我们在每个请求里面加上一个隐藏的token，然后每次验证这个token，从而保证用户的请求都是唯一性。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
h := md5.New()
salt:=&quot;astaxie%^7&amp;8888&quot;
io.WriteString(h,salt+time.Now().String())
token:=fmt.Sprintf(&quot;%x&quot;,h.Sum(nil))
if r.Form[&quot;token&quot;]!=token{
	//提示登录
}
sess.Set(&quot;token&quot;,token)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="间隔生成新的sid" tabindex="-1"><a class="header-anchor" href="#间隔生成新的sid" aria-hidden="true">#</a> 间隔生成新的SID</h3><p>还有一个解决方案就是，我们给session额外设置一个创建时间的值，一旦过了一定的时间，我们销毁这个sessionID，重新生成新的session，这样可以一定程度上防止session劫持的问题。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
createtime := sess.Get(&quot;createtime&quot;)
if createtime == nil {
	sess.Set(&quot;createtime&quot;, time.Now().Unix())
} else if (createtime.(int64) + 60) &lt; (time.Now().Unix()) {
	globalSessions.SessionDestroy(w, r)
	sess = globalSessions.SessionStart(w, r)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>session启动后，我们设置了一个值，用于记录生成sessionID的时间。通过判断每次请求是否过期(这里设置了60秒)定期生成新的ID，这样使得攻击者获取有效sessionID的机会大大降低。</p><p>上面两个手段的组合可以在实践中消除session劫持的风险，一方面， 由于sessionID频繁改变，使攻击者难有机会获取有效的sessionID；另一方面，因为sessionID只能在cookie中传递，然后设置了httponly，所以基于URL攻击的可能性为零，同时被XSS获取sessionID也不可能。最后，由于我们还设置了MaxAge=0，这样就相当于session cookie不会留在浏览器的历史记录里面。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,33);function b(g,f){const i=a("RouterLink");return l(),r("div",null,[h,s("ul",null,[s("li",null,[n(i,{to:"/build-web-app/preface.html"},{default:o(()=>[e("目录")]),_:1})]),s("li",null,[e("上一节: "),n(i,{to:"/build-web-app/06.3.html"},{default:o(()=>[e("session存储")]),_:1})]),s("li",null,[e("下一节: "),n(i,{to:"/build-web-app/06.5.html"},{default:o(()=>[e("小结")]),_:1})])])])}const x=t(p,[["render",b],["__file","06.4.html.vue"]]);export{x as default};
