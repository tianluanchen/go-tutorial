import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o,c as u,f as t,a as e,d as s,w as i,b as n,e as c}from"./app-9da01d16.js";const r={},v=c(`<h1 id="_10-2-本地化资源" tabindex="-1"><a class="header-anchor" href="#_10-2-本地化资源" aria-hidden="true">#</a> 10.2 本地化资源</h1><p>前面小节我们介绍了如何设置Locale，设置好Locale之后我们需要解决的问题就是如何存储相应的Locale对应的信息呢？这里面的信息包括：文本信息、时间和日期、货币值、图片、包含文件以及视图等资源。那么接下来我们将对这些信息一一进行介绍，Go语言中我们把这些格式信息存储在JSON中，然后通过合适的方式展现出来。(接下来以中文和英文两种语言对比举例,存储格式文件en.json和zh-CN.json)</p><h2 id="本地化文本消息" tabindex="-1"><a class="header-anchor" href="#本地化文本消息" aria-hidden="true">#</a> 本地化文本消息</h2><p>文本信息是编写Web应用中最常用到的，也是本地化资源中最多的信息，想要以适合本地语言的方式来显示文本信息，可行的一种方案是:建立需要的语言相应的map来维护一个key-value的关系，在输出之前按需从适合的map中去获取相应的文本，如下是一个简单的示例：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

var locales map[string]map[string]string

func main() {
	locales = make(map[string]map[string]string, 2)
	en := make(map[string]string, 10)
	en[&quot;pea&quot;] = &quot;pea&quot;
	en[&quot;bean&quot;] = &quot;bean&quot;
	locales[&quot;en&quot;] = en
	cn := make(map[string]string, 10)
	cn[&quot;pea&quot;] = &quot;豌豆&quot;
	cn[&quot;bean&quot;] = &quot;毛豆&quot;
	locales[&quot;zh-CN&quot;] = cn
	lang := &quot;zh-CN&quot;
	fmt.Println(msg(lang, &quot;pea&quot;))
	fmt.Println(msg(lang, &quot;bean&quot;))
}

func msg(locale, key string) string {
	if v, ok := locales[locale]; ok {
		if v2, ok := v[key]; ok {
			return v2
		}
	}
	return &quot;&quot;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例演示了不同locale的文本翻译，实现了中文和英文对于同一个key显示不同语言的实现，上面实现了中文的文本消息，如果想切换到英文版本，只需要把lang设置为en即可。</p><p>有些时候仅是key-value替换是不能满足需要的，例如&quot;I am 30 years old&quot;,中文表达是&quot;我今年30岁了&quot;，而此处的30是一个变量，该怎么办呢？这个时候，我们可以结合<code>fmt.Printf</code>函数来实现，请看下面的代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
en[&quot;how old&quot;] =&quot;I am %d years old&quot;
cn[&quot;how old&quot;] =&quot;我今年%d岁了&quot;

fmt.Printf(msg(lang, &quot;how old&quot;), 30)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的示例代码仅用以演示内部的实现方案，而实际数据是存储在JSON里面的，所以我们可以通过<code>json.Unmarshal</code>来为相应的map填充数据。</p><h2 id="本地化日期和时间" tabindex="-1"><a class="header-anchor" href="#本地化日期和时间" aria-hidden="true">#</a> 本地化日期和时间</h2><p>因为时区的关系，同一时刻，在不同的地区，表示是不一样的，而且因为Locale的关系，时间格式也不尽相同，例如中文环境下可能显示：<code>2012年10月24日 星期三 23时11分13秒 CST</code>，而在英文环境下可能显示:<code>Wed Oct 24 23:11:13 CST 2012</code>。这里面我们需要解决两点:</p><ol><li>时区问题</li><li>格式问题</li></ol><p>$GOROOT/lib/time包中的timeinfo.zip含有locale对应的时区的定义，为了获得对应于当前locale的时间，我们应首先使用<code>time.LoadLocation(name string)</code>获取相应于地区的locale，比如<code>Asia/Shanghai</code>或<code>America/Chicago</code>对应的时区信息，然后再利用此信息与调用<code>time.Now</code>获得的Time对象协作来获得最终的时间。详细的请看下面的例子(该例子采用上面例子的一些变量):</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
en[&quot;time_zone&quot;]=&quot;America/Chicago&quot;
cn[&quot;time_zone&quot;]=&quot;Asia/Shanghai&quot;

loc,_:=time.LoadLocation(msg(lang,&quot;time_zone&quot;))
t:=time.Now()
t = t.In(loc)
fmt.Println(t.Format(time.RFC3339))

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过类似处理文本格式的方式来解决时间格式的问题，举例如下:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
en[&quot;date_format&quot;]=&quot;%Y-%m-%d %H:%M:%S&quot;
cn[&quot;date_format&quot;]=&quot;%Y年%m月%d日 %H时%M分%S秒&quot;

fmt.Println(date(msg(lang,&quot;date_format&quot;),t))

func date(fomate string,t time.Time) string{
	year, month, day = t.Date()
	hour, min, sec = t.Clock()
	//解析相应的%Y %m %d %H %M %S然后返回信息
	//%Y 替换成2012
	//%m 替换成10
	//%d 替换成24
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="本地化货币值" tabindex="-1"><a class="header-anchor" href="#本地化货币值" aria-hidden="true">#</a> 本地化货币值</h2><p>各个地区的货币表示也不一样，处理方式也与日期差不多，细节请看下面代码:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
en[&quot;money&quot;] =&quot;USD %d&quot;
cn[&quot;money&quot;] =&quot;￥%d元&quot;

fmt.Println(money_format(msg(lang,&quot;money&quot;),100))

func money_format(fomate string,money int64) string{
	return fmt.Sprintf(fomate,money)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="本地化视图和资源" tabindex="-1"><a class="header-anchor" href="#本地化视图和资源" aria-hidden="true">#</a> 本地化视图和资源</h2><p>我们可能会根据Locale的不同来展示视图，这些视图包含不同的图片、css、js等各种静态资源。那么应如何来处理这些信息呢？首先我们应按locale来组织文件信息，请看下面的文件目录安排：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
views
|--en  //英文模板
	|--images     //存储图片信息
	|--js         //存储JS文件
	|--css        //存储css文件
	index.tpl     //用户首页
	login.tpl     //登陆首页
|--zh-CN //中文模板
	|--images
	|--js
	|--css
	index.tpl
	login.tpl

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个目录结构后我们就可以在渲染的地方这样来实现代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
s1, _ := template.ParseFiles(&quot;views/&quot;+lang+&quot;/index.tpl&quot;)
VV.Lang=lang
s1.Execute(os.Stdout, VV)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而对于里面的index.tpl里面的资源设置如下：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
// js文件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/javascript<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>views/{{.Lang}}/js/jquery/jquery-1.8.0.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
// css文件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>views/{{.Lang}}/css/bootstrap-responsive.min.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
// 图片文件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>views/{{.Lang}}/images/btn.png<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>采用这种方式来本地化视图以及资源时，我们就可以很容易的进行扩展了。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本小节介绍了如何使用及存储本地资源，有时需要通过转换函数来实现，有时通过lang来设置，但是最终都是通过key-value的方式来存储Locale对应的数据，在需要时取出相应于Locale的信息后，如果是文本信息就直接输出，如果是时间日期或者货币，则需要先通过<code>fmt.Printf</code>或其他格式化函数来处理，而对于不同Locale的视图和资源则是最简单的，只要在路径里面增加lang就可以实现了。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,30);function m(p,b){const a=d("RouterLink");return o(),u("div",null,[t(" {% raw %} "),v,e("ul",null,[e("li",null,[s(a,{to:"/build-web-app/preface.html"},{default:i(()=>[n("目录")]),_:1})]),e("li",null,[n("上一节: "),s(a,{to:"/build-web-app/10.1.html"},{default:i(()=>[n("设置默认地区")]),_:1})]),e("li",null,[n("下一节: "),s(a,{to:"/build-web-app/10.3.html"},{default:i(()=>[n("国际化站点")]),_:1})])]),t(" {% endraw %} ")])}const h=l(r,[["render",m],["__file","10.2.html.vue"]]);export{h as default};
