import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as u,o as d,c as a,a as i,d as s,w as t,b as n,e as r}from"./app-9da01d16.js";const o={},v=r(`<h1 id="_7-6-字符串处理" tabindex="-1"><a class="header-anchor" href="#_7-6-字符串处理" aria-hidden="true">#</a> 7.6 字符串处理</h1><p>字符串在我们平常的Web开发中经常用到，包括用户的输入，数据库读取的数据等，我们经常需要对字符串进行分割、连接、转换等操作，本小节将通过Go标准库中的strings和strconv两个包中的函数来讲解如何进行有效快速的操作。</p><h2 id="字符串操作" tabindex="-1"><a class="header-anchor" href="#字符串操作" aria-hidden="true">#</a> 字符串操作</h2><p>下面这些函数来自于strings包，这里介绍一些我平常经常用到的函数，更详细的请参考官方的文档。</p><ul><li><p>func Contains(s, substr string) bool</p><p>字符串s中是否包含substr，返回bool值</p></li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
fmt.Println(strings.Contains(&quot;seafood&quot;, &quot;foo&quot;))
fmt.Println(strings.Contains(&quot;seafood&quot;, &quot;bar&quot;))
fmt.Println(strings.Contains(&quot;seafood&quot;, &quot;&quot;))
fmt.Println(strings.Contains(&quot;&quot;, &quot;&quot;))
//Output:
//true
//false
//true
//true

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>func Join(a []string, sep string) string</p><p>字符串链接，把slice a通过sep链接起来</p></li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
s := []string{&quot;foo&quot;, &quot;bar&quot;, &quot;baz&quot;}
fmt.Println(strings.Join(s, &quot;, &quot;))
//Output:foo, bar, baz		
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>func Index(s, sep string) int</p><p>在字符串s中查找sep所在的位置，返回位置值，找不到返回-1</p></li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
fmt.Println(strings.Index(&quot;chicken&quot;, &quot;ken&quot;))
fmt.Println(strings.Index(&quot;chicken&quot;, &quot;dmr&quot;))
//Output:4
//-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>func Repeat(s string, count int) string</p><p>重复s字符串count次，最后返回重复的字符串</p></li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
fmt.Println(&quot;ba&quot; + strings.Repeat(&quot;na&quot;, 2))
//Output:banana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>func Replace(s, old, new string, n int) string</p><p>在s字符串中，把old字符串替换为new字符串，n表示替换的次数，小于0表示全部替换</p></li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
fmt.Println(strings.Replace(&quot;oink oink oink&quot;, &quot;k&quot;, &quot;ky&quot;, 2))
fmt.Println(strings.Replace(&quot;oink oink oink&quot;, &quot;oink&quot;, &quot;moo&quot;, -1))
//Output:oinky oinky oink
//moo moo moo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>func Split(s, sep string) []string</p><p>把s字符串按照sep分割，返回slice</p></li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
fmt.Printf(&quot;%q\\n&quot;, strings.Split(&quot;a,b,c&quot;, &quot;,&quot;))
fmt.Printf(&quot;%q\\n&quot;, strings.Split(&quot;a man a plan a canal panama&quot;, &quot;a &quot;))
fmt.Printf(&quot;%q\\n&quot;, strings.Split(&quot; xyz &quot;, &quot;&quot;))
fmt.Printf(&quot;%q\\n&quot;, strings.Split(&quot;&quot;, &quot;Bernardo O&#39;Higgins&quot;))
//Output:[&quot;a&quot; &quot;b&quot; &quot;c&quot;]
//[&quot;&quot; &quot;man &quot; &quot;plan &quot; &quot;canal panama&quot;]
//[&quot; &quot; &quot;x&quot; &quot;y&quot; &quot;z&quot; &quot; &quot;]
//[&quot;&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>func Trim(s string, cutset string) string</p><p>在s字符串的头部和尾部去除cutset指定的字符串</p></li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
fmt.Printf(&quot;[%q]&quot;, strings.Trim(&quot; !!! Achtung !!! &quot;, &quot;! &quot;))
//Output:[&quot;Achtung&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>func Fields(s string) []string</p><p>去除s字符串的空格符，并且按照空格分割返回slice</p></li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
fmt.Printf(&quot;Fields are: %q&quot;, strings.Fields(&quot;  foo bar  baz   &quot;))
//Output:Fields are: [&quot;foo&quot; &quot;bar&quot; &quot;baz&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串转换" tabindex="-1"><a class="header-anchor" href="#字符串转换" aria-hidden="true">#</a> 字符串转换</h2><p>字符串转化的函数在strconv中，如下也只是列出一些常用的：</p><ul><li>Append 系列函数将整数等转换为字符串后，添加到现有的字节数组中。</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;strconv&quot;
)

func main() {
	str := make([]byte, 0, 100)
	str = strconv.AppendInt(str, 4567, 10)
	str = strconv.AppendBool(str, false)
	str = strconv.AppendQuote(str, &quot;abcdefg&quot;)
	str = strconv.AppendQuoteRune(str, &#39;单&#39;)
	fmt.Println(string(str))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Format 系列函数把其他类型的转换为字符串</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;strconv&quot;
)

func main() {
	a := strconv.FormatBool(false)
	b := strconv.FormatFloat(123.23, &#39;g&#39;, 12, 64)
	c := strconv.FormatInt(1234, 10)
	d := strconv.FormatUint(12345, 10)
	e := strconv.Itoa(1023)
	fmt.Println(a, b, c, d, e)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Parse 系列函数把字符串转换为其他类型</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;strconv&quot;
)
func checkError(e error){
	if e != nil{
		fmt.Println(e)
	}
}
func main() {
	a, err := strconv.ParseBool(&quot;false&quot;)
	checkError(err)
	b, err := strconv.ParseFloat(&quot;123.23&quot;, 64)
	checkError(err)
	c, err := strconv.ParseInt(&quot;1234&quot;, 10, 64)
	checkError(err)
	d, err := strconv.ParseUint(&quot;12345&quot;, 10, 64)
	checkError(err)
	e, err := strconv.Atoi(&quot;1023&quot;)
	checkError(err)
	fmt.Println(a, b, c, d, e)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,29);function c(m,b){const e=u("RouterLink");return d(),a("div",null,[v,i("ul",null,[i("li",null,[s(e,{to:"/build-web-app/preface.html"},{default:t(()=>[n("目录")]),_:1})]),i("li",null,[n("上一节: "),s(e,{to:"/build-web-app/07.5.html"},{default:t(()=>[n("文件操作")]),_:1})]),i("li",null,[n("下一节: "),s(e,{to:"/build-web-app/07.7.html"},{default:t(()=>[n("小结")]),_:1})])])])}const g=l(o,[["render",c],["__file","07.6.html.vue"]]);export{g as default};
