import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as r,c as d,a as n,b as e,d as a,w as i,e as l}from"./app-9da01d16.js";const c={},u=n("h1",{id:"_20-4-建造你自己的-hello-world-应用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_20-4-建造你自己的-hello-world-应用","aria-hidden":"true"},"#"),e(" 20.4 建造你自己的 Hello world 应用")],-1),v=l(`<h2 id="_20-4-1-映像结构-map-structure-创造一个简单的-http-handler" tabindex="-1"><a class="header-anchor" href="#_20-4-1-映像结构-map-structure-创造一个简单的-http-handler" aria-hidden="true">#</a> 20.4.1 映像结构 (map-structure)：创造一个简单的 http-handler</h2><p>创建一个目录，并给它起一个你的应用程序特有的名字，如：helloapp。这个应用程序的所有文件都在这个目录中。在这个目录中再创建一个名为 hello 的目录。这将包含我们的 hello 包的 Go 源代码文件。然后在 hello 目录下，创建一个名为 helloworld2.go 的文件，并赋予其以下内容（事实上与上文中的 demo 应用几乎相同）：</p><p><u><a href="examples%5Cchapter_20%5Chelloapp%5Chello%5Chelloworld2_version1.go">Listing 20.2 helloworld2_version1.go</a></u>:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> hello

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Fprint</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Hello, world!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),m=n("code",null,"package main",-1),h=n("code",null,"main",-1),_=n("code",null,"http",-1),g=n("code",null,"main()",-1),b=n("code",null,"init()",-1),k=n("h2",{id:"_20-4-2-创建配置文件-app-yaml",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_20-4-2-创建配置文件-app-yaml","aria-hidden":"true"},"#"),e(" 20.4.2 创建配置文件 app.yaml")],-1),f={href:"http://www.yaml.org",target:"_blank",rel:"noopener noreferrer"},y=l(`<p>应用程序的映像/文件结构应该如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helloapp\\ 	// map of the GAE application
app.yaml 	// configuration file
hello\\ 		// map containing the source files
helloworld2.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只有app.yaml是必须的名字，映像、Go文件和包的名字可以有不同的选择，但按照惯例，它们的名字是一样的或类似的，根映像的后缀是 app。<br> app.yaml 由 AppEngine 读取和解释，AppEngine 以下时间段内托管和执行你的程序：</p><ul><li>当您将您的应用程序上传到 AppEngine 以使其被托管。</li><li>当它被执行时。</li><li>当用户访问它时。</li></ul><p>它可以包含注释，前面有一个 <code>#</code>，并包含以下语句：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">application</span><span class="token punctuation">:</span> helloworld
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token key atrule">runtime</span><span class="token punctuation">:</span> go
<span class="token key atrule">api_version</span><span class="token punctuation">:</span> <span class="token number">3</span>

<span class="token comment"># routing-table: routing of different urls to different types of handlers</span>
<span class="token key atrule">handlers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> /.*
  <span class="token key atrule">script</span><span class="token punctuation">:</span> _go_app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>app.yaml 中的 <code>application: value helloworld</code> 是您的应用程序标识符。这个值在开发过程中可以是任何东西；以后在向 App Engine 注册您的应用程序时，您将选择一个唯一的标识符（在所有 GAE 应用程序中唯一）并更新这个值。</p><p><code>version</code> 表示您的应用程序正在运行的版本：事实上，GAE 可以并行地运行您的应用程序的几个版本，但其中一个必须被指定为默认版本。它可以包含字母数字字符，以及连字符。因此，你可以运行一个测试版本，如T2-31 和一个生产版本 P2-1。</p><p><code>runtime</code> 是编写应用程序的语言（其他允许的值是 Java 和 Python）。如果你在上传应用软件的新版本之前调整它，App Engine 将保留以前的版本，并让你使用管理控制台回退到以前的版本。</p><p><code>api_version</code> 是本 SDK 中使用的 Go API 的版本；它们可能与以前的版本不兼容。你可以在以前的 api_version SDK 中构建你的应用程序的早期版本；如果 GAE 仍然允许，它们可以继续运行，但通常有一个时间限制，而你应该将你的应用程序更新到新的api版本：bin map中的gofix工具可能能够完成大部分所需的更新。</p>`,10),E=n("code",null,"handler",-1),x={href:"http://localhost:8080/",target:"_blank",rel:"noopener noreferrer"},w={href:"http://appname.appspot.com/",target:"_blank",rel:"noopener noreferrer"},A=l(`<p>对于第一个匹配的 url 模式，相应的脚本会被执行。在我们的例子中，每一个路径与正则表达式 <code>/.*</code> 相匹配的 URL 请求（即：所有 URL）都应该由 Go 程序处理。<code>_go_app</code> 值是 dev_appserver.py 识别的一个神奇字符串；生产的 App Engine 服务器会忽略它。</p><p>如果你看一下演示的 helloworld 应用程序的 app.yaml 文件，你会发现它在处理程序中包含一个初始部分：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">handlers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> /favicon\\.ico
  <span class="token key atrule">static_files</span><span class="token punctuation">:</span> favicon.ico
  <span class="token key atrule">upload</span><span class="token punctuation">:</span> favicon\\.ico
<span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> /.*
  <span class="token key atrule">script</span><span class="token punctuation">:</span> _go_app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一些文件 (<code>static_files</code>) ，如图片，不会改变（在这个例子中是图片favicon.ico）。这些文件可以放在不同的 AppEngine 服务器上的一种共同缓存中，使它们能够更快地提供给用户。如果您的应用程序有许多这样的文件，把它们放在一个单独的目录中，按惯例命名为 static。</p><p><code>upload</code> 表示当您部署应用程序时，什么必须上传到云端；例如，如果它包含 images/(*.ico|*.gif|*.jpg)，它将把本地 images 目录内所有这些类型的文件上传到 AppEngine 服务器。</p><p>正如我们将看到的，大多数 GAE 应用程序也使用模板文件，这些文件可以存储在根应用程序地图中，或在一个特殊的目录 tmpl 中。</p><p>因此，一个 GAE 应用程序的一般结构可能是：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yourapp\\ 		// map of the GAE application
		app.yaml // configuration file
		yourpackage\\ // map containing the source files
			package1.go
			…
		tmpl\\ // map containing template files
			root.html
			update.html
			…
		static\\ // map containing static files
			yourapp.ico
			…
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 demo 一样，在控制台窗口中进入包含 helloapp 的映像，并发出如下命令：<code>dev_appserver.py helloapp</code></p><p>或者你可以通过任何一个映像的 console 窗口并且唤醒：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>dev_appserver.py /path_to_map_helloapp/helloapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,11),G={href:"http://localhost:8080/",target:"_blank",rel:"noopener noreferrer"},F=l(`<p>你应该看到： Hello, world!</p><p>在服务器控制台，出现以下文字：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ dev_appserver.py helloapp
INFO 2011-10-31 08:54:29,021 appengine_rpc.py:159] Server: appengine.google.com
INFO 2011-10-31 08:54:29,025 appcfg.py:463] Checking for updates to the SDK.
INFO 2011-10-31 08:54:29,316 appcfg.py:481] The SDK is up to date.
WARNING 2011-10-31 08:54:29,316 datastore_file_stub.py:512] Could not read datastore
data from /tmp/dev_appserver.datastore
INFO 2011-10-31 08:54:29,317 rdbms_sqlite.py:58] Connecting to SQLite database ‘’
with file ‘/tmp/dev_appserver.rdbms’
INFO 2011-10-31 08:54:29,638 dev_appserver_multiprocess.py:637] Running application
helloworld on port 8080: http://localhost:8080
		&lt;-(A)
INFO 2011-10-31 08:56:13,148 __init__.py:365] building _go_app
		&lt;-(B)
INFO 2011-10-31 08:56:15,073 __init__.py:351] running _go_app
INFO 2011-10-31 08:56:15,188 dev_appserver.py:4143] “GET / HTTP/1.1” 200 -
		&lt;-(C)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 (A) 处服务器准备好了，在 (B) 处服务器编译并运行 Go 程序，在 (C) 处我们的应用程序的请求进来了，此时 HTML 输出页面被提供到服务器上。</p>`,4),C={href:"http://localhost:8080/%EF%BC%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E5%9C%A8FireFox",target:"_blank",rel:"noopener noreferrer"},N=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Unable to connect Firefox can’t establish a connection to the server at localhost:8080.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_20-4-3-迭代开发" tabindex="-1"><a class="header-anchor" href="#_20-4-3-迭代开发" aria-hidden="true">#</a> 20.4.3 迭代开发</h2><p>开发应用的服务器会观察你的文件中的变化，当你更新你的源代码时（编辑+保存），它重新编译它们并重新启动你的本地应用；不需要重新启动 dev_appserver.py</p>`,3),I={href:"http://localhost:8080/%EF%BC%8C%E5%B0%B1%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E5%8F%98%E5%8C%96%E4%BA%86%EF%BC%9A%E8%BF%99%E5%92%8C%E7%BC%96%E5%86%99",target:"_blank",rel:"noopener noreferrer"},B=l(`<p>要关闭 Web 服务器，确保终端窗口处于活动状态，然后按 Ctrl+C（或适当的用于控制台的 &quot;break &quot;键）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>INFO 2011-10-31 08:56:21,420 dev_appserver.py:4143] “GET / HTTP/1.1” 200 -
INFO 2011-10-31 08:57:59,836 __init__.py:365] building _go_app &lt;-(D)
INFO 2011-10-31 08:58:00,365 __init__.py:351] running _go_app
INFO 2011-10-31 08:58:00,480 dev_appserver.py:4143] “GET / HTTP/1.1” 200 -
^CINFO 2011-10-31 08:58:32,769 dev_appserver_main.py:665] Server interrupted by user,
terminating &lt;-(E)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这可以从上面第一个列表之后的服务器控制台输出中看到：在 (D) 处，apperver 看到 Go 的源代码被改变了，并重新编译；在 (E) 处，服务器被终止了。</p><h2 id="_20-4-4-与-goclipse-ide-的集成" tabindex="-1"><a class="header-anchor" href="#_20-4-4-与-goclipse-ide-的集成" aria-hidden="true">#</a> 20.4.4. 与 GoClipse IDE 的集成</h2><p>a) 窗口/首选项/Go：</p><p>将所有内容指向 GAE 的 Go 根目录</p><p>b) 运行/外部工具/外部工具配置/选择程序：</p><p>​ 制作新的配置：点击 New 按钮。<br> ​ 名称：GAE<br> ​ 位置：/home/user/google_appengine/dev_appserver.py<br> ​ 工作目录：/home/user/workspace/bedilly/src/pkg/helloapp<br> ​ 参数： home/user/workspace/bedilly/src/pkg/helloapp<br> ​ 应用/运行</p>`,8),T={href:"http://code.google.com/p/goclipse/wiki/DeployingToGoogleAppEngineFromEclipse",target:"_blank",rel:"noopener noreferrer"},O=n("h2",{id:"链接",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),e(" 链接")],-1);function q(L,R){const t=o("RouterLink"),s=o("ExternalLinkIcon");return r(),d("div",null,[u,n("p",null,[e("现在让我们建造一个像 "),a(t,{to:"/the-way-to-go/20.3.html"},{default:i(()=>[e("20.3 节")]),_:1}),e("中的 demo 一样的应用，但这次我们会探索得更深一些。")]),v,n("p",null,[e("注意包的名称：在编写独立的 Go 程序时，我们会把这段代码放在 "),m,e(" 中，但 Go GAE Runtime 提供了 "),h,e(" 包和 HTTP Listener，所以你应该把你的代码放在你选择的包中，此时指的是 hello 包。其次，由于 Go App Engine 应用程序通过 Web 服务器与外部世界进行通信，所以编写这些应用程序非常像编写独立的 Go Web 应用程序（见"),a(t,{to:"/the-way-to-go/15.0.html"},{default:i(()=>[e("第 15 章")]),_:1}),e("）。所以我们导入 "),_,e(" 包，并为我们的应用程序中使用的不同url 模式定义处理函数。我们没有 "),g,e(" 函数，所以处理程序的设置必须移到 "),b,e(' 函数中去。另外，网络服务器本身的启动是由 GAE 为我们完成的。我们的 Go 包 hello 对任何请求的响应是发送一个包含 "Hello, world!"的消息。')]),k,n("p",null,[e("所有的 GAE 应用程序都需要一个 yaml 配置文件 app.yaml，它包含了 GAE 的应用程序元数据（yaml 是一种文本文件格式，经常用于开源项目，更多信息见 "),n("a",f,[e("www.yaml.org"),a(s)]),e("）。另外，这个文件告诉 App Engine 服务要使用哪个运行时，哪些 URL 应该由我们的 Go 程序处理。你可以从演示程序中复制一个 app.yaml 文件，把它放在映像 helloapp 里面，并删除 favicon.ico 的 handler。")]),y,n("p",null,[E,e(" 部分是循环表 (routing table)：它告诉 GAE 如何将发送到服务器上的请求映射到代码中。对于每一个传入的请求 url 模式（本地开发时在 "),n("a",x,[e("http://localhost:8080/"),a(s)]),e(" 之后的部分，在云端运行时在 "),n("a",w,[e("http://appname.appspot.com/"),a(s)]),e(" 之后的部分）与 url 后面的正则表达式相匹配。")]),A,n("p",null,[e("在这两种情况下，网络服务器现在都在运行，并监听 8080 端口的请求。通过在你的网络浏览器中访问以下 URL 来测试该应用程序："),n("a",G,[e("http://localhost:8080/"),a(s)])]),F,n("p",null,[e("当服务器被终止或尚未启动，而客户端请求网址 "),n("a",C,[e("http://localhost:8080/，浏览器在FireFox"),a(s)]),e(" 中会打印出这样的信息：")]),N,n("p",null,[e('现在试试：让 Web 服务器运行，然后编辑 helloworld2.go，将 "Hello, world!" 改为其他内容。重新加载 '),n("a",I,[e("http://localhost:8080/，就可以看到变化了：这和编写"),a(s)]),e(" Rails 或 Django 应用程序一样，都是动态运行的。")]),B,n("p",null,[e("通过配置一个外部工具，部署你的应用程序也很容易："),n("a",T,[e("http://code.google.com/p/goclipse/wiki/DeployingToGoogleAppEngineFromEclipse"),a(s)])]),O,n("ul",null,[n("li",null,[a(t,{to:"/the-way-to-go/directory.html"},{default:i(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节："),a(t,{to:"/the-way-to-go/20.3.html"},{default:i(()=>[e("安装 Go App Engine SDK")]),_:1})]),n("li",null,[e("下一节："),a(t,{to:"/the-way-to-go/20.5.html"},{default:i(()=>[e("使用用户服务和探索其 API")]),_:1})])])])}const S=p(c,[["render",q],["__file","20.4.html.vue"]]);export{S as default};
