import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

/**
 * 用于判断抛出异常的情况
 */
const defaultConfig = {
  throwOnError: false,
};

/**
 * 
 * @param initialState 
 * @param initialConfig 判断抛出异常用error还是OnError
 * @returns 
 */
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      data: null,
      stat: "error",
      error,
    });

  // run 来触发异步请求
  const run = (promise: Promise<D>) => {
    // 如果没有传入promise或者传入的不是promise类型
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        // catch 会消化异常， 如果不主动抛出，外面是不会接受到异常的
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
