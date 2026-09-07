import { build_method_result } from '../_shared';

/**
 * Calculates the hourly Purple-White
 * result for the Hokkan method.
 *
 * @typedef {function} calculate_hokkan_hourly
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_hokkan_hourly = date =>
  build_method_result('hokkan_hourly', date, 14);
