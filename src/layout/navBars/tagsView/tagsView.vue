<template>
  <div class="tagsview">
    <el-scrollbar ref="scrollbarRef">
      <ul class="layout-navbars-tagsview-ul" ref="tagsUlRef">
        <li
					v-for="(v, k) in tagsViewList"
					:key="k"
					class="layout-navbars-tagsview-ul-li"
					:data-name="v.name"
					:class="{ 'is-active': isActive(v.path) }"
					@contextmenu.prevent="onContextmenu(v, $event)"
					@click="onTagsClick(v, k)"
				>
					<span>{{ v.meta.title }}</span>
					<template v-if="isActive(v.path)">
						<i
							class="el-icon-close layout-navbars-tagsview-ul-li-icon
              layout-icon-active ml-5"
							v-if="!v.meta.affix"
							@click.stop="closeCurrentTagsView(v.path)"
						></i>
					</template>
				</li>
      </ul>
		</el-scrollbar>
    <ContextMenu ref="contextmenuRef" :offset="offset"
      @currentContextmenuClick="onCurrentContextmenuClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, computed, ref, nextTick, onBeforeUpdate, onBeforeMount, onUnmounted, getCurrentInstance, watch } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useStore } from '@/store/index.ts';
import ContextMenu from '@/layout/navBars/tagsView/ContextMenu.vue';
import screenfull from 'screenfull';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'layoutTagsView',
  components: {
    ContextMenu,
  },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const contextmenuRef = ref();
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state: any = reactive({
			routePath: route.path,
			offset: { x: '', y: '' },
      // 显示tag列表
      tagsViewList: [],
      tagsViewRoutesList: [],
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig;
		});
		// 获取 vuex 中的 tagsViewRoutes 列表
		const getTagsViewRoutes = () => {
      state.routePath = route.path;
			state.tagsViewList = [];
			state.tagsViewRoutesList = store.state.tagsViewRoutes.tagsViewRoutes;
			initTagsView();
		};
		// vuex 中获取路由信息：如果是设置了固定的affix，进行初始化显示
		const initTagsView = () => {
			state.tagsViewRoutesList.map((v: any) => {
        if (v.meta.affix && !v.meta.hideMenu) state.tagsViewList.push({ ...v });
			});
			addTagsView(route.path);
		};
		// 1、添加 tagsView：未设置隐藏（hideMenu）也添加到在 tagsView 中
		const addTagsView = (path: string, to?: any) => {
			if (state.tagsViewList.some((v: any) => v.path === path)) return false;
      const item = state.tagsViewRoutesList.find((v: any) => v.path === path);
			if (item.meta.isLink && !item.meta.isIframe) return false;
			item.query = to?.query ? to?.query : route.query;
			state.tagsViewList.push({ ...item });
		};
		// 监听路由的变化，动态赋值给 tagsView
		watch(store.state, (val) => {
			if (val.tagsViewRoutes.tagsViewRoutes.length === state.tagsViewRoutesList.length) return false;
			getTagsViewRoutes();
		});
		// 页面加载时
		onMounted(() => {
			// 初始化 vuex 中的 tagsViewRoutes 列表
			getTagsViewRoutes();
		});
		// 路由更新时
		onBeforeRouteUpdate((to) => {
			state.routePath = to.path;
			addTagsView(to.path, to);
    });
		// 2、刷新当前 tagsView：
		const refreshCurrentTagsView = (path: string) => {
			proxy.mittBus.emit('onTagsViewRefreshRouterView', path);
		};
		// 3、关闭当前 tagsView：如果是设置了固定的affix，不可以关闭
		const closeCurrentTagsView = (path: string) => {
			state.tagsViewList.map((v: any, index: number, arr: any) => {
				if (!v.meta.affix) {
					if (v.path === path) {
						state.tagsViewList.splice(index, 1);
						setTimeout(() => {
							// 最后一个
							if (state.tagsViewList.length === index) router.push({ path: arr[arr.length - 1].path, query: arr[arr.length - 1].query });
							// 否则，跳转到下一个
							else router.push({ path: arr[index].path, query: arr[index].query });
						}, 0);
					}
				}
			});
    };
		// 4、关闭其它 tagsView
		const closeOtherTagsView = (path: string) => {
			state.tagsViewList = [];
			state.tagsViewRoutesList.map((v: any) => {
				if (v.meta.affix && !v.meta.hideMenu) {
          // 如果是设置了固定的affix，不进行关闭
          state.tagsViewList.push({ ...v })
        };
			});
			addTagsView(path);
		};
		// 5、关闭全部 tagsView
		const closeAllTagsView = (path: string) => {
			state.tagsViewList = [];
			state.tagsViewRoutesList.map((v: any) => {
				if (v.meta.affix && !v.meta.hideMenu) {
          // 如果是设置了固定的affix，不进行关闭
					state.tagsViewList.push({ ...v });
					if (state.tagsViewList.some((v: any) => v.path === path)) {
            router.push({ path, query: route.query })
          }	else {
            router.push({ path: v.path, query: route.query })
          }
				}
			});
		};
		// 全屏
		const openCurrenFullscreen = (path: string) => {
			const screenfulls: any = screenfull;
			if (!screenfulls.enabled) {
        ElMessage.warning('浏览器不支持全屏');
        return false;
      }
			const item = state.tagsViewList.find((v: any) => v.path === path);
			nextTick(() => {
				router.push({ path, query: item.query });
				const element = document.querySelector('.layout-main');
				screenfulls.request(element);
			});
		};
		// 当前项右键菜单点击
		const onCurrentContextmenuClick = (data: any) => {
			let { id, path } = data;
			let currentTag = state.tagsViewList.find((v: any) => v.path === path);
			switch (id) {
				case 0:
					refreshCurrentTagsView(path);
					router.push({ path, query: currentTag.query });
					break;
				case 1:
					closeCurrentTagsView(path);
					break;
				case 2:
					router.push({ path, query: currentTag.query });
					closeOtherTagsView(path);
					break;
				case 3:
					closeAllTagsView(path);
					break;
				case 4:
					openCurrenFullscreen(path);
					break;
			}
		};
		// 右键点击时：传 x,y 坐标值到子组件中（props）
		const onContextmenu = (v: any, e: any) => {
			const { clientX, clientY } = e;
			state.offset.x = clientX;
      state.offset.y = clientY;
			contextmenuRef.value.openContextmenu(v);
		};
		// 判断页面高亮
		const isActive = (path: string) => {
			return path === state.routePath;
		};
		// 当前的 tagsView 项点击时
		const onTagsClick = (v: any, k: number) => {
			state.routePath = v.path;
			router.push(v);
		};
		return {
      isActive,
      closeCurrentTagsView,
      onCurrentContextmenuClick,
      onContextmenu,
			getTagsViewRoutes,
      onTagsClick,
			refreshCurrentTagsView,
      contextmenuRef,
			getThemeConfig,
			...toRefs(state),
		};
  }
});
</script>

<style scoped lang="scss">
.tagsview {
  flex: 1;
	background-color: #ffffff;
	border-bottom: 1px solid #f1f2f3;
	box-shadow: rgb(0 21 41 / 4%) 0px 1px 4px;
	::v-deep(.el-scrollbar__wrap) {
		overflow-x: auto !important;
  }
  ul {
    list-style: none;
		margin: 0;
		padding: 0;
		height: 34px;
		display: flex;
		align-items: center;
		color: #606266;
		font-size: 12px;
		white-space: nowrap;
    padding: 0 15px;
    li {
      height: 26px;
			line-height: 26px;
			display: flex;
			align-items: center;
			border: 1px solid #e6e6e6;
			padding: 0 15px;
			margin-right: 5px;
			border-radius: 2px;
			position: relative;
			z-index: 0;
			cursor: pointer;
			justify-content: space-between;
			&:hover {
				background-color: #b3d8ff;
				color: var(--color-primary);
				border-color: #09C7F7;
			}
			&-iconfont {
				position: relative;
				left: -5px;
				font-size: 12px;
			}
    }
		.is-active {
			color: #ffffff;
			background: var(--color-primary);
			border-color: var(--color-primary);
		}
  }
}
</style>