import { build_method_result } from '../_shared';

/**
 * Returns the documented six-period daily structure.
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_daily_period = date => ({
  date,
  periods: [
    ['winter_solstice', 'yang', 'upper', 1],
    ['rain_water', 'yang', 'middle', 7],
    ['grain_rain', 'yang', 'lower', 4],
    ['summer_solstice', 'yin', 'upper', 9],
    ['limit_of_heat', 'yin', 'middle', 3],
    ['frost_descent', 'yin', 'lower', 6],
  ],
});

/**
 * Calculates daily Houkan Purple-White.
 * @param {*} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_houkan_daily = date => {
  determine_houkan_daily_period(date);
  return build_method_result(
    'houkan_daily',
    'daily_jia_zi'
  );
};
