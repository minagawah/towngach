/**
 * @module purple_white/methods/houkan/daily
 */

import { normalize_calendar_date } from '../../../calendar';
import {
  create_houkan_result,
  determine_houkan_daily_period,
  get_houkan_day_sexagen,
  get_houkan_daily_leap_period,
} from './_shared';

/**
 * Calculates daily Purple-White
 * (日家紫白) for Houkan (方鑑).
 *
 * The implementation is event-driven:
 * ordinary operation starts from the 甲子 following each
 * of the six historical seasonal anchors; an applicable
 * 閏九星 interval overrides the ordinary state.
 *
 * @param {*} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_houkan_daily = date => {
  const normalized = normalize_calendar_date(date);
  const leap = get_houkan_daily_leap_period(normalized);
  const period = determine_houkan_daily_period(normalized);
  const day = get_houkan_day_sexagen(normalized);

  const state = leap ?? period;
  const elapsed_days = Math.floor(
    (day.traditional_day.getTime() -
      state.start.getTime()) /
      (24 * 60 * 60 * 1000)
  );

  const star_number =
    ((((state.starting_star -
      1 +
      state.direction * elapsed_days) %
      9) +
      9) %
      9) +
    1;

  const result = create_houkan_result(
    star_number,
    state.direction === 1 ? 'yang' : 'yin'
  );

  return {
    ...result,
    solar_term: period.solar_term,
    solar_term_boundary: period.boundary,
    day_sexagen: day.sexagen,
    daily_period: period,
    leap_period: leap,
    elapsed_days,
  };
};

export {
  determine_houkan_daily_period,
  get_houkan_daily_leap_period,
} from './_shared';
