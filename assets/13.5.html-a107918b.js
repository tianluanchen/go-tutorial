const t=JSON.parse('{"key":"v-05651368","path":"/the-way-to-go/13.5.html","title":"13.5 一种用闭包处理错误的模式","lang":"zh-CN","frontmatter":{"description":"每当函数返回时，我们应该检查是否有错误发生：但是这会导致重复乏味的代码。结合 defer/panic/recover 机制和闭包可以得到一个我们马上要讨论的更加优雅的模式。不过这个模式只有当所有的函数都是同一种签名时可用，这样就有相当大的限制。一个很好的使用它的例子是 web 应用，所有的处理函数都是下面这样： 假设所有的函数都有这样的签名： 参数的数...","head":[["meta",{"property":"og:url","content":"https://tianluanchen.github.io/go-tutorial/the-way-to-go/13.5.html"}],["meta",{"property":"og:site_name","content":"Go 优选教程"}],["meta",{"property":"og:title","content":"13.5 一种用闭包处理错误的模式"}],["meta",{"property":"og:description","content":"每当函数返回时，我们应该检查是否有错误发生：但是这会导致重复乏味的代码。结合 defer/panic/recover 机制和闭包可以得到一个我们马上要讨论的更加优雅的模式。不过这个模式只有当所有的函数都是同一种签名时可用，这样就有相当大的限制。一个很好的使用它的例子是 web 应用，所有的处理函数都是下面这样： 假设所有的函数都有这样的签名： 参数的数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-16T16:30:25.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-16T16:30:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"13.5 一种用闭包处理错误的模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-16T16:30:25.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}],"git":{"updatedTime":1694881825000,"contributors":[{"name":"tianluanchen","email":"zxl-life@outlook.com","commits":1}]},"readingTime":{"minutes":2.81,"words":844},"filePathRelative":"the-way-to-go/13.5.md","autoDesc":true,"excerpt":""}');export{t as data};
