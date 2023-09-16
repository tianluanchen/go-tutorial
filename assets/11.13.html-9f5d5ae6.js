import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as _,o as s,c as u,a as t,b as e,d as o,w as n}from"./app-9da01d16.js";const i={},r=t("h1",{id:"_11-13-总结-go-中的面向对象",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_11-13-总结-go-中的面向对象","aria-hidden":"true"},"#"),e(" 11.13 总结：Go 中的面向对象")],-1),c=t("p",null,"我们总结一下前面看到的：Go 没有类，而是松耦合的类型、方法对接口的实现。",-1),d=t("p",null,"OO 语言最重要的三个方面分别是：封装、继承和多态，在 Go 中它们是怎样表现的呢？",-1),h=t("p",null,[e("1）包范围内的：通过标识符首字母小写，"),t("em",null,"对象"),e("只在它所在的包内可见")],-1),m=t("p",null,[e("2）可导出的：通过标识符首字母大写，"),t("em",null,"对象"),e("对所在包以外也可见")],-1),f=t("p",null,"类型只拥有自己所在包中定义的方法。",-1),p=t("ul",null,[t("li",null,"继承：用组合实现：内嵌一个（或多个）包含想要的行为（字段和方法）的类型；多重继承可以通过内嵌多个类型实现"),t("li",null,"多态：用接口实现：某个类型的实例可以赋给它所实现的任意接口类型的变量。类型和接口是松耦合的，并且多重继承可以通过实现多个接口实现。Go 接口不是 Java 和 C# 接口的变体，而且接口间是不相关的，并且是大规模编程和可适应的演进型设计的关键。")],-1),x=t("h2",{id:"链接",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),e(" 链接")],-1);function g(w,y){const l=_("RouterLink");return s(),u("div",null,[r,c,d,t("ul",null,[t("li",null,[t("p",null,[e("封装（数据隐藏）：和别的 OO 语言有 4 个或更多的访问层次相比，Go 把它简化为了 2 层（参见 "),o(l,{to:"/the-way-to-go/04.2.html"},{default:n(()=>[e("4.2 节")]),_:1}),e("的可见性规则）:")]),h,m])]),f,p,x,t("ul",null,[t("li",null,[o(l,{to:"/the-way-to-go/directory.html"},{default:n(()=>[e("目录")]),_:1})]),t("li",null,[e("上一节："),o(l,{to:"/the-way-to-go/11.12.html"},{default:n(()=>[e("接口与动态类型")]),_:1})]),t("li",null,[e("下一节："),o(l,{to:"/the-way-to-go/11.14.html"},{default:n(()=>[e("结构体，集合和高阶函数")]),_:1})])])])}const v=a(i,[["render",g],["__file","11.13.html.vue"]]);export{v as default};