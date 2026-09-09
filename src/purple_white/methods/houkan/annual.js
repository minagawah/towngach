import { build_method_result } from '../_shared';

/**
 * Calculates annual Purple-White
 * (年家紫白) for Houkan (方鑑).
 *
 * @param {*} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_houkan_annual = date => {
  void date;
  return build_method_result('houkan_annual', 'annual');
};
