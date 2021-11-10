<template>
	<div class="error">
		<img src="../../assets/404.jpg" />
	</div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
	name: '404',
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
		width: 100%;
		height: 100%;
	}
}
</style>
