const e=JSON.parse('{"key":"v-cbcb956a","path":"/the-way-to-go/12.3.html","title":"12.3 文件拷贝","lang":"zh-CN","frontmatter":{"description":"如何拷贝一个文件到另一个文件？最简单的方式就是使用 io 包： 示例 12.10 filecopy.go (examples/chapter_12/filecopy.go)： 注意 defer 的使用：当打开 dst 文件时发生了错误，那么 defer 仍然能够确保 src.Close() 执行。如果不这么做，src 文件会一直保持打开状态并占用资源。...","head":[["meta",{"property":"og:url","content":"https://tianluanchen.github.io/go-tutorial/the-way-to-go/12.3.html"}],["meta",{"property":"og:site_name","content":"Go 优选教程"}],["meta",{"property":"og:title","content":"12.3 文件拷贝"}],["meta",{"property":"og:description","content":"如何拷贝一个文件到另一个文件？最简单的方式就是使用 io 包： 示例 12.10 filecopy.go (examples/chapter_12/filecopy.go)： 注意 defer 的使用：当打开 dst 文件时发生了错误，那么 defer 仍然能够确保 src.Close() 执行。如果不这么做，src 文件会一直保持打开状态并占用资源。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-16T16:30:25.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-16T16:30:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"12.3 文件拷贝\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-16T16:30:25.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}],"git":{"updatedTime":1694881825000,"contributors":[{"name":"tianluanchen","email":"zxl-life@outlook.com","commits":1}]},"readingTime":{"minutes":0.55,"words":164},"filePathRelative":"the-way-to-go/12.3.md","autoDesc":true,"excerpt":""}');export{e as data};