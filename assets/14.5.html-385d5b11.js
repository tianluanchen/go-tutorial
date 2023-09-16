import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c as l,a as s,b as n,d as e,w as t,e as o}from"./app-9da01d16.js";const u={},d=o(`<h1 id="_14-5-通道、超时和计时器-ticker" tabindex="-1"><a class="header-anchor" href="#_14-5-通道、超时和计时器-ticker" aria-hidden="true">#</a> 14.5 通道、超时和计时器（Ticker）</h1><p><code>time</code> 包中有一些有趣的功能可以和通道组合使用。</p><p>其中就包含了 <code>time.Ticker</code> 结构体，这个对象以指定的时间间隔重复的向通道 <code>C</code> 发送时间值：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Ticker <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    C <span class="token operator">&lt;-</span><span class="token keyword">chan</span> Time <span class="token comment">// the channel on which the ticks are delivered.</span>
    <span class="token comment">// contains filtered or unexported fields</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>时间间隔的单位是 <code>ns</code>（纳秒，<code>int64</code>），在工厂函数 <code>time.NewTicker</code> 中以 <code>Duration</code> 类型的参数传入：<code>func NewTicker(dur) *Ticker</code>。</p><p>在协程周期性的执行一些事情（打印状态日志，输出，计算等等）的时候非常有用。</p><p>调用 <code>Stop()</code> 使计时器停止，在 <code>defer</code> 语句中使用。这些都很好地适应 <code>select</code> 语句:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>ticker <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">NewTicker</span><span class="token punctuation">(</span>updateInterval<span class="token punctuation">)</span>
<span class="token keyword">defer</span> ticker<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">...</span>
<span class="token keyword">select</span> <span class="token punctuation">{</span>
<span class="token keyword">case</span> u<span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch1<span class="token punctuation">:</span>
    <span class="token operator">...</span>
<span class="token keyword">case</span> v<span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch2<span class="token punctuation">:</span>
    <span class="token operator">...</span>
<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ticker<span class="token punctuation">.</span>C<span class="token punctuation">:</span>
    <span class="token function">logState</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token comment">// call some logging function logState</span>
<span class="token keyword">default</span><span class="token punctuation">:</span> <span class="token comment">// no value ready to be received</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),r=s("code",null,"time.Tick()",-1),k=s("code",null,"Tick(d Duration) <-chan Time",-1),v=s("code",null,"d",-1),m=s("code",null,"d",-1),b=s("code",null,"client.Call()",-1),g=o(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token string">&quot;time&quot;</span>

rate_per_sec <span class="token operator">:=</span> <span class="token number">10</span>
<span class="token keyword">var</span> dur Duration <span class="token operator">=</span> <span class="token number">1e9</span> <span class="token operator">/</span> rate_per_sec
chRate <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>dur<span class="token punctuation">)</span> <span class="token comment">// a tick every 1/10th of a second</span>
<span class="token keyword">for</span> req <span class="token operator">:=</span> <span class="token keyword">range</span> requests <span class="token punctuation">{</span>
    <span class="token operator">&lt;-</span> chRate <span class="token comment">// rate limit our Service.Method RPC calls</span>
    <span class="token keyword">go</span> client<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">&quot;Service.Method&quot;</span><span class="token punctuation">,</span> req<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样只会按照指定频率处理请求：<code>chRate</code> 阻塞了更高的频率。每秒处理的频率可以根据机器负载（和/或）资源的情况而增加或减少。</p><p>问题 14.1：扩展上边的代码，思考如何承载周期请求数的暴增（提示：使用带缓冲通道和计时器对象）。</p><p>定时器 (<code>Timer</code>) 结构体看上去和计时器 (<code>Ticker</code>) 结构体的确很像（构造为 <code>NewTimer(d Duration)</code>），但是它只发送一次时间，在 <code>Dration d</code> 之后。</p><p>还有 <code>time.After(d)</code> 函数，声明如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">After</span><span class="token punctuation">(</span>d Duration<span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> Time
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 <code>Duration d</code> 之后，当前时间被发到返回的通道；所以它和 <code>NewTimer(d).C</code> 是等价的；它类似 <code>Tick()</code>，但是 <code>After()</code> 只发送一次时间。下边有个很具体的示例，很好的阐明了 <code>select</code> 中 <code>default</code> 的作用：</p><p>示例 14.11：<a href="examples/chapter_14/timer_goroutine.go">timer_goroutine.go</a>：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tick <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span><span class="token number">1e8</span><span class="token punctuation">)</span>
	boom <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span><span class="token number">5e8</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>tick<span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;tick.&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>boom<span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;BOOM!&quot;</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token keyword">default</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;    .&quot;</span><span class="token punctuation">)</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5e7</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    .
    .
tick.
    .
    .
tick.
    .
    .
tick.
    .
    .
tick.
    .
    .
tick.
BOOM!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>习惯用法：简单超时模式</strong></p><p>要从通道 <code>ch</code> 中接收数据，但是最多等待 1 秒。先创建一个信号通道，然后启动一个 <code>lambda</code> 协程，协程在给通道发送数据之前是休眠的：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>timeout <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1e9</span><span class="token punctuation">)</span> <span class="token comment">// one second</span>
        timeout <span class="token operator">&lt;-</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后使用 <code>select</code> 语句接收 <code>ch</code> 或者 <code>timeout</code> 的数据：如果 <code>ch</code> 在 1 秒内没有收到数据，就选择到了 <code>time</code> 分支并放弃了 <code>ch</code> 的读取。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">select</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
        <span class="token comment">// a read from ch has occured</span>
    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>timeout<span class="token punctuation">:</span>
        <span class="token comment">// the read from ch has timed out</span>
        <span class="token keyword">break</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种形式：取消耗时很长的同步调用</p><p>也可以使用 <code>time.After()</code> 函数替换 <code>timeout-channel</code>。可以在 <code>select</code> 中通过 <code>time.After()</code> 发送的超时信号来停止协程的执行。以下代码，在 <code>timeoutNs</code> 纳秒后执行 <code>select</code> 的 <code>timeout</code> 分支后，执行 <code>client.Call</code> 的协程也随之结束，不会给通道 <code>ch</code> 返回值：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">error</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> ch <span class="token operator">&lt;-</span> client<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">&quot;Service.Method&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">,</span> <span class="token operator">&amp;</span>reply<span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token punctuation">{</span>
<span class="token keyword">case</span> resp <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch
    <span class="token comment">// use resp and reply</span>
<span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>timeoutNs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">// call timed out</span>
    <span class="token keyword">break</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意缓冲大小设置为 <code>1</code> 是必要的，可以避免协程死锁以及确保超时的通道可以被垃圾回收。此外，需要注意在有多个 <code>case</code> 符合条件时， <code>select</code> 对 <code>case</code> 的选择是伪随机的，如果上面的代码稍作修改如下，则 <code>select</code> 语句可能不会在定时器超时信号到来时立刻选中 <code>time.After(timeoutNs)</code> 对应的 <code>case</code>，因此协程可能不会严格按照定时器设置的时间结束。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">for</span> <span class="token punctuation">{</span> ch <span class="token operator">&lt;-</span> <span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token punctuation">)</span>
L<span class="token punctuation">:</span>
<span class="token keyword">for</span> <span class="token punctuation">{</span>
    <span class="token keyword">select</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
        <span class="token comment">// do something</span>
    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>timeoutNs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment">// call timed out</span>
        <span class="token keyword">break</span> L
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三种形式：假设程序从多个复制的数据库同时读取。只需要一个答案，需要接收首先到达的答案，<code>Query</code> 函数获取数据库的连接切片并请求。并行请求每一个数据库并返回收到的第一个响应：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Query</span><span class="token punctuation">(</span>conns <span class="token punctuation">[</span><span class="token punctuation">]</span>Conn<span class="token punctuation">,</span> query <span class="token builtin">string</span><span class="token punctuation">)</span> Result <span class="token punctuation">{</span>
    ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Result<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> conn <span class="token operator">:=</span> <span class="token keyword">range</span> conns <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">select</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> ch <span class="token operator">&lt;-</span> c<span class="token punctuation">.</span><span class="token function">DoQuery</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;-</span> ch
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次声明，结果通道 <code>ch</code> 必须是带缓冲的：以保证第一个发送进来的数据有地方可以存放，确保放入的首个数据总会成功，所以第一个到达的值会被获取而与执行的顺序无关。正在执行的协程可以总是可以使用 <code>runtime.Goexit()</code> 来停止。</p><p>在应用中缓存数据：</p><p>应用程序中用到了来自数据库（或者常见的数据存储）的数据时，经常会把数据缓存到内存中，因为从数据库中获取数据的操作代价很高；如果数据库中的值不发生变化就没有问题。但是如果值有变化，我们需要一个机制来周期性的从数据库重新读取这些值：缓存的值就不可用（过期）了，而且我们也不希望用户看到陈旧的数据。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,27);function h(f,y){const a=p("RouterLink");return i(),l("div",null,[d,s("p",null,[r,n(" 函数声明为 "),k,n("，当你想返回一个通道而不必关闭它的时候这个函数非常有用：它以 "),v,n(" 为周期给返回的通道发送时间，"),m,n(" 是纳秒数。如果需要，像下边的代码一样，可以限制处理频率（函数 "),b,n(" 是一个 RPC 调用，这里暂不赘述（参见第 "),e(a,{to:"/the-way-to-go/15.9.html"},{default:t(()=>[n("15.9")]),_:1}),n(" 节））：")]),g,s("ul",null,[s("li",null,[e(a,{to:"/the-way-to-go/directory.html"},{default:t(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),e(a,{to:"/the-way-to-go/14.4.html"},{default:t(()=>[n("使用select切换协程")]),_:1})]),s("li",null,[n("下一节："),e(a,{to:"/the-way-to-go/14.6.html"},{default:t(()=>[n("协程和恢复（recover）")]),_:1})])])])}const x=c(u,[["render",h],["__file","14.5.html.vue"]]);export{x as default};
