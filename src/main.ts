import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import { setupGlobDirectives } from '@/directives';
// 全局注册组件
import globalComponents from '@/components/index';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/styles/index.scss';
import mitt from 'mitt';

const app = createApp(App)
app
  .use(router)
  .use(store, key)
  .use(globalComponents)
  .use(ElementPlus)

app.config.globalProperties.mittBus = mitt();
// Register global directive
setupGlobDirectives(app);
app.mount('#app')
