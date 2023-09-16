import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as r,c as v,a as i,b as e,d,w as c,e as l}from"./app-9da01d16.js";const u="/go-tutorial/assets/2.2.basic-94576977.png?raw=true",t="/go-tutorial/assets/2.2.array-cc5d13d1.png?raw=true",m="/go-tutorial/assets/2.2.slice-99e8181f.png?raw=true",b="/go-tutorial/assets/2.2.slice2-4c596fef.png?raw=true",p="/go-tutorial/assets/2.2.makenew-82efb08f.png?raw=true",g={},h=l(`<h1 id="_2-2-go基础" tabindex="-1"><a class="header-anchor" href="#_2-2-go基础" aria-hidden="true">#</a> 2.2 Go基础</h1><p>这小节我们将要介绍如何定义变量、常量、Go内置类型以及Go程序设计中的一些技巧。</p><h2 id="定义变量" tabindex="-1"><a class="header-anchor" href="#定义变量" aria-hidden="true">#</a> 定义变量</h2><p>Go语言里面定义变量有多种方式。</p><p>使用<code>var</code>关键字是Go最基本的定义变量方式，与C语言不同的是Go把变量类型放在变量名后面：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//定义一个名称为“variableName”，类型为&quot;type&quot;的变量
var variableName type
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义多个变量</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//定义三个类型都是“type”的变量
var vname1, vname2, vname3 type
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义变量并初始化值</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//初始化“variableName”的变量为“value”值，类型是“type”
var variableName type = value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时初始化多个变量</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
/*
	定义三个类型都是&quot;type&quot;的变量,并且分别初始化为相应的值
	vname1为v1，vname2为v2，vname3为v3
*/
var vname1, vname2, vname3 type= v1, v2, v3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你是不是觉得上面这样的定义有点繁琐？没关系，因为Go语言的设计者也发现了，有一种写法可以让它变得简单一点。我们可以直接忽略类型声明，那么上面的代码变成这样了：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
/*
	定义三个变量，它们分别初始化为相应的值
	vname1为v1，vname2为v2，vname3为v3
	然后Go会根据其相应值的类型来帮你初始化它们
*/
var vname1, vname2, vname3 = v1, v2, v3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你觉得上面的还是有些繁琐？好吧，我也觉得。让我们继续简化：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
/*
	定义三个变量，它们分别初始化为相应的值
	vname1为v1，vname2为v2，vname3为v3
	编译器会根据初始化的值自动推导出相应的类型
*/
vname1, vname2, vname3 := v1, v2, v3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在是不是看上去非常简洁了？<code>:=</code>这个符号直接取代了<code>var</code>和<code>type</code>,这种形式叫做简短声明。不过它有一个限制，那就是它只能用在函数内部；在函数外部使用则会无法编译通过，所以一般用<code>var</code>方式来定义全局变量。</p><p><code>_</code>（下划线）是个特殊的变量名，任何赋予它的值都会被丢弃。在这个例子中，我们将值<code>35</code>赋予<code>b</code>，并同时丢弃<code>34</code>：</p><pre><code>_, b := 34, 35
</code></pre><p>Go对于已声明但未使用的变量会在编译阶段报错，比如下面的代码就会产生一个错误：声明了<code>i</code>但未使用。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

func main() {
	var i int
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h2><p>所谓常量，也就是在程序编译阶段就确定下来的值，而程序在运行时无法改变该值。在Go程序中，常量可定义为数值、布尔值或字符串等类型。</p><p>它的语法如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
const constantName = value
//如果需要，也可以明确指定常量的类型：
const Pi float32 = 3.1415926
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一些常量声明的例子：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
const Pi = 3.1415926
const i = 10000
const MaxThread = 10
const prefix = &quot;astaxie_&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),G=i("br",null,null,-1),f={href:"http://golang.org/ref/spec#Constants",target:"_blank",rel:"noopener noreferrer"},q=l(`<h2 id="内置基础类型" tabindex="-1"><a class="header-anchor" href="#内置基础类型" aria-hidden="true">#</a> 内置基础类型</h2><h3 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean" aria-hidden="true">#</a> Boolean</h3><p>在Go中，布尔值的类型为<code>bool</code>，值是<code>true</code>或<code>false</code>，默认为<code>false</code>。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//示例代码
var isActive bool  // 全局变量声明
var enabled, disabled = true, false  // 忽略类型的声明
func test() {
	var available bool  // 一般声明
	valid := false      // 简短声明
	available = true    // 赋值操作
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数值类型" tabindex="-1"><a class="header-anchor" href="#数值类型" aria-hidden="true">#</a> 数值类型</h3><p>整数类型有无符号和带符号两种。Go同时支持<code>int</code>和<code>uint</code>，这两种类型的长度相同，但具体长度取决于不同编译器的实现。Go里面也有直接定义好位数的类型：<code>rune</code>, <code>int8</code>, <code>int16</code>, <code>int32</code>, <code>int64</code>和<code>byte</code>, <code>uint8</code>, <code>uint16</code>, <code>uint32</code>, <code>uint64</code>。其中<code>rune</code>是<code>int32</code>的别称，<code>byte</code>是<code>uint8</code>的别称。</p><blockquote><p>需要注意的一点是，这些类型的变量之间不允许互相赋值或操作，不然会在编译时引起编译器报错。</p><p>如下的代码会产生错误：invalid operation: a + b (mismatched types int8 and int32)</p><blockquote><p>var a int8</p></blockquote></blockquote><blockquote><blockquote><p>var b int32</p></blockquote></blockquote><blockquote><blockquote><p>c:=a + b</p></blockquote><p>另外，尽管int的长度是32 bit, 但int 与 int32并不可以互用。</p></blockquote><p>浮点数的类型有<code>float32</code>和<code>float64</code>两种（没有<code>float</code>类型），默认是<code>float64</code>。</p><p>这就是全部吗？No！Go还支持复数。它的默认类型是<code>complex128</code>（64位实数+64位虚数）。如果需要小一些的，也有<code>complex64</code>(32位实数+32位虚数)。复数的形式为<code>RE + IMi</code>，其中<code>RE</code>是实数部分，<code>IM</code>是虚数部分，而最后的<code>i</code>是虚数单位。下面是一个使用复数的例子：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var c complex64 = 5+5i
//output: (5+5i)
fmt.Printf(&quot;Value is: %v&quot;, c)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h3><p>我们在上一节中讲过，Go中的字符串都是采用<code>UTF-8</code>字符集编码。字符串是用一对双引号（<code>&quot;&quot;</code>）或反引号（<code>\`</code> <code>\`</code>）括起来定义，它的类型是<code>string</code>。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//示例代码
var frenchHello string  // 声明变量为字符串的一般方法
var emptyString string = &quot;&quot;  // 声明了一个字符串变量，初始化为空字符串
func test() {
	no, yes, maybe := &quot;no&quot;, &quot;yes&quot;, &quot;maybe&quot;  // 简短声明，同时声明多个变量
	japaneseHello := &quot;Konichiwa&quot;  // 同上
	frenchHello = &quot;Bonjour&quot;  // 常规赋值
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Go中字符串是不可变的，例如下面的代码编译时会报错：cannot assign to s[0]</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var s string = &quot;hello&quot;
s[0] = &#39;c&#39;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但如果真的想要修改怎么办呢？下面的代码可以实现：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
s := &quot;hello&quot;
c := []byte(s)  // 将字符串 s 转换为 []byte 类型
c[0] = &#39;c&#39;
s2 := string(c)  // 再转换回 string 类型
fmt.Printf(&quot;%s\\n&quot;, s2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go中可以使用<code>+</code>操作符来连接两个字符串：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
s := &quot;hello,&quot;
m := &quot; world&quot;
a := s + m
fmt.Printf(&quot;%s\\n&quot;, a)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改字符串也可写为：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
s := &quot;hello&quot;
s = &quot;c&quot; + s[1:] // 字符串虽不能更改，但可进行切片操作
fmt.Printf(&quot;%s\\n&quot;, s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要声明一个多行的字符串怎么办？可以通过<code>\`</code>来声明：</p><pre><code>m := \`hello
	world\`
</code></pre><p><code>\`</code> 括起的字符串为Raw字符串，即字符串在代码中的形式就是打印时的形式，它没有字符转义，换行也将原样输出。例如本例中会输出：</p><pre><code>hello
	world
</code></pre><h3 id="错误类型" tabindex="-1"><a class="header-anchor" href="#错误类型" aria-hidden="true">#</a> 错误类型</h3><p>Go内置有一个<code>error</code>类型，专门用来处理错误信息，Go的<code>package</code>里面还专门有一个包<code>errors</code>来处理错误：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
err := errors.New(&quot;emit macho dwarf: elf header corrupted&quot;)
if err != nil {
	fmt.Print(err)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="go数据底层的存储" tabindex="-1"><a class="header-anchor" href="#go数据底层的存储" aria-hidden="true">#</a> Go数据底层的存储</h3>`,31),y={href:"http://research.swtch.com/",target:"_blank",rel:"noopener noreferrer"},x={href:"http://research.swtch.com/godata",target:"_blank",rel:"noopener noreferrer"},k=l('<figure><img src="'+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图2.1 Go数据格式的存储</p><h2 id="一些技巧" tabindex="-1"><a class="header-anchor" href="#一些技巧" aria-hidden="true">#</a> 一些技巧</h2><h3 id="分组声明" tabindex="-1"><a class="header-anchor" href="#分组声明" aria-hidden="true">#</a> 分组声明</h3><p>在Go语言中，同时声明多个常量、变量，或者导入多个包时，可采用分组的方式进行声明。</p><p>例如下面的代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
import &quot;fmt&quot;
import &quot;os&quot;

const i = 100
const pi = 3.1415
const prefix = &quot;Go_&quot;

var i int
var pi float32
var prefix string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以分组写成如下形式：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
import(
	&quot;fmt&quot;
	&quot;os&quot;
)

const(
	i = 100
	pi = 3.1415
	prefix = &quot;Go_&quot;
)

var(
	i int
	pi float32
	prefix string
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="iota枚举" tabindex="-1"><a class="header-anchor" href="#iota枚举" aria-hidden="true">#</a> iota枚举</h3><p>Go里面有一个关键字<code>iota</code>，这个关键字用来声明<code>enum</code>的时候采用，它默认开始值是0，const中每增加一行加1：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
)

const (
	x = iota // x == 0
	y = iota // y == 1
	z = iota // z == 2
	w        // 常量声明省略值时，默认和之前一个值的字面相同。这里隐式地说w = iota，因此w == 3。其实上面y和z可同样不用&quot;= iota&quot;
)

const v = iota // 每遇到一个const关键字，iota就会重置，此时v == 0

const (
	h, i, j = iota, iota, iota //h=0,i=0,j=0 iota在同一行值相同
)

const (
	a       = iota //a=0
	b       = &quot;B&quot;
	c       = iota             //c=2
	d, e, f = iota, iota, iota //d=3,e=3,f=3
	g       = iota             //g = 4
)

func main() {
	fmt.Println(a, b, c, d, e, f, g, h, i, j, x, y, z, w, v)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>除非被显式设置为其它值或<code>iota</code>，每个<code>const</code>分组的第一个常量被默认设置为它的0值，第二及后续的常量被默认设置为它前面那个常量的值，如果前面那个常量的值是<code>iota</code>，则它也被设置为<code>iota</code>。</p></blockquote><h3 id="go程序设计的一些规则" tabindex="-1"><a class="header-anchor" href="#go程序设计的一些规则" aria-hidden="true">#</a> Go程序设计的一些规则</h3><p>Go之所以会那么简洁，是因为它有一些默认的行为：</p><ul><li>大写字母开头的变量是可导出的，也就是其它包可以读取的，是公有变量；小写字母开头的就是不可导出的，是私有变量。</li><li>大写字母开头的函数也是一样，相当于<code>class</code>中的带<code>public</code>关键词的公有函数；小写字母开头的就是有<code>private</code>关键词的私有函数。</li></ul><h2 id="array、slice、map" tabindex="-1"><a class="header-anchor" href="#array、slice、map" aria-hidden="true">#</a> array、slice、map</h2><h3 id="array" tabindex="-1"><a class="header-anchor" href="#array" aria-hidden="true">#</a> array</h3><p><code>array</code>就是数组，它的定义方式如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var arr [n]type
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>[n]type</code>中，<code>n</code>表示数组的长度，<code>type</code>表示存储元素的类型。对数组的操作和其它语言类似，都是通过<code>[]</code>来进行读取或赋值：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var arr [10]int  // 声明了一个int类型的数组
arr[0] = 42      // 数组下标是从0开始的
arr[1] = 13      // 赋值操作
fmt.Printf(&quot;The first element is %d\\n&quot;, arr[0])  // 获取数据，返回42
fmt.Printf(&quot;The last element is %d\\n&quot;, arr[9]) //返回未赋值的最后一个元素，默认返回0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于长度也是数组类型的一部分，因此<code>[3]int</code>与<code>[4]int</code>是不同的类型，数组也就不能改变长度。数组之间的赋值是值的赋值，即当把一个数组作为参数传入函数的时候，传入的其实是该数组的副本，而不是它的指针。如果要使用指针，那么就需要用到后面介绍的<code>slice</code>类型了。</p><p>数组可以使用另一种<code>:=</code>来声明</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
a := [3]int{1, 2, 3} // 声明了一个长度为3的int数组

b := [10]int{1, 2, 3} // 声明了一个长度为10的int数组，其中前三个元素初始化为1、2、3，其它默认为0

c := [...]int{4, 5, 6} // 可以省略长度而采用\`...\`的方式，Go会自动根据元素个数来计算长度
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也许你会说，我想数组里面的值还是数组，能实现吗？当然咯，Go支持嵌套数组，即多维数组。比如下面的代码就声明了一个二维数组：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// 声明了一个二维数组，该数组以两个数组作为元素，其中每个数组中又有4个int类型的元素
doubleArray := [2][4]int{[4]int{1, 2, 3, 4}, [4]int{5, 6, 7, 8}}

// 上面的声明可以简化，直接忽略内部的类型
easyArray := [2][4]int{{1, 2, 3, 4}, {5, 6, 7, 8}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数组的分配如下所示：</p><figure><img src="`+t+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图2.2 多维数组的映射关系</p><h3 id="slice" tabindex="-1"><a class="header-anchor" href="#slice" aria-hidden="true">#</a> slice</h3><p>在很多应用场景中，数组并不能满足我们的需求。在初始定义数组时，我们并不知道需要多大的数组，因此我们就需要“动态数组”。在Go里面这种数据结构叫<code>slice</code></p><p><code>slice</code>并不是真正意义上的动态数组，而是一个引用类型。<code>slice</code>总是指向一个底层<code>array</code>，<code>slice</code>的声明也可以像<code>array</code>一样，只是不需要长度。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// 和声明array一样，只是少了长度
var fslice []int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们可以声明一个<code>slice</code>，并初始化数据，如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
slice := []byte {&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>slice</code>可以从一个数组或一个已经存在的<code>slice</code>中再次声明。<code>slice</code>通过<code>array[i:j]</code>来获取，其中<code>i</code>是数组的开始位置，<code>j</code>是结束位置，但不包含<code>array[j]</code>，它的长度是<code>j-i</code>。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// 声明一个含有10个元素元素类型为byte的数组
var ar = [10]byte {&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;, &#39;e&#39;, &#39;f&#39;, &#39;g&#39;, &#39;h&#39;, &#39;i&#39;, &#39;j&#39;}

// 声明两个含有byte的slice
var a, b []byte

// a指向数组的第3个元素开始，并到第五个元素结束，
a = ar[2:5]
//现在a含有的元素: ar[2]、ar[3]和ar[4]

// b是数组ar的另一个slice
b = ar[3:5]
// b的元素是：ar[3]和ar[4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意<code>slice</code>和数组在声明时的区别：声明数组时，方括号内写明了数组的长度或使用<code>...</code>自动计算长度，而声明<code>slice</code>时，方括号内没有任何字符。</p></blockquote><p>它们的数据结构如下所示</p><figure><img src="`+m+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图2.3 slice和array的对应关系图</p><p>slice有一些简便的操作</p><ul><li><code>slice</code>的默认开始位置是0，<code>ar[:n]</code>等价于<code>ar[0:n]</code></li><li><code>slice</code>的第二个序列默认是数组的长度，<code>ar[n:]</code>等价于<code>ar[n:len(ar)]</code></li><li>如果从一个数组里面直接获取<code>slice</code>，可以这样<code>ar[:]</code>，因为默认第一个序列是0，第二个是数组的长度，即等价于<code>ar[0:len(ar)]</code></li></ul><p>下面这个例子展示了更多关于<code>slice</code>的操作：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// 声明一个数组
var array = [10]byte{&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;, &#39;e&#39;, &#39;f&#39;, &#39;g&#39;, &#39;h&#39;, &#39;i&#39;, &#39;j&#39;}
// 声明两个slice
var aSlice, bSlice []byte

// 演示一些简便操作
aSlice = array[:3] // 等价于aSlice = array[0:3] aSlice包含元素: a,b,c
aSlice = array[5:] // 等价于aSlice = array[5:10] aSlice包含元素: f,g,h,i,j
aSlice = array[:]  // 等价于aSlice = array[0:10] 这样aSlice包含了全部的元素

// 从slice中获取slice
aSlice = array[3:7]  // aSlice包含元素: d,e,f,g，len=4，cap=7
bSlice = aSlice[1:3] // bSlice 包含aSlice[1], aSlice[2] 也就是含有: e,f
bSlice = aSlice[:3]  // bSlice 包含 aSlice[0], aSlice[1], aSlice[2] 也就是含有: d,e,f
bSlice = aSlice[0:5] // 对slice的slice可以在cap范围内扩展，此时bSlice包含：d,e,f,g,h
bSlice = aSlice[:]   // bSlice包含所有aSlice的元素: d,e,f,g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>slice</code>是引用类型，所以当引用改变其中元素的值时，其它的所有引用都会改变该值，例如上面的<code>aSlice</code>和<code>bSlice</code>，如果修改了<code>aSlice</code>中元素的值，那么<code>bSlice</code>相对应的值也会改变。</p><p>从概念上面来说<code>slice</code>像一个结构体，这个结构体包含了三个元素：</p><ul><li>一个指针，指向数组中<code>slice</code>指定的开始位置</li><li>长度，即<code>slice</code>的长度</li><li>最大长度，也就是<code>slice</code>开始位置到数组的最后位置的长度</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
	Array_a := [10]byte{&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;, &#39;e&#39;, &#39;f&#39;, &#39;g&#39;, &#39;h&#39;, &#39;i&#39;, &#39;j&#39;}
	Slice_a := Array_a[2:5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的真正存储结构如下图所示</p><figure><img src="`+b+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图2.4 slice对应数组的信息</p><p>对于<code>slice</code>有几个有用的内置函数：</p><ul><li><code>len</code> 获取<code>slice</code>的长度</li><li><code>cap</code> 获取<code>slice</code>的最大容量</li><li><code>append</code> 向<code>slice</code>里面追加一个或者多个元素，然后返回一个和<code>slice</code>一样类型的<code>slice</code></li><li><code>copy</code> 函数<code>copy</code>从源<code>slice</code>的<code>src</code>中复制元素到目标<code>dst</code>，并且返回复制的元素的个数</li></ul><p>注：<code>append</code>函数会改变<code>slice</code>所引用的数组的内容，从而影响到引用同一数组的其它<code>slice</code>。<br> 但当<code>slice</code>中没有剩余空间（即<code>(cap-len) == 0</code>）时，此时将动态分配新的数组空间。返回的<code>slice</code>数组指针将指向这个空间，而原数组的内容将保持不变；其它引用此数组的<code>slice</code>则不受影响。</p><p>从Go1.2开始slice支持了三个参数的slice，之前我们一直采用这种方式在slice或者array基础上来获取一个slice</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var array [10]int
slice := array[2:4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子里面slice的容量是8，新版本里面可以指定这个容量</p><pre><code>slice = array[2:4:7]
</code></pre><p>上面这个的容量就是<code>7-2</code>，即5。这样这个产生的新的slice就没办法访问最后的三个元素。</p><p>如果slice是这样的形式<code>array[:i:j]</code>，即第一个参数为空，默认值就是0。</p><h3 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> map</h3><p><code>map</code>也就是Python中字典的概念，它的格式为<code>map[keyType]valueType</code></p><p>我们看下面的代码，<code>map</code>的读取和设置也类似<code>slice</code>一样，通过<code>key</code>来操作，只是<code>slice</code>的<code>index</code>只能是｀int｀类型，而<code>map</code>多了很多类型，可以是<code>int</code>，可以是<code>string</code>及所有完全定义了<code>==</code>与<code>!=</code>操作的类型。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// 声明一个key是字符串，值为int的字典,这种方式的声明需要在使用之前使用make初始化
var numbers map[string]int
// 另一种map的声明方式
numbers = make(map[string]int)
numbers[&quot;one&quot;] = 1  //赋值
numbers[&quot;ten&quot;] = 10 //赋值
numbers[&quot;three&quot;] = 3

fmt.Println(&quot;第三个数字是: &quot;, numbers[&quot;three&quot;]) // 读取数据
// 打印出来如:第三个数字是: 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个<code>map</code>就像我们平常看到的表格一样，左边列是<code>key</code>，右边列是值</p><p>使用map过程中需要注意的几点：</p><ul><li><code>map</code>是无序的，每次打印出来的<code>map</code>都会不一样，它不能通过<code>index</code>获取，而必须通过<code>key</code>获取</li><li><code>map</code>的长度是不固定的，也就是和<code>slice</code>一样，也是一种引用类型</li><li>内置的<code>len</code>函数同样适用于<code>map</code>，返回<code>map</code>拥有的<code>key</code>的数量</li><li><code>map</code>的值可以很方便的修改，通过<code>numbers[&quot;one&quot;]=11</code>可以很容易的把key为<code>one</code>的字典值改为<code>11</code></li><li><code>map</code>和其他基本型别不同，它不是thread-safe，在多个go-routine存取时，必须使用mutex lock机制</li></ul><p><code>map</code>的初始化可以通过<code>key:val</code>的方式初始化值，同时<code>map</code>内置有判断是否存在<code>key</code>的方式</p><p>通过<code>delete</code>删除<code>map</code>的元素：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// 初始化一个字典
rating := map[string]float32{&quot;C&quot;:5, &quot;Go&quot;:4.5, &quot;Python&quot;:4.5, &quot;C++&quot;:2 }
// map有两个返回值，第二个返回值，如果不存在key，那么ok为false，如果存在ok为true
csharpRating, ok := rating[&quot;C#&quot;]
if ok {
	fmt.Println(&quot;C# is in the map and its rating is &quot;, csharpRating)
} else {
	fmt.Println(&quot;We have no rating associated with C# in the map&quot;)
}

delete(rating, &quot;C&quot;)  // 删除key为C的元素

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面说过了，<code>map</code>也是一种引用类型，如果两个<code>map</code>同时指向一个底层，那么一个改变，另一个也相应的改变：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
m := make(map[string]string)
m[&quot;Hello&quot;] = &quot;Bonjour&quot;
m1 := m
m1[&quot;Hello&quot;] = &quot;Salut&quot;  // 现在m[&quot;hello&quot;]的值已经是Salut了

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="make、new操作" tabindex="-1"><a class="header-anchor" href="#make、new操作" aria-hidden="true">#</a> make、new操作</h3><p><code>make</code>用于内建类型（<code>map</code>、<code>slice</code> 和<code>channel</code>）的内存分配。<code>new</code>用于各种类型的内存分配。</p><p>内建函数<code>new</code>本质上说跟其它语言中的同名函数功能一样：<code>new(T)</code>分配了零值填充的<code>T</code>类型的内存空间，并且返回其地址，即一个<code>*T</code>类型的值。用Go的术语说，它返回了一个指针，指向新分配的类型<code>T</code>的零值。有一点非常重要：</p><blockquote><p><code>new</code>返回指针。</p></blockquote><p>内建函数<code>make(T, args)</code>与<code>new(T)</code>有着不同的功能，make只能创建<code>slice</code>、<code>map</code>和<code>channel</code>，并且返回一个有初始值(非零)的<code>T</code>类型，而不是<code>*T</code>。本质来讲，导致这三个类型有所不同的原因是指向数据结构的引用在使用前必须被初始化。例如，一个<code>slice</code>，是一个包含指向数据（内部<code>array</code>）的指针、长度和容量的三项描述符；在这些项目被初始化之前，<code>slice</code>为<code>nil</code>。对于<code>slice</code>、<code>map</code>和<code>channel</code>来说，<code>make</code>初始化了内部的数据结构，填充适当的值。</p><blockquote><p><code>make</code>返回初始化后的（非零）值。</p></blockquote><p>下面这个图详细的解释了<code>new</code>和<code>make</code>之间的区别。</p><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图2.5 make和new对应底层的内存分配</p><h2 id="零值" tabindex="-1"><a class="header-anchor" href="#零值" aria-hidden="true">#</a> 零值</h2><p>关于“零值”，所指并非是空值，而是一种“变量未填充前”的默认值，通常为0。<br> 此处罗列 部分类型 的 “零值”</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
int     0
int8    0
int32   0
int64   0
uint    0x0
rune    0 //rune的实际类型是 int32
byte    0x0 // byte的实际类型是 uint8
float32 0 //长度为 4 byte
float64 0 //长度为 8 byte
bool    false
string  &quot;&quot;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,87);function _(S,w){const n=s("ExternalLinkIcon"),a=s("RouterLink");return r(),v("div",null,[h,i("p",null,[e("Go 常量和一般程序语言不同的是，可以指定相当多的小数位数(例如200位)，"),G,e(" 若指定給float32自动缩短为32bit，指定给float64自动缩短为64bit，详情参考"),i("a",f,[e("链接"),d(n)])]),q,i("p",null,[e("下面这张图来源于"),i("a",y,[e("Russ Cox Blog"),d(n)]),e("中一篇介绍"),i("a",x,[e("Go数据结构"),d(n)]),e("的文章，大家可以看到这些基础类型底层都是分配了一块内存，然后存储了相应的值。")]),k,i("ul",null,[i("li",null,[d(a,{to:"/build-web-app/preface.html"},{default:c(()=>[e("目录")]),_:1})]),i("li",null,[e("上一章: "),d(a,{to:"/build-web-app/02.1.html"},{default:c(()=>[e("你好,Go")]),_:1})]),i("li",null,[e("下一节: "),d(a,{to:"/build-web-app/02.3.html"},{default:c(()=>[e("流程和函数")]),_:1})])])])}const T=o(g,[["render",_],["__file","02.2.html.vue"]]);export{T as default};
