/**
 * @description: default layout
 */
export const LayOut = () => import('@/layout/index.vue');

/**
 * @description: parent-layout
 */
export const  LayoutParentView  = () => import('@/layout/routerView/Parent.vue');

/**
 * @description: LayoutIframeView
 */
export const LayoutIframeView = () => import('@/layout/routerView/Iframes.vue');
/**
 * @description: LayoutLinkView
 */
export const LayoutLinkView = () => import('@/layout/routerView/Link.vue');