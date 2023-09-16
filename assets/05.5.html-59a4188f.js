import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as u,c as t,a as e,b as i,d as n,w as l,e as o}from"./app-9da01d16.js";const v={},m=e("h1",{id:"_5-5-使用beego-orm库进行orm开发",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_5-5-使用beego-orm库进行orm开发","aria-hidden":"true"},"#"),i(" 5.5 使用Beego orm库进行ORM开发")],-1),c=e("p",null,"beego orm是我开发的一个Go进行ORM操作的库，它采用了Go style方式对数据库进行操作，实现了struct到数据表记录的映射。beego orm是一个十分轻量级的Go ORM框架，开发这个库的本意降低复杂的ORM学习曲线，尽可能在ORM的运行效率和功能之间寻求一个平衡，beego orm是目前开源的Go ORM框架中实现比较完整的一个库，而且运行效率相当不错，功能也基本能满足需求。",-1),b=e("p",null,"beego orm是支持database/sql标准接口的ORM库，所以理论上来说，只要数据库驱动支持database/sql接口就可以无缝的接入beego orm。目前我测试过的驱动包括下面几个：",-1),p={href:"https://github.com/go-sql-driver/mysql",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/lib/pq",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/mattn/go-sqlite3",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/ziutek/mymysql",target:"_blank",rel:"noopener noreferrer"},f=e("p",null,"暂未支持数据库:",-1),_={href:"https://github.com/denisenkom/go-mssqldb",target:"_blank",rel:"noopener noreferrer"},G={href:"https://github.com/mattn/go-adodb",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/mattn/go-oci8",target:"_blank",rel:"noopener noreferrer"},R={href:"https://bitbucket.org/miquella/mgodbc",target:"_blank",rel:"noopener noreferrer"},y=o(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>beego orm支持go get方式安装，是完全按照Go Style的方式来实现的。</p><pre><code>go get github.com/astaxie/beego
</code></pre><h2 id="如何初始化" tabindex="-1"><a class="header-anchor" href="#如何初始化" aria-hidden="true">#</a> 如何初始化</h2><p>首先你需要import相应的数据库驱动包、database/sql标准接口包以及beego orm包，如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
import (
	&quot;database/sql&quot;
	&quot;github.com/astaxie/beego/orm&quot;
	_ &quot;github.com/go-sql-driver/mysql&quot;
)

func init() {
	//注册驱动
	orm.RegisterDriver(&quot;mysql&quot;, orm.DRMySQL)
	//设置默认数据库
	orm.RegisterDataBase(&quot;default&quot;, &quot;mysql&quot;, &quot;root:root@/my_db?charset=utf8&quot;, 30)
	//注册定义的model
    	orm.RegisterModel(new(User))

   	// 创建table
        orm.RunSyncdb(&quot;default&quot;, false, true)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PostgreSQL 配置:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>//导入驱动
// _ &quot;github.com/lib/pq&quot;

// 注册驱动
orm.RegisterDriver(&quot;postgres&quot;, orm.DR_Postgres) 

// 设置默认数据库
//PostgresQL用户：postgres ，密码：zxxx ， 数据库名称：test ， 数据库别名：default
orm.RegisterDataBase(&quot;default&quot;, &quot;postgres&quot;, &quot;user=postgres password=zxxx dbname=test host=127.0.0.1 port=5432 sslmode=disable&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MySQL 配置:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>//导入驱动
//_ &quot;github.com/go-sql-driver/mysql&quot;

//注册驱动
orm.RegisterDriver(&quot;mysql&quot;, orm.DR_MySQL)

// 设置默认数据库
//mysql用户：root ，密码：zxxx ， 数据库名称：test ， 数据库别名：default
 orm.RegisterDataBase(&quot;default&quot;, &quot;mysql&quot;, &quot;root:zxxx@/test?charset=utf8&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Sqlite 配置:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>//导入驱动
//_ &quot;github.com/mattn/go-sqlite3&quot;

//注册驱动
orm.RegisterDriver(&quot;sqlite&quot;, orm.DR_Sqlite)

// 设置默认数据库
//数据库存放位置：./datas/test.db ， 数据库别名：default
orm.RegisterDataBase(&quot;default&quot;, &quot;sqlite3&quot;, &quot;./datas/test.db&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导入必须的package之后,我们需要打开到数据库的链接，然后创建一个beego orm对象（以MySQL为例)，如下所示<br> beego orm:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func main() {
    	o := orm.NewOrm()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单示例:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
    &quot;fmt&quot;
    &quot;github.com/astaxie/beego/orm&quot;
    _ &quot;github.com/go-sql-driver/mysql&quot; // 导入数据库驱动
)

// Model Struct
type User struct {
    Id   int
    Name string \`orm:&quot;size(100)&quot;\`
}

func init() {
    // 设置默认数据库
    orm.RegisterDataBase(&quot;default&quot;, &quot;mysql&quot;, &quot;root:root@/my_db?charset=utf8&quot;, 30)
    
    // 注册定义的 model
    orm.RegisterModel(new(User))
//RegisterModel 也可以同时注册多个 model
//orm.RegisterModel(new(User), new(Profile), new(Post))

    // 创建 table
    orm.RunSyncdb(&quot;default&quot;, false, true)
}

func main() {
    o := orm.NewOrm()

    user := User{Name: &quot;slene&quot;}

    // 插入表
    id, err := o.Insert(&amp;user)
    fmt.Printf(&quot;ID: %d, ERR: %v\\n&quot;, id, err)

    // 更新表
    user.Name = &quot;astaxie&quot;
    num, err := o.Update(&amp;user)
    fmt.Printf(&quot;NUM: %d, ERR: %v\\n&quot;, num, err)

    // 读取 one
    u := User{Id: user.Id}
    err = o.Read(&amp;u)
    fmt.Printf(&quot;ERR: %v\\n&quot;, err)

    // 删除表
    num, err = o.Delete(&amp;u)
    fmt.Printf(&quot;NUM: %d, ERR: %v\\n&quot;, num, err)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SetMaxIdleConns</p><p>根据数据库的别名，设置数据库的最大空闲连接</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
orm.SetMaxIdleConns(&quot;default&quot;, 30)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>SetMaxOpenConns</p><p>根据数据库的别名，设置数据库的最大数据库连接 (go &gt;= 1.2)</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
orm.SetMaxOpenConns(&quot;default&quot;, 30)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>目前beego orm支持打印调试，你可以通过如下的代码实现调试</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
 orm.Debug = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们的例子采用前面的数据库表User，现在我们建立相应的struct</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type Userinfo struct {
	Uid         int \`orm:&quot;PK&quot;\` //如果表的主键不是id，那么需要加上pk注释，显式的说这个字段是主键
	Username    string
	Departname  string
	Created     time.Time
}

type User struct {
	Uid         int \`orm:&quot;PK&quot;\` //如果表的主键不是id，那么需要加上pk注释，显式的说这个字段是主键
	Name        string
	Profile     *Profile   \`orm:&quot;rel(one)&quot;\` // OneToOne relation
	Post        []*Post \`orm:&quot;reverse(many)&quot;\` // 设置一对多的反向关系
}

type Profile struct {
	Id          int
	Age         int16
	User        *User   \`orm:&quot;reverse(one)&quot;\` // 设置一对一反向关系(可选)
}

type Post struct {
	Id    int
	Title string
	User  *User  \`orm:&quot;rel(fk)&quot;\`
	Tags  []*Tag \`orm:&quot;rel(m2m)&quot;\`    //设置一对多关系
}

type Tag struct {
	Id    int
	Name  string
	Posts []*Post \`orm:&quot;reverse(many)&quot;\`
}

func init() {
	// 需要在init中注册定义的model
	orm.RegisterModel(new(Userinfo),new(User), new(Profile), new(Post), new(Tag))
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意一点，beego orm针对驼峰命名会自动帮你转化成下划线字段，例如你定义了struct名字为<code>UserInfo</code>，那么转化成底层实现的时候是<code>user_info</code>，字段命名也遵循该规则。</p></blockquote><h2 id="插入数据" tabindex="-1"><a class="header-anchor" href="#插入数据" aria-hidden="true">#</a> 插入数据</h2><p>下面的代码演示了如何插入一条记录，可以看到我们操作的是struct对象，而不是原生的sql语句，最后通过调用Insert接口将数据保存到数据库。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
o := orm.NewOrm()
var user User
user.Name = &quot;zxxx&quot;
user.Departname = &quot;zxxx&quot;

id, err := o.Insert(&amp;user)
if err == nil {
	fmt.Println(id)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到插入之后<code>user.Uid</code>就是插入成功之后的自增ID。</p><p>同时插入多个对象:InsertMulti</p><p>类似sql语句</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
insert into table (name, age) values(&quot;slene&quot;, 28),(&quot;astaxie&quot;, 30),(&quot;unknown&quot;, 20)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个参数 bulk 为并列插入的数量，第二个为对象的slice</p><p>返回值为成功插入的数量</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
users := []User{
    {Name: &quot;slene&quot;},
    {Name: &quot;astaxie&quot;},
    {Name: &quot;unknown&quot;},
    ...
}
successNums, err := o.InsertMulti(100, users)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>bulk 为 1 时，将会顺序插入 slice 中的数据</p><h2 id="更新数据" tabindex="-1"><a class="header-anchor" href="#更新数据" aria-hidden="true">#</a> 更新数据</h2><p>继续上面的例子来演示更新操作，现在user的主键已经有值了，此时调用Insert接口，beego orm内部会自动调用update以进行数据的更新而非插入操作。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
o := orm.NewOrm()
user := User{Uid: 1}
if o.Read(&amp;user) == nil {
	user.Name = &quot;MyName&quot;
	if num, err := o.Update(&amp;user); err == nil {
		fmt.Println(num)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Update 默认更新所有的字段，可以更新指定的字段：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// 只更新 Name
o.Update(&amp;user, &quot;Name&quot;)
// 指定多个字段
// o.Update(&amp;user, &quot;Field1&quot;, &quot;Field2&quot;, ...)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Where: 用来设置条件，支持多个参数，第一个参数如果为整数，相当于调用了Where(&quot;主键=?&quot;,值)。</p><h2 id="查询数据" tabindex="-1"><a class="header-anchor" href="#查询数据" aria-hidden="true">#</a> 查询数据</h2><p>beego orm的查询接口比较灵活，具体使用请看下面的例子</p><p>例子1，根据主键获取数据：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
o := orm.NewOrm()
var user User

user := User{Id: 1}

err = o.Read(&amp;user)

if err == orm.ErrNoRows {
	fmt.Println(&quot;查询不到&quot;)
} else if err == orm.ErrMissPK {
	fmt.Println(&quot;找不到主键&quot;)
} else {
	fmt.Println(user.Id, user.Name)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子2：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
o := orm.NewOrm()
var user User

qs := o.QueryTable(user) // 返回 QuerySeter
qs.Filter(&quot;id&quot;, 1) // WHERE id = 1
qs.Filter(&quot;profile__age&quot;, 18) // WHERE profile.age = 18
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子3，WHERE IN查询条件：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
qs.Filter(&quot;profile__age__in&quot;, 18, 20) 
// WHERE profile.age IN (18, 20)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子4，更加复杂的条件：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
qs.Filter(&quot;profile__age__in&quot;, 18, 20).Exclude(&quot;profile__lt&quot;, 1000)
// WHERE profile.age IN (18, 20) AND NOT profile_id &lt; 1000

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过如下接口获取多条数据，请看示例</p><p>例子1，根据条件age&gt;17，获取20位置开始的10条数据的数据</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var allusers []User
qs.Filter(&quot;profile__age__gt&quot;, 17)
// WHERE profile.age &gt; 17
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子2，limit默认从10开始，获取10条数据</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
qs.Limit(10, 20)
// LIMIT 10 OFFSET 20 注意跟SQL反过来的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除数据" tabindex="-1"><a class="header-anchor" href="#删除数据" aria-hidden="true">#</a> 删除数据</h2><p>beedb提供了丰富的删除数据接口，请看下面的例子</p><p>例子1，删除单条数据</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
o := orm.NewOrm()
if num, err := o.Delete(&amp;User{Id: 1}); err == nil {
	fmt.Println(num)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Delete 操作会对反向关系进行操作，此例中 Post 拥有一个到 User 的外键。删除 User 的时候。如果 on_delete 设置为默认的级联操作，将删除对应的 Post</p><h2 id="关联查询" tabindex="-1"><a class="header-anchor" href="#关联查询" aria-hidden="true">#</a> 关联查询</h2><p>有些应用却需要用到连接查询，所以现在beego orm提供了一个简陋的实现方案：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type Post struct {
	Id    int    \`orm:&quot;auto&quot;\`
	Title string \`orm:&quot;size(100)&quot;\`
	User  *User  \`orm:&quot;rel(fk)&quot;\`
}

var posts []*Post
qs := o.QueryTable(&quot;post&quot;)
num, err := qs.Filter(&quot;User__Name&quot;, &quot;slene&quot;).All(&amp;posts)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中我们看到了一个struct关联查询</p><h2 id="groupby和having" tabindex="-1"><a class="header-anchor" href="#groupby和having" aria-hidden="true">#</a> GroupBy和Having</h2><p>针对有些应用需要用到group by的功能，beego orm也提供了一个简陋的实现</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
qs.OrderBy(&quot;id&quot;, &quot;-profile__age&quot;)
// ORDER BY id ASC, profile.age DESC

qs.OrderBy(&quot;-profile__age&quot;, &quot;profile&quot;)
// ORDER BY profile.age DESC, profile_id ASC

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中出现了两个新接口函数</p><p>GroupBy:用来指定进行groupby的字段</p><p>Having:用来指定having执行的时候的条件</p><h2 id="使用原生sql" tabindex="-1"><a class="header-anchor" href="#使用原生sql" aria-hidden="true">#</a> 使用原生sql</h2><p>简单示例:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
o := orm.NewOrm()
var r orm.RawSeter
r = o.Raw(&quot;UPDATE user SET name = ? WHERE name = ?&quot;, &quot;testing&quot;, &quot;slene&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>复杂原生sql使用:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (m *User) Query(name string) user []User {
	var o orm.Ormer
	var rs orm.RawSeter
	o = orm.NewOrm()
	rs = o.Raw(&quot;SELECT * FROM user &quot;+
		&quot;WHERE name=? AND uid&gt;10 &quot;+
		&quot;ORDER BY uid DESC &quot;+
		&quot;LIMIT 100&quot;, name)
	//var user []User
	num, err := rs.QueryRows(&amp;user)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(num)
		//return user
	}
	return
}	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,79),U={href:"https://beego.me",target:"_blank",rel:"noopener noreferrer"},N=e("h2",{id:"进一步的发展",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#进一步的发展","aria-hidden":"true"},"#"),i(" 进一步的发展")],-1),E=e("p",null,"目前beego orm已经获得了很多来自国内外用户的反馈，我目前也正在考虑支持更多数据库，接下来会在更多方面进行改进",-1),P=e("h2",{id:"links",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#links","aria-hidden":"true"},"#"),i(" links")],-1);function k(M,S){const s=r("ExternalLinkIcon"),d=r("RouterLink");return u(),t("div",null,[m,c,b,e("p",null,[i("Mysql: "),e("a",p,[i("github/go-mysql-driver/mysql"),n(s)])]),e("p",null,[i("PostgreSQL: "),e("a",g,[i("github.com/lib/pq"),n(s)])]),e("p",null,[i("SQLite: "),e("a",q,[i("github.com/mattn/go-sqlite3"),n(s)])]),e("p",null,[i("Mysql: "),e("a",h,[i("github.com/ziutek/mymysql/godrv"),n(s)])]),f,e("p",null,[i("MsSql: "),e("a",_,[i("github.com/denisenkom/go-mssqldb"),n(s)])]),e("p",null,[i("MS ADODB: "),e("a",G,[i("github.com/mattn/go-adodb"),n(s)])]),e("p",null,[i("Oracle: "),e("a",x,[i("github.com/mattn/go-oci8"),n(s)])]),e("p",null,[i("ODBC: "),e("a",R,[i("bitbucket.org/miquella/mgodbc"),n(s)])]),y,e("p",null,[i("更多说明,请到"),e("a",U,[i("beego.me"),n(s)])]),N,E,P,e("ul",null,[e("li",null,[n(d,{to:"/build-web-app/preface.html"},{default:l(()=>[i("目录")]),_:1})]),e("li",null,[i("上一节: "),n(d,{to:"/build-web-app/05.4.html"},{default:l(()=>[i("使用PostgreSQL数据库")]),_:1})]),e("li",null,[i("下一节: "),n(d,{to:"/build-web-app/05.6.html"},{default:l(()=>[i("NOSQL数据库操作")]),_:1})])])])}const O=a(v,[["render",k],["__file","05.5.html.vue"]]);export{O as default};
