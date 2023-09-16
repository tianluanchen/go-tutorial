import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as s,c as r,a as e,b as o,d as t,w as n,e as g}from"./app-9da01d16.js";const i={},p=e("h1",{id:"_9-7-使用-go-install-安装自定义包",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_9-7-使用-go-install-安装自定义包","aria-hidden":"true"},"#"),o(" 9.7 使用 go install 安装自定义包")],-1),_=e("p",null,"go install 是 Go 中自动包安装工具：如需要将包安装到本地它会从远端仓库下载包：检出、编译和安装一气呵成。",-1),h=e("p",null,"在包安装前的先决条件是要自动处理包自身依赖关系的安装。被依赖的包也会安装到子目录下，但是没有文档和示例：可以到网上浏览。",-1),u=e("code",null,"tideland",-1),m={href:"http://code.google.com/p/tideland-cgl",target:"_blank",rel:"noopener noreferrer"},f=g(`<p>因为我们需要创建目录在 Go 安装目录下，所以我们需要使用 root 或者 su 的身份执行命令。</p><p>确保 Go 环境变量已经设置在 root 用户下的 <code>./bashrc</code> 文件中。</p><p>使用命令安装：<code>go install tideland-cgl.googlecode.com/hg</code>。</p><p>可执行文件 <code>hg.a</code> 将被放到 <code>$GOROOT/pkg/linux_amd64/tideland-cgl.googlecode.com</code> 目录下，源码文件被放置在 <code>$GOROOT/src/tideland-cgl.googlecode.com/hg</code> 目录下，同样有个 <code>hg.a</code> 放置在 <code>_obj</code> 的子目录下。</p><p>现在就可以在 go 代码中使用这个包中的功能了，例如使用包名 cgl 导入：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> cgl <span class="token string">&quot;tideland-cgl.googlecode.com/hg&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从 Go1 起 go install 安装 Google Code 的导入路径形式是：<code>&quot;code.google.com/p/tideland-cgl&quot;</code></p><p>升级到新的版本：</p><p>更新到新版本的 Go 之后本地安装包的二进制文件将全被删除。如果你想更新，重编译、重安装所有的 go 安装包可以使用：<code>go install -a</code>。</p><p>go 的版本发布的很频繁，所以需要注意发布版本和包的兼容性。go1 之后都是自己编译自己了。</p>`,10),k={href:"http://golang.org/cmd/go/",target:"_blank",rel:"noopener noreferrer"},x=e("h2",{id:"链接",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),o(" 链接")],-1);function b(v,w){const l=d("RouterLink"),a=d("ExternalLinkIcon");return s(),r("div",null,[p,_,h,e("p",null,[o("go install 使用了 GOPATH 变量（详见"),t(l,{to:"/the-way-to-go/02.2.html"},{default:n(()=>[o("第 2.2 节")]),_:1}),o("）。")]),e("p",null,[o("远端包（详见"),t(l,{to:"/the-way-to-go/09.5.html"},{default:n(()=>[o("第 9.5 节")]),_:1}),o("）：")]),e("p",null,[o("假设我们要安装一个有趣的包 "),u,o("（它包含了许多帮助示例，参见"),e("a",m,[o("项目主页"),t(a)]),o("）。")]),f,e("p",null,[o("go install 同样可以使用 go install 编译链接并安装本地自己的包（详见"),t(l,{to:"/the-way-to-go/09.8.html"},{default:n(()=>[o("第 9.8.2 节")]),_:1}),o("）。")]),e("p",null,[o("更多信息可以在 "),e("a",k,[o("官方网站"),t(a)]),o(" 找到。")]),x,e("ul",null,[e("li",null,[t(l,{to:"/the-way-to-go/directory.html"},{default:n(()=>[o("目录")]),_:1})]),e("li",null,[o("上一节："),t(l,{to:"/the-way-to-go/09.6.html"},{default:n(()=>[o("为自定义包使用 godoc")]),_:1})]),e("li",null,[o("下一节："),t(l,{to:"/the-way-to-go/09.8.html"},{default:n(()=>[o("自定义包的目录结构、go install 和 go test")]),_:1})])])])}const O=c(i,[["render",b],["__file","09.7.html.vue"]]);export{O as default};
