const t=JSON.parse('{"key":"v-37ea1028","path":"/the-way-to-go/16.2.html","title":"16.2 误用字符串","lang":"zh-CN","frontmatter":{"description":"当需要对一个字符串进行频繁的操作时，谨记在 go 语言中字符串是不可变的（类似 Java 和 C#）。使用诸如 a += b 形式连接字符串效率低下，尤其在一个循环内部使用这种形式。这会导致大量的内存开销和拷贝。应该使用一个字符数组代替字符串，将字符串内容写入一个缓存中。 例如以下的代码示例： 注意：由于编译优化和依赖于使用缓存操作的字符串大小，当循环...","head":[["meta",{"property":"og:url","content":"https://tianluanchen.github.io/go-tutorial/the-way-to-go/16.2.html"}],["meta",{"property":"og:site_name","content":"Go 优选教程"}],["meta",{"property":"og:title","content":"16.2 误用字符串"}],["meta",{"property":"og:description","content":"当需要对一个字符串进行频繁的操作时，谨记在 go 语言中字符串是不可变的（类似 Java 和 C#）。使用诸如 a += b 形式连接字符串效率低下，尤其在一个循环内部使用这种形式。这会导致大量的内存开销和拷贝。应该使用一个字符数组代替字符串，将字符串内容写入一个缓存中。 例如以下的代码示例： 注意：由于编译优化和依赖于使用缓存操作的字符串大小，当循环..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-16T16:30:25.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-16T16:30:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"16.2 误用字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-16T16:30:25.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}],"git":{"updatedTime":1694881825000,"contributors":[{"name":"tianluanchen","email":"zxl-life@outlook.com","commits":1}]},"readingTime":{"minutes":0.75,"words":225},"filePathRelative":"the-way-to-go/16.2.md","autoDesc":true,"excerpt":""}');export{t as data};
