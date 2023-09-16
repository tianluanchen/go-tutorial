import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as u,c as o,a as s,d as t,w as e,b as n,e as r}from"./app-9da01d16.js";const d="/go-tutorial/assets/4.5.upload2-524fce25.png?raw=true",p={},c=r(`<h1 id="_4-5-处理文件上传" tabindex="-1"><a class="header-anchor" href="#_4-5-处理文件上传" aria-hidden="true">#</a> 4.5 处理文件上传</h1><p>你想处理一个由用户上传的文件，比如你正在建设一个类似Instagram的网站，你需要存储用户拍摄的照片。这种需求该如何实现呢？</p><p>要使表单能够上传文件，首先第一步就是要添加form的<code>enctype</code>属性，<code>enctype</code>属性有如下三种情况:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
application/x-www-form-urlencoded   表示在发送前编码所有字符（默认）
multipart/form-data	  不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
text/plain	  空格转换为 &quot;+&quot; 加号，但不对特殊字符编码。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，创建新的表单html文件, 命名为upload.gtpl, html代码应该类似于:</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>上传文件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">enctype</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>multipart/form-data<span class="token punctuation">&quot;</span></span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/upload<span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>file<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>uploadfile<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hidden<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>token<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{.}}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>upload<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在服务器端，我们增加一个handlerFunc:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
http.HandleFunc(&quot;/upload&quot;, upload)

// 处理/upload 逻辑
func upload(w http.ResponseWriter, r *http.Request) {
	fmt.Println(&quot;method:&quot;, r.Method) //获取请求的方法
	if r.Method == &quot;GET&quot; {
		crutime := time.Now().Unix()
		h := md5.New()
		io.WriteString(h, strconv.FormatInt(crutime, 10))
		token := fmt.Sprintf(&quot;%x&quot;, h.Sum(nil))

		t, _ := template.ParseFiles(&quot;upload.gtpl&quot;)
		t.Execute(w, token)
	} else {
		r.ParseMultipartForm(32 &lt;&lt; 20)
		file, handler, err := r.FormFile(&quot;uploadfile&quot;)
		if err != nil {
			fmt.Println(err)
			return
		}
		defer file.Close()
		fmt.Fprintf(w, &quot;%v&quot;, handler.Header)
		f, err := os.OpenFile(&quot;./test/&quot;+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)  // 此处假设当前目录下已存在test目录
		if err != nil {
			fmt.Println(err)
			return
		}
		defer f.Close()
		io.Copy(f, file)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的代码可以看到，处理文件上传我们需要调用<code>r.ParseMultipartForm</code>，里面的参数表示<code>maxMemory</code>，调用<code>ParseMultipartForm</code>之后，上传的文件存储在<code>maxMemory</code>大小的内存里面，如果文件大小超过了<code>maxMemory</code>，那么剩下的部分将存储在系统的临时文件中。我们可以通过<code>r.FormFile</code>获取上面的文件句柄，然后实例中使用了<code>io.Copy</code>来存储文件。</p><blockquote><p>获取其他非文件字段信息的时候就不需要调用<code>r.ParseForm</code>，因为在需要的时候Go自动会去调用。而且<code>ParseMultipartForm</code>调用一次之后，后面再次调用不会再有效果。</p></blockquote><p>通过上面的实例我们可以看到我们上传文件主要三步处理：</p><ol><li>表单中增加enctype=&quot;multipart/form-data&quot;</li><li>服务端调用<code>r.ParseMultipartForm</code>,把上传的文件存储在内存和临时文件中</li><li>使用<code>r.FormFile</code>获取文件句柄，然后对文件进行存储等处理。</li></ol><p>文件handler是multipart.FileHeader,里面存储了如下结构信息</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type FileHeader struct {
	Filename string
	Header   textproto.MIMEHeader
	// contains filtered or unexported fields
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过上面的实例代码打印出来上传文件的信息如下</p><figure><img src="`+d+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图4.5 打印文件上传后服务器端接受的信息</p><h2 id="客户端上传文件" tabindex="-1"><a class="header-anchor" href="#客户端上传文件" aria-hidden="true">#</a> 客户端上传文件</h2><p>我们上面的例子演示了如何通过表单上传文件，然后在服务器端处理文件，其实Go支持模拟客户端表单功能支持文件上传，详细用法请看如下示例：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;bytes&quot;
	&quot;fmt&quot;
	&quot;io&quot;
	&quot;io/ioutil&quot;
	&quot;mime/multipart&quot;
	&quot;net/http&quot;
	&quot;os&quot;
)

func postFile(filename string, targetUrl string) error {
	bodyBuf := &amp;bytes.Buffer{}
	bodyWriter := multipart.NewWriter(bodyBuf)

	//关键的一步操作
	fileWriter, err := bodyWriter.CreateFormFile(&quot;uploadfile&quot;, filename)
	if err != nil {
		fmt.Println(&quot;error writing to buffer&quot;)
		return err
	}

	//打开文件句柄操作
	fh, err := os.Open(filename)
	if err != nil {
		fmt.Println(&quot;error opening file&quot;)
		return err
	}
	defer fh.Close()
	
	//iocopy
	_, err = io.Copy(fileWriter, fh)
	if err != nil {
		return err
	}

	contentType := bodyWriter.FormDataContentType()
	bodyWriter.Close()

	resp, err := http.Post(targetUrl, contentType, bodyBuf)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	resp_body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Println(resp.Status)
	fmt.Println(string(resp_body))
	return nil
}

// sample usage
func main() {
	target_url := &quot;http://localhost:9090/upload&quot;
	filename := &quot;./astaxie.pdf&quot;
	postFile(filename, target_url)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子详细展示了客户端如何向服务器上传一个文件的例子，客户端通过multipart.Write把文件的文本流写入一个缓存中，然后调用http的Post方法把缓存传到服务器。</p><blockquote><p>如果你还有其他普通字段例如username之类的需要同时写入，那么可以调用multipart的WriteField方法写很多其他类似的字段。</p></blockquote><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,23);function v(m,b){const a=l("RouterLink");return u(),o("div",null,[c,s("ul",null,[s("li",null,[t(a,{to:"/build-web-app/preface.html"},{default:e(()=>[n("目录")]),_:1})]),s("li",null,[n("上一节: "),t(a,{to:"/build-web-app/04.4.html"},{default:e(()=>[n("防止多次递交表单")]),_:1})]),s("li",null,[n("下一节: "),t(a,{to:"/build-web-app/04.6.html"},{default:e(()=>[n("小结")]),_:1})])])])}const g=i(p,[["render",v],["__file","04.5.html.vue"]]);export{g as default};
