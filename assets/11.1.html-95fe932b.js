import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as v,c as o,a as r,b as e,d as n,w as d,e as l}from"./app-9da01d16.js";const c={},u=l(`<h1 id="_11-1-错误处理" tabindex="-1"><a class="header-anchor" href="#_11-1-错误处理" aria-hidden="true">#</a> 11.1 错误处理</h1><p>Go语言主要的设计准则是：简洁、明白，简洁是指语法和C类似，相当的简单，明白是指任何语句都是很明显的，不含有任何隐含的东西，在错误处理方案的设计中也贯彻了这一思想。我们知道在C语言里面是通过返回-1或者NULL之类的信息来表示错误，但是对于使用者来说，不查看相应的API说明文档，根本搞不清楚这个返回值究竟代表什么意思，比如:返回0是成功，还是失败,而Go定义了一个叫做error的类型，来显式表达错误。在使用时，通过把返回的error变量与nil的比较，来判定操作是否成功。例如<code>os.Open</code>函数在打开文件失败时将返回一个不为nil的error变量</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func Open(name string) (file *File, err error)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面这个例子通过调用<code>os.Open</code>打开一个文件，如果出现错误，那么就会调用<code>log.Fatal</code>来输出错误信息：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
f, err := os.Open(&quot;filename.ext&quot;)
if err != nil {
	log.Fatal(err)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似于<code>os.Open</code>函数，标准包中所有可能出错的API都会返回一个error变量，以方便错误处理，这个小节将详细地介绍error类型的设计，和讨论开发Web应用中如何更好地处理error。</p><h2 id="error类型" tabindex="-1"><a class="header-anchor" href="#error类型" aria-hidden="true">#</a> Error类型</h2><p>error类型是一个接口类型，这是它的定义：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type error interface {
	Error() string
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>error是一个内置的接口类型，我们可以在/builtin/包下面找到相应的定义。而我们在很多内部包里面用到的 error是errors包下面的实现的私有结构errorString</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// errorString is a trivial implementation of error.
type errorString struct {
	s string
}

func (e *errorString) Error() string {
	return e.s
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以通过<code>errors.New</code>把一个字符串转化为errorString，以得到一个满足接口error的对象，其内部实现如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// New returns an error that formats as the given text.
func New(text string) error {
	return &amp;errorString{text}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面这个例子演示了如何使用<code>errors.New</code>:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func Sqrt(f float64) (float64, error) {
	if f &lt; 0 {
		return 0, errors.New(&quot;math: square root of negative number&quot;)
	}
	// implementation
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的例子中，我们在调用Sqrt的时候传递的一个负数，然后就得到了non-nil的error对象，将此对象与nil比较，结果为true，所以fmt.Println(fmt包在处理error时会调用Error方法)被调用，以输出错误，请看下面调用的示例代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
f, err := Sqrt(-1)
    if err != nil {
        fmt.Println(err)
    }	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义error" tabindex="-1"><a class="header-anchor" href="#自定义error" aria-hidden="true">#</a> 自定义Error</h2><p>通过上面的介绍我们知道error是一个interface，所以在实现自己的包的时候，通过定义实现此接口的结构，我们就可以实现自己的错误定义，请看来自Json包的示例：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type SyntaxError struct {
	msg    string // 错误描述
	Offset int64  // 错误发生的位置
}

func (e *SyntaxError) Error() string { return e.msg }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Offset字段在调用Error的时候不会被打印，但是我们可以通过类型断言获取错误类型，然后可以打印相应的错误信息，请看下面的例子:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if err := dec.Decode(&amp;val); err != nil {
	if serr, ok := err.(*json.SyntaxError); ok {
		line, col := findLine(f, serr.Offset)
		return fmt.Errorf(&quot;%s:%d:%d: %v&quot;, f.Name(), line, col, err)
	}
	return err
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，函数返回自定义错误时，返回值推荐设置为error类型，而非自定义错误类型，特别需要注意的是不应预声明自定义错误类型的变量。例如：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func Decode() *SyntaxError { // 错误，将可能导致上层调用者err!=nil的判断永远为true。
        var err *SyntaxError     // 预声明错误变量
        if 出错条件 {
            err = &amp;SyntaxError{}
        }
        return err               // 错误，err永远等于非nil，导致上层调用者err!=nil的判断始终为true
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),m={href:"http://golang.org/doc/faq#nil_error",target:"_blank",rel:"noopener noreferrer"},b=l(`<p>上面例子简单的演示了如何自定义Error类型。但是如果我们还需要更复杂的错误处理呢？此时，我们来参考一下net包采用的方法：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package net

type Error interface {
    error
    Timeout() bool   // Is the error a timeout?
    Temporary() bool // Is the error temporary?
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在调用的地方，通过类型断言err是不是net.Error,来细化错误的处理，例如下面的例子，如果一个网络发生临时性错误，那么将会sleep 1秒之后重试：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if nerr, ok := err.(net.Error); ok &amp;&amp; nerr.Temporary() {
	time.Sleep(1e9)
	continue
}
if err != nil {
	log.Fatal(err)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h2><p>Go在错误处理上采用了与C类似的检查返回值的方式，而不是其他多数主流语言采用的异常方式，这造成了代码编写上的一个很大的缺点:错误处理代码的冗余，对于这种情况是我们通过复用检测函数来减少类似的代码。</p><p>请看下面这个例子代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func init() {
	http.HandleFunc(&quot;/view&quot;, viewRecord)
}

func viewRecord(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	key := datastore.NewKey(c, &quot;Record&quot;, r.FormValue(&quot;id&quot;), 0, nil)
	record := new(Record)
	if err := datastore.Get(c, key, record); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	if err := viewTemplate.Execute(w, record); err != nil {
		http.Error(w, err.Error(), 500)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中获取数据和模板展示调用时都有检测错误，当有错误发生时，调用了统一的处理函数<code>http.Error</code>，返回给客户端500错误码，并显示相应的错误数据。但是当越来越多的HandleFunc加入之后，这样的错误处理逻辑代码就会越来越多，其实我们可以通过自定义路由器来缩减代码(实现的思路可以参考第三章的HTTP详解)。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type appHandler func(http.ResponseWriter, *http.Request) error

func (fn appHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if err := fn(w, r); err != nil {
		http.Error(w, err.Error(), 500)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面我们定义了自定义的路由器，然后我们可以通过如下方式来注册函数：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func init() {
	http.Handle(&quot;/view&quot;, appHandler(viewRecord))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当请求/view的时候我们的逻辑处理可以变成如下代码，和第一种实现方式相比较已经简单了很多。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func viewRecord(w http.ResponseWriter, r *http.Request) error {
	c := appengine.NewContext(r)
	key := datastore.NewKey(c, &quot;Record&quot;, r.FormValue(&quot;id&quot;), 0, nil)
	record := new(Record)
	if err := datastore.Get(c, key, record); err != nil {
		return err
	}
	return viewTemplate.Execute(w, record)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子错误处理的时候所有的错误返回给用户的都是500错误码，然后打印出来相应的错误代码，其实我们可以把这个错误信息定义的更加友好，调试的时候也方便定位问题，我们可以自定义返回的错误类型：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type appError struct {
	Error   error
	Message string
	Code    int
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们的自定义路由器可以改成如下方式：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type appHandler func(http.ResponseWriter, *http.Request) *appError

func (fn appHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if e := fn(w, r); e != nil { // e is *appError, not os.Error.
		c := appengine.NewContext(r)
		c.Errorf(&quot;%v&quot;, e.Error)
		http.Error(w, e.Message, e.Code)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样修改完自定义错误之后，我们的逻辑处理可以改成如下方式：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func viewRecord(w http.ResponseWriter, r *http.Request) *appError {
	c := appengine.NewContext(r)
	key := datastore.NewKey(c, &quot;Record&quot;, r.FormValue(&quot;id&quot;), 0, nil)
	record := new(Record)
	if err := datastore.Get(c, key, record); err != nil {
		return &amp;appError{err, &quot;Record not found&quot;, 404}
	}
	if err := viewTemplate.Execute(w, record); err != nil {
		return &amp;appError{err, &quot;Can&#39;t display record&quot;, 500}
	}
	return nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，在我们访问view的时候可以根据不同的情况获取不同的错误码和错误信息，虽然这个和第一个版本的代码量差不多，但是这个显示的错误更加明显，提示的错误信息更加友好，扩展性也比第一个更好。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>在程序设计中，容错是相当重要的一部分工作，在Go中它是通过错误处理来实现的，error虽然只是一个接口，但是其变化却可以有很多，我们可以根据自己的需求来实现不同的处理，最后介绍的错误处理方案，希望能给大家在如何设计更好Web错误处理方案上带来一点思路。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,24);function p(g,h){const a=s("ExternalLinkIcon"),i=s("RouterLink");return v(),o("div",null,[u,r("p",null,[e("原因见 "),r("a",m,[e("http://golang.org/doc/faq#nil_error"),n(a)])]),b,r("ul",null,[r("li",null,[n(i,{to:"/build-web-app/preface.html"},{default:d(()=>[e("目录")]),_:1})]),r("li",null,[e("上一节: "),n(i,{to:"/build-web-app/11.0.html"},{default:d(()=>[e("错误处理，调试和测试")]),_:1})]),r("li",null,[e("下一节: "),n(i,{to:"/build-web-app/11.2.html"},{default:d(()=>[e("使用GDB调试")]),_:1})])])])}const x=t(c,[["render",p],["__file","11.1.html.vue"]]);export{x as default};
