/**
 * `Result` is a monad representing either
 * a success ('Ok') or a failure ('Err').<br />
 * Inspired by Rust's `Result<T, E>` type.<br />
 * <br />
 * This module also has definitions for `ResultEntity` and `ResultInterface`.<br />
 * However, while they are both defined in the same file, JSDoc generates<br />
 * separate pages for `ResultEntity` and `ResultInterface`.
 * @module lib/Result
 * @see {@link module:lib/Result~ResultInterface|ResultInterface} - Although defined in the same file, JSDoc generates a separate page
 * @example
 * const { Result } = await import('./Result.js');
 * const r1 = Result().ok(42);
 * console.log(r1.unwrap()); // 42
 *
 * const r2 = Result().err(new Error('fail'));
 * console.log(r2.unwrap_or('default')); // "default"
 *
 * // map / flatMap
 * const r3 = Result(2).map(function (x) { return x * 3; }); // Ok(6)
 * const r4 = Result(2).flatMap(function (x) { return Result(x + 5); }); // Ok(7)
 *
 * // match pattern
 * r3.match({
 *   Ok: function (v) { console.log('Ok:', v); },
 *   Err: function (e) { console.error('Err:', e); }
 * });
 * ```
 * There are more fancy methods available:
 * ```
 * try {
 *   result.unwrap_or_throw();
 * } catch(err) {
 *   console.log(err);
 * }
 */

/**
 * __ResultEntity (instance created)__<br />
 * `ResultEntity` is a monad holding `Ok` value or `Err`.<br />
 * To create an instance, run `Result` factory.
 * @typedef ResultEntity
 * @implements {module:lib/Result~ResultInterface}
 * @template T, E
 * @property {function(T):ResultEntity.<T,E>} ok - Marks this Result as Ok.
 * @property {function(E):ResultEntity.<T,E>} err - Marks this Result as Err.
 * @property {function():boolean} is_ok - Returns true if Ok.
 * @property {function():boolean} is_err - Returns true if Err.
 * @property {function():T} unwrap - Returns Ok or throws if Err.
 * @property {function(*):*} unwrap_or - Returns Ok or fallback.
 * @property {function():E} unwrap_err - Returns the Err value.
 * @property {function():void} throw_if_err - Throws if Err.
 * @property {function():T} unwrap_or_throw - Throws if Err, else returns Ok.
 * @property {ResultMapper.<T,U,E>} map - Maps Ok through a function.
 * @property {ResultMapper.<T,U,E>} flatMap - Maps and flattens nested Result.
 * @property {ResultMatcher<T,E>} match - Pattern matches on Ok/Err.
 * @see {@link module:lib/Result~ResultInterface|ResultInterface} - For the interface of "ResultEntity"
 */

/**
 * A mapper function that transforms the `Ok` value.
 * @callback ResultMapper
 * @template T,U,E
 * @param {T} value
 * @returns {ResultEntity.<U, E>}
 */

/**
 * A function for pattern matching on `Result` values.
 * @callback ResultMatcher
 * @template T,E
 * @param {{Ok:function(T):any, Err:function(E):any}} pattern
 * @returns {any}
 */

/**
 * __ResultInterface (interface)__<br />
 * Interface design for `ResultEntity`.
 * @interface ResultInterface
 * @template T, E
 * @see {@link module:lib/Result~ResultEntity|ResultEntity} - Although defined in the same file, generates 2 separate pages.
 */

/**
 * __Result (factory)__<br />
 * A factory function to create `ResultEntity`.<br />
 * @function
 * @name Result
 * @template T, E
 * @param {T} [value] - If given, it will set the value as the `Ok` value.
 * @returns {ResultEntity.<T,E>}
 * @see {@link module:lib/Result~ResultEntity|ResultEntity} - See definitions of the returned "ResultEntity".
 * @see {@link module:lib/Result~ResultInterface|ResultInterface} - For the interface of "ResultEntity".
 */
export const Result = value => {
  /**
   * @type {ResultEntity.<T,E>}
   */
  const self = {};

  /**
   * @type {boolean}
   */
  let _ok = false;

  /**
   * @type {?E}
   */
  let _err = null;

  /**
   * @type {?T}
   */
  let _value = null;

  __init(value);

  /**
   * For the given value, sets it as `Ok` value, and sets the monad `Ok`.
   * @function
   * @method module:lib/Result~ResultInterface#ok
   * @param {T} value
   * @returns {ResultEntity.<T,E>}
   */
  self.ok = value => {
    _ok = true;
    _err = null;
    _value = value;
    if (!value && typeof value === 'undefined')
      throw new Error("You are setting nothing to 'ok()'");
    return Object.freeze(self);
  };

  /**
   * For the given value, sets it as `Err` value, and sets the monad `Err`.
   * @function
   * @method module:lib/Result~ResultInterface#err
   * @param {E} err
   * @returns {ResultEntity.<T,E>}
   */
  self.err = err => {
    _ok = false;
    _err = err;
    _value = null;
    return Object.freeze(self);
  };

  /**
   * Checks if the monad is `Err`.
   * @function
   * @method module:lib/Result~ResultInterface#is_err
   * @returns {boolean}
   */
  self.is_err = () => !_ok;

  /**
   * Checks if the monad is `Ok`.
   * @function
   * @method module:lib/Result~ResultInterface#is_ok
   * @returns {boolean}
   */
  self.is_ok = () => _ok;

  /**
   * Returns the `Ok` value or throws if `Err`.
   * @function
   * @method module:lib/Result~ResultInterface#unwrap
   * @throws {Error}
   * @returns {T}
   */
  self.unwrap = () => {
    if (!_ok) {
      const message =
        typeof _err?.message === 'string'
          ? _err.message
          : '';
      throw new Error(`unwrap() called on Err: ${message}`);
    }
    return _value;
  };

  /**
   * Returns `Ok` or a fallback value.
   * @function
   * @method module:lib/Result~ResultInterface#unwrap_or
   * @template U
   * @param {U} given
   * @returns {T | U}
   */
  self.unwrap_or = given => (!!_ok ? _value : given);

  /**
   * Regardless of whether the monad being `Ok` or `Err`, returns the internally held `Err`.
   * @function
   * @method module:lib/Result~ResultInterface#unwrap_err
   * @returns {E}
   */
  self.unwrap_err = () => _err;

  /**
   * Throws the `Err` if present.
   * @function
   * @method module:lib/Result~ResultInterface#throw_if_err
   * @throws {E}
   */
  self.throw_if_err = () => {
    if (!_ok) throw _err;
  };

  /**
   * Returns `Ok` or throws the `Err`.
   * @function
   * @method module:lib/Result~ResultInterface#unwrap_or_throw
   * @throws {*}
   * @returns {T}
   */
  self.unwrap_or_throw = () => {
    self.throw_if_err();
    return self.unwrap();
  };

  /**
   * Maps the `Ok` value through a function `function(T):U`.
   * @method module:lib/Result~ResultInterface#map
   * @template U
   * @function
   * @param {function(T):U} fn - Mapping function `function(T):U` for transforming `Ok` values.
   * @returns {ResultEntity<U,E>}
   * @see {@link module:lib/Result~ResultMapper|ResultMapper}
   */
  self.map = function (fn) {
    if (_ok) {
      try {
        return Result(fn(_value));
      } catch (err) {
        return Result().err(/** @type {E} */ (err));
      }
    }
    return Result().err(_err);
  };

  /**
   * Maps and flattens nested `Result`s `function(T):ResultEntity<U,E>`.
   * @method module:lib/Result~ResultInterface#flatMap
   * @template U
   * @function
   * @param {function(T):ResultEntity.<U, E>} fn - Mapping function `function(T):ResultEntity<U,E>` returning another `Result`.
   * @returns {ResultEntity<U,E>}
   * @see {@link module:lib/Result~ResultMapper|ResultMapper}
   */
  self.flatMap = function (fn) {
    if (_ok) {
      try {
        const next = fn(_value);
        if (next && typeof next.is_ok === 'function') {
          return next;
        }
        return Result().err(
          /** @type {E} */ (
            new Error('flatMap did not return a Result')
          )
        );
      } catch (err) {
        return Result().err(/** @type {E} */ (err));
      }
    }
    return Result().err(_err);
  };

  /**
   * Pattern matches on `Ok` or `Err` values<br />
   * `function({Ok:function(T):any, Err:function(E):any}):any`.
   * @method module:lib/Result~ResultInterface#match
   * @param {{Ok:function(T):any, Err:function(E):any}} pattern - Pattern matcher `function({Ok:function(T):any, Err:function(E):any}):any`.
   * @see {@link module:lib/Result~ResultMatcher|ResultMatcher}
   * @returns {any}
   */
  self.match = function (pattern) {
    if (_ok) {
      return pattern.Ok(_value);
    }
    return pattern.Err(_err);
  };

  function __init(value) {
    if (typeof value !== 'undefined') {
      self.ok(value);
    }
  }

  return Object.freeze(self);
};
