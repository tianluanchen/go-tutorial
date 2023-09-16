import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as u,c as r,a as n,d as s,w as l,b as i,e as t}from"./app-9da01d16.js";const v="/go-tutorial/assets/2.4.student_struct-e16ebf71.png?raw=true",m={},c=t(`<h1 id="_2-4-struct类型" tabindex="-1"><a class="header-anchor" href="#_2-4-struct类型" aria-hidden="true">#</a> 2.4 struct类型</h1><h2 id="struct" tabindex="-1"><a class="header-anchor" href="#struct" aria-hidden="true">#</a> struct</h2><p>Go语言中，也和C或者其他语言一样，我们可以声明新的类型，作为其它类型的属性或字段的容器。例如，我们可以创建一个自定义类型<code>person</code>代表一个人的实体。这个实体拥有属性：姓名和年龄。这样的类型我们称之<code>struct</code>。如下代码所示:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type person struct {
	name string
	age int
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到了吗？声明一个struct如此简单，上面的类型包含有两个字段</p><ul><li>一个string类型的字段name，用来保存用户名称这个属性</li><li>一个int类型的字段age,用来保存用户年龄这个属性</li></ul><p>如何使用struct呢？请看下面的代码</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type person struct {
	name string
	age int
}

var P person  // P现在就是person类型的变量了

P.name = &quot;Astaxie&quot;  // 赋值&quot;Astaxie&quot;给P的name属性.
P.age = 25  // 赋值&quot;25&quot;给变量P的age属性
fmt.Printf(&quot;The person&#39;s name is %s&quot;, P.name)  // 访问P的name属性.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了上面这种P的声明使用之外，还有另外几种声明使用方式：</p>`,9),o=n("ul",null,[n("li",{"Tom,25":""},[n("p",null,"1.按照顺序提供初始化值"),n("p",null,"P := person")]),n("li",{"age:24,":"","name:Tom":""},[n("p",null,[i("2.通过"),n("code",null,"field:value"),i("的方式初始化，这样可以任意顺序")]),n("p",null,"P := person")]),n("li",null,[n("p",null,[i("3.当然也可以通过"),n("code",null,"new"),i("函数分配一个指针，此处P的类型为*person")]),n("p",null,"P := new(person)")])],-1),b=t(`<p>下面我们看一个完整的使用struct的例子</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

// 声明一个新的类型
type person struct {
	name string
	age int
}

// 比较两个人的年龄，返回年龄大的那个人，并且返回年龄差
// struct也是传值的
func Older(p1, p2 person) (person, int) {
	if p1.age&gt;p2.age {  // 比较p1和p2这两个人的年龄
		return p1, p1.age-p2.age
	}
	return p2, p2.age-p1.age
}

func main() {
	var tom person

	// 赋值初始化
	tom.name, tom.age = &quot;Tom&quot;, 18

	// 两个字段都写清楚的初始化
	bob := person{age:25, name:&quot;Bob&quot;}

	// 按照struct定义顺序初始化值
	paul := person{&quot;Paul&quot;, 43}

	tb_Older, tb_diff := Older(tom, bob)
	tp_Older, tp_diff := Older(tom, paul)
	bp_Older, bp_diff := Older(bob, paul)

	fmt.Printf(&quot;Of %s and %s, %s is older by %d years\\n&quot;,
		tom.name, bob.name, tb_Older.name, tb_diff)

	fmt.Printf(&quot;Of %s and %s, %s is older by %d years\\n&quot;,
		tom.name, paul.name, tp_Older.name, tp_diff)

	fmt.Printf(&quot;Of %s and %s, %s is older by %d years\\n&quot;,
		bob.name, paul.name, bp_Older.name, bp_diff)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="struct的匿名字段" tabindex="-1"><a class="header-anchor" href="#struct的匿名字段" aria-hidden="true">#</a> struct的匿名字段</h3><p>我们上面介绍了如何定义一个struct，定义的时候是字段名与其类型一一对应，实际上Go支持只提供类型，而不写字段名的方式，也就是匿名字段，也称为嵌入字段。</p><p>当匿名字段是一个struct的时候，那么这个struct所拥有的全部字段都被隐式地引入了当前定义的这个struct。</p><p>让我们来看一个例子，让上面说的这些更具体化</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

type Human struct {
	name string
	age int
	weight int
}

type Student struct {
	Human  // 匿名字段，那么默认Student就包含了Human的所有字段
	speciality string
}

func main() {
	// 我们初始化一个学生
	mark := Student{Human{&quot;Mark&quot;, 25, 120}, &quot;Computer Science&quot;}

	// 我们访问相应的字段
	fmt.Println(&quot;His name is &quot;, mark.name)
	fmt.Println(&quot;His age is &quot;, mark.age)
	fmt.Println(&quot;His weight is &quot;, mark.weight)
	fmt.Println(&quot;His speciality is &quot;, mark.speciality)
	// 修改对应的备注信息
	mark.speciality = &quot;AI&quot;
	fmt.Println(&quot;Mark changed his speciality&quot;)
	fmt.Println(&quot;His speciality is &quot;, mark.speciality)
	// 修改他的年龄信息
	fmt.Println(&quot;Mark become old&quot;)
	mark.age = 46
	fmt.Println(&quot;His age is&quot;, mark.age)
	// 修改他的体重信息
	fmt.Println(&quot;Mark is not an athlet anymore&quot;)
	mark.weight += 60
	fmt.Println(&quot;His weight is&quot;, mark.weight)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>图例如下:</p><figure><img src="`+v+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图2.7 struct组合，Student组合了Human struct和string基本类型</p><p>我们看到Student访问属性age和name的时候，就像访问自己所有用的字段一样，对，匿名字段就是这样，能够实现字段的继承。是不是很酷啊？还有比这个更酷的呢，那就是student还能访问Human这个字段作为字段名。请看下面的代码，是不是更酷了。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
mark.Human = Human{&quot;Marcus&quot;, 55, 220}
mark.Human.age -= 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过匿名访问和修改字段相当的有用，但是不仅仅是struct字段哦，所有的内置类型和自定义类型都是可以作为匿名字段的。请看下面的例子</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

type Skills []string

type Human struct {
	name string
	age int
	weight int
}

type Student struct {
	Human  // 匿名字段，struct
	Skills // 匿名字段，自定义的类型string slice
	int    // 内置类型作为匿名字段
	speciality string
}

func main() {
	// 初始化学生Jane
	jane := Student{Human:Human{&quot;Jane&quot;, 35, 100}, speciality:&quot;Biology&quot;}
	// 现在我们来访问相应的字段
	fmt.Println(&quot;Her name is &quot;, jane.name)
	fmt.Println(&quot;Her age is &quot;, jane.age)
	fmt.Println(&quot;Her weight is &quot;, jane.weight)
	fmt.Println(&quot;Her speciality is &quot;, jane.speciality)
	// 我们来修改他的skill技能字段
	jane.Skills = []string{&quot;anatomy&quot;}
	fmt.Println(&quot;Her skills are &quot;, jane.Skills)
	fmt.Println(&quot;She acquired two new ones &quot;)
	jane.Skills = append(jane.Skills, &quot;physics&quot;, &quot;golang&quot;)
	fmt.Println(&quot;Her skills now are &quot;, jane.Skills)
	// 修改匿名内置类型字段
	jane.int = 3
	fmt.Println(&quot;Her preferred number is&quot;, jane.int)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面例子我们看出来struct不仅仅能够将struct作为匿名字段，自定义类型、内置类型都可以作为匿名字段，而且可以在相应的字段上面进行函数操作（如例子中的append）。</p><p>这里有一个问题：如果human里面有一个字段叫做phone，而student也有一个字段叫做phone，那么该怎么办呢？</p><p>Go里面很简单的解决了这个问题，最外层的优先访问，也就是当你通过<code>student.phone</code>访问的时候，是访问student里面的字段，而不是human里面的字段。</p><p>这样就允许我们去重载通过匿名字段继承的一些字段，当然如果我们想访问重载后对应匿名类型里面的字段，可以通过匿名字段名来访问。请看下面的例子</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import &quot;fmt&quot;

type Human struct {
	name string
	age int
	phone string  // Human类型拥有的字段
}

type Employee struct {
	Human  // 匿名字段Human
	speciality string
	phone string  // 雇员的phone字段
}

func main() {
	Bob := Employee{Human{&quot;Bob&quot;, 34, &quot;777-444-XXXX&quot;}, &quot;Designer&quot;, &quot;333-222&quot;}
	fmt.Println(&quot;Bob&#39;s work phone is:&quot;, Bob.phone)
	// 如果我们要访问Human的phone字段
	fmt.Println(&quot;Bob&#39;s personal phone is:&quot;, Bob.Human.phone)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,20);function p(g,q){const e=a("RouterLink");return u(),r("div",null,[c,o,b,n("ul",null,[n("li",null,[s(e,{to:"/build-web-app/preface.html"},{default:l(()=>[i("目录")]),_:1})]),n("li",null,[i("上一章: "),s(e,{to:"/build-web-app/02.3.html"},{default:l(()=>[i("流程和函数")]),_:1})]),n("li",null,[i("下一节: "),s(e,{to:"/build-web-app/02.5.html"},{default:l(()=>[i("面向对象")]),_:1})])])])}const _=d(m,[["render",p],["__file","02.4.html.vue"]]);export{_ as default};
