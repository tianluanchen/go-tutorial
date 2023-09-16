import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as d,a as n,b as s,d as e,w as t,e as o}from"./app-9da01d16.js";const u={},p=n("h1",{id:"_5-3-使用sqlite数据库",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5-3-使用sqlite数据库","aria-hidden":"true"},"#"),s(" 5.3 使用SQLite数据库")],-1),v=n("p",null,"SQLite 是一个开源的嵌入式关系数据库，实现自包容、零配置、支持事务的SQL数据库引擎。其特点是高度便携、使用方便、结构紧凑、高效、可靠。 与其他数据库管理系统不同，SQLite 的安装和运行非常简单，在大多数情况下,只要确保SQLite的二进制文件存在即可开始创建、连接和使用数据库。如果您正在寻找一个嵌入式数据库项目或解决方案，SQLite是绝对值得考虑。SQLite可以说是开源的Access。",-1),m=n("h2",{id:"驱动",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#驱动","aria-hidden":"true"},"#"),s(" 驱动")],-1),b=n("p",null,"Go支持sqlite的驱动也比较多，但是好多都是不支持database/sql接口的",-1),k={href:"https://github.com/mattn/go-sqlite3",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/feyeleanor/gosqlite3",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/phf/go-sqlite3",target:"_blank",rel:"noopener noreferrer"},q=o(`<p>目前支持database/sql的SQLite数据库驱动只有第一个，我目前也是采用它来开发项目的。采用标准接口有利于以后出现更好的驱动的时候做迁移。</p><h2 id="实例代码" tabindex="-1"><a class="header-anchor" href="#实例代码" aria-hidden="true">#</a> 实例代码</h2><p>示例的数据库表结构如下所示，相应的建表SQL：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>userinfo<span class="token punctuation">\`</span></span> <span class="token punctuation">(</span>
	<span class="token identifier"><span class="token punctuation">\`</span>uid<span class="token punctuation">\`</span></span> <span class="token keyword">INTEGER</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> AUTOINCREMENT<span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>username<span class="token punctuation">\`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>department<span class="token punctuation">\`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>created<span class="token punctuation">\`</span></span> <span class="token keyword">DATE</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>userdetail<span class="token punctuation">\`</span></span> <span class="token punctuation">(</span>
	<span class="token identifier"><span class="token punctuation">\`</span>uid<span class="token punctuation">\`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>intro<span class="token punctuation">\`</span></span> <span class="token keyword">TEXT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>profile<span class="token punctuation">\`</span></span> <span class="token keyword">TEXT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>uid<span class="token punctuation">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看下面Go程序是如何操作数据库表数据:增删改查</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;database/sql&quot;
	&quot;fmt&quot;
	&quot;time&quot;
	
	_ &quot;github.com/mattn/go-sqlite3&quot;
)

func main() {
	db, err := sql.Open(&quot;sqlite3&quot;, &quot;./foo.db&quot;)
	checkErr(err)

	//插入数据
	stmt, err := db.Prepare(&quot;INSERT INTO userinfo(username, department, created) values(?,?,?)&quot;)
	checkErr(err)

	res, err := stmt.Exec(&quot;astaxie&quot;, &quot;研发部门&quot;, &quot;2012-12-09&quot;)
	checkErr(err)

	id, err := res.LastInsertId()
	checkErr(err)

	fmt.Println(id)
	//更新数据
	stmt, err = db.Prepare(&quot;update userinfo set username=? where uid=?&quot;)
	checkErr(err)

	res, err = stmt.Exec(&quot;astaxieupdate&quot;, id)
	checkErr(err)

	affect, err := res.RowsAffected()
	checkErr(err)

	fmt.Println(affect)

	//查询数据
	rows, err := db.Query(&quot;SELECT * FROM userinfo&quot;)
	checkErr(err)

	for rows.Next() {
		var uid int
		var username string
		var department string
		var created time.Time
		err = rows.Scan(&amp;uid, &amp;username, &amp;department, &amp;created)
		checkErr(err)
		fmt.Println(uid)
		fmt.Println(username)
		fmt.Println(department)
		fmt.Println(created)
	}

	//删除数据
	stmt, err = db.Prepare(&quot;delete from userinfo where uid=?&quot;)
	checkErr(err)

	res, err = stmt.Exec(id)
	checkErr(err)

	affect, err = res.RowsAffected()
	checkErr(err)

	fmt.Println(affect)

	db.Close()

}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到上面的代码和MySQL例子里面的代码几乎是一模一样的，唯一改变的就是导入的驱动改变了，然后调用<code>sql.Open</code>是采用了SQLite的方式打开。</p>`,7),_={href:"http://sqliteadmin.orbmu2k.de/",target:"_blank",rel:"noopener noreferrer"},E=n("blockquote",null,[n("p",null,"可以方便的新建数据库管理。")],-1),g=n("h2",{id:"links",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#links","aria-hidden":"true"},"#"),s(" links")],-1);function L(w,y){const a=l("ExternalLinkIcon"),i=l("RouterLink");return c(),d("div",null,[p,v,m,b,n("ul",null,[n("li",null,[n("a",k,[s("https://github.com/mattn/go-sqlite3"),e(a)]),s(" 支持database/sql接口，基于cgo(关于cgo的知识请参看官方文档或者本书后面的章节)写的")]),n("li",null,[n("a",h,[s("https://github.com/feyeleanor/gosqlite3"),e(a)]),s(" 不支持database/sql接口，基于cgo写的")]),n("li",null,[n("a",f,[s("https://github.com/phf/go-sqlite3"),e(a)]),s(" 不支持database/sql接口，基于cgo写的")])]),q,n("blockquote",null,[n("p",null,[s("sqlite管理工具："),n("a",_,[s("http://sqliteadmin.orbmu2k.de/"),e(a)])])]),E,g,n("ul",null,[n("li",null,[e(i,{to:"/build-web-app/preface.html"},{default:t(()=>[s("目录")]),_:1})]),n("li",null,[s("上一节: "),e(i,{to:"/build-web-app/05.2.html"},{default:t(()=>[s("使用MySQL数据库")]),_:1})]),n("li",null,[s("下一节: "),e(i,{to:"/build-web-app/05.4.html"},{default:t(()=>[s("使用PostgreSQL数据库")]),_:1})])])])}const T=r(u,[["render",L],["__file","05.3.html.vue"]]);export{T as default};
