// import { useMemo, useState } from "react";
import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject, subset } from ".";

/**
 * 返回页面url中，指定键的参数值
 */
 export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
    },
  ] as const;
};

/**
 * 清除多余的url参数
 * @returns 
 */
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};

// useUrlQueryParam: (keys: string[]) => {}[]
// as const
// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   return [
//     useMemo(
//       () =>
//         keys.reduce((prev, key) => {
//           return { ...prev, [key]: searchParams.get(key) || "" };
//         }, {} as { [key in K]: string }),
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       [searchParams]
//     ),
//     (params: Partial<{ [key in K]: unknown }>) => {
//       const o = cleanObject({
//         ...Object.fromEntries(searchParams),
//         ...params,
//       }) as URLSearchParamsInit;
//       return setSearchParams(o);
//       // iterator
//       // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
//     },
//   ] as const;
// };
