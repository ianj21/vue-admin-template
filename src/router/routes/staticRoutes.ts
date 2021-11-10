import type { RouteRecordRaw } from 'vue-router';

// 定义静态路由, 不嵌套在layout内
const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登陆',
		},
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('@/views/error/404.vue'),
		meta: {
			title: '找不到此页面',
		},
	},
	{
		path: '/403',
		name: 'noPower',
		component: () => import('@/views/error/403.vue'),
		meta: {
			title: '没有权限',
		},
	},
];


// 定义404界面
export const pathMatch = {
	path: '/:path(.*)*',
	redirect: '/404',
};

export default staticRoutes;