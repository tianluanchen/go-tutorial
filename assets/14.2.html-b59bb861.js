const e=JSON.parse('{"key":"v-6827b66a","path":"/the-way-to-go/14.2.html","title":"14.2 协程间的信道","lang":"zh-CN","frontmatter":{"description":"14.2.1 概念 在第一个例子中，协程是独立执行的，他们之间没有通信。他们必须通信才会变得更有用：彼此之间发送和接收信息并且协调/同步他们的工作。协程可以使用共享变量来通信，但是很不提倡这样做，因为这种方式给所有的共享内存的多线程都带来了困难。 而 Go 有一种特殊的类型，通道（channel），就像一个可以用于发送类型化数据的管道，由其负责协程之间...","head":[["meta",{"property":"og:url","content":"https://tianluanchen.github.io/go-tutorial/the-way-to-go/14.2.html"}],["meta",{"property":"og:site_name","content":"Go 优选教程"}],["meta",{"property":"og:title","content":"14.2 协程间的信道"}],["meta",{"property":"og:description","content":"14.2.1 概念 在第一个例子中，协程是独立执行的，他们之间没有通信。他们必须通信才会变得更有用：彼此之间发送和接收信息并且协调/同步他们的工作。协程可以使用共享变量来通信，但是很不提倡这样做，因为这种方式给所有的共享内存的多线程都带来了困难。 而 Go 有一种特殊的类型，通道（channel），就像一个可以用于发送类型化数据的管道，由其负责协程之间..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-16T16:30:25.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-16T16:30:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"14.2 协程间的信道\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-16T16:30:25.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"14.2.1 概念","slug":"_14-2-1-概念","link":"#_14-2-1-概念","children":[]},{"level":2,"title":"14.2.2 通信操作符 <-","slug":"_14-2-2-通信操作符","link":"#_14-2-2-通信操作符","children":[]},{"level":2,"title":"14.2.3 通道阻塞","slug":"_14-2-3-通道阻塞","link":"#_14-2-3-通道阻塞","children":[]},{"level":2,"title":"14.2.4 通过一个（或多个）通道交换数据进行协程同步。","slug":"_14-2-4-通过一个-或多个-通道交换数据进行协程同步。","link":"#_14-2-4-通过一个-或多个-通道交换数据进行协程同步。","children":[]},{"level":2,"title":"14.2.5 同步通道-使用带缓冲的通道","slug":"_14-2-5-同步通道-使用带缓冲的通道","link":"#_14-2-5-同步通道-使用带缓冲的通道","children":[]},{"level":2,"title":"14.2.6 协程中用通道输出结果","slug":"_14-2-6-协程中用通道输出结果","link":"#_14-2-6-协程中用通道输出结果","children":[]},{"level":2,"title":"14.2.7 信号量模式","slug":"_14-2-7-信号量模式","link":"#_14-2-7-信号量模式","children":[]},{"level":2,"title":"14.2.8 实现并行的 for 循环","slug":"_14-2-8-实现并行的-for-循环","link":"#_14-2-8-实现并行的-for-循环","children":[]},{"level":2,"title":"14.2.9 用带缓冲通道实现一个信号量","slug":"_14-2-9-用带缓冲通道实现一个信号量","link":"#_14-2-9-用带缓冲通道实现一个信号量","children":[]},{"level":2,"title":"14.2.10 给通道使用 for 循环","slug":"_14-2-10-给通道使用-for-循环","link":"#_14-2-10-给通道使用-for-循环","children":[]},{"level":2,"title":"14.2.11 通道的方向","slug":"_14-2-11-通道的方向","link":"#_14-2-11-通道的方向","children":[]},{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}],"git":{"updatedTime":1694881825000,"contributors":[{"name":"tianluanchen","email":"zxl-life@outlook.com","commits":1}]},"readingTime":{"minutes":18.8,"words":5639},"filePathRelative":"the-way-to-go/14.2.md","autoDesc":true,"excerpt":""}');export{e as data};