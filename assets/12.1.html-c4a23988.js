import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as u,c as d,a as n,b as e,d as i,w as a,e as r}from"./app-9da01d16.js";const c={},v=n("h1",{id:"_12-1-应用日志",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_12-1-应用日志","aria-hidden":"true"},"#"),e(" 12.1 应用日志")],-1),m={href:"https://github.com/sirupsen/logrus",target:"_blank",rel:"noopener noreferrer"},p={href:"https://github.com/cihub/seelog",target:"_blank",rel:"noopener noreferrer"},g=r(`<h2 id="logrus介绍" tabindex="-1"><a class="header-anchor" href="#logrus介绍" aria-hidden="true">#</a> logrus介绍</h2><p>logrus是用Go语言实现的一个日志系统，与标准库log完全兼容并且核心API很稳定,是Go语言目前最活跃的日志库</p><p>首先安装logrus</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
go get -u github.com/sirupsen/logrus

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单例子:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	log &quot;github.com/Sirupsen/logrus&quot;
)

func main() {
	log.WithFields(log.Fields{
		&quot;animal&quot;: &quot;walrus&quot;,
	}).Info(&quot;A walrus appears&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基于logrus的自定义日志处理" tabindex="-1"><a class="header-anchor" href="#基于logrus的自定义日志处理" aria-hidden="true">#</a> 基于logrus的自定义日志处理</h3><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;os&quot;

	log &quot;github.com/Sirupsen/logrus&quot;
)

func init() {
	// 日志格式化为JSON而不是默认的ASCII
	log.SetFormatter(&amp;log.JSONFormatter{})

	// 输出stdout而不是默认的stderr，也可以是一个文件
	log.SetOutput(os.Stdout)

	// 只记录严重或以上警告
	log.SetLevel(log.WarnLevel)
}

func main() {
	log.WithFields(log.Fields{
		&quot;animal&quot;: &quot;walrus&quot;,
		&quot;size&quot;:   10,
	}).Info(&quot;A group of walrus emerges from the ocean&quot;)

	log.WithFields(log.Fields{
		&quot;omg&quot;:    true,
		&quot;number&quot;: 122,
	}).Warn(&quot;The group&#39;s number increased tremendously!&quot;)

	log.WithFields(log.Fields{
		&quot;omg&quot;:    true,
		&quot;number&quot;: 100,
	}).Fatal(&quot;The ice breaks!&quot;)

	// 通过日志语句重用字段
	// logrus.Entry返回自WithFields()
	contextLogger := log.WithFields(log.Fields{
		&quot;common&quot;: &quot;this is a common field&quot;,
		&quot;other&quot;:  &quot;I also should be logged always&quot;,
	})

	contextLogger.Info(&quot;I&#39;ll be logged with common and other field&quot;)
	contextLogger.Info(&quot;Me too&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="seelog介绍" tabindex="-1"><a class="header-anchor" href="#seelog介绍" aria-hidden="true">#</a> seelog介绍</h2><p>seelog是用Go语言实现的一个日志系统，它提供了一些简单的函数来实现复杂的日志分配、过滤和格式化。主要有如下特性：</p><ul><li><p>XML的动态配置，可以不用重新编译程序而动态的加载配置信息</p></li><li><p>支持热更新，能够动态改变配置而不需要重启应用</p></li><li><p>支持多输出流，能够同时把日志输出到多种流中、例如文件流、网络流等</p></li><li><p>支持不同的日志输出</p><ul><li>命令行输出</li><li>文件输出</li><li>缓存输出</li><li>支持log rotate</li><li>SMTP邮件</li></ul></li></ul><p>上面只列举了部分特性，seelog是一个特别强大的日志处理系统，详细的内容请参看官方wiki。接下来我将简要介绍一下如何在项目中使用它：</p><p>首先安装seelog</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
go get -u github.com/cihub/seelog

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们来看一个简单的例子：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import log &quot;github.com/cihub/seelog&quot;

func main() {
    defer log.Flush()
    log.Info(&quot;Hello from Seelog!&quot;)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后运行如果出现了<code>Hello from seelog</code>，说明seelog日志系统已经成功安装并且可以正常运行了。</p><h3 id="基于seelog的自定义日志处理" tabindex="-1"><a class="header-anchor" href="#基于seelog的自定义日志处理" aria-hidden="true">#</a> 基于seelog的自定义日志处理</h3><p>seelog支持自定义日志处理，下面是我基于它自定义的日志处理包的部分内容：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package logs

import (
	// &quot;errors&quot;
	&quot;fmt&quot;
	// &quot;io&quot;

	seelog &quot;github.com/cihub/seelog&quot;
)

var Logger seelog.LoggerInterface

func loadAppConfig() {
	appConfig := \`
&lt;seelog minlevel=&quot;warn&quot;&gt;
    &lt;outputs formatid=&quot;common&quot;&gt;
        &lt;rollingfile type=&quot;size&quot; filename=&quot;/data/logs/roll.log&quot; maxsize=&quot;100000&quot; maxrolls=&quot;5&quot;/&gt;
		&lt;filter levels=&quot;critical&quot;&gt;
            &lt;file path=&quot;/data/logs/critical.log&quot; formatid=&quot;critical&quot;/&gt;
            &lt;smtp formatid=&quot;criticalemail&quot; senderaddress=&quot;astaxie@gmail.com&quot; sendername=&quot;ShortUrl API&quot; hostname=&quot;smtp.gmail.com&quot; hostport=&quot;587&quot; username=&quot;mailusername&quot; password=&quot;mailpassword&quot;&gt;
                &lt;recipient address=&quot;xiemengjun@gmail.com&quot;/&gt;
            &lt;/smtp&gt;
        &lt;/filter&gt;
    &lt;/outputs&gt;
    &lt;formats&gt;
        &lt;format id=&quot;common&quot; format=&quot;%Date/%Time [%LEV] %Msg%n&quot; /&gt;
	    &lt;format id=&quot;critical&quot; format=&quot;%File %FullPath %Func %Msg%n&quot; /&gt;
	    &lt;format id=&quot;criticalemail&quot; format=&quot;Critical error on our server!\\n    %Time %Date %RelFile %Func %Msg \\nSent by Seelog&quot;/&gt;
    &lt;/formats&gt;
&lt;/seelog&gt;
\`
	logger, err := seelog.LoggerFromConfigAsBytes([]byte(appConfig))
	if err != nil {
		fmt.Println(err)
		return
	}
	UseLogger(logger)
}

func init() {
	DisableLog()
	loadAppConfig()
}

// DisableLog disables all library log output
func DisableLog() {
	Logger = seelog.Disabled
}

// UseLogger uses a specified seelog.LoggerInterface to output library log.
// Use this func if you are using Seelog logging system in your app.
func UseLogger(newLogger seelog.LoggerInterface) {
	Logger = newLogger
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面主要实现了三个函数，</p><ul><li><p><code>DisableLog</code></p><p>初始化全局变量Logger为seelog的禁用状态，主要为了防止Logger被多次初始化</p></li><li><p><code>loadAppConfig</code></p><p>根据配置文件初始化seelog的配置信息，这里我们把配置文件通过字符串读取设置好了，当然也可以通过读取XML文件。里面的配置说明如下：</p><ul><li><p>seelog</p><p>minlevel参数可选，如果被配置,高于或等于此级别的日志会被记录，同理maxlevel。</p></li><li><p>outputs</p><p>输出信息的目的地，这里分成了两份数据，一份记录到log rotate文件里面。另一份设置了filter，如果这个错误级别是critical，那么将发送报警邮件。</p></li><li><p>formats</p><p>定义了各种日志的格式</p></li></ul></li><li><p><code>UseLogger</code></p><p>设置当前的日志器为相应的日志处理</p></li></ul><p>上面我们定义了一个自定义的日志处理包，下面就是使用示例：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;net/http&quot;
	&quot;project/logs&quot;
	&quot;project/configs&quot;
	&quot;project/routes&quot;
)

func main() {
	addr, _ := configs.MainConfig.String(&quot;server&quot;, &quot;addr&quot;)
	logs.Logger.Info(&quot;Start server at:%v&quot;, addr)
	err := http.ListenAndServe(addr, routes.NewMux())
	logs.Logger.Critical(&quot;Server err:%v&quot;, err)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="发生错误发送邮件" tabindex="-1"><a class="header-anchor" href="#发生错误发送邮件" aria-hidden="true">#</a> 发生错误发送邮件</h2><p>上面的例子解释了如何设置发送邮件，我们通过如下的smtp配置用来发送邮件：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>smtp</span> <span class="token attr-name">formatid</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>criticalemail<span class="token punctuation">&quot;</span></span> <span class="token attr-name">senderaddress</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>astaxie@gmail.com<span class="token punctuation">&quot;</span></span> <span class="token attr-name">sendername</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ShortUrl API<span class="token punctuation">&quot;</span></span> <span class="token attr-name">hostname</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>smtp.gmail.com<span class="token punctuation">&quot;</span></span> <span class="token attr-name">hostport</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>587<span class="token punctuation">&quot;</span></span> <span class="token attr-name">username</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mailusername<span class="token punctuation">&quot;</span></span> <span class="token attr-name">password</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mailpassword<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>recipient</span> <span class="token attr-name">address</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xiemengjun@gmail.com<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>smtp</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>邮件的格式通过criticalemail配置，然后通过其他的配置发送邮件服务器的配置，通过recipient配置接收邮件的用户，如果有多个用户可以再添加一行。</p><p>要测试这个代码是否正常工作，可以在代码中增加类似下面的一个假消息。不过记住过后要把它删除，否则上线之后就会收到很多垃圾邮件。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
logs.Logger.Critical(&quot;test Critical message&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，只要我们的应用在线上记录一个Critical的信息，你的邮箱就会收到一个Email，这样一旦线上的系统出现问题，你就能立马通过邮件获知，就能及时的进行处理。</p><h2 id="使用应用日志" tabindex="-1"><a class="header-anchor" href="#使用应用日志" aria-hidden="true">#</a> 使用应用日志</h2><p>对于应用日志，每个人的应用场景可能会各不相同，有些人利用应用日志来做数据分析，有些人利用应用日志来做性能分析，有些人来做用户行为分析，还有些就是纯粹的记录，以方便应用出现问题的时候辅助查找问题。</p><p>举一个例子，我们需要跟踪用户尝试登陆系统的操作。这里会把成功与不成功的尝试都记录下来。记录成功的使用&quot;Info&quot;日志级别，而不成功的使用&quot;warn&quot;级别。如果想查找所有不成功的登陆，我们可以利用linux的grep之类的命令工具，如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
# cat /data/logs/roll.log | grep &quot;failed login&quot;
2012-12-11 11:12:00 WARN : failed login attempt from 11.22.33.44 username password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方式我们就可以很方便的查找相应的信息，这样有利于我们针对应用日志做一些统计和分析。另外我们还需要考虑日志的大小，对于一个高流量的Web应用来说，日志的增长是相当可怕的，所以我们在seelog的配置文件里面设置了logrotate，这样就能保证日志文件不会因为不断变大而导致我们的磁盘空间不够引起问题。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>通过上面对seelog系统及如何基于它进行自定义日志系统的学习，现在我们可以很轻松的随需构建一个合适的功能强大的日志处理系统了。日志处理系统为数据分析提供了可靠的数据源，比如通过对日志的分析，我们可以进一步优化系统，或者应用出现问题时方便查找定位问题，另外seelog也提供了日志分级功能，通过对minlevel的配置，我们可以很方便的设置测试或发布版本的输出消息级别。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,39);function b(q,h){const l=t("ExternalLinkIcon"),s=t("RouterLink");return u(),d("div",null,[v,n("p",null,[e("我们期望开发的Web应用程序能够把整个程序运行过程中出现的各种事件一一记录下来，Go语言中提供了一个简易的log包，我们使用该包可以方便的实现日志记录的功能，这些日志都是基于fmt包的打印再结合panic之类的函数来进行一般的打印、抛出错误处理。Go目前标准包只是包含了简单的功能，如果我们想把我们的应用日志保存到文件，然后又能够结合日志实现很多复杂的功能（编写过Java或者C++的读者应该都使用过log4j和log4cpp之类的日志工具），可以使用第三方开发的日志系统:"),n("a",m,[e("logrus"),i(l)]),e("和"),n("a",p,[e("seelog"),i(l)]),e("，它们实现了很强大的日志功能，可以结合自己项目选择。接下来我们介绍如何通过该日志系统来实现我们应用的日志功能。")]),g,n("ul",null,[n("li",null,[i(s,{to:"/build-web-app/preface.html"},{default:a(()=>[e("目录")]),_:1})]),n("li",null,[e("上一章: "),i(s,{to:"/build-web-app/12.0.html"},{default:a(()=>[e("部署与维护")]),_:1})]),n("li",null,[e("下一节: "),i(s,{to:"/build-web-app/12.2.html"},{default:a(()=>[e("网站错误处理")]),_:1})])])])}const x=o(c,[["render",b],["__file","12.1.html.vue"]]);export{x as default};
