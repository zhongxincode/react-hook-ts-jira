import { useEffect, useState } from "react";

export const isFalse = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      console.log(key);
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无线循环， 这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次函数更新，就会触发前一个 useEffect 返回的方法
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  const oldTitle = document.title

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }  
  }, []);
};
