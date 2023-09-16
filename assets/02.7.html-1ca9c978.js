import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as c,c as t,a as e,d as l,w as a,b as n,e as r}from"./app-9da01d16.js";const v={},u=r(`<h1 id="_2-7-并发" tabindex="-1"><a class="header-anchor" href="#_2-7-并发" aria-hidden="true">#</a> 2.7 并发</h1><p>有人把Go比作21世纪的C语言，第一是因为Go语言设计简单，第二，21世纪最重要的就是并行程序设计，而Go从语言层面就支持了并行。</p><h2 id="goroutine" tabindex="-1"><a class="header-anchor" href="#goroutine" aria-hidden="true">#</a> goroutine</h2><p>goroutine是Go并行设计的核心。goroutine说到底其实就是协程，但是它比线程更小，十几个goroutine可能体现在底层就是五六个线程，Go语言内部帮你实现了这些goroutine之间的内存共享。执行goroutine只需极少的栈内存(大概是4~5KB)，当然会根据相应的数据伸缩。也正因为如此，可同时运行成千上万个并发任务。goroutine比thread更易用、更高效、更轻便。</p><p>goroutine是通过Go的runtime管理的一个线程管理器。goroutine通过<code>go</code>关键字实现了，其实就是一个普通的函数。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
go hello(a, b, c)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过关键字go就启动了一个goroutine。我们来看一个例子</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;runtime&quot;
)

func say(s string) {
	for i := 0; i &lt; 5; i++ {
		runtime.Gosched()
		fmt.Println(s)
	}
}

func main() {
	go say(&quot;world&quot;) //开一个新的Goroutines执行
	say(&quot;hello&quot;) //当前Goroutines执行
}

// 以上程序执行后将输出：
// hello
// world
// hello
// world
// hello
// world
// hello
// world
// hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到go关键字很方便的就实现了并发编程。<br> 上面的多个goroutine运行在同一个进程里面，共享内存数据，不过设计上我们要遵循：不要通过共享来通信，而要通过通信来共享。</p><blockquote><p>runtime.Gosched()表示让CPU把时间片让给别人,下次某个时候继续恢复执行该goroutine。</p></blockquote><blockquote><p>默认情况下，在Go 1.5将标识并发系统线程个数的runtime.GOMAXPROCS的初始值由1改为了运行环境的CPU核数。</p></blockquote><p>但在Go 1.5以前调度器仅使用单线程，也就是说只实现了并发。想要发挥多核处理器的并行，需要在我们的程序中显式调用 runtime.GOMAXPROCS(n) 告诉调度器同时使用多个线程。GOMAXPROCS 设置了同时运行逻辑代码的系统线程的最大数量，并返回之前的设置。如果n &lt; 1，不会改变当前设置。</p><h2 id="channels" tabindex="-1"><a class="header-anchor" href="#channels" aria-hidden="true">#</a> channels</h2><p>goroutine运行在相同的地址空间，因此访问共享内存必须做好同步。那么goroutine之间如何进行数据的通信呢，Go提供了一个很好的通信机制channel。channel可以与Unix shell 中的双向管道做类比：可以通过它发送或者接收值。这些值只能是特定的类型：channel类型。定义一个channel时，也需要定义发送到channel的值的类型。注意，必须使用make 创建channel：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
ci := make(chan int)
cs := make(chan string)
cf := make(chan interface{})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>channel通过操作符<code>&lt;-</code>来接收和发送数据</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
ch &lt;- v    // 发送v到channel ch.
v := &lt;-ch  // 从ch中接收数据，并赋值给v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把这些应用到我们的例子中来：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

func sum(a []int, c chan int) {
	total := 0
	for _, v := range a {
		total += v
	}
	c &lt;- total  // send total to c
}

func main() {
	a := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(a[:len(a)/2], c)
	go sum(a[len(a)/2:], c)
	x, y := &lt;-c, &lt;-c  // receive from c

	fmt.Println(x, y, x + y)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，channel接收和发送数据都是阻塞的，除非另一端已经准备好，这样就使得Goroutines同步变的更加的简单，而不需要显式的lock。所谓阻塞，也就是如果读取（value := &lt;-ch）它将会被阻塞，直到有数据接收。其次，任何发送（ch&lt;-5）将会被阻塞，直到数据被读出。无缓冲channel是在多个goroutine之间同步很棒的工具。</p><h2 id="buffered-channels" tabindex="-1"><a class="header-anchor" href="#buffered-channels" aria-hidden="true">#</a> Buffered Channels</h2><p>上面我们介绍了默认的非缓存类型的channel，不过Go也允许指定channel的缓冲大小，很简单，就是channel可以存储多少元素。ch:= make(chan bool, 4)，创建了可以存储4个元素的bool 型channel。在这个channel 中，前4个元素可以无阻塞的写入。当写入第5个元素时，代码将会阻塞，直到其他goroutine从channel 中读取一些元素，腾出空间。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
ch := make(chan type, value)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当 value = 0 时，channel 是无缓冲阻塞读写的，当value &gt; 0 时，channel 有缓冲、是非阻塞的，直到写满 value 个元素才阻塞写入。</p><p>我们看一下下面这个例子，你可以在自己本机测试一下，修改相应的value值</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

func main() {
	c := make(chan int, 2)//修改2为1就报错，修改2为3可以正常运行
	c &lt;- 1
	c &lt;- 2
	fmt.Println(&lt;-c)
	fmt.Println(&lt;-c)
}
        //修改为1报如下的错误:
        //fatal error: all goroutines are asleep - deadlock!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="range和close" tabindex="-1"><a class="header-anchor" href="#range和close" aria-hidden="true">#</a> Range和Close</h2><p>上面这个例子中，我们需要读取两次c，这样不是很方便，Go考虑到了这一点，所以也可以通过range，像操作slice或者map一样操作缓存类型的channel，请看下面的例子</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
)

func fibonacci(n int, c chan int) {
	x, y := 1, 1
	for i := 0; i &lt; n; i++ {
		c &lt;- x
		x, y = y, x + y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>for i := range c</code>能够不断的读取channel里面的数据，直到该channel被显式的关闭。上面代码我们看到可以显式的关闭channel，生产者通过内置函数<code>close</code>关闭channel。关闭channel之后就无法再发送任何数据了，在消费方可以通过语法<code>v, ok := &lt;-ch</code>测试channel是否被关闭。如果ok返回false，那么说明channel已经没有任何数据并且已经被关闭。</p><blockquote><p>记住应该在生产者的地方关闭channel，而不是消费的地方去关闭它，这样容易引起panic</p></blockquote><blockquote><p>另外记住一点的就是channel不像文件之类的，不需要经常去关闭，只有当你确实没有任何发送数据了，或者你想显式的结束range循环之类的</p></blockquote><h2 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> Select</h2><p>我们上面介绍的都是只有一个channel的情况，那么如果存在多个channel的时候，我们该如何操作呢，Go里面提供了一个关键字<code>select</code>，通过<code>select</code>可以监听channel上的数据流动。</p><p><code>select</code>默认是阻塞的，只有当监听的channel中有发送或接收可以进行时才会运行，当多个channel都准备好的时候，select是随机的选择一个执行的。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

func fibonacci(c, quit chan int) {
	x, y := 1, 1
	for {
		select {
		case c &lt;- x:
			x, y = y, x + y
		case &lt;-quit:
			fmt.Println(&quot;quit&quot;)
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i &lt; 10; i++ {
			fmt.Println(&lt;-c)
		}
		quit &lt;- 0
	}()
	fibonacci(c, quit)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>select</code>里面还有default语法，<code>select</code>其实就是类似switch的功能，default就是当监听的channel都没有准备好的时候，默认执行的（select不再阻塞等待channel）。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
select {
case i := &lt;-c:
	// use i
default:
	// 当c阻塞的时候执行这里
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="超时" tabindex="-1"><a class="header-anchor" href="#超时" aria-hidden="true">#</a> 超时</h2><p>有时候会出现goroutine阻塞的情况，那么我们如何避免整个程序进入阻塞的情况呢？我们可以利用select来设置超时，通过如下的方式实现：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func main() {
	c := make(chan int)
	o := make(chan bool)
	go func() {
		for {
			select {
				case v := &lt;- c:
					println(v)
				case &lt;- time.After(5 * time.Second):
					println(&quot;timeout&quot;)
					o &lt;- true
					break
			}
		}
	}()
	&lt;- o
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="runtime-goroutine" tabindex="-1"><a class="header-anchor" href="#runtime-goroutine" aria-hidden="true">#</a> runtime goroutine</h2><p>runtime包中有几个处理goroutine的函数：</p><ul><li><p>Goexit</p><p>退出当前执行的goroutine，但是defer函数还会继续调用</p></li><li><p>Gosched</p><p>让出当前goroutine的执行权限，调度器安排其他等待的任务运行，并在下次某个时候从该位置恢复执行。</p></li><li><p>NumCPU</p><p>返回 CPU 核数量</p></li><li><p>NumGoroutine</p><p>返回正在执行和排队的任务总数</p></li><li><p>GOMAXPROCS</p><p>用来设置可以并行计算的CPU核数的最大值，并返回之前的值。</p></li></ul><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,45);function o(m,b){const i=s("RouterLink");return c(),t("div",null,[u,e("ul",null,[e("li",null,[l(i,{to:"/build-web-app/preface.html"},{default:a(()=>[n("目录")]),_:1})]),e("li",null,[n("上一章: "),l(i,{to:"/build-web-app/02.6.html"},{default:a(()=>[n("interface")]),_:1})]),e("li",null,[n("下一节: "),l(i,{to:"/build-web-app/02.8.html"},{default:a(()=>[n("总结")]),_:1})])])])}const g=d(v,[["render",o],["__file","02.7.html.vue"]]);export{g as default};
