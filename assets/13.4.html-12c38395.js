import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as v,c as u,a as e,b as n,d as i,w as s,e as r}from"./app-9da01d16.js";const c={},o=r(`<h1 id="_13-4-日志和配置设计" tabindex="-1"><a class="header-anchor" href="#_13-4-日志和配置设计" aria-hidden="true">#</a> 13.4 日志和配置设计</h1><h2 id="日志和配置的重要性" tabindex="-1"><a class="header-anchor" href="#日志和配置的重要性" aria-hidden="true">#</a> 日志和配置的重要性</h2><p>前面已经介绍过日志在我们程序开发中起着很重要的作用，通过日志我们可以记录调试我们的信息，当初介绍过一个日志系统seelog，根据不同的level输出不同的日志，这个对于程序开发和程序部署来说至关重要。我们可以在程序开发中设置level低一点，部署的时候把level设置高，这样我们开发中的调试信息可以屏蔽掉。</p><p>配置模块对于应用部署牵涉到服务器不同的一些配置信息非常有用，例如一些数据库配置信息、监听端口、监听地址等都是可以通过配置文件来配置，这样我们的应用程序就具有很强的灵活性，可以通过配置文件的配置部署在不同的机器上，可以连接不同的数据库之类的。</p><h2 id="beego的日志设计" tabindex="-1"><a class="header-anchor" href="#beego的日志设计" aria-hidden="true">#</a> beego的日志设计</h2><p>beego的日志设计部署思路来自于seelog，根据不同的level来记录日志，但是beego设计的日志系统比较轻量级，采用了系统的log.Logger接口，默认输出到os.Stdout,用户可以实现这个接口然后通过beego.SetLogger设置自定义的输出，详细的实现如下所示：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// Log levels to control the logging output.
const (
	LevelTrace = iota
	LevelDebug
	LevelInfo
	LevelWarning
	LevelError
	LevelCritical
)

// logLevel controls the global log level used by the logger.
var level = LevelTrace

// LogLevel returns the global log level and can be used in
// own implementations of the logger interface.
func Level() int {
	return level
}

// SetLogLevel sets the global log level used by the simple
// logger.
func SetLevel(l int) {
	level = l
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这一段实现了日志系统的日志分级，默认的级别是Trace，用户通过SetLevel可以设置不同的分级。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// logger references the used application logger.
var BeeLogger = log.New(os.Stdout, &quot;&quot;, log.Ldate|log.Ltime)

// SetLogger sets a new logger.
func SetLogger(l *log.Logger) {
	BeeLogger = l
}

// Trace logs a message at trace level.
func Trace(v ...interface{}) {
	if level &lt;= LevelTrace {
		BeeLogger.Printf(&quot;[T] %v\\n&quot;, v)
	}
}

// Debug logs a message at debug level.
func Debug(v ...interface{}) {
	if level &lt;= LevelDebug {
		BeeLogger.Printf(&quot;[D] %v\\n&quot;, v)
	}
}

// Info logs a message at info level.
func Info(v ...interface{}) {
	if level &lt;= LevelInfo {
		BeeLogger.Printf(&quot;[I] %v\\n&quot;, v)
	}
}

// Warning logs a message at warning level.
func Warn(v ...interface{}) {
	if level &lt;= LevelWarning {
		BeeLogger.Printf(&quot;[W] %v\\n&quot;, v)
	}
}

// Error logs a message at error level.
func Error(v ...interface{}) {
	if level &lt;= LevelError {
		BeeLogger.Printf(&quot;[E] %v\\n&quot;, v)
	}
}

// Critical logs a message at critical level.
func Critical(v ...interface{}) {
	if level &lt;= LevelCritical {
		BeeLogger.Printf(&quot;[C] %v\\n&quot;, v)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这一段代码默认初始化了一个BeeLogger对象，默认输出到os.Stdout，用户可以通过beego.SetLogger来设置实现了logger的接口输出。这里面实现了六个函数：</p>`,10),m=e("li",null,[n("Trace（一般的记录信息，举例如下：） "),e("ul",null,[e("li",null,'"Entered parse function validation block"'),e("li",null,`"Validation: entered second 'if'"`),e("li",null,`"Dictionary 'Dict' is empty. Using default value"`)])],-1),b={href:"http://somesite.com",target:"_blank",rel:"noopener noreferrer"},g=e("li",null,'"Response generated. Response size: 10000. Sending."',-1),f=e("li",null,'"New file received. Type:PNG Size:20000"',-1),p=r("<li>Info（打印信息，举例如下：） <ul><li>&quot;Web server restarted&quot;</li><li>&quot;Hourly statistics: Requested pages: 12345 Errors: 123 ...&quot;</li><li>&quot;Service paused. Waiting for &#39;resume&#39; call&quot;</li></ul></li><li>Warn（警告信息，举例如下：） <ul><li>&quot;Cache corrupted for file=&#39;test.file&#39;. Reading from back-end&quot;</li><li>&quot;Database 192.168.0.7/DB not responding. Using backup 192.168.0.8/DB&quot;</li><li>&quot;No response from statistics server. Statistics not sent&quot;</li></ul></li><li>Error（错误信息，举例如下：） <ul><li>&quot;Internal error. Cannot process request #12345 Error:....&quot;</li><li>&quot;Cannot perform login: credentials DB not responding&quot;</li></ul></li><li>Critical（致命错误，举例如下：） <ul><li>&quot;Critical panic received: .... Shutting down&quot;</li><li>&quot;Fatal error: ... App is shutting down to prevent data corruption or loss&quot;</li></ul></li>",4),h=r(`<p>可以看到每个函数里面都有对level的判断，所以如果我们在部署的时候设置了level=LevelWarning，那么Trace、Debug、Info这三个函数都不会有任何的输出，以此类推。</p><h2 id="beego的配置设计" tabindex="-1"><a class="header-anchor" href="#beego的配置设计" aria-hidden="true">#</a> beego的配置设计</h2><p>配置信息的解析，beego实现了一个key=value的配置文件读取，类似ini配置文件的格式，就是一个文件解析的过程，然后把解析的数据保存到map中，最后在调用的时候通过几个string、int之类的函数调用返回相应的值，具体的实现请看下面：</p><p>首先定义了一些ini配置文件的一些全局性常量 ：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
var (
	bComment = []byte{&#39;#&#39;}
	bEmpty   = []byte{}
	bEqual   = []byte{&#39;=&#39;}
	bDQuote  = []byte{&#39;&quot;&#39;}
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义了配置文件的格式：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// A Config represents the configuration.
type Config struct {
	filename string
	comment  map[int][]string  // id: []{comment, key...}; id 1 is for main comment.
	data     map[string]string // key: value
	offset   map[string]int64  // key: offset; for editing.
	sync.RWMutex
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义了解析文件的函数，解析文件的过程是打开文件，然后一行一行的读取，解析注释、空行和key=value数据：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// ParseFile creates a new Config and parses the file configuration from the
// named file.
func LoadConfig(name string) (*Config, error) {
	file, err := os.Open(name)
	if err != nil {
		return nil, err
	}

	cfg := &amp;Config{
		file.Name(),
		make(map[int][]string),
		make(map[string]string),
		make(map[string]int64),
		sync.RWMutex{},
	}
	cfg.Lock()
	defer cfg.Unlock()
	defer file.Close()

	var comment bytes.Buffer
	buf := bufio.NewReader(file)

	for nComment, off := 0, int64(1); ; {
		line, _, err := buf.ReadLine()
		if err == io.EOF {
			break
		}
		if bytes.Equal(line, bEmpty) {
			continue
		}

		off += int64(len(line))

		if bytes.HasPrefix(line, bComment) {
			line = bytes.TrimLeft(line, &quot;#&quot;)
			line = bytes.TrimLeftFunc(line, unicode.IsSpace)
			comment.Write(line)
			comment.WriteByte(&#39;\\n&#39;)
			continue
		}
		if comment.Len() != 0 {
			cfg.comment[nComment] = []string{comment.String()}
			comment.Reset()
			nComment++
		}

		val := bytes.SplitN(line, bEqual, 2)
		if bytes.HasPrefix(val[1], bDQuote) {
			val[1] = bytes.Trim(val[1], \`&quot;\`)
		}

		key := strings.TrimSpace(string(val[0]))
		cfg.comment[nComment-1] = append(cfg.comment[nComment-1], key)
		cfg.data[key] = strings.TrimSpace(string(val[1]))
		cfg.offset[key] = off
	}
	return cfg, nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面实现了一些读取配置文件的函数，返回的值确定为bool、int、float64或string：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
// Bool returns the boolean value for a given key.
func (c *Config) Bool(key string) (bool, error) {
	return strconv.ParseBool(c.data[key])
}

// Int returns the integer value for a given key.
func (c *Config) Int(key string) (int, error) {
	return strconv.Atoi(c.data[key])
}

// Float returns the float value for a given key.
func (c *Config) Float(key string) (float64, error) {
	return strconv.ParseFloat(c.data[key], 64)
}

// String returns the string value for a given key.
func (c *Config) String(key string) string {
	return c.data[key]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用指南" tabindex="-1"><a class="header-anchor" href="#应用指南" aria-hidden="true">#</a> 应用指南</h2><p>下面这个函数是我一个应用中的例子，用来获取远程url地址的json数据，实现如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
func GetJson() {
	resp, err := http.Get(beego.AppConfig.String(&quot;url&quot;))
	if err != nil {
		beego.Critical(&quot;http get info error&quot;)
		return
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	err = json.Unmarshal(body, &amp;AllInfo)
	if err != nil {
		beego.Critical(&quot;error:&quot;, err)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数中调用了框架的日志函数<code>beego.Critical</code>函数用来报错，调用了<code>beego.AppConfig.String(&quot;url&quot;)</code>用来获取配置文件中的信息，配置文件的信息如下(app.conf)：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
appname = hs
url =&quot;http://www.api.com/api.html&quot;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,17);function q(L,y){const t=d("ExternalLinkIcon"),l=d("RouterLink");return v(),u("div",null,[o,e("ul",null,[m,e("li",null,[n("Debug（调试信息，举例如下：） "),e("ul",null,[e("li",null,[n('"Web page requested: '),e("a",b,[n("http://somesite.com"),i(t)]),n(` Params='...'"`)]),g,f])]),p]),h,e("ul",null,[e("li",null,[i(l,{to:"/build-web-app/preface.html"},{default:s(()=>[n("目录")]),_:1})]),e("li",null,[n("上一章: "),i(l,{to:"/build-web-app/13.3.html"},{default:s(()=>[n("controller设计")]),_:1})]),e("li",null,[n("下一节: "),i(l,{to:"/build-web-app/13.5.html"},{default:s(()=>[n("实现博客的增删改")]),_:1})])])])}const C=a(c,[["render",q],["__file","13.4.html.vue"]]);export{C as default};
