export const createErrorObj = (arr) => {
  const errorObj = {};
  for (let i = 0; i < arr.length; i++) {
    const { key } = arr[i].context;
    errorObj[key] = arr[i].message;
  }
  return errorObj;
};
