import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as a,c,a as i,b as e,d as n,w as s,e as r}from"./app-9da01d16.js";const v={},u=i("h1",{id:"_11-3-go怎么写测试用例",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_11-3-go怎么写测试用例","aria-hidden":"true"},"#"),e(" 11.3 Go怎么写测试用例")],-1),m=i("p",null,"开发程序其中很重要的一点是测试，我们如何保证代码的质量，如何保证每个函数是可运行，运行结果是正确的，又如何保证写出来的代码性能是好的，我们知道单元测试的重点在于发现程序设计或实现的逻辑错误，使问题及早暴露，便于问题的定位解决，而性能测试的重点在于发现程序设计上的一些问题，让线上的程序能够在高并发的情况下还能保持稳定。本小节将带着这一连串的问题来讲解Go语言中如何来实现单元测试和性能测试。",-1),b=i("p",null,[e("Go语言中自带有一个轻量级的测试框架"),i("code",null,"testing"),e("和自带的"),i("code",null,"go test"),e("命令来实现单元测试和性能测试，"),i("code",null,"testing"),e("框架和其他语言中的测试框架类似，你可以基于这个框架写针对相应函数的测试用例，也可以基于该框架写相应的压力测试用例，那么接下来让我们一一来看一下怎么写。")],-1),g={href:"https://github.com/cweill/gotests",target:"_blank",rel:"noopener noreferrer"},_=r(`<div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>go get -u -v github.com/cweill/gotests/...

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如何编写测试用例" tabindex="-1"><a class="header-anchor" href="#如何编写测试用例" aria-hidden="true">#</a> 如何编写测试用例</h2><p>由于<code>go test</code>命令只能在一个相应的目录下执行所有文件，所以我们接下来新建一个项目目录<code>gotest</code>,这样我们所有的代码和测试代码都在这个目录下。</p><p>接下来我们在该目录下面创建两个文件：gotest.go和gotest_test.go</p><ol><li>gotest.go:这个文件里面我们是创建了一个包，里面有一个函数实现了除法运算:</li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
	package gotest
	
	import (
		&quot;errors&quot;
	)
	
	func Division(a, b float64) (float64, error) {
		if b == 0 {
			return 0, errors.New(&quot;除数不能为0&quot;)
		}
	
		return a / b, nil
	}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>gotest_test.go:这是我们的单元测试文件，但是记住下面的这些原则：</p><ul><li>文件名必须是<code>_test.go</code>结尾的，这样在执行<code>go test</code>的时候才会执行到相应的代码</li><li>你必须import <code>testing</code>这个包</li><li>所有的测试用例函数必须是<code>Test</code>开头</li><li>测试用例会按照源代码中写的顺序依次执行</li><li>测试函数<code>TestXxx()</code>的参数是<code>testing.T</code>，我们可以使用该类型来记录错误或者是测试状态</li><li>测试格式：<code>func TestXxx (t *testing.T)</code>,<code>Xxx</code>部分可以为任意的字母数字的组合，但是首字母不能是小写字母[a-z]，例如<code>Testintdiv</code>是错误的函数名。</li><li>函数中通过调用<code>testing.T</code>的<code>Error</code>, <code>Errorf</code>, <code>FailNow</code>, <code>Fatal</code>, <code>FatalIf</code>方法，说明测试不通过，调用<code>Log</code>方法用来记录测试的信息。</li></ul><p>下面是我们的测试用例的代码：</p></li></ol><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
	package gotest
	
	import (
		&quot;testing&quot;
	)
	
	func Test_Division_1(t *testing.T) {
		if i, e := Division(6, 2); i != 3 || e != nil { //try a unit test on function
			t.Error(&quot;除法函数测试没通过&quot;) // 如果不是如预期的那么就报错
		} else {
			t.Log(&quot;第一个测试通过了&quot;) //记录一些你期望记录的信息
		}
	}
	
	func Test_Division_2(t *testing.T) {
		t.Error(&quot;就是不通过&quot;)
	}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>我们在项目目录下面执行\`go test\`,就会显示如下信息：

	--- FAIL: Test_Division_2 (0.00 seconds)
		gotest_test.go:16: 就是不通过
	FAIL
	exit status 1
	FAIL	gotest	0.013s
从这个结果显示测试没有通过，因为在第二个测试函数中我们写死了测试不通过的代码\`t.Error\`，那么我们的第一个函数执行的情况怎么样呢？默认情况下执行\`go test\`是不会显示测试通过的信息的，我们需要带上参数\`go test -v\`，这样就会显示如下信息：

	=== RUN Test_Division_1
	--- PASS: Test_Division_1 (0.00 seconds)
		gotest_test.go:11: 第一个测试通过了
	=== RUN Test_Division_2
	--- FAIL: Test_Division_2 (0.00 seconds)
		gotest_test.go:16: 就是不通过
	FAIL
	exit status 1
	FAIL	gotest	0.012s
上面的输出详细的展示了这个测试的过程，我们看到测试函数1\`Test_Division_1\`测试通过，而测试函数2\`Test_Division_2\`测试失败了，最后得出结论测试不通过。接下来我们把测试函数2修改成如下代码：
</code></pre><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
	func Test_Division_2(t *testing.T) {
		if _, e := Division(6, 0); e == nil { //try a unit test on function
			t.Error(&quot;Division did not work as expected.&quot;) // 如果不是如预期的那么就报错
		} else {
			t.Log(&quot;one test passed.&quot;, e) //记录一些你期望记录的信息
		}
	}	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>然后我们执行\`go test -v\`，就显示如下信息，测试通过了：

	=== RUN Test_Division_1
	--- PASS: Test_Division_1 (0.00 seconds)
		gotest_test.go:11: 第一个测试通过了
	=== RUN Test_Division_2
	--- PASS: Test_Division_2 (0.00 seconds)
		gotest_test.go:20: one test passed. 除数不能为0
	PASS
	ok  	gotest	0.013s
</code></pre><h2 id="如何编写压力测试" tabindex="-1"><a class="header-anchor" href="#如何编写压力测试" aria-hidden="true">#</a> 如何编写压力测试</h2><p>压力测试用来检测函数(方法）的性能，和编写单元功能测试的方法类似,此处不再赘述，但需要注意以下几点：</p><ul><li>压力测试用例必须遵循如下格式，其中XXX可以是任意字母数字的组合，但是首字母不能是小写字母</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>	func BenchmarkXXX(b *testing.B) { ... }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>go test</code>不会默认执行压力测试的函数，如果要执行压力测试需要带上参数<code>-test.bench</code>，语法:<code>-test.bench=&quot;test_name_regex&quot;</code>,例如<code>go test -test.bench=&quot;.*&quot;</code>表示测试全部的压力测试函数</li><li>在压力测试用例中,请记得在循环体内使用<code>testing.B.N</code>,以使测试可以正常的运行</li><li>文件名也必须以<code>_test.go</code>结尾</li></ul><p>下面我们新建一个压力测试文件webbench_test.go，代码如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package gotest

import (
	&quot;testing&quot;
)

func Benchmark_Division(b *testing.B) {
	for i := 0; i &lt; b.N; i++ { //use b.N for looping 
		Division(4, 5)
	}
}

func Benchmark_TimeConsumingFunction(b *testing.B) {
	b.StopTimer() //调用该函数停止压力测试的时间计数

	//做一些初始化的工作,例如读取文件数据,数据库连接之类的,
	//这样这些时间不影响我们测试函数本身的性能

	b.StartTimer() //重新开始时间
	for i := 0; i &lt; b.N; i++ {
		Division(4, 5)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们执行命令<code>go test webbench_test.go -test.bench=&quot;.*&quot;</code>，可以看到如下结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Benchmark_Division-4   	                     500000000	      7.76 ns/op	     456 B/op	      14 allocs/op
Benchmark_TimeConsumingFunction-4            500000000	      7.80 ns/op	     224 B/op	       4 allocs/op
PASS
ok  	gotest	9.364s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的结果显示我们没有执行任何<code>TestXXX</code>的单元测试函数，显示的结果只执行了压力测试函数，第一条显示了<code>Benchmark_Division</code>执行了500000000次，每次的执行平均时间是7.76纳秒，第二条显示了<code>Benchmark_TimeConsumingFunction</code>执行了500000000，每次的平均执行时间是7.80纳秒。最后一条显示总共的执行时间。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>通过上面对单元测试和压力测试的学习，我们可以看到<code>testing</code>包很轻量，编写单元测试和压力测试用例非常简单，配合内置的<code>go test</code>命令就可以非常方便的进行测试，这样在我们每次修改完代码,执行一下go test就可以简单的完成回归测试了。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,24);function p(h,f){const o=d("ExternalLinkIcon"),t=d("RouterLink");return a(),c("div",null,[u,m,b,i("p",null,[e("另外建议安装"),i("a",g,[e("gotests"),n(o)]),e("插件自动生成测试代码:")]),_,i("ul",null,[i("li",null,[n(t,{to:"/build-web-app/preface.html"},{default:s(()=>[e("目录")]),_:1})]),i("li",null,[e("上一节: "),n(t,{to:"/build-web-app/11.2.html"},{default:s(()=>[e("使用GDB调试")]),_:1})]),i("li",null,[e("下一节: "),n(t,{to:"/build-web-app/11.4.html"},{default:s(()=>[e("小结")]),_:1})])])])}const q=l(v,[["render",p],["__file","11.3.html.vue"]]);export{q as default};
