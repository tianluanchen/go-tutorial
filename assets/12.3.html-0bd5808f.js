import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as a,c as t,a as i,d as s,w as r,b as e,e as v}from"./app-9da01d16.js";const o={},u=v(`<h1 id="_12-3-应用部署" tabindex="-1"><a class="header-anchor" href="#_12-3-应用部署" aria-hidden="true">#</a> 12.3 应用部署</h1><p>程序开发完毕之后，我们现在要部署Web应用程序了，但是我们如何来部署这些应用程序呢？因为Go程序编译之后是一个可执行文件，编写过C程序的读者一定知道采用daemon就可以完美的实现程序后台持续运行，但是目前Go还无法完美的实现daemon，因此，针对Go的应用程序部署，我们可以利用第三方工具来管理，第三方的工具有很多，例如Supervisord、upstart、daemontools等，这小节我介绍目前自己系统中采用的工具Supervisord。</p><h2 id="daemon" tabindex="-1"><a class="header-anchor" href="#daemon" aria-hidden="true">#</a> daemon</h2><p>目前Go程序还不能实现daemon，详细的见这个Go语言的bug：&lt;<code>http://code.google.com/p/go/issues/detail?id=227</code>&gt;，大概的意思说很难从现有的使用的线程中fork一个出来，因为没有一种简单的方法来确保所有已经使用的线程的状态一致性问题。</p><p>但是我们可以看到很多网上的一些实现daemon的方法，例如下面两种方式：</p><ul><li>MarGo的一个实现思路，使用Command来执行自身的应用，如果真想实现，那么推荐这种方案</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
d := flag.Bool(&quot;d&quot;, false, &quot;Whether or not to launch in the background(like a daemon)&quot;)
if *d {
	cmd := exec.Command(os.Args[0],
		&quot;-close-fds&quot;,
		&quot;-addr&quot;, *addr,
		&quot;-call&quot;, *call,
	)
	serr, err := cmd.StderrPipe()
	if err != nil {
		log.Fatalln(err)
	}
	err = cmd.Start()
	if err != nil {
		log.Fatalln(err)
	}
	s, err := ioutil.ReadAll(serr)
	s = bytes.TrimSpace(s)
	if bytes.HasPrefix(s, []byte(&quot;addr: &quot;)) {
		fmt.Println(string(s))
		cmd.Process.Release()
	} else {
		log.Printf(&quot;unexpected response from MarGo: \`%s\` error: \`%v\`\\n&quot;, s, err)
		cmd.Process.Kill()
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>另一种是利用syscall的方案，但是这个方案并不完善：</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>
package main
 
import (
	&quot;log&quot;
	&quot;os&quot;
	&quot;syscall&quot;
)
 
func daemon(nochdir, noclose int) int {
	var ret, ret2 uintptr
	var err uintptr
 
	darwin := syscall.OS == &quot;darwin&quot;
 
	// already a daemon
	if syscall.Getppid() == 1 {
		return 0
	}
 
	// fork off the parent process
	ret, ret2, err = syscall.RawSyscall(syscall.SYS_FORK, 0, 0, 0)
	if err != 0 {
		return -1
	}
 
	// failure
	if ret2 &lt; 0 {
		os.Exit(-1)
	}
 
	// handle exception for darwin
	if darwin &amp;&amp; ret2 == 1 {
		ret = 0
	}
 
	// if we got a good PID, then we call exit the parent process.
	if ret &gt; 0 {
		os.Exit(0)
	}
 
	/* Change the file mode mask */
	_ = syscall.Umask(0)
 
	// create a new SID for the child process
	s_ret, s_errno := syscall.Setsid()
	if s_errno != 0 {
		log.Printf(&quot;Error: syscall.Setsid errno: %d&quot;, s_errno)
	}
	if s_ret &lt; 0 {
		return -1
	}
 
	if nochdir == 0 {
		os.Chdir(&quot;/&quot;)
	}
 
	if noclose == 0 {
		f, e := os.OpenFile(&quot;/dev/null&quot;, os.O_RDWR, 0)
		if e == nil {
			fd := f.Fd()
			syscall.Dup2(fd, os.Stdin.Fd())
			syscall.Dup2(fd, os.Stdout.Fd())
			syscall.Dup2(fd, os.Stderr.Fd())
		}
	}
 
	return 0
}	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面提出了两种实现Go的daemon方案，但是我还是不推荐大家这样去实现，因为官方还没有正式的宣布支持daemon，当然第一种方案目前来看是比较可行的，而且目前开源库skynet也在采用这个方案做daemon。</p><h2 id="supervisord" tabindex="-1"><a class="header-anchor" href="#supervisord" aria-hidden="true">#</a> Supervisord</h2><p>上面已经介绍了Go目前是有两种方案来实现他的daemon，但是官方本身还不支持这一块，所以还是建议大家采用第三方成熟工具来管理我们的应用程序，这里我给大家介绍一款目前使用比较广泛的进程管理软件：Supervisord。Supervisord是用Python实现的一款非常实用的进程管理工具。supervisord会帮你把管理的应用程序转成daemon程序，而且可以方便的通过命令开启、关闭、重启等操作，而且它管理的进程一旦崩溃会自动重启，这样就可以保证程序执行中断后的情况下有自我修复的功能。</p><blockquote><p>我前面在应用中踩过一个坑，就是因为所有的应用程序都是由Supervisord父进程生出来的，那么当你修改了操作系统的文件描述符之后，别忘记重启Supervisord，光重启下面的应用程序没用。当初我就是系统安装好之后就先装了Supervisord，然后开始部署程序，修改文件描述符，重启程序，以为文件描述符已经是100000了，其实Supervisord这个时候还是默认的1024个，导致他管理的进程所有的描述符也是1024.开放之后压力一上来系统就开始报文件描述符用光了，查了很久才找到这个坑。</p></blockquote><h3 id="supervisord安装" tabindex="-1"><a class="header-anchor" href="#supervisord安装" aria-hidden="true">#</a> Supervisord安装</h3><p>Supervisord可以通过<code>sudo easy_install supervisor</code>安装，当然也可以通过Supervisord官网下载后解压并转到源码所在的文件夹下执行<code>setup.py install</code>来安装。</p><ul><li><p>使用easy_install必须安装setuptools</p><p>打开<code>http://pypi.python.org/pypi/setuptools#files</code>，根据你系统的python的版本下载相应的文件，然后执行<code>sh setuptoolsxxxx.egg</code>，这样就可以使用easy_install命令来安装Supervisord。</p></li></ul><h3 id="supervisord配置" tabindex="-1"><a class="header-anchor" href="#supervisord配置" aria-hidden="true">#</a> Supervisord配置</h3><p>Supervisord默认的配置文件路径为/etc/supervisord.conf，通过文本编辑器修改这个文件，下面是一个示例的配置文件：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>
;/etc/supervisord.conf
[unix_http_server]
file = /var/run/supervisord.sock
chmod = 0777
chown= root:root

[inet_http_server]
# Web管理界面设定
port=9001
username = admin
password = yourpassword

[supervisorctl]
; 必须和&#39;unix_http_server&#39;里面的设定匹配
serverurl = unix:///var/run/supervisord.sock

[supervisord]
logfile=/var/log/supervisord/supervisord.log ; (main log file;default $CWD/supervisord.log)
logfile_maxbytes=50MB       ; (max main logfile bytes b4 rotation;default 50MB)
logfile_backups=10          ; (num of main logfile rotation backups;default 10)
loglevel=info               ; (log level;default info; others: debug,warn,trace)
pidfile=/var/run/supervisord.pid ; (supervisord pidfile;default supervisord.pid)
nodaemon=true              ; (start in foreground if true;default false)
minfds=1024                 ; (min. avail startup file descriptors;default 1024)
minprocs=200                ; (min. avail process descriptors;default 200)
user=root                 ; (default is current user, required if root)
childlogdir=/var/log/supervisord/            ; (&#39;AUTO&#39; child log dir, default $TEMP)

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

; 管理的单个进程的配置，可以添加多个program
[program:blogdemon]
command=/data/blog/blogdemon
autostart = true
startsecs = 5
user = root
redirect_stderr = true
stdout_logfile = /var/log/supervisord/blogdemon.log

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="supervisord管理" tabindex="-1"><a class="header-anchor" href="#supervisord管理" aria-hidden="true">#</a> Supervisord管理</h3><p>Supervisord安装完成后有两个可用的命令行supervisor和supervisorctl，命令使用解释如下：</p><ul><li>supervisord，初始启动Supervisord，启动、管理配置中设置的进程。</li><li>supervisorctl stop programxxx，停止某一个进程(programxxx)，programxxx为[program:blogdemon]里配置的值，这个示例就是blogdemon。</li><li>supervisorctl start programxxx，启动某个进程</li><li>supervisorctl restart programxxx，重启某个进程</li><li>supervisorctl stop all，停止全部进程，注：start、restart、stop都不会载入最新的配置文件。</li><li>supervisorctl reload，载入最新的配置文件，并按新的配置启动、管理所有进程。</li></ul><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>这小节我们介绍了Go如何实现daemon化，但是由于目前Go的daemon实现的不足，需要依靠第三方工具来实现应用程序的daemon管理的方式，所以在这里介绍了一个用python写的进程管理工具Supervisord，通过Supervisord可以很方便的把我们的Go应用程序管理起来。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,25);function c(m,b){const n=l("RouterLink");return a(),t("div",null,[u,i("ul",null,[i("li",null,[s(n,{to:"/build-web-app/preface.html"},{default:r(()=>[e("目录")]),_:1})]),i("li",null,[e("上一章: "),s(n,{to:"/build-web-app/12.2.html"},{default:r(()=>[e("网站错误处理")]),_:1})]),i("li",null,[e("下一节: "),s(n,{to:"/build-web-app/12.4.html"},{default:r(()=>[e("备份和恢复")]),_:1})])])])}const h=d(o,[["render",c],["__file","12.3.html.vue"]]);export{h as default};
