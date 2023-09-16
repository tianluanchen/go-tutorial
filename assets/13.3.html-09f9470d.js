import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as d,c,f as l,a as e,d as s,w as t,b as n,e as o}from"./app-9da01d16.js";const u="/go-tutorial/assets/13.4.beego-eb6707fa.png?raw=true",v={},m=o(`<h1 id="_13-3-controller设计" tabindex="-1"><a class="header-anchor" href="#_13-3-controller设计" aria-hidden="true">#</a> 13.3 controller设计</h1><p>传统的MVC框架大多数是基于Action设计的后缀式映射，然而，现在Web流行REST风格的架构。尽管使用Filter或者rewrite能够通过URL重写实现REST风格的URL，但是为什么不直接设计一个全新的REST风格的 MVC框架呢？本小节就是基于这种思路来讲述如何从头设计一个基于REST风格的MVC框架中的controller，最大限度地简化Web应用的开发，甚至编写一行代码就可以实现“Hello, world”。</p><h2 id="controller作用" tabindex="-1"><a class="header-anchor" href="#controller作用" aria-hidden="true">#</a> controller作用</h2><p>MVC设计模式是目前Web应用开发中最常见的架构模式，通过分离 Model（模型）、View（视图）和 Controller（控制器），可以更容易实现易于扩展的用户界面(UI)。Model指后台返回的数据；View指需要渲染的页面，通常是模板页面，渲染后的内容通常是HTML；Controller指Web开发人员编写的处理不同URL的控制器，如前面小节讲述的路由就是URL请求转发到控制器的过程，controller在整个的MVC框架中起到了一个核心的作用，负责处理业务逻辑，因此控制器是整个框架中必不可少的一部分，Model和View对于有些业务需求是可以不写的，例如没有数据处理的逻辑处理，没有页面输出的302调整之类的就不需要Model和View，但是controller这一环节是必不可少的。</p><h2 id="beego的rest设计" tabindex="-1"><a class="header-anchor" href="#beego的rest设计" aria-hidden="true">#</a> beego的REST设计</h2><p>前面小节介绍了路由实现了注册struct的功能，而struct中实现了REST方式，因此我们需要设计一个用于逻辑处理controller的基类，这里主要设计了两个类型，一个struct、一个interface</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type Controller struct {
	Ct        *Context
	Tpl       *template.Template
	Data      map[interface{}]interface{}
	ChildName string
	TplNames  string
	Layout    []string
	TplExt    string
}

type ControllerInterface interface {
	Init(ct *Context, cn string)    //初始化上下文和子类名称
	Prepare()                       //开始执行之前的一些处理
	Get()                           //method=GET的处理
	Post()                          //method=POST的处理
	Delete()                        //method=DELETE的处理
	Put()                           //method=PUT的处理
	Head()                          //method=HEAD的处理
	Patch()                         //method=PATCH的处理
	Options()                       //method=OPTIONS的处理
	Finish()                        //执行完成之后的处理		
	Render() error                  //执行完method对应的方法之后渲染页面
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么前面介绍的路由add函数的时候是定义了ControllerInterface类型，因此，只要我们实现这个接口就可以，所以我们的基类Controller实现如下的方法：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (c *Controller) Init(ct *Context, cn string) {
	c.Data = make(map[interface{}]interface{})
	c.Layout = make([]string, 0)
	c.TplNames = &quot;&quot;
	c.ChildName = cn
	c.Ct = ct
	c.TplExt = &quot;tpl&quot;
}

func (c *Controller) Prepare() {

}

func (c *Controller) Finish() {

}

func (c *Controller) Get() {
	http.Error(c.Ct.ResponseWriter, &quot;Method Not Allowed&quot;, 405)
}

func (c *Controller) Post() {
	http.Error(c.Ct.ResponseWriter, &quot;Method Not Allowed&quot;, 405)
}

func (c *Controller) Delete() {
	http.Error(c.Ct.ResponseWriter, &quot;Method Not Allowed&quot;, 405)
}

func (c *Controller) Put() {
	http.Error(c.Ct.ResponseWriter, &quot;Method Not Allowed&quot;, 405)
}

func (c *Controller) Head() {
	http.Error(c.Ct.ResponseWriter, &quot;Method Not Allowed&quot;, 405)
}

func (c *Controller) Patch() {
	http.Error(c.Ct.ResponseWriter, &quot;Method Not Allowed&quot;, 405)
}

func (c *Controller) Options() {
	http.Error(c.Ct.ResponseWriter, &quot;Method Not Allowed&quot;, 405)
}

func (c *Controller) Render() error {
	if len(c.Layout) &gt; 0 {
		var filenames []string
		for _, file := range c.Layout {
			filenames = append(filenames, path.Join(ViewsPath, file))
		}
		t, err := template.ParseFiles(filenames...)
		if err != nil {
			Trace(&quot;template ParseFiles err:&quot;, err)
		}
		err = t.ExecuteTemplate(c.Ct.ResponseWriter, c.TplNames, c.Data)
		if err != nil {
			Trace(&quot;template Execute err:&quot;, err)
		}
	} else {
		if c.TplNames == &quot;&quot; {
			c.TplNames = c.ChildName + &quot;/&quot; + c.Ct.Request.Method + &quot;.&quot; + c.TplExt
		}
		t, err := template.ParseFiles(path.Join(ViewsPath, c.TplNames))
		if err != nil {
			Trace(&quot;template ParseFiles err:&quot;, err)
		}
		err = t.Execute(c.Ct.ResponseWriter, c.Data)
		if err != nil {
			Trace(&quot;template Execute err:&quot;, err)
		}
	}
	return nil
}

func (c *Controller) Redirect(url string, code int) {
	c.Ct.Redirect(code, url)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的controller基类已经实现了接口定义的函数，通过路由根据url执行相应的controller的原则，会依次执行如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
Init()      初始化
Prepare()   执行之前的初始化，每个继承的子类可以来实现该函数
method()    根据不同的method执行不同的函数：GET、POST、PUT、HEAD等，子类来实现这些函数，如果没实现，那么默认都是403
Render()    可选，根据全局变量AutoRender来判断是否执行
Finish()    执行完之后执行的操作，每个继承的子类可以来实现该函数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用指南" tabindex="-1"><a class="header-anchor" href="#应用指南" aria-hidden="true">#</a> 应用指南</h2><p>上面beego框架中完成了controller基类的设计，那么我们在我们的应用中可以这样来设计我们的方法：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package controllers

import (
	&quot;github.com/astaxie/beego&quot;
)

type MainController struct {
	beego.Controller
}

func (this *MainController) Get() {
	this.Data[&quot;Username&quot;] = &quot;astaxie&quot;
	this.Data[&quot;Email&quot;] = &quot;astaxie@gmail.com&quot;
	this.TplNames = &quot;index.tpl&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的方式我们实现了子类MainController，实现了Get方法，那么如果用户通过其他的方式(POST/HEAD等)来访问该资源都将返回405，而如果是Get来访问，因为我们设置了AutoRender=true，那么在执行完Get方法之后会自动执行Render函数，就会显示如下界面：</p><figure><img src="`+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>index.tpl的代码如下所示，我们可以看到数据的设置和显示都是相当的简单方便：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>beego welcome template<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Hello, world!{{.Username}},{{.Email}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,19);function p(b,h){const i=r("RouterLink");return d(),c("div",null,[l(" {% raw %} "),m,e("ul",null,[e("li",null,[s(i,{to:"/build-web-app/preface.html"},{default:t(()=>[n("目录")]),_:1})]),e("li",null,[n("上一章: "),s(i,{to:"/build-web-app/13.2.html"},{default:t(()=>[n("自定义路由器设计")]),_:1})]),e("li",null,[n("下一节: "),s(i,{to:"/build-web-app/13.4.html"},{default:t(()=>[n("日志和配置设计")]),_:1})])]),l(" {% endraw %} ")])}const k=a(v,[["render",p],["__file","13.3.html.vue"]]);export{k as default};
