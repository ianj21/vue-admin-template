<template>
  <el-submenu
		:index="route.path"
		v-if="hasSubMenu()"
	>
		<template #title>
			<i :class="route.meta.icon"></i>
			<span>{{ route.meta.title }}</span>
		</template>
		<sub-item
			v-for="childRoute in route.children"
			:key="childRoute.path"
			:route="childRoute"
		/>
  </el-submenu>
  <el-menu-item 
		:index="route.path"
		:key="route.path"
		v-else
	>
    <template v-if="!route.meta.isLink || route.meta.isIframe">
      <i :class="route.meta.icon ? route.meta.icon : ''"></i>
      <span>{{ route.meta.title }}</span>
    </template>
    <template v-else>
      <a :href="route.meta.linkUrl" target="_blank">
      <i :class="route.meta.icon ? route.meta.icon : ''"></i>
        {{ route.meta.title }}
      </a>
    </template>
  </el-menu-item>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'MenuSubItem',
	props: {
		route: {
			type: Object,
			default: () => {},
		},
	},
	setup(props) {
		// 有子菜单
		const hasSubMenu = () => {
			return props.route.children && props.route.children.length > 0;
		}
		return {
			hasSubMenu,
		};
	},
});
</script>
