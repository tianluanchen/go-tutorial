import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as i,c as s,a as e,b as t,d as o,w as r}from"./app-9da01d16.js";const _={},u=e("h1",{id:"_2-7-go-运行时-runtime",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-7-go-运行时-runtime","aria-hidden":"true"},"#"),t(" 2.7 Go 运行时 (runtime)")],-1),h=e("code",null,"runtime",-1),d={href:"https://github.com/golang/go/tree/master/src/runtime",target:"_blank",rel:"noopener noreferrer"},m=e("code",null,"$GOROOT/src/runtime",-1),g=e("p",null,[e("strong",null,"垃圾回收器"),t(" Go 拥有简单却高效的标记-清除回收器。它的主要思想来源于 IBM 的可复用垃圾回收器，旨在打造一个高效、低延迟的并发回收器。目前 gccgo 还没有回收器，同时适用 gc 和 gccgo 的新回收器正在研发中。使用一门具有垃圾回收功能的编程语言不代表你可以避免内存分配所带来的问题，分配和回收内容都是消耗 CPU 资源的一种行为。")],-1),f=e("p",null,"Go 的可执行文件都比相对应的源代码文件要大很多，这恰恰说明了 Go 的 runtime 嵌入到了每一个可执行文件当中。当然，在部署到数量巨大的集群时，较大的文件体积也是比较头疼的问题。但总的来说，Go 的部署工作还是要比 Java 和 Python 轻松得多。因为 Go 不需要依赖任何其它文件，它只需要一个单独的静态文件，这样你也不会像使用其它语言一样在各种不同版本的依赖文件之间混淆。",-1),p=e("h2",{id:"链接",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),t(" 链接")],-1);function G(x,k){const n=l("RouterLink"),a=l("ExternalLinkIcon");return i(),s("div",null,[u,e("p",null,[t("尽管 Go 编译器产生的是本地可执行代码，这些代码仍旧运行在 Go 的 runtime（这部分的代码可以在 "),h,t(" 包中找到）当中。这个 runtime 类似 Java 和 .NET 语言所用到的虚拟机，它负责管理包括内存分配、垃圾回收（"),o(n,{to:"/the-way-to-go/10.8.html"},{default:r(()=>[t("第 10.8 节")]),_:1}),t("）、栈处理、goroutine、channel、切片 (slice)、map 和反射 (reflection) 等等。")]),e("p",null,[t("runtime 主要由 C 语言编写（Go 1.5 开始自举），并且是每个 Go 包的最顶级包。你可以在目录 "),e("a",d,[m,o(a)]),t(" 中找到相关内容。")]),g,f,p,e("ul",null,[e("li",null,[o(n,{to:"/the-way-to-go/directory.html"},{default:r(()=>[t("目录")]),_:1})]),e("li",null,[t("上一节："),o(n,{to:"/the-way-to-go/02.6.html"},{default:r(()=>[t("安装目录清单")]),_:1})]),e("li",null,[t("下一节："),o(n,{to:"/the-way-to-go/02.8.html"},{default:r(()=>[t("Go 解释器")]),_:1})])])])}const b=c(_,[["render",G],["__file","02.7.html.vue"]]);export{b as default};