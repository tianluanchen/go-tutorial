import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o,c as u,a as i,b as e,d as n,w as t,e as l}from"./app-9da01d16.js";const c={},m=l(`<h1 id="_9-5-存储密码" tabindex="-1"><a class="header-anchor" href="#_9-5-存储密码" aria-hidden="true">#</a> 9.5 存储密码</h1><p>过去一段时间以来, 许多的网站遭遇用户密码数据泄露事件, 这其中包括顶级的互联网企业–Linkedin, 国内诸如CSDN，该事件横扫整个国内互联网，随后又爆出多玩游戏800万用户资料被泄露，另有传言人人网、开心网、天涯社区、世纪佳缘、百合网等社区都有可能成为黑客下一个目标。层出不穷的类似事件给用户的网上生活造成巨大的影响，人人自危，因为人们往往习惯在不同网站使用相同的密码，所以一家“暴库”，全部遭殃。</p><p>那么我们作为一个Web应用开发者，在选择密码存储方案时, 容易掉入哪些陷阱, 以及如何避免这些陷阱?</p><h2 id="普通方案" tabindex="-1"><a class="header-anchor" href="#普通方案" aria-hidden="true">#</a> 普通方案</h2><p>目前用的最多的密码存储方案是将明文密码做单向哈希后存储，单向哈希算法有一个特征：无法通过哈希后的摘要(digest)恢复原始数据，这也是“单向”二字的来源。常用的单向哈希算法包括SHA-256, SHA-1, MD5等。</p><p>Go语言对这三种加密算法的实现如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//import &quot;crypto/sha256&quot;
h := sha256.New()
io.WriteString(h, &quot;His money is twice tainted: &#39;taint yours and &#39;taint mine.&quot;)
fmt.Printf(&quot;% x&quot;, h.Sum(nil))

//import &quot;crypto/sha1&quot;
h := sha1.New()
io.WriteString(h, &quot;His money is twice tainted: &#39;taint yours and &#39;taint mine.&quot;)
fmt.Printf(&quot;% x&quot;, h.Sum(nil))

//import &quot;crypto/md5&quot;
h := md5.New()
io.WriteString(h, &quot;需要加密的密码&quot;)
fmt.Printf(&quot;%x&quot;, h.Sum(nil))

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>单向哈希有两个特性：</p><ul><li>1）同一个密码进行单向哈希，得到的总是唯一确定的摘要。</li><li>2）计算速度快。随着技术进步，一秒钟能够完成数十亿次单向哈希计算。</li></ul><p>结合上面两个特点，考虑到多数人所使用的密码为常见的组合，攻击者可以将所有密码的常见组合进行单向哈希，得到一个摘要组合, 然后与数据库中的摘要进行比对即可获得对应的密码。这个摘要组合也被称为<code>rainbow table</code>。</p><p>因此通过单向加密之后存储的数据，和明文存储没有多大区别。因此，一旦网站的数据库泄露，所有用户的密码本身就大白于天下。</p><h2 id="进阶方案" tabindex="-1"><a class="header-anchor" href="#进阶方案" aria-hidden="true">#</a> 进阶方案</h2><p>通过上面介绍我们知道黑客可以用<code>rainbow table</code>来破解哈希后的密码，很大程度上是因为加密时使用的哈希算法是公开的。如果黑客不知道加密的哈希算法是什么，那他也就无从下手了。</p><p>一个直接的解决办法是，自己设计一个哈希算法。然而，一个好的哈希算法是很难设计的——既要避免碰撞，又不能有明显的规律，做到这两点要比想象中的要困难很多。因此实际应用中更多的是利用已有的哈希算法进行多次哈希。</p><p>但是单纯的多次哈希，依然阻挡不住黑客。两次 MD5、三次 MD5之类的方法，我们能想到，黑客自然也能想到。特别是对于一些开源代码，这样哈希更是相当于直接把算法告诉了黑客。</p><p>没有攻不破的盾，但也没有折不断的矛。现在安全性比较好的网站，都会用一种叫做“加盐”的方式来存储密码，也就是常说的 “salt”。他们通常的做法是，先将用户输入的密码进行一次MD5（或其它哈希算法）加密；将得到的 MD5 值前后加上一些只有管理员自己知道的随机串，再进行一次MD5加密。这个随机串中可以包括某些固定的串，也可以包括用户名（用来保证每个用户加密使用的密钥都不一样）。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//import &quot;crypto/md5&quot;
//假设用户名abc，密码123456
h := md5.New()
io.WriteString(h, &quot;需要加密的密码&quot;)

//pwmd5等于e10adc3949ba59abbe56e057f20f883e
pwmd5 :=fmt.Sprintf(&quot;%x&quot;, h.Sum(nil))

//指定两个 salt： salt1 = @#$%   salt2 = ^&amp;*()
salt1 := &quot;@#$%&quot;
salt2 := &quot;^&amp;*()&quot;

//salt1+用户名+salt2+MD5拼接
io.WriteString(h, salt1)
io.WriteString(h, &quot;abc&quot;)
io.WriteString(h, salt2)
io.WriteString(h, pwmd5)

last :=fmt.Sprintf(&quot;%x&quot;, h.Sum(nil))

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在两个salt没有泄露的情况下，黑客如果拿到的是最后这个加密串，就几乎不可能推算出原始的密码是什么了。</p><h2 id="专家方案" tabindex="-1"><a class="header-anchor" href="#专家方案" aria-hidden="true">#</a> 专家方案</h2><p>上面的进阶方案在几年前也许是足够安全的方案，因为攻击者没有足够的资源建立这么多的<code>rainbow table</code>。 但是，时至今日，因为并行计算能力的提升，这种攻击已经完全可行。</p><p>怎么解决这个问题呢？只要时间与资源允许，没有破译不了的密码，所以方案是:故意增加密码计算所需耗费的资源和时间，使得任何人都不可获得足够的资源建立所需的<code>rainbow table</code>。</p><p>这类方案有一个特点，算法中都有个因子，用于指明计算密码摘要所需要的资源和时间，也就是计算强度。计算强度越大，攻击者建立<code>rainbow table</code>越困难，以至于不可继续。</p><p>这里推荐<code>scrypt</code>方案，scrypt是由著名的FreeBSD黑客Colin Percival为他的备份服务Tarsnap开发的。</p>`,23),v={href:"https://github.com/golang/crypto/tree/master/scrypt",target:"_blank",rel:"noopener noreferrer"},p=l(`<div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
dk := scrypt.Key([]byte(&quot;some password&quot;), []byte(salt), 16384, 8, 1, 32)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的方法可以获取唯一的相应的密码值，这是目前为止最难破解的。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>看到这里，如果你产生了危机感，那么就行动起来：</p><ul><li>1）如果你是普通用户，那么我们建议使用LastPass进行密码存储和生成，对不同的网站使用不同的密码；</li><li>2）如果你是开发人员， 那么我们强烈建议你采用专家方案进行密码存储。</li></ul><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,6);function b(h,q){const s=d("ExternalLinkIcon"),a=d("RouterLink");return o(),u("div",null,[m,i("p",null,[e("目前Go语言里面支持的库 "),i("a",v,[e("https://github.com/golang/crypto/tree/master/scrypt"),n(s)])]),p,i("ul",null,[i("li",null,[n(a,{to:"/build-web-app/preface.html"},{default:t(()=>[e("目录")]),_:1})]),i("li",null,[e("上一节: "),n(a,{to:"/build-web-app/09.4.html"},{default:t(()=>[e("确保输入过滤")]),_:1})]),i("li",null,[e("下一节: "),n(a,{to:"/build-web-app/09.6.html"},{default:t(()=>[e("加密和解密数据")]),_:1})])])])}const g=r(c,[["render",b],["__file","09.5.html.vue"]]);export{g as default};