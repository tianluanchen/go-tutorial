import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as a,c as r,a as n,d as s,w as d,b as e,e as c}from"./app-9da01d16.js";const v={},u=c(`<h1 id="_9-6-加密和解密数据" tabindex="-1"><a class="header-anchor" href="#_9-6-加密和解密数据" aria-hidden="true">#</a> 9.6 加密和解密数据</h1><p>前面小节介绍了如何存储密码，但是有的时候，我们想把一些敏感数据加密后存储起来，在将来的某个时候，随需将它们解密出来，此时我们应该在选用对称加密算法来满足我们的需求。</p><h2 id="base64加解密" tabindex="-1"><a class="header-anchor" href="#base64加解密" aria-hidden="true">#</a> base64加解密</h2><p>如果Web应用足够简单，数据的安全性没有那么严格的要求，那么可以采用一种比较简单的加解密方法是<code>base64</code>，这种方式实现起来比较简单，Go语言的<code>base64</code>包已经很好的支持了这个，请看下面的例子：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;encoding/base64&quot;
	&quot;fmt&quot;
)

func base64Encode(src []byte) []byte {
	return []byte(base64.StdEncoding.EncodeToString(src))
}

func base64Decode(src []byte) ([]byte, error) {
	return base64.StdEncoding.DecodeString(string(src))
}

func main() {
	// encode
	hello := &quot;你好，世界！ hello world&quot;
	debyte := base64Encode([]byte(hello))
	fmt.Println(debyte)
	// decode
	enbyte, err := base64Decode(debyte)
	if err != nil {
		fmt.Println(err.Error())
	}

	if hello != string(enbyte) {
		fmt.Println(&quot;hello is not equal to enbyte&quot;)
	}

	fmt.Println(string(enbyte))
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高级加解密" tabindex="-1"><a class="header-anchor" href="#高级加解密" aria-hidden="true">#</a> 高级加解密</h2><p>Go语言的<code>crypto</code>里面支持对称加密的高级加解密包有：</p><ul><li><code>crypto/aes</code>包：AES(Advanced Encryption Standard)，又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。</li><li><code>crypto/des</code>包：DES(Data Encryption Standard)，是一种对称加密标准，是目前使用最广泛的密钥系统，特别是在保护金融数据的安全中。曾是美国联邦政府的加密标准，但现已被AES所替代。</li></ul><p>因为这两种算法使用方法类似，所以在此，我们仅用aes包为例来讲解它们的使用，请看下面的例子</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;crypto/aes&quot;
	&quot;crypto/cipher&quot;
	&quot;fmt&quot;
	&quot;os&quot;
)

var commonIV = []byte{0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f}

func main() {
	//需要去加密的字符串
	plaintext := []byte(&quot;My name is Astaxie&quot;)
	//如果传入加密串的话，plaint就是传入的字符串
	if len(os.Args) &gt; 1 {
		plaintext = []byte(os.Args[1])
	}

	//aes的加密字符串
	key_text := &quot;astaxie12798akljzmknm.ahkjkljl;k&quot;
	if len(os.Args) &gt; 2 {
		key_text = os.Args[2]
	}

	fmt.Println(len(key_text))

	// 创建加密算法aes
	c, err := aes.NewCipher([]byte(key_text))
	if err != nil {
		fmt.Printf(&quot;Error: NewCipher(%d bytes) = %s&quot;, len(key_text), err)
		os.Exit(-1)
	}

	//加密字符串
	cfb := cipher.NewCFBEncrypter(c, commonIV)
	ciphertext := make([]byte, len(plaintext))
	cfb.XORKeyStream(ciphertext, plaintext)
	fmt.Printf(&quot;%s=&gt;%x\\n&quot;, plaintext, ciphertext)

	// 解密字符串
	cfbdec := cipher.NewCFBDecrypter(c, commonIV)
	plaintextCopy := make([]byte, len(plaintext))
	cfbdec.XORKeyStream(plaintextCopy, ciphertext)
	fmt.Printf(&quot;%x=&gt;%s\\n&quot;, ciphertext, plaintextCopy)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面通过调用函数<code>aes.NewCipher</code>(参数key必须是16、24或者32位的[]byte，分别对应AES-128, AES-192或AES-256算法),返回了一个<code>cipher.Block</code>接口，这个接口实现了三个功能：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type Block interface {
	// BlockSize returns the cipher&#39;s block size.
	BlockSize() int

	// Encrypt encrypts the first block in src into dst.
	// Dst and src may point at the same memory.
	Encrypt(dst, src []byte)

	// Decrypt decrypts the first block in src into dst.
	// Dst and src may point at the same memory.
	Decrypt(dst, src []byte)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这三个函数实现了加解密操作，详细的操作请看上面的例子。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>这小节介绍了几种加解密的算法，在开发Web应用的时候可以根据需求采用不同的方式进行加解密，一般的应用可以采用base64算法，更加高级的话可以采用aes或者des算法。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,16);function b(o,m){const i=t("RouterLink");return a(),r("div",null,[u,n("ul",null,[n("li",null,[s(i,{to:"/build-web-app/preface.html"},{default:d(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节: "),s(i,{to:"/build-web-app/09.5.html"},{default:d(()=>[e("存储密码")]),_:1})]),n("li",null,[e("下一节: "),s(i,{to:"/build-web-app/09.7.html"},{default:d(()=>[e("小结")]),_:1})])])])}const y=l(v,[["render",b],["__file","09.6.html.vue"]]);export{y as default};
