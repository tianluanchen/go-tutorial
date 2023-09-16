import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as s,d as t,w as p,b as n,e as u}from"./app-9da01d16.js";const i={},r=u(`<h1 id="_8-6-将-map-的键值对调" tabindex="-1"><a class="header-anchor" href="#_8-6-将-map-的键值对调" aria-hidden="true">#</a> 8.6 将 map 的键值对调</h1><p>这里对调是指调换 key 和 value。如果 <code>map</code> 的值类型可以作为 key 且所有的 value 是唯一的，那么通过下面的方法可以简单的做到键值对调。</p><p>示例 8.7 <a href="examples/chapter_8/invert_map.go">invert_map.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	barVal <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token string">&quot;alpha&quot;</span><span class="token punctuation">:</span> <span class="token number">34</span><span class="token punctuation">,</span> <span class="token string">&quot;bravo&quot;</span><span class="token punctuation">:</span> <span class="token number">56</span><span class="token punctuation">,</span> <span class="token string">&quot;charlie&quot;</span><span class="token punctuation">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
							<span class="token string">&quot;delta&quot;</span><span class="token punctuation">:</span> <span class="token number">87</span><span class="token punctuation">,</span> <span class="token string">&quot;echo&quot;</span><span class="token punctuation">:</span> <span class="token number">56</span><span class="token punctuation">,</span> <span class="token string">&quot;foxtrot&quot;</span><span class="token punctuation">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
							<span class="token string">&quot;golf&quot;</span><span class="token punctuation">:</span> <span class="token number">34</span><span class="token punctuation">,</span> <span class="token string">&quot;hotel&quot;</span><span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token string">&quot;indio&quot;</span><span class="token punctuation">:</span> <span class="token number">87</span><span class="token punctuation">,</span>
							<span class="token string">&quot;juliet&quot;</span><span class="token punctuation">:</span> <span class="token number">65</span><span class="token punctuation">,</span> <span class="token string">&quot;kili&quot;</span><span class="token punctuation">:</span> <span class="token number">43</span><span class="token punctuation">,</span> <span class="token string">&quot;lima&quot;</span><span class="token punctuation">:</span> <span class="token number">98</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	invMap <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>barVal<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> barVal <span class="token punctuation">{</span>
		invMap<span class="token punctuation">[</span>v<span class="token punctuation">]</span> <span class="token operator">=</span> k
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;inverted:&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> invMap <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Key: %v, Value: %v / &quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><pre><code>inverted:
Key: 34, Value: golf / Key: 23, Value: charlie / Key: 16, Value: hotel / Key: 87, Value: delta / Key: 98, Value: lima / Key: 12, Value: foxtrot / Key: 43, Value: kili / Key: 56, Value: bravo / Key: 65, Value: juliet /
</code></pre><p>如果原始 value 值不唯一那这么做肯定会出问题；这种情况下不会报错，但是当遇到不唯一的 key 时应当直接停止对调，且此时对调后的 <code>map</code> 很可能没有包含原 <code>map</code> 的所有键值对！一种解决方法就是仔细检查唯一性并且使用多值 <code>map</code>，比如使用 <code>map[int][]string</code> 类型。</p><p><strong>练习 8.2</strong> <a href="exercises/chapter_8/map_drinks.go">map_drinks.go</a></p><p>构造一个将英文饮料名映射为法语（或者任意你的母语）的集合；先打印所有的饮料，然后打印原名和翻译后的名字。接下来按照英文名排序后再打印出来。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,10);function k(d,m){const a=o("RouterLink");return c(),l("div",null,[r,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:p(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/08.5.html"},{default:p(()=>[n("map 的排序")]),_:1})]),s("li",null,[n("下一章："),t(a,{to:"/the-way-to-go/09.0.html"},{default:p(()=>[n("包 (package)")]),_:1})])])])}const g=e(i,[["render",k],["__file","08.6.html.vue"]]);export{g as default};
