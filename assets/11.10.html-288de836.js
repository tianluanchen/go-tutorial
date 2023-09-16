import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as s,b as n,d as t,w as e,e as l}from"./app-9da01d16.js";const u={},d=s("h1",{id:"_11-10-反射包",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_11-10-反射包","aria-hidden":"true"},"#"),n(" 11.10 反射包")],-1),r=s("h2",{id:"_11-10-1-方法和类型的反射",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_11-10-1-方法和类型的反射","aria-hidden":"true"},"#"),n(" 11.10.1 方法和类型的反射")],-1),k=l(`<p>变量的最基本信息就是类型和值：反射包的 <code>Type</code> 用来表示一个 Go 类型，反射包的 <code>Value</code> 为 Go 值提供了反射接口。</p><p>两个简单的函数，<code>reflect.TypeOf</code> 和 <code>reflect.ValueOf</code>，返回被检查对象的类型和值。例如，x 被定义为：<code>var x float64 = 3.4</code>，那么 <code>reflect.TypeOf(x)</code> 返回 <code>float64</code>，<code>reflect.ValueOf(x)</code> 返回 <code>&lt;float64 Value&gt;</code></p><p>实际上，反射是通过检查一个接口的值，变量首先被转换成空接口。这从下面两个函数签名能够很明显的看出来：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TypeOf</span><span class="token punctuation">(</span>i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> Type
<span class="token keyword">func</span> <span class="token function">ValueOf</span><span class="token punctuation">(</span>i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> Value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接口的值包含一个 type 和 value。</p><p>反射可以从接口值反射到对象，也可以从对象反射回接口值。</p><p><code>reflect.Type</code> 和 <code>reflect.Value</code> 都有许多方法用于检查和操作它们。一个重要的例子是 <code>Value</code> 有一个 <code>Type()</code> 方法返回 <code>reflect.Value</code> 的 <code>Type</code> 类型。另一个是 <code>Type</code> 和 <code>Value</code> 都有 <code>Kind()</code> 方法返回一个常量来表示类型：<code>Uint</code>、<code>Float64</code>、<code>Slice</code> 等等。同样 <code>Value</code> 有叫做 <code>Int()</code> 和 <code>Float()</code> 的方法可以获取存储在内部的值（跟 <code>int64</code> 和 <code>float64</code> 一样）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
	Invalid Kind <span class="token operator">=</span> <span class="token boolean">iota</span>
	Bool
	Int
	Int8
	Int16
	Int32
	Int64
	Uint
	Uint8
	Uint16
	Uint32
	Uint64
	Uintptr
	Float32
	Float64
	Complex64
	Complex128
	Array
	Chan
	Func
	Interface
	Map
	Ptr
	Slice
	String
	Struct
	UnsafePointer
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 <code>float64</code> 类型的变量 <code>x</code>，如果 <code>v:=reflect.ValueOf(x)</code>，那么 <code>v.Kind()</code> 返回 <code>reflect.Float64</code> ，所以下面的表达式是 <code>true</code>：<code>v.Kind() == reflect.Float64</code></p><p><code>Kind()</code> 总是返回底层类型：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> MyInt <span class="token builtin">int</span>
<span class="token keyword">var</span> m MyInt <span class="token operator">=</span> <span class="token number">5</span>
v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法 <code>v.Kind()</code> 返回 <code>reflect.Int</code>。</p><p>变量 <code>v</code> 的 <code>Interface()</code> 方法可以得到还原（接口）值，所以可以这样打印 <code>v</code> 的值：<code>fmt.Println(v.Interface())</code></p><p>尝试运行下面的代码：</p><p>示例 11.11 <a href="examples/chapter_11/reflect1.go">reflect1.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// blog: Laws of Reflection</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> x <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">3.4</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;type:&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;value:&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;type:&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;kind:&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;value:&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Float</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;value is %5.2e\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	y <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">float64</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type: float64
value: 3.4
type: float64
kind: float64
value: 3.4
3.4
value is 3.40e+00
3.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>x</code> 是一个 <code>float64</code> 类型的值，<code>reflect.ValueOf(x).Float()</code> 返回这个 <code>float64</code> 类型的实际值；同样的适用于 <code>Int(), Bool(), Complex(), String()</code></p><h2 id="_11-10-2-通过反射修改-设置-值" tabindex="-1"><a class="header-anchor" href="#_11-10-2-通过反射修改-设置-值" aria-hidden="true">#</a> 11.10.2 通过反射修改（设置）值</h2><p>继续前面的例子（参阅 11.9 <a href="examples/chapter_11/reflect2.go">reflect2.go</a>），假设我们要把 <code>x</code> 的值改为 <code>3.1415</code>。<code>Value</code> 有一些方法可以完成这个任务，但是必须小心使用：<code>v.SetFloat(3.1415)</code>。</p><p>这将产生一个错误：<code>reflect.Value.SetFloat using unaddressable value</code>。</p><p>为什么会这样呢？问题的原因是 <code>v</code> 不是可设置的（这里并不是说值不可寻址）。是否可设置是 <code>Value</code> 的一个属性，并且不是所有的反射值都有这个属性：可以使用 <code>CanSet()</code> 方法测试是否可设置。</p><p>在例子中我们看到 <code>v.CanSet()</code> 返回 <code>false</code>： <code>settability of v: false</code></p><p>当 <code>v := reflect.ValueOf(x)</code> 函数通过传递一个 <code>x</code> 拷贝创建了 <code>v</code>，那么 <code>v</code> 的改变并不能更改原始的 <code>x</code>。要想 <code>v</code> 的更改能作用到 <code>x</code>，那就必须传递 x 的地址 <code>v = reflect.ValueOf(&amp;x)</code>。</p><p>通过 <code>Type()</code> 我们看到 <code>v</code> 现在的类型是 <code>*float64</code> 并且仍然是不可设置的。</p><p>要想让其可设置我们需要使用 <code>Elem()</code> 函数，这间接地使用指针：<code>v = v.Elem()</code></p><p>现在 <code>v.CanSet()</code> 返回 <code>true</code> 并且 <code>v.SetFloat(3.1415)</code> 设置成功了！</p><p>示例 11.12 <a href="examples/chapter_11/reflect2.go">reflect2.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> x <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">3.4</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	<span class="token comment">// setting a value:</span>
	<span class="token comment">// v.SetFloat(3.1415) // Error: will panic: reflect.Value.SetFloat using unaddressable value</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;settability of v:&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">CanSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	v <span class="token operator">=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">)</span> <span class="token comment">// Note: take the address of x.</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;type of v:&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;settability of v:&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">CanSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	v <span class="token operator">=</span> v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;The Elem of v is: &quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;settability of v:&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">CanSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	v<span class="token punctuation">.</span><span class="token function">SetFloat</span><span class="token punctuation">(</span><span class="token number">3.1415</span><span class="token punctuation">)</span> <span class="token comment">// this works!</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>settability of v: false
type of v: *float64
settability of v: false
The Elem of v is:  &lt;float64 Value&gt;
settability of v: true
3.1415
&lt;float64 Value&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>反射中有些内容是需要用地址去改变它的状态的。</p><h2 id="_11-10-3-反射结构" tabindex="-1"><a class="header-anchor" href="#_11-10-3-反射结构" aria-hidden="true">#</a> 11.10.3 反射结构</h2><p>有些时候需要反射一个结构类型。<code>NumField()</code> 方法返回结构内的字段数量；通过一个 <code>for</code> 循环用索引取得每个字段的值 <code>Field(i)</code>。</p><p>我们同样能够调用签名在结构上的方法，例如，使用索引 <code>n</code> 来调用：<code>Method(n).Call(nil)</code>。</p><p>示例 11.13 <a href="examples/chapter_11/reflect_struct.go">reflect_struct.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> NotknownType <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	s1<span class="token punctuation">,</span> s2<span class="token punctuation">,</span> s3 <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>n NotknownType<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> n<span class="token punctuation">.</span>s1 <span class="token operator">+</span> <span class="token string">&quot; - &quot;</span> <span class="token operator">+</span> n<span class="token punctuation">.</span>s2 <span class="token operator">+</span> <span class="token string">&quot; - &quot;</span> <span class="token operator">+</span> n<span class="token punctuation">.</span>s3
<span class="token punctuation">}</span>

<span class="token comment">// variable to investigate:</span>
<span class="token keyword">var</span> secret <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">=</span> NotknownType<span class="token punctuation">{</span><span class="token string">&quot;Ada&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Oberon&quot;</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	value <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span> <span class="token comment">// &lt;main.NotknownType Value&gt;</span>
	typ <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span>    <span class="token comment">// main.NotknownType</span>
	<span class="token comment">// alternative:</span>
	<span class="token comment">// typ := value.Type()  // main.NotknownType</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>typ<span class="token punctuation">)</span>
	knd <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// struct</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>knd<span class="token punctuation">)</span>

	<span class="token comment">// iterate through the fields of the struct:</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> value<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Field %d: %v\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> value<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token comment">// error: panic: reflect.Value.SetString using value obtained using unexported field</span>
		<span class="token comment">// value.Field(i).SetString(&quot;C#&quot;)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// call the first method, which is String():</span>
	results <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span> <span class="token comment">// [Ada - Go - Oberon]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>main.NotknownType
struct
Field 0: Ada
Field 1: Go
Field 2: Oberon
[Ada - Go - Oberon]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果尝试更改一个值，会得到一个错误：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>panic: reflect.Value.SetString using value obtained using unexported field
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是因为结构中只有被导出字段（首字母大写）才是可设置的；来看下面的例子：</p><p>示例 11.14 <a href="examples/chapter_11/reflect_struct2.go">reflect_struct2.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> T <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	A <span class="token builtin">int</span>
	B <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	t <span class="token operator">:=</span> T<span class="token punctuation">{</span><span class="token number">23</span><span class="token punctuation">,</span> <span class="token string">&quot;skidoo&quot;</span><span class="token punctuation">}</span>
	s <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	typeOfT <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		f <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d: %s %s = %v\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span>
			typeOfT<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">,</span> f<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> f<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	s<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetInt</span><span class="token punctuation">(</span><span class="token number">77</span><span class="token punctuation">)</span>
	s<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetString</span><span class="token punctuation">(</span><span class="token string">&quot;Sunset Strip&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;t is now&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0: A int = 23
1: B string = skidoo
t is now {77 Sunset Strip}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>附录 37 深入阐述了反射概念。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,49);function v(m,f){const a=o("RouterLink");return c(),i("div",null,[d,r,s("p",null,[n("在 "),t(a,{to:"/the-way-to-go/10.4.html"},{default:e(()=>[n("10.4")]),_:1}),n(" 节我们看到可以通过反射来分析一个结构体。本节我们进一步探讨强大的反射功能。反射是用程序检查其所拥有的结构，尤其是类型的一种能力；这是元编程的一种形式。反射可以在运行时检查类型和变量，例如：它的大小、它的方法以及它能“动态地”调用这些方法。这对于没有源代码的包尤其有用。这是一个强大的工具，除非真得有必要，否则应当避免使用或小心使用。")]),k,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/11.9.html"},{default:e(()=>[n("空接口")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/11.11.html"},{default:e(()=>[n("Printf 和反射")]),_:1})])])])}const y=p(u,[["render",v],["__file","11.10.html.vue"]]);export{y as default};
