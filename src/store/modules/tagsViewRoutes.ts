import { Module } from 'vuex';
import { TagsViewRoutesState, RootStateTypes } from '@/store/types/index';
import { treeToList } from '@/utils/treeHelper';

const tagsViewRoutesModule: Module<TagsViewRoutesState, RootStateTypes> = {
	namespaced: true,
	state: {
		tagsViewRoutes: [],
	},
	mutations: {
		// 设置 TagsView 路由
		setTagsViewRoutes(state: any, data: Array<any>) {
      state.tagsViewRoutes = treeToList(data);
		},
	},
	actions: {
		// 设置 TagsView 路由
		async getTagsViewRoutes({ commit }, data: Array<string>) {
			commit('setTagsViewRoutes', data);
		},
	},
};

export default tagsViewRoutesModule;
