// ! 指对一个值求反，!! 表示对反求反，也就是value的布尔值
export const isFalse = (value) => value === 0 ? false : !value
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalse(value)) {
      delete result[key];
    }
  });
  return result;
};
