// 用户权限hooks
import { store } from '@/store/index';

export function usePermission() {
  function hasPermission(value?: string | string[]): boolean {
    // Visible by default
    if (!value) {
      return true;
    }
    // 获取登录用户权限信息
    const { userInfo } = store.state.user;
    const roles: any = userInfo.roles;
    if (!Array.isArray(value)) {
      return roles.includes(value);
    }
    // value是数组
    return value.some((item) => roles.includes(item));
  }
  return {
    hasPermission,
  }
}