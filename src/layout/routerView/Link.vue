<template>
	<div class="layout-scrollbar link-view">
		<div class="flex">
			<a :href="currentRouteMeta.linkUrl" target="_blank" class="flex-margin">{{ currentRouteMeta.title }}</a>
		</div>
	</div>
</template>

<script lang="js">
import { defineComponent, reactive, onBeforeMount, toRefs } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'layoutLinkView',
	props: {
	},
	setup(props) {
    const route = useRoute();
		const state = reactive({
			currentRouteMeta: {},
		});
		// 页面加载前
		onBeforeMount(() => {
      state.currentRouteMeta = route.meta;
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
