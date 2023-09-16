import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as d,c,a as n,b as e,d as s,w as t,e as o}from"./app-9da01d16.js";const u={},p=n("h1",{id:"_5-4-使用postgresql数据库",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5-4-使用postgresql数据库","aria-hidden":"true"},"#"),e(" 5.4 使用PostgreSQL数据库")],-1),v=n("p",null,"PostgreSQL 是一个自由的对象-关系数据库服务器(数据库管理系统)，它在灵活的 BSD-风格许可证下发行。它提供了相对其他开放源代码数据库系统(比如 MySQL 和 Firebird)，和对专有系统比如 Oracle、Sybase、IBM 的 DB2 和 Microsoft SQL Server的一种选择。",-1),m=n("p",null,"PostgreSQL和MySQL比较，它更加庞大一点，因为它是用来替代Oracle而设计的。所以在企业应用中采用PostgreSQL是一个明智的选择。",-1),b=n("p",null,"MySQL被Oracle收购之后正在逐步的封闭（自MySQL 5.5.31以后的所有版本将不再遵循GPL协议），鉴于此，将来我们也许会选择PostgreSQL而不是MySQL作为项目的后端数据库。",-1),k=n("h2",{id:"驱动",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#驱动","aria-hidden":"true"},"#"),e(" 驱动")],-1),h=n("p",null,"Go实现的支持PostgreSQL的驱动也很多，因为国外很多人在开发中使用了这个数据库。",-1),f={href:"https://github.com/lib/pq",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/jbarham/gopgsqldriver",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/lxn/go-pgsql",target:"_blank",rel:"noopener noreferrer"},_=o(`<p>在下面的示例中我采用了第一个驱动，因为它目前使用的人最多，在GitHub上也比较活跃。</p><h2 id="实例代码" tabindex="-1"><a class="header-anchor" href="#实例代码" aria-hidden="true">#</a> 实例代码</h2><p>数据库建表语句：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> userinfo
<span class="token punctuation">(</span>
	uid <span class="token keyword">serial</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	username <span class="token keyword">character</span> <span class="token keyword">varying</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	department <span class="token keyword">character</span> <span class="token keyword">varying</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	Created <span class="token keyword">date</span><span class="token punctuation">,</span>
	<span class="token keyword">CONSTRAINT</span> userinfo_pkey <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>uid<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token keyword">WITH</span> <span class="token punctuation">(</span>OIDS<span class="token operator">=</span><span class="token boolean">FALSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> userdetail
<span class="token punctuation">(</span>
	uid <span class="token keyword">integer</span><span class="token punctuation">,</span>
	intro <span class="token keyword">character</span> <span class="token keyword">varying</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	profile <span class="token keyword">character</span> <span class="token keyword">varying</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token keyword">WITH</span><span class="token punctuation">(</span>OIDS<span class="token operator">=</span><span class="token boolean">FALSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看下面这个Go如何操作数据库表数据:增删改查</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;database/sql&quot;
	&quot;fmt&quot;
	
	_ &quot;github.com/lib/pq&quot;
)

func main() {
	db, err := sql.Open(&quot;postgres&quot;, &quot;user=astaxie password=astaxie dbname=test sslmode=disable&quot;)
	checkErr(err)

	//插入数据
	stmt, err := db.Prepare(&quot;INSERT INTO userinfo(username,department,created) VALUES($1,$2,$3) RETURNING uid&quot;)
	checkErr(err)

	res, err := stmt.Exec(&quot;astaxie&quot;, &quot;研发部门&quot;, &quot;2012-12-09&quot;)
	checkErr(err)

	//pg不支持这个函数，因为他没有类似MySQL的自增ID
	// id, err := res.LastInsertId()
	// checkErr(err)
	// fmt.Println(id)

	var lastInsertId int
	err = db.QueryRow(&quot;INSERT INTO userinfo(username,departname,created) VALUES($1,$2,$3) returning uid;&quot;, &quot;astaxie&quot;, &quot;研发部门&quot;, &quot;2012-12-09&quot;).Scan(&amp;lastInsertId)
	checkErr(err)
	fmt.Println(&quot;最后插入id =&quot;, lastInsertId)


	//更新数据
	stmt, err = db.Prepare(&quot;update userinfo set username=$1 where uid=$2&quot;)
	checkErr(err)

	res, err = stmt.Exec(&quot;astaxieupdate&quot;, 1)
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
		var created string
		err = rows.Scan(&amp;uid, &amp;username, &amp;department, &amp;created)
		checkErr(err)
		fmt.Println(uid)
		fmt.Println(username)
		fmt.Println(department)
		fmt.Println(created)
	}

	//删除数据
	stmt, err = db.Prepare(&quot;delete from userinfo where uid=$1&quot;)
	checkErr(err)

	res, err = stmt.Exec(1)
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的代码我们可以看到，PostgreSQL是通过<code>$1</code>,<code>$2</code>这种方式来指定要传递的参数，而不是MySQL中的<code>?</code>，另外在sql.Open中的dsn信息的格式也与MySQL的驱动中的dsn格式不一样，所以在使用时请注意它们的差异。</p><p>还有pg不支持LastInsertId函数，因为PostgreSQL内部没有实现类似MySQL的自增ID返回，其他的代码几乎是一模一样。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,9);function L(y,E){const a=r("ExternalLinkIcon"),i=r("RouterLink");return d(),c("div",null,[p,v,m,b,k,h,n("ul",null,[n("li",null,[n("a",f,[e("https://github.com/lib/pq"),s(a)]),e(" 支持database/sql驱动，纯Go写的")]),n("li",null,[n("a",q,[e("https://github.com/jbarham/gopgsqldriver"),s(a)]),e(" 支持database/sql驱动，纯Go写的")]),n("li",null,[n("a",g,[e("https://github.com/lxn/go-pgsql"),s(a)]),e(" 支持database/sql驱动，纯Go写的")])]),_,n("ul",null,[n("li",null,[s(i,{to:"/build-web-app/preface.html"},{default:t(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节: "),s(i,{to:"/build-web-app/05.3.html"},{default:t(()=>[e("使用SQLite数据库")]),_:1})]),n("li",null,[e("下一节: "),s(i,{to:"/build-web-app/05.5.html"},{default:t(()=>[e("使用Beego orm库进行ORM开发")]),_:1})])])])}const I=l(u,[["render",L],["__file","05.4.html.vue"]]);export{I as default};
