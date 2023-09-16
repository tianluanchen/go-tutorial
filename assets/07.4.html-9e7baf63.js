import{_ as u}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as r,a as e,t as a,b as n,d as t,w as l,e as d}from"./app-9da01d16.js";const v="/go-tutorial/assets/7.4.template-0c18fcde.png?raw=true",m={},p=d('<h1 id="_7-4-模板处理" tabindex="-1"><a class="header-anchor" href="#_7-4-模板处理" aria-hidden="true">#</a> 7.4 模板处理</h1><h2 id="什么是模板" tabindex="-1"><a class="header-anchor" href="#什么是模板" aria-hidden="true">#</a> 什么是模板</h2><p>你一定听说过一种叫做MVC的设计模式，Model处理数据，View展现结果，Controller控制用户的请求，至于View层的处理，在很多动态语言里面都是通过在静态HTML中插入动态语言生成的数据，例如JSP中通过插入<code>&lt;%=....=%&gt;</code>，PHP中通过插入<code>&lt;?php.....?&gt;</code>来实现的。</p><p>通过下面这个图可以说明模板的机制</p><figure><img src="'+v+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图7.1 模板机制图</p><p>Web应用反馈给客户端的信息中的大部分内容是静态的，不变的，而另外少部分是根据用户的请求来动态生成的，例如要显示用户的访问记录列表。用户之间只有记录数据是不同的，而列表的样式则是固定的，此时采用模板可以复用很多静态代码。</p><h2 id="go模板使用" tabindex="-1"><a class="header-anchor" href="#go模板使用" aria-hidden="true">#</a> Go模板使用</h2><p>在Go语言中，我们使用<code>template</code>包来进行模板处理，使用类似<code>Parse</code>、<code>ParseFile</code>、<code>Execute</code>等方法从文件或者字符串加载模板，然后执行类似上面图片展示的模板的merge操作。请看下面的例子：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func handler(w http.ResponseWriter, r *http.Request) {
	t := template.New(&quot;some template&quot;) //创建一个模板
	t, _ = t.ParseFiles(&quot;tmpl/welcome.html&quot;)  //解析模板文件
	user := GetUser() //获取当前用户信息
	t.Execute(w, user)  //执行模板的merger操作
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的例子我们可以看到Go语言的模板操作非常的简单方便，和其他语言的模板处理类似，都是先获取数据，然后渲染数据。</p><p>为了演示和测试代码的方便，我们在接下来的例子中采用如下格式的代码</p><ul><li>使用Parse代替ParseFiles，因为Parse可以直接测试一个字符串，而不需要额外的文件</li><li>不使用handler来写演示代码，而是每个测试一个main，方便测试</li><li>使用<code>os.Stdout</code>代替<code>http.ResponseWriter</code>，因为<code>os.Stdout</code>实现了<code>io.Writer</code>接口</li></ul><h2 id="模板中如何插入数据" tabindex="-1"><a class="header-anchor" href="#模板中如何插入数据" aria-hidden="true">#</a> 模板中如何插入数据？</h2><p>上面我们演示了如何解析并渲染模板，接下来让我们来更加详细的了解如何把数据渲染出来。一个模板都是应用在一个Go的对象之上，Go对象的字段如何插入到模板中呢？</p><h3 id="字段操作" tabindex="-1"><a class="header-anchor" href="#字段操作" aria-hidden="true">#</a> 字段操作</h3><p>Go语言的模板通过<code>{{}}</code>来包含需要在渲染时被替换的字段，<code>{{.}}</code>表示当前的对象，这和Java或者C++中的this类似，如果要访问当前对象的字段通过<code>{{.FieldName}}</code>，但是需要注意一点：这个字段必须是导出的(字段首字母必须是大写的)，否则在渲染的时候就会报错，请看下面的这个例子：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;html/template&quot;
	&quot;os&quot;
)

type Person struct {
	UserName string
}

func main() {
	t := template.New(&quot;fieldname example&quot;)
	t, _ = t.Parse(&quot;hello {{.UserName}}!&quot;)
	p := Person{UserName: &quot;Astaxie&quot;}
	t.Execute(os.Stdout, p)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码我们可以正确的输出<code>hello Astaxie</code>，但是如果我们稍微修改一下代码，在模板中含有了未导出的字段，那么就会报错</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type Person struct {
	UserName string
	email	string  //未导出的字段，首字母是小写的
}

t, _ = t.Parse(&quot;hello {{.UserName}}! {{.email}}&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码就会报错，因为我们调用了一个未导出的字段，但是如果我们调用了一个不存在的字段是不会报错的，而是输出为空。</p><p>如果模板中输出<code>{{.}}</code>，这个一般应用于字符串对象，默认会调用fmt包输出字符串的内容。</p><h3 id="输出嵌套字段内容" tabindex="-1"><a class="header-anchor" href="#输出嵌套字段内容" aria-hidden="true">#</a> 输出嵌套字段内容</h3><p>上面我们例子展示了如何针对一个对象的字段输出，那么如果字段里面还有对象，如何来循环的输出这些内容呢？我们可以使用<code>{{with …}}…{{end}}</code>和<code>{{range …}}{{end}}</code>来进行数据的输出。</p>`,24),b=d(`<p>详细的使用请看下面的例子：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;html/template&quot;
	&quot;os&quot;
)

type Friend struct {
	Fname string
}

type Person struct {
	UserName string
	Emails   []string
	Friends  []*Friend
}

func main() {
	f1 := Friend{Fname: &quot;minux.ma&quot;}
	f2 := Friend{Fname: &quot;xushiwei&quot;}
	t := template.New(&quot;fieldname example&quot;)
	t, _ = t.Parse(\`hello {{.UserName}}!
			{{range .Emails}}
				an email {{.}}
			{{end}}
			{{with .Friends}}
			{{range .}}
				my friend name is {{.Fname}}
			{{end}}
			{{end}}
			\`)
	p := Person{UserName: &quot;Astaxie&quot;,
		Emails:  []string{&quot;astaxie@beego.me&quot;, &quot;astaxie@gmail.com&quot;},
		Friends: []*Friend{&amp;f1, &amp;f2}}
	t.Execute(os.Stdout, p)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="条件处理" tabindex="-1"><a class="header-anchor" href="#条件处理" aria-hidden="true">#</a> 条件处理</h3><p>在Go模板里面如果需要进行条件判断，那么我们可以使用和Go语言的<code>if-else</code>语法类似的方式来处理，如果pipeline为空，那么if就认为是false，下面的例子展示了如何使用<code>if-else</code>语法：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;os&quot;
	&quot;text/template&quot;
)

func main() {
	tEmpty := template.New(&quot;template test&quot;)
	tEmpty = template.Must(tEmpty.Parse(&quot;空 pipeline if demo: {{if \`\`}} 不会输出. {{end}}\\n&quot;))
	tEmpty.Execute(os.Stdout, nil)

	tWithValue := template.New(&quot;template test&quot;)
	tWithValue = template.Must(tWithValue.Parse(&quot;不为空的 pipeline if demo: {{if \`anything\`}} 我有内容，我会输出. {{end}}\\n&quot;))
	tWithValue.Execute(os.Stdout, nil)

	tIfElse := template.New(&quot;template test&quot;)
	tIfElse = template.Must(tIfElse.Parse(&quot;if-else demo: {{if \`anything\`}} if部分 {{else}} else部分.{{end}}\\n&quot;))
	tIfElse.Execute(os.Stdout, nil)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的演示代码我们知道<code>if-else</code>语法相当的简单，在使用过程中很容易集成到我们的模板代码中。</p><blockquote><p>注意：if里面无法使用条件判断，例如.Mail==&quot;<a href="mailto:astaxie@gmail.com">astaxie@gmail.com</a>&quot;，这样的判断是不正确的，if里面只能是bool值</p></blockquote><h3 id="pipelines" tabindex="-1"><a class="header-anchor" href="#pipelines" aria-hidden="true">#</a> pipelines</h3><p>Unix用户已经很熟悉什么是<code>pipe</code>了，<code>ls | grep &quot;beego&quot;</code>类似这样的语法你是不是经常使用，过滤当前目录下面的文件，显示含有&quot;beego&quot;的数据，表达的意思就是前面的输出可以当做后面的输入，最后显示我们想要的数据，而Go语言模板最强大的一点就是支持pipe数据，在Go语言里面任何<code>{{}}</code>里面的都是pipelines数据，例如我们上面输出的email里面如果还有一些可能引起XSS注入的，那么我们如何来进行转化呢？</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
{{. | html}}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在email输出的地方我们可以采用如上方式可以把输出全部转化html的实体，上面的这种方式和我们平常写Unix的方式是不是一模一样，操作起来相当的简便，调用其他的函数也是类似的方式。</p><h3 id="模板变量" tabindex="-1"><a class="header-anchor" href="#模板变量" aria-hidden="true">#</a> 模板变量</h3><p>有时候，我们在模板使用过程中需要定义一些局部变量，我们可以在一些操作中申明局部变量，例如<code>with\`\`range\`\`if</code>过程中申明局部变量，这个变量的作用域是<code>{{end}}</code>之前，Go语言通过申明的局部变量格式如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
$variable := pipeline
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>详细的例子看下面的：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
{{with $x := &quot;output&quot; | printf &quot;%q&quot;}}{{$x}}{{end}}
{{with $x := &quot;output&quot;}}{{printf &quot;%q&quot; $x}}{{end}}
{{with $x := &quot;output&quot;}}{{$x | printf &quot;%q&quot;}}{{end}}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模板函数" tabindex="-1"><a class="header-anchor" href="#模板函数" aria-hidden="true">#</a> 模板函数</h3><p>模板在输出对象的字段值时，采用了<code>fmt</code>包把对象转化成了字符串。但是有时候我们的需求可能不是这样的，例如有时候我们为了防止垃圾邮件发送者通过采集网页的方式来发送给我们的邮箱信息，我们希望把<code>@</code>替换成<code>at</code>例如：<code>astaxie at beego.me</code>，如果要实现这样的功能，我们就需要自定义函数来做这个功能。</p><p>每一个模板函数都有一个唯一值的名字，然后与一个Go函数关联，通过如下的方式来关联</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type FuncMap map[string]interface{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，如果我们想要的email函数的模板函数名是<code>emailDeal</code>，它关联的Go函数名称是<code>EmailDealWith</code>,那么我们可以通过下面的方式来注册这个函数</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
t = t.Funcs(template.FuncMap{&quot;emailDeal&quot;: EmailDealWith})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>EmailDealWith</code>这个函数的参数和返回值定义如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func EmailDealWith(args …interface{}) string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来看下面的实现例子：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;html/template&quot;
	&quot;os&quot;
	&quot;strings&quot;
)

type Friend struct {
	Fname string
}

type Person struct {
	UserName string
	Emails   []string
	Friends  []*Friend
}

func EmailDealWith(args ...interface{}) string {
	ok := false
	var s string
	if len(args) == 1 {
		s, ok = args[0].(string)
	}
	if !ok {
		s = fmt.Sprint(args...)
	}
	// find the @ symbol
	substrs := strings.Split(s, &quot;@&quot;)
	if len(substrs) != 2 {
		return s
	}
	// replace the @ by &quot; at &quot;
	return (substrs[0] + &quot; at &quot; + substrs[1])
}

func main() {
	f1 := Friend{Fname: &quot;minux.ma&quot;}
	f2 := Friend{Fname: &quot;xushiwei&quot;}
	t := template.New(&quot;fieldname example&quot;)
	t = t.Funcs(template.FuncMap{&quot;emailDeal&quot;: EmailDealWith})
	t, _ = t.Parse(\`hello {{.UserName}}!
				{{range .Emails}}
					an emails {{.|emailDeal}}
				{{end}}
				{{with .Friends}}
				{{range .}}
					my friend name is {{.Fname}}
				{{end}}
				{{end}}
				\`)
	p := Person{UserName: &quot;Astaxie&quot;,
		Emails:  []string{&quot;astaxie@beego.me&quot;, &quot;astaxie@gmail.com&quot;},
		Friends: []*Friend{&amp;f1, &amp;f2}}
	t.Execute(os.Stdout, p)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面演示了如何自定义函数，其实，在模板包内部已经有内置的实现函数，下面代码截取自模板包里面</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var builtins = FuncMap{
	&quot;and&quot;:      and,
	&quot;call&quot;:     call,
	&quot;html&quot;:     HTMLEscaper,
	&quot;index&quot;:    index,
	&quot;js&quot;:       JSEscaper,
	&quot;len&quot;:      length,
	&quot;not&quot;:      not,
	&quot;or&quot;:       or,
	&quot;print&quot;:    fmt.Sprint,
	&quot;printf&quot;:   fmt.Sprintf,
	&quot;println&quot;:  fmt.Sprintln,
	&quot;urlquery&quot;: URLQueryEscaper,
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="must操作" tabindex="-1"><a class="header-anchor" href="#must操作" aria-hidden="true">#</a> Must操作</h2><p>模板包里面有一个函数<code>Must</code>，它的作用是检测模板是否正确，例如大括号是否匹配，注释是否正确的关闭，变量是否正确的书写。接下来我们演示一个例子，用Must来判断模板是否正确：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;text/template&quot;
)

func main() {
	tOk := template.New(&quot;first&quot;)
	template.Must(tOk.Parse(&quot; some static text /* and a comment */&quot;))
	fmt.Println(&quot;The first one parsed OK.&quot;)

	template.Must(template.New(&quot;second&quot;).Parse(&quot;some static text {{ .Name }}&quot;))
	fmt.Println(&quot;The second one parsed OK.&quot;)

	fmt.Println(&quot;The next one ought to fail.&quot;)
	tErr := template.New(&quot;check parse error with Must&quot;)
	template.Must(tErr.Parse(&quot; some static text {{ .Name }&quot;))
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将输出如下内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
The first one parsed OK.
The second one parsed OK.
The next one ought to fail.
panic: template: check parse error with Must:1: unexpected &quot;}&quot; in command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="嵌套模板" tabindex="-1"><a class="header-anchor" href="#嵌套模板" aria-hidden="true">#</a> 嵌套模板</h2><p>我们平常开发Web应用的时候，经常会遇到一些模板有些部分是固定不变的，然后可以抽取出来作为一个独立的部分，例如一个博客的头部和尾部是不变的，而唯一改变的是中间的内容部分。所以我们可以定义成<code>header</code>、<code>content</code>、<code>footer</code>三个部分。Go语言中通过如下的语法来申明</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
{{define &quot;子模板名称&quot;}}内容{{end}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过如下方式来调用：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
{{template &quot;子模板名称&quot;}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们演示如何使用嵌套模板，我们定义三个文件，<code>header.tmpl</code>、<code>content.tmpl</code>、<code>footer.tmpl</code>文件，里面的内容如下</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
//header.tmpl
{{define &quot;header&quot;}}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>演示信息<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
{{end}}

//content.tmpl
{{define &quot;content&quot;}}
{{template &quot;header&quot;}}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>演示嵌套<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>嵌套使用define定义子模板<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>调用使用template<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
{{template &quot;footer&quot;}}
{{end}}

//footer.tmpl
{{define &quot;footer&quot;}}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
{{end}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>演示代码如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;os&quot;
	&quot;text/template&quot;
)

func main() {
	s1, _ := template.ParseFiles(&quot;header.tmpl&quot;, &quot;content.tmpl&quot;, &quot;footer.tmpl&quot;)
	s1.ExecuteTemplate(os.Stdout, &quot;header&quot;, nil)
	fmt.Println()
	s1.ExecuteTemplate(os.Stdout, &quot;content&quot;, nil)
	fmt.Println()
	s1.ExecuteTemplate(os.Stdout, &quot;footer&quot;, nil)
	fmt.Println()
	s1.Execute(os.Stdout, nil)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,42),h=e("code",null,"template.ParseFiles",-1),g=e("code",null,"ExecuteTemplate",-1),q=e("code",null,"s1.Execute",-1),f=e("blockquote",null,[e("p",null,"同一个集合类的模板是互相知晓的，如果同一模板被多个集合使用，则它需要在多个集合中分别解析")],-1),x=e("h2",{id:"总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),n(" 总结")],-1),k=e("p",null,"通过上面对模板的详细介绍，我们了解了如何把动态数据与模板融合：如何输出循环数据、如何自定义函数、如何嵌套模板等等。通过模板技术的应用，我们可以完成MVC模式中V的处理，接下来的章节我们将介绍如何来处理M和C。",-1),G=e("h2",{id:"links",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#links","aria-hidden":"true"},"#"),n(" links")],-1);function _(i,E){const s=o("RouterLink");return c(),r("div",null,[p,e("ul",null,[e("li",null,a(i.range)+" 这个和Go语法里面的range类似，循环操作数据",1),e("li",null,a(i.with)+"操作是指当前对象的值，类似上下文的概念",1)]),b,e("p",null,[n("通过上面的例子我们可以看到通过"),h,n("把所有的嵌套模板全部解析到模板里面，其实每一个定义的"+a(i.define)+"都是一个独立的模板，他们相互独立，是并行存在的关系，内部其实存储的是类似map的一种关系(key是模板的名称，value是模板的内容)，然后我们通过",1),g,n("来执行相应的子模板内容，我们可以看到header、footer都是相对独立的，都能输出内容，content 中因为嵌套了header和footer的内容，就会同时输出三个的内容。但是当我们执行"),q,n("，没有任何的输出，因为在默认的情况下没有默认的子模板，所以不会输出任何的东西。")]),f,x,k,G,e("ul",null,[e("li",null,[t(s,{to:"/build-web-app/preface.html"},{default:l(()=>[n("目录")]),_:1})]),e("li",null,[n("上一节: "),t(s,{to:"/build-web-app/07.3.html"},{default:l(()=>[n("正则处理")]),_:1})]),e("li",null,[n("下一节: "),t(s,{to:"/build-web-app/07.5.html"},{default:l(()=>[n("文件操作")]),_:1})])])])}const w=u(m,[["render",_],["__file","07.4.html.vue"]]);export{w as default};
