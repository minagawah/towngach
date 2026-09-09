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

  it('does not guess the daily Jia Zi reference point', () => {
    expect(() =>
      methods.houkan.calculate_houkan_daily(
        new Date(Date.UTC(2026, 0, 1))
      )
    ).toThrow('Historical rule is unresolved');
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
});
