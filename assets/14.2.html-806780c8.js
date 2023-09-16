import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as d,c as t,a as s,d as n,w as a,b as e,e as r}from"./app-9da01d16.js";const u={},v=r(`<h1 id="_14-2-session支持" tabindex="-1"><a class="header-anchor" href="#_14-2-session支持" aria-hidden="true">#</a> 14.2 Session支持</h1><p>第六章的时候我们介绍过如何在Go语言中使用session，也实现了一个sessionManger，beego框架基于sessionManager实现了方便的session处理功能。</p><h2 id="session集成" tabindex="-1"><a class="header-anchor" href="#session集成" aria-hidden="true">#</a> session集成</h2><p>beego中主要有以下的全局变量来控制session处理：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//related to session 
SessionOn            bool   // 是否开启session模块，默认不开启
SessionProvider      string // session后端提供处理模块，默认是sessionManager支持的memory
SessionName          string // 客户端保存的cookies的名称
SessionGCMaxLifetime int64  // cookies有效期

GlobalSessions *session.Manager //全局session控制器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然上面这些变量需要初始化值，也可以按照下面的代码来配合配置文件以设置这些值：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if ar, err := AppConfig.Bool(&quot;sessionon&quot;); err != nil {
	SessionOn = false
} else {
	SessionOn = ar
}
if ar := AppConfig.String(&quot;sessionprovider&quot;); ar == &quot;&quot; {
	SessionProvider = &quot;memory&quot;
} else {
	SessionProvider = ar
}
if ar := AppConfig.String(&quot;sessionname&quot;); ar == &quot;&quot; {
	SessionName = &quot;beegosessionID&quot;
} else {
	SessionName = ar
}
if ar, err := AppConfig.Int(&quot;sessiongcmaxlifetime&quot;); err != nil &amp;&amp; ar != 0 {
	int64val, _ := strconv.ParseInt(strconv.Itoa(ar), 10, 64)
	SessionGCMaxLifetime = int64val
} else {
	SessionGCMaxLifetime = 3600
}	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在beego.Run函数中增加如下代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if SessionOn {
	GlobalSessions, _ = session.NewManager(SessionProvider, SessionName, SessionGCMaxLifetime)
	go GlobalSessions.GC()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样只要SessionOn设置为true，那么就会默认开启session功能，独立开一个goroutine来处理session。</p><p>为了方便我们在自定义Controller中快速使用session，作者在<code>beego.Controller</code>中提供了如下方法：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (c *Controller) StartSession() (sess session.Session) {
	sess = GlobalSessions.SessionStart(c.Ctx.ResponseWriter, c.Ctx.Request)
	return
}		
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="session使用" tabindex="-1"><a class="header-anchor" href="#session使用" aria-hidden="true">#</a> session使用</h2><p>通过上面的代码我们可以看到，beego框架简单地继承了session功能，那么在项目中如何使用呢？</p><p>首先我们需要在应用的main入口处开启session：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
beego.SessionOn = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们就可以在控制器的相应方法中如下所示的使用session了：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (this *MainController) Get() {
	var intcount int
	sess := this.StartSession()
	count := sess.Get(&quot;count&quot;)
	if count == nil {
		intcount = 0
	} else {
		intcount = count.(int)
	}
	intcount = intcount + 1
	sess.Set(&quot;count&quot;, intcount)
	this.Data[&quot;Username&quot;] = &quot;astaxie&quot;
	this.Data[&quot;Email&quot;] = &quot;astaxie@gmail.com&quot;
	this.Data[&quot;Count&quot;] = intcount
	this.TplNames = &quot;index.tpl&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码展示了如何在控制逻辑中使用session，主要分两个步骤：</p><ol><li>获取session对象</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
	//获取对象,类似PHP中的session_start()
	sess := this.StartSession()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>使用session进行一般的session值操作</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
	//获取session值，类似PHP中的$_SESSION[&quot;count&quot;]
	sess.Get(&quot;count&quot;)
	
	//设置session值
	sess.Set(&quot;count&quot;, intcount)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面代码可以看出基于beego框架开发的应用中使用session相当方便，基本上和PHP中调用<code>session_start()</code>类似。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,25);function c(m,b){const i=o("RouterLink");return d(),t("div",null,[v,s("ul",null,[s("li",null,[n(i,{to:"/build-web-app/preface.html"},{default:a(()=>[e("目录")]),_:1})]),s("li",null,[e("上一节: "),n(i,{to:"/build-web-app/14.1.html"},{default:a(()=>[e("静态文件支持")]),_:1})]),s("li",null,[e("下一节: "),n(i,{to:"/build-web-app/14.3.html"},{default:a(()=>[e("表单及验证支持")]),_:1})])])])}const h=l(u,[["render",c],["__file","14.2.html.vue"]]);export{h as default};
