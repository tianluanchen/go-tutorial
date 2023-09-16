import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as i,c,a as s,d as e,w as t,b as n,e as l}from"./app-9da01d16.js";const u={},r=l(`<h1 id="_13-4-自定义包中的错误处理和-panicking" tabindex="-1"><a class="header-anchor" href="#_13-4-自定义包中的错误处理和-panicking" aria-hidden="true">#</a> 13.4 自定义包中的错误处理和 panicking</h1><p>这是所有自定义包实现者应该遵守的最佳实践：</p><p>1）<em>在包内部，总是应该从 panic 中 recover</em>：不允许显式的超出包范围的 <code>panic()</code></p><p>2）<em>向包的调用者返回错误值（而不是 panic）。</em></p><p>在包内部，特别是在非导出函数中有很深层次的嵌套调用时，将 panic 转换成 <code>error</code> 来告诉调用方为何出错，是很实用的（且提高了代码可读性）。</p><p>下面的代码则很好地阐述了这一点。我们有一个简单的 <code>parse</code> 包（示例 13.4）用来把输入的字符串解析为整数切片；这个包有自己特殊的 <code>ParseError</code>。</p><p>当没有东西需要转换或者转换成整数失败时，这个包会 <code>panic()</code>（在函数 <code>fields2numbers()</code> 中）。但是可导出的 <code>Parse()</code> 函数会从 <code>panic()</code> 中 <code>recover()</code> 并用所有这些信息返回一个错误给调用者。为了演示这个过程，在 <a href="examples/chapter_13/panic_recover.go">panic_recover.go</a> 中 调用了 <code>parse</code> 包（示例 13.5）；不可解析的字符串会导致错误并被打印出来。</p><p>示例 13.4 <a href="examples/chapter_13/parse/parse.go">parse.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// parse.go</span>
<span class="token keyword">package</span> parse

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// A ParseError indicates an error in converting a word into an integer.</span>
<span class="token keyword">type</span> ParseError <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Index <span class="token builtin">int</span>      <span class="token comment">// The index into the space-separated list of words.</span>
    Word  <span class="token builtin">string</span>   <span class="token comment">// The word that generated the parse error.</span>
    Err <span class="token builtin">error</span> <span class="token comment">// The raw error that precipitated this error, if any.</span>
<span class="token punctuation">}</span>

<span class="token comment">// String returns a human-readable error message.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>ParseError<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;pkg parse: error parsing %q as int&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Word<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Parse parses the space-separated words in in put as integers.</span>
<span class="token keyword">func</span> <span class="token function">Parse</span><span class="token punctuation">(</span>input <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>numbers <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> ok <span class="token builtin">bool</span>
            err<span class="token punctuation">,</span> ok <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">error</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
                err <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;pkg: %v&quot;</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    fields <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Fields</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
    numbers <span class="token operator">=</span> <span class="token function">fields2numbers</span><span class="token punctuation">(</span>fields<span class="token punctuation">)</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">fields2numbers</span><span class="token punctuation">(</span>fields <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>numbers <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>fields<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;no words to parse&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> idx<span class="token punctuation">,</span> field <span class="token operator">:=</span> <span class="token keyword">range</span> fields <span class="token punctuation">{</span>
        num<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token function">panic</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ParseError<span class="token punctuation">{</span>idx<span class="token punctuation">,</span> field<span class="token punctuation">,</span> err<span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        numbers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>numbers<span class="token punctuation">,</span> num<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 13.5 <a href="examples/chapter_13/panic_package.go">panic_package.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// panic_package.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;./parse/parse&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> examples <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
            <span class="token string">&quot;1 2 3 4 5&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;100 50 25 12.5 6.25&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;2 + 2 = 4&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;1st class&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ex <span class="token operator">:=</span> <span class="token keyword">range</span> examples <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Parsing %q:\\n  &quot;</span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span>
        nums<span class="token punctuation">,</span> err <span class="token operator">:=</span> parse<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token comment">// here String() method from ParseError is used</span>
            <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Parsing &quot;1 2 3 4 5&quot;:
  [1 2 3 4 5]
Parsing &quot;100 50 25 12.5 6.25&quot;:
  pkg: pkg parse: error parsing &quot;12.5&quot; as int
Parsing &quot;2 + 2 = 4&quot;:
  pkg: pkg parse: error parsing &quot;+&quot; as int
Parsing &quot;1st class&quot;:
  pkg: pkg parse: error parsing &quot;1st&quot; as int
Parsing &quot;&quot;:
  pkg: no words to parse
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,14);function d(k,v){const a=o("RouterLink");return i(),c("div",null,[r,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/13.3.html"},{default:t(()=>[n("从 panic 中恢复 (recover)")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/13.5.html"},{default:t(()=>[n("一种用闭包处理错误的模式")]),_:1})])])])}const g=p(u,[["render",d],["__file","13.4.html.vue"]]);export{g as default};
