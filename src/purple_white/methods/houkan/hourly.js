import { get_purple_white_star_number } from '../../star';
import {
  determine_houkan_dun,
  determine_houkan_hourly_origin,
  determine_houkan_hourly_san_yuan,
  get_houkan_day_sexagen,
  get_houkan_hour_branch,
  get_houkan_hourly_starting_star,
  create_houkan_result,
} from './_shared';

/**
 * Calculates hourly Houkan Purple-White.
 * @param {*} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_houkan_hourly = date => {
  const dun = determine_houkan_dun(date);
  const branch = get_houkan_hour_branch(date);
  const san_yuan = determine_houkan_hourly_san_yuan(branch);
  const day = get_houkan_day_sexagen(date);
  const origin = determine_houkan_hourly_origin(date);
  const initial = get_houkan_hourly_starting_star(
    dun.dun,
    san_yuan
  );
  const initial_number =
    get_purple_white_star_number(initial);
  const direction = dun.dun === 'yang' ? 1 : -1;
  const star_number =
    ((((initial_number -
      1 +
      direction * origin.elapsed_hours) %
      9) +
      9) %
      9) +
    1;
  return {
    ...create_houkan_result(star_number, dun.dun),
    solar_term: dun.solar_term,
    solar_term_boundary: dun.date,
    day_sexagen: day.sexagen,
    hour_branch: branch,
    san_yuan,
    origin_start: origin.start,
    origin_elapsed_hours: origin.elapsed_hours,
  };
};

export {
  determine_houkan_dun,
  determine_houkan_hourly_origin,
  determine_houkan_hourly_san_yuan,
  get_houkan_day_sexagen,
  get_houkan_hour_branch,
  get_houkan_hourly_starting_star,
} from './_shared';
