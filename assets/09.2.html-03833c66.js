import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c,a as n,d as t,w as e,b as a,e as i}from"./app-9da01d16.js";const u={},r=i(`<h1 id="_9-2-确保输入过滤" tabindex="-1"><a class="header-anchor" href="#_9-2-确保输入过滤" aria-hidden="true">#</a> 9.2 确保输入过滤</h1><p>过滤用户数据是Web应用安全的基础。它是验证数据合法性的过程。通过对所有的输入数据进行过滤，可以避免恶意数据在程序中被误信或误用。大多数Web应用的漏洞都是因为没有对用户输入的数据进行恰当过滤所引起的。</p><p>我们介绍的过滤数据分成三个步骤：</p><ul><li>1、识别数据，搞清楚需要过滤的数据来自于哪里</li><li>2、过滤数据，弄明白我们需要什么样的数据</li><li>3、区分已过滤及被污染数据，如果存在攻击数据那么保证过滤之后可以让我们使用更安全的数据</li></ul><h2 id="识别数据" tabindex="-1"><a class="header-anchor" href="#识别数据" aria-hidden="true">#</a> 识别数据</h2><p>“识别数据”作为第一步是因为在你不知道“数据是什么，它来自于哪里”的前提下，你也就不能正确地过滤它。这里的数据是指所有源自非代码内部提供的数据。例如:所有来自客户端的数据，但客户端并不是唯一的外部数据源，数据库和第三方提供的接口数据等也可以是外部数据源。</p><p>由用户输入的数据我们通过Go非常容易识别，Go通过<code>r.ParseForm</code>之后，把用户POST和GET的数据全部放在了<code>r.Form</code>里面。其它的输入要难识别得多，例如，<code>r.Header</code>中的很多元素是由客户端所操纵的。常常很难确认其中的哪些元素组成了输入，所以，最好的方法是把里面所有的数据都看成是用户输入。(例如<code>r.Header.Get(&quot;Accept-Charset&quot;)</code>这样的也看做是用户输入,虽然这些大多数是浏览器操纵的)</p><h2 id="过滤数据" tabindex="-1"><a class="header-anchor" href="#过滤数据" aria-hidden="true">#</a> 过滤数据</h2><p>在知道数据来源之后，就可以过滤它了。过滤是一个有点正式的术语，它在平时表述中有很多同义词，如验证、清洁及净化。尽管这些术语表面意义不同，但它们都是指的同一个处理：防止非法数据进入你的应用。</p><p>过滤数据有很多种方法，其中有一些安全性较差。最好的方法是把过滤看成是一个检查的过程，在你使用数据之前都检查一下看它们是否是符合合法数据的要求。而且不要试图好心地去纠正非法数据，而要让用户按你制定的规则去输入数据。历史证明了试图纠正非法数据往往会导致安全漏洞。这里举个例子：“最近建设银行系统升级之后，如果密码后面两位是0，只要输入前面四位就能登录系统”，这是一个非常严重的漏洞。</p><p>过滤数据主要采用如下一些库来操作：</p><ul><li>strconv包下面的字符串转化相关函数，因为从Request中的<code>r.Form</code>返回的是字符串，而有些时候我们需要将之转化成整/浮点数，<code>Atoi</code>、<code>ParseBool</code>、<code>ParseFloat</code>、<code>ParseInt</code>等函数就可以派上用场了。</li><li>string包下面的一些过滤函数<code>Trim</code>、<code>ToLower</code>、<code>ToTitle</code>等函数，能够帮助我们按照指定的格式获取信息。</li><li>regexp包用来处理一些复杂的需求，例如判定输入是否是Email、生日之类。</li></ul><p>过滤数据除了检查验证之外，在特殊时候，还可以采用白名单。即假定你正在检查的数据都是非法的，除非能证明它是合法的。使用这个方法，如果出现错误，只会导致把合法的数据当成是非法的，而不会是相反，尽管我们不想犯任何错误，但这样总比把非法数据当成合法数据要安全得多。</p><h2 id="区分过滤数据" tabindex="-1"><a class="header-anchor" href="#区分过滤数据" aria-hidden="true">#</a> 区分过滤数据</h2><p>如果完成了上面的两步，数据过滤的工作就基本完成了，但是在编写Web应用的时候我们还需要区分已过滤和被污染数据，因为这样可以保证过滤数据的完整性，而不影响输入的数据。我们约定把所有经过过滤的数据放入一个叫全局的Map变量中(CleanMap)。这时需要用两个重要的步骤来防止被污染数据的注入：</p><ul><li>每个请求都要初始化CleanMap为一个空Map。</li><li>加入检查及阻止来自外部数据源的变量命名为CleanMap。</li></ul><p>接下来，让我们通过一个例子来巩固这些概念，请看下面这个表单</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/whoami<span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>POST<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	我是谁:
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>astaxie<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>astaxie<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>herry<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>herry<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>marry<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>marry<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在处理这个表单的编程逻辑中，非常容易犯的错误是认为只能提交三个选择中的一个。其实攻击者可以模拟POST操作，递交<code>name=attack</code>这样的数据，所以在此时我们需要做类似白名单的处理</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
r.ParseForm()
name := r.Form.Get(&quot;name&quot;)
CleanMap := make(map[string]interface{}, 0)
if name == &quot;astaxie&quot; || name == &quot;herry&quot; || name == &quot;marry&quot; {
	CleanMap[&quot;name&quot;] = name
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中我们初始化了一个CleanMap的变量，当判断获取的name是<code>astaxie</code>、<code>herry</code>、<code>marry</code>三个中的一个之后<br> ，我们把数据存储到了CleanMap之中，这样就可以确保CleanMap[&quot;name&quot;]中的数据是合法的，从而在代码的其它部分使用它。当然我们还可以在else部分增加非法数据的处理，一种可能是再次显示表单并提示错误。但是不要试图为了友好而输出被污染的数据。</p><p>上面的方法对于过滤一组已知的合法值的数据很有效，但是对于过滤有一组已知合法字符组成的数据时就没有什么帮助。例如，你可能需要一个用户名只能由字母及数字组成：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
r.ParseForm()
username := r.Form.Get(&quot;username&quot;)
CleanMap := make(map[string]interface{}, 0)
if ok, _ := regexp.MatchString(&quot;^[a-zA-Z0-9]+$&quot;, username); ok {
	CleanMap[&quot;username&quot;] = username
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>数据过滤在Web安全中起到一个基石的作用，大多数的安全问题都是由于没有过滤数据和验证数据引起的，例如前面小节的CSRF攻击，以及接下来将要介绍的XSS攻击、SQL注入等都是没有认真地过滤数据引起的，因此我们需要特别重视这部分的内容。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,26);function d(m,k){const s=p("RouterLink");return l(),c("div",null,[r,n("ul",null,[n("li",null,[t(s,{to:"/build-web-app/preface.html"},{default:e(()=>[a("目录")]),_:1})]),n("li",null,[a("上一节: "),t(s,{to:"/build-web-app/09.1.html"},{default:e(()=>[a("预防CSRF攻击")]),_:1})]),n("li",null,[a("下一节: "),t(s,{to:"/build-web-app/09.3.html"},{default:e(()=>[a("避免XSS攻击")]),_:1})])])])}const b=o(u,[["render",d],["__file","09.2.html.vue"]]);export{b as default};