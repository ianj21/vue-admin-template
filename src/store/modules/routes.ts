import { Module } from 'vuex';
import type { AppRouteModule } from '@/router/types';
import { RoutesState, RootStateTypes } from '@/store/types/index';

const routesModule: Module<RoutesState, RootStateTypes> = {
  namespaced: true,
  state: {
    // 菜单路由
    routesList: [],
    // 需缓存路由名称
		keepAliveNames: [],
  },
  mutations: {
    // 设置路由，菜单中使用到
    setRoutesList(state: any, data: Array<AppRouteModule>) {
      state.routesList = data;
    },
    // 设置路由缓存（name字段）
    setCacheKeepAlive(state: any, data: Array<string>) {
			state.keepAliveNames = data;
		},
  },
  actions: {
    // 获取路由，菜单中使用到
    async getRoutesList({ commit }, data: Array<AppRouteModule>) {
      commit('setRoutesList', data);
    },
  },
};

export default routesModule;
