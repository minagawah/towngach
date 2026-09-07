import { create_cycle } from '../lib/cycle';

/**
 * One of the Purple-White stars
 * (紫白星 / cửu tinh).
 *
 * @typedef {string} PurpleWhiteStar
 */

/**
 * A Purple-White star definition.
 *
 * @typedef {Object} PurpleWhiteStarDefinition
 */

/**
 * The nine Purple-White stars.
 *
 * @constant {Array.<PurpleWhiteStar>}
 */
export const PURPLE_WHITE_STARS = Object.freeze([
  'one_white',
  'two_black',
  'three_jade',
  'four_green',
  'five_yellow',
  'six_white',
  'seven_red',
  'eight_white',
  'nine_purple',
]);

/**
 * Stable star metadata.
 *
 * @constant {Array.<PurpleWhiteStarDefinition>}
 */
export const PURPLE_WHITE_STAR_DEFINITIONS = Object.freeze([
  {
    star: 'one_white',
    number: 1,
    element: 'water',
    color: 'white',
  },
  {
    star: 'two_black',
    number: 2,
    element: 'earth',
    color: 'black',
  },
  {
    star: 'three_jade',
    number: 3,
    element: 'wood',
    color: 'jade',
  },
  {
    star: 'four_green',
    number: 4,
    element: 'wood',
    color: 'green',
  },
  {
    star: 'five_yellow',
    number: 5,
    element: 'earth',
    color: 'yellow',
  },
  {
    star: 'six_white',
    number: 6,
    element: 'metal',
    color: 'white',
  },
  {
    star: 'seven_red',
    number: 7,
    element: 'metal',
    color: 'red',
  },
  {
    star: 'eight_white',
    number: 8,
    element: 'earth',
    color: 'white',
  },
  {
    star: 'nine_purple',
    number: 9,
    element: 'fire',
    color: 'purple',
  },
]);

const star_cycle = create_cycle(PURPLE_WHITE_STARS);

/**
 * The first Purple-White star.
 *
 * @constant {PurpleWhiteStar}
 */
export const STAR = PURPLE_WHITE_STARS[0];

/**
 * Returns all Purple-White stars.
 *
 * @typedef {function} get_purple_white_stars
 * @returns {Array.<PurpleWhiteStar>}
 */
export const get_purple_white_stars = () =>
  star_cycle.get_all();

/**
 * Returns a Purple-White star by number.
 *
 * @typedef {function} get_purple_white_star
 * @param {number} number
 * @returns {PurpleWhiteStar}
 */
export const get_purple_white_star = number =>
  star_cycle.get((Number(number) || 1) - 1);

/**
 * Returns the star number.
 *
 * @typedef {function}
 * @name get_purple_white_star_number
 * @param {PurpleWhiteStar} star
 * @returns {number}
 */
export const get_purple_white_star_number = star => {
  const found = PURPLE_WHITE_STAR_DEFINITIONS.find(
    item => item.star === star
  );

  if (!found) {
    throw new TypeError('Invalid star.');
  }

  return found.number;
};

/**
 * Returns the star definition.
 *
 * @typedef {function}
 * @name get_purple_white_star_definition
 * @param {PurpleWhiteStar} star
 * @returns {PurpleWhiteStarDefinition}
 */
export const get_purple_white_star_definition = star => {
  const found = PURPLE_WHITE_STAR_DEFINITIONS.find(
    item => item.star === star
  );

  if (!found) {
    throw new TypeError('Invalid star.');
  }

  return found;
};

/**
 * Checks whether a value is a star.
 *
 * @typedef {function} is_purple_white_star
 * @param {*} value
 * @returns {boolean}
 */
export const is_purple_white_star = value =>
  star_cycle.is(value);

/**
 * Shifts a star through the cycle.
 *
 * @typedef {function} shift_purple_white_star
 * @param {PurpleWhiteStar} star
 * @param {number} offset
 * @returns {PurpleWhiteStar}
 */
export const shift_purple_white_star = (star, offset) =>
  star_cycle.shift(star, offset);
