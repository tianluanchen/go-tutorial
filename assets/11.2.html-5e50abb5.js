import{_ as u}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as d,c as r,a as n,b as e,d as l,w as t,e as a}from"./app-9da01d16.js";const s={},m=n("h1",{id:"_11-2-使用gdb调试",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_11-2-使用gdb调试","aria-hidden":"true"},"#"),e(" 11.2 使用GDB调试")],-1),p=n("p",null,"开发程序过程中调试代码是开发者经常要做的一件事情，Go语言不像PHP、Python等动态语言，只要修改不需要编译就可以直接输出，而且可以动态的在运行环境下打印数据。当然Go语言也可以通过Println之类的打印数据来调试，但是每次都需要重新编译，这是一件相当麻烦的事情。我们知道在Python中有pdb/ipdb之类的工具调试，Javascript也有类似工具，这些工具都能够动态的显示变量信息，单步调试等。不过庆幸的是Go也有类似的工具支持：GDB。Go内部已经内置支持了GDB，所以，我们可以通过GDB来进行调试，那么本小节就来介绍一下如何通过GDB来调试Go程序。",-1),g={href:"https://github.com/derekparker/delve",target:"_blank",rel:"noopener noreferrer"},b=a('<h2 id="gdb调试简介" tabindex="-1"><a class="header-anchor" href="#gdb调试简介" aria-hidden="true">#</a> GDB调试简介</h2><p>GDB是FSF(自由软件基金会)发布的一个强大的类UNIX系统下的程序调试工具。使用GDB可以做如下事情：</p><ol><li>启动程序，可以按照开发者的自定义要求运行程序。</li><li>可让被调试的程序在开发者设定的调置的断点处停住。（断点可以是条件表达式）</li><li>当程序被停住时，可以检查此时程序中所发生的事。</li><li>动态的改变当前程序的执行环境。</li></ol><p>目前支持调试Go程序的GDB版本必须大于7.1。</p><p>编译Go程序的时候需要注意以下几点</p><ol><li>传递参数-ldflags &quot;-s&quot;，忽略debug的打印信息</li><li>传递-gcflags &quot;-N -l&quot; 参数，这样可以忽略Go内部做的一些优化，聚合变量和函数等优化，这样对于GDB调试来说非常困难，所以在编译的时候加入这两个参数避免这些优化。</li></ol><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><p>GDB的一些常用命令如下所示</p>',8),h=n("ul",null,[n("li",null,[n("p",null,"list"),n("p",null,[e("简写命令"),n("code",null,"l"),e("，用来显示源代码，默认显示十行代码，后面可以带上参数显示的具体行，例如："),n("code",null,"list 15"),e("，显示十行代码，其中第15行在显示的十行里面的中间，如下所示。")]),n("pre",null,[n("code",null,`  10	        time.Sleep(2 * time.Second)
  11	        c <- i
  12	    }
  13	    close(c)
  14	}
  15	
  16	func main() {
  17	    msg := "Starting main"
  18	    fmt.Println(msg)
  19	    bus := make(chan int)
`)])]),n("li",null,[n("p",null,"break"),n("p",null,[e("简写命令 "),n("code",null,"b"),e(",用来设置断点，后面跟上参数设置断点的行数，例如"),n("code",null,"b 10"),e("在第十行设置断点。")])]),n("li",null,[n("p",null,[e("delete"),n("br"),e(" 简写命令 "),n("code",null,"d"),e(",用来删除断点，后面跟上断点设置的序号，这个序号可以通过"),n("code",null,"info breakpoints"),e("获取相应的设置的断点序号，如下是显示的设置断点序号。")]),n("pre",null,[n("code",null,`  Num     Type           Disp Enb Address            What
  2       breakpoint     keep y   0x0000000000400dc3 in main.main at /home/xiemengjun/gdb.go:23
  breakpoint already hit 1 time
`)])]),n("li",null,[n("p",null,"backtrace"),n("p",null,[e("简写命令 "),n("code",null,"bt"),e(",用来打印执行的代码过程，如下所示：")]),n("pre",null,[n("code",null,`  #0  main.main () at /home/xiemengjun/gdb.go:23
  #1  0x000000000040d61e in runtime.main () at /home/xiemengjun/go/src/pkg/runtime/proc.c:244
  #2  0x000000000040d6c1 in schedunlock () at /home/xiemengjun/go/src/pkg/runtime/proc.c:267
  #3  0x0000000000000000 in ?? ()
`)])]),n("li",null,[n("p",null,"info"),n("p",null,"info命令用来显示信息，后面有几种参数，我们常用的有如下几种："),n("ul",null,[n("li",null,[n("p",null,[n("code",null,"info locals")]),n("p",null,"显示当前执行的程序中的变量值")]),n("li",null,[n("p",null,[n("code",null,"info breakpoints")]),n("p",null,"显示当前设置的断点列表")]),n("li",null,[n("p",null,[n("code",null,"info goroutines")]),n("p",null,"显示当前执行的goroutine列表，如下代码所示,带*的表示当前执行的"),n("pre",null,[n("code",null,`  * 1  running runtime.gosched
  * 2  syscall runtime.entersyscall
    3  waiting runtime.gosched
    4 runnable runtime.gosched
`)])])])]),n("li",null,[n("p",null,"print"),n("p",null,[e("简写命令"),n("code",null,"p"),e("，用来打印变量或者其他信息，后面跟上需要打印的变量名，当然还有一些很有用的函数"),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"l"),n("mi",null,"e"),n("mi",null,"n"),n("mo",{stretchy:"false"},"("),n("mo",{stretchy:"false"},")"),n("mtext",null,"和")]),n("annotation",{encoding:"application/x-tex"},"len()和")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),n("span",{class:"mord mathnormal",style:{"margin-right":"0.01968em"}},"l"),n("span",{class:"mord mathnormal"},"e"),n("span",{class:"mord mathnormal"},"n"),n("span",{class:"mopen"},"("),n("span",{class:"mclose"},")"),n("span",{class:"mord cjk_fallback"},"和")])])]),e("cap()，用来返回当前string、slices或者maps的长度和容量。")])]),n("li",null,[n("p",null,"whatis"),n("p",null,[e("用来显示当前变量的类型，后面跟上变量名，例如"),n("code",null,"whatis msg"),e(",显示如下：")]),n("pre",null,[n("code",null,`  type = struct string
`)])]),n("li",null,[n("p",null,"next"),n("p",null,[e("简写命令 "),n("code",null,"n"),e(",用来单步调试，跳到下一步，当有断点之后，可以输入"),n("code",null,"n"),e("跳转到下一步继续执行")])]),n("li",null,[n("p",null,"continue"),n("p",null,[e("简称命令 "),n("code",null,"c"),e("，用来跳出当前断点处，后面可以跟参数N，跳过多少次断点")])]),n("li",null,[n("p",null,"set variable"),n("p",null,[e("该命令用来改变运行过程中的变量值，格式如："),n("code",null,"set variable <var>=<value>")])])],-1),v=a(`<h2 id="调试过程" tabindex="-1"><a class="header-anchor" href="#调试过程" aria-hidden="true">#</a> 调试过程</h2><p>我们通过下面这个代码来演示如何通过GDB来调试Go程序，下面是将要演示的代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;time&quot;
)

func counting(c chan&lt;- int) {
	for i := 0; i &lt; 10; i++ {
		time.Sleep(2 * time.Second)
		c &lt;- i
	}
	close(c)
}

func main() {
	msg := &quot;Starting main&quot;
	fmt.Println(msg)
	bus := make(chan int)
	msg = &quot;starting a gofunc&quot;
	go counting(bus)
	for count := range bus {
		fmt.Println(&quot;count:&quot;, count)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译文件，生成可执行文件gdbfile:</p><pre><code>go build -gcflags &quot;-N -l&quot; gdbfile.go
</code></pre><p>通过gdb命令启动调试：</p><pre><code>gdb gdbfile
</code></pre><p>启动之后首先看看这个程序是不是可以运行起来，只要输入<code>run</code>命令回车后程序就开始运行，程序正常的话可以看到程序输出如下，和我们在命令行直接执行程序输出是一样的：</p><pre><code>(gdb) run
Starting program: /home/xiemengjun/gdbfile 
Starting main
count: 0
count: 1
count: 2
count: 3
count: 4
count: 5
count: 6
count: 7
count: 8
count: 9
[LWP 2771 exited]
[Inferior 1 (process 2771) exited normally]	
</code></pre><p>好了，现在我们已经知道怎么让程序跑起来了，接下来开始给代码设置断点：</p><pre><code>(gdb) b 23
Breakpoint 1 at 0x400d8d: file /home/xiemengjun/gdbfile.go, line 23.
(gdb) run
Starting program: /home/xiemengjun/gdbfile 
Starting main
[New LWP 3284]
[Switching to LWP 3284]

Breakpoint 1, main.main () at /home/xiemengjun/gdbfile.go:23
23	        fmt.Println(&quot;count:&quot;, count)
</code></pre><p>上面例子<code>b 23</code>表示在第23行设置了断点，之后输入<code>run</code>开始运行程序。现在程序在前面设置断点的地方停住了，我们需要查看断点相应上下文的源码，输入<code>list</code>就可以看到源码显示从当前停止行的前五行开始：</p><pre><code>(gdb) list
18	    fmt.Println(msg)
19	    bus := make(chan int)
20	    msg = &quot;starting a gofunc&quot;
21	    go counting(bus)
22	    for count := range bus {
23	        fmt.Println(&quot;count:&quot;, count)
24	    }
25	}
</code></pre><p>现在GDB在运行当前的程序的环境中已经保留了一些有用的调试信息，我们只需打印出相应的变量，查看相应变量的类型及值：</p><pre><code>(gdb) info locals
count = 0
bus = 0xf840001a50
(gdb) p count
$1 = 0
(gdb) p bus
$2 = (chan int) 0xf840001a50
(gdb) whatis bus
type = chan int
</code></pre><p>接下来该让程序继续往下执行，请继续看下面的命令</p><pre><code>(gdb) c
Continuing.
count: 0
[New LWP 3303]
[Switching to LWP 3303]

Breakpoint 1, main.main () at /home/xiemengjun/gdbfile.go:23
23 fmt.Println(&quot;count:&quot;, count)
(gdb) c
Continuing.
count: 1
[Switching to LWP 3302]

Breakpoint 1, main.main () at /home/xiemengjun/gdbfile.go:23
23 fmt.Println(&quot;count:&quot;, count)
</code></pre><p>每次输入<code>c</code>之后都会执行一次代码，又跳到下一次for循环，继续打印出来相应的信息。</p><p>设想目前需要改变上下文相关变量的信息，跳过一些过程，并继续执行下一步，得出修改后想要的结果：</p><pre><code>(gdb) info locals
count = 2
bus = 0xf840001a50
(gdb) set variable count=9
(gdb) info locals
count = 9
bus = 0xf840001a50
(gdb) c
Continuing.
count: 9
[Switching to LWP 3302]

Breakpoint 1, main.main () at /home/xiemengjun/gdbfile.go:23
23 fmt.Println(&quot;count:&quot;, count)		
</code></pre><p>最后稍微思考一下，前面整个程序运行的过程中到底创建了多少个goroutine，每个goroutine都在做什么：</p><pre><code>(gdb) info goroutines
* 1 running runtime.gosched
* 2 syscall runtime.entersyscall 
3 waiting runtime.gosched 
4 runnable runtime.gosched
(gdb) goroutine 1 bt
#0 0x000000000040e33b in runtime.gosched () at /home/xiemengjun/go/src/pkg/runtime/proc.c:927
#1 0x0000000000403091 in runtime.chanrecv (c=void, ep=void, selected=void, received=void)
at /home/xiemengjun/go/src/pkg/runtime/chan.c:327
#2 0x000000000040316f in runtime.chanrecv2 (t=void, c=void)
at /home/xiemengjun/go/src/pkg/runtime/chan.c:420
#3 0x0000000000400d6f in main.main () at /home/xiemengjun/gdbfile.go:22
#4 0x000000000040d0c7 in runtime.main () at /home/xiemengjun/go/src/pkg/runtime/proc.c:244
#5 0x000000000040d16a in schedunlock () at /home/xiemengjun/go/src/pkg/runtime/proc.c:267
#6 0x0000000000000000 in ?? ()
</code></pre><p>通过查看goroutines的命令我们可以清楚地了解goruntine内部是怎么执行的，每个函数的调用顺序已经明明白白地显示出来了。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>本小节我们介绍了GDB调试Go程序的一些基本命令，包括<code>run</code>、<code>print</code>、<code>info</code>、<code>set variable</code>、<code>coutinue</code>、<code>list</code>、<code>break</code> 等经常用到的调试命令，通过上面的例子演示，我相信读者已经对于通过GDB调试Go程序有了基本的理解，如果你想获取更多的调试技巧请参考官方网站的GDB调试手册，还有GDB官方网站的手册。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,26);function f(x,k){const c=o("ExternalLinkIcon"),i=o("RouterLink");return d(),r("div",null,[m,p,n("p",null,[e("另外建议纯go代码使用"),n("a",g,[e("delve"),l(c)]),e("可以很好的进行Go代码调试")]),b,h,v,n("ul",null,[n("li",null,[l(i,{to:"/build-web-app/preface.html"},{default:t(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节: "),l(i,{to:"/build-web-app/11.1.html"},{default:t(()=>[e("错误处理")]),_:1})]),n("li",null,[e("下一节: "),l(i,{to:"/build-web-app/11.3.html"},{default:t(()=>[e("Go怎么写测试用例")]),_:1})])])])}const q=u(s,[["render",f],["__file","11.2.html.vue"]]);export{q as default};
