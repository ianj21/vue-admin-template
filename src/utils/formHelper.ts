// 表单逻辑

/**
 * @description 依据表单的子控件的meta，自动创建model
 * @param { Object } meta 表单的meta: {
 *  formItemMeta: {
 *    type: 'input',
 *  },
 * }
 */
export function createModel(meta: any) {
  const formData: any = {};
  // 依据meta，创建module
  Object.keys(meta).forEach((prop: string) => {
    const formItemMeta: any = meta[prop];
    const { type } = formItemMeta;
    const attr = formItemMeta.attr || {};
    // 根据控件类型设置属性值
    switch (type) {
      case 'input':
      case 'textarea':
        formData[prop] = '';
        break;
      case 'date-picker': // 日期
      case 'time-picker': // 日期时间
        formData[prop] = null;
        break
      case 'select': // 下拉, 单项,多选
      case 'cascader': // 级联
        formData[prop] = attr.multiple ? [] : null;
        break;
      case 'radio': // 勾选
      case 'radio-group': // 勾选
        formData[prop] = '';
        break;
      case 'checkbox':
      case 'switch': // 开关
        formData[prop] = false;
        break;
      case 'checkbox-group': // 多选组
        formData[prop] = [];
        break;
    }
    // 判断是否存在默认值
    if (typeof formItemMeta.defaultValue !== 'undefined') {
      formData[prop] = formItemMeta.defaultValue;
    }
  });
  return formData;
};

/**
 * @description 获取表单回显数据
 * @param { Array } model 表单的初始值
 * @param { Object } responseData 表单的默认值,后端返回的表单数据
 */
export function createFormData(model: any,  responseData: any) {
  // 遍历覆盖属性值
  Object.keys(model).forEach((key) => {
    if (responseData.hasOwnProperty(key)) {
      model[key] = responseData[key];
    }
  });
  return model;
}
