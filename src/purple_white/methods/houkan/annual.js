/**
 * @module purple_white/methods/houkan/annual
 */

import {
  create_houkan_result,
  get_houkan_annual_star_number,
  get_houkan_effective_year,
} from './_shared';

/**
 * Calculates annual **"Purple-White"** (年家紫白) for **"Houkan"** (方鑑).
 *
 * The implementation follows the documented three 60-year **"Yuan"**
 * anchors: **"Jia-Zi"** 1684 -> **"One-White"**, **"Jia-Zi"**
 * 1744 -> **"Four-Green"**, and **"Jia-Zi"** 1804 -> **"Seven-Red"**.
 * Within each 60-year **"Yuan"**, the star reverses.
 *
 * @param {*} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_houkan_annual = date => {
  const effective_year = get_houkan_effective_year(date);
  const star_number =
    get_houkan_annual_star_number(effective_year);
  const result = create_houkan_result(star_number, 'yang');

  return {
    ...result,
    effective_year,
  };
};

export {
  get_houkan_annual_star_number,
  get_houkan_effective_year,
} from './_shared';
