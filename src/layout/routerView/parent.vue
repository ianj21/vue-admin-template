<template>
	<router-view v-slot="{ Component, route }">
		<transition
		 :name="route.meta.transitionName || setTransitionName" mode="out-in"
		 >
		 	<keep-alive :include="keepAliveNameList">
				<component :is="Component" :key="refreshRouterViewKey" />
			</keep-alive>
		</transition>
	</router-view>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, reactive, getCurrentInstance, onBeforeMount, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store/index';

export default defineComponent({
  name: 'LayoutParentView',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const store = useStore();
		const state: any = reactive({
			refreshRouterViewKey: null,
			keepAliveNameList: [],
		});
		// 设置主界面切换动画
		const setTransitionName = computed(() => {
			return store.state.themeConfig.animation;
		});
    
		// 获取组件缓存列表(name值)
		const getKeepAliveNames = computed(() => {
			return store.state.routes.keepAliveNames;
		});
		
		// 页面加载前，处理缓存，页面刷新时路由缓存处理
		onBeforeMount(() => {
			state.keepAliveNameList = getKeepAliveNames.value;
			proxy.mittBus.on('onTagsViewRefreshRouterView', (path: string) => {
				if (route.path !== path) return false;
				state.keepAliveNameList = getKeepAliveNames.value.filter((name: string) => route.name !== name);
				state.refreshRouterViewKey = route.path;
				nextTick(() => {
					state.refreshRouterViewKey = null;
					state.keepAliveNameList = getKeepAliveNames.value;
				});
			});
		});
		// 页面卸载时
		onUnmounted(() => {
			proxy.mittBus.off('onTagsViewRefreshRouterView');
		});
		return {
			setTransitionName,
			getKeepAliveNames,
			...toRefs(state),
		};

  }
  
})

</script>