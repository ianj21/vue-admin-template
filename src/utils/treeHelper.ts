/**
* @function treeToList
* @description 树形转数组
 * @param {*} arr 数组对象
 */
export function treeToList(arr: any): any {
  if (arr.length <= 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}