import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as l,c,a,d as o,w as r,b as e,e as d}from"./app-9da01d16.js";const s="/go-tutorial/assets/navi4-44ae1c18.png?raw=true",p={},h=d(`<h1 id="_4-表单" tabindex="-1"><a class="header-anchor" href="#_4-表单" aria-hidden="true">#</a> 4 表单</h1><p>表单是我们平常编写Web应用常用的工具，通过表单我们可以方便的让客户端和服务器进行数据的交互。对于以前开发过Web的用户来说表单都非常熟悉，但是对于C/C++程序员来说，这可能是一个有些陌生的东西，那么什么是表单呢？</p><p>表单是一个包含表单元素的区域。表单元素（比如：文本域、下拉列表、单选框、复选框等等）是允许用户在表单中输入信息的元素。表单使用表单标签（&lt;form&gt;）定义。</p><pre><code>&lt;form&gt;
...
input 元素
...
&lt;/form&gt;
</code></pre><p>Go里面对于form处理已经有很方便的方法了，在Request里面有专门的form处理，可以很方便的整合到Web开发里面来，4.1小节里面将讲解Go如何处理表单的输入。由于不能信任任何用户的输入，所以我们需要对这些输入进行有效性验证，4.2小节将就如何进行一些普通的验证进行详细的演示。</p><p>HTTP协议是一种无状态的协议，那么如何才能辨别是否是同一个用户呢？同时又如何保证一个表单不出现多次递交的情况呢？4.3和4.4小节里面将对cookie(cookie是存储在客户端的信息，能够每次通过header和服务器进行交互的数据)等进行详细讲解。</p><p>表单还有一个很大的功能就是能够上传文件，那么Go是如何处理文件上传的呢？针对大文件上传我们如何有效的处理呢？4.5小节我们将一起学习Go处理文件上传的知识。</p><h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2><figure><img src="`+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>',10);function u(_,f){const t=i("RouterLink");return l(),c("div",null,[h,a("ul",null,[a("li",null,[o(t,{to:"/build-web-app/preface.html"},{default:r(()=>[e("目录")]),_:1})]),a("li",null,[e("上一章: "),o(t,{to:"/build-web-app/03.5.html"},{default:r(()=>[e("第三章总结")]),_:1})]),a("li",null,[e("下一节: "),o(t,{to:"/build-web-app/04.1.html"},{default:r(()=>[e("处理表单的输入")]),_:1})])])])}const g=n(p,[["render",u],["__file","04.0.html.vue"]]);export{g as default};
