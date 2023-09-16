import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as l,c,a,d as o,w as i,b as e,e as s}from"./app-9da01d16.js";const d="/go-tutorial/assets/navi8-1ef1436c.png?raw=true",p={},h=s('<h1 id="_8-web服务" tabindex="-1"><a class="header-anchor" href="#_8-web服务" aria-hidden="true">#</a> 8 Web服务</h1><p>Web服务可以让你在HTTP协议的基础上通过XML或者JSON来交换信息。如果你想知道上海的天气预报、中国石油的股价或者淘宝商家的一个商品信息，你可以编写一段简短的代码，通过抓取这些信息然后通过标准的接口开放出来，就如同你调用一个本地函数并返回一个值。</p><p>Web服务背后的关键在于平台的无关性，你可以运行你的服务在Linux系统，可以与其他Windows的asp.net程序交互，同样的，也可以通过同一个接口和运行在FreeBSD上面的JSP无障碍地通信。</p><p>目前主流的有如下几种Web服务：REST、SOAP。</p><p>REST请求是很直观的，因为REST是基于HTTP协议的一个补充，他的每一次请求都是一个HTTP请求，然后根据不同的method来处理不同的逻辑，很多Web开发者都熟悉HTTP协议，所以学习REST是一件比较容易的事情。所以我们在8.3小节将详细的讲解如何在Go语言中来实现REST方式。</p><p>SOAP是W3C在跨网络信息传递和远程计算机函数调用方面的一个标准。但是SOAP非常复杂，其完整的规范篇幅很长，而且内容仍然在增加。Go语言是以简单著称，所以我们不会介绍SOAP这样复杂的东西。而Go语言提供了一种天生性能很不错，开发起来很方便的RPC机制，我们将会在8.4小节详细介绍如何使用Go语言来实现RPC。</p><p>Go语言是21世纪的C语言，我们追求的是性能、简单，所以我们在8.1小节里面介绍如何使用Socket编程，很多游戏服务都是采用Socket来编写服务端，因为HTTP协议相对而言比较耗费性能，让我们看看Go语言如何来Socket编程。目前随着HTML5的发展，webSockets也逐渐的成为很多页游公司接下来开发的一些手段，我们将在8.2小节里面讲解Go语言如何编写webSockets的代码。</p><h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>',10);function u(_,b){const t=r("RouterLink");return l(),c("div",null,[h,a("ul",null,[a("li",null,[o(t,{to:"/build-web-app/preface.html"},{default:i(()=>[e("目录")]),_:1})]),a("li",null,[e("上一章: "),o(t,{to:"/build-web-app/07.7.html"},{default:i(()=>[e("第七章总结")]),_:1})]),a("li",null,[e("下一节: "),o(t,{to:"/build-web-app/08.1.html"},{default:i(()=>[e("Socket编程")]),_:1})])])])}const T=n(p,[["render",u],["__file","08.0.html.vue"]]);export{T as default};