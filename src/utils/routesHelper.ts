// 路由相关工具函数

import { usePermission } from "@/hooks/usePermission";
const { hasPermission } = usePermission();
/**
 * @description 获取权限路由
 * @param {Array} list 路由数组
 */
export function getAuthRoutes(list: any[]) {
  return list
    .filter((item) => (hasPermission(item.meta.roles)))
    .map((item) => {
      item = Object.assign({}, item);
      if (item.children) {
        item.children = getAuthRoutes(item.children)
      }
      return item;
    });
}
/**
 * @description 获取菜单,过滤无权限与在菜单隐藏的路由
 * @param {Array} list 路由数组
 */
export function getAuthMenus(list: any[]) {
  return list
    .filter((item) => (!item.meta.hideMenu && hasPermission(item.meta.roles)))
    .map((item) => {
      item = Object.assign({}, item);
      if (item.children) item.children = getAuthMenus(item.children);
      return item;
    });
}