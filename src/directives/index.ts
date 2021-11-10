/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import { permissionDirective } from './permission';
import { focusDirective } from './focus';
import { copyDirective } from './copy';
import { debounceDirective } from './debounce';
import { throttleDirective } from './throttle';

export function setupGlobDirectives(app: App) {
  permissionDirective(app);
  focusDirective(app);
  copyDirective(app);
  debounceDirective(app);
  throttleDirective(app);
}
