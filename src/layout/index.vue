<template>
  <el-container class="layout-container">
    <Aside />
    <el-container class="is-vertical">
      <Header />
      <el-main class="layout-main">
        <LayoutParentView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import Aside from "@/layout/aside/index.vue";
import Header from "@/layout/header/index.vue";
import LayoutParentView from "@/layout/routerView/Parent.vue";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";
import { routeModuleList } from '@/router/routes/index';
import { getAuthRoutes, getAuthMenus } from '@/utils/routesHelper';

export default defineComponent({
  name: "layout",
  components: {
    Aside,
    Header,
    LayoutParentView,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const setCacheRoutes = () => {
      // 存储权限菜单
      store.commit("routes/setRoutesList", getAuthMenus(routeModuleList));
      // 设置路由缓存
      const keepAliveRoutes = router
        .getRoutes()
        .filter(item => item.meta.keepAlive);
      store.commit("routes/setCacheKeepAlive", keepAliveRoutes.map(route => route.name));
      
      // 过滤获取权限路由
      const authRoutes = getAuthRoutes(routeModuleList);
      // 存储tagsViewRoutes
      store.commit("tagsViewRoutes/setTagsViewRoutes", authRoutes);
    };
    onBeforeMount(() => {
      setCacheRoutes();
    });
  },
});
</script>

<style></style>
