import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as d,c as u,a as e,b as n,d as o,w as s,e as t}from"./app-9da01d16.js";const c="/go-tutorial/assets/1.4.sublime1-c503a7da.png?raw=true",p="/go-tutorial/assets/1.4.sublime2-57e8b622.png?raw=true",m="/go-tutorial/assets/1.4.sublime3-3af53105.png?raw=true",g="/go-tutorial/assets/1.4.sublime4-b0ff9ae8.png?raw=true",h="/go-tutorial/assets/1.4.liteide-5dab2d51.png?raw=true",b="/go-tutorial/assets/1.4.vim-e0383c41.png?raw=true",f="/go-tutorial/assets/1.4.emacs-1f4238bd.png?raw=true",v="/go-tutorial/assets/1.4.eclipse1-2a07400e.png?raw=true",_="/go-tutorial/assets/1.4.eclipse2-129e608f.png?raw=true",G="/go-tutorial/assets/1.4.eclipse3-a3eb9a97.png?raw=true",q="/go-tutorial/assets/1.4.eclipse4-7fd6d534.png?raw=true",k="/go-tutorial/assets/1.4.eclipse5-46fe4794.png?raw=true",w="/go-tutorial/assets/1.4.eclipse6-1896ecaf.png?raw=true",x="/go-tutorial/assets/1.4.idea1-dafd1ac3.png?raw=true",O="/go-tutorial/assets/1.4.idea3-e8b49c9b.png?raw=true",y="/go-tutorial/assets/1.4.idea4-92ea0409.png?raw=true",A="/go-tutorial/assets/1.4.idea5-53dfefb1.png?raw=true",T={},P=e("h1",{id:"_1-4-go开发工具",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-4-go开发工具","aria-hidden":"true"},"#"),n(" 1.4 Go开发工具")],-1),S=e("p",null,"本节我将介绍几个开发工具，它们都具有自动化补全，自动化 fmt 和检查等功能。因为它们都是跨平台的，所以安装步骤之类的都是通用的。",-1),E=e("h2",{id:"visual-studio-code",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#visual-studio-code","aria-hidden":"true"},"#"),n(" Visual Studio Code")],-1),H=e("p",null,[n("Vscode 是微软基于 Electron 和 Web 技术构建的开源编辑器, 是一款非常强大的编辑器。"),e("br"),n(" 而且目前 vscode-go 已升级为 Go 官方维护的工具, 也是当前免费开源的首选开发工具.")],-1),I={href:"https://github.com/Microsoft/vscode",target:"_blank",rel:"noopener noreferrer"},C=e("p",null,"1、安装Visual Studio Code 最新版",-1),V={href:"https://code.visualstudio.com",target:"_blank",rel:"noopener noreferrer"},M=e("br",null,null,-1),R=t(`<p>2、安装 Go 插件</p><p>点击右边的 Extensions/扩展 图标<br> 搜索 <code>Go</code> 插件<br> 在插件列表中，选择 Go，进行安装，安装之后，系统会提示重启 Visual Studio Code。</p><p>写一个 Hello World ，然后运行:</p><p>hello.go</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>package main
 
import &quot;fmt&quot;
 
func main() {
    fmt.Printf(&quot;Hello word&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存的时候, vscode 右下角会提示，需要安装依赖包, 点击 Install All ( 建议提前设好代理, 参考 Go Module 章节 )<br> 另外建议使用 golint 或者 golangci-lint 等工具, 可以写出更优雅的代码; 也可以把自动保存功能开启, 开启方法为：选择菜单 File，点击 Auto save。</p><p>VSCode 代码设置可用于 Go 扩展。这些都可以在用户的喜好来设置或工作区设置（.vscode/settings.json）。</p><p>VSCode 还有一些高级配置, 打开首选项-用户设置, 一般可以通过图形界面设置<br> 也可以通过 settings.json 进行更多高级配置:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>    &quot;go.buildOnSave&quot;: &quot;package&quot;,  // &#39;workspace&#39;, &#39;package&#39;, or &#39;off&#39;.
    &quot;go.lintOnSave&quot;: &quot;workspace&quot;, // &#39;workspace&#39;, &#39;package&#39;, or &#39;off&#39;.
    &quot;go.vetOnSave&quot;: &quot;workspace&quot;,  // &#39;workspace&#39;, &#39;package&#39;, or &#39;off&#39;.
    &quot;go.buildFlags&quot;: [],
    &quot;go.lintFlags&quot;: [],
    &quot;go.vetFlags&quot;: [],
    &quot;go.coverOnSave&quot;: false,
    &quot;go.useCodeSnippetsOnFunctionSuggest&quot;: false,
    &quot;go.formatOnSave&quot;: true,
    // 
	&quot;go.formatTool&quot;: &quot;goimports&quot;, // goreturns
	&quot;go.lintTool&quot;: &quot;golangci-lint&quot;,
	&quot;go.useLanguageServer&quot;: true,
	// 
    &quot;go.goroot&quot;: &quot;&quot;, // 你的 Goroot, 可选配置
	&quot;go.gopath&quot;: &quot;&quot;, // 你的 Gopath, go1.12 之后改用 go-mod, 可选配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),L={href:"https://github.com/derekparker/delve",target:"_blank",rel:"noopener noreferrer"},D=t(`<div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
go get -v -u github.com/peterh/liner github.com/derekparker/delve/cmd/dlv

brew install go-delve/delve/delve (mac可选)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有问题再来一遍:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>go get -v -u github.com/peterh/liner github.com/derekparker/delve/cmd/dlv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意:修改&quot;dlv-cert&quot;证书, 选择&quot;显示简介&quot;-&gt;&quot;信任&quot;-&gt;&quot;代码签名&quot; 修改为: 始终信任</p><p>打开首选项-工作区设置,配置launch.json:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>{
    &quot;version&quot;: &quot;0.2.0&quot;,
    &quot;configurations&quot;: [
        {
            &quot;name&quot;: &quot;main.go&quot;,
            &quot;type&quot;: &quot;go&quot;,
            &quot;request&quot;: &quot;launch&quot;,
            &quot;mode&quot;: &quot;debug&quot;,
            &quot;remotePath&quot;: &quot;&quot;,
            &quot;port&quot;: 2345,
            &quot;host&quot;: &quot;127.0.0.1&quot;,
            &quot;program&quot;: &quot;\${workspaceRoot}&quot;, // 工作空间路径
            &quot;env&quot;: {},
            &quot;args&quot;: [],
            &quot;showLog&quot;: true
        }
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="goland" tabindex="-1"><a class="header-anchor" href="#goland" aria-hidden="true">#</a> GoLand</h2><p>GoLand 是 JetBrains 公司推出的 Go 语言集成开发环境，是 Idea Go 插件的强化版。GoLand 同样基于 IntelliJ 平台开发，支持 JetBrains 的插件体系。<br> 经过几年不断迭代更新, GoLand 目前已经是 Go 开发工具中最成熟的 IDE 之一, 而且配置相当简单.</p>`,8),B={href:"https://www.jetbrains.com/go/",target:"_blank",rel:"noopener noreferrer"},$=t('<h2 id="sublime-text" tabindex="-1"><a class="header-anchor" href="#sublime-text" aria-hidden="true">#</a> Sublime Text</h2><p>这里将介绍Sublime Text 3（以下简称Sublime）+ GoSublime + gocode的组合，那么为什么选择这个组合呢？</p><ul><li><p>自动化提示代码,如下图所示</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1.5 sublime自动化提示界面</p></li><li><p>保存的时候自动格式化代码，让您编写的代码更加美观，符合Go的标准。</p></li><li><p>支持项目管理</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1.6 sublime项目管理界面</p></li><li><p>支持语法高亮</p></li><li><p>Sublime Text 3可免费使用，只是保存次数达到一定数量之后就会提示是否购买，点击取消继续用，和正式注册版本没有任何区别。</p></li></ul>',3),z={href:"http://www.sublimetext.com/",target:"_blank",rel:"noopener noreferrer"},N={href:"http://blog.jobbole.com/88648/",target:"_blank",rel:"noopener noreferrer"},j={href:"http://blog.csdn.net/sam976/article/details/52076271",target:"_blank",rel:"noopener noreferrer"},W=t(`<ol><li>打开之后安装 Package Control：Ctrl+\` 打开命令行，执行如下代码：</li></ol><p>适用于 Sublime Text 3：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>import  urllib.request,os;pf=&#39;Package Control.sublime-package&#39;;ipp=sublime.installed_packages_path();urllib.request.install_opener(urllib.request.build_opener(urllib.request.ProxyHandler()));open(os.path.join(ipp,pf),&#39;wb&#39;).write(urllib.request.urlopen(&#39;http://sublime.wbond.net/&#39;+pf.replace(&#39; &#39;,&#39;%20&#39;)).read())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>适用于 Sublime Text 2：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>import  urllib2,os;pf=&#39;Package Control.sublime-package&#39;;ipp=sublime.installed_packages_path();os.makedirs(ipp)ifnotos.path.exists(ipp)elseNone;urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler()));open(os.path.join(ipp,pf),&#39;wb&#39;).write(urllib2.urlopen(&#39;http://sublime.wbond.net/&#39;+pf.replace(&#39; &#39;,&#39;%20&#39;)).read());print(&#39;Please restart Sublime Text to finish installation&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个时候重启一下Sublime，可以发现在在菜单栏多了一个如下的栏目，说明Package Control已经安装成功了。</p><figure><img src="`+m+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><pre><code>图1.7 sublime包管理
</code></pre><ol start="2"><li>安装完之后就可以安装Sublime的插件了。需安装GoSublime、SidebarEnhancements和Go Build，安装插件之后记得重启Sublime生效，Ctrl+Shift+p打开Package Controll 输入<code>pcip</code>（即“Package Control: Install Package”的缩写）。</li></ol><p>这个时候看左下角显示正在读取包数据，完成之后出现如下界面</p><figure><img src="`+g+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><pre><code>图1.8 sublime安装插件界面
</code></pre><p>这个时候输入GoSublime，按确定就开始安装了。同理应用于SidebarEnhancements和Go Build。</p>`,13),F={start:"3"},J={href:"https://github.com/nsf/gocode/",target:"_blank",rel:"noopener noreferrer"},K={href:"http://github.com/nsf/gocode",target:"_blank",rel:"noopener noreferrer"},X=t(`<pre><code>gocode 将会安装在默认\`$GOBIN\`
</code></pre><p>另外建议安装gotests(生成测试代码):</p><pre><code>先在sublime安装gotests插件,再运行:
</code></pre><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>go get -u -v github.com/cweill/gotests/...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>验证是否安装成功，你可以打开Sublime，打开main.go，看看语法是不是高亮了，输入<code>import</code>是不是自动化提示了，<code>import &quot;fmt&quot;</code>之后，输入<code>fmt.</code>是不是自动化提示有函数了。</li></ol><p>如果已经出现这个提示，那说明你已经安装完成了，并且完成了自动提示。</p><p>如果没有出现这样的提示，一般就是你的<code>$PATH</code>没有配置正确。你可以打开终端，输入gocode，是不是能够正确运行，如果不行就说明<code>$PATH</code>没有配置正确。<br> (针对XP)有时候在终端能运行成功,但sublime无提示或者编译解码错误,请安装sublime text3和convert utf8插件试一试</p><ol start="4"><li>MacOS下已经设置了$GOROOT, $GOPATH, $GOBIN，还是没有自动提示怎么办。</li></ol><p>请在sublime中使用command + 9， 然后输入env检查$PATH, GOROOT, $GOPATH, $GOBIN等变量， 如果没有请采用下面的方法。</p><p>首先建立下面的连接， 然后从Terminal中直接启动sublime</p><p>ln -s /Applications/Sublime\\ Text\\ 2.app/Contents/SharedSupport/bin/subl /usr/local/bin/sublime</p><h2 id="liteide" tabindex="-1"><a class="header-anchor" href="#liteide" aria-hidden="true">#</a> LiteIDE</h2><p>LiteIDE是一款专门为Go语言开发的跨平台轻量级集成开发环境（IDE），由visualfc编写。</p><figure><img src="`+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1.4 LiteIDE主界面</p><p><strong>LiteIDE主要特点：</strong></p><ul><li>支持主流操作系统 <ul><li>Windows</li><li>Linux</li><li>MacOS X</li></ul></li><li>Go编译环境管理和切换 <ul><li>管理和切换多个Go编译环境</li><li>支持Go语言交叉编译</li></ul></li><li>与Go标准一致的项目管理方式 <ul><li>基于GOPATH的包浏览器</li><li>基于GOPATH的编译系统</li><li>基于GOPATH的Api文档检索</li></ul></li><li>Go语言的编辑支持 <ul><li>类浏览器和大纲显示</li><li>Gocode(代码自动完成工具)的完美支持</li><li>Go语言文档查看和Api快速检索</li><li>代码表达式信息显示<code>F1</code></li><li>源代码定义跳转支持<code>F2</code></li><li>Gdb断点和调试支持</li><li>gofmt自动格式化支持</li></ul></li><li>其他特征 <ul><li>支持多国语言界面显示</li><li>完全插件体系结构</li><li>支持编辑器配色方案</li><li>基于Kate的语法显示支持</li><li>基于全文的单词自动完成</li><li>支持键盘快捷键绑定方案</li><li>Markdown文档编辑支持 <ul><li>实时预览和同步显示</li><li>自定义CSS显示</li><li>可导出HTML和PDF文档</li><li>批量转换/合并为HTML/PDF文档</li></ul></li></ul></li></ul><p><strong>LiteIDE安装配置</strong></p>',18),Y=e("p",null,"LiteIDE安装",-1),Q={href:"http://sourceforge.net/projects/liteide/files",target:"_blank",rel:"noopener noreferrer"},U={href:"https://github.com/visualfc/liteide",target:"_blank",rel:"noopener noreferrer"},Z=e("p",null,"首先安装好Go语言环境，然后根据操作系统下载LiteIDE对应的压缩文件直接解压即可使用。",-1),ee=t(`<li><p>编译环境设置</p><p>根据自身系统要求切换和配置LiteIDE当前使用的环境变量。</p><p>以Windows操作系统，64位Go语言为例，<br> 工具栏的环境配置中选择win64，点<code>编辑环境</code>，进入LiteIDE编辑win64.env文件</p><pre><code>  GOROOT=c:\\go
  GOBIN=
  GOARCH=amd64
  GOOS=windows
  CGO_ENABLED=1

  PATH=%GOBIN%;%GOROOT%\\bin;%PATH%
  。。。
</code></pre><p>将其中的<code>GOROOT=c:\\go</code>修改为当前Go安装路径，存盘即可，如果有MinGW64，可以将<code>c:\\MinGW64\\bin</code>加入PATH中以便go调用gcc支持CGO编译。</p><p>以Linux操作系统，64位Go语言为例，<br> 工具栏的环境配置中选择linux64，点<code>编辑环境</code>，进入LiteIDE编辑linux64.env文件</p><pre><code>  GOROOT=$HOME/go
  GOBIN=
  GOARCH=amd64
  GOOS=linux
  CGO_ENABLED=1

  PATH=$GOBIN:$GOROOT/bin:$PATH
  。。。
</code></pre><p>将其中的<code>GOROOT=$HOME/go</code>修改为当前Go安装路径，存盘即可。</p></li><li><p>GOPATH设置</p><p>Go语言的工具链使用GOPATH设置，是Go语言开发的项目路径列表，在命令行中输入(在LiteIDE中也可以<code>Ctrl+,</code>直接输入)<code>go help gopath</code>快速查看GOPATH文档。</p><p>在LiteIDE中可以方便的查看和设置GOPATH。通过<code>菜单－查看－GOPATH</code>设置，可以查看系统中已存在的GOPATH列表，<br> 同时可根据需要添加项目目录到自定义GOPATH列表中。</p></li>`,2),ne=e("h2",{id:"atom",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#atom","aria-hidden":"true"},"#"),n(" Atom")],-1),oe=e("p",null,"Atom 是 GitHub 基于 Electron 和 Web 技术构建的开源编辑器, 是一款很漂亮强大的编辑器, 缺点是速度比较慢。",-1),ie={href:"https://atom.io/",target:"_blank",rel:"noopener noreferrer"},te=t(`<p>然后安装 go-plus 插件:</p><pre><code>go-plus 是 Atom 上面的一款开源的 go 语言开发环境的的插件
</code></pre><p>它需要依赖下面的go语言工具:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>1.autocomplete-go ：gocode的代码自动提示
2.gofmt ：使用goftm,goimports,goturns
3.builder-go:go-install 和go-test,验证代码，给出建议
4.gometalinet-linter:goline,vet,gotype的检查
5.navigator-godef:godef
6.tester-goo :go test
7.gorename :rename

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Atom中的 Preference 中可以找到install菜单,输入 go-plus,然后点击安装(install)</p><p>就会开始安装 go-plus ， go-plus 插件会自动安装对应的依赖插件，如果没有安装对应的go的类库会自动运行: go get 安装。</p><h2 id="vim" tabindex="-1"><a class="header-anchor" href="#vim" aria-hidden="true">#</a> Vim</h2><p>Vim是从vi发展出来的一个文本编辑器, 代码补全、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。</p><p>vim-go是vim上面的一款开源的go语言使用最为广泛开发环境的的插件</p>`,9),le={href:"https://github.com/fatih/vim-go",target:"_blank",rel:"noopener noreferrer"},se={href:"https://github.com/tpope/vim-pathogen",target:"_blank",rel:"noopener noreferrer"},ae={href:"https://github.com/VundleVim/Vundle.vim",target:"_blank",rel:"noopener noreferrer"},re=e("br",null,null,-1),de=e("br",null,null,-1),ue=e("br",null,null,-1),ce=t(`<p>1.安装 Vundle</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ~/.vim/bundle
<span class="token function">git</span> clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),pe={href:"https://github.com/VundleVim/Vundle.vim",target:"_blank",rel:"noopener noreferrer"},me=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">set</span> nocompatible              <span class="token string">&quot; be iMproved, required
filetype off                  &quot;</span> required

<span class="token string">&quot; set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

&quot;</span> <span class="token builtin class-name">let</span> Vundle manage Vundle, required
Plugin <span class="token string">&#39;gmarik/Vundle.vim&#39;</span>

<span class="token string">&quot; All of your Plugins must be added before the following line
call vundle#end()            &quot;</span> required
filetype plugin indent on    &quot; required

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.安装Vim-go</p><p>修改~/.vimrc，在vundle#begin和vundle#end间增加一行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
Plugin <span class="token string">&#39;fatih/vim-go&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在Vim内执行: PluginInstall</p><p>3.安装YCM(Your Complete Me)进行自动补全<br> 在~/.vimrc中添加一行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
Plugin <span class="token string">&#39;Valloric/YouCompleteMe&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在Vim内执行: PluginInstall</p><figure><img src="`+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1.9 VIM编辑器自动化提示Go界面</p><p>接着我们继续配置vim:</p>',11),ge=e("li",null,[e("p",null,"配置vim高亮显示"),e("pre",null,[e("code",null,`cp -r $GOROOT/misc/vim/* ~/.vim/
`)])],-1),he=e("li",null,[e("p",null,"在~/.vimrc文件中增加语法高亮显示"),e("pre",null,[e("code",null,`filetype plugin indent on
syntax on
`)])],-1),be={href:"https://github.com/nsf/gocode/",target:"_blank",rel:"noopener noreferrer"},fe=e("pre",null,[e("code",null,`go get -u github.com/nsf/gocode
`)],-1),ve=e("p",null,[n("gocode默认安装到"),e("code",null,"$GOPATH/bin"),n("下面。")],-1),_e={href:"https://github.com/nsf/gocode/",target:"_blank",rel:"noopener noreferrer"},Ge=e("pre",null,[e("code",null,`~ cd $GOPATH/src/github.com/nsf/gocode/vim
~ ./update.bash
~ gocode set propose-builtins true
propose-builtins true
~ gocode set lib-path "/home/border/gocode/pkg/linux_amd64"
lib-path "/home/border/gocode/pkg/linux_amd64"
~ gocode set
propose-builtins true
lib-path "/home/border/gocode/pkg/linux_amd64"
`)],-1),qe=e("blockquote",null,[e("p",null,"gocode set里面的两个参数的含意说明："),e("p",null,"propose-builtins：是否自动提示Go的内置函数、类型和常量，默认为false，不提示。"),e("p",null,[n("lib-path:默认情况下，gocode只会搜索**"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mi",null,"G"),e("mi",null,"O"),e("mi",null,"P"),e("mi",null,"A"),e("mi",null,"T"),e("mi",null,"H"),e("mi",{mathvariant:"normal"},"/"),e("mi",null,"p"),e("mi",null,"k"),e("mi",null,"g"),e("mi",{mathvariant:"normal"},"/")]),e("annotation",{encoding:"application/x-tex"},"GOPATH/pkg/")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"GOP"),e("span",{class:"mord mathnormal"},"A"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.08125em"}},"H"),e("span",{class:"mord"},"/"),e("span",{class:"mord mathnormal"},"p"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.03148em"}},"k"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"g"),e("span",{class:"mord"},"/")])])]),n("GOOS_"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mi",null,"G"),e("mi",null,"O"),e("mi",null,"A"),e("mi",null,"R"),e("mi",null,"C"),e("mi",null,"H"),e("mo",null,"∗"),e("mo",null,"∗"),e("mtext",null,"和"),e("mo",null,"∗"),e("mo",null,"∗")]),e("annotation",{encoding:"application/x-tex"},"GOARCH** 和 **")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.6833em"}}),e("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"GO"),e("span",{class:"mord mathnormal"},"A"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.07153em"}},"RC"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.08125em"}},"H"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),e("span",{class:"mbin"},"∗"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.6833em"}}),e("span",{class:"mord"},"∗"),e("span",{class:"mord cjk_fallback"},"和"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),e("span",{class:"mbin"},"∗"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.4653em"}}),e("span",{class:"mord"},"∗")])])]),n("GOROOT/pkg/"),e("span",{class:"katex-error",title:"ParseError: KaTeX parse error: Expected group after '_' at position 5: GOOS_̲",style:{color:"#cc0000"}},"GOOS_"),n("GOARCH**目录下的包，当然这个设置就是可以设置我们额外的lib能访问的路径")])],-1),ke=e("li",null,[e("p",null,[n("恭喜你，安装完成，你现在可以使用"),e("code",null,":e main.go"),n("体验一下开发Go的乐趣。")])],-1),we={href:"http://www.cnblogs.com/witcxc/archive/2011/12/28/2304704.html",target:"_blank",rel:"noopener noreferrer"},xe=e("h2",{id:"emacs",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#emacs","aria-hidden":"true"},"#"),n(" Emacs")],-1),Oe=e("p",null,"Emacs传说中的神器，她不仅仅是一个编辑器，它是一个整合环境，或可称它为集成开发环境，这些功能如让使用者置身于全功能的操作系统中。",-1),ye=e("figure",null,[e("img",{src:f,alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),Ae=e("p",null,"图1.10 Emacs编辑Go主界面",-1),Te=e("li",null,[e("p",null,"配置Emacs高亮显示"),e("pre",null,[e("code",null,` cp $GOROOT/misc/emacs/* ~/.emacs.d/
`)])],-1),Pe={href:"https://github.com/nsf/gocode/",target:"_blank",rel:"noopener noreferrer"},Se=e("pre",null,[e("code",null,` go get -u github.com/nsf/gocode
`)],-1),Ee=e("p",null,[n("gocode默认安装到"),e("code",null,"$GOBIN"),n("里面下面。")],-1),He={href:"https://github.com/nsf/gocode/",target:"_blank",rel:"noopener noreferrer"},Ie=e("pre",null,[e("code",null,` ~ cd $GOPATH/src/github.com/nsf/gocode/emacs
 ~ cp go-autocomplete.el ~/.emacs.d/
 ~ gocode set propose-builtins true
 propose-builtins true
 ~ gocode set lib-path "/home/border/gocode/pkg/linux_amd64" // 换为你自己的路径
 lib-path "/home/border/gocode/pkg/linux_amd64"
 ~ gocode set
 propose-builtins true
 lib-path "/home/border/gocode/pkg/linux_amd64"
`)],-1),Ce={href:"http://www.emacswiki.org/emacs/AutoComplete",target:"_blank",rel:"noopener noreferrer"},Ve=e("p",null,"下载AutoComplete并解压",-1),Me=e("p",null,"~ make install DIR=$HOME/.emacs.d/auto-complete",-1),Re=e("p",null,"配置~/.emacs文件",-1),Le=e("pre",null,[e("code",null,` ;;auto-complete
 (require 'auto-complete-config)
 (add-to-list 'ac-dictionary-directories "~/.emacs.d/auto-complete/ac-dict")
 (ac-config-default)
 (local-set-key (kbd "M-/") 'semantic-complete-analyze-inline)
 (local-set-key "." 'semantic-complete-self-insert)
 (local-set-key ">" 'semantic-complete-self-insert)
`)],-1),De={href:"http://www.emacswiki.org/emacs/AutoComplete",target:"_blank",rel:"noopener noreferrer"},Be=e("li",null,[e("p",null,"配置.emacs"),e("pre",null,[e("code",null,` ;; golang mode
 (require 'go-mode-load)
 (require 'go-autocomplete)
 ;; speedbar
 ;; (speedbar 1)
 (speedbar-add-supported-extension ".go")
 (add-hook
 'go-mode-hook
 '(lambda ()
 	;; gocode
 	(auto-complete-mode 1)
 	(setq ac-sources '(ac-source-go))
 	;; Imenu & Speedbar
 	(setq imenu-generic-expression
 		'(("type" "^type *\\\\([^ \\t\\n\\r\\f]*\\\\)" 1)
 		("func" "^func *\\\\(.*\\\\) {" 1)))
 	(imenu-add-to-menubar "Index")
 	;; Outline mode
 	(make-local-variable 'outline-regexp)
 	(setq outline-regexp "//\\\\.\\\\|//[^\\r\\n\\f][^\\r\\n\\f]\\\\|pack\\\\|func\\\\|impo\\\\|cons\\\\|var.\\\\|type\\\\|\\t\\t*....")
 	(outline-minor-mode 1)
 	(local-set-key "\\M-a" 'outline-previous-visible-heading)
 	(local-set-key "\\M-e" 'outline-next-visible-heading)
 	;; Menu bar
 	(require 'easymenu)
 	(defconst go-hooked-menu
 		'("Go tools"
 		["Go run buffer" go t]
 		["Go reformat buffer" go-fmt-buffer t]
 		["Go check buffer" go-fix-buffer t]))
 	(easy-menu-define
 		go-added-menu
 		(current-local-map)
 		"Go tools"
 		go-hooked-menu)

 	;; Other
 	(setq show-trailing-whitespace t)
 	))
 ;; helper function
 (defun go ()
 	"run current buffer"
 	(interactive)
 	(compile (concat "go run " (buffer-file-name))))

 ;; helper function
 (defun go-fmt-buffer ()
 	"run gofmt on current buffer"
 	(interactive)
 	(if buffer-read-only
 	(progn
 		(ding)
 		(message "Buffer is read only"))
 	(let ((p (line-number-at-pos))
 	(filename (buffer-file-name))
 	(old-max-mini-window-height max-mini-window-height))
 		(show-all)
 		(if (get-buffer "*Go Reformat Errors*")
 	(progn
 		(delete-windows-on "*Go Reformat Errors*")
 		(kill-buffer "*Go Reformat Errors*")))
 		(setq max-mini-window-height 1)
 		(if (= 0 (shell-command-on-region (point-min) (point-max) "gofmt" "*Go Reformat Output*" nil "*Go Reformat Errors*" t))
 	(progn
 		(erase-buffer)
 		(insert-buffer-substring "*Go Reformat Output*")
 		(goto-char (point-min))
 		(forward-line (1- p)))
 	(with-current-buffer "*Go Reformat Errors*"
 	(progn
 		(goto-char (point-min))
 		(while (re-search-forward "<standard input>" nil t)
 		(replace-match filename))
 		(goto-char (point-min))
 		(compilation-mode))))
 		(setq max-mini-window-height old-max-mini-window-height)
 		(delete-windows-on "*Go Reformat Output*")
 		(kill-buffer "*Go Reformat Output*"))))
 ;; helper function
 (defun go-fix-buffer ()
 	"run gofix on current buffer"
 	(interactive)
 	(show-all)
 	(shell-command-on-region (point-min) (point-max) "go tool fix -diff"))
`)])],-1),$e=e("li",null,[e("p",null,[n("恭喜你，你现在可以体验在神器中开发Go的乐趣。默认speedbar是关闭的，如果打开需要把 ;; (speedbar 1) 前面的注释去掉，或者也可以通过 "),e("em",null,"M-x speedbar"),n(" 手动开启。")])],-1),ze=e("h2",{id:"eclipse",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#eclipse","aria-hidden":"true"},"#"),n(" Eclipse")],-1),Ne=e("p",null,"Eclipse也是非常常用的开发利器，以下介绍如何使用Eclipse来编写Go程序。",-1),je=e("figure",null,[e("img",{src:v,alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),We=e("p",null,"图1.11 Eclipse编辑Go的主界面",-1),Fe={href:"http://www.eclipse.org/",target:"_blank",rel:"noopener noreferrer"},Je={href:"https://code.google.com/p/goclipse/",target:"_blank",rel:"noopener noreferrer"},Ke={href:"http://code.google.com/p/goclipse/wiki/InstallationInstructions",target:"_blank",rel:"noopener noreferrer"},Xe=e("p",null,"下载gocode，用于go的代码补全提示",-1),Ye=e("p",null,"gocode的GitHub地址：",-1),Qe=e("pre",null,[e("code",null,` https://github.com/nsf/gocode
`)],-1),Ue={href:"https://code.google.com/p/msysgit/",target:"_blank",rel:"noopener noreferrer"},Ze=e("p",null,"再在cmd下安装：",-1),en=e("pre",null,[e("code",null,` go get -u github.com/nsf/gocode
`)],-1),nn=e("p",null,"也可以下载代码，直接用go build来编译，会生成gocode.exe",-1),on={href:"http://sourceforge.net/projects/mingw/files/MinGW/",target:"_blank",rel:"noopener noreferrer"},tn=e("li",null,[e("p",null,"配置插件"),e("p",null,"Windows->Reference->Go")],-1),ln=t('<p>(1).配置Go的编译器</p><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1.12 设置Go的一些基础信息</p><p>(2).配置Gocode（可选，代码补全），设置Gocode路径为之前生成的gocode.exe文件</p><figure><img src="'+G+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1.13 设置gocode信息</p><p>(3).配置GDB（可选，做调试用），设置GDB路径为MingW安装目录下的gdb.exe文件</p><figure><img src="'+q+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1.14 设置GDB信息</p><ol start="6"><li><p>测试是否成功</p><p>新建一个go工程，再建立一个hello.go。如下图：</p><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1.15 新建项目编辑文件</p><p>调试如下（要在console中用输入命令来调试）：</p><figure><img src="'+w+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1.16 调试Go程序</p></li></ol><h2 id="intellij-idea" tabindex="-1"><a class="header-anchor" href="#intellij-idea" aria-hidden="true">#</a> IntelliJ IDEA</h2><p>熟悉Java的读者应该对于idea不陌生，idea是通过一个插件来支持go语言的高亮语法,代码提示和重构实现。</p><ol><li><p>先下载idea，idea支持多平台：win,mac,linux，如果有钱就买个正式版，如果不行就使用社区免费版，对于只是开发Go语言来说免费版足够用了</p><figure><img src="'+x+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>安装Go插件，点击菜单File中的Setting，找到Plugins,点击,Broswer repo按钮。国内的用户可能会报错，自己解决哈。</p><figure><img src="'+O+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>这时候会看见很多插件，搜索找到Golang,双击,download and install。等到golang那一行后面出现Downloaded标志后,点OK。</p><figure><img src="'+y+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后点 Apply .这时候IDE会要求你重启。</p></li><li><p>重启完毕后,创建新项目会发现已经可以创建golang项目了：</p><figure><img src="'+A+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>下一步,会要求你输入 go sdk的位置,一般都安装在C:\\Go，linux和mac根据自己的安装目录设置，选中目录确定,就可以了。</p></li></ol><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>',14);function sn(an,rn){const i=a("ExternalLinkIcon"),l=a("RouterLink");return d(),u("div",null,[P,S,E,H,e("p",null,[n("开源地址: "),e("a",I,[n("https://github.com/Microsoft/vscode"),o(i)])]),C,e("p",null,[n("官方网站："),e("a",V,[n("https://code.visualstudio.com"),o(i)]),M,n(" 下载 Visual Studio Code 最新版，安装过程略。")]),R,e("p",null,[n("vscode 还有一项很强大的功能就是断点调试,结合 "),e("a",L,[n("delve"),o(i)]),n(" 可以很好的进行 Go 代码调试")]),D,e("p",null,[n("下载地址: "),e("a",B,[n("https://www.jetbrains.com/go/"),o(i)])]),$,e("p",null,[n("接下来就开始讲如何安装，下载 "),e("a",z,[n("Sublime"),o(i)])]),e("p",null,[n("根据自己相应的系统下载相应的版本，然后打开Sublime，对于不熟悉Sublime的同学可以先看一下这篇文章"),e("a",N,[n("Sublime Text 全程指南"),o(i)]),n("或者"),e("a",j,[n("sublime text3入门教程"),o(i)])]),W,e("ol",F,[e("li",null,[e("p",null,[n("安装 "),e("a",J,[n("gocode"),o(i)])]),e("p",null,[n("go get -u "),e("a",K,[n("github.com/nsf/gocode"),o(i)])])])]),X,e("ul",null,[e("li",null,[Y,e("ul",null,[e("li",null,[n("下载地址 "),e("a",Q,[n("http://sourceforge.net/projects/liteide/files"),o(i)])]),e("li",null,[n("源码地址 "),e("a",U,[n("https://github.com/visualfc/liteide"),o(i)])])]),Z]),ee]),ne,oe,e("p",null,[n("首先要先安装下 Atom，下载地址: "),e("a",ie,[n("https://atom.io/"),o(i)])]),te,e("p",null,[n("插件地址："),e("a",le,[n("github.com/fatih/vim-go"),o(i)])]),e("p",null,[n("vim的插件管理主要有"),e("a",se,[n("Pathogen"),o(i)]),n("与"),e("a",ae,[n("Vundle"),o(i)]),re,n(" ，但是其作用的方面不同。"),de,n(" pathogen是为了解决每一个插件安装后文件分散到多个目录不好管理而存在的。vundle是为了解决自动搜索及下载插件而存在的。"),ue,n(" 这两个插件可同时使用。")]),ce,e("p",null,[n("修改.vimrc，将Vundle的相关配置置在最开始处("),e("a",pe,[n("详细参考Vundle的介绍文档"),o(i)]),n(")")]),me,e("ol",null,[ge,he,e("li",null,[e("p",null,[n("安装"),e("a",be,[n("Gocode"),o(i)])]),fe,ve]),e("li",null,[e("p",null,[n("配置"),e("a",_e,[n("Gocode"),o(i)])]),Ge,qe]),ke]),e("p",null,[n("更多VIM 设定, 可参考"),e("a",we,[n("链接"),o(i)])]),xe,Oe,ye,Ae,e("ol",null,[Te,e("li",null,[e("p",null,[n("安装"),e("a",Pe,[n("Gocode"),o(i)])]),Se,Ee]),e("li",null,[e("p",null,[n("配置"),e("a",He,[n("Gocode"),o(i)])]),Ie]),e("li",null,[e("p",null,[n("需要安装 "),e("a",Ce,[n("Auto Completion"),o(i)])]),Ve,Me,Re,Le,e("p",null,[n("详细信息参考: "),e("a",De,[n("http://www.emacswiki.org/emacs/AutoComplete"),o(i)])])]),Be,$e]),ze,Ne,je,We,e("ol",null,[e("li",null,[e("p",null,[n("首先下载并安装好"),e("a",Fe,[n("Eclipse"),o(i)])])]),e("li",null,[e("p",null,[n("下载"),e("a",Je,[n("goclipse"),o(i)]),n("插件")]),e("p",null,[e("a",Ke,[n("http://code.google.com/p/goclipse/wiki/InstallationInstructions"),o(i)])])]),e("li",null,[Xe,Ye,Qe,e("p",null,[n("在windows下要安装git，通常用"),e("a",Ue,[n("msysgit"),o(i)])]),Ze,en,nn]),e("li",null,[e("p",null,[n("下载"),e("a",on,[n("MinGW"),o(i)]),n("并按要求装好")])]),tn]),ln,e("ul",null,[e("li",null,[o(l,{to:"/build-web-app/preface.html"},{default:s(()=>[n("目录")]),_:1})]),e("li",null,[n("上一节: "),o(l,{to:"/build-web-app/01.3.html"},{default:s(()=>[n("Go 命令")]),_:1})]),e("li",null,[n("下一节: "),o(l,{to:"/build-web-app/01.5.html"},{default:s(()=>[n("总结")]),_:1})])])])}const cn=r(T,[["render",sn],["__file","01.4.html.vue"]]);export{cn as default};
