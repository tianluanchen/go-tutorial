const t=JSON.parse('{"key":"v-03b03ac9","path":"/the-way-to-go/13.4.html","title":"13.4 自定义包中的错误处理和 panicking","lang":"zh-CN","frontmatter":{"description":"这是所有自定义包实现者应该遵守的最佳实践： 1）在包内部，总是应该从 panic 中 recover：不允许显式的超出包范围的 panic() 2）向包的调用者返回错误值（而不是 panic）。 在包内部，特别是在非导出函数中有很深层次的嵌套调用时，将 panic 转换成 error 来告诉调用方为何出错，是很实用的（且提高了代码可读性）。 下面的代码...","head":[["meta",{"property":"og:url","content":"https://tianluanchen.github.io/go-tutorial/the-way-to-go/13.4.html"}],["meta",{"property":"og:site_name","content":"Go 优选教程"}],["meta",{"property":"og:title","content":"13.4 自定义包中的错误处理和 panicking"}],["meta",{"property":"og:description","content":"这是所有自定义包实现者应该遵守的最佳实践： 1）在包内部，总是应该从 panic 中 recover：不允许显式的超出包范围的 panic() 2）向包的调用者返回错误值（而不是 panic）。 在包内部，特别是在非导出函数中有很深层次的嵌套调用时，将 panic 转换成 error 来告诉调用方为何出错，是很实用的（且提高了代码可读性）。 下面的代码..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-16T16:30:25.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-16T16:30:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"13.4 自定义包中的错误处理和 panicking\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-16T16:30:25.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}],"git":{"updatedTime":1694881825000,"contributors":[{"name":"tianluanchen","email":"zxl-life@outlook.com","commits":1}]},"readingTime":{"minutes":2.02,"words":605},"filePathRelative":"the-way-to-go/13.4.md","autoDesc":true,"excerpt":""}');export{t as data};
