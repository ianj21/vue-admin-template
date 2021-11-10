import type { AppRouteModule } from '@/router/types';

const route: AppRouteModule =  {
  path: '/about',
  name: 'About',
  component: () => import('@/views/about/index.vue'),
  meta: {
    icon: 'el-icon-user-solid',
    title: 'About',
  },
};

export default route;