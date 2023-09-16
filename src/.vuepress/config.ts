import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { redirectPlugin } from "vuepress-plugin-redirect";

export default defineUserConfig({
    base: process.env.DEPLOY ? "/go-tutorial/" : "/",
    lang: "zh-CN",
    title: "Go 优选教程",
    description: "Go 优选教程",

    theme,

    plugins: [
        searchProPlugin({
            // 索引全部内容
            // indexContent: true,
            // 为分类和标签添加索引
            autoSuggestions: false,
            searchDelay: 240,
        }),
        redirectPlugin({
            // 配置选项
            config: {
                "/the-way-to-go/directory.html": "/the-way-to-go/",
            },
        }),
    ],
    // Enable it with pwa
    // shouldPrefetch: false,
});
