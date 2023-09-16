import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as r,c as a,a as i,d as s,w as t,b as e,e as u}from"./app-9da01d16.js";const o="/go-tutorial/assets/14.4.github-fe67db41.png?raw=true",v="/go-tutorial/assets/14.4.github2-617678f9.png?raw=true",c="/go-tutorial/assets/14.4.github3-40b86809.png?raw=true",m={},b=u(`<h1 id="_14-4-用户认证" tabindex="-1"><a class="header-anchor" href="#_14-4-用户认证" aria-hidden="true">#</a> 14.4 用户认证</h1><p>在开发Web应用过程中，用户认证是开发者经常遇到的问题，用户登录、注册、登出等操作，而一般认证也分为三个方面的认证</p><ul><li>HTTP Basic和 HTTP Digest认证</li><li>第三方集成认证：QQ、微博、豆瓣、OPENID、google、GitHub、facebook和twitter等</li><li>自定义的用户登录、注册、登出，一般都是基于session、cookie认证</li></ul><p>beego目前没有针对这三种方式进行任何形式的集成，但是可以充分的利用第三方开源库来实现上面的三种方式的用户认证，不过后续beego会对前面两种认证逐步集成。</p><h2 id="http-basic和-http-digest认证" tabindex="-1"><a class="header-anchor" href="#http-basic和-http-digest认证" aria-hidden="true">#</a> HTTP Basic和 HTTP Digest认证</h2><p>这两个认证是一些应用采用的比较简单的认证，目前已经有开源的第三方库支持这两个认证：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
github.com/abbot/go-http-auth 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面代码演示了如何把这个库引入beego中从而实现认证：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package controllers

import (
	&quot;github.com/abbot/go-http-auth&quot;
	&quot;github.com/astaxie/beego&quot;
)

func Secret(user, realm string) string {
	if user == &quot;john&quot; {
		// password is &quot;hello&quot;
		return &quot;$1$dlPL2MqE$oQmn16q49SqdmhenQuNgs1&quot;
	}
	return &quot;&quot;
}

type MainController struct {
	beego.Controller
}

func (this *MainController) Prepare() {
	a := auth.NewBasicAuthenticator(&quot;example.com&quot;, Secret)
	if username := a.CheckAuth(this.Ctx.Request); username == &quot;&quot; {
		a.RequireAuth(this.Ctx.ResponseWriter, this.Ctx.Request)
	}
}

func (this *MainController) Get() {
	this.Data[&quot;Username&quot;] = &quot;astaxie&quot;
	this.Data[&quot;Email&quot;] = &quot;astaxie@gmail.com&quot;
	this.TplNames = &quot;index.tpl&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码利用了beego的prepare函数，在执行正常逻辑之前调用了认证函数，这样就非常简单的实现了http auth，digest的认证也是同样的原理。</p><h2 id="oauth和oauth2的认证" tabindex="-1"><a class="header-anchor" href="#oauth和oauth2的认证" aria-hidden="true">#</a> oauth和oauth2的认证</h2><p>oauth和oauth2是目前比较流行的两种认证方式，还好第三方有一个库实现了这个认证，但是是国外实现的，并没有QQ、微博之类的国内应用认证集成：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
github.com/bradrydzewski/go.auth
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面代码演示了如何把该库引入beego中从而实现oauth的认证，这里以GitHub为例演示：</p><ol><li>添加两条路由</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
beego.RegisterController(&quot;/auth/login&quot;, &amp;controllers.GithubController{})
beego.RegisterController(&quot;/mainpage&quot;, &amp;controllers.PageController{})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>然后我们处理GithubController登陆的页面：</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>package controllers

import (
	&quot;github.com/astaxie/beego&quot;
	&quot;github.com/bradrydzewski/go.auth&quot;
)

const (
	githubClientKey = &quot;a0864ea791ce7e7bd0df&quot;
	githubSecretKey = &quot;a0ec09a647a688a64a28f6190b5a0d2705df56ca&quot;
)

type GithubController struct {
	beego.Controller
}

func (this *GithubController) Get() {
	// set the auth parameters
	auth.Config.CookieSecret = []byte(&quot;7H9xiimk2QdTdYI7rDddfJeV&quot;)
	auth.Config.LoginSuccessRedirect = &quot;/mainpage&quot;
	auth.Config.CookieSecure = false

	githubHandler := auth.Github(githubClientKey, githubSecretKey)

	githubHandler.ServeHTTP(this.Ctx.ResponseWriter, this.Ctx.Request)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>处理登陆成功之后的页面</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>package controllers

import (
	&quot;github.com/astaxie/beego&quot;
	&quot;github.com/bradrydzewski/go.auth&quot;
	&quot;net/http&quot;
	&quot;net/url&quot;
)

type PageController struct {
	beego.Controller
}

func (this *PageController) Get() {
	// set the auth parameters
	auth.Config.CookieSecret = []byte(&quot;7H9xiimk2QdTdYI7rDddfJeV&quot;)
	auth.Config.LoginSuccessRedirect = &quot;/mainpage&quot;
	auth.Config.CookieSecure = false

	user, err := auth.GetUserCookie(this.Ctx.Request)

	//if no active user session then authorize user
	if err != nil || user.Id() == &quot;&quot; {
		http.Redirect(this.Ctx.ResponseWriter, this.Ctx.Request, auth.Config.LoginRedirect, http.StatusSeeOther)
		return
	}

	//else, add the user to the URL and continue
	this.Ctx.Request.URL.User = url.User(user.Id())
	this.Data[&quot;pic&quot;] = user.Picture()
	this.Data[&quot;id&quot;] = user.Id()
	this.Data[&quot;name&quot;] = user.Name()
	this.TplNames = &quot;home.tpl&quot;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个的流程如下，首先打开浏览器输入地址：</p><figure><img src="`+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图14.4 显示带有登录按钮的首页</p><p>然后点击链接出现如下界面：</p><figure><img src="'+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图14.5 点击登录按钮后显示GitHub的授权页</p><p>然后点击Authorize app就出现如下界面：</p><figure><img src="'+c+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图14.6 授权登录之后显示的获取到的GitHub信息页</p><h2 id="自定义认证" tabindex="-1"><a class="header-anchor" href="#自定义认证" aria-hidden="true">#</a> 自定义认证</h2><p>自定义的认证一般都是和session结合验证的，如下代码来源于一个基于beego的开源博客：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//登陆处理
func (this *LoginController) Post() {
	this.TplNames = &quot;login.tpl&quot;
	this.Ctx.Request.ParseForm()
	username := this.Ctx.Request.Form.Get(&quot;username&quot;)
	password := this.Ctx.Request.Form.Get(&quot;password&quot;)
	md5Password := md5.New()
	io.WriteString(md5Password, password)
	buffer := bytes.NewBuffer(nil)
	fmt.Fprintf(buffer, &quot;%x&quot;, md5Password.Sum(nil))
	newPass := buffer.String()

	now := time.Now().Format(&quot;2006-01-02 15:04:05&quot;)

	userInfo := models.GetUserInfo(username)
	if userInfo.Password == newPass {
		var users models.User
		users.Last_logintime = now
		models.UpdateUserInfo(users)

		//登录成功设置session
		sess := globalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
		sess.Set(&quot;uid&quot;, userInfo.Id)
		sess.Set(&quot;uname&quot;, userInfo.Username)

		this.Ctx.Redirect(302, &quot;/&quot;)
	}	
}

//注册处理
func (this *RegController) Post() {
	this.TplNames = &quot;reg.tpl&quot;
	this.Ctx.Request.ParseForm()
	username := this.Ctx.Request.Form.Get(&quot;username&quot;)
	password := this.Ctx.Request.Form.Get(&quot;password&quot;)
	usererr := checkUsername(username)
	fmt.Println(usererr)
	if usererr == false {
		this.Data[&quot;UsernameErr&quot;] = &quot;Username error, Please to again&quot;
		return
	}

	passerr := checkPassword(password)
	if passerr == false {
		this.Data[&quot;PasswordErr&quot;] = &quot;Password error, Please to again&quot;
		return
	}

	md5Password := md5.New()
	io.WriteString(md5Password, password)
	buffer := bytes.NewBuffer(nil)
	fmt.Fprintf(buffer, &quot;%x&quot;, md5Password.Sum(nil))
	newPass := buffer.String()

	now := time.Now().Format(&quot;2006-01-02 15:04:05&quot;)

	userInfo := models.GetUserInfo(username)

	if userInfo.Username == &quot;&quot; {
		var users models.User
		users.Username = username
		users.Password = newPass
		users.Created = now
		users.Last_logintime = now
		models.AddUser(users)

		//登录成功设置session
		sess := globalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
		sess.Set(&quot;uid&quot;, userInfo.Id)
		sess.Set(&quot;uname&quot;, userInfo.Username)
		this.Ctx.Redirect(302, &quot;/&quot;)
	} else {
		this.Data[&quot;UsernameErr&quot;] = &quot;User already exists&quot;
	}

}

func checkPassword(password string) (b bool) {
	if ok, _ := regexp.MatchString(&quot;^[a-zA-Z0-9]{4,16}$&quot;, password); !ok {
		return false
	}
	return true
}

func checkUsername(username string) (b bool) {
	if ok, _ := regexp.MatchString(&quot;^[a-zA-Z0-9]{4,16}$&quot;, username); !ok {
		return false
	}
	return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了用户登陆和注册之后，其他模块的地方可以增加如下这样的用户是否登陆的判断：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (this *AddBlogController) Prepare() {
	sess := globalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	sess_uid := sess.Get(&quot;userid&quot;)
	sess_username := sess.Get(&quot;username&quot;)
	if sess_uid == nil {
		this.Ctx.Redirect(302, &quot;/admin/login&quot;)
		return
	}
	this.Data[&quot;Username&quot;] = sess_username
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,35);function h(g,q){const n=d("RouterLink");return r(),a("div",null,[b,i("ul",null,[i("li",null,[s(n,{to:"/build-web-app/preface.html"},{default:t(()=>[e("目录")]),_:1})]),i("li",null,[e("上一节: "),s(n,{to:"/build-web-app/14.3.html"},{default:t(()=>[e("表单及验证支持")]),_:1})]),i("li",null,[e("下一节: "),s(n,{to:"/build-web-app/14.5.html"},{default:t(()=>[e("多语言支持")]),_:1})])])])}const C=l(m,[["render",h],["__file","14.4.html.vue"]]);export{C as default};
