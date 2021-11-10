<template>
	<div class="layout-navbars-breadcrumb">
		<i
			class="layout-navbars-breadcrumb-icon"
			:class="getThemeConfig.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
			@click="onThemeConfigChange"
		></i>
		<el-breadcrumb v-show="getThemeConfig.isBreadcrumb">
			<transition-group name="breadcrumb" mode="out-in">
				<el-breadcrumb-item
					v-for="(v, index) in breadCrumbList"
					:key="v.meta.title"
				>
					<span
						v-if="index === breadCrumbList.length - 1" class="layout-navbars-breadcrumb-span"
					>
						<i :class="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon">
						</i>
						{{ v.meta.title }}
					</span>
					<a v-else @click.prevent="onBreadcrumbClick(v)">
						<i
							:class="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon">
						</i>
						{{ v.meta.title }}
					</a>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store/index';

export default defineComponent({
	name: 'layoutBreadcrumb',
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state: any = reactive({
			breadCrumbList: [],
		});

		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig;
		});
		
		// 展开/收起左侧菜单点击
		const onThemeConfigChange = () => {
			store.state.themeConfig.isCollapse = !store.state.themeConfig.isCollapse;
		};

		// 面包屑点击时
		const onBreadcrumbClick = (v: any) => {
			const { redirect } = v;
			if (redirect) router.push(redirect);
			else router.push(v.path);
		};

		// 根据parentPath获取子菜单所有父级菜单路由
    const getParentMenuRoutes = (routes: any, parentPath: string) => {
      // 一级菜单路由不存在上级菜单
      if (!parentPath) return [];
      const list: any = [];
      function fn(routesList: Array<any>, pPath: string) {
        // 上一级路由
        const parentRoute = routesList.find((v) => v.path === pPath);
        // 存在上一级路由
        if (parentRoute && parentRoute.meta.parentPath) {
          list.unshift(parentRoute);
          fn(routesList, parentRoute.meta.parentPath);
        } else {
          list.unshift(parentRoute);
        }
        return list;
      }
			const parentRoutes = fn(routes, parentPath);
      return parentRoutes;
    };
    // 根据当前路由的父级路由初始化
    const init = (parentPath: string) => {
      // 父子菜单路由集合
      const parentRoutes = getParentMenuRoutes(router.getRoutes(), parentPath);
			state.breadCrumbList = [...parentRoutes, route];
    };
    // 页面加载时
    onMounted(() => {
			const meta: any = route.meta;
      init(meta.parentPath);
    });
    // 路由更新时
    onBeforeRouteUpdate((to) => {
			const meta: any = to.meta;
      init(meta.parentPath);
    });
		return {
			getThemeConfig,
			onThemeConfigChange,
			onBreadcrumbClick,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb {
	flex: 1;
	height: inherit;
	display: flex;
	align-items: center;
	padding-left: 15px;
	.layout-navbars-breadcrumb-icon {
		cursor: pointer;
		font-size: 18px;
		margin-right: 15px;
		color: var(--color-navBar);
	}
	.layout-navbars-breadcrumb-span {
		opacity: 0.7;
		color: var(--color-navBar);
	}
	.layout-navbars-breadcrumb-iconfont {
		font-size: 14px;
		margin-right: 5px;
	}
	::v-deep(.el-breadcrumb__separator) {
		opacity: 0.7;
		color: var(--color-navBar);
	}
}
</style>
