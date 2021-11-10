<template>
  <div class="option-module flex items-center mr-10">
    <div
      class="icon"
      @click="onScreenfullClick"
    >
      <i class="el-icon-full-screen font-16"></i>
    </div>
		<User />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from "@/store/index";
import screenfull from "screenfull";
import { ElMessage } from "element-plus";
import User from './User.vue';

export default defineComponent({
	components: { 
    User,
  },
	setup() {
    const store = useStore();
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    // 全屏点击时
    const onScreenfullClick = () => {
      const screenfulls: any = screenfull;
      if (!screenfulls.enabled) {
        ElMessage.warning("浏览器不支持全屏");
        return false;
      }
      screenfulls.toggle();
    };

    return {
      getThemeConfig,
      onScreenfullClick,
    };
	},
});
</script>

<style scoped lang="scss">
.option-module {
  .icon {
    padding: 0 10px;
    height: 100%;
    cursor: pointer;
    color: var(--color-navBar);
    &:hover {
      background: rgba(0, 0, 0, 0.04);
      i {
        display: inline-block;
        animation: logoAnimation 0.3s ease-in-out;
      }
    }
  }
}

</style>