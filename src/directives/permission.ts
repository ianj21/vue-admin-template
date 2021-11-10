/**
 * Global permission directive
 * Used for fine-grained control of component permission
 * @Example v-auth="RoleEnum.TEST"
 */
import type { App, DirectiveBinding } from 'vue';
import { usePermission } from '@/hooks/usePermission';

function isAuth(el: Element, binding: any) {
  const { hasPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

export function permissionDirective(app: App) {
  app.directive('auth', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
      isAuth(el, binding);
    },
    updated(el: any, binding: DirectiveBinding<any>) {
      // 实时更新最新的目标内容
      isAuth(el, binding);
    },
  });
}

