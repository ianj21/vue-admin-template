import type { RouteRecordRaw } from 'vue-router';
import { RoleEnum } from '@/enums/roleEnum';

import { defineComponent } from 'vue';

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteMeta {
  // title
  title: string;
  // 图标，也是菜单图标
  icon?: string;
  // 父级路径
  parentPath?: string;
  // 是否忽略权限，只在权限模式为Role的时候有效
  ignoreAuth?: boolean;
  // 可以访问的角色，只在权限模式为Role的时候有效
  roles?: RoleEnum[];
  // 是否缓存
  keepAlive?: boolean;
  // 是否固定标签
  affix?: boolean;

  // 指定该路由切换的动画名
  transitionName?: string;

  // 隐藏该路由在面包屑上面的显示
  hideBreadcrumb?: boolean;

  // 隐藏所有子菜单
  hideChildrenInMenu?: boolean;

  // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
  currentActiveMenu?: string;

  // 当前路由不再标签页显示
  hideTab?: boolean;

  // 当前路由不再菜单显示
  hideMenu?: boolean;

  // 是否外部链接
  isLink?: boolean;

  // 是否iframe
  isIframe?: boolean;

  // 内嵌iframe的地址或外部链接地址
  linkUrl?: string;
  
  // 菜单排序。越大排名越后面 
  orderNo?: number;
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  redirect?: string,
  children?: AppRouteRecordRaw[];
  fullPath?: string;
}

export type AppRouteModule = AppRouteRecordRaw;

export type MenuModule = AppRouteRecordRaw;
