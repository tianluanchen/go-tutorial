import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as t,c as o,f as l,a as e,d as i,w as a,b as n,e as u}from"./app-9da01d16.js";const c={},v=u(`<h1 id="_14-5-多语言支持" tabindex="-1"><a class="header-anchor" href="#_14-5-多语言支持" aria-hidden="true">#</a> 14.5 多语言支持</h1><p>我们在第十章介绍过国际化和本地化，开发了一个go-i18n库，这小节我们将把该库集成到beego框架里面来，使得我们的框架支持国际化和本地化。</p><h2 id="i18n集成" tabindex="-1"><a class="header-anchor" href="#i18n集成" aria-hidden="true">#</a> i18n集成</h2><p>beego中设置全局变量如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
Translation	i18n.IL  
Lang 		string  //设置语言包，zh、en
LangPath	string  //设置语言包所在位置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化多语言函数:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func InitLang(){
    beego.Translation:=i18n.NewLocale()
    beego.Translation.LoadPath(beego.LangPath)
    beego.Translation.SetLocale(beego.Lang)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了方便在模板中直接调用多语言包，我们设计了三个函数来处理响应的多语言：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
beegoTplFuncMap[&quot;Trans&quot;] = i18n.I18nT
beegoTplFuncMap[&quot;TransDate&quot;] = i18n.I18nTimeDate
beegoTplFuncMap[&quot;TransMoney&quot;] = i18n.I18nMoney

func I18nT(args ...interface{}) string {
    ok := false
    var s string
    if len(args) == 1 {
        s, ok = args[0].(string)
    }
    if !ok {
        s = fmt.Sprint(args...)
    }
    return beego.Translation.Translate(s)
}

func I18nTimeDate(args ...interface{}) string {
    ok := false
    var s string
    if len(args) == 1 {
        s, ok = args[0].(string)
    }
    if !ok {
        s = fmt.Sprint(args...)
    }
    return beego.Translation.Time(s)
}

func I18nMoney(args ...interface{}) string {
    ok := false
    var s string
    if len(args) == 1 {
        s, ok = args[0].(string)
    }
    if !ok {
        s = fmt.Sprint(args...)
    }
    return beego.Translation.Money(s)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多语言开发使用" tabindex="-1"><a class="header-anchor" href="#多语言开发使用" aria-hidden="true">#</a> 多语言开发使用</h2><ol><li>设置语言以及语言包所在位置，然后初始化i18n对象：</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
beego.Lang = &quot;zh&quot;
beego.LangPath = &quot;views/lang&quot;
beego.InitLang()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>设计多语言包</p><p>上面讲了如何初始化多语言包，现在设计多语言包，多语言包是json文件，如第十章介绍的一样，我们需要把设计的文件放在LangPath下面，例如zh.json或者en.json</p></li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li><p>使用语言包</p><p>我们可以在controller中调用翻译获取响应的翻译语言，如下所示：</p></li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (this *MainController) Get() {
	this.Data[&quot;create&quot;] = beego.Translation.Translate(&quot;create&quot;)
	this.TplNames = &quot;index.tpl&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>我们也可以在模板中直接调用响应的翻译函数：
</code></pre><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//直接文本翻译
{{.create | Trans}}

//时间翻译
{{.time | TransDate}}

//货币翻译
{{.money | TransMoney}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,19);function p(m,b){const s=r("RouterLink");return t(),o("div",null,[l(" {% raw %} "),v,e("ul",null,[e("li",null,[i(s,{to:"/build-web-app/preface.html"},{default:a(()=>[n("目录")]),_:1})]),e("li",null,[n("上一节: "),i(s,{to:"/build-web-app/14.4.html"},{default:a(()=>[n("用户认证")]),_:1})]),e("li",null,[n("下一节: "),i(s,{to:"/build-web-app/14.6.html"},{default:a(()=>[n("pprof支持")]),_:1})])]),l(" {% endraw %} ")])}const k=d(c,[["render",p],["__file","14.5.html.vue"]]);export{k as default};
