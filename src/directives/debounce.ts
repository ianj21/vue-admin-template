/**
 * Global debounce directive
 * Used for fine-grained control of component debounce
*  @param {Function} fn - 执行事件
*  @param {?String|"click"} event - 事件类型 例："click"
*  @param {?Number|300} delay - 间隔时间
*  @param {Array} binding.value - [fn, event, delay]
 * @Example <el-input v-debounce="[search, 'click', 300]"></el-input>
 */
import type { App, DirectiveBinding } from 'vue';

function debounce(el: any, binding: any) {
  const [fn, event = 'input', delay = 300] = binding.value;
  let timer: any;
  el.addEventListener(event, () => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  });
}

export function debounceDirective(app: App) {
  app.directive('debounce', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
      debounce(el, binding);
    }
  });
}

