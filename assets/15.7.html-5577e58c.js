import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as l,c as u,a as s,b as n,d as a,w as e,e as p}from"./app-9da01d16.js";const d={},r=s("h1",{id:"_15-7-探索-template-包",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_15-7-探索-template-包","aria-hidden":"true"},"#"),n(" 15.7 探索 template 包")],-1),k=s("code",null,"template",-1),m={href:"https://golang.org/pkg/text/template/",target:"_blank",rel:"noopener noreferrer"},v=p('<p>在前一章节，我们使用 template 对象把数据结构整合到 HTML 模板中。这项技术确实对网页应用程序非常有用，然而模板是一项更为通用的技术方案：数据驱动的模板被创建出来，以生成文本输出。HTML 仅是其中的一种特定使用案例。</p><p>模板通过与数据结构的整合来生成，通常为结构体或其切片。当数据项传递给 <code>tmpl.Execute()</code> ，它用其中的元素进行替换， 动态地重写某一小段文本。<strong>只有被导出的数据项</strong>才可以被整合进模板中。可以在 <code>{{</code> 和 <code>}}</code> 中加入数据求值或控制结构。数据项可以是值或指针，接口隐藏了他们的差异。</p><h2 id="_15-7-1-字段替换-fieldname" tabindex="-1"><a class="header-anchor" href="#_15-7-1-字段替换-fieldname" aria-hidden="true">#</a> 15.7.1 字段替换：<code>{{.FieldName}}</code></h2>',3),g=s("code",null,".",-1),h=s("code",null,"Name",-1),b=s("code",null,"{{.Name}}",-1),f=s("code",null,"Name",-1),_=s("code",null,"map",-1),q=s("code",null,"Template",-1),x=s("code",null,"template.New()",-1),w=s("code",null,"Parse()",-1),y=s("code",null,"ParseFiles()",-1),E=s("code",null,"error != nil",-1),N=s("code",null,"Execute()",-1),P=s("code",null,"io.Writer",-1),M=s("code",null,"error",-1),T=s("code",null,"os.Stdout()",-1),S=p(`<p>示例 15.13 <a href="examples/chapter_15/template_field.go">template_field.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;text/template&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	nonExportedAgeField <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>
	t<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;hello {{.Name}}!&quot;</span><span class="token punctuation">)</span>
	p <span class="token operator">:=</span> Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;Mary&quot;</span><span class="token punctuation">,</span> nonExportedAgeField<span class="token punctuation">:</span> <span class="token string">&quot;31&quot;</span><span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;There was an error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：<code>hello Mary!</code></p><p>如果数据结构中包含一个未导出的字段，当我们尝试把它整合到类似这样的定义字符串：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>t<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;your age is {{.nonExportedAgeField}}!&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会产生错误：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>There was an error: template: nonexported template hello:1: can’t evaluate field nonExportedAgeField in type main.Person.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果只是想简单地把 <code>Execute()</code> 方法的第二个参数用于替换，使用 <code>{{.}}</code>。</p><p>当在浏览器环境中进行这些步骤，应首先使用 <code>html</code> 过滤器来过滤内容，例如 <code>{{html .}}</code>， 或者对 <code>FieldName</code> 过滤：<code>{{ .FieldName |html }}</code>。</p><p><code>|html</code> 这部分代码，是请求模板引擎在输出 <code>FieldName</code> 的结果前把值传递给 html 格式化器，它会执行 HTML 字符转义（例如把 <code>&gt;</code> 替换为 <code>&amp;gt;</code>）。这可以避免用户输入数据破坏 HTML 文档结构。</p><h2 id="_15-7-2-验证模板格式" tabindex="-1"><a class="header-anchor" href="#_15-7-2-验证模板格式" aria-hidden="true">#</a> 15.7.2 验证模板格式</h2><p>为了确保模板定义语法是正确的，使用 <code>Must()</code> 函数处理 <code>Parse</code> 的返回结果。在下面的例子中 <code>tOK</code> 是正确的模板， <code>tErr</code> 验证时发生错误，会导致运行时 panic。</p><p>示例 15.14 <a href="examples/chapter_15/template_validation.go">template_validation.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;text/template&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tOk <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;ok&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//a valid template, so no panic with Must:</span>
	template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tOk<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;/* and a comment */ some static text: {{ .Name }}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;The first one parsed OK.&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;The next one ought to fail.&quot;</span><span class="token punctuation">)</span>
	tErr <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;error_template&quot;</span><span class="token punctuation">)</span>
	template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tErr<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot; some static text {{ .Name }&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>The first one parsed OK.
The next one ought to fail.
panic: template: error_template:1: unexpected &quot;}&quot; in operand
</code></pre>`,16),F=s("code",null,"defer/recover",-1),I=p(`<p>在代码中常见到这 3 个基本函数被串联使用：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> strTempl <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;TName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>strTemplateHTML<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>练习 15.7 <a href="exercises/chapter_15/template_validation_recover.go">template_validation_recover.go</a></p><p>在上述示例代码上实现 defer/recover 机制。</p><h2 id="_15-7-3-if-else" tabindex="-1"><a class="header-anchor" href="#_15-7-3-if-else" aria-hidden="true">#</a> 15.7.3 <code>If-else</code></h2><p>运行 <code>Execute()</code> 产生的结果来自模板的输出，它包含静态文本，以及被 <code>{{}}</code> 包裹的称之为<em>管道</em>的文本。例如，运行这段代码（示例 15.15 <a href="examples/chapter_15/pipeline1.go">pipline1.go</a>）：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;template test&quot;</span><span class="token punctuation">)</span>
t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;This is just static text. \\n{{\\&quot;This is pipeline data - because it is evaluated within the double braces.\\&quot;}} {{\`So is this, but within reverse quotes.\`}}\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果为：</p><pre><code>This is just static text.
This is pipeline data—because it is evaluated within the double braces. So is this, but within reverse quotes.
</code></pre><p>现在我们可以对管道数据的输出结果用 <code>if-else-end</code> 设置条件约束：如果管道是空的，类似于：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>{{if \`\`}} Will not print. {{end}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么 <code>if</code> 条件的求值结果为 <code>false</code>，不会有输出内容。但如果是这样：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>{{if \`anything\`}} Print IF part. {{else}} Print ELSE part.{{end}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会输出 <code>Print IF part.</code>。以下程序演示了这点：</p><p>示例 15.16 <a href="examples/chapter_15/template_ifelse.go">template_ifelse.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;text/template&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tEmpty <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;template test&quot;</span><span class="token punctuation">)</span>
	tEmpty <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tEmpty<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;Empty pipeline if demo: {{if \`\`}} Will not print. {{end}}\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//empty pipeline following if</span>
	tEmpty<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>

	tWithValue <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;template test&quot;</span><span class="token punctuation">)</span>
	tWithValue <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tWithValue<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;Non empty pipeline if demo: {{if \`anything\`}} Will print. {{end}}\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//non empty pipeline following if condition</span>
	tWithValue<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>

	tIfElse <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;template test&quot;</span><span class="token punctuation">)</span>
	tIfElse <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tIfElse<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;if-else demo: {{if \`anything\`}} Print IF part. {{else}} Print ELSE part.{{end}}\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//non empty pipeline following if condition</span>
	tIfElse<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>Empty pipeline if demo:
Non empty pipeline if demo: Will print.
if-else demo: Print IF part.
</code></pre><h2 id="_15-7-4-点号和-with-end" tabindex="-1"><a class="header-anchor" href="#_15-7-4-点号和-with-end" aria-hidden="true">#</a> 15.7.4 点号和 <code>with-end</code></h2><p>点号 (<code>.</code>) 可以在 Go 模板中使用：其值 <code>{{.}}</code> 被设置为当前管道的值。</p><p><code>with</code> 语句将点号设为管道的值。如果管道是空的，那么不管 <code>with-end</code> 块之间有什么，都会被忽略。在被嵌套时，点号根据最近的作用域取得值。以下程序演示了这点：</p><p>示例 15.17 <a href="examples/chapter_15/template_with_end.go">template_with_end.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;text/template&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span>
	t<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;{{with \`hello\`}}{{.}}{{end}}!\\n&quot;</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>

	t<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;{{with \`hello\`}}{{.}} {{with \`Mary\`}}{{.}}{{end}}{{end}}!\\n&quot;</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>hello!
hello Mary!
</code></pre><h2 id="_15-7-5-模板变量" tabindex="-1"><a class="header-anchor" href="#_15-7-5-模板变量" aria-hidden="true">#</a> 15.7.5 模板变量 <code>$</code></h2><p>可以在模板内为管道设置本地变量，变量名以 <code>$</code> 符号作为前缀。变量名只能包含字母、数字和下划线。以下示例使用了多种形式的有效变量名。</p><p>示例 15.18 <a href="examples/chapter_15/template_variables.go">template_variables.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;text/template&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span>
	t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;{{with $3 := \`hello\`}}{{$3}}{{end}}!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>

	t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;{{with $x3 := \`hola\`}}{{$x3}}{{end}}!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>

	t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;{{with $x_1 := \`hey\`}}{{$x_1}} {{.}} {{$x_1}}{{end}}!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>hello!
hola!
hey hey hey!
</code></pre><h2 id="_15-7-6-range-end" tabindex="-1"><a class="header-anchor" href="#_15-7-6-range-end" aria-hidden="true">#</a> 15.7.6 <code>range-end</code></h2><p><code>range-end</code> 结构格式为：<code>{{range pipeline}} T1 {{else}} T0 {{end}}</code>。</p><p><code>range</code> 被用于在集合上迭代：管道的值必须是数组、切片或 <code>map</code>。如果管道的值长度为零，点号的值不受影响，且执行 <code>T0</code>；否则，点号被设置为数组、切片或 <code>map</code> 内元素的值，并执行 <code>T1</code>。</p><p>如果模板为：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>{{range .}}
{{.}}
{{end}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么执行代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>s <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">}</span>
t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>会输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1
2
3
4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40),L=p(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>{{range .}}
	{{with .Author}}
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">&gt;</span></span>{{html .}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">&gt;</span></span> wrote:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
	{{else}}
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>An anonymous person wrote:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
	{{end}}
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span>{{html .Content}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span>{{html .Date}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
{{end}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里 <code>range .</code> 在结构体切片上迭代，每次都包含 <code>Author</code>、<code>Content</code> 和 <code>Date</code> 字段。</p><h2 id="_15-7-7-模板预定义函数" tabindex="-1"><a class="header-anchor" href="#_15-7-7-模板预定义函数" aria-hidden="true">#</a> 15.7.7 模板预定义函数</h2><p>也有一些可以在模板代码中使用的预定义函数，例如 <code>printf()</code> 函数工作方式类似于 <code>fmt.Sprintf()</code>：</p><p>示例 15.19 <a href="examples/chapter_15/predefined_functions.go">predefined_functions.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;text/template&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span>
	t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;{{with $x := \`hello\`}}{{printf \`%s %s\` $x \`Mary\`}}{{end}}!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出 <code>hello Mary!</code>。</p>`,7),$=s("code",null,'{{ printf "%s" .Body|html}}',-1),W=s("code",null,"Body",-1),A=s("h2",{id:"链接",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),n(" 链接")],-1);function V(B,H){const c=o("ExternalLinkIcon"),t=o("RouterLink");return l(),u("div",null,[r,s("p",null,[n("（"),k,n(" 包的文档可以在 "),s("a",m,[n("https://golang.org/pkg/text/template/"),a(c)]),n(" 找到。）")]),v,s("p",null,[n("要在模板中包含某个字段的内容，使用双花括号括起以点 ("),g,n(") 开头的字段名。例如，假设 "),h,n(" 是某个结构体的字段，其值要在被模板整合时替换，则在模板中使用文本 "),b,n("。当 "),f,n(" 是 "),_,n(" 的键时这么做也是可行的。要创建一个新的 "),q,n(" 对象，调用 "),x,n("，其字符串参数可以指定模板的名称。正如 "),a(t,{to:"/the-way-to-go/15.5.html"},{default:e(()=>[n("15.5 节")]),_:1}),n("出现过的，"),w,n(" 方法通过解析模板定义字符串，生成模板的内部表示。当使用包含模板定义字符串的文件时，将文件路径传递给 "),y,n(" 来解析。解析过程如产生错误，这两个函数第二个返回值 "),E,n("。最后通过 "),N,n(" 方法，数据结构中的内容与模板整合，并将结果写入方法的第一个参数中，其类型为 "),P,n("。再一次地，可能会有 "),M,n(" 返回。以下程序演示了这些步骤，输出通过 "),T,n(" 被写到控制台。")]),S,s("p",null,[n("模板语法出现错误比较少见，可以使用 "),a(t,{to:"/the-way-to-go/13.3.html"},{default:e(()=>[n("13.3节")]),_:1}),n(" 概括的 "),F,n(" 机制来报告并纠正错误。")]),I,s("p",null,[n("如需更实用的示例，请参考 "),a(t,{to:"/the-way-to-go/20.7.html"},{default:e(()=>[n("20.7 节")]),_:1}),n("，来自 App Engine 数据库的数据通过模板来显示：")]),L,s("p",null,[n("预定义函数也在 "),a(t,{to:"/the-way-to-go/15.6.html"},{default:e(()=>[n("15.6 节")]),_:1}),n("中使用："),$,n("，否则字节切片 "),W,n(" 会作为数字序列打印出来。")]),A,s("ul",null,[s("li",null,[a(t,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),a(t,{to:"/the-way-to-go/15.6.html"},{default:e(()=>[n("用模板编写网页应用")]),_:1})]),s("li",null,[n("下一节："),a(t,{to:"/the-way-to-go/15.8.html"},{default:e(()=>[n("精巧的多功能网页服务器")]),_:1})])])])}const K=i(d,[["render",V],["__file","15.7.html.vue"]]);export{K as default};