<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, watch, computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from './store/index';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig;
		});
    
		// 监听路由的变化，设置网站标题
		watch(() => route.path,() => {
			nextTick(() => {
				const webTitle = route.meta.title || '';
				document.title = `${webTitle} - ${getThemeConfig.value.globalTitle}` || getThemeConfig.value.globalTitle;
			});
		});
  }
})
</script>

<style>
</style>
