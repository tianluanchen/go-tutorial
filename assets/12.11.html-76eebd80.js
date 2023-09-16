import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as i,a as s,b as n,d as t,w as e,e as l}from"./app-9da01d16.js";const u={},r=s("h1",{id:"_12-11-用-gob-传输数据",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_12-11-用-gob-传输数据","aria-hidden":"true"},"#"),n(" 12.11 用 Gob 传输数据")],-1),d=s("p",null,[n("Gob 是 Go 自己的以二进制形式序列化和反序列化程序数据的格式；可以在 "),s("code",null,"encoding"),n(' 包中找到。这种格式的数据简称为 Gob （即 Go binary 的缩写）。类似于 Python 的 "pickle" 和 Java 的 "Serialization"。')],-1),k=s("code",null,"rpc",-1),v=s("br",null,null,-1),m=s("br",null,null,-1),b=s("br",null,null,-1),g=l(`<p>Gob 文件或流是完全自描述的：里面包含的所有类型都有一个对应的描述，并且总是可以用 Go 解码，而不需要了解文件的内容。</p><p>只有可导出的字段会被编码，零值会被忽略。在解码结构体的时候，只有同时匹配名称和可兼容类型的字段才会被解码。当源数据类型增加新字段后，Gob 解码客户端仍然可以以这种方式正常工作：解码客户端会继续识别以前存在的字段。并且还提供了很大的灵活性，比如在发送者看来，整数被编码成没有固定长度的可变长度，而忽略具体的 Go 类型。</p><p>假如在发送者这边有一个有结构 T：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> T <span class="token keyword">struct</span> <span class="token punctuation">{</span> X<span class="token punctuation">,</span> Y<span class="token punctuation">,</span> Z <span class="token builtin">int</span> <span class="token punctuation">}</span>
<span class="token keyword">var</span> t <span class="token operator">=</span> T<span class="token punctuation">{</span>X<span class="token punctuation">:</span> <span class="token number">7</span><span class="token punctuation">,</span> Y<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> Z<span class="token punctuation">:</span> <span class="token number">8</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>而在接收者这边可以用一个结构体 U 类型的变量 u 来接收这个值：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> U <span class="token keyword">struct</span> <span class="token punctuation">{</span> X<span class="token punctuation">,</span> Y <span class="token operator">*</span><span class="token builtin">int8</span> <span class="token punctuation">}</span>
<span class="token keyword">var</span> u U
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在接收者中，<code>X</code> 的值是 <code>7</code>，<code>Y</code> 的值是 <code>0</code>（<code>Y</code> 的值并没有从 <code>t</code> 中传递过来，因为它是零值）</p><p>和 JSON 的使用方式一样，Gob 使用通用的 <code>io.Writer</code> 接口，通过 <code>NewEncoder()</code> 函数创建 <code>Encoder</code> 对象并调用 <code>Encode()</code>；相反的过程使用通用的 <code>io.Reader</code> 接口，通过 <code>NewDecoder()</code> 函数创建 <code>Decoder</code> 对象并调用 <code>Decode()</code>。</p><p>我们把示例 12.12 的信息写进名为 vcard.gob 的文件作为例子。这会产生一个文本可读数据和二进制数据的混合，当你试着在文本编辑中打开的时候会看到。</p><p>在示例 12.18 中你会看到一个编解码，并且以字节缓冲模拟网络传输的简单例子：</p><p>示例 12.18 <a href="examples/chapter_12/gob1.go">gob1.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// gob1.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;encoding/gob&quot;</span>
	<span class="token string">&quot;log&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> P <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y<span class="token punctuation">,</span> Z <span class="token builtin">int</span>
	Name    <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Q <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y <span class="token operator">*</span><span class="token builtin">int32</span>
	Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Initialize the encoder and decoder.  Normally enc and dec would be      </span>
	<span class="token comment">// bound to network connections and the encoder and decoder would      </span>
	<span class="token comment">// run in different processes.      </span>
	<span class="token keyword">var</span> network bytes<span class="token punctuation">.</span>Buffer   <span class="token comment">// Stand-in for a network connection      </span>
	enc <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>network<span class="token punctuation">)</span> <span class="token comment">// Will write to network.      </span>
	dec <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>network<span class="token punctuation">)</span>	<span class="token comment">// Will read from network.      </span>
	<span class="token comment">// Encode (send) the value.      </span>
	err <span class="token operator">:=</span> enc<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>P<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&quot;Pythagoras&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;encode error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// Decode (receive) the value.      </span>
	<span class="token keyword">var</span> q Q
	err <span class="token operator">=</span> dec<span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>q<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;decode error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q: {%d,%d}\\n&quot;</span><span class="token punctuation">,</span> q<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> q<span class="token punctuation">.</span>X<span class="token punctuation">,</span> q<span class="token punctuation">.</span>Y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// Output:   &quot;Pythagoras&quot;: {3,4}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 12.19 <a href="examples/chapter_12/gob2.go">gob2.go</a> 编码到文件：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// gob2.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/gob&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Address <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Type             <span class="token builtin">string</span>
	City             <span class="token builtin">string</span>
	Country          <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> VCard <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	FirstName	<span class="token builtin">string</span>
	LastName	<span class="token builtin">string</span>
	Addresses	<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Address
	Remark		<span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> content	<span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	pa <span class="token operator">:=</span> <span class="token operator">&amp;</span>Address<span class="token punctuation">{</span><span class="token string">&quot;private&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Aartselaar&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;Belgium&quot;</span><span class="token punctuation">}</span>
	wa <span class="token operator">:=</span> <span class="token operator">&amp;</span>Address<span class="token punctuation">{</span><span class="token string">&quot;work&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Boom&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Belgium&quot;</span><span class="token punctuation">}</span>
	vc <span class="token operator">:=</span> VCard<span class="token punctuation">{</span><span class="token string">&quot;Jan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kersschot&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Address<span class="token punctuation">{</span>pa<span class="token punctuation">,</span>wa<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">}</span>
	<span class="token comment">// fmt.Printf(&quot;%v: \\n&quot;, vc) // {Jan Kersschot [0x126d2b80 0x126d2be0] none}:</span>
	<span class="token comment">// using an encoder:</span>
	file<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span><span class="token string">&quot;vcard.gob&quot;</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_WRONLY<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> file<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	enc <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span>
	err <span class="token operator">:=</span> enc<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>vc<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Error in encoding gob&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 12.8</strong>：<a href="exercises/chapter_12/degob.go">degob.go</a>：</p><p>写一个程序读取 vcard.gob 文件，解码并打印它的内容。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,17);function q(f,w){const a=p("RouterLink");return c(),i("div",null,[r,d,s("p",null,[n("Gob 通常用于远程方法调用（RPCs，参见 "),t(a,{to:"/the-way-to-go/15.9.html"},{default:e(()=>[n("15.9 节")]),_:1}),n("的 "),k,n(" 包）参数和结果的传输，以及应用程序和机器之间的数据传输。"),v,n(" 它和 JSON 或 XML 有什么不同呢？Gob 特定地用于纯 Go 的环境中，例如，两个用 Go 写的服务之间的通信。这样的话服务可以被实现得更加高效和优化。"),m,n(" Gob 不是可外部定义，语言无关的编码方式。因此它的首选格式是二进制，而不是像 JSON 和 XML 那样的文本格式。"),b,n(" Gob 并不是一种不同于 Go 的语言，而是在编码和解码过程中用到了 Go 的反射。")]),g,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/12.10.html"},{default:e(()=>[n("XML 数据格式")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/12.12.html"},{default:e(()=>[n("Go 中的密码学")]),_:1})])])])}const _=o(u,[["render",q],["__file","12.11.html.vue"]]);export{_ as default};
