import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as o,a as n,b as s,d as e,w as i,e as d}from"./app-9da01d16.js";const p={},u=n("h1",{id:"_5-2-使用mysql数据库",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5-2-使用mysql数据库","aria-hidden":"true"},"#"),s(" 5.2 使用MySQL数据库")],-1),v=n("p",null,"目前Internet上流行的网站构架方式是LAMP，其中的M即MySQL, 作为数据库，MySQL以免费、开源、使用方便为优势成为了很多Web开发的后端数据库存储引擎。",-1),m=n("h2",{id:"mysql驱动",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#mysql驱动","aria-hidden":"true"},"#"),s(" MySQL驱动")],-1),b=n("p",null,"Go中支持MySQL的驱动目前比较多，有如下几种，有些是支持database/sql标准，而有些是采用了自己的实现接口,常用的有如下几种:",-1),k={href:"https://github.com/go-sql-driver/mysql",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/ziutek/mymysql",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/Philio/GoMySQL",target:"_blank",rel:"noopener noreferrer"},q=n("p",null,"接下来的例子我主要以第一个驱动为例(我目前项目中也是采用它来驱动)，也推荐大家采用它，主要理由：",-1),_=n("li",null,"这个驱动比较新，维护的比较好",-1),y=n("li",null,"完全支持database/sql接口",-1),L={href:"http://www.mikespook.com",target:"_blank",rel:"noopener noreferrer"},E=d(`<h2 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码" aria-hidden="true">#</a> 示例代码</h2><p>接下来的几个小节里面我们都将采用同一个数据库表结构：数据库test，用户表userinfo，关联用户信息表userdetail。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>userinfo<span class="token punctuation">\`</span></span> <span class="token punctuation">(</span>
	<span class="token identifier"><span class="token punctuation">\`</span>uid<span class="token punctuation">\`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>username<span class="token punctuation">\`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>department<span class="token punctuation">\`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>created<span class="token punctuation">\`</span></span> <span class="token keyword">DATE</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>uid<span class="token punctuation">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>userdetail<span class="token punctuation">\`</span></span> <span class="token punctuation">(</span>
	<span class="token identifier"><span class="token punctuation">\`</span>uid<span class="token punctuation">\`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>intro<span class="token punctuation">\`</span></span> <span class="token keyword">TEXT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>profile<span class="token punctuation">\`</span></span> <span class="token keyword">TEXT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
	<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>uid<span class="token punctuation">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下示例将示范如何使用database/sql接口对数据库表进行增删改查操作</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;database/sql&quot;
	&quot;fmt&quot;
	//&quot;time&quot;

	_ &quot;github.com/go-sql-driver/mysql&quot;
)

func main() {
	db, err := sql.Open(&quot;mysql&quot;, &quot;astaxie:astaxie@/test?charset=utf8&quot;)
	checkErr(err)

	//插入数据
	stmt, err := db.Prepare(&quot;INSERT INTO userinfo SET username=?,department=?,created=?&quot;)
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
		var created string
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的代码我们可以看出，Go操作Mysql数据库是很方便的。</p><p>关键的几个函数我解释一下：</p><p>sql.Open()函数用来打开一个注册过的数据库驱动，go-sql-driver中注册了mysql这个数据库驱动，第二个参数是DSN(Data Source Name)，它是go-sql-driver定义的一些数据库链接和配置信息。它支持如下格式：</p><pre><code>user@unix(/path/to/socket)/dbname?charset=utf8
user:password@tcp(localhost:5555)/dbname?charset=utf8
user:password@/dbname
user:password@tcp([de:ad:be:ef::ca:fe]:80)/dbname
</code></pre><p>db.Prepare()函数用来返回准备要执行的sql操作，然后返回准备完毕的执行状态。</p><p>db.Query()函数用来直接执行Sql返回Rows结果。</p><p>stmt.Exec()函数用来执行stmt准备好的SQL语句</p><p>我们可以看到我们传入的参数都是=?对应的数据，这样做的方式可以一定程度上防止SQL注入。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,14);function w(g,N){const a=l("ExternalLinkIcon"),t=l("RouterLink");return c(),o("div",null,[u,v,m,b,n("ul",null,[n("li",null,[n("a",k,[s("https://github.com/go-sql-driver/mysql"),e(a)]),s(" 支持database/sql，全部采用go写。")]),n("li",null,[n("a",h,[s("https://github.com/ziutek/mymysql"),e(a)]),s(" 支持database/sql，也支持自定义的接口，全部采用go写。")]),n("li",null,[n("a",f,[s("https://github.com/Philio/GoMySQL"),e(a)]),s(" 不支持database/sql，自定义接口，全部采用go写。")])]),q,n("ul",null,[_,y,n("li",null,[s("支持keepalive，保持长连接,虽然"),n("a",L,[s("星星"),e(a)]),s("fork的mymysql也支持keepalive，但不是线程安全的，这个从底层就支持了keepalive。")])]),E,n("ul",null,[n("li",null,[e(t,{to:"/build-web-app/preface.html"},{default:i(()=>[s("目录")]),_:1})]),n("li",null,[s("上一节: "),e(t,{to:"/build-web-app/05.1.html"},{default:i(()=>[s("database/sql接口")]),_:1})]),n("li",null,[s("下一节: "),e(t,{to:"/build-web-app/05.3.html"},{default:i(()=>[s("使用SQLite数据库")]),_:1})])])])}const A=r(p,[["render",w],["__file","05.2.html.vue"]]);export{A as default};
