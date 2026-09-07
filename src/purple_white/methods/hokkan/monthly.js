import { build_method_result } from '../_shared';

/**
 * Calculates the monthly Purple-White
 * result for the Hokkan method.
 *
 * @typedef {function} calculate_hokkan_monthly
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_hokkan_monthly = date =>
  build_method_result('hokkan_monthly', date, 12);
