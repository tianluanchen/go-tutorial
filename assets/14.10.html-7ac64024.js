import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as s,d as t,w as e,b as n,e as l}from"./app-9da01d16.js";const u={},r=l(`<h1 id="_14-10-复用" tabindex="-1"><a class="header-anchor" href="#_14-10-复用" aria-hidden="true">#</a> 14.10 复用</h1><h2 id="_14-10-1-典型的客户端-服务器-c-s-模式" tabindex="-1"><a class="header-anchor" href="#_14-10-1-典型的客户端-服务器-c-s-模式" aria-hidden="true">#</a> 14.10.1 典型的客户端/服务器（C/S）模式</h2><p>客户端-服务器应用正是 goroutines 和 channels 的亮点所在。</p><p>客户端 (Client) 可以是运行在任意设备上的任意程序，它会按需发送请求 (request) 至服务器。服务器 (Server) 接收到这个请求后开始相应的工作，然后再将响应 (response) 返回给客户端。典型情况下一般是多个客户端（即多个请求）对应一个（或少量）服务器。例如我们日常使用的浏览器客户端，其功能就是向服务器请求网页。而 Web 服务器则会向浏览器响应网页数据。</p><p>使用 Go 的服务器通常会在协程中执行向客户端的响应，故而会对每一个客户端请求启动一个协程。一个常用的操作方法是客户端请求自身中包含一个通道，而服务器则向这个通道发送响应。</p><p>例如下面这个 <code>Request</code> 结构，其中内嵌了一个 <code>replyc</code> 通道。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Request <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    a<span class="token punctuation">,</span> b      <span class="token builtin">int</span>    
    replyc    <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token comment">// reply channel inside the Request</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者更通俗的：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Reply <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
<span class="token keyword">type</span> Request <span class="token keyword">struct</span><span class="token punctuation">{</span>
    arg1<span class="token punctuation">,</span> arg2<span class="token punctuation">,</span> arg3 some_type
    replyc <span class="token keyword">chan</span> <span class="token operator">*</span>Reply
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来先使用简单的形式,服务器会为每一个请求启动一个协程并在其中执行 <code>run()</code> 函数，此举会将类型为 <code>binOp</code> 的 <code>op</code> 操作返回的 <code>int</code> 值发送到 <code>replyc</code> 通道。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> binOp <span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">,</span> req <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    req<span class="token punctuation">.</span>replyc <span class="token operator">&lt;-</span> <span class="token function">op</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>a<span class="token punctuation">,</span> req<span class="token punctuation">.</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>server()</code> 协程会无限循环以从 <code>chan *Request</code> 接收请求，并且为了避免被长时间操作所堵塞，它将为每一个请求启动一个协程来做具体的工作：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">server</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">,</span> service <span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        req <span class="token operator">:=</span> <span class="token operator">&lt;-</span>service<span class="token punctuation">;</span> <span class="token comment">// requests arrive here  </span>
        <span class="token comment">// start goroutine for request:        </span>
        <span class="token keyword">go</span> <span class="token function">run</span><span class="token punctuation">(</span>op<span class="token punctuation">,</span> req<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// don’t wait for op to complete    </span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>server()</code> 本身则是以协程的方式在 <code>startServer()</code> 函数中启动：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">startServer</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">)</span> <span class="token keyword">chan</span> <span class="token operator">*</span>Request <span class="token punctuation">{</span>
    reqChan <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">go</span> <span class="token function">server</span><span class="token punctuation">(</span>op<span class="token punctuation">,</span> reqChan<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> reqChan<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>startServer()</code> 则会在 <code>main</code> 协程中被调用。</p><p>在以下测试例子中，100 个请求会被发送到服务器，只有它们全部被送达后我们才会按相反的顺序检查响应：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    adder <span class="token operator">:=</span> <span class="token function">startServer</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> N <span class="token operator">=</span> <span class="token number">100</span>
    <span class="token keyword">var</span> reqs <span class="token punctuation">[</span>N<span class="token punctuation">]</span>Request
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        req <span class="token operator">:=</span> <span class="token operator">&amp;</span>reqs<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        req<span class="token punctuation">.</span>a <span class="token operator">=</span> i
        req<span class="token punctuation">.</span>b <span class="token operator">=</span> i <span class="token operator">+</span> N
        req<span class="token punctuation">.</span>replyc <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
        adder <span class="token operator">&lt;-</span> req  <span class="token comment">// adder is a channel of requests</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// checks:</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> N <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span> <span class="token punctuation">{</span>
        <span class="token comment">// doesn’t matter what order</span>
        <span class="token keyword">if</span> <span class="token operator">&lt;-</span>reqs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>replyc <span class="token operator">!=</span> N<span class="token operator">+</span><span class="token number">2</span><span class="token operator">*</span>i <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>“fail at”<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>“Request “<span class="token punctuation">,</span> i<span class="token punctuation">,</span> “is ok<span class="token operator">!</span>”<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>“done”<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些代码可以在 <a href="examples/chapter_14/multiplex_server.go">multiplex_server.go</a> 找到</p><p>输出：</p><pre><code>Request 99 is ok!
Request 98 is ok!
...
Request 1 is ok!
Request 0 is ok!
done
</code></pre><p>这个程序仅启动了 100 个协程。然而即使执行 100,000 个协程我们也能在数秒内看到它完成。这说明了 Go 的协程是如何的轻量：如果我们启动相同数量的真实的线程，程序早就崩溃了。</p><p>示例： 14.14-<a href="examples/chapter_14/multiplex_server.go">multiplex_server.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Request <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a<span class="token punctuation">,</span> b   <span class="token builtin">int</span>
	replyc <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token comment">// reply channel inside the Request</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> binOp <span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">,</span> req <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	req<span class="token punctuation">.</span>replyc <span class="token operator">&lt;-</span> <span class="token function">op</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>a<span class="token punctuation">,</span> req<span class="token punctuation">.</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">server</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">,</span> service <span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		req <span class="token operator">:=</span> <span class="token operator">&lt;-</span>service <span class="token comment">// requests arrive here</span>
		<span class="token comment">// start goroutine for request:</span>
		<span class="token keyword">go</span> <span class="token function">run</span><span class="token punctuation">(</span>op<span class="token punctuation">,</span> req<span class="token punctuation">)</span> <span class="token comment">// don&#39;t wait for op</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">startServer</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">)</span> <span class="token keyword">chan</span> <span class="token operator">*</span>Request <span class="token punctuation">{</span>
	reqChan <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">server</span><span class="token punctuation">(</span>op<span class="token punctuation">,</span> reqChan<span class="token punctuation">)</span>
	<span class="token keyword">return</span> reqChan
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	adder <span class="token operator">:=</span> <span class="token function">startServer</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">const</span> N <span class="token operator">=</span> <span class="token number">100</span>
	<span class="token keyword">var</span> reqs <span class="token punctuation">[</span>N<span class="token punctuation">]</span>Request
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		req <span class="token operator">:=</span> <span class="token operator">&amp;</span>reqs<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
		req<span class="token punctuation">.</span>a <span class="token operator">=</span> i
		req<span class="token punctuation">.</span>b <span class="token operator">=</span> i <span class="token operator">+</span> N
		req<span class="token punctuation">.</span>replyc <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
		adder <span class="token operator">&lt;-</span> req
	<span class="token punctuation">}</span>
	<span class="token comment">// checks:</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> N <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span> <span class="token punctuation">{</span> <span class="token comment">// doesn&#39;t matter what order</span>
		<span class="token keyword">if</span> <span class="token operator">&lt;-</span>reqs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>replyc <span class="token operator">!=</span> N<span class="token operator">+</span><span class="token number">2</span><span class="token operator">*</span>i <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;fail at&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Request &quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token string">&quot; is ok!&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;done&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_14-10-2-卸载-teardown-通过信号通道关闭服务器" tabindex="-1"><a class="header-anchor" href="#_14-10-2-卸载-teardown-通过信号通道关闭服务器" aria-hidden="true">#</a> 14.10.2 卸载 (Teardown)：通过信号通道关闭服务器</h2><p>在上一个版本中 <code>server()</code> 在 <code>main()</code> 函数返回后并没有完全关闭，而被强制结束了。为了改进这一点，我们可以提供一个退出通道给 <code>server()</code> ：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">startServer</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">)</span> <span class="token punctuation">(</span>service <span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">,</span> quit <span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    service <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span>
    quit <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
    <span class="token keyword">go</span> <span class="token function">server</span><span class="token punctuation">(</span>op<span class="token punctuation">,</span> service<span class="token punctuation">,</span> quit<span class="token punctuation">)</span>
    <span class="token keyword">return</span> service<span class="token punctuation">,</span> quit
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>server()</code> 函数现在则使用 <code>select</code> 在 <code>service</code> 通道和 <code>quit</code> 通道之间做出选择：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">server</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">,</span> service <span class="token keyword">chan</span> <span class="token operator">*</span>request<span class="token punctuation">,</span> quit <span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token keyword">select</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> req <span class="token operator">:=</span> <span class="token operator">&lt;-</span>service<span class="token punctuation">:</span>
                <span class="token keyword">go</span> <span class="token function">run</span><span class="token punctuation">(</span>op<span class="token punctuation">,</span> req<span class="token punctuation">)</span> 
            <span class="token keyword">case</span> <span class="token operator">&lt;-</span>quit<span class="token punctuation">:</span>
                <span class="token keyword">return</span>   
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code>quit</code> 通道接收到一个 <code>true</code> 值时，<code>server</code> 就会返回并结束。</p><p>在 <code>main()</code> 函数中我们做出如下更改：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    adder<span class="token punctuation">,</span> quit <span class="token operator">:=</span> <span class="token function">startServer</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 <code>main()</code> 函数的结尾处我们放入这一行：<code>quit &lt;- true</code></p><p>完整的代码在 <a href="examples/chapter_14/multiplex_server2.go">multiplex_server2.go</a>，输出和上一个版本是一样的。</p><p>示例： 14.15-<a href="examples/chapter_14/multiplex_server2.go">multiplex_server2.go</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Request <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a<span class="token punctuation">,</span> b   <span class="token builtin">int</span>
	replyc <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token comment">// reply channel inside the Request</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> binOp <span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">,</span> req <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	req<span class="token punctuation">.</span>replyc <span class="token operator">&lt;-</span> <span class="token function">op</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>a<span class="token punctuation">,</span> req<span class="token punctuation">.</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">server</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">,</span> service <span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">,</span> quit <span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> req <span class="token operator">:=</span> <span class="token operator">&lt;-</span>service<span class="token punctuation">:</span>
			<span class="token keyword">go</span> <span class="token function">run</span><span class="token punctuation">(</span>op<span class="token punctuation">,</span> req<span class="token punctuation">)</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>quit<span class="token punctuation">:</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">startServer</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">)</span> <span class="token punctuation">(</span>service <span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">,</span> quit <span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	service <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span>
	quit <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">server</span><span class="token punctuation">(</span>op<span class="token punctuation">,</span> service<span class="token punctuation">,</span> quit<span class="token punctuation">)</span>
	<span class="token keyword">return</span> service<span class="token punctuation">,</span> quit
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	adder<span class="token punctuation">,</span> quit <span class="token operator">:=</span> <span class="token function">startServer</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">const</span> N <span class="token operator">=</span> <span class="token number">100</span>
	<span class="token keyword">var</span> reqs <span class="token punctuation">[</span>N<span class="token punctuation">]</span>Request
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		req <span class="token operator">:=</span> <span class="token operator">&amp;</span>reqs<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
		req<span class="token punctuation">.</span>a <span class="token operator">=</span> i
		req<span class="token punctuation">.</span>b <span class="token operator">=</span> i <span class="token operator">+</span> N
		req<span class="token punctuation">.</span>replyc <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
		adder <span class="token operator">&lt;-</span> req
	<span class="token punctuation">}</span>
	<span class="token comment">// checks:</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> N <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span> <span class="token punctuation">{</span> <span class="token comment">// doesn&#39;t matter what order</span>
		<span class="token keyword">if</span> <span class="token operator">&lt;-</span>reqs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>replyc <span class="token operator">!=</span> N<span class="token operator">+</span><span class="token number">2</span><span class="token operator">*</span>i <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;fail at&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Request &quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token string">&quot; is ok!&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	quit <span class="token operator">&lt;-</span> <span class="token boolean">true</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;done&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>练习 14.13 <a href="exercises/chapter_14/multiplex_server3.go">multiplex_server3.go</a>：使用之前的例子，编写一个在 <code>Request</code> 结构上带有 <code>String()</code> 方法的版本，它能决定服务器如何输出；并使用以下两个请求来测试这个程序：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    req1 <span class="token operator">:=</span> <span class="token operator">&amp;</span>Request<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
    req2 <span class="token operator">:=</span> <span class="token operator">&amp;</span>Request<span class="token punctuation">{</span><span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">250</span><span class="token punctuation">,</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
    <span class="token operator">...</span>
    <span class="token comment">// show the output</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>req1<span class="token punctuation">,</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">,</span>req2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>`,39);function k(d,v){const a=o("RouterLink");return c(),i("div",null,[r,s("ul",null,[s("li",null,[t(a,{to:"/the-way-to-go/directory.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节："),t(a,{to:"/the-way-to-go/14.9.html"},{default:e(()=>[n("实现 Futures 模式")]),_:1})]),s("li",null,[n("下一节："),t(a,{to:"/the-way-to-go/14.11.html"},{default:e(()=>[n("限制同时处理的请求数")]),_:1})])])])}const y=p(u,[["render",k],["__file","14.10.html.vue"]]);export{y as default};
