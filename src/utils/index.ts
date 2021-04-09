import { useEffect, useState } from "react"

export const isFalse = (value: any): boolean => value === 0 ? false : !value

export const cleanObject = (object: object) => {
  const result = {...object}
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    if(isFalse(value)) {
      console.log(key);
      // @ts-ignore
      delete result[key];
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value: any, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue;
}