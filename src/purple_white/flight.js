import {
  get_purple_white_stars,
  is_purple_white_star,
} from './star';
import { get_palaces, is_palace } from '../palace';

/**
 * The direction of Purple-White flight
 * (順飛 / thuận phi, 逆飛 / nghịch phi).
 *
 * @typedef {string} FlightDirection
 */

/**
 * A Purple-White flight map.
 *
 * @typedef {Object} PurpleWhiteFlight
 */

/**
 * The supported flight directions.
 *
 * @constant {Array.<FlightDirection>}
 */
export const FLIGHT_DIRECTIONS = Object.freeze([
  'forward',
  'reverse',
]);

/**
 * Checks whether a value is a flight
 * direction.
 *
 * @typedef {function} is_flight_direction
 * @param {*} value
 * @returns {boolean}
 */
export const is_flight_direction = value =>
  FLIGHT_DIRECTIONS.includes(value);

/**
 * Returns the opposite flight direction.
 *
 * @typedef {function} reverse_flight_direction
 * @param {FlightDirection} direction
 * @returns {FlightDirection}
 */
export const reverse_flight_direction = direction => {
  if (direction === 'forward') return 'reverse';
  if (direction === 'reverse') return 'forward';
  throw new TypeError('Invalid flight direction.');
};

/**
 * Creates a Nine Palace flight.
 *
 * @typedef {function} create_purple_white_flight
 * @param {PurpleWhiteStar} star
 * @param {Palace} palace
 * @param {FlightDirection} direction
 * @returns {PurpleWhiteFlight}
 */
export const create_purple_white_flight = (
  star,
  palace,
  direction
) => {
  if (!is_purple_white_star(star)) {
    throw new TypeError('Invalid star.');
  }

  if (!is_palace(palace)) {
    throw new TypeError('Invalid palace.');
  }

  if (!is_flight_direction(direction)) {
    throw new TypeError('Invalid flight direction.');
  }

  const stars = get_purple_white_stars();
  const palaces = get_palaces();
  const by_star = {};
  const by_palace = {};
  const start_index = stars.indexOf(star);
  const palace_index = palaces.indexOf(palace);
  const step = direction === 'forward' ? 1 : -1;

  for (let i = 0; i < stars.length; i += 1) {
    const current_star =
      stars[(start_index + i) % stars.length];
    const current_palace =
      palaces[
        (((palace_index + step * i) % palaces.length) +
          palaces.length) %
          palaces.length
      ];

    by_star[current_star] = current_palace;
    by_palace[current_palace] = current_star;
  }

  return {
    star,
    palace,
    direction,
    by_star,
    by_palace,
  };
};

/**
 * Returns the star in a palace.
 *
 * @typedef {function} get_flight_star
 * @param {PurpleWhiteFlight} flight
 * @param {Palace} palace
 * @returns {PurpleWhiteStar}
 */
export const get_flight_star = (flight, palace) => {
  if (!is_palace(palace)) {
    throw new TypeError('Invalid palace.');
  }

  return flight.by_palace[palace];
};

/**
 * Returns the palace for a star.
 *
 * @typedef {function} get_flight_palace
 * @param {PurpleWhiteFlight} flight
 * @param {PurpleWhiteStar} star
 * @returns {Palace}
 */
export const get_flight_palace = (flight, star) => {
  if (!is_purple_white_star(star)) {
    throw new TypeError('Invalid star.');
  }

  return flight.by_star[star];
};

/**
 * Checks whether a value is a flight.
 *
 * @typedef {function} is_purple_white_flight
 * @param {*} value
 * @returns {boolean}
 */
export const is_purple_white_flight = value => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const stars = get_purple_white_stars();
  const palaces = get_palaces();

  return (
    is_flight_direction(value.direction) &&
    stars.every(item => is_palace(value.by_star?.[item])) &&
    palaces.every(item =>
      is_purple_white_star(value.by_palace?.[item])
    )
  );
};

/**
 * Shared flight helpers.
 *
 * @constant {Object}
 */
export const FLIGHT = Object.freeze({
  FLIGHT_DIRECTIONS,
  create_purple_white_flight,
});
