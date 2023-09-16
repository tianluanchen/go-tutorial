import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c as u,a as n,b as s,d as a,w as t,e as i}from"./app-9da01d16.js";const r={},d=i(`<h1 id="_7-1-xml处理" tabindex="-1"><a class="header-anchor" href="#_7-1-xml处理" aria-hidden="true">#</a> 7.1 XML处理</h1><p>XML作为一种数据交换和信息传递的格式已经十分普及。而随着Web服务日益广泛的应用，现在XML在日常的开发工作中也扮演了愈发重要的角色。这一小节， 我们将就Go语言标准包中的XML相关处理的包进行介绍。</p><p>这个小节不会涉及XML规范相关的内容（如需了解相关知识请参考其他文献），而是介绍如何用Go语言来编解码XML文件相关的知识。</p><p>假如你是一名运维人员，你为你所管理的所有服务器生成了如下内容的xml的配置文件：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>
<span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servers</span> <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverName</span><span class="token punctuation">&gt;</span></span>Shanghai_VPN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverName</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverIP</span><span class="token punctuation">&gt;</span></span>127.0.0.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverIP</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverName</span><span class="token punctuation">&gt;</span></span>Beijing_VPN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverName</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverIP</span><span class="token punctuation">&gt;</span></span>127.0.0.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverIP</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servers</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的XML文档描述了两个服务器的信息，包含了服务器名和服务器的IP信息，接下来的Go例子以此XML描述的信息进行操作。</p><h2 id="解析xml" tabindex="-1"><a class="header-anchor" href="#解析xml" aria-hidden="true">#</a> 解析XML</h2><p>如何解析如上这个XML文件呢？ 我们可以通过xml包的<code>Unmarshal</code>函数来达到我们的目的</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func Unmarshal(data []byte, v interface{}) error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>data接收的是XML数据流，v是需要输出的结构，定义为interface，也就是可以把XML转换为任意的格式。我们这里主要介绍struct的转换，因为struct和XML都有类似树结构的特征。</p><p>示例代码如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;encoding/xml&quot;
	&quot;fmt&quot;
	&quot;io/ioutil&quot;
	&quot;os&quot;
)

type Recurlyservers struct {
	XMLName     xml.Name \`xml:&quot;servers&quot;\`
	Version     string   \`xml:&quot;version,attr&quot;\`
	Svs         []server \`xml:&quot;server&quot;\`
	Description string   \`xml:&quot;,innerxml&quot;\`
}

type server struct {
	XMLName    xml.Name \`xml:&quot;server&quot;\`
	ServerName string   \`xml:&quot;serverName&quot;\`
	ServerIP   string   \`xml:&quot;serverIP&quot;\`
}

func main() {
	file, err := os.Open(&quot;servers.xml&quot;) // For read access.		
	if err != nil {
		fmt.Printf(&quot;error: %v&quot;, err)
		return
	}
	defer file.Close()
	data, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Printf(&quot;error: %v&quot;, err)
		return
	}
	v := Recurlyservers{}
	err = xml.Unmarshal(data, &amp;v)
	if err != nil {
		fmt.Printf(&quot;error: %v&quot;, err)
		return
	}

	fmt.Println(v)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>XML本质上是一种树形的数据格式，而我们可以定义与之匹配的go 语言的 struct类型，然后通过xml.Unmarshal来将xml中的数据解析成对应的struct对象。如上例子输出如下数据</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>
{{ servers} 1 [{{ server} Shanghai_VPN 127.0.0.1} {{ server} Beijing_VPN 127.0.0.2}]
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverName</span><span class="token punctuation">&gt;</span></span>Shanghai_VPN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverName</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverIP</span><span class="token punctuation">&gt;</span></span>127.0.0.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverIP</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverName</span><span class="token punctuation">&gt;</span></span>Beijing_VPN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverName</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverIP</span><span class="token punctuation">&gt;</span></span>127.0.0.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverIP</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中，将xml文件解析成对应的struct对象是通过<code>xml.Unmarshal</code>来完成的，这个过程是如何实现的？可以看到我们的struct定义后面多了一些类似于<code>xml:&quot;serverName&quot;</code>这样的内容,这个是struct的一个特性，它们被称为 struct tag，它们是用来辅助反射的。我们来看一下<code>Unmarshal</code>的定义：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func Unmarshal(data []byte, v interface{}) error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到函数定义了两个参数，第一个是XML数据流，第二个是存储的对应类型，目前支持struct、slice和string，XML包内部采用了反射来进行数据的映射，所以v里面的字段必须是导出的。<code>Unmarshal</code>解析的时候XML元素和字段怎么对应起来的呢？这是有一个优先级读取流程的，首先会读取struct tag，如果没有，那么就会对应字段名。必须注意一点的是解析的时候tag、字段名、XML元素都是大小写敏感的，所以必须一一对应字段。</p><p>Go语言的反射机制，可以利用这些tag信息来将来自XML文件中的数据反射成对应的struct对象，关于反射如何利用struct tag的更多内容请参阅reflect中的相关内容。</p><p>解析XML到struct的时候遵循如下的规则：</p><ul><li>如果struct的一个字段是string或者[]byte类型且它的tag含有<code>&quot;,innerxml&quot;</code>，Unmarshal将会将此字段所对应的元素内所有内嵌的原始xml累加到此字段上，如上面例子Description定义。最后的输出是</li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverName</span><span class="token punctuation">&gt;</span></span>Shanghai_VPN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverName</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverIP</span><span class="token punctuation">&gt;</span></span>127.0.0.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverIP</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverName</span><span class="token punctuation">&gt;</span></span>Beijing_VPN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverName</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverIP</span><span class="token punctuation">&gt;</span></span>127.0.0.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverIP</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>如果struct中有一个叫做XMLName，且类型为xml.Name字段，那么在解析的时候就会保存这个element的名字到该字段,如上面例子中的servers。</li><li>如果某个struct字段的tag定义中含有XML结构中element的名称，那么解析的时候就会把相应的element值赋值给该字段，如上servername和serverip定义。</li><li>如果某个struct字段的tag定义了中含有<code>&quot;,attr&quot;</code>，那么解析的时候就会将该结构所对应的element的与字段同名的属性的值赋值给该字段，如上version定义。</li><li>如果某个struct字段的tag定义 型如<code>&quot;a&gt;b&gt;c&quot;</code>,则解析的时候，会将xml结构a下面的b下面的c元素的值赋值给该字段。</li><li>如果某个struct字段的tag定义了<code>&quot;-&quot;</code>,那么不会为该字段解析匹配任何xml数据。</li><li>如果struct字段后面的tag定义了<code>&quot;,any&quot;</code>，如果他的子元素在不满足其他的规则的时候就会匹配到这个字段。</li><li>如果某个XML元素包含一条或者多条注释，那么这些注释将被累加到第一个tag含有&quot;,comments&quot;的字段上，这个字段的类型可能是[]byte或string,如果没有这样的字段存在，那么注释将会被抛弃。</li></ul><p>上面详细讲述了如何定义struct的tag。 只要设置对了tag，那么XML解析就如上面示例般简单，tag和XML的element是一一对应的关系，如上所示，我们还可以通过slice来表示多个同级元素。</p><blockquote><p>注意： 为了正确解析，go语言的xml包要求struct定义中的所有字段必须是可导出的（即首字母大写）</p></blockquote><h2 id="输出xml" tabindex="-1"><a class="header-anchor" href="#输出xml" aria-hidden="true">#</a> 输出XML</h2><p>假若我们不是要解析如上所示的XML文件，而是生成它，那么在go语言中又该如何实现呢？ xml包中提供了<code>Marshal</code>和<code>MarshalIndent</code>两个函数，来满足我们的需求。这两个函数主要的区别是第二个函数会增加前缀和缩进，函数的定义如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func Marshal(v interface{}) ([]byte, error)
func MarshalIndent(v interface{}, prefix, indent string) ([]byte, error)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个函数第一个参数是用来生成XML的结构定义类型数据，都是返回生成的XML数据流。</p><p>下面我们来看一下如何输出如上的XML：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;encoding/xml&quot;
	&quot;fmt&quot;
	&quot;os&quot;
)

type Servers struct {
	XMLName xml.Name \`xml:&quot;servers&quot;\`
	Version string   \`xml:&quot;version,attr&quot;\`
	Svs     []server \`xml:&quot;server&quot;\`
}

type server struct {
	ServerName string \`xml:&quot;serverName&quot;\`
	ServerIP   string \`xml:&quot;serverIP&quot;\`
}

func main() {
	v := &amp;Servers{Version: &quot;1&quot;}
	v.Svs = append(v.Svs, server{&quot;Shanghai_VPN&quot;, &quot;127.0.0.1&quot;})
	v.Svs = append(v.Svs, server{&quot;Beijing_VPN&quot;, &quot;127.0.0.2&quot;})
	output, err := xml.MarshalIndent(v, &quot;  &quot;, &quot;    &quot;)
	if err != nil {
		fmt.Printf(&quot;error: %v\\n&quot;, err)
	}
	os.Stdout.Write([]byte(xml.Header))

	os.Stdout.Write(output)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码输出如下信息：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>
<span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servers</span> <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverName</span><span class="token punctuation">&gt;</span></span>Shanghai_VPN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverName</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverIP</span><span class="token punctuation">&gt;</span></span>127.0.0.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverIP</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverName</span><span class="token punctuation">&gt;</span></span>Beijing_VPN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverName</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>serverIP</span><span class="token punctuation">&gt;</span></span>127.0.0.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>serverIP</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servers</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和我们之前定义的文件的格式一模一样，之所以会有<code>os.Stdout.Write([]byte(xml.Header))</code> 这句代码的出现，是因为<code>xml.MarshalIndent</code>或者<code>xml.Marshal</code>输出的信息都是不带XML头的，为了生成正确的xml文件，我们使用了xml包预定义的Header变量。</p><p>我们看到<code>Marshal</code>函数接收的参数v是interface{}类型的，即它可以接受任意类型的参数，那么xml包，根据什么规则来生成相应的XML文件呢？</p>`,34),v=n("li",null,"如果v是指针，那么会Marshal指针指向的内容，如果指针为空，什么都不输出",-1),m=n("li",null,"如果v是interface，那么就处理interface所包含的数据",-1),g=n("li",null,"如果v是其他数据类型，就会输出这个数据类型所拥有的字段信息",-1),k=i(`<p>生成的XML文件中的element的名字又是根据什么决定的呢？元素名按照如下优先级从struct中获取：</p><ul><li>如果v是struct，XMLName的tag中定义的名称</li><li>类型为xml.Name的名叫XMLName的字段的值</li><li>通过struct中字段的tag来获取</li><li>通过struct的字段名用来获取</li><li>marshall的类型名称</li></ul><p>我们应如何设置struct 中字段的tag信息以控制最终xml文件的生成呢？</p><ul><li>XMLName不会被输出</li><li>tag中含有<code>&quot;-&quot;</code>的字段不会输出</li><li>tag中含有<code>&quot;name,attr&quot;</code>，会以name作为属性名，字段值作为值输出为这个XML元素的属性，如上version字段所描述</li><li>tag中含有<code>&quot;,attr&quot;</code>，会以这个struct的字段名作为属性名输出为XML元素的属性，类似上一条，只是这个name默认是字段名了。</li><li>tag中含有<code>&quot;,chardata&quot;</code>，输出为xml的 character data而非element。</li><li>tag中含有<code>&quot;,innerxml&quot;</code>，将会被原样输出，而不会进行常规的编码过程</li><li>tag中含有<code>&quot;,comment&quot;</code>，将被当作xml注释来输出，而不会进行常规的编码过程，字段值中不能含有&quot;--&quot;字符串</li><li>tag中含有<code>&quot;omitempty&quot;</code>,如果该字段的值为空值那么该字段就不会被输出到XML，空值包括：false、0、nil指针或nil接口，任何长度为0的array, slice, map或者string</li><li>tag中含有<code>&quot;a&gt;b&gt;c&quot;</code>，那么就会循环输出三个元素a包含b，b包含c，例如如下代码就会输出</li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>	FirstName string   \`xml:&quot;name&gt;first&quot;\`
	LastName  string   \`xml:&quot;name&gt;last&quot;\`

	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>first</span><span class="token punctuation">&gt;</span></span>Asta<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>first</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>last</span><span class="token punctuation">&gt;</span></span>Xie<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>last</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面我们介绍了如何使用Go语言的xml包来编/解码XML文件，重要的一点是对XML的所有操作都是通过struct tag来实现的，所以学会对struct tag的运用变得非常重要，在文章中我们简要的列举了如何定义tag。更多内容或tag定义请参看相应的官方资料。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,7);function b(q,x){const p=l("type"),e=l("RouterLink");return o(),u("div",null,[d,n("ul",null,[n("li",null,[s("如果v是 array或者slice，那么输出每一个元素，类似"),a(p,null,{default:t(()=>[s("value")]),_:1})]),v,m,g]),k,n("ul",null,[n("li",null,[a(e,{to:"/build-web-app/preface.html"},{default:t(()=>[s("目录")]),_:1})]),n("li",null,[s("上一节: "),a(e,{to:"/build-web-app/07.0.html"},{default:t(()=>[s("文本处理")]),_:1})]),n("li",null,[s("下一节: "),a(e,{to:"/build-web-app/07.2.html"},{default:t(()=>[s("Json处理")]),_:1})])])])}const M=c(r,[["render",b],["__file","07.1.html.vue"]]);export{M as default};
