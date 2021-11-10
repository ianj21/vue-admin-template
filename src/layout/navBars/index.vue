<template>
	<div class="layout-navbars-container">
    <div class="layout-navbars-breadcrumb height-navbars-default">
      <NavBarsBreadCrumb />
      <RightAside class="layout-navbars-breadcrumb-rightaside" />
    </div>
		<TagsView v-if="setShowTagsView" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store/index.ts';
import NavBarsBreadCrumb from './breadcrumb/index.vue';
import RightAside from "./rightAside/index.vue";
import TagsView from './tagsView/tagsView.vue';

export default defineComponent({
	name: 'layoutNavBars',
	components: {
		NavBarsBreadCrumb,
		RightAside,
		TagsView
	},
	setup() {
		const store = useStore();
		// 是否显示 tagsView
		const setShowTagsView = computed(() => {
			let { isTagsview } = store.state.themeConfig;
			return isTagsview;
		});
		return {
			setShowTagsView,
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-container {
  .layout-navbars-breadcrumb {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-bottom: 1px solid #f1f2f3;
    position: relative;
    .layout-navbars-breadcrumb-rightaside {
      position: absolute;
      right: 0;
    }
  }
}
.height-navbars-default {
  height: var(--height-header) !important;
  line-height: var(--height-header) !important;
}
</style>
