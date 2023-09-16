import { sidebar } from "vuepress-theme-hope";
import { getBuildWebAppParts, getTheWayToGoParts } from "./parts";
const bwaParts = getBuildWebAppParts()
const twtgParts = getTheWayToGoParts()

const bwaSidebarItems = ["Go 环境配置", "Go 语言基础", "Web 基础", "表单", "访问数据库", "session 和数据存储", "文本文件处理", "Web 服务", "安全与加密", "国际化和本地化", "错误处理，调试和测试", "部署与维护", "如何设计一个 Web 框架", "扩展 Web 框架",].map((e, i) => {
    return {
        text: `第${i + 1}章 ${e}`,
        collapsible: true,
        children: bwaParts[i]
    }
})

export default sidebar({
    "/the-way-to-go/": [
        "/",
        {
            text: "目录",
            icon: "list-ul",
            link: "/the-way-to-go/",
        },
        "preface2.md",
        "preface.md",
        {
            text: "第一部分:学习 Go 语言",
            collapsible: true,
            children: twtgParts[0],
        },
        {
            text: "第二部分：语言的核心结构与技术",
            collapsible: true,
            children: twtgParts[1],
        },
        {
            text: "第三部分：Go 高级编程",
            collapsible: true,
            children: twtgParts[2],
        },

        {
            text: "第四部分：实际应用",
            collapsible: true,
            children: twtgParts[3],
        },
        "Discussion_about_16.10.md",
    ],
    "/build-web-app/": [
        "/",
        {
            text: "目录",
            icon: "list-ul",
            link: "/build-web-app/",
        },
        "preface.md",
        ...bwaSidebarItems,
        "ref.md",

    ],
});
