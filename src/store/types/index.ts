
import type { AppRouteModule } from '@/router/types';

// 布局配置
export interface ThemeConfigState {
	isDrawer?: boolean;
	isCollapse: boolean;
	isShowLogo: boolean;
	isBreadcrumb: boolean;
	isBreadcrumbIcon: boolean;
	isTagsview: boolean;
	isTagsviewIcon: boolean;
	isRequestRoutes: boolean;
	animation: string;
	globalTitle: string;
}

// 路由
export interface RoutesState {
	routesList: Array<AppRouteModule>;
	keepAliveNames: Array<string>;
}

// TagsView 路由列表
export interface TagsViewRoutesState {
	tagsViewRoutes: Array<object>;
}

// 用户信息
export interface UserState {
	userInfo: {
		id?: string | number;
		userName: string;
		password: string;
		roles?: Array<string>;
		avatar?: string;
	};
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
	themeConfig: ThemeConfigState;
	routes: RoutesState;
	tagsViewRoutes: TagsViewRoutesState;
	user: UserState;
}