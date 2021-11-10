import type { AppRouteModule } from '@/router/types';
import { LayoutParentView } from '@/router/constant';

const route: AppRouteModule = {
  path: '/menus',
  name: 'Menus',
  component: LayoutParentView,
  redirect: '/menus/menus1',
  meta: {
    icon: 'el-icon-menu',
    title: 'Menus',
  },
  children: [
    {
      path: '/menus/menus1',
      name: 'MenusMenus1',
      component: LayoutParentView,
      redirect: '/menus/menus1/menus1-1',
      meta: {
        icon: 'el-icon-menu',
        title: 'Menus1',
        parentPath: '/menus',
      },
      children: [
        {
          path: '/menus/menus1/menus1-1',
          name: 'MenusMenus1Menus1-1',
          component: () => import('@/views/menus/menus1/menus1-1/index.vue'),
          meta: {
            icon: 'el-icon-menu',
            title: 'Menus1-1',
            parentPath: '/menus/menus1',
          },
        },
        {
          path: '/menus/menus1/menus1-2',
          name: 'MenusMenus1Menus1-2',
          component: () => import('@/views/menus/menus1/menus1-2/index.vue'),
          meta: {
            icon: 'el-icon-menu',
            title: 'Menus1-2',
            parentPath: '/menus/menus1',
          },
        },
      ]
    },
    {
      path: '/menus/menus2',
      name: 'MenusMenus2',
      component: () => import('@/views/menus/menus2/index.vue'),
      meta: {
        icon: 'el-icon-menu',
        title: 'Menus2',
        parentPath: '/menus',
      },
    }
  ],
};

export default route;