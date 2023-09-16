import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as l,c as r,a as e,d as n,w as t,b as s}from"./app-9da01d16.js";const d={},c=e("h1",{id:"_6-5-小结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_6-5-小结","aria-hidden":"true"},"#"),s(" 6.5 小结")],-1),_=e("p",null,"这章我们学习了什么是session，什么是cookie，以及他们两者之间的关系。但是目前Go官方标准包里面不支持session，所以我们设计了一个session管理器，实现了session从创建到销毁的整个过程。然后定义了Provider的接口，使得可以支持各种后端的session存储，然后我们在第三小节里面介绍了如何使用内存存储来实现session的管理。第四小节我们讲解了session劫持的过程，以及我们如何有效的来防止session劫持。通过这一章的讲解，希望能够让读者了解整个sesison的执行原理以及如何实现，而且是如何更加安全的使用session。",-1),u=e("h2",{id:"links",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#links","aria-hidden":"true"},"#"),s(" links")],-1);function h(p,f){const o=a("RouterLink");return l(),r("div",null,[c,_,u,e("ul",null,[e("li",null,[n(o,{to:"/build-web-app/preface.html"},{default:t(()=>[s("目录")]),_:1})]),e("li",null,[s("上一节: "),n(o,{to:"/build-web-app/06.4.html"},{default:t(()=>[s("session存储")]),_:1})]),e("li",null,[s("下一章: "),n(o,{to:"/build-web-app/07.0.html"},{default:t(()=>[s("文本处理")]),_:1})])])])}const k=i(d,[["render",h],["__file","06.5.html.vue"]]);export{k as default};