/**
 * Utilities for working with finite,
 * repeating sequences. A cycle keeps
 * its own immutable snapshot of
 * the supplied values and exposes
 * both index-based and value-based
 * operations. Indexes wrap in both
 * directions, so an index before
 * the first item continues from the end.
 *
 * @module lib/cycle
 * @example
 * const weekdays = create_cycle(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
 * weekdays.get(5); // 'Mon'
 * weekdays.shift('Mon', -1); // 'Fri'
 */

/**
 * Returns the value at an index,
 * wrapping around the cycle
 * as needed. One of the methods
 * given in 'Cycle'.
 *
 * @callback CycleGet
 * @template T
 * @param {number} index - The index to look up.
 * @returns {T|undefined} The value at the wrapped index.
 */

/**
 * Finds the index of a value
 * in a cycle. One of the methods
 * given in 'Cycle'.
 *
 * @callback CycleIndexOf
 * @template T
 * @param {T} value - The value to find.
 * @returns {number} The value's index, or `-1` when it is absent.
 */

/**
 * Tests whether a value belongs
 * to a cycle. One of the methods
 * given in 'Cycle'.
 *
 * @callback CycleIs
 * @template T
 * @param {T} value - The value to test.
 * @returns {boolean} Whether the value is present.
 */

/**
 * Returns a value at an offset
 * from another value in a cycle.
 * One of the methods given
 * in 'Cycle'.
 *
 * @callback CycleShift
 * @template T
 * @param {T} value - The value from which to start.
 * @param {number} offset - The relative index offset.
 * @throws {TypeError} If the starting value is not in the cycle.
 * @returns {T|undefined} The value at the wrapped offset.
 */

/**
 * The public interface of a cyclic
 * sequence. The `values` property is
 * frozen, while `get_all()` returns
 * a fresh array so callers cannot
 * mutate the cycle through either
 * representation.
 *
 * @typedef Cycle
 * @template T
 * @property {ReadonlyArray<T>} values - The immutable snapshot of the values.
 * @property {CycleGetAll.<T>} get_all - Returns a mutable copy of all values.
 * @property {CycleGet.<T>} get - Returns the value at a wrapped index.
 * @property {CycleIndexOf.<T>} index_of - Returns the value's index, or `-1` if absent.
 * @property {CycleIs.<T>} is - Tests whether the value is in the cycle.
 * @property {CycleShift.<T>} shift - Returns a value at an offset from another value.
 */

/**
 * Returns a copy of every value in a cycle.
 * @callback CycleGetAll
 * @template T
 * @returns {Array<T>} A mutable copy of the cycle's values.
 */

/**
 * Converts an arbitrary index into
 * a valid zero-based cycle index.
 * Non-finite indexes are treated
 * as zero. Fractional indexes are
 * truncated, and invalid or empty
 * sizes return zero because there
 * is no valid position to select.
 * The double-modulo expression keeps
 * the result non-negative even
 * when the input index is negative.
 *
 * @param {number} index - The index to normalize.
 * @param {number} size - The number of values in the cycle.
 * @returns {number} An integer in the range `[0, size)`, or `0` for an invalid size.
 */
export const normalize_cycle_index = (index, size) => {
  // An empty cycle has no valid index;
  // zero is the safest sentinel for
  // callers that use the result to
  // index into an array.
  if (!Number.isFinite(size) || size <= 0) {
    return 0;
  }

  // Truncation makes fractional
  // indexes behave like normal
  // array positions; non-finite
  // input is deliberately mapped
  // to the first position.
  const n = Number.isFinite(index) ? Math.trunc(index) : 0;

  // JS's remainder can be negative.
  // Adding `size` before the second
  // remainder turns both positive
  // and negative indexes into
  // `[0, size)`.
  return ((n % size) + size) % size;
};

/**
 * Creates an immutable cyclic sequence
 * from an iterable of values. Values are
 * copied immediately, so subsequent changes
 * to the input iterable do not affect
 * the cycle. A `Map` provides
 * constant-time membership and
 * value-to-index lookups. If duplicate
 * values are supplied, the last occurrence
 * is the index used by `index_of()`
 * and `shift()`.
 *
 * @function create_cycle
 * @template T
 * @param {Iterable<T>} values - Values in their repeating order.
 * @returns {Cycle.<T>} An immutable cycle interface.
 */
export const create_cycle = values => {
  // Copy and freeze the source
  // so the cycle remains stable
  // even if the caller later mutates
  // the original array (or provides
  // a one-shot iterable).
  const list = Object.freeze([...values]);

  // Map each value to its position
  // for fast lookups.
  // Map#set semantics mean a duplicate
  // value replaces the earlier position
  // with the last one.
  const index_map = new Map(
    list.map((value, index) => [value, index])
  );

  // Freeze the API object as well.
  // The methods close over
  // the private `list` and `index_map`,
  // so consumers can use the cycle
  // without mutating either.
  return Object.freeze({
    values: list,

    /**
     * Returns a copy of every value
     * in the cycle. Returning its copy
     * rather than exposing the frozen
     * array directly. This keeps the
     * result convenient to manipulate
     * without changing the cycle itself.
     *
     * @function
     * @method module:lib/cycle~Cycle#get_all
     * @returns {Array<T>} A mutable copy of the cycle's values.
     */
    get_all: () => [...list],

    /**
     * Returns the value at an index,
     * wrapping around the cycle as needed.
     * Normalizing before indexing so
     * any integer—positive or negative—
     * can be used repeatedly around the cycle.
     *
     * @function
     * @method module:lib/cycle~Cycle#get
     * @param {number} index - The index to look up.
     * @returns {T|undefined} The value at the wrapped index.
     */
    get: index =>
      list[normalize_cycle_index(index, list.length)],

    /**
     * Finds the index of a value in the cycle.
     * Map#get alone cannot distinguish
     * an absent key from an index of
     * `undefined`, so check membership
     * before returning the stored index.
     *
     * @function
     * @method module:lib/cycle~Cycle#index_of
     * @param {T} value - The value to find.
     * @returns {number} The value's index, or `-1` when it is absent.
     */
    index_of: value =>
      index_map.has(value) ? index_map.get(value) : -1,

    /**
     * Tests whether a value belongs
     * to the cycle. Map.has uses the same
     * value equality semantics as
     * the lookup methods.
     *
     * @function
     * @method module:lib/cycle~Cycle#is
     * @param {T} value - The value to test.
     * @returns {boolean} Whether the value is present.
     */
    is: value => index_map.has(value),

    /**
     * Returns a value at an offset from
     * another value in the cycle. Resolves
     * the starting value first, then apply
     * the same wrapping rules as `get()`
     * to its relative position.
     *
     * @function
     * @method module:lib/cycle~Cycle#shift
     * @param {T} value - The value from which to start.
     * @param {number} offset - The relative index offset.
     * @throws {TypeError} If the starting value is not in the cycle.
     * @returns {T|undefined} The value at the wrapped offset.
     */
    shift: (value, offset) => {
      const index = index_map.get(value);

      // Throwing here prevents an unknown
      // value from being coerced into
      // an accidental index and makes
      // invalid cycle operations explicit.
      if (typeof index !== 'number')
        throw new TypeError('Invalid cycle value.');

      const index2 = normalize_cycle_index(
        index + offset,
        list.length
      );

      return list[index2];
    },
  });
};
