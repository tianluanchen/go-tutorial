import{_}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as h,c as s,a as e,b as o,d as t,w as a}from"./app-9da01d16.js";const c={},i=e("h1",{id:"_3-8-go-性能说明",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-8-go-性能说明","aria-hidden":"true"},"#"),o(" 3.8 Go 性能说明")],-1),u=e("p",null,[o("根据 Go 开发团队和基本的算法测试，Go 语言与 C 语言的性能差距大概在 10%~20% 之间（ "),e("strong",null,"译者注：由于出版时间限制，该数据应为 2013 年 3 月 28 日之前产生"),o(" ）。虽然没有官方的性能标准，但是与其它各个语言相比已经拥有非常出色的表现。")],-1),d=e("p",null,"如果说 Go 语言的执行效率大约比 C++ 慢 20% 也许更有实际意义。保守估计在相同的环境和执行目标的情况下，Go 程序比 Java 或 Scala 应用程序要快上 2 倍，并比这两门语言占用的内存降低了 70% 。在很多情况下这种比较是没有意义的，而像谷歌这样拥有成千上万台服务器的公司都抛弃 C++ 而开始将 Go 用于生产环境才足够说明它本身所具有的优势。",-1),p={href:"http://VB.NET",target:"_blank",rel:"noopener noreferrer"},f=e("p",null,"如果说 Go 比 C++ 要慢 20%，那么 Go 就要比任何非静态和编译型语言快 2 到 10 倍，并且能够更加高效地使用内存。",-1),G={href:"http://shootout.alioth.debian.org/",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"这里有一些评测结果：",-1),m=e("p",null,"比较 Go 和 Python 在简单的 web 服务器方面的性能，单位为传输量每秒：",-1),y={href:"http://web.py",target:"_blank",rel:"noopener noreferrer"},C={href:"http://web.py",target:"_blank",rel:"noopener noreferrer"},g={href:"http://web.py",target:"_blank",rel:"noopener noreferrer"},w=e("li",null,[e("p",null,"Go 和 Python 在一般开发的平均水平测试中，Go 要比 Python 3 快 25 倍左右，少占用三分之二的内存，但比 Python 大概多写一倍的代码（详见引用 27）。")],-1),k=e("li",null,[e("p",null,"根据 Robert Hundt（2011 年 6 月，详见引用 28）的文章对 C++、Java、Go 和 Scala，以及 Go 开发团队的反应（详见引用 29），可以得出以下结论："),e("ul",null,[e("li",null,"Go 和 Scala 之间具有更多的可比性（都使用更少的代码），而 C++ 和 Java 都使用非常冗长的代码。"),e("li",null,"Go 的编译速度要比绝大多数语言都要快，比 Java 和 C++ 快 5 至 6 倍，比 Scala 快 10 倍。"),e("li",null,"Go 的二进制文件体积是最大的（每个可执行文件都包含 runtime）。"),e("li",null,"在最理想的情况下，Go 能够和 C++ 一样快，比 Scala 快 2 至 3 倍，比 Java 快 5 至 10 倍。"),e("li",null,"Go 在内存管理方面也可以和 C++ 相媲美，几乎只需要 Scala 所使用的一半，是Java的五分之一左右。")])],-1),v=e("h2",{id:"链接",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),o(" 链接")],-1);function J(x,S){const n=r("ExternalLinkIcon"),l=r("RouterLink");return h(),s("div",null,[i,u,d,e("p",null,[o("时下流行的语言大都是运行在虚拟机上，如：Java 和 Scala 使用的 JVM，C# 和 "),e("a",p,[o("VB.NET"),t(n)]),o(" 使用的 .NET CLR。尽管虚拟机的性能已经有了很大的提升，但任何使用 JIT 编译器和脚本语言解释器的编程语言（Ruby、Python、Perl 和 JavaScript）在 C 和 C++ 的绝对优势下甚至都无法在性能上望其项背。")]),f,e("p",null,[o("其实比较多门语言之间的性能是一种非常猥琐的行为，因为任何一种语言都有其所擅长和薄弱的方面。例如在处理文本方面，那些只处理纯字节的语言显然要比处理 Unicode 这种更为复杂编码的语言要出色的多。有些人可能认为使用两种不同的语言实现同一个目标能够得出正确的结论，但是很多时候测试者可能对一门语言非常了解而对另一门语言只是大概明白，测试者对程序编写的手法在一定程度也会影响结果的公平性，因此测试程序应该分别由各自语言的擅长者来编写，这样才能得到具有可比性的结果。另外，像在统计学方面，人们很难避免人为因素对结果的影响，所以这在严格意义上并不是科学。还要注意的是，测试结果的可比性还要根据测试目标来区别，例如很多发展十多年的语言已经针对各类问题拥有非常成熟的类库，而作为一门新生语言的 Go 语言，并没有足够的时间来推导各类问题的最佳解决方案。如果你想获取更多有关性能的资料，请访问 "),e("a",G,[o("Computer Language Benchmark Game"),t(n)]),o("（详见引用 27）。")]),b,e("ul",null,[e("li",null,[m,e("p",null,[o("原生的 Go http 包要比 "),e("a",y,[o("web.py"),t(n)]),o(" 快 7 至 8 倍，如果使用 web.go 框架则稍微差点，比 "),e("a",C,[o("web.py"),t(n)]),o(" 快 6 至 7 倍。在 Python 中被广泛使用的 tornado 异步服务器和框架在 web 环境下要比 "),e("a",g,[o("web.py"),t(n)]),o(" 快很多，Go 大概只比它快 1.2 至 1.5 倍（详见引用 26）。")])]),w,k]),v,e("ul",null,[e("li",null,[t(l,{to:"/the-way-to-go/directory.html"},{default:a(()=>[o("目录")]),_:1})]),e("li",null,[o("上一节："),t(l,{to:"/the-way-to-go/03.7.html"},{default:a(()=>[o("其它工具")]),_:1})]),e("li",null,[o("下一节："),t(l,{to:"/the-way-to-go/03.9.html"},{default:a(()=>[o("与其它语言进行交互")]),_:1})])])])}const E=_(c,[["render",J],["__file","03.8.html.vue"]]);export{E as default};
