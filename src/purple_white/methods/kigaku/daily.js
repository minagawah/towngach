/**
 * @module purple_white/methods/kigaku/daily
 */
import { build_method_result } from '../../core/utils/method';

/**
 * Calculates daily Purple-White for modern Kigaku.
 *
 * @function calculate_kigaku_daily
 * @param {*} date Date-like value.
 * @returns {PurpleWhiteResult}
 * @throws {Error} Historical rule is unresolved.
 */
export const calculate_kigaku_daily = date => {
  void date;
  return build_method_result('kigaku_daily', 'daily');
};
