import{_ as u}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as v,c,f as d,a as e,b as n,d as i,w as a,e as r}from"./app-9da01d16.js";const o={},m=r(`<h1 id="_10-3-国际化站点" tabindex="-1"><a class="header-anchor" href="#_10-3-国际化站点" aria-hidden="true">#</a> 10.3 国际化站点</h1><p>前面小节介绍了如何处理本地化资源，即Locale一个相应的配置文件，那么如果处理多个的本地化资源呢？而对于一些我们经常用到的例如：简单的文本翻译、时间日期、数字等如果处理呢？本小节将一一解决这些问题。</p><h2 id="管理多个本地包" tabindex="-1"><a class="header-anchor" href="#管理多个本地包" aria-hidden="true">#</a> 管理多个本地包</h2><p>在开发一个应用的时候，首先我们要决定是只支持一种语言，还是多种语言，如果要支持多种语言，我们则需要制定一个组织结构，以方便将来更多语言的添加。在此我们设计如下：Locale有关的文件放置在config/locales下，假设你要支持中文和英文，那么你需要在这个文件夹下放置en.json和zh.json。大概的内容如下所示：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>
# zh.json

<span class="token punctuation">{</span>
<span class="token property">&quot;zh&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	<span class="token property">&quot;submit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;提交&quot;</span><span class="token punctuation">,</span>
	<span class="token property">&quot;create&quot;</span><span class="token operator">:</span> <span class="token string">&quot;创建&quot;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# en.json

<span class="token punctuation">{</span>
<span class="token property">&quot;en&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	<span class="token property">&quot;submit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Submit&quot;</span><span class="token punctuation">,</span>
	<span class="token property">&quot;create&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Create&quot;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),b={href:"https://github.com/astaxie/go-i18n",target:"_blank",rel:"noopener noreferrer"},p=r(`<div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
Tr:=i18n.NewLocale()
Tr.LoadPath(&quot;config/locales&quot;)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个包使用起来很简单，你可以通过下面的方式进行测试：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
fmt.Println(Tr.Translate(&quot;submit&quot;))
//输出Submit
Tr.SetLocale(&quot;zh&quot;)
fmt.Println(Tr.Translate(&quot;submit&quot;))
//输出“提交”
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自动加载本地包" tabindex="-1"><a class="header-anchor" href="#自动加载本地包" aria-hidden="true">#</a> 自动加载本地包</h2><p>上面我们介绍了如何自动加载自定义语言包，其实go-i18n库已经预加载了很多默认的格式信息，例如时间格式、货币格式，用户可以在自定义配置时改写这些默认配置，请看下面的处理过程：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//加载默认配置文件，这些文件都放在go-i18n/locales下面

//文件命名zh.json、en.json、en-US.json等，可以不断的扩展支持更多的语言

func (il *IL) loadDefaultTranslations(dirPath string) error {
	dir, err := os.Open(dirPath)
	if err != nil {
		return err
	}
	defer dir.Close()

	names, err := dir.Readdirnames(-1)
	if err != nil {
		return err
	}

	for _, name := range names {
		fullPath := path.Join(dirPath, name)

		fi, err := os.Stat(fullPath)
		if err != nil {
			return err
		}

		if fi.IsDir() {
			if err := il.loadTranslations(fullPath); err != nil {
				return err
			}
		} else if locale := il.matchingLocaleFromFileName(name); locale != &quot;&quot; {
			file, err := os.Open(fullPath)
			if err != nil {
				return err
			}
			defer file.Close()

			if err := il.loadTranslation(file, locale); err != nil {
				return err
			}
		}
	}

	return nil
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的方法加载配置信息到默认的文件，这样我们就可以在我们没有自定义时间信息的时候执行如下的代码获取对应的信息:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//locale=zh的情况下，执行如下代码：

fmt.Println(Tr.Time(time.Now()))
//输出：2009年1月08日 星期四 20:37:58 CST

fmt.Println(Tr.Time(time.Now(),&quot;long&quot;))
//输出：2009年1月08日

fmt.Println(Tr.Money(11.11))
//输出:￥11.11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="template-mapfunc" tabindex="-1"><a class="header-anchor" href="#template-mapfunc" aria-hidden="true">#</a> template mapfunc</h2><p>上面我们实现了多个语言包的管理和加载，而一些函数的实现是基于逻辑层的，例如：&quot;Tr.Translate&quot;、&quot;Tr.Time&quot;、&quot;Tr.Money&quot;等，虽然我们在逻辑层可以利用这些函数把需要的参数进行转换后在模板层渲染的时候直接输出，但是如果我们想在模版层直接使用这些函数该怎么实现呢？不知你是否还记得，在前面介绍模板的时候说过：Go语言的模板支持自定义模板函数，下面是我们实现的方便操作的mapfunc：</p><ol><li>文本信息</li></ol><p>文本信息调用<code>Tr.Translate</code>来实现相应的信息转换，mapFunc的实现如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func I18nT(args ...interface{}) string {
	ok := false
	var s string
	if len(args) == 1 {
		s, ok = args[0].(string)
	}
	if !ok {
		s = fmt.Sprint(args...)
	}
	return Tr.Translate(s)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注册函数如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
t.Funcs(template.FuncMap{&quot;T&quot;: I18nT})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>模板中使用如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
{{.V.Submit | T}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>时间日期</li></ol><p>时间日期调用<code>Tr.Time</code>函数来实现相应的时间转换，mapFunc的实现如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func I18nTimeDate(args ...interface{}) string {
	ok := false
	var s string
	if len(args) == 1 {
		s, ok = args[0].(string)
	}
	if !ok {
		s = fmt.Sprint(args...)
	}
	return Tr.Time(s)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注册函数如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
t.Funcs(template.FuncMap{&quot;TD&quot;: I18nTimeDate})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>模板中使用如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
{{.V.Now | TD}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>货币信息</li></ol><p>货币调用<code>Tr.Money</code>函数来实现相应的时间转换，mapFunc的实现如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func I18nMoney(args ...interface{}) string {
	ok := false
	var s string
	if len(args) == 1 {
		s, ok = args[0].(string)
	}
	if !ok {
		s = fmt.Sprint(args...)
	}
	return Tr.Money(s)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注册函数如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
t.Funcs(template.FuncMap{&quot;M&quot;: I18nMoney})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>模板中使用如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
{{.V.Money | M}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>通过这小节我们知道了如何实现一个多语言包的Web应用，通过自定义语言包我们可以方便的实现多语言，而且通过配置文件能够非常方便的扩充多语言，默认情况下，go-i18n会自定加载一些公共的配置信息，例如时间、货币等，我们就可以非常方便的使用，同时为了支持在模板中使用这些函数，也实现了相应的模板函数，这样就允许我们在开发Web应用的时候直接在模板中通过pipeline的方式来操作多语言包。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,34);function g(h,f){const t=l("ExternalLinkIcon"),s=l("RouterLink");return v(),c("div",null,[d(" {% raw %} "),m,e("p",null,[n("为了支持国际化，在此我们使用了一个国际化相关的包——"),e("a",b,[n("go-i18n"),i(t)]),n("，首先我们向go-i18n包注册config/locales这个目录,以加载所有的locale文件")]),p,e("ul",null,[e("li",null,[i(s,{to:"/build-web-app/preface.html"},{default:a(()=>[n("目录")]),_:1})]),e("li",null,[n("上一节: "),i(s,{to:"/build-web-app/10.2.html"},{default:a(()=>[n("本地化资源")]),_:1})]),e("li",null,[n("下一节: "),i(s,{to:"/build-web-app/10.4.html"},{default:a(()=>[n("小结")]),_:1})])]),d(" {% endraw %} ")])}const G=u(o,[["render",g],["__file","10.3.html.vue"]]);export{G as default};
