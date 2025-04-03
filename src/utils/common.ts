export function debounce(func: Function, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
export function throttle(func: Function, limit: number) {
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan: number | null = null;
  return (...args: any[]) => {
    const now = Date.now();
    if (!lastRan || now - lastRan >= limit) {
      func(...args);
      lastRan = now;
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        func(...args);
        lastRan = Date.now();
      }, limit - (now - lastRan));
    }
  };
}
export function debounceAsync(func: (...args: any[]) => Promise<any>, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    return new Promise((resolve, reject) => {
      timer = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
export function throttleAsync(func: (...args: any[]) => Promise<any>, limit: number) {
  let lastRan: number | null = null;
  let lastFunc: Promise<any> | null = null;
  let isRunning = false;

  return (...args: any[]) => {
    const now = Date.now();

    if (!lastRan || now - lastRan >= limit) {
      lastRan = now;
      isRunning = true;
      return func(...args).finally(() => {
        isRunning = false;
      });
    }

    if (!isRunning) {
      lastFunc = new Promise((resolve, reject) => {
        setTimeout(() => {
          lastRan = Date.now();
          isRunning = true;
          func(...args)
            .then(resolve)
            .catch(reject)
            .finally(() => {
              isRunning = false;
            });
        }, limit - (now - lastRan!));
      });
    }

    return lastFunc;
  };
}
