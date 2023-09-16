import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as l,c as o,a as i,d as n,w as a,b as e,e as t}from"./app-9da01d16.js";const v={},u=t(`<h1 id="_6-2-go如何使用session" tabindex="-1"><a class="header-anchor" href="#_6-2-go如何使用session" aria-hidden="true">#</a> 6.2 Go如何使用session</h1><p>通过上一小节的介绍，我们知道session是在服务器端实现的一种用户和服务器之间认证的解决方案，目前Go标准包没有为session提供任何支持，这小节我们将会自己动手来实现go版本的session管理和创建。</p><h2 id="session创建过程" tabindex="-1"><a class="header-anchor" href="#session创建过程" aria-hidden="true">#</a> session创建过程</h2><p>session的基本原理是由服务器为每个会话维护一份信息数据，客户端和服务端依靠一个全局唯一的标识来访问这份数据，以达到交互的目的。当用户访问Web应用时，服务端程序会随需要创建session，这个过程可以概括为三个步骤：</p><ul><li>生成全局唯一标识符（sessionid）；</li><li>开辟数据存储空间。一般会在内存中创建相应的数据结构，但这种情况下，系统一旦掉电，所有的会话数据就会丢失，如果是电子商务类网站，这将造成严重的后果。所以为了解决这类问题，你可以将会话数据写到文件里或存储在数据库中，当然这样会增加I/O开销，但是它可以实现某种程度的session持久化，也更有利于session的共享；</li><li>将session的全局唯一标示符发送给客户端。</li></ul><p>以上三个步骤中，最关键的是如何发送这个session的唯一标识这一步上。考虑到HTTP协议的定义，数据无非可以放到请求行、头域或Body里，所以一般来说会有两种常用的方式：cookie和URL重写。</p><ol><li>Cookie<br> 服务端通过设置Set-cookie头就可以将session的标识符传送到客户端，而客户端此后的每一次请求都会带上这个标识符，另外一般包含session信息的cookie会将失效时间设置为0(会话cookie)，即浏览器进程有效时间。至于浏览器怎么处理这个0，每个浏览器都有自己的方案，但差别都不会太大(一般体现在新建浏览器窗口的时候)；</li><li>URL重写<br> 所谓URL重写，就是在返回给用户的页面里的所有的URL后面追加session标识符，这样用户在收到响应之后，无论点击响应页面里的哪个链接或提交表单，都会自动带上session标识符，从而就实现了会话的保持。虽然这种做法比较麻烦，但是，如果客户端禁用了cookie的话，此种方案将会是首选。</li></ol><h2 id="go实现session管理" tabindex="-1"><a class="header-anchor" href="#go实现session管理" aria-hidden="true">#</a> Go实现session管理</h2><p>通过上面session创建过程的讲解，读者应该对session有了一个大体的认识，但是具体到动态页面技术里面，又是怎么实现session的呢？下面我们将结合session的生命周期（lifecycle），来实现go语言版本的session管理。</p><h3 id="session管理设计" tabindex="-1"><a class="header-anchor" href="#session管理设计" aria-hidden="true">#</a> session管理设计</h3><p>我们知道session管理涉及到如下几个因素</p><ul><li>全局session管理器</li><li>保证sessionid 的全局唯一性</li><li>为每个客户关联一个session</li><li>session 的存储(可以存储到内存、文件、数据库等)</li><li>session 过期处理</li></ul><p>接下来我将讲解一下我关于session管理的整个设计思路以及相应的go代码示例：</p><h3 id="session管理器" tabindex="-1"><a class="header-anchor" href="#session管理器" aria-hidden="true">#</a> Session管理器</h3><p>定义一个全局的session管理器</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type Manager struct {
	cookieName  string     // private cookiename
	lock        sync.Mutex // protects session
	provider    Provider
	maxLifeTime int64
}

func NewManager(provideName, cookieName string, maxLifeTime int64) (*Manager, error) {
	provider, ok := provides[provideName]
	if !ok {
		return nil, fmt.Errorf(&quot;session: unknown provide %q (forgotten import?)&quot;, provideName)
	}
	return &amp;Manager{provider: provider, cookieName: cookieName, maxLifeTime: maxLifeTime}, nil
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go实现整个的流程应该也是这样的，在main包中创建一个全局的session管理器</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var globalSessions *session.Manager
//然后在init函数中初始化
func init() {
	globalSessions, _ = NewManager(&quot;memory&quot;, &quot;gosessionid&quot;, 3600)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道session是保存在服务器端的数据，它可以以任何的方式存储，比如存储在内存、数据库或者文件中。因此我们抽象出一个Provider接口，用以表征session管理器底层存储结构。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type Provider interface {
	SessionInit(sid string) (Session, error)
	SessionRead(sid string) (Session, error)
	SessionDestroy(sid string) error
	SessionGC(maxLifeTime int64)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>SessionInit函数实现Session的初始化，操作成功则返回此新的Session变量</li><li>SessionRead函数返回sid所代表的Session变量，如果不存在，那么将以sid为参数调用SessionInit函数创建并返回一个新的Session变量</li><li>SessionDestroy函数用来销毁sid对应的Session变量</li><li>SessionGC根据maxLifeTime来删除过期的数据</li></ul><p>那么Session接口需要实现什么样的功能呢？有过Web开发经验的读者知道，对Session的处理基本就 设置值、读取值、删除值以及获取当前sessionID这四个操作，所以我们的Session接口也就实现这四个操作。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
type Session interface {
	Set(key, value interface{}) error // set session value
	Get(key interface{}) interface{}  // get session value
	Delete(key interface{}) error     // delete session value
	SessionID() string                // back current sessionID
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上设计思路来源于database/sql/driver，先定义好接口，然后具体的存储session的结构实现相应的接口并注册后，相应功能这样就可以使用了，以下是用来随需注册存储session的结构的Register函数的实现。</p></blockquote><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var provides = make(map[string]Provider)

// Register makes a session provide available by the provided name.
// If Register is called twice with the same name or if driver is nil,
// it panics.
func Register(name string, provider Provider) {
	if provider == nil {
		panic(&quot;session: Register provider is nil&quot;)
	}
	if _, dup := provides[name]; dup {
		panic(&quot;session: Register called twice for provider &quot; + name)
	}
	provides[name] = provider
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全局唯一的session-id" tabindex="-1"><a class="header-anchor" href="#全局唯一的session-id" aria-hidden="true">#</a> 全局唯一的Session ID</h3><p>Session ID是用来识别访问Web应用的每一个用户，因此必须保证它是全局唯一的（GUID），下面代码展示了如何满足这一需求：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (manager *Manager) sessionId() string {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return &quot;&quot;
	}
	return base64.URLEncoding.EncodeToString(b)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="session创建" tabindex="-1"><a class="header-anchor" href="#session创建" aria-hidden="true">#</a> session创建</h3><p>我们需要为每个来访用户分配或获取与他相关连的Session，以便后面根据Session信息来验证操作。SessionStart这个函数就是用来检测是否已经有某个Session与当前来访用户发生了关联，如果没有则创建之。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (manager *Manager) SessionStart(w http.ResponseWriter, r *http.Request) (session Session) {
	manager.lock.Lock()
	defer manager.lock.Unlock()
	cookie, err := r.Cookie(manager.cookieName)
	if err != nil || cookie.Value == &quot;&quot; {
		sid := manager.sessionId()
		session, _ = manager.provider.SessionInit(sid)
		cookie := http.Cookie{Name: manager.cookieName, Value: url.QueryEscape(sid), Path: &quot;/&quot;, HttpOnly: true, MaxAge: int(manager.maxLifeTime)}
		http.SetCookie(w, &amp;cookie)
	} else {
		sid, _ := url.QueryUnescape(cookie.Value)
		session, _ = manager.provider.SessionRead(sid)
	}
	return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们用前面login操作来演示session的运用：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func login(w http.ResponseWriter, r *http.Request) {
	sess := globalSessions.SessionStart(w, r)
	r.ParseForm()
	if r.Method == &quot;GET&quot; {
		t, _ := template.ParseFiles(&quot;login.gtpl&quot;)
		w.Header().Set(&quot;Content-Type&quot;, &quot;text/html&quot;)
		t.Execute(w, sess.Get(&quot;username&quot;))
	} else {
		sess.Set(&quot;username&quot;, r.Form[&quot;username&quot;])
		http.Redirect(w, r, &quot;/&quot;, 302)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="操作值-设置、读取和删除" tabindex="-1"><a class="header-anchor" href="#操作值-设置、读取和删除" aria-hidden="true">#</a> 操作值：设置、读取和删除</h3><p>SessionStart函数返回的是一个满足Session接口的变量，那么我们该如何用他来对session数据进行操作呢？</p><p>上面的例子中的代码<code>session.Get(&quot;uid&quot;)</code>已经展示了基本的读取数据的操作，现在我们再来看一下详细的操作:</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func count(w http.ResponseWriter, r *http.Request) {
	sess := globalSessions.SessionStart(w, r)
	createtime := sess.Get(&quot;createtime&quot;)
	if createtime == nil {
		sess.Set(&quot;createtime&quot;, time.Now().Unix())
	} else if (createtime.(int64) + 360) &lt; (time.Now().Unix()) {
		globalSessions.SessionDestroy(w, r)
		sess = globalSessions.SessionStart(w, r)
	}
	ct := sess.Get(&quot;countnum&quot;)
	if ct == nil {
		sess.Set(&quot;countnum&quot;, 1)
	} else {
		sess.Set(&quot;countnum&quot;, (ct.(int) + 1))
	}
	t, _ := template.ParseFiles(&quot;count.gtpl&quot;)
	w.Header().Set(&quot;Content-Type&quot;, &quot;text/html&quot;)
	t.Execute(w, sess.Get(&quot;countnum&quot;))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的例子可以看到，Session的操作和操作key/value数据库类似:Set、Get、Delete等操作</p><p>因为Session有过期的概念，所以我们定义了GC操作，当访问过期时间满足GC的触发条件后将会引起GC，但是当我们进行了任意一个session操作，都会对Session实体进行更新，都会触发对最后访问时间的修改，这样当GC的时候就不会误删除还在使用的Session实体。</p><h3 id="session重置" tabindex="-1"><a class="header-anchor" href="#session重置" aria-hidden="true">#</a> session重置</h3><p>我们知道，Web应用中有用户退出这个操作，那么当用户退出应用的时候，我们需要对该用户的session数据进行销毁操作，上面的代码已经演示了如何使用session重置操作，下面这个函数就是实现了这个功能：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
//Destroy sessionid
func (manager *Manager) SessionDestroy(w http.ResponseWriter, r *http.Request){
	cookie, err := r.Cookie(manager.cookieName)
	if err != nil || cookie.Value == &quot;&quot; {
		return
	} else {
		manager.lock.Lock()
		defer manager.lock.Unlock()
		manager.provider.SessionDestroy(cookie.Value)
		expiration := time.Now()
		cookie := http.Cookie{Name: manager.cookieName, Path: &quot;/&quot;, HttpOnly: true, Expires: expiration, MaxAge: -1}
		http.SetCookie(w, &amp;cookie)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="session销毁" tabindex="-1"><a class="header-anchor" href="#session销毁" aria-hidden="true">#</a> session销毁</h3><p>我们来看一下Session管理器如何来管理销毁，只要我们在Main启动的时候启动：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func init() {
	go globalSessions.GC()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func (manager *Manager) GC() {
	manager.lock.Lock()
	defer manager.lock.Unlock()
	time.AfterFunc(time.Duration(manager.maxLifeTime), func() { manager.provider.SessionGC(manager.maxLifeTime) })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到GC充分利用了time包中的定时器功能，当超时<code>maxLifeTime</code>之后调用GC函数，这样就可以保证<code>maxLifeTime</code>时间内的session都是可用的，类似的方案也可以用于统计在线用户数之类的。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>至此 我们实现了一个用来在Web应用中全局管理Session的SessionManager，定义了用来提供Session存储实现Provider的接口，下一小节，我们将会通过接口定义来实现一些Provider,供大家参考学习。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,50);function c(m,b){const s=r("RouterLink");return l(),o("div",null,[u,i("ul",null,[i("li",null,[n(s,{to:"/build-web-app/preface.html"},{default:a(()=>[e("目录")]),_:1})]),i("li",null,[e("上一节: "),n(s,{to:"/build-web-app/06.1.html"},{default:a(()=>[e("session和cookie")]),_:1})]),i("li",null,[e("下一节: "),n(s,{to:"/build-web-app/06.3.html"},{default:a(()=>[e("session存储")]),_:1})])])])}const h=d(v,[["render",c],["__file","06.2.html.vue"]]);export{h as default};
