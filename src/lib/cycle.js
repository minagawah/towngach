export const normalize_cycle_index = (index, size) => {
  if (!Number.isFinite(size) || size <= 0) {
    return 0;
  }

  const n = Number.isFinite(index) ? Math.trunc(index) : 0;

  return ((n % size) + size) % size;
};

export const create_cycle = values => {
  const list = Object.freeze([...values]);
  const index_map = new Map(
    list.map((value, index) => [value, index])
  );

  return Object.freeze({
    values: list,
    get_all: () => [...list],
    get: index =>
      list[normalize_cycle_index(index, list.length)],
    index_of: value =>
      index_map.has(value) ? index_map.get(value) : -1,
    is: value => index_map.has(value),
    shift: (value, offset) => {
      const index = index_map.get(value);

      if (typeof index !== 'number') {
        throw new TypeError('Invalid cycle value.');
      }

      return list[
        normalize_cycle_index(index + offset, list.length)
      ];
    },
  });
};
