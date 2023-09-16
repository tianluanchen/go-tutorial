import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as a,c as r,a as i,d as l,w as s,b as e,e as v}from"./app-9da01d16.js";const c="/go-tutorial/assets/2.5.rect_func_without_receiver-a042a08c.png?raw=true",u="/go-tutorial/assets/2.5.shapes_func_with_receiver_cp-c280de4c.png?raw=true",o={},m=v(`<h1 id="_2-5-面向对象" tabindex="-1"><a class="header-anchor" href="#_2-5-面向对象" aria-hidden="true">#</a> 2.5 面向对象</h1><p>前面两章我们介绍了函数和struct，那你是否想过函数当作struct的字段一样来处理呢？今天我们就讲解一下函数的另一种形态，带有接收者的函数，我们称为<code>method</code></p><h2 id="method" tabindex="-1"><a class="header-anchor" href="#method" aria-hidden="true">#</a> method</h2><p>现在假设有这么一个场景，你定义了一个struct叫做长方形，你现在想要计算他的面积，那么按照我们一般的思路应该会用下面的方式来实现</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

type Rectangle struct {
	width, height float64
}

func area(r Rectangle) float64 {
	return r.width*r.height
}

func main() {
	r1 := Rectangle{12, 2}
	r2 := Rectangle{9, 4}
	fmt.Println(&quot;Area of r1 is: &quot;, area(r1))
	fmt.Println(&quot;Area of r2 is: &quot;, area(r2))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码可以计算出来长方形的面积，但是area()不是作为Rectangle的方法实现的（类似面向对象里面的方法），而是将Rectangle的对象（如r1,r2）作为参数传入函数计算面积的。</p><p>这样实现当然没有问题咯，但是当需要增加圆形、正方形、五边形甚至其它多边形的时候，你想计算他们的面积的时候怎么办啊？那就只能增加新的函数咯，但是函数名你就必须要跟着换了，变成<code>area_rectangle, area_circle, area_triangle...</code></p><p>像下图所表示的那样， 椭圆代表函数, 而这些函数并不从属于struct(或者以面向对象的术语来说，并不属于class)，他们是单独存在于struct外围，而非在概念上属于某个struct的。</p><figure><img src="`+c+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图2.8 方法和struct的关系图</p><p>很显然，这样的实现并不优雅，并且从概念上来说&quot;面积&quot;是&quot;形状&quot;的一个属性，它是属于这个特定的形状的，就像长方形的长和宽一样。</p><p>基于上面的原因所以就有了<code>method</code>的概念，<code>method</code>是附属在一个给定的类型上的，他的语法和函数的声明语法几乎一样，只是在<code>func</code>后面增加了一个receiver(也就是method所依从的主体)。</p><p>用上面提到的形状的例子来说，method <code>area()</code> 是依赖于某个形状(比如说Rectangle)来发生作用的。Rectangle.area()的发出者是Rectangle， area()是属于Rectangle的方法，而非一个外围函数。</p><p>更具体地说，Rectangle存在字段 height 和 width, 同时存在方法area(), 这些字段和方法都属于Rectangle。</p><p>用Rob Pike的话来说就是：</p><blockquote><p>&quot;A method is a function with an implicit first argument, called a receiver.&quot;</p></blockquote><p>method的语法如下：</p><pre><code>func (r ReceiverType) funcName(parameters) (results)
</code></pre><p>下面我们用最开始的例子用method来实现：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;math&quot;
)

type Rectangle struct {
	width, height float64
}

type Circle struct {
	radius float64
}

func (r Rectangle) area() float64 {
	return r.width*r.height
}

func (c Circle) area() float64 {
	return c.radius * c.radius * math.Pi
}


func main() {
	r1 := Rectangle{12, 2}
	r2 := Rectangle{9, 4}
	c1 := Circle{10}
	c2 := Circle{25}

	fmt.Println(&quot;Area of r1 is: &quot;, r1.area())
	fmt.Println(&quot;Area of r2 is: &quot;, r2.area())
	fmt.Println(&quot;Area of c1 is: &quot;, c1.area())
	fmt.Println(&quot;Area of c2 is: &quot;, c2.area())
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用method的时候重要注意几点</p><ul><li>虽然method的名字一模一样，但是如果接收者不一样，那么method就不一样</li><li>method里面可以访问接收者的字段</li><li>调用method通过<code>.</code>访问，就像struct里面访问字段一样</li></ul><p>图示如下:</p><figure><img src="`+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图2.9 不同struct的method不同</p><p>在上例，method area() 分别属于Rectangle和Circle， 于是他们的 Receiver 就变成了Rectangle 和 Circle, 或者说，这个area()方法 是由 Rectangle/Circle 发出的。</p><blockquote><p>值得说明的一点是，图示中method用虚线标出，意思是此处方法的Receiver是以值传递，而非引用传递，是的，Receiver还可以是指针, 两者的差别在于, 指针作为Receiver会对实例对象的内容发生操作,而普通类型作为Receiver仅仅是以副本作为操作对象,并不对原实例对象发生操作。后文对此会有详细论述。</p></blockquote><p>那是不是method只能作用在struct上面呢？当然不是咯，他可以定义在任何你自定义的类型、内置类型、struct等各种类型上面。这里你是不是有点迷糊了，什么叫自定义类型，自定义类型不就是struct嘛，不是这样的哦，struct只是自定义类型里面一种比较特殊的类型而已，还有其他自定义类型申明，可以通过如下这样的申明来实现。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type typeName typeLiteral
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>请看下面这个申明自定义类型的代码</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type ages int

type money float32

type months map[string]int

m := months {
	&quot;January&quot;:31,
	&quot;February&quot;:28,
	...
	&quot;December&quot;:31,
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到了吗？简单的很吧，这样你就可以在自己的代码里面定义有意义的类型了，实际上只是一个定义了一个别名,有点类似于c中的typedef，例如上面ages替代了int</p><p>好了，让我们回到<code>method</code></p><p>你可以在任何的自定义类型中定义任意多的<code>method</code>，接下来让我们看一个复杂一点的例子</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

const(
	WHITE = iota
	BLACK
	BLUE
	RED
	YELLOW
)

type Color byte

type Box struct {
	width, height, depth float64
	color Color
}

type BoxList []Box //a slice of boxes

func (b Box) Volume() float64 {
	return b.width * b.height * b.depth
}

func (b *Box) SetColor(c Color) {
	b.color = c
}

func (bl BoxList) BiggestColor() Color {
	v := 0.00
	k := Color(WHITE)
	for _, b := range bl {
		if bv := b.Volume(); bv &gt; v {
			v = bv
			k = b.color
		}
	}
	return k
}

func (bl BoxList) PaintItBlack() {
	for i := range bl {
		bl[i].SetColor(BLACK)
	}
}

func (c Color) String() string {
	strings := []string {&quot;WHITE&quot;, &quot;BLACK&quot;, &quot;BLUE&quot;, &quot;RED&quot;, &quot;YELLOW&quot;}
	return strings[c]
}

func main() {
	boxes := BoxList {
		Box{4, 4, 4, RED},
		Box{10, 10, 1, YELLOW},
		Box{1, 1, 20, BLACK},
		Box{10, 10, 1, BLUE},
		Box{10, 30, 1, WHITE},
		Box{20, 20, 20, YELLOW},
	}

	fmt.Printf(&quot;We have %d boxes in our set\\n&quot;, len(boxes))
	fmt.Println(&quot;The volume of the first one is&quot;, boxes[0].Volume(), &quot;cm³&quot;)
	fmt.Println(&quot;The color of the last one is&quot;,boxes[len(boxes)-1].color.String())
	fmt.Println(&quot;The biggest one is&quot;, boxes.BiggestColor().String())

	fmt.Println(&quot;Let&#39;s paint them all black&quot;)
	boxes.PaintItBlack()
	fmt.Println(&quot;The color of the second one is&quot;, boxes[1].color.String())

	fmt.Println(&quot;Obviously, now, the biggest one is&quot;, boxes.BiggestColor().String())
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码通过const定义了一些常量，然后定义了一些自定义类型</p><ul><li>Color作为byte的别名</li><li>定义了一个struct:Box，含有三个长宽高字段和一个颜色属性</li><li>定义了一个slice:BoxList，含有Box</li></ul><p>然后以上面的自定义类型为接收者定义了一些method</p><ul><li>Volume()定义了接收者为Box，返回Box的容量</li><li>SetColor(c Color)，把Box的颜色改为c</li><li>BiggestColor()定在在BoxList上面，返回list里面容量最大的颜色</li><li>PaintItBlack()把BoxList里面所有Box的颜色全部变成黑色</li><li>String()定义在Color上面，返回Color的具体颜色(字符串格式)</li></ul><p>上面的代码通过文字描述出来之后是不是很简单？我们一般解决问题都是通过问题的描述，去写相应的代码实现。</p><h3 id="指针作为receiver" tabindex="-1"><a class="header-anchor" href="#指针作为receiver" aria-hidden="true">#</a> 指针作为receiver</h3><p>现在让我们回过头来看看SetColor这个method，它的receiver是一个指向Box的指针，是的，你可以使用*Box。想想为啥要使用指针而不是Box本身呢？</p><p>我们定义SetColor的真正目的是想改变这个Box的颜色，如果不传Box的指针，那么SetColor接受的其实是Box的一个copy，也就是说method内对于颜色值的修改，其实只作用于Box的copy，而不是真正的Box。所以我们需要传入指针。</p><p>这里可以把receiver当作method的第一个参数来看，然后结合前面函数讲解的传值和传引用就不难理解</p><p>这里你也许会问了那SetColor函数里面应该这样定义<code>*b.Color=c</code>,而不是<code>b.Color=c</code>,因为我们需要读取到指针相应的值。</p><p>你是对的，其实Go里面这两种方式都是正确的，当你用指针去访问相应的字段时(虽然指针没有任何的字段)，Go知道你要通过指针去获取这个值，看到了吧，Go的设计是不是越来越吸引你了。</p><p>也许细心的读者会问这样的问题，PaintItBlack里面调用SetColor的时候是不是应该写成<code>(&amp;bl[i]).SetColor(BLACK)</code>，因为SetColor的receiver是*Box，而不是Box。</p><p>你又说对了，这两种方式都可以，因为Go知道receiver是指针，他自动帮你转了。</p><p>也就是说：</p><blockquote><p>如果一个method的receiver是*T,你可以在一个T类型的实例变量V上面调用这个method，而不需要&amp;V去调用这个method</p></blockquote><p>类似的</p><blockquote><p>如果一个method的receiver是T，你可以在一个*T类型的变量P上面调用这个method，而不需要 *P去调用这个method</p></blockquote><p>所以，你不用担心你是调用的指针的method还是不是指针的method，Go知道你要做的一切，这对于有多年C/C++编程经验的同学来说，真是解决了一个很大的痛苦。</p><h3 id="method继承" tabindex="-1"><a class="header-anchor" href="#method继承" aria-hidden="true">#</a> method继承</h3><p>前面一章我们学习了字段的继承，那么你也会发现Go的一个神奇之处，method也是可以继承的。如果匿名字段实现了一个method，那么包含这个匿名字段的struct也能调用该method。让我们来看下面这个例子</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

type Human struct {
	name string
	age int
	phone string
}

type Student struct {
	Human //匿名字段
	school string
}

type Employee struct {
	Human //匿名字段
	company string
}

//在human上面定义了一个method
func (h *Human) SayHi() {
	fmt.Printf(&quot;Hi, I am %s you can call me on %s\\n&quot;, h.name, h.phone)
}

func main() {
	mark := Student{Human{&quot;Mark&quot;, 25, &quot;222-222-YYYY&quot;}, &quot;MIT&quot;}
	sam := Employee{Human{&quot;Sam&quot;, 45, &quot;111-888-XXXX&quot;}, &quot;Golang Inc&quot;}

	mark.SayHi()
	sam.SayHi()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="method重写" tabindex="-1"><a class="header-anchor" href="#method重写" aria-hidden="true">#</a> method重写</h3><p>上面的例子中，如果Employee想要实现自己的SayHi,怎么办？简单，和匿名字段冲突一样的道理，我们可以在Employee上面定义一个method，重写了匿名字段的方法。请看下面的例子</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

type Human struct {
	name string
	age int
	phone string
}

type Student struct {
	Human //匿名字段
	school string
}

type Employee struct {
	Human //匿名字段
	company string
}

//Human定义method
func (h *Human) SayHi() {
	fmt.Printf(&quot;Hi, I am %s you can call me on %s\\n&quot;, h.name, h.phone)
}

//Employee的method重写Human的method
func (e *Employee) SayHi() {
	fmt.Printf(&quot;Hi, I am %s, I work at %s. Call me on %s\\n&quot;, e.name,
		e.company, e.phone) //Yes you can split into 2 lines here.
}

func main() {
	mark := Student{Human{&quot;Mark&quot;, 25, &quot;222-222-YYYY&quot;}, &quot;MIT&quot;}
	sam := Employee{Human{&quot;Sam&quot;, 45, &quot;111-888-XXXX&quot;}, &quot;Golang Inc&quot;}

	mark.SayHi()
	sam.SayHi()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码设计的是如此的美妙，让人不自觉的为Go的设计惊叹！</p><p>通过这些内容，我们可以设计出基本的面向对象的程序了，但是Go里面的面向对象是如此的简单，没有任何的私有、公有关键字，通过大小写来实现(大写开头的为公有，小写开头的为私有)，方法也同样适用这个原则。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,62);function b(p,h){const n=t("RouterLink");return a(),r("div",null,[m,i("ul",null,[i("li",null,[l(n,{to:"/build-web-app/preface.html"},{default:s(()=>[e("目录")]),_:1})]),i("li",null,[e("上一章: "),l(n,{to:"/build-web-app/02.4.html"},{default:s(()=>[e("struct类型")]),_:1})]),i("li",null,[e("下一节: "),l(n,{to:"/build-web-app/02.6.html"},{default:s(()=>[e("interface")]),_:1})])])])}const f=d(o,[["render",b],["__file","02.5.html.vue"]]);export{f as default};
