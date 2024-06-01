import nav from "./navigations/nav"
import sidebar from "./navigations/sidebars/index"

export default {
	lang: "zh_CN",
	srcDir: "src",
	title: '马家丶小帅',
	description: 'Just playing around.',
	lastUpdated: true,
	outDir: '../dist',
	themeConfig: {
		logo: '/home/1.png',
		nav,
		sidebar,
		docFooter: { prev: '上一篇', next: '下一篇' },
		lastUpdated: {
			text: '上次更新时间',
			formatOptions: {
				dateStyle: 'full',
				timeStyle: 'medium'
			}
		},
		outline: [2, 3],
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2024-present Mzy1024'
		},
		sidebarMenuLabel: "目录",
		returnToTopLabel: "返回顶部",
		outlineTitle: "当前页导航"
	}
}