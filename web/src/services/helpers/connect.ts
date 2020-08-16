/**
 * Creates an object which is bound to the localStorage.
 *
 * @returns An object virtualized by a Proxy
 */
export function connect() {
  const handler = {
    get(_: never, prop: string): unknown {
      try {
        const storage = JSON.parse(localStorage[prop]);
        return storage;
      } catch (syntaxError) {
        return [];
      }
    },

    set(_: never, prop: string, value: any) {
      localStorage[prop] = JSON.stringify(value);
      return true;
    },
  };

  return new Proxy(localStorage, handler);
}
