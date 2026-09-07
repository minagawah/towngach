import { build_method_result } from '../_shared';

/**
 * Calculates the daily Purple-White
 * result for the Hokkan method.
 *
 * @typedef {function} calculate_hokkan_daily
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_hokkan_daily = date =>
  build_method_result('hokkan_daily', date, 13);
