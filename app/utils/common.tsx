export const withDelay = (callback: () => void, ms: number = 300) => {
  return () => {
    setTimeout(callback, ms);
  };
};
