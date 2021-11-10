import { createRouter, createWebHashHistory } from 'vue-router';
import type { AppRouteModule } from '@/router/types';
import { usePermission } from '@/hooks/usePermission';
import { getSession } from '@/utils/storage';
import asyncRoutes from '@/router/routes/index';
import staticRoutes, { pathMatch } from './routes/staticRoutes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.addRoute(pathMatch); // 添加404界面

// 添加动态路由
export function setAddRoute(asyncRoutes: Array<AppRouteModule>) {
	asyncRoutes.forEach((route: any) => {
		router.addRoute(route);
	});
}

setAddRoute(asyncRoutes);

// 路由拦截
router.beforeEach((to, from, next) => {
  // 获取浏览器缓存token
	const token = getSession('token');
	if (to.path === '/login') {
		!token ? next() : next('/home');
	} else {
		// 非登录页
		if (!token) {
			next('/login')
		} else {
			// 已登录，判断是否有权限
  		const { hasPermission } = usePermission();
			const auth = hasPermission(to.meta.roles as Array<string>);
			auth ? next() : next('/403');
		}
	}
});


export default router;