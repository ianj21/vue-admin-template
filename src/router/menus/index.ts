const menus = [
  { path: '/home', orderNo: 1 },
  { path: '/menus', orderNo: 4 },
  { path: '/iframes', orderNo: 5 },
  { path: '/about', orderNo: 6 }
];

/**
 * @description 获取菜单排序
 * @param path 菜单路径
 */
export function getMenusOrderNo(path: string) {
  return menus.find(v => v.path === path)?.orderNo;
};

export default menus;