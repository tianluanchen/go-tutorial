import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as l,c as u,a as s,b as n,d as a,w as t,e as o}from"./app-9da01d16.js";const d={},r=o(`<h1 id="_9-8-自定义包的目录结构、go-install-和-go-test" tabindex="-1"><a class="header-anchor" href="#_9-8-自定义包的目录结构、go-install-和-go-test" aria-hidden="true">#</a> 9.8 自定义包的目录结构、go install 和 go test</h1><p>为了示范，我们创建了一个名为 <code>uc</code> 的简单包，它含有一个 <code>UpperCase</code> 函数将字符串的所有字母转换为大写。当然这并不值得创建一个自定义包，同样的功能已被包含在 <code>strings</code> 包里，但是同样的技巧也可以应用在更复杂的包中。</p><h2 id="_9-8-1-自定义包的目录结构" tabindex="-1"><a class="header-anchor" href="#_9-8-1-自定义包的目录结构" aria-hidden="true">#</a> 9.8.1 自定义包的目录结构</h2><p>下面的结构给了你一个好的示范（<code>uc</code> 代表通用包名, 名字为粗体的代表目录，斜体代表可执行文件）:</p><pre><code>/home/user/goprograms
	ucmain.go	(uc 包主程序)
	Makefile (ucmain 的 makefile)
	ucmain
	src/uc	 (包含 uc 包的 go 源码)
		uc.go
	 	uc_test.go
	 	Makefile (包的 makefile)
	 	uc.a
	 	_obj
			uc.a
		_test
			uc.a
	bin		(包含最终的执行文件)
		ucmain
	pkg/linux_amd64
		uc.a	(包的目标文件)
</code></pre>`,5),k=s("code",null,"GOPATH",-1),g=s("code",null,".profile",-1),m=s("code",null,".bashrc",-1),v=s("code",null,"export GOPATH=/home/user/goprograms",-1),b=s("code",null,"src",-1),h=s("code",null,"uc",-1),_=o(`<p>示例 9.6 <a href="examples/chapter_9/uc.go">uc.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> uc
<span class="token keyword">import</span> <span class="token string">&quot;strings&quot;</span>

<span class="token keyword">func</span> <span class="token function">UpperCase</span><span class="token punctuation">(</span>str <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),f=o(`<p>示例 9.7 <a href="examples/chapter_9/test.go">test.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> uc
<span class="token keyword">import</span> <span class="token string">&quot;testing&quot;</span>

<span class="token keyword">type</span> ucTest <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	in<span class="token punctuation">,</span> out <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> ucTests <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>ucTest <span class="token punctuation">{</span>
	ucTest<span class="token punctuation">{</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ABC&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	ucTest<span class="token punctuation">{</span><span class="token string">&quot;cvo-az&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CVO-AZ&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	ucTest<span class="token punctuation">{</span><span class="token string">&quot;Antwerp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ANTWERP&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestUC</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ut <span class="token operator">:=</span> <span class="token keyword">range</span> ucTests <span class="token punctuation">{</span>
		uc <span class="token operator">:=</span> <span class="token function">UpperCase</span><span class="token punctuation">(</span>ut<span class="token punctuation">.</span>in<span class="token punctuation">)</span>
		<span class="token keyword">if</span> uc <span class="token operator">!=</span> ut<span class="token punctuation">.</span>out <span class="token punctuation">{</span>
			t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;UpperCase(%s) = %s, must be %s&quot;</span><span class="token punctuation">,</span> ut<span class="token punctuation">.</span>in<span class="token punctuation">,</span> uc<span class="token punctuation">,</span>
			ut<span class="token punctuation">.</span>out<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过指令编译并安装包到本地：<code>go install uc</code>, 这会将 uc.a 复制到 pkg/linux_amd64 下面。</p><p>另外，使用 make ，通过以下内容创建一个包的 Makefile 在 src/uc 目录下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>include $(GOROOT)/src/Make.inc

TARG=uc
GOFILES=\\
		uc.go\\

include $(GOROOT)/src/Make.pkg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在该目录下的命令行调用: gomake</p><p>这将创建一个 _obj 目录并将包编译生成的存档 uc.a 放在该目录下。</p><p>这个包可以通过 go test 测试。</p><p>创建一个 uc.a 的测试文件在目录下，输出为 <code>PASS</code> 时测试通过。</p>`,9),x=s("p",null,"接下来我们创建主程序 ucmain.go:",-1),w={href:"/examples/chapter_9/ucmain.go",target:"_blank",rel:"noopener noreferrer"},G=o(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;./src/uc&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	str1 <span class="token operator">:=</span> <span class="token string">&quot;USING package uc!&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>uc<span class="token punctuation">.</span><span class="token function">UpperCase</span><span class="token punctuation">(</span>str1<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在这个目录下输入 <code>go install</code>。</p><p>另外复制 uc.a 到 /home/user/goprograms 目录并创建一个 Makefile 并写入文本：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>include $(GOROOT)/src/Make.inc
TARG=ucmain
GOFILES=\\
	ucmain.go\\

include $(GOROOT)/src/Make.cmd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 gomake 编译 <code>ucmain.go</code> 生成可执行文件 ucmain</p><p>运行 <code>./ucmain</code> 显示: <code>USING PACKAGE UC!</code>。</p><h2 id="_9-8-2-本地安装包" tabindex="-1"><a class="header-anchor" href="#_9-8-2-本地安装包" aria-hidden="true">#</a> 9.8.2 本地安装包</h2><p>本地包在用户目录下，使用给出的目录结构，以下命令用来从源码安装本地包：</p><pre><code>go install /home/user/goprograms/src/uc # 编译安装 uc
cd /home/user/goprograms/uc
go install ./uc 	# 编译安装 uc（和之前的指令一样）
cd ..
go install .	# 编译安装 ucmain
</code></pre><p>安装到 <code>$GOPATH</code> 下：</p><p>如果我们想安装的包在系统上的其他 Go 程序中被使用，它一定要安装到 <code>$GOPATH</code> 下。<br> 这样做，在 .profile 和 .bashrc 中设置 <code>export GOPATH=/home/user/goprograms</code>。</p><p>然后执行 <code>go install uc</code> 将会复制包存档到 <code>$GOPATH/pkg/LINUX_AMD64/uc</code>。</p><p>现在，uc 包可以通过 <code>import &quot;uc&quot;</code> 在任何 Go 程序中被引用。</p><h2 id="_9-8-3-依赖系统的代码" tabindex="-1"><a class="header-anchor" href="#_9-8-3-依赖系统的代码" aria-hidden="true">#</a> 9.8.3 依赖系统的代码</h2><p>在不同的操作系统上运行的程序以不同的代码实现是非常少见的：绝大多数情况下语言和标准库解决了大部分的可移植性问题。</p><p>你有一个很好的理由去写平台特定的代码，例如汇编语言。这种情况下，按照下面的约定是合理的：</p><pre><code>prog1.go
prog1_linux.go
prog1_darwin.go
prog1_windows.go
</code></pre><p>prog1.go 定义了不同操作系统通用的接口，并将系统特定的代码写到 prog1_os.go 中。<br> 对于 Go 工具你可以指定 <code>prog1_$GOOS.go</code> 或 <code>prog1_$GOARCH.go</code><br> 或在平台 Makefile 中：<code>prog1_$(GOOS).go\\</code> 或 <code>prog1_$(GOARCH).go\\</code>。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,19);function O(q,y){const e=c("RouterLink"),p=c("ExternalLinkIcon");return l(),u("div",null,[r,s("p",null,[n("将你的项目放在 goprograms 目录下(你可以创建一个环境变量 "),k,n("，详见第 "),a(e,{to:"/the-way-to-go/02.2.html"},{default:t(()=>[n("2.2")]),_:1}),n("/"),a(e,{to:"/the-way-to-go/02.3.html"},{default:t(()=>[n("3")]),_:1}),n(" 章节：在 "),g,n(" 和 "),m,n(" 文件中添加 "),v,n(")，而你的项目将作为 "),b,n(" 的子目录。"),h,n(" 包中的功能在 uc.go 中实现。")]),_,s("p",null,[n("包通常附带一个或多个测试文件，在这我们创建了一个 uc_test.go 文件，如"),a(e,{to:"/the-way-to-go/09.8.html"},{default:t(()=>[n("第 9.8 节")]),_:1}),n("所述。")]),f,s("p",null,[n("在"),a(e,{to:"/the-way-to-go/13.8.html"},{default:t(()=>[n("第 13.8 节")]),_:1}),n("我们将给出另外一个测试例子并进行深入研究。")]),s("p",null,[n("备注：有可能你当前的用户不具有足够的资格使用 go install（没有权限）。这种情况下，选择 root 用户 su。确保 Go 环境变量和 Go 源码路径也设置给 su，同样也适用你的普通用户（详见"),a(e,{to:"/the-way-to-go/02.3.html"},{default:t(()=>[n("第 2.3 节")]),_:1}),n("）。")]),x,s("p",null,[n("示例 9.8 "),s("a",w,[n("ucmain.go"),a(p)]),n("：")]),G,s("ul",null,[s("li",null,[a(e,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),a(e,{to:"/the-way-to-go/09.7.html"},{default:t(()=>[n("使用 go install 安装自定义包")]),_:1})]),s("li",null,[n("下一节："),a(e,{to:"/the-way-to-go/09.9.html"},{default:t(()=>[n("通过 Git 打包和安装")]),_:1})])])])}const C=i(d,[["render",O],["__file","09.8.html.vue"]]);export{C as default};
