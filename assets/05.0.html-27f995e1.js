import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as i,c as d,a as e,b as a,d as t,w as n,e as c}from"./app-9da01d16.js";const _="/go-tutorial/assets/navi5-fe6cdfbf.png?raw=true",h={},u=e("h1",{id:"_5-访问数据库",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_5-访问数据库","aria-hidden":"true"},"#"),a(" 5 访问数据库")],-1),p=e("p",null,"对许多Web应用程序而言，数据库都是其核心所在。数据库几乎可以用来存储你想查询和修改的任何信息，比如用户信息、产品目录或者新闻列表等。",-1),f=e("p",null,"Go没有内置的驱动支持任何的数据库，但是Go定义了database/sql接口，用户可以基于驱动接口开发相应数据库的驱动，5.1小节里面介绍Go设计的一些驱动，介绍Go是如何设计数据库驱动接口的。5.2至5.4小节介绍目前使用的比较多的一些关系型数据驱动以及如何使用，5.5小节介绍我自己开发一个ORM库，基于database/sql标准接口开发的，可以兼容几乎所有支持database/sql的数据库驱动，可以方便的使用Go style来进行数据库操作。",-1),b=e("p",null,"目前NOSQL已经成为Web开发的一个潮流，很多应用采用了NOSQL作为数据库，而不是以前的缓存，5.6小节将介绍MongoDB和Redis两种NOSQL数据库。",-1),m={href:"http://go-database-sql.org/",target:"_blank",rel:"noopener noreferrer"},g=c('<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>',3);function k(x,q){const s=l("ExternalLinkIcon"),o=l("RouterLink");return i(),d("div",null,[u,p,f,b,e("blockquote",null,[e("p",null,[e("a",m,[a("Go database/sql tutorial"),t(s)]),a(" 里提供了惯用的范例及详细的说明。")])]),g,e("ul",null,[e("li",null,[t(o,{to:"/build-web-app/preface.html"},{default:n(()=>[a("目录")]),_:1})]),e("li",null,[a("上一章: "),t(o,{to:"/build-web-app/04.6.html"},{default:n(()=>[a("第四章总结")]),_:1})]),e("li",null,[a("下一节: "),t(o,{to:"/build-web-app/05.1.html"},{default:n(()=>[a("database/sql接口")]),_:1})])])])}const w=r(h,[["render",k],["__file","05.0.html.vue"]]);export{w as default};
