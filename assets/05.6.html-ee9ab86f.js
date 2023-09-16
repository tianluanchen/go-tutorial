import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as a,c as v,a as n,b as e,d as i,w as t,e as d}from"./app-9da01d16.js";const u="/go-tutorial/assets/5.6.mongodb-8b99d249.png?raw=true",c={},m=n("h1",{id:"_5-6-nosql数据库操作",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5-6-nosql数据库操作","aria-hidden":"true"},"#"),e(" 5.6 NOSQL数据库操作")],-1),b=n("p",null,"NoSQL(Not Only SQL)，指的是非关系型的数据库。随着Web2.0的兴起，传统的关系数据库在应付Web2.0网站，特别是超大规模和高并发的SNS类型的Web2.0纯动态网站已经显得力不从心，暴露了很多难以克服的问题，而非关系型的数据库则由于其本身的特点得到了非常迅速的发展。",-1),g=n("p",null,"而Go语言作为21世纪的C语言，对NOSQL的支持也是很好，目前流行的NOSQL主要有redis、mongoDB、Cassandra和Membase等。这些数据库都有高性能、高并发读写等特点，目前已经广泛应用于各种应用中。我接下来主要讲解一下redis和mongoDB的操作。",-1),p=n("h2",{id:"redis",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#redis","aria-hidden":"true"},"#"),e(" redis")],-1),h=n("p",null,"redis是一个key-value存储系统。和Memcached类似，它支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)和zset(有序集合)。",-1),q={href:"http://redis.io/topics/whos-using-redis",target:"_blank",rel:"noopener noreferrer"},_=n("p",null,"Go目前支持redis的驱动有如下",-1),f={href:"https://github.com/gomodule/redigo",target:"_blank",rel:"noopener noreferrer"},k={href:"https://github.com/go-redis/redis",target:"_blank",rel:"noopener noreferrer"},G={href:"https://github.com/hoisie/redis",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/alphazero/Go-Redis",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/simonz05/godis",target:"_blank",rel:"noopener noreferrer"},P=d(`<p>我以redigo驱动为例来演示如何进行数据的操作:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;os&quot;
	&quot;os/signal&quot;
	&quot;syscall&quot;
	&quot;time&quot;

	&quot;github.com/gomodule/redigo/redis&quot;
)

var (
	Pool *redis.Pool
)

func init() {
	redisHost := &quot;:6379&quot;
	Pool = newPool(redisHost)
	close()
}

func newPool(server string) *redis.Pool {

	return &amp;redis.Pool{

		MaxIdle:     3,
		IdleTimeout: 240 * time.Second,

		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial(&quot;tcp&quot;, server)
			if err != nil {
				return nil, err
			}
			return c, err
		},

		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do(&quot;PING&quot;)
			return err
		}
	}
}

func close() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, syscall.SIGTERM)
	signal.Notify(c, syscall.SIGKILL)
	go func() {
		&lt;-c
		Pool.Close()
		os.Exit(0)
	}()
}

func Get(key string) ([]byte, error) {

	conn := Pool.Get()
	defer conn.Close()

	var data []byte
	data, err := redis.Bytes(conn.Do(&quot;GET&quot;, key))
	if err != nil {
		return data, fmt.Errorf(&quot;error get key %s: %v&quot;, key, err)
	}
	return data, err
}

func main() {
	test, err := Get(&quot;test&quot;)
	fmt.Println(test, err)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外以前我fork了最后一个驱动，修复了一些bug，目前应用在我自己的短域名服务项目中(每天200W左右的PV值)</p>`,3),D={href:"https://github.com/astaxie/goredis",target:"_blank",rel:"noopener noreferrer"},B=d(`<p>接下来的以我自己fork的这个redis驱动为例来演示如何进行数据的操作</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;

	&quot;github.com/astaxie/goredis&quot;
)

func main() {
	var client goredis.Client
	// 设置端口为redis默认端口
	client.Addr = &quot;127.0.0.1:6379&quot;
	
	//字符串操作
	client.Set(&quot;a&quot;, []byte(&quot;hello&quot;))
	val, _ := client.Get(&quot;a&quot;)
	fmt.Println(string(val))
	client.Del(&quot;a&quot;)

	//list操作
	vals := []string{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;, &quot;e&quot;}
	for _, v := range vals {
		client.Rpush(&quot;l&quot;, []byte(v))
	}
	dbvals,_ := client.Lrange(&quot;l&quot;, 0, 4)
	for i, v := range dbvals {
		println(i,&quot;:&quot;,string(v))
	}
	client.Del(&quot;l&quot;)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到操作redis非常的方便，而且我实际项目中应用下来性能也很高。client的命令和redis的命令基本保持一致。所以和原生态操作redis非常类似。</p><h2 id="mongodb" tabindex="-1"><a class="header-anchor" href="#mongodb" aria-hidden="true">#</a> mongoDB</h2><p>MongoDB是一个高性能，开源，无模式的文档型数据库，是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。他支持的数据结构非常松散，采用的是类似json的bjson格式来存储数据，因此可以存储比较复杂的数据类型。Mongo最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。</p><p>下图展示了mysql和mongoDB之间的对应关系，我们可以看出来非常的方便，但是mongoDB的性能非常好。</p><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图5.1 MongoDB和Mysql的操作对比图</p>',8),S={href:"http://labix.org/mgo",target:"_blank",rel:"noopener noreferrer"},N=d(`<p>安装mgo:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>go get gopkg.in/mgo.v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面我将演示如何通过Go来操作mongoDB：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main

import (
	&quot;fmt&quot;
	&quot;log&quot;

	&quot;gopkg.in/mgo.v2&quot;
	&quot;gopkg.in/mgo.v2/bson&quot;
)

type Person struct {
	Name  string
	Phone string
}

func main() {
	session, err := mgo.Dial(&quot;server1.example.com,server2.example.com&quot;)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	// Optional. Switch the session to a monotonic behavior.
	session.SetMode(mgo.Monotonic, true)

	c := session.DB(&quot;test&quot;).C(&quot;people&quot;)
	err = c.Insert(&amp;Person{&quot;Ale&quot;, &quot;+55 53 8116 9639&quot;},
		&amp;Person{&quot;Cla&quot;, &quot;+55 53 8402 8510&quot;})
	if err != nil {
		log.Fatal(err)
	}

	result := Person{}
	err = c.Find(bson.M{&quot;name&quot;: &quot;Ale&quot;}).One(&amp;result)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(&quot;Phone:&quot;, result.Phone)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看出来mgo的操作方式和beedb的操作方式几乎类似，都是基于struct的操作方式，这个就是Go Style。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,6);function C(L,M){const s=r("ExternalLinkIcon"),l=r("RouterLink");return a(),v("div",null,[m,b,g,p,h,n("p",null,[e("目前应用redis最广泛的应该是新浪微博平台，其次还有Facebook收购的图片社交网站instagram。以及其他一些有名的"),n("a",q,[e("互联网企业"),i(s)])]),_,n("ul",null,[n("li",null,[n("a",f,[e("https://github.com/gomodule/redigo"),i(s)]),e(" (推荐)")]),n("li",null,[n("a",k,[e("https://github.com/go-redis/redis"),i(s)])]),n("li",null,[n("a",G,[e("https://github.com/hoisie/redis"),i(s)])]),n("li",null,[n("a",x,[e("https://github.com/alphazero/Go-Redis"),i(s)])]),n("li",null,[n("a",y,[e("https://github.com/simonz05/godis"),i(s)])])]),P,n("p",null,[n("a",D,[e("https://github.com/astaxie/goredis"),i(s)])]),B,n("p",null,[e("目前Go支持mongoDB最好的驱动就是"),n("a",S,[e("mgo"),i(s)]),e("，这个驱动目前最有可能成为官方的pkg。")]),N,n("ul",null,[n("li",null,[i(l,{to:"/build-web-app/preface.html"},{default:t(()=>[e("目录")]),_:1})]),n("li",null,[e("上一节: "),i(l,{to:"/build-web-app/05.5.html"},{default:t(()=>[e("使用Beego orm库进行ORM开发")]),_:1})]),n("li",null,[e("下一节: "),i(l,{to:"/build-web-app/05.7.html"},{default:t(()=>[e("小结")]),_:1})])])])}const O=o(c,[["render",C],["__file","05.6.html.vue"]]);export{O as default};
