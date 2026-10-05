/**
 * @module purple_white/methods/houkan/monthly
 */

import {
  create_houkan_result,
  get_houkan_month_sexagen,
  get_houkan_monthly_star_number,
} from './_shared';

/**
 * Exposes the historical **"Jia-Zi Month"** (甲子月) based monthly
 * circulation used by **"Houkan"** (方鑑).
 *
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_monthly = date =>
  get_houkan_month_sexagen(date);

/**
 * Calculates monthly **"Purple-White"** (月家紫白) for **"Houkan"** (方鑑).
 *
 * The historical example begins **"Jia-Zi Month"** at **"One-White"**
 * and proceeds in reverse star order: **"Yi-Chou"** is **"Nine-Purple"**,
 * etc.
 *
 * @param {*} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_houkan_monthly = date => {
  const month = get_houkan_month_sexagen(date);
  const star_number = get_houkan_monthly_star_number(date);
  const result = create_houkan_result(star_number, 'yin');

  return {
    ...result,
    month_sexagen: month.sexagen,
    month_index: month.index,
    solar_term: month.solar_term,
    solar_term_boundary: month.solar_term_boundary,
  };
};

export {
  get_houkan_month_sexagen,
  get_houkan_monthly_star_number,
} from './_shared';
