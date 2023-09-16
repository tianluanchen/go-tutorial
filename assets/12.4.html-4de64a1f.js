import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as l,c as p,a as n,b as e,d as a,w as s,e as o}from"./app-9da01d16.js";const u={},i=o('<h1 id="_12-4-备份和恢复" tabindex="-1"><a class="header-anchor" href="#_12-4-备份和恢复" aria-hidden="true">#</a> 12.4 备份和恢复</h1><p>这小节我们要讨论应用程序管理的另一个方面：生产服务器上数据的备份和恢复。我们经常会遇到生产服务器的网络断了、硬盘坏了、操作系统崩溃、或者数据库不可用了等各种异常情况，所以维护人员需要对生产服务器上的应用和数据做好异地灾备，冷备热备的准备。在接下来的介绍中，讲解了如何备份应用、如何备份/恢复Mysql数据库和redis数据库。</p><h2 id="应用备份" tabindex="-1"><a class="header-anchor" href="#应用备份" aria-hidden="true">#</a> 应用备份</h2><p>在大多数集群环境下，Web应用程序基本不需要备份，因为这个其实就是一个代码副本，我们在本地开发环境中，或者版本控制系统中已经保持这些代码。但是很多时候，一些开发的站点需要用户来上传文件，那么我们需要对这些用户上传的文件进行备份。目前其实有一种合适的做法就是把和网站相关的需要存储的文件存储到云储存，这样即使系统崩溃，只要我们的文件还在云存储上，至少数据不会丢失。</p><p>如果我们没有采用云储存的情况下，如何做到网站的备份呢？这里我们介绍一个文件同步工具rsync：rsync能够实现网站的备份，不同系统的文件的同步，如果是windows的话，需要windows版本cwrsync。</p><h3 id="rsync安装" tabindex="-1"><a class="header-anchor" href="#rsync安装" aria-hidden="true">#</a> rsync安装</h3>',6),h={href:"http://rsync.samba.org/",target:"_blank",rel:"noopener noreferrer"},y=o(`<p>软件包安装</p><pre><code># sudo apt-get  install  rsync  注：在debian、ubuntu 等在线安装方法；
# yum install rsync    注：Fedora、Redhat、CentOS 等在线安装方法；
# rpm -ivh rsync       注：Fedora、Redhat、CentOS 等rpm包安装方法；
</code></pre><p>其它Linux发行版，请用相应的软件包管理方法来安装。源码包安装</p><pre><code>tar xvf  rsync-xxx.tar.gz
cd rsync-xxx
./configure --prefix=/usr  ;make ;make install   注：在用源码包编译安装之前，您得安装gcc等编译工具才行；
</code></pre><h3 id="rsync配置" tabindex="-1"><a class="header-anchor" href="#rsync配置" aria-hidden="true">#</a> rsync配置</h3><p>rsync主要有以下三个配置文件rsyncd.conf(主配置文件)、rsyncd.secrets(密码文件)、rsyncd.motd(rysnc服务器信息)。</p><p>关于这几个文件的配置大家可以参考官方网站或者其他介绍rsync的网站，下面介绍服务器端和客户端如何开启</p><ul><li><p>服务端开启：</p><pre><code>  #/usr/bin/rsync --daemon  --config=/etc/rsyncd.conf
</code></pre><p>--daemon参数方式，是让rsync以服务器模式运行。把rsync加入开机启动</p><pre><code>  echo &#39;rsync --daemon&#39; &gt;&gt; /etc/rc.d/rc.local
</code></pre><p>设置rsync密码</p><pre><code>  echo &#39;你的用户名:你的密码&#39; &gt; /etc/rsyncd.secrets
  chmod 600 /etc/rsyncd.secrets
</code></pre></li><li><p>客户端同步：</p><p>客户端可以通过如下命令同步服务器上的文件：</p><pre><code>  rsync -avzP  --delete  --password-file=rsyncd.secrets   用户名@192.168.145.5::www /var/rsync/backup
</code></pre><p>这条命令，简要的说明一下几个要点：</p><ol><li>-avzP是啥，读者可以使用--help查看</li><li>--delete 是为了比如A上删除了一个文件，同步的时候，B会自动删除相对应的文件</li><li>--password-file 客户端中/etc/rsyncd.secrets设置的密码，要和服务端的 /etc/rsyncd.secrets 中的密码一样，这样cron运行的时候，就不需要密码了</li><li>这条命令中的&quot;用户名&quot;为服务端的 /etc/rsyncd.secrets中的用户名</li><li>这条命令中的 192.168.145.5 为服务端的IP地址</li><li>::www，注意是2个 : 号，www为服务端的配置文件 /etc/rsyncd.conf 中的[www]，意思是根据服务端上的/etc/rsyncd.conf来同步其中的[www]段内容，一个 : 号的时候，用于不根据配置文件，直接同步指定目录。</li></ol><p>为了让同步实时性，可以设置crontab，保持rsync每分钟同步，当然用户也可以根据文件的重要程度设置不同的同步频率。</p></li></ul><h2 id="mysql备份" tabindex="-1"><a class="header-anchor" href="#mysql备份" aria-hidden="true">#</a> MySQL备份</h2><p>应用数据库目前还是MySQL为主流，目前MySQL的备份有两种方式：热备份和冷备份，热备份目前主要是采用master/slave方式（master/slave方式的同步目前主要用于数据库读写分离，也可以用于热备份数据），关于如何配置这方面的资料，大家可以找到很多。冷备份的话就是数据有一定的延迟，但是可以保证该时间段之前的数据完整，例如有些时候可能我们的误操作引起了数据的丢失，那么master/slave模式是无法找回丢失数据的，但是通过冷备份可以部分恢复数据。</p><p>冷备份一般使用shell脚本来实现定时备份数据库，然后通过上面介绍rsync同步非本地机房的一台服务器。</p><p>下面这个是定时备份mysql的备份脚本，我们使用了mysqldump程序，这个命令可以把数据库导出到一个文件中。</p><pre><code>#!/bin/bash

# 以下配置信息请自己修改
mysql_user=&quot;USER&quot; #MySQL备份用户
mysql_password=&quot;PASSWORD&quot; #MySQL备份用户的密码
mysql_host=&quot;localhost&quot;
mysql_port=&quot;3306&quot;
mysql_charset=&quot;utf8&quot; #MySQL编码
backup_db_arr=(&quot;db1&quot; &quot;db2&quot;) #要备份的数据库名称，多个用空格分开隔开 如(&quot;db1&quot; &quot;db2&quot; &quot;db3&quot;)
backup_location=/var/www/mysql  #备份数据存放位置，末尾请不要带&quot;/&quot;,此项可以保持默认，程序会自动创建文件夹
expire_backup_delete=&quot;ON&quot; #是否开启过期备份删除 ON为开启 OFF为关闭
expire_days=3 #过期时间天数 默认为三天，此项只有在expire_backup_delete开启时有效

# 本行开始以下不需要修改
backup_time=\`date +%Y%m%d%H%M\`  #定义备份详细时间
backup_Ymd=\`date +%Y-%m-%d\` #定义备份目录中的年月日时间
backup_3ago=\`date -d &#39;3 days ago&#39; +%Y-%m-%d\` #3天之前的日期
backup_dir=$backup_location/$backup_Ymd  #备份文件夹全路径
welcome_msg=&quot;Welcome to use MySQL backup tools!&quot; #欢迎语

# 判断MYSQL是否启动,mysql没有启动则备份退出
mysql_ps=\`ps -ef |grep mysql |wc -l\`
mysql_listen=\`netstat -an |grep LISTEN |grep $mysql_port|wc -l\`
if [ [$mysql_ps == 0] -o [$mysql_listen == 0] ]; then
        echo &quot;ERROR:MySQL is not running! backup stop!&quot;
        exit
else
        echo $welcome_msg
fi

# 连接到mysql数据库，无法连接则备份退出
mysql -h$mysql_host -P$mysql_port -u$mysql_user -p$mysql_password &lt;&lt;end
use mysql;
select host,user from user where user=&#39;root&#39; and host=&#39;localhost&#39;;
exit
end

flag=\`echo $?\`
if [ $flag != &quot;0&quot; ]; then
        echo &quot;ERROR:Can&#39;t connect mysql server! backup stop!&quot;
        exit
else
        echo &quot;MySQL connect ok! Please wait......&quot;
        # 判断有没有定义备份的数据库，如果定义则开始备份，否则退出备份
        if [ &quot;$backup_db_arr&quot; != &quot;&quot; ];then
                #dbnames=$(cut -d &#39;,&#39; -f1-5 $backup_database)
                #echo &quot;arr is (\${backup_db_arr[@]})&quot;
                for dbname in \${backup_db_arr[@]}
                do
                        echo &quot;database $dbname backup start...&quot;
                        \`mkdir -p $backup_dir\`
                        \`mysqldump -h$mysql_host -P$mysql_port -u$mysql_user -p$mysql_password $dbname --default-character-set=$mysql_charset | gzip &gt; $backup_dir/$dbname-$backup_time.sql.gz\`
                        flag=\`echo $?\`
                        if [ $flag == &quot;0&quot; ];then
                                echo &quot;database $dbname success backup to $backup_dir/$dbname-$backup_time.sql.gz&quot;
                        else
                                echo &quot;database $dbname backup fail!&quot;
                        fi
                        
                done
        else
                echo &quot;ERROR:No database to backup! backup stop&quot;
                exit
        fi
        # 如果开启了删除过期备份，则进行删除操作
        if [ &quot;$expire_backup_delete&quot; == &quot;ON&quot; -a  &quot;$backup_location&quot; != &quot;&quot; ];then
                 #\`find $backup_location/ -type d -o -type f -ctime +$expire_days -exec rm -rf {} \\;\`
                 \`find $backup_location/ -type d -mtime +$expire_days | xargs rm -rf\`
                 echo &quot;Expired backup data delete complete!&quot;
        fi
        echo &quot;All database backup success! Thank you!&quot;
        exit
fi
</code></pre><p>修改shell脚本的属性：</p><pre><code>chmod 600 /root/mysql_backup.sh
chmod +x /root/mysql_backup.sh
</code></pre><p>设置好属性之后，把命令加入crontab，我们设置了每天00:00定时自动备份，然后把备份的脚本目录/var/www/mysql设置为rsync同步目录。</p><pre><code>00 00 * * * /root/mysql_backup.sh
</code></pre><h2 id="mysql恢复" tabindex="-1"><a class="header-anchor" href="#mysql恢复" aria-hidden="true">#</a> MySQL恢复</h2><p>前面介绍MySQL备份分为热备份和冷备份，热备份主要的目的是为了能够实时的恢复，例如应用服务器出现了硬盘故障，那么我们可以通过修改配置文件把数据库的读取和写入改成slave，这样就可以尽量少时间的中断服务。</p><p>但是有时候我们需要通过冷备份的SQL来进行数据恢复，既然有了数据库的备份，就可以通过命令导入：</p><pre><code>mysql -u username -p databse &lt; backup.sql
</code></pre><p>可以看到，导出和导入数据库数据都是相当简单，不过如果还需要管理权限，或者其他的一些字符集的设置的话，可能会稍微复杂一些，但是这些都是可以通过一些命令来完成的。</p><h2 id="redis备份" tabindex="-1"><a class="header-anchor" href="#redis备份" aria-hidden="true">#</a> redis备份</h2><p>redis是目前我们使用最多的NoSQL，它的备份也分为两种：热备份和冷备份，redis也支持master/slave模式，所以我们的热备份可以通过这种方式实现，相应的配置大家可以参考官方的文档配置，相当的简单。我们这里介绍冷备份的方式：redis其实会定时的把内存里面的缓存数据保存到数据库文件里面，我们备份只要备份相应的文件就可以，就是利用前面介绍的rsync备份到非本地机房就可以实现。</p><h2 id="redis恢复" tabindex="-1"><a class="header-anchor" href="#redis恢复" aria-hidden="true">#</a> redis恢复</h2><p>redis的恢复分为热备份恢复和冷备份恢复，热备份恢复的目的和方法同MySQL的恢复一样，只要修改应用的相应的数据库连接即可。</p><p>但是有时候我们需要根据冷备份来恢复数据，redis的冷备份恢复其实就是只要把保存的数据库文件copy到redis的工作目录，然后启动redis就可以了，redis在启动的时候会自动加载数据库文件到内存中，启动的速度根据数据库的文件大小来决定。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>本小节介绍了我们的应用部分的备份和恢复，即如何做好灾备，包括文件的备份、数据库的备份。同时也介绍了使用rsync同步不同系统的文件，MySQL数据库和redis数据库的备份和恢复，希望通过本小节的介绍，能够给作为开发的你对于线上产品的灾备方案提供一个参考方案。</p><h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> links</h2>`,30);function q(m,b){const c=r("ExternalLinkIcon"),t=r("RouterLink");return l(),p("div",null,[i,n("p",null,[e("rysnc的官方网站："),n("a",h,[e("http://rsync.samba.org/"),a(c)]),e(" 可以从上面获取最新版本的源码。当然，因为rsync是一款非常有用的软件，所以很多Linux的发行版本都将它收录在内了。")]),y,n("ul",null,[n("li",null,[a(t,{to:"/build-web-app/preface.html"},{default:s(()=>[e("目录")]),_:1})]),n("li",null,[e("上一章: "),a(t,{to:"/build-web-app/12.3.html"},{default:s(()=>[e("应用部署")]),_:1})]),n("li",null,[e("下一节: "),a(t,{to:"/build-web-app/12.5.html"},{default:s(()=>[e("小结")]),_:1})])])])}const k=d(u,[["render",q],["__file","12.4.html.vue"]]);export{k as default};
