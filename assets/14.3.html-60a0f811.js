import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as r,f as d,a as t,d as a,w as n,b as s,e as u}from"./app-9da01d16.js";const o={},p=u(`<h1 id="_14-3-表单及验证支持" tabindex="-1"><a class="header-anchor" href="#_14-3-表单及验证支持" aria-hidden="true">#</a> 14.3 表单及验证支持</h1><p>在Web开发中对于这样的一个流程可能很眼熟：</p><ul><li>打开一个网页显示出表单。</li><li>用户填写并提交了表单。</li><li>如果用户提交了一些无效的信息，或者可能漏掉了一个必填项，表单将会连同用户的数据和错误问题的描述信息返回。</li><li>用户再次填写，继续上一步过程，直到提交了一个有效的表单。</li></ul><p>在接收端，脚本必须：</p><ul><li>检查用户递交的表单数据。</li><li>验证数据是否为正确的类型，合适的标准。例如，如果一个用户名被提交，它必须被验证是否只包含了允许的字符。它必须有一个最小长度，不能超过最大长度。用户名不能与已存在的他人用户名重复，甚至是一个保留字等。</li><li>过滤数据并清理不安全字符，保证逻辑处理中接收的数据是安全的。</li><li>如果需要，预格式化数据（数据需要清除空白或者经过HTML编码等等。）</li><li>准备好数据，插入数据库。</li></ul><p>尽管上面的过程并不是很复杂，但是通常情况下需要编写很多代码，而且为了显示错误信息，在网页中经常要使用多种不同的控制结构。创建表单验证虽简单，实施起来实在枯燥无味。</p><h2 id="表单和验证" tabindex="-1"><a class="header-anchor" href="#表单和验证" aria-hidden="true">#</a> 表单和验证</h2><p>对于开发者来说，一般开发过程都是相当复杂，而且大多是在重复一样的工作。假设一个场景项目中忽然需要增加一个表单数据，那么局部代码的整个流程都需要修改。我们知道Go里面struct是常用的一个数据结构，因此beego的form采用了struct来处理表单信息。</p><p>首先定义一个开发Web应用时相对应的struct，一个字段对应一个form元素，通过struct的tag来定义相应的元素信息和验证信息，如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type User struct{
	Username 	string 	\`form:text,valid:required\`
	Nickname 	string 	\`form:text,valid:required\`
	Age			int 	\`form:text,valid:required|numeric\`
	Email 		string 	\`form:text,valid:required|valid_email\`
	Introduce 	string 	\`form:textarea\`
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义好struct之后接下来在controller中这样操作</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (this *AddController) Get() {
	this.Data[&quot;form&quot;] = beego.Form(&amp;User{})
	this.Layout = &quot;admin/layout.html&quot;
	this.TplNames = &quot;admin/add.tpl&quot;
}		
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在模板中这样显示表单</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>New Blog Post<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
{{.form.render()}}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面我们定义好了整个的第一步，从struct到显示表单的过程，接下来就是用户填写信息，服务器端接收数据然后验证，最后插入数据库。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (this *AddController) Post() {
	var user User
	form := this.GetInput(&amp;user)
	if !form.Validates() {
		return
	}
	models.UserInsert(&amp;user)
	this.Ctx.Redirect(302, &quot;/admin/index&quot;)
}		
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="表单类型" tabindex="-1"><a class="header-anchor" href="#表单类型" aria-hidden="true">#</a> 表单类型</h2><p>以下列表列出来了对应的form元素信息：</p>`,18),m=t("table",{cellpadding:"0",cellspacing:"1",border:"0",style:{width:"100%"},class:"tableborder"},[t("tbody",null,[t("tr",null,[t("th",null,"名称"),t("th",null,"参数"),t("th",null,"功能描述")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"text")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"textbox输入框")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"button")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"按钮")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"checkbox")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"多选择框")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"dropdown")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"下拉选择框")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"file")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"文件上传")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"hidden")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"隐藏元素")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"password")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"密码输入框")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"radio")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"单选框")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"textarea")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"文本输入框")])])],-1),v=t("h2",{id:"表单验证",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#表单验证","aria-hidden":"true"},"#"),s(" 表单验证")],-1),h=t("p",null,"以下列表将列出可被使用的原生规则",-1),g=t("table",{cellpadding:"0",cellspacing:"1",border:"0",style:{width:"100%"},class:"tableborder"},[t("tbody",null,[t("tr",null,[t("th",null,"规则"),t("th",null,"参数"),t("th",null,"描述"),t("th",null,"举例")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"required")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果元素为空，则返回FALSE"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"matches")]),t("td",{class:"td"},"Yes"),t("td",{class:"td"},"如果表单元素的值与参数中对应的表单字段的值不相等，则返回FALSE"),t("td",{class:"td"},"matches[form_item]")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"is_unique")]),t("td",{class:"td"},"Yes"),t("td",{class:"td"},"如果表单元素的值与指定数据表栏位有重复，则返回False（译者注：比如is_unique[User.Email]，那么验证类会去查找User表中Email栏位有没有与表单元素一样的值，如存重复，则返回false，这样开发者就不必另写Callback验证代码。）"),t("td",{class:"td"},"is_unique[table.field]")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"min_length")]),t("td",{class:"td"},"Yes"),t("td",{class:"td"},"如果表单元素值的字符长度少于参数中定义的数字，则返回FALSE"),t("td",{class:"td"},"min_length[6]")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"max_length")]),t("td",{class:"td"},"Yes"),t("td",{class:"td"},"如果表单元素值的字符长度大于参数中定义的数字，则返回FALSE"),t("td",{class:"td"},"max_length[12]")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"exact_length")]),t("td",{class:"td"},"Yes"),t("td",{class:"td"},"如果表单元素值的字符长度与参数中定义的数字不符，则返回FALSE"),t("td",{class:"td"},"exact_length[8]")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"greater_than")]),t("td",{class:"td"},"Yes"),t("td",{class:"td"},"如果表单元素值是非数字类型，或小于参数定义的值，则返回FALSE"),t("td",{class:"td"},"greater_than[8]")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"less_than")]),t("td",{class:"td"},"Yes"),t("td",{class:"td"},"如果表单元素值是非数字类型，或大于参数定义的值，则返回FALSE"),t("td",{class:"td"},"less_than[8]")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"alpha")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素值中包含除字母以外的其他字符，则返回FALSE"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"alpha_numeric")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素值中包含除字母和数字以外的其他字符，则返回FALSE"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"alpha_dash")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素值中包含除字母/数字/下划线/破折号以外的其他字符，则返回FALSE"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"numeric")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素值中包含除数字以外的字符，则返回 FALSE"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"integer")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素中包含除整数以外的字符，则返回FALSE"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"decimal")]),t("td",{class:"td"},"Yes"),t("td",{class:"td"},"如果表单元素中输入（非小数）不完整的值，则返回FALSE"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"is_natural")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素值中包含了非自然数的其他数值 （其他数值不包括零），则返回FALSE。自然数形如：0,1,2,3....等等。"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"is_natural_no_zero")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素值包含了非自然数的其他数值 （其他数值包括零），则返回FALSE。非零的自然数：1,2,3.....等等。"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"valid_email")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素值包含不合法的email地址，则返回FALSE"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"valid_emails")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素值中任何一个值包含不合法的email地址（地址之间用英文逗号分割），则返回FALSE。"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"valid_ip")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素的值不是一个合法的IP地址，则返回FALSE。"),t("td",{class:"td"}," ")]),t("tr",null,[t("td",{class:"td"},[t("strong",null,"valid_base64")]),t("td",{class:"td"},"No"),t("td",{class:"td"},"如果表单元素的值包含除了base64 编码字符之外的其他字符，则返回FALSE。"),t("td",{class:"td"}," ")])])],-1),b=t("h2",{id:"links",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#links","aria-hidden":"true"},"#"),s(" links")],-1);function _(f,k){const l=c("RouterLink");return i(),r("div",null,[d(" {% raw %} "),p,m,v,h,g,b,t("ul",null,[t("li",null,[a(l,{to:"/build-web-app/preface.html"},{default:n(()=>[s("目录")]),_:1})]),t("li",null,[s("上一节: "),a(l,{to:"/build-web-app/14.2.html"},{default:n(()=>[s("Session支持")]),_:1})]),t("li",null,[s("下一节: "),a(l,{to:"/build-web-app/14.4.html"},{default:n(()=>[s("用户认证")]),_:1})])]),d(" {% endraw %} ")])}const E=e(o,[["render",_],["__file","14.3.html.vue"]]);export{E as default};
