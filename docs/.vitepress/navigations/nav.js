const nav = [
    { 
        text: "首页", 
        link:"/"
    },
    { 
        text: "java", 
        link:"/java/collection/list",
        activeMatch: '/java/'
    },
    {
        text: "前端",
        link:"/html/canvas/shape",
        activeMatch: '/html/'
    },
    {
        text: "TypeScript",
        activeMatch: '/typescript/',
        items: [
            {
                text: "变量类型",
                link:"/typescript/variable",
            },
            {
                text: "类型运算",
                link:"/typescript/arithmetic",
            },
            {
                text: "泛型",
                link:"/typescript/generics",
            },
            {
                text: "接口",
                link:"/typescript/interface",
            },
            {
                text: "对象",
                link:"/typescript/object",
            }
        
        ]
    },
    {
        text: "nginx",
        link:"/nginx/base",
        activeMatch: '/nginx/'
    },
]

export default nav