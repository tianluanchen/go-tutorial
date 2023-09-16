import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as d,a as n,b as e,d as s,w as l,e as r}from"./app-9da01d16.js";const u={},p=n("h1",{id:"_9-6-为自定义包使用-godoc",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_9-6-为自定义包使用-godoc","aria-hidden":"true"},"#"),e(" 9.6 为自定义包使用 godoc")],-1),v=n("code",null,"//",-1),m=n("p",null,"例如：",-1),k=n("a",{href:"examples/chapter_9/doc_example"},"doc_examples",-1),b=n("li",null,[n("p",null,"命令行下进入目录下并输入命令："),n("p",null,[n("code",null,'godoc -http=:6060 -goroot="."')])],-1),f=n("p",null,[e("（"),n("code",null,"."),e(" 是指当前目录，"),n("code",null,"-goroot"),e(" 参数可以是 "),n("code",null,"/path/to/my/package1"),e(" 这样的形式指出 "),n("code",null,"package1"),e(" 在你源码中的位置或接受用冒号形式分隔的路径，无根目录的路径为相对于当前目录的相对路径）")],-1),y={href:"http://localhost:6060",target:"_blank",rel:"noopener noreferrer"},_=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>doc_example:

doc_example | Packages | Commands | Specification
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是链接到源码和所有对象时有序概述（所以是很好的浏览和查找源代码的方式），连同文件/注释：</p><p><code>sort</code> 包</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> Float64sAreSorted

<span class="token keyword">type</span> IntArray

<span class="token keyword">func</span> IntsAreSortedfunc IsSortedfunc Sort

<span class="token keyword">func</span> <span class="token punctuation">(</span>IntArray<span class="token punctuation">)</span> Len

<span class="token keyword">func</span> SortFloat64s

<span class="token keyword">func</span> <span class="token punctuation">(</span>IntArray<span class="token punctuation">)</span> Less

<span class="token keyword">func</span> SortInts

<span class="token keyword">func</span> <span class="token punctuation">(</span>IntArray<span class="token punctuation">)</span> Swap

<span class="token keyword">func</span> SortStrings <span class="token keyword">type</span> Interface

<span class="token keyword">func</span> StringsAreSorted <span class="token keyword">type</span> StringArray <span class="token keyword">type</span> Float64Array

<span class="token keyword">func</span> <span class="token punctuation">(</span>StringArray<span class="token punctuation">)</span> Len

<span class="token keyword">func</span> <span class="token punctuation">(</span>Float64Array<span class="token punctuation">)</span> Len

<span class="token keyword">func</span> <span class="token punctuation">(</span>StringArray<span class="token punctuation">)</span> Less

<span class="token keyword">func</span> <span class="token punctuation">(</span>Float64Array<span class="token punctuation">)</span> Less

<span class="token keyword">func</span> <span class="token punctuation">(</span>StringArray<span class="token punctuation">)</span> Swap

<span class="token keyword">func</span> <span class="token punctuation">(</span>Float64Array<span class="token punctuation">)</span> Swap

<span class="token comment">// Other packages</span>
<span class="token keyword">import</span> <span class="token string">&quot;doc_example&quot;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用通用的接口排序:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func Float64sAreSorted[Top]
func Float64sAreSorted(a []float64) bool

func IntsAreSorted[Top]
func IntsAreSorted(a []int) bool

func IsSorted[Top]
func IsSorted(data Interface) bool
Test if data is sorted

func Sort[Top]
func Sort(data Interface)
General sort function

func SortInts[Top]
func SortInts(a []int)

Convenience wrappers for common cases: type IntArray[Top]
Convenience types for common cases: IntArray type IntArray []int  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你在一个团队中工作，并且源代码树被存储在网络硬盘上，就可以使用 godoc 给所有团队成员连续文档的支持。通过设置 <code>sync_minutes=n</code>，你甚至可以让它每 <code>n</code> 分钟自动更新您的文档！</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,8);function h(g,w){const a=t("RouterLink"),i=t("ExternalLinkIcon");return c(),d("div",null,[p,n("p",null,[e("godoc 工具（"),s(a,{to:"/the-way-to-go/03.6.html"},{default:l(()=>[e("第 3.6 节")]),_:1}),e("）在显示自定义包中的注释也有很好的效果：注释必须以 "),v,e(" 开始并无空行放在声明（包，类型，函数）前。godoc 会为每个文件生成一系列的网页。")]),m,n("ul",null,[n("li",null,[n("p",null,[e("在 "),k,e(" 目录下我们有"),s(a,{to:"/the-way-to-go/11.7.html"},{default:l(()=>[e("第 11.7 节")]),_:1}),e("中的用来排序的 go 文件，文件中有一些注释（文件需要未编译）")])]),b]),f,n("ul",null,[n("li",null,[e("在浏览器打开地址："),n("a",y,[e("http://localhost:6060"),s(i)])])]),n("p",null,[e("然后你会看到本地的 godoc 页面（详见"),s(a,{to:"/the-way-to-go/03.6.html"},{default:l(()=>[e("第 3.6 节")]),_:1}),e("）从左到右一次显示出目录中的包：")]),_,n("ul",null,[n("li",null,[s(a,{to:"/the-way-to-go/directory.html"},{default:l(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节："),s(a,{to:"/the-way-to-go/09.5.html"},{default:l(()=>[e("自定义包和可见性")]),_:1})]),n("li",null,[e("下一节："),s(a,{to:"/the-way-to-go/09.7.html"},{default:l(()=>[e("使用 go install 安装自定义包")]),_:1})])])])}const A=o(u,[["render",h],["__file","09.6.html.vue"]]);export{A as default};
