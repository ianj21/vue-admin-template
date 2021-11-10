<template>
	<div class="layout-scrollbar" style="height: 650px;">
		<div class="flex h-full" v-loading="iframeLoading">
			<iframe :src="linkUrl" frameborder="0" height="100%" width="100%" id="iframe" v-show="!iframeLoading"></iframe>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onBeforeMount, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'LayoutIframeView',
	props: {
		meta: {
			type: Object,
			default: () => {},
		},
	},
	setup(props, { emit }) {
    const route = useRoute();
		const state = reactive({
			iframeLoading: true,
			linkUrl: '',
		});
		// 初始化页面加载 loading
		const initIframeLoad = () => {
			nextTick(() => {
				state.iframeLoading = true;
				const iframe = document.getElementById('iframe');
				if (!iframe) return false;
				iframe.onload = () => {
					state.iframeLoading = false;
				};
			});
		};
		// 页面加载前
		onBeforeMount(() => {
      state.linkUrl = route.meta.linkUrl as any;
		});
		// 页面加载时
		onMounted(() => {
			initIframeLoad();
		});
		// 页面卸载时
		onUnmounted(() => {
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
