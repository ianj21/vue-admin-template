<template>
  <div class="layout-header">
		<NavBars />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBars from '@/layout/navBars/index.vue';

export default defineComponent({
	name: 'layoutHeader',
	components: {
		NavBars
	},
	setup() {
	},
});
</script>

<style scoped lang="scss">
.layout-header {
	padding: 0 !important;
  background-color: var(--bg-header);
}
</style>
