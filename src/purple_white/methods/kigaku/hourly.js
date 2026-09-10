/**
 * @module purple_white/methods/kigaku/hourly
 */
import { build_method_result } from '../../core/utils/method';

/**
 * Calculates hourly Purple-White for modern Kigaku.
 *
 * @function calculate_kigaku_hourly
 * @param {*} date Date-like value.
 * @returns {PurpleWhiteResult}
 * @throws {Error} Historical rule is unresolved.
 */
export const calculate_kigaku_hourly = date => {
  void date;
  return build_method_result('kigaku_hourly', 'hourly');
};
