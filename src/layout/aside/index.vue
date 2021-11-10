<template>
  <el-aside class="layout-aside" :class="setCollapseWidth">
		<Logo />
		<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef">
      <Menu />
		</el-scrollbar>
	</el-aside>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store/index';
import Logo from '@/layout/logo/index.vue';
import Menu from '@/layout/aside/menu/index.vue';

export default defineComponent({
	name: 'layoutAside',
  components: {
    Logo,
    Menu,
   },
	setup() {
		const store = useStore();
		// 设置菜单展开/收起时的宽度
		const setCollapseWidth = computed(() => {
			const { isCollapse } = store.state.themeConfig;
			if (isCollapse) {
				return ['layout-aside-width64'];
			} else {
				return ['layout-aside-width-default'];
			}
		})
    
    return {
			setCollapseWidth,
    }
	},
});
</script>
<style scoped lang="scss">
.layout-aside {
	background: var(--bg-menuBar);
	box-shadow: 2px 0 6px rgb(0 21 41 / 1%);
	height: inherit;
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	overflow-x: hidden !important;
	.el-scrollbar {
		width: 100%;
	}
	.el-scrollbar__view {
		overflow: hidden;
	}
}
// 菜单展开宽度
.layout-aside-width-default {
	width: 220px !important;
	transition: width 0.3s ease;
}
// 菜单收起宽度
.layout-aside-width64 {
	width: 64px !important;
	transition: width 0.3s ease;
}
</style>