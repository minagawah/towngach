import { build_method_result } from '../_shared';

/**
 * Calculates the annual Purple-White
 * result for the Hokkan method.
 *
 * @typedef {function} calculate_hokkan_annual
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_hokkan_annual = date =>
  build_method_result('hokkan_annual', 'annual');
