export const withDelay = (callback: (arg: any) => void, ms: number = 300) => {
  return () => {
    setTimeout(callback, ms);
  };
};
