export const jsonCopy = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export const jsonEqual = <T>(aa: T, bb: T): boolean => aa === bb || JSON.stringify(aa) === JSON.stringify(bb);

export const jsonDiff = <T>(oldObj: T, newObj: T): Record<string, {oldValue: unknown; newValue: unknown}> => {
  if (oldObj === newObj) {
    return {};
  }

  const differences: Record<string, {oldValue: unknown; newValue: unknown}> = {};

  // Get all keys from both objects
  const allKeys = new Set([...Object.keys((oldObj as object) || {}), ...Object.keys((newObj as object) || {})]);

  allKeys.forEach((key) => {
    const oldValue = (oldObj as any)?.[key];
    const newValue = (newObj as any)?.[key];

    if (typeof oldValue === 'object' && notNullUndefined(oldValue)) {
      const diff = jsonDiff(oldValue, newValue);
      if (Object.keys(diff).length) {
        differences[key] = {oldValue, newValue: diff};
      }
    } else if (!jsonEqual(oldValue, newValue)) {
      differences[key] = {oldValue, newValue};
    }
  });

  return differences;
};

export const notNullUndefined = <T>(val: T | null | undefined): val is T => null !== val && val !== undefined;

export const isNullUndefined = <T>(val: T | null | undefined): val is null | undefined => !notNullUndefined(val);
