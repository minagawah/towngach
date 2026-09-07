import { normalize_calendar_date } from '../../calendar';
import { get_san_yuan } from '../../san_yuan';
import { get_sexagen_by_index } from '../../sexagen';
import { create_purple_white_result } from '../purple_white';
import { get_purple_white_stars } from '../star';
import { get_palaces } from '../../palace';

/**
 * Builds a shared Purple-White result.
 *
 * @param {string} method
 * @param {CalendarDate} date
 * @param {number} salt
 * @returns {PurpleWhiteResult}
 */
const get_seed = (date, salt) =>
  Math.abs(
    date.year * 13 +
      date.month * 7 +
      date.day * 5 +
      date.hour * 3 +
      date.minute +
      salt
  );

/**
 * Builds a method result shell.
 *
 * @param {string} method
 * @param {CalendarDate} date
 * @param {number} salt
 * @returns {PurpleWhiteResult}
 */
export const build_method_result = (method, date, salt) => {
  const normalized = normalize_calendar_date(date);
  const stars = get_purple_white_stars();
  const palaces = get_palaces();
  const san_yuan = get_san_yuan();
  const seed = get_seed(normalized, salt);

  return create_purple_white_result({
    method,
    date: normalized,
    star: stars[seed % stars.length],
    palace: palaces[seed % palaces.length],
    direction: seed % 2 === 0 ? 'forward' : 'reverse',
    san_yuan: san_yuan[seed % san_yuan.length],
    sexagen: get_sexagen_by_index(seed % 60),
    index: seed,
  });
};
