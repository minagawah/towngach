/**
 * @module purple_white/core/utils/purple_white
 */

import { PURPLE_WHITE_STARS } from '../nine_stars/star';
import { PALACES } from '../../../palace';
import { FLIGHT_DIRECTIONS } from '../movement/flight';

/**
 * The Purple-White Nine Stars
 * (紫白九星 / cửu tinh tử bạch).
 *
 * @typedef {Object} PurpleWhite
 */

/**
 * A Purple-White calculation result.
 *
 * @typedef {Object} PurpleWhiteResult
 */

/**
 * Shared Purple-White metadata.
 *
 * @constant {PurpleWhite}
 */
export const PURPLE_WHITE = Object.freeze({
  name: 'purple_white',
  stars: PURPLE_WHITE_STARS,
  palaces: PALACES,
  flight_directions: FLIGHT_DIRECTIONS,
});

/**
 * Returns the shared Purple-White data.
 *
 * @typedef {function} get_purple_white
 * @returns {PurpleWhite}
 */
export const get_purple_white = () => PURPLE_WHITE;

/**
 * Checks whether a value is a
 * Purple-White result.
 *
 * @typedef {function} is_purple_white_result
 * @param {*} value
 * @returns {boolean}
 */
export const is_purple_white_result = value =>
  Boolean(
    value &&
    typeof value === 'object' &&
    'star' in value &&
    'palace' in value &&
    'direction' in value
  );

/**
 * Creates a normalized Purple-White
 * result.
 *
 * @typedef {function} create_purple_white_result
 * @param {Object} value
 * @returns {PurpleWhiteResult}
 */
export const create_purple_white_result = value =>
  Object.freeze({
    ...value,
  });
