<template>
	<div class="layout-navbars-breadcrumb-user">
		<el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
			<span class="layout-navbars-breadcrumb-user-link">
				<img :src="userInfo.avatar || defaultAvatar" class="layout-navbars-breadcrumb-user-link-photo mr-5" />
				{{ userInfo.userName || 'test' }}
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="/home">{{ 'Home' }}</el-dropdown-item>
					<el-dropdown-item divided command="logOut">{{ 'logOut' }}</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/index';
import { clearSession } from '@/utils/storage';
import { ElMessageBox, ElMessage } from 'element-plus';
import defaultAvatar from '@/assets/defaultAvatar.jpg';

export default defineComponent({
	name: 'layoutBreadcrumbUser',
	setup() {
		const store = useStore();
		const router = useRouter();
		// 获取用户信息 vuex
		const state = reactive({
			userInfo: {}
		})
		// 页面加载时
		onMounted(() => {
			state.userInfo = store.state.user.userInfo;
		});
		// 下拉菜单点击时
		const onHandleCommandClick = (path: string) => {
			if (path === 'logOut') {
				ElMessageBox({
					closeOnClickModal: false,
					closeOnPressEscape: false,
					title: '提示',
					message: '确定退出?',
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = '正在退出';
							setTimeout(() => {
								done();
								setTimeout(() => {
									instance.confirmButtonLoading = false;
								}, 300);
							}, 700);
						} else {
							done();
						}
					},
				})
					.then(() => {
						// 清除缓存token等
						clearSession();
						router.push('/login');
						setTimeout(() => {
							ElMessage.success('退出成功');
						}, 300);
					})
					.catch(() => {});
			} else {
				router.push(path);
			}
    };
    
		return {
			...toRefs(state),
			defaultAvatar,
      onHandleCommandClick,
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	&-link {
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;
		&-photo {
			width: 25px;
			height: 25px;
			border-radius: 100%;
		}
	}
}
</style>
