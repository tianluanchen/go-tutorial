import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as a,c as o,a as n,d as r,w as s,b as e,e as d}from"./app-9da01d16.js";const p="/go-tutorial/assets/14.6.pprof-248875ad.png?raw=true",u="/go-tutorial/assets/14.6.pprof2-eb92e0cd.png?raw=true",c="/go-tutorial/assets/14.6.pprof3-5ca77a0a.png?raw=true",v={},m=d(`<h1 id="_14-6-pprof支持" tabindex="-1"><a class="header-anchor" href="#_14-6-pprof支持" aria-hidden="true">#</a> 14.6 pprof支持</h1><p>Go语言有一个非常棒的设计就是标准库里面带有代码的性能监控工具，在两个地方有包：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
net/http/pprof

runtime/pprof
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实net/http/pprof中只是使用runtime/pprof包来进行封装了一下，并在http端口上暴露出来</p><h2 id="beego支持pprof" tabindex="-1"><a class="header-anchor" href="#beego支持pprof" aria-hidden="true">#</a> beego支持pprof</h2><p>目前beego框架新增了pprof，该特性默认是不开启的，如果你需要测试性能，查看相应的执行goroutine之类的信息，其实Go的默认包&quot;net/http/pprof&quot;已经具有该功能，如果按照Go默认的方式执行Web，默认就可以使用，但是由于beego重新封装了ServHTTP函数，默认的包是无法开启该功能的，所以需要对beego的内部改造支持pprof。</p><ul><li>首先在beego.Run函数中根据变量是否自动加载性能包</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
if PprofOn {
	BeeApp.RegisterController(\`/debug/pprof\`, &amp;ProfController{})
	BeeApp.RegisterController(\`/debug/pprof/:pp([\\w]+)\`, &amp;ProfController{})
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>设计ProfController</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package beego

import (
	&quot;net/http/pprof&quot;
)

type ProfController struct {
	Controller
}

func (this *ProfController) Get() {
	switch this.Ctx.Param[&quot;:pp&quot;] {
	default:
		pprof.Index(this.Ctx.ResponseWriter, this.Ctx.Request)
	case &quot;&quot;:
		pprof.Index(this.Ctx.ResponseWriter, this.Ctx.Request)
	case &quot;cmdline&quot;:
		pprof.Cmdline(this.Ctx.ResponseWriter, this.Ctx.Request)
	case &quot;profile&quot;:
		pprof.Profile(this.Ctx.ResponseWriter, this.Ctx.Request)
	case &quot;symbol&quot;:
		pprof.Symbol(this.Ctx.ResponseWriter, this.Ctx.Request)
	}
	this.Ctx.ResponseWriter.WriteHeader(200)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用入门" tabindex="-1"><a class="header-anchor" href="#使用入门" aria-hidden="true">#</a> 使用入门</h2><p>通过上面的设计，你可以通过如下代码开启pprof：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
beego.PprofOn = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后你就可以在浏览器中打开如下URL就看到如下界面：<br><img src="`+p+'" alt="" loading="lazy"></p><p>图14.7 系统当前goroutine、heap、thread信息</p><p>点击goroutine我们可以看到很多详细的信息：</p><figure><img src="'+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图14.8 显示当前goroutine的详细信息</p><p>我们还可以通过命令行获取更多详细的信息</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
go tool pprof http://localhost:8080/debug/pprof/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候程序就会进入30秒的profile收集时间，在这段时间内拼命刷新浏览器上的页面，尽量让cpu占用性能产生数据。</p><pre><code>(pprof) top10

Total: 3 samples

   1 33.3% 33.3% 1 33.3% MHeap_AllocLocked

   1 33.3% 66.7% 1 33.3% os/exec.(*Cmd).closeDescriptors

   1 33.3% 100.0% 1 33.3% runtime.sigprocmask

   0 0.0% 100.0% 1 33.3% MCentral_Grow

   0 0.0% 100.0% 2 66.7% main.Compile

   0 0.0% 100.0% 2 66.7% main.compile

   0 0.0% 100.0% 2 66.7% main.run

   0 0.0% 100.0% 1 33.3% makeslice1

   0 0.0% 100.0% 2 66.7% net/http.(*ServeMux).ServeHTTP

   0 0.0% 100.0% 2 66.7% net/http.(*conn).serve	

(pprof)web
</code></pre><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图14.9 展示的执行流程信息</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>',25);function b(f,h){const i=l("RouterLink");return a(),o("div",null,[m,n("ul",null,[n("li",null,[r(i,{to:"/build-web-app/preface.html"},{default:s(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节: "),r(i,{to:"/build-web-app/14.5.html"},{default:s(()=>[e("多语言支持")]),_:1})]),n("li",null,[e("下一节: "),r(i,{to:"/build-web-app/14.7.html"},{default:s(()=>[e("小结")]),_:1})])])])}const _=t(v,[["render",b],["__file","14.6.html.vue"]]);export{_ as default};
