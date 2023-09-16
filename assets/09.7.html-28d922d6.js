import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as r,c as i,a as e,d as l,w as o,b as t}from"./app-9da01d16.js";const d={},_=e("h1",{id:"_9-7-小结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_9-7-小结","aria-hidden":"true"},"#"),t(" 9.7 小结")],-1),c=e("p",null,"这一章主要介绍了如：CSRF攻击、XSS攻击、SQL注入攻击等一些Web应用中典型的攻击手法，它们都是由于应用对用户的输入没有很好的过滤引起的，所以除了介绍攻击的方法外，我们也介绍了了如何有效的进行数据过滤，以防止这些攻击的发生的方法。然后针对日异严重的密码泄漏事件，介绍了在设计Web应用中可采用的从基本到专家的加密方案。最后针对敏感数据的加解密简要介绍了，Go语言提供三种对称加密算法：base64、aes和des的实现。",-1),u=e("p",null,"编写这一章的目的是希望读者能够在意识里面加强安全概念，在编写Web应用的时候多留心一点，以使我们编写的Web应用能远离黑客们的攻击。Go语言在支持防攻击方面已经提供大量的工具包，我们可以充分的利用这些包来做出一个安全的Web应用。",-1),h=e("h2",{id:"links",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#links","aria-hidden":"true"},"#"),t(" links")],-1);function p(b,f){const a=s("RouterLink");return r(),i("div",null,[_,c,u,h,e("ul",null,[e("li",null,[l(a,{to:"/build-web-app/preface.html"},{default:o(()=>[t("目录")]),_:1})]),e("li",null,[t("上一节: "),l(a,{to:"/build-web-app/09.6.html"},{default:o(()=>[t("加密和解密数据")]),_:1})]),e("li",null,[t("下一节: "),l(a,{to:"/build-web-app/10.0.html"},{default:o(()=>[t("国际化和本地化")]),_:1})])])])}const x=n(d,[["render",p],["__file","09.7.html.vue"]]);export{x as default};