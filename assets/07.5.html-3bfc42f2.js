import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as s,c as d,a as i,d as l,w as r,b as e,e as u}from"./app-9da01d16.js";const v={},c=u(`<h1 id="_7-5-文件操作" tabindex="-1"><a class="header-anchor" href="#_7-5-文件操作" aria-hidden="true">#</a> 7.5 文件操作</h1><p>在任何计算机设备中，文件是都是必须的对象，而在Web编程中,文件的操作一直是Web程序员经常遇到的问题,文件操作在Web应用中是必须的,非常有用的,我们经常遇到生成文件目录,文件(夹)编辑等操作,现在我把Go中的这些操作做一详细总结并实例示范如何使用。</p><h2 id="目录操作" tabindex="-1"><a class="header-anchor" href="#目录操作" aria-hidden="true">#</a> 目录操作</h2><p>文件操作的大多数函数都是在os包里面，下面列举了几个目录操作的：</p><ul><li><p>func Mkdir(name string, perm FileMode) error</p><p>创建名称为name的目录，权限设置是perm，例如0777</p></li><li><p>func MkdirAll(path string, perm FileMode) error</p><p>根据path创建多级子目录，例如astaxie/test1/test2。</p></li><li><p>func Remove(name string) error</p><p>删除名称为name的目录，当目录下有文件或者其他目录时会出错</p></li><li><p>func RemoveAll(path string) error</p><p>根据path删除多级子目录，如果path是单个名称，那么该目录下的子目录全部删除。</p></li></ul><p>下面是演示代码：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;os&quot;
)

func main() {
	os.Mkdir(&quot;astaxie&quot;, 0777)
	os.MkdirAll(&quot;astaxie/test1/test2&quot;, 0777)
	err := os.Remove(&quot;astaxie&quot;)
	if err != nil {
		fmt.Println(err)
	}
	os.RemoveAll(&quot;astaxie&quot;)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作" aria-hidden="true">#</a> 文件操作</h2><h3 id="建立与打开文件" tabindex="-1"><a class="header-anchor" href="#建立与打开文件" aria-hidden="true">#</a> 建立与打开文件</h3><p>新建文件可以通过如下两个方法</p><ul><li><p>func Create(name string) (file *File, err Error)</p><p>根据提供的文件名创建新的文件，返回一个文件对象，默认权限是0666的文件，返回的文件对象是可读写的。</p></li><li><p>func NewFile(fd uintptr, name string) *File</p><p>根据文件描述符创建相应的文件，返回一个文件对象</p></li></ul><p>通过如下两个方法来打开文件：</p><ul><li><p>func Open(name string) (file *File, err Error)</p><p>该方法打开一个名称为name的文件，但是是只读方式，内部实现其实调用了OpenFile。</p></li><li><p>func OpenFile(name string, flag int, perm uint32) (file *File, err Error)</p><p>打开名称为name的文件，flag是打开的方式，只读、读写等，perm是权限</p></li></ul><h3 id="写文件" tabindex="-1"><a class="header-anchor" href="#写文件" aria-hidden="true">#</a> 写文件</h3><p>写文件函数：</p><ul><li><p>func (file *File) Write(b []byte) (n int, err Error)</p><p>写入byte类型的信息到文件</p></li><li><p>func (file *File) WriteAt(b []byte, off int64) (n int, err Error)</p><p>在指定位置开始写入byte类型的信息</p></li><li><p>func (file *File) WriteString(s string) (ret int, err Error)</p><p>写入string信息到文件</p></li></ul><p>写文件的示例代码</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;os&quot;
)

func main() {
	userFile := &quot;astaxie.txt&quot;
	fout, err := os.Create(userFile)		
	if err != nil {
		fmt.Println(userFile, err)
		return
	}
	defer fout.Close()
	for i := 0; i &lt; 10; i++ {
		fout.WriteString(&quot;Just a test!\\r\\n&quot;)
		fout.Write([]byte(&quot;Just a test!\\r\\n&quot;))
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="读文件" tabindex="-1"><a class="header-anchor" href="#读文件" aria-hidden="true">#</a> 读文件</h3><p>读文件函数：</p><ul><li><p>func (file *File) Read(b []byte) (n int, err Error)</p><p>读取数据到b中</p></li><li><p>func (file *File) ReadAt(b []byte, off int64) (n int, err Error)</p><p>从off开始读取数据到b中</p></li></ul><p>读文件的示例代码:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;os&quot;
)

func main() {
	userFile := &quot;asatxie.txt&quot;
	fl, err := os.Open(userFile)		
	if err != nil {
		fmt.Println(userFile, err)
		return
	}
	defer fl.Close()
	buf := make([]byte, 1024)
	for {
		n, _ := fl.Read(buf)
		if 0 == n {
			break
		}
		os.Stdout.Write(buf[:n])
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除文件" tabindex="-1"><a class="header-anchor" href="#删除文件" aria-hidden="true">#</a> 删除文件</h3><p>Go语言里面删除文件和删除文件夹是同一个函数</p><ul><li><p>func Remove(name string) Error</p><p>调用该函数就可以删除文件名为name的文件</p></li></ul><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,27);function o(m,p){const n=t("RouterLink");return s(),d("div",null,[c,i("ul",null,[i("li",null,[l(n,{to:"/build-web-app/preface.html"},{default:r(()=>[e("目录")]),_:1})]),i("li",null,[e("上一节: "),l(n,{to:"/build-web-app/07.4.html"},{default:r(()=>[e("模板处理")]),_:1})]),i("li",null,[e("下一节: "),l(n,{to:"/build-web-app/07.6.html"},{default:r(()=>[e("字符串处理")]),_:1})])])])}const h=a(v,[["render",o],["__file","07.5.html.vue"]]);export{h as default};
