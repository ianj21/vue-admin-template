<template>
  <div class="layout-logo" v-if="setShowLogo">
    <img :src="logo" class="layout-logo-medium-img" />
    <span>{{ getThemeConfig.globalTitle }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from "vue";
import logo from "@/assets/logo.png";
import { useStore } from "@/store/index";

export default defineComponent({
  name: "layoutLogo",
  setup() {
    const state = reactive({
      logo,
    });

    const store = useStore();
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });

    // 设置 logo 的显示
    const setShowLogo = computed(() => {
      const { isShowLogo, isCollapse } = store.state.themeConfig;
      return isShowLogo && !isCollapse;
    });

    return {
      ...toRefs(state),
      getThemeConfig,
      setShowLogo,
    };
  },
});
</script>

<style scoped lang="scss">
.layout-logo {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-logo);
  border: none;
  animation: logoAnimation 0.3s ease-in-out;
  .layout-logo-medium-img {
    width: 40px;
    height: 40px;
  }
  span {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
