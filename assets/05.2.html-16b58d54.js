import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as l,a as s,b as n,d as t,w as e,e as o}from"./app-9da01d16.js";const u={},r=s("h1",{id:"_5-2-测试多返回值函数的错误",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_5-2-测试多返回值函数的错误","aria-hidden":"true"},"#"),n(" 5.2 测试多返回值函数的错误")],-1),d=s("code",null,"true",-1),k=s("code",null,"nil",-1),v=s("code",null,"false",-1),m=s("code",null,"true",-1),g=s("code",null,"false",-1),b=s("code",null,"error",-1),f=s("code",null,"error",-1),h=s("code",null,"nil",-1),_=s("code",null,"error",-1),w=s("code",null,"var err error",-1),y=s("code",null,"if",-1),x=s("a",{href:"examples/chapter_4/string_conversion.go"},"string_conversion.go",-1),q=s("code",null,"strconv.Atoi()",-1),S=o(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>anInt<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>origStr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果 <code>origStr</code> 不能被转换为整数，<code>anInt</code> 的值会变成 <code>0</code> 而 <code>_</code> 无视了错误，程序会继续运行。</p><p>这样做是非常不好的：程序应该在最接近的位置检查所有相关的错误，至少需要暗示用户有错误发生并对函数进行返回，甚至中断程序。</p><p>我们在第二个版本中对代码进行了改进：</p><p>示例 1：</p><p>示例 5.3 <a href="examples/chapter_5/string_conversion2.go">string_conversion2.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> orig <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;ABC&quot;</span>
	<span class="token comment">// var an int</span>
	<span class="token keyword">var</span> newS <span class="token builtin">string</span>
	<span class="token comment">// var err error</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;The size of ints is: %d\\n&quot;</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span>IntSize<span class="token punctuation">)</span>	  
	<span class="token comment">// anInt, err = strconv.Atoi(origStr)</span>
	an<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>orig<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;orig %s is not an integer - exiting with error\\n&quot;</span><span class="token punctuation">,</span> orig<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span> 
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;The integer is %d\\n&quot;</span><span class="token punctuation">,</span> an<span class="token punctuation">)</span>
	an <span class="token operator">=</span> an <span class="token operator">+</span> <span class="token number">5</span>
	newS <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>an<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;The new string is: %s\\n&quot;</span><span class="token punctuation">,</span> newS<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是测试 <code>err</code> 变量是否包含一个真正的错误（<code>if err != nil</code>）的习惯用法。如果确实存在错误，则会打印相应的错误信息然后通过 <code>return</code> 提前结束函数的执行。我们还可以使用携带返回值的 <code>return</code> 形式，例如 <code>return err</code>。这样一来，函数的调用者就可以检查函数执行过程中是否存在错误了。</p><p><strong>习惯用法</strong></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>value<span class="token punctuation">,</span> err <span class="token operator">:=</span> pack1<span class="token punctuation">.</span><span class="token function">Function1</span><span class="token punctuation">(</span>param1<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;An error occured in pack1.Function1 with parameter %v&quot;</span><span class="token punctuation">,</span> param1<span class="token punctuation">)</span>
	<span class="token keyword">return</span> err
<span class="token punctuation">}</span>
<span class="token comment">// 未发生错误，继续执行：</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于本例的函数调用者属于 <code>main</code> 函数，所以程序会直接停止运行。</p><p>如果我们想要在错误发生的同时终止程序的运行，我们可以使用 <code>os</code> 包的 <code>Exit</code> 函数：</p><p><strong>习惯用法</strong></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Program stopping with error %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（此处的退出代码 <code>1</code> 可以使用外部脚本获取到）</p><p>有时候，你会发现这种习惯用法被连续重复地使用在某段代码中。</p><p>当没有错误发生时，代码继续运行就是唯一要做的事情，所以 <code>if</code> 语句块后面不需要使用 <code>else</code> 分支。</p><p>示例 2：我们尝试通过 <code>os.Open</code> 方法打开一个名为 <code>name</code> 的只读文件：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> err
<span class="token punctuation">}</span>
<span class="token function">doSomething</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token comment">// 当没有错误发生时，文件对象被传入到某个函数中</span>
doSomething
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 5.1</strong> 尝试改写 <a href="examples/chapter_5/string_conversion2.go">string_conversion2.go</a> 中的代码，要求使用 <code>:=</code> 方法来对 <code>err</code> 进行赋值，哪些地方可以被修改？</p><p>示例 3：可以将错误的获取放置在 <code>if</code> 语句的初始化部分：</p><p><strong>习惯用法</strong></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">:=</span> file<span class="token punctuation">.</span><span class="token function">Chmod</span><span class="token punctuation">(</span><span class="token number">0664</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token keyword">return</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 4：或者将 ok-pattern 的获取放置在 <code>if</code> 语句的初始化部分，然后进行判断：</p><p><strong>习惯用法</strong></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> value<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token function">readData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
…
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意事项</strong></p><p>如果您像下面一样，没有为多返回值的函数准备足够的变量来存放结果：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">mySqrt</span><span class="token punctuation">(</span>f <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>v <span class="token builtin">float64</span><span class="token punctuation">,</span> ok <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> f <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span> <span class="token comment">// error case</span>
	<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	t <span class="token operator">:=</span> <span class="token function">mySqrt</span><span class="token punctuation">(</span><span class="token number">25.0</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您会得到一个编译错误：<code>multiple-value mySqrt() in single-value context</code>。</p><p>正确的做法是：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>t<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token function">mySqrt</span><span class="token punctuation">(</span><span class="token number">25.0</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> ok <span class="token punctuation">{</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意事项 2</strong></p><p>当您将字符串转换为整数时，且确定转换一定能够成功时，可以将 <code>Atoi()</code> 函数进行一层忽略错误的封装：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> atoi <span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	n<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),P=s("code",null,"fmt",-1),A=o(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>count<span class="token punctuation">,</span> err <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">// number of bytes printed, nil or 0, error</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1),I=s("h2",{id:"链接",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),n(" 链接")],-1);function B(C,N){const a=c("RouterLink");return i(),l("div",null,[r,s("p",null,[n("Go 语言的函数经常使用两个返回值来表示执行是否成功：返回某个值以及 "),d,n(" 表示成功；返回零值（或 "),k,n("）和 "),v,n(" 表示失败（"),t(a,{to:"/the-way-to-go/04.4.html"},{default:e(()=>[n("第 4.4 节")]),_:1}),n("）。当不使用 "),m,n(" 或 "),g,n(" 的时候，也可以使用一个 "),b,n(" 类型的变量来代替作为第二个返回值：成功执行的话，"),f,n(" 的值为 "),h,n("，否则就会包含相应的错误信息（Go 语言中的错误类型为 "),_,n(": "),w,n("，我们将会在"),t(a,{to:"/the-way-to-go/13.0.html"},{default:e(()=>[n("第 13 章")]),_:1}),n(" 进行更多地讨论）。这样一来，就很明显需要用一个 "),y,n(" 语句来测试执行结果；由于其符号的原因，这样的形式又称之为“逗号 ok 模式”(comma, ok pattern)。")]),s("p",null,[n("在"),t(a,{to:"/the-way-to-go/04.7.html"},{default:e(()=>[n("第 4.7 节")]),_:1}),n(" 的程序 "),x,n(" 中，函数 "),q,n(" 的作用是将一个字符串转换为一个整数。之前我们忽略了相关的错误检查：")]),S,s("p",null,[n("实际上，"),P,n(" 包（"),t(a,{to:"/the-way-to-go/04.4.html"},{default:e(()=>[n("第 4.4.3 节")]),_:1}),n("）最简单的打印函数也有 2 个返回值：")]),A,s("p",null,[n("当打印到控制台时，可以将该函数返回的错误忽略；但当输出到文件流、网络流等具有不确定因素的输出对象时，应该始终检查是否有错误发生（另见"),t(a,{to:"/the-way-to-go/06.1.html"},{default:e(()=>[n("练习 6.1b")]),_:1}),n("）。")]),I,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/05.1.html"},{default:e(()=>[n("if-else 结构")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/05.3.html"},{default:e(()=>[n("switch 结构")]),_:1})])])])}const E=p(u,[["render",B],["__file","05.2.html.vue"]]);export{E as default};