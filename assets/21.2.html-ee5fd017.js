import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as i,c as s,a as e,b as o,d as t,w as n,e as p}from"./app-9da01d16.js";const _={},h=e("h1",{id:"_21-2-mroffice-一个使用-go-的呼叫中心网络电话-voip-系统",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_21-2-mroffice-一个使用-go-的呼叫中心网络电话-voip-系统","aria-hidden":"true"},"#"),o(" 21.2 MROffice：一个使用 Go 的呼叫中心网络电话 (VOIP) 系统")],-1),f={href:"http://mroffice.org/",target:"_blank",rel:"noopener noreferrer"},d=e("p",null,"这个例子表明，Go 也适用于简单、可靠的应用程序编程。",-1),u=e("p",null,"MROffice 是一家位于新西兰的公司，专门从事市场调查软件。他们在 Freeswitch 的基础上使用 Go 为市场调查的呼叫中心建立了一个电话解决方案。Kees Varekamp 是有市场研究软件的背景的一位开发人员，他发现该领域的大多数现有软件都很糟糕，于是在 2010 年推出了 MROffice，为市场研究行业提供更好的软件。",-1),m={href:"http://mroffice.org/telephony.html",target:"_blank",rel:"noopener noreferrer"},k=p("<p>Dialer 主要做什么？</p><ul><li>它把呼叫中心的面试官和受访者联系起来。</li><li>它在采访平台（提供脚本和收集统计数据）和 VoIP 拨号器（进行实际的电话通话）之间提供一座桥梁。</li></ul><p><u>为什么是 Go？</u></p><p>Dialer 的第一个版本是用 Python 写的，但他的经验是，Python 作为一种动态脚本语言，对于长期运行的服务器进程来说，也许不是一个好的选择：发生了很多运行时的错误，而这些错误本可以在编译时被发现。</p><p>正如 Varekamp 先生在悉尼 Go 用户组（2011 年 3 月）所说：</p><blockquote><p>“当 Go 出现的时候，我立刻就理解到了 (made sense to me)：类型安全，已编译，感觉像一种脚本语言。”</p></blockquote><p>所以他把 Python 代码移植到 Go 上。<em>Go 的并发模型</em>适合这个问题：一个 goroutine 被启动来处理每个呼叫、面试者和被面试者，他们都通过通道来进行通信。<code>http</code> 和 <code>websocket</code> 库使得编写一个用户管理界面变得容易。</p><p>该产品现在已经在多个呼叫中心运行，并且正在进行使用神经网络的预测拨号器设计。</p>",8);function g(G,x){const l=a("ExternalLinkIcon"),r=a("RouterLink");return i(),s("div",null,[h,e("p",null,[e("a",f,[o("http://mroffice.org/"),t(l)])]),d,u,e("p",null,[o("他的旗舰产品名为 "),e("a",m,[o("Dialer"),t(l)]),o("。")]),k,e("ul",null,[e("li",null,[t(r,{to:"/the-way-to-go/directory.html"},{default:n(()=>[o("目录")]),_:1})]),e("li",null,[o("上一节："),t(r,{to:"/the-way-to-go/21.1.html"},{default:n(()=>[o("Heroku：一个使用 Go 的高度可用一致数据存储")]),_:1})]),e("li",null,[o("下一节："),t(r,{to:"/the-way-to-go/21.3.html"},{default:n(()=>[o("Atlassian：一个虚拟机群管理系统")]),_:1})])])])}const b=c(_,[["render",g],["__file","21.2.html.vue"]]);export{b as default};
