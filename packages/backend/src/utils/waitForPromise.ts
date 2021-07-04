/**
 * Return the promise or rejects after a timeout. This could be useful if you wait
 * for events to be finished but you can't use Puppeteer's function with timeout as parameter
 * @param {Promise} promise A generic Promise
 * @param {Number} ms Number of milliseconds after which the timeout Promise will be rejected.
 * @returns {Promise} The first Promise which resolves or rejects.
 */
export async function waitForPromise(promise: Promise<any>, ms: number): Promise<any> {
  // eslint-disable-next-line no-undef
  let timeoutId: NodeJS.Timeout;
  const timeout = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      reject(new Error(`Timed out ${ms} ms`));
    }, ms);
  });

  return Promise.race([promise, timeout]).then((result) => {
    clearTimeout(timeoutId);
    return result;
  });
}
