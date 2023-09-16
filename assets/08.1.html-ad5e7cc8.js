import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as c,c as v,a as n,b as e,d as i,w as r,e as l}from"./app-9da01d16.js";const o="/go-tutorial/assets/8.1.socket-7bc9b321.png?raw=true",u={},m=l('<h1 id="_8-1-socket编程" tabindex="-1"><a class="header-anchor" href="#_8-1-socket编程" aria-hidden="true">#</a> 8.1 Socket编程</h1><p>在很多底层网络应用开发者的眼里一切编程都是Socket，话虽然有点夸张，但却也几乎如此了，现在的网络编程几乎都是用Socket来编程。你想过这些情景么？我们每天打开浏览器浏览网页时，浏览器进程怎么和Web服务器进行通信的呢？当你用QQ聊天时，QQ进程怎么和服务器或者是你的好友所在的QQ进程进行通信的呢？当你打开PPstream观看视频时，PPstream进程如何与视频服务器进行通信的呢？ 如此种种，都是靠Socket来进行通信的，以一斑窥全豹，可见Socket编程在现代编程中占据了多么重要的地位，这一节我们将介绍Go语言中如何进行Socket编程。</p><h2 id="什么是socket" tabindex="-1"><a class="header-anchor" href="#什么是socket" aria-hidden="true">#</a> 什么是Socket？</h2><p>Socket起源于Unix，而Unix基本哲学之一就是“一切皆文件”，都可以用“打开open –&gt; 读写write/read –&gt; 关闭close”模式来操作。Socket就是该模式的一个实现，网络的Socket数据传输是一种特殊的I/O，Socket也是一种文件描述符。Socket也具有一个类似于打开文件的函数调用：Socket()，该函数返回一个整型的Socket描述符，随后的连接建立、数据传输等操作都是通过该Socket实现的。</p><p>常用的Socket类型有两种：流式Socket（SOCK_STREAM）和数据报式Socket（SOCK_DGRAM）。流式是一种面向连接的Socket，针对于面向连接的TCP服务应用；数据报式Socket是一种无连接的Socket，对应于无连接的UDP服务应用。</p><h2 id="socket如何通信" tabindex="-1"><a class="header-anchor" href="#socket如何通信" aria-hidden="true">#</a> Socket如何通信</h2><p>网络中的进程之间如何通过Socket通信呢？首要解决的问题是如何唯一标识一个进程，否则通信无从谈起！在本地可以通过进程PID来唯一标识一个进程，但是在网络中这是行不通的。其实TCP/IP协议族已经帮我们解决了这个问题，网络层的“ip地址”可以唯一标识网络中的主机，而传输层的“协议+端口”可以唯一标识主机中的应用程序（进程）。这样利用三元组（ip地址，协议，端口）就可以标识网络的进程了，网络中需要互相通信的进程，就可以利用这个标志在他们之间进行交互。请看下面这个TCP/IP协议结构图</p><figure><img src="'+o+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图8.1 七层网络协议图</p><p>使用TCP/IP协议的应用程序通常采用应用编程接口：UNIX BSD的套接字（socket）和UNIX System V的TLI（已经被淘汰），来实现网络进程之间的通信。就目前而言，几乎所有的应用程序都是采用socket，而现在又是网络时代，网络中进程通信是无处不在，这就是为什么说“一切皆Socket”。</p><h2 id="socket基础知识" tabindex="-1"><a class="header-anchor" href="#socket基础知识" aria-hidden="true">#</a> Socket基础知识</h2><p>通过上面的介绍我们知道Socket有两种：TCP Socket和UDP Socket，TCP和UDP是协议，而要确定一个进程的需要三元组，需要IP地址和端口。</p><h3 id="ipv4地址" tabindex="-1"><a class="header-anchor" href="#ipv4地址" aria-hidden="true">#</a> IPv4地址</h3><p>目前的全球因特网所采用的协议族是TCP/IP协议。IP是TCP/IP协议中网络层的协议，是TCP/IP协议族的核心协议。目前主要采用的IP协议的版本号是4(简称为IPv4)，发展至今已经使用了30多年。</p><p>IPv4的地址位数为32位，也就是最多有2的32次方的网络设备可以联到Internet上。近十年来由于互联网的蓬勃发展，IP位址的需求量愈来愈大，使得IP位址的发放愈趋紧张，前一段时间，据报道IPV4的地址已经发放完毕，我们公司目前很多服务器的IP都是一个宝贵的资源。</p><p>地址格式类似这样：127.0.0.1 172.122.121.111</p><h3 id="ipv6地址" tabindex="-1"><a class="header-anchor" href="#ipv6地址" aria-hidden="true">#</a> IPv6地址</h3><p>IPv6是下一版本的互联网协议，也可以说是下一代互联网的协议，它是为了解决IPv4在实施过程中遇到的各种问题而被提出的，IPv6采用128位地址长度，几乎可以不受限制地提供地址。按保守方法估算IPv6实际可分配的地址，整个地球的每平方米面积上仍可分配1000多个地址。在IPv6的设计过程中除了一劳永逸地解决了地址短缺问题以外，还考虑了在IPv4中解决不好的其它问题，主要有端到端IP连接、服务质量（QoS）、安全性、多播、移动性、即插即用等。</p><p>地址格式类似这样：2002:c0e8:82e7:0:0:0:c0e8:82e7</p><h3 id="go支持的ip类型" tabindex="-1"><a class="header-anchor" href="#go支持的ip类型" aria-hidden="true">#</a> Go支持的IP类型</h3><p>在Go的<code>net</code>包中定义了很多类型、函数和方法用来网络编程，其中IP的定义如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type IP []byte

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>net</code>包中有很多函数来操作IP，但是其中比较有用的也就几个，其中<code>ParseIP(s string) IP</code>函数会把一个IPv4或者IPv6的地址转化成IP类型，请看下面的例子:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main
import (
	&quot;net&quot;
	&quot;os&quot;
	&quot;fmt&quot;
)
func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, &quot;Usage: %s ip-addr\\n&quot;, os.Args[0])
		os.Exit(1)
	}
	name := os.Args[1]
	addr := net.ParseIP(name)
	if addr == nil {
		fmt.Println(&quot;Invalid address&quot;)
	} else {
		fmt.Println(&quot;The address is &quot;, addr.String())
	}
	os.Exit(0)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行之后你就会发现只要你输入一个IP地址就会给出相应的IP格式</p><h2 id="tcp-socket" tabindex="-1"><a class="header-anchor" href="#tcp-socket" aria-hidden="true">#</a> TCP Socket</h2><p>当我们知道如何通过网络端口访问一个服务时，那么我们能够做什么呢？作为客户端来说，我们可以通过向远端某台机器的的某个网络端口发送一个请求，然后得到在机器的此端口上监听的服务反馈的信息。作为服务端，我们需要把服务绑定到某个指定端口，并且在此端口上监听，当有客户端来访问时能够读取信息并且写入反馈信息。</p><p>在Go语言的<code>net</code>包中有一个类型<code>TCPConn</code>，这个类型可以用来作为客户端和服务器端交互的通道，他有两个主要的函数：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (c *TCPConn) Write(b []byte) (int, error)
func (c *TCPConn) Read(b []byte) (int, error)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>TCPConn</code>可以用在客户端和服务器端来读写数据。</p><p>还有我们需要知道一个<code>TCPAddr</code>类型，他表示一个TCP的地址信息，他的定义如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type TCPAddr struct {
	IP IP
	Port int
	Zone string // IPv6 scoped addressing zone
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Go语言中通过<code>ResolveTCPAddr</code>获取一个<code>TCPAddr</code></p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func ResolveTCPAddr(net, addr string) (*TCPAddr, os.Error)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,34),b=n("li",null,'net参数是"tcp4"、"tcp6"、"tcp"中的任意一个，分别表示TCP(IPv4-only), TCP(IPv6-only)或者TCP(IPv4, IPv6的任意一个)。',-1),p={href:"http://www.google.com:80",target:"_blank",rel:"noopener noreferrer"},P=l(`<h3 id="tcp-client" tabindex="-1"><a class="header-anchor" href="#tcp-client" aria-hidden="true">#</a> TCP client</h3><p>Go语言中通过net包中的<code>DialTCP</code>函数来建立一个TCP连接，并返回一个<code>TCPConn</code>类型的对象，当连接建立时服务器端也创建一个同类型的对象，此时客户端和服务器端通过各自拥有的<code>TCPConn</code>对象来进行数据交换。一般而言，客户端通过<code>TCPConn</code>对象将请求信息发送到服务器端，读取服务器端响应的信息。服务器端读取并解析来自客户端的请求，并返回应答信息，这个连接只有当任一端关闭了连接之后才失效，不然这连接可以一直在使用。建立连接的函数定义如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func DialTCP(network string, laddr, raddr *TCPAddr) (*TCPConn, error)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>network参数是&quot;tcp4&quot;、&quot;tcp6&quot;、&quot;tcp&quot;中的任意一个，分别表示TCP(IPv4-only)、TCP(IPv6-only)或者TCP(IPv4,IPv6的任意一个)</li><li>laddr表示本机地址，一般设置为nil</li><li>raddr表示远程的服务地址</li></ul><p>接下来我们写一个简单的例子，模拟一个基于HTTP协议的客户端请求去连接一个Web服务端。我们要写一个简单的http请求头，格式类似如下：</p><pre><code>&quot;HEAD / HTTP/1.0\\r\\n\\r\\n&quot;
</code></pre><p>从服务端接收到的响应信息格式可能如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
HTTP/1.0 200 OK
ETag: &quot;-9985996&quot;
Last-Modified: Thu, 25 Mar 2010 17:51:10 GMT
Content-Length: 18074
Connection: close
Date: Sat, 28 Aug 2010 00:43:48 GMT
Server: lighttpd/1.4.23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的客户端代码如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;io/ioutil&quot;
	&quot;net&quot;
	&quot;os&quot;
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, &quot;Usage: %s host:port &quot;, os.Args[0])
		os.Exit(1)
	}
	service := os.Args[1]
	tcpAddr, err := net.ResolveTCPAddr(&quot;tcp4&quot;, service)
	checkError(err)
	conn, err := net.DialTCP(&quot;tcp&quot;, nil, tcpAddr)
	checkError(err)
	_, err = conn.Write([]byte(&quot;HEAD / HTTP/1.0\\r\\n\\r\\n&quot;))
	checkError(err)
	// result, err := ioutil.ReadAll(conn)
	result := make([]byte, 256)
	_, err = conn.Read(result)
	checkError(err)
	fmt.Println(string(result))
	os.Exit(0)
}
func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, &quot;Fatal error: %s&quot;, err.Error())
		os.Exit(1)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的代码我们可以看出：首先程序将用户的输入作为参数<code>service</code>传入<code>net.ResolveTCPAddr</code>获取一个tcpAddr,然后把tcpAddr传入DialTCP后创建了一个TCP连接<code>conn</code>，通过<code>conn</code>来发送请求信息，最后通过<code>ioutil.ReadAll</code>从<code>conn</code>中读取全部的文本，也就是服务端响应反馈的信息。</p><h3 id="tcp-server" tabindex="-1"><a class="header-anchor" href="#tcp-server" aria-hidden="true">#</a> TCP server</h3><p>上面我们编写了一个TCP的客户端程序，也可以通过net包来创建一个服务器端程序，在服务器端我们需要绑定服务到指定的非激活端口，并监听此端口，当有客户端请求到达的时候可以接收到来自客户端连接的请求。net包中有相应功能的函数，函数定义如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func ListenTCP(network string, laddr *TCPAddr) (*TCPListener, error)
func (l *TCPListener) Accept() (Conn, error)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数说明同DialTCP的参数一样。下面我们实现一个简单的时间同步服务，监听7777端口</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;net&quot;
	&quot;os&quot;
	&quot;time&quot;
)

func main() {
	service := &quot;:7777&quot;
	tcpAddr, err := net.ResolveTCPAddr(&quot;tcp4&quot;, service)
	checkError(err)
	listener, err := net.ListenTCP(&quot;tcp&quot;, tcpAddr)
	checkError(err)
	for {
		conn, err := listener.Accept()
		if err != nil {
			continue
		}
		daytime := time.Now().String()
		conn.Write([]byte(daytime)) // don&#39;t care about return value
		conn.Close()                // we&#39;re finished with this client
	}
}
func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, &quot;Fatal error: %s&quot;, err.Error())
		os.Exit(1)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的服务跑起来之后，它将会一直在那里等待，直到有新的客户端请求到达。当有新的客户端请求到达并同意接受<code>Accept</code>该请求的时候他会反馈当前的时间信息。值得注意的是，在代码中<code>for</code>循环里，当有错误发生时，直接continue而不是退出，是因为在服务器端跑代码的时候，当有错误发生的情况下最好是由服务端记录错误，然后当前连接的客户端直接报错而退出，从而不会影响到当前服务端运行的整个服务。</p><p>上面的代码有个缺点，执行的时候是单任务的，不能同时接收多个请求，那么该如何改造以使它支持多并发呢？Go里面有一个goroutine机制，请看下面改造后的代码</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;net&quot;
	&quot;os&quot;
	&quot;time&quot;
)

func main() {
	service := &quot;:1200&quot;
	tcpAddr, err := net.ResolveTCPAddr(&quot;tcp4&quot;, service)
	checkError(err)
	listener, err := net.ListenTCP(&quot;tcp&quot;, tcpAddr)
	checkError(err)
	for {
		conn, err := listener.Accept()
		if err != nil {
			continue
		}
		go handleClient(conn)
	}
}

func handleClient(conn net.Conn) {
	defer conn.Close()
	daytime := time.Now().String()
	conn.Write([]byte(daytime)) // don&#39;t care about return value
	// we&#39;re finished with this client
}
func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, &quot;Fatal error: %s&quot;, err.Error())
		os.Exit(1)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过把业务处理分离到函数<code>handleClient</code>，我们就可以进一步地实现多并发执行了。看上去是不是很帅，增加<code>go</code>关键词就实现了服务端的多并发，从这个小例子也可以看出goroutine的强大之处。</p><p>有的朋友可能要问：这个服务端没有处理客户端实际请求的内容。如果我们需要通过从客户端发送不同的请求来获取不同的时间格式，而且需要一个长连接，该怎么做呢？请看：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;net&quot;
	&quot;os&quot;
	&quot;time&quot;
	&quot;strconv&quot;
	&quot;strings&quot;
)

func main() {
	service := &quot;:1200&quot;
	tcpAddr, err := net.ResolveTCPAddr(&quot;tcp4&quot;, service)
	checkError(err)
	listener, err := net.ListenTCP(&quot;tcp&quot;, tcpAddr)
	checkError(err)
	for {
		conn, err := listener.Accept()
		if err != nil {
			continue
		}
		go handleClient(conn)
	}
}

func handleClient(conn net.Conn) {
	conn.SetReadDeadline(time.Now().Add(2 * time.Minute)) // set 2 minutes timeout
	request := make([]byte, 128) // set maxium request length to 128B to prevent flood attack
	defer conn.Close()  // close connection before exit
	for {
		read_len, err := conn.Read(request)

		if err != nil {
			fmt.Println(err)
			break
		}

    		if read_len == 0 {
    			break // connection already closed by client
    		} else if strings.TrimSpace(string(request[:read_len])) == &quot;timestamp&quot; {
    			daytime := strconv.FormatInt(time.Now().Unix(), 10)
    			conn.Write([]byte(daytime))
    		} else {
    			daytime := time.Now().String()
    			conn.Write([]byte(daytime))
    		}

    		request = make([]byte, 128) // clear last read content
	}
}

func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, &quot;Fatal error: %s&quot;, err.Error())
		os.Exit(1)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面这个例子中，我们使用<code>conn.Read()</code>不断读取客户端发来的请求。由于我们需要保持与客户端的长连接，所以不能在读取完一次请求后就关闭连接。由于<code>conn.SetReadDeadline()</code>设置了超时，当一定时间内客户端无请求发送，<code>conn</code>便会自动关闭，下面的for循环即会因为连接已关闭而跳出。需要注意的是，<code>request</code>在创建时需要指定一个最大长度以防止flood attack；每次读取到请求处理完毕后，需要清理request，因为<code>conn.Read()</code>会将新读取到的内容append到原内容之后。</p><h3 id="控制tcp连接" tabindex="-1"><a class="header-anchor" href="#控制tcp连接" aria-hidden="true">#</a> 控制TCP连接</h3><p>TCP有很多连接控制函数，我们平常用到比较多的有如下几个函数：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func DialTimeout(net, addr string, timeout time.Duration) (Conn, error)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置建立连接的超时时间，客户端和服务器端都适用，当超过设置时间时，连接自动关闭。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (c *TCPConn) SetReadDeadline(t time.Time) error
func (c *TCPConn) SetWriteDeadline(t time.Time) error

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用来设置写入/读取一个连接的超时时间。当超过设置时间时，连接自动关闭。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (c *TCPConn) SetKeepAlive(keepalive bool) os.Error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>设置keepAlive属性。操作系统层在tcp上没有数据和ACK的时候，会间隔性的发送keepalive包，操作系统可以通过该包来判断一个tcp连接是否已经断开，在windows上默认2个小时没有收到数据和keepalive包的时候认为tcp连接已经断开，这个功能和我们通常在应用层加的心跳包的功能类似。</p><p>更多的内容请查看<code>net</code>包的文档。</p><h2 id="udp-socket" tabindex="-1"><a class="header-anchor" href="#udp-socket" aria-hidden="true">#</a> UDP Socket</h2><p>Go语言包中处理UDP Socket和TCP Socket不同的地方就是在服务器端处理多个客户端请求数据包的方式不同,UDP缺少了对客户端连接请求的Accept函数。其他基本几乎一模一样，只有TCP换成了UDP而已。UDP的几个主要函数如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func ResolveUDPAddr(net, addr string) (*UDPAddr, os.Error)
func DialUDP(net string, laddr, raddr *UDPAddr) (c *UDPConn, err os.Error)
func ListenUDP(net string, laddr *UDPAddr) (c *UDPConn, err os.Error)
func (c *UDPConn) ReadFromUDP(b []byte) (n int, addr *UDPAddr, err os.Error)
func (c *UDPConn) WriteToUDP(b []byte, addr *UDPAddr) (n int, err os.Error)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个UDP的客户端代码如下所示,我们可以看到不同的就是TCP换成了UDP而已：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;net&quot;
	&quot;os&quot;
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, &quot;Usage: %s host:port&quot;, os.Args[0])
		os.Exit(1)
	}
	service := os.Args[1]
	udpAddr, err := net.ResolveUDPAddr(&quot;udp4&quot;, service)
	checkError(err)
	conn, err := net.DialUDP(&quot;udp&quot;, nil, udpAddr)
	checkError(err)
	_, err = conn.Write([]byte(&quot;anything&quot;))
	checkError(err)
	var buf [512]byte
	n, err := conn.Read(buf[0:])
	checkError(err)
	fmt.Println(string(buf[0:n]))
	os.Exit(0)
}
func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, &quot;Fatal error %s&quot;, err.Error())
		os.Exit(1)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来看一下UDP服务器端如何来处理：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;net&quot;
	&quot;os&quot;
	&quot;time&quot;
)

func main() {
	service := &quot;:1200&quot;
	udpAddr, err := net.ResolveUDPAddr(&quot;udp4&quot;, service)
	checkError(err)
	conn, err := net.ListenUDP(&quot;udp&quot;, udpAddr)
	checkError(err)
	for {
		handleClient(conn)
	}
}
func handleClient(conn *net.UDPConn) {
	var buf [512]byte
	_, addr, err := conn.ReadFromUDP(buf[0:])
	if err != nil {
		return
	}
	daytime := time.Now().String()
	conn.WriteToUDP([]byte(daytime), addr)
}
func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, &quot;Fatal error %s&quot;, err.Error())
		os.Exit(1)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>通过对TCP和UDP Socket编程的描述和实现，可见Go已经完备地支持了Socket编程，而且使用起来相当的方便，Go提供了很多函数，通过这些函数可以很容易就编写出高性能的Socket应用。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,42);function h(g,q){const t=s("ExternalLinkIcon"),d=s("RouterLink");return c(),v("div",null,[m,n("ul",null,[b,n("li",null,[e('addr表示域名或者IP地址，例如"'),n("a",p,[e("www.google.com:80"),i(t)]),e('" 或者"127.0.0.1:22"。')])]),P,n("ul",null,[n("li",null,[i(d,{to:"/build-web-app/preface.html"},{default:r(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节: "),i(d,{to:"/build-web-app/08.0.html"},{default:r(()=>[e("Web服务")]),_:1})]),n("li",null,[e("下一节: "),i(d,{to:"/build-web-app/08.2.html"},{default:r(()=>[e("WebSocket")]),_:1})])])])}const C=a(u,[["render",h],["__file","08.1.html.vue"]]);export{C as default};
