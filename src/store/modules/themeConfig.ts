import { Module } from 'vuex';
import { ThemeConfigState, RootStateTypes } from '../types/index';

const themeConfigModule: Module<ThemeConfigState, RootStateTypes> = {
	namespaced: true,
	state: {
		// 是否开启布局配置抽屉
		isDrawer: false,
		
		/* 界面设置
					------------------------------- */
		// 是否开启菜单水平折叠效果
		isCollapse: false,

		/* 界面显示
					------------------------------- */
		// 是否开启侧边栏 Logo
		isShowLogo: true,
		// 是否开启 Breadcrumb
		isBreadcrumb: true,
		// 是否开启 Breadcrumb 图标
		isBreadcrumbIcon: false,
		// 是否开启 Tagsview
		isTagsview: true,
		// 是否开启 Tagsview 图标
		isTagsviewIcon: false,
		
		/* 后端控制路由
					------------------------------- */
		// 是否开启后端控制路由
		isRequestRoutes: false,

		/* 过渡动画* slide-right slide-left  opacitys component-fade*/
		animation: 'slide-right',
		
		/* 全局网站标题 / 副标题
					------------------------------- */
		// 网站主标题（菜单导航、浏览器当前网页标题）
		globalTitle: 'vue3-admin',
  }
}

export default themeConfigModule;