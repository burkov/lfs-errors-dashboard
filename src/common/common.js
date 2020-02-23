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