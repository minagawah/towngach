const sowngwala = require('sowngwala-js');

const {
  get_sun_ecliptic_longitude,
  get_solar_term_target_longitude,
  search_longitude_boundary,
} = require('../index');
const {
  to_sowngwala_datetime,
} = require('../sowngwala_adapter');

describe('A test suite for: astronomy', () => {
  it('imports sowngwala-js', () => {
    expect(sowngwala.chrono).toBeDefined();
    expect(sowngwala.sun).toBeDefined();
  });

  it('converts Towngach dates', () => {
    const dt = to_sowngwala_datetime({
      year: 2026,
      month: 2,
      day: 4,
      hour: 5,
      minute: 6,
      second: 7,
      millisecond: 8,
    });

    expect(dt.year()).toBe(2026);
    expect(dt.month()).toBe(2);
    expect(dt.day()).toBe(4);
    expect(dt.hour()).toBe(5);
    expect(dt.minute()).toBe(6);
    expect(dt.second()).toBe(7);
    expect(dt.nanosecond()).toBe(8_000_000);
  });

  it('returns a finite sun longitude', () => {
    const date = new Date(Date.UTC(2026, 5, 10, 0, 0, 0));
    const longitude = get_sun_ecliptic_longitude(date);

    expect(Number.isFinite(longitude)).toBe(true);
    expect(get_sun_ecliptic_longitude(date)).toBeCloseTo(
      longitude,
      12,
    );
  });

  it('searches a longitude boundary', () => {
    const boundary = search_longitude_boundary(
      new Date(Date.UTC(2026, 0, 20, 0, 0, 0)),
      new Date(Date.UTC(2026, 1, 20, 0, 0, 0)),
      get_solar_term_target_longitude(0),
    );

    const before = new Date(boundary.timestamp - 60_000);
    const after = new Date(boundary.timestamp + 60_000);

    expect(get_sun_ecliptic_longitude(before)).toBeLessThan(315);
    expect(get_sun_ecliptic_longitude(after)).toBeGreaterThanOrEqual(
      315,
    );
  });
});
