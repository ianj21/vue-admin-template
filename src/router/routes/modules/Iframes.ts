import type { AppRouteModule } from '@/router/types';
import { LayoutIframeView } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const route: AppRouteModule = {
  path: '/iframes',
  name: 'IframeView',
  component: LayoutIframeView,
  meta: {
    icon: 'el-icon-link',
    title: 'IfameView',
    linkUrl: 'https://element-plus.gitee.io/#/zh-CN/component/icon',
    isLink: false,
    isIframe: true,
    roles: [RoleEnum.ADMIN]
  },
};

export default route;