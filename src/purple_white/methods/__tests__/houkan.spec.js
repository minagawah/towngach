const { methods } = require('../../index');

describe('Purple-White Houkan methods', () => {
  it('exports houkan as the canonical method family', () => {
    expect(methods.houkan).toBeDefined();
    expect(methods.hokkan).toBeUndefined();
    expect(
      methods.houkan.calculate_houkan_hourly
    ).toBeDefined();
  });

  it('preserves the confirmed hourly Three Yuan groups', () => {
    const { determine_houkan_hourly_san_yuan } =
      methods.houkan;

    expect(determine_houkan_hourly_san_yuan('zi')).toBe(
      'upper'
    );
    expect(determine_houkan_hourly_san_yuan('shen')).toBe(
      'middle'
    );
    expect(determine_houkan_hourly_san_yuan('wei')).toBe(
      'lower'
    );
  });

  it('preserves the confirmed hourly starting stars', () => {
    const { get_houkan_hourly_starting_star } =
      methods.houkan;

    expect(
      get_houkan_hourly_starting_star('yang', 'upper')
    ).toBe('one_white');
    expect(
      get_houkan_hourly_starting_star('yang', 'middle')
    ).toBe('seven_red');
    expect(
      get_houkan_hourly_starting_star('yang', 'lower')
    ).toBe('four_green');
    expect(
      get_houkan_hourly_starting_star('yin', 'upper')
    ).toBe('nine_purple');
    expect(
      get_houkan_hourly_starting_star('yin', 'middle')
    ).toBe('three_jade');
    expect(
      get_houkan_hourly_starting_star('yin', 'lower')
    ).toBe('six_white');
  });

  it('provides localized Houkan terminology', () => {
    const {
      get_terminology,
    } = require('../../../terminology');
    const term = get_terminology('three_yuan');

    expect(term.en.primary).toBe('Three Yuan');
    expect(term.zh_tw.primary).toBe('三元');
  });

  it('calculates the ordinary daily state from a 甲子 anchor', () => {
    const result = methods.houkan.calculate_houkan_daily(
      new Date(Date.UTC(2026, 0, 1))
    );

    expect(result.star).toBeDefined();
    expect(result.palace).toBe('center');
    expect(result.daily_period.start_sexagen).toBe(
      'jia_zi'
    );
    expect(result.leap_period).toBeNull();
    expect(result.elapsed_days).toBeGreaterThanOrEqual(0);
  });

  it('exposes the historical later-甲子 leap recipe', () => {
    const { get_houkan_daily_leap_period } = methods.houkan;

    expect(get_houkan_daily_leap_period).toBeDefined();
  });

  it('calculates an hourly result through shared flight logic', () => {
    const result = methods.houkan.calculate_houkan_hourly(
      new Date(Date.UTC(2026, 5, 10, 12))
    );

    expect(result.star).toBeDefined();
    expect(result.palace).toBe('center');
    expect(result.flight.by_palace).toBeDefined();
    expect(
      result.origin_elapsed_hours
    ).toBeGreaterThanOrEqual(0);
  });

  it('implements the documented annual Three-Yuan anchors', () => {
    const { get_houkan_annual_star_number } =
      methods.houkan;

    expect(get_houkan_annual_star_number(1684)).toBe(1);
    expect(get_houkan_annual_star_number(1744)).toBe(4);
    expect(get_houkan_annual_star_number(1804)).toBe(7);
    expect(get_houkan_annual_star_number(1685)).toBe(9);
  });

  it('implements the documented Jia-Zi monthly circulation', () => {
    const {
      get_houkan_month_sexagen,
      get_houkan_monthly_star_number,
    } = methods.houkan;

    const jia_zi_month = get_houkan_month_sexagen(
      new Date(Date.UTC(1983, 10, 15))
    );
    const yi_chou_month = get_houkan_month_sexagen(
      new Date(Date.UTC(1983, 11, 15))
    );
    const bing_yin_month = get_houkan_month_sexagen(
      new Date(Date.UTC(1984, 0, 15))
    );

    expect(jia_zi_month.sexagen).toBe('jia_zi');
    expect(yi_chou_month.sexagen).toBe('yi_chou');
    expect(bing_yin_month.sexagen).toBe('bing_yin');

    expect(
      get_houkan_monthly_star_number(
        new Date(Date.UTC(1683, 10, 15))
      )
    ).toBe(1);
    expect(
      get_houkan_monthly_star_number(
        new Date(Date.UTC(1683, 11, 15))
      )
    ).toBe(9);
    expect(
      get_houkan_monthly_star_number(
        new Date(Date.UTC(1684, 0, 15))
      )
    ).toBe(8);
  });
});
