const {
  SOLAR_TERMS,
  get_solar_term_for_date,
  get_solar_term_start,
  is_after_solar_term,
} = require('../index');

describe('A test suite for: solar_term/solar_term', () => {
  it('exports SOLAR_TERMS', () => {
    expect(SOLAR_TERMS).toBeDefined();
  });

  it('classifies a date by solar term', () => {
    const occurrence = get_solar_term_for_date(
      new Date(Date.UTC(2026, 5, 10, 0, 0, 0)),
    );

    expect(occurrence.solar_term).toBe('mangzhong');
  });

  it('finds a solar term start', () => {
    const occurrence = get_solar_term_start('lichun', 2026);

    expect(occurrence.solar_term).toBe('lichun');
    expect(occurrence.date.year).toBe(2026);
    expect(occurrence.date.month).toBe(2);
  });

  it('checks whether a date is after a term', () => {
    expect(
      is_after_solar_term(
        new Date(Date.UTC(2026, 4, 12, 0, 0, 0)),
        'lixia',
      ),
    ).toBe(true);

    expect(
      is_after_solar_term(
        new Date(Date.UTC(2026, 4, 1, 0, 0, 0)),
        'lixia',
      ),
    ).toBe(false);
  });
});
