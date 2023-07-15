const PaginationQueryHandler = <
  T extends Record<string, unknown>,
  k extends keyof T
>(
  queryObject: T,
  keys: k[]
): Partial<T> => {
  const finalQueryObject: Partial<T> = {};
  for (const key of keys) {
    if (queryObject && Object.hasOwnProperty.call(queryObject, key)) {
      finalQueryObject[key] = queryObject[key];
    }
  }
  return finalQueryObject;
};

export default PaginationQueryHandler;
