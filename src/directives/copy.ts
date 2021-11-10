/**
 * @Example v-copy=""
 */
import type { App, DirectiveBinding } from 'vue';
import { ElMessage } from 'element-plus'

function copy(el: any, binding: any) {
  el.targetContent = binding.value;
  el.addEventListener('click', () => {
    if(!el.targetContent) return ElMessage.warning('没有需要复制的目标内容');
    // 创建textarea标签
    const textarea: any = document.createElement('textarea');
    textarea.readOnly = 'readonly';
    textarea.style.position = 'fixed';
    textarea.style.top = '-99999px';
    // 把目标内容赋值给它的value属性
    textarea.value = el.targetContent;
    // 插入到页面
    document.body.appendChild(textarea);
    // 调用onselect()方法
    textarea.select();
    // 把目标内容复制进剪贴板, 该API会返回一个Boolean
    const res: boolean = document.execCommand('Copy');
    if (res) {
      // console.log('复制成功');
      ElMessage.success('复制成功');
    } else {
      // console.log('复制失败');
      ElMessage.error('复制失败');
    }
    document.body.removeChild(textarea);
  });
  
}

export function copyDirective(app: App) {
  app.directive('copy', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
      copy(el, binding);
    },
    updated(el: any, binding: DirectiveBinding<any>) {
      // 实时更新最新的目标内容
      el.targetContent = binding.value;
    },
    unmounted(el: HTMLElement) {
      el.removeEventListener('click', () => {});
    }
  });
}

