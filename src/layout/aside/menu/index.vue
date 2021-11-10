<template>
  <el-menu
    router
    :default-active="defaultActive"
    background-color="#001529"
    text-color="#fff"
    :collapse="isCollapse"
    :collapse-transition="false"
  >
    <template v-for="route in menuLists">
      <el-submenu :index="route.path" v-if="hasSubMenu(route)" :key="route.path">
        <template #title>
          <i :class="route.meta.icon ? route.meta.icon : ''"></i>
          <span>{{ route.meta.title }}</span>
        </template>
        <SubItem
          v-for="childRoute in route.children"
          :key="childRoute.path"
          :route="childRoute"
        />
      </el-submenu>
      <!-- 一级菜单 -->
      <el-menu-item :index="route.path" :key="route.path" v-else>
        <i :class="route.meta.icon ? route.meta.icon : ''"></i>
        <template #title v-if="!route.meta.isLink || route.meta.isIframe">
          <span>{{ route.meta.title }}</span>
        </template>
        <template #title v-else>
          <a :href="route.meta.linkUrl" target="_blank">
            <span>{{ route.meta.title }}</span>
          </a>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store/index";
import type { MenuModule } from "@/router/types";
import SubItem from "./subItem.vue";

export default defineComponent({
  name: "Menu",
  components: {
    SubItem,
  },
  props: {},
  setup(props) {
    const store = useStore();
    const route = useRoute();
    // 获取父级菜单数据
    const menuLists = computed(() => {
      return store.state.routes.routesList;
    });
    // 有子菜单
    const hasSubMenu = (route: MenuModule) => {
      return route.children && route.children.length > 0;
    };
    // 菜单展开/收起
    const isCollapse = computed(() => {
      return store.state.themeConfig.isCollapse;
    });
    // 当前激活菜单
    const defaultActive = computed(() => {
      return route.meta.currentActiveMenu || route.path;
    });
    return {
      menuLists,
      isCollapse,
      hasSubMenu,
      defaultActive,
    };
  },
});
</script>

<style scoped lang="scss">
</style>
