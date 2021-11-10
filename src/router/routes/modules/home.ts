import type { AppRouteModule } from '@/router/types';

const route: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    icon: 'el-icon-s-home',
    title: 'Home',
    keepAlive: true,
    affix: true,
  },
};

export default route;