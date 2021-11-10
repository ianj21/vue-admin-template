import { Module } from 'vuex';
import { setSession } from '@/utils/storage';
import { login, getUserInfo } from '@/api/user';
import { UserState, RootStateTypes } from '../types/index';

const userModule: Module<UserState, RootStateTypes> = {
	namespaced: true,
	state: {
		userInfo: {
			id: '',
			userName: '',
			password: '',
			roles: [],
		},
	},
	mutations: {
		// 设置用户信息
		setUserInfo(state: any, data: object) {
			state.userInfo = data;
		},
	},
	actions: {
		// 登陆
		async login({ commit }, data: object) {
			return new Promise(async (resolve) => {
				const res: any = await login(data);
				// 存储用户信息到浏览器缓存
				res && setSession('token', res.data);
				resolve(res);
			});
		},
		// 获取用户信息
		async getUserInfo({ commit }) {
			return new Promise(async (resolve) => {
				// 异步获取用户信息
				const res: any = await getUserInfo();
				if (res) {
					commit('setUserInfo', res.data);
					resolve(res.data);
				}
			});
		},
	},
};

export default userModule;
