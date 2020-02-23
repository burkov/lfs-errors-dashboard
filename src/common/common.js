import { useEffect } from 'react';

export const awaitWindowLoad = (selectorFunc, onReady) => {
  const timer = setInterval(
    () => {
      const result = selectorFunc();
      if (result) {
        clearInterval(timer);
        onReady(result);
      }
    },
    100);
};

export const useAsyncEffect = (func, deps) => {
  useEffect(() => {
    const doAsync = async () => {
      await func()
    };
    doAsync();
  }, deps);
};