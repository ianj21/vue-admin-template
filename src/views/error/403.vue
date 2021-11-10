<template>
	<div class="error">
		<img src="../../assets/403.jpg" @click="onGoHome" />
	</div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
	name: '403',
	setup() {
		const router = useRouter();
		const onGoHome = () => {
			router.push('/');
		};
		return {
			onGoHome,
		};
	},
};
</script>

<style scoped lang="scss">
.error {
	height: 100%;
	background-color: white;
	display: flex;
	img {
		cursor: pointer;
		width: 100%;
		height: 100%;
	}
}
</style>
