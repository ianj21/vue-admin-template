import type { AppRouteModule } from '@/router/types';
import { LayOut } from '@/router/constant';
import { getMenusOrderNo } from '@/router/menus/index';
const modules = import.meta.globEager('./modules/**/*.ts');

let routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  mod.meta.orderNo = getMenusOrderNo(mod.path);
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

routeModuleList = routeModuleList.sort((a: any, b: any) => (a.meta.orderNo -b.meta.orderNo));

const routes: AppRouteModule[] = [
  {
    path: '/',
    name: '/',
    component: LayOut,
    redirect: '/home',
    meta: {
      title: 'Root'
    },
    children: routeModuleList
  },
];

export {
  routeModuleList
}

export default routes;
