import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import { RootStateTypes } from './types/index';

import themeConfig from './modules/themeConfig';
import routes from './modules/routes';
import tagsViewRoutes from './modules/tagsViewRoutes';
import user from './modules/user';

export const key: InjectionKey<Store<RootStateTypes>> = Symbol();

export const store = createStore<RootStateTypes>({
	modules: {
		themeConfig,
		routes,
		tagsViewRoutes,
		user,
	},
	plugins: [createPersistedState({
		storage: window.sessionStorage
	})],
});

export function useStore() {
	return baseUseStore(key);
}

