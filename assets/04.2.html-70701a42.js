import{_ as u}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as p,c,a,b as n,d as s,w as t,e as i}from"./app-9da01d16.js";const r={},d=i(`<h1 id="_4-2-验证表单的输入" tabindex="-1"><a class="header-anchor" href="#_4-2-验证表单的输入" aria-hidden="true">#</a> 4.2 验证表单的输入</h1><p>开发Web的一个原则就是，不能信任用户输入的任何信息，所以验证和过滤用户的输入信息就变得非常重要，我们经常会在微博、新闻中听到某某网站被入侵了，存在什么漏洞，这些大多是因为网站对于用户输入的信息没有做严格的验证引起的，所以为了编写出安全可靠的Web程序，验证表单输入的意义重大。</p><p>我们平常编写Web应用主要有两方面的数据验证，一个是在页面端的js验证(目前在这方面有很多的插件库，比如ValidationJS插件)，一个是在服务器端的验证，我们这小节讲解的是如何在服务器端验证。</p><h2 id="必填字段" tabindex="-1"><a class="header-anchor" href="#必填字段" aria-hidden="true">#</a> 必填字段</h2><p>你想要确保从一个表单元素中得到一个值，例如前面小节里面的用户名，我们如何处理呢？Go有一个内置函数<code>len</code>可以获取字符串的长度，这样我们就可以通过len来获取数据的长度，例如：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if len(r.Form[&quot;username&quot;][0])==0{
	//为空的处理
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>r.Form</code>对不同类型的表单元素的留空有不同的处理， 对于空文本框、空文本区域以及文件上传，元素的值为空值,而如果是未选中的复选框和单选按钮，则根本不会在r.Form中产生相应条目，如果我们用上面例子中的方式去获取数据时程序就会报错。所以我们需要通过<code>r.Form.Get()</code>来获取值，因为如果字段不存在，通过该方式获取的是空值。但是通过<code>r.Form.Get()</code>只能获取单个的值，如果是map的值，必须通过上面的方式来获取。</p><h2 id="数字" tabindex="-1"><a class="header-anchor" href="#数字" aria-hidden="true">#</a> 数字</h2><p>你想要确保一个表单输入框中获取的只能是数字，例如，你想通过表单获取某个人的具体年龄是50岁还是10岁，而不是像“一把年纪了”或“年轻着呢”这种描述</p><p>如果我们是判断正整数，那么我们先转化成int类型，然后进行处理</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
getint,err:=strconv.Atoi(r.Form.Get(&quot;age&quot;))
if err!=nil{
	//数字转化出错了，那么可能就不是数字
}

//接下来就可以判断这个数字的大小范围了
if getint &gt;100 {
	//太大了
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一种方式就是正则匹配的方式</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if m, _ := regexp.MatchString(&quot;^[0-9]+$&quot;, r.Form.Get(&quot;age&quot;)); !m {
	return false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于性能要求很高的用户来说，这是一个老生常谈的问题了，他们认为应该尽量避免使用正则表达式，因为使用正则表达式的速度会比较慢。但是在目前机器性能那么强劲的情况下，对于这种简单的正则表达式效率和类型转换函数是没有什么差别的。如果你对正则表达式很熟悉，而且你在其它语言中也在使用它，那么在Go里面使用正则表达式将是一个便利的方式。</p>`,14),v={href:"http://code.google.com/p/re2/wiki/Syntax",target:"_blank",rel:"noopener noreferrer"},m=i(`<h2 id="中文" tabindex="-1"><a class="header-anchor" href="#中文" aria-hidden="true">#</a> 中文</h2><p>有时候我们想通过表单元素获取一个用户的中文名字，但是又为了保证获取的是正确的中文，我们需要进行验证，而不是用户随便的一些输入。对于中文我们目前有两种方式来验证，可以使用 <code>unicode</code> 包提供的 <code>func Is(rangeTab *RangeTable, r rune) bool</code> 来验证，也可以使用正则方式来验证，这里使用最简单的正则方式，如下代码所示</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if m, _ := regexp.MatchString(&quot;^\\\\p{Han}+$&quot;, r.Form.Get(&quot;realname&quot;)); !m {
	return false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="英文" tabindex="-1"><a class="header-anchor" href="#英文" aria-hidden="true">#</a> 英文</h2><p>我们期望通过表单元素获取一个英文值，例如我们想知道一个用户的英文名，应该是astaxie，而不是asta谢。</p><p>我们可以很简单的通过正则验证数据：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if m, _ := regexp.MatchString(&quot;^[a-zA-Z]+$&quot;, r.Form.Get(&quot;engname&quot;)); !m {
	return false
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="电子邮件地址" tabindex="-1"><a class="header-anchor" href="#电子邮件地址" aria-hidden="true">#</a> 电子邮件地址</h2><p>你想知道用户输入的一个Email地址是否正确，通过如下这个方式可以验证：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if m, _ := regexp.MatchString(\`^([\\w\\.\\_]{2,10})@(\\w{1,})\\.([a-z]{2,4})$\`, r.Form.Get(&quot;email&quot;)); !m {
	fmt.Println(&quot;no&quot;)
}else{
	fmt.Println(&quot;yes&quot;)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="手机号码" tabindex="-1"><a class="header-anchor" href="#手机号码" aria-hidden="true">#</a> 手机号码</h2><p>你想要判断用户输入的手机号码是否正确，通过正则也可以验证：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if m, _ := regexp.MatchString(\`^(1[3|4|5|8][0-9]\\d{4,8})$\`, r.Form.Get(&quot;mobile&quot;)); !m {
	return false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="下拉菜单" tabindex="-1"><a class="header-anchor" href="#下拉菜单" aria-hidden="true">#</a> 下拉菜单</h2><p>如果我们想要判断表单里面<code>&lt;select&gt;</code>元素生成的下拉菜单中是否有被选中的项目。有些时候黑客可能会伪造这个下拉菜单不存在的值发送给你，那么如何判断这个值是否是我们预设的值呢？</p><p>我们的select可能是这样的一些元素</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fruit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>apple<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pear<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>pear<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>banana<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>banana<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么我们可以这样来验证</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
slice:=[]string{&quot;apple&quot;,&quot;pear&quot;,&quot;banana&quot;}

v := r.Form.Get(&quot;fruit&quot;)
for _, item := range slice {
	if item == v {
		return true
	}
}

return false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单选按钮" tabindex="-1"><a class="header-anchor" href="#单选按钮" aria-hidden="true">#</a> 单选按钮</h2><p>如果我们想要判断radio按钮是否有一个被选中了，我们页面的输出可能就是一个男、女性别的选择，但是也可能一个15岁大的无聊小孩，一手拿着http协议的书，另一只手通过telnet客户端向你的程序在发送请求呢，你设定的性别男值是1，女是2，他给你发送一个3，你的程序会出现异常吗？因此我们也需要像下拉菜单的判断方式类似，判断我们获取的值是我们预设的值，而不是额外的值。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>radio<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>gender<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>男
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>radio<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>gender<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>女
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那我们也可以类似下拉菜单的做法一样</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
slice:=[]string{&quot;1&quot;,&quot;2&quot;}

for _, v := range slice {
	if v == r.Form.Get(&quot;gender&quot;) {
		return true
	}
}
return false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复选框" tabindex="-1"><a class="header-anchor" href="#复选框" aria-hidden="true">#</a> 复选框</h2><p>有一项选择兴趣的复选框，你想确定用户选中的和你提供给用户选择的是同一个类型的数据。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>interest<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>football<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>足球
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>interest<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>basketball<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>篮球
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>interest<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>tennis<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>网球
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于复选框我们的验证和单选有点不一样，因为接收到的数据是一个slice</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
slice:=[]string{&quot;football&quot;,&quot;basketball&quot;,&quot;tennis&quot;}
a:=Slice_diff(r.Form[&quot;interest&quot;],slice)
if a == nil{
	return true
}

return false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29),b=a("code",null,"Slice_diff",-1),k={href:"https://github.com/astaxie/beeku",target:"_blank",rel:"noopener noreferrer"},g=i(`<h2 id="日期和时间" tabindex="-1"><a class="header-anchor" href="#日期和时间" aria-hidden="true">#</a> 日期和时间</h2><p>你想确定用户填写的日期或时间是否有效。例如<br> ，用户在日程表中安排8月份的第45天开会，或者提供未来的某个时间作为生日。</p><p>Go里面提供了一个time的处理包，我们可以把用户的输入年月日转化成相应的时间，然后进行逻辑判断</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
t := time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC)
fmt.Printf(&quot;Go launched at %s\\n&quot;, t.Local())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取time之后我们就可以进行很多时间函数的操作。具体的判断就根据自己的需求调整。</p><h2 id="身份证号码" tabindex="-1"><a class="header-anchor" href="#身份证号码" aria-hidden="true">#</a> 身份证号码</h2><p>如果我们想验证表单输入的是否是身份证，通过正则也可以方便的验证，但是身份证有15位和18位，我们两个都需要验证</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//验证15位身份证，15位的是全部数字
if m, _ := regexp.MatchString(\`^(\\d{15})$\`, r.Form.Get(&quot;usercard&quot;)); !m {
	return false
}

//验证18位身份证，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
if m, _ := regexp.MatchString(\`^(\\d{17})([0-9]|X)$\`, r.Form.Get(&quot;usercard&quot;)); !m {
	return false
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面列出了我们一些常用的服务器端的表单元素验证，希望通过这个引导入门，能够让你对Go的数据验证有所了解，特别是Go里面的正则处理。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,10);function h(q,f){const l=o("ExternalLinkIcon"),e=o("RouterLink");return p(),c("div",null,[d,a("blockquote",null,[a("p",null,[n("Go实现的正则是"),a("a",v,[n("RE2"),s(l)]),n("，所有的字符都是UTF-8编码的。")])]),m,a("p",null,[n("上面这个函数"),b,n("包含在我开源的一个库里面(操作slice和map的库)，"),a("a",k,[n("https://github.com/astaxie/beeku"),s(l)])]),g,a("ul",null,[a("li",null,[s(e,{to:"/build-web-app/preface.html"},{default:t(()=>[n("目录")]),_:1})]),a("li",null,[n("上一节: "),s(e,{to:"/build-web-app/04.1.html"},{default:t(()=>[n("处理表单的输入")]),_:1})]),a("li",null,[n("下一节: "),s(e,{to:"/build-web-app/04.3.html"},{default:t(()=>[n("预防跨站脚本")]),_:1})])])])}const _=u(r,[["render",h],["__file","04.2.html.vue"]]);export{_ as default};
