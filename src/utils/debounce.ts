
export const debounce = (fun: any, delay: number = 500) => (args?: any) => {
  const _args = args;
  clearTimeout(fun.id);
  fun.id = setTimeout(() => {
    fun.call(this, _args);
  }, delay);
};
