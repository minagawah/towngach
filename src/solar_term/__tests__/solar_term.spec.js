const {
  SOLAR_TERMS,
  SOLAR_TERM,
  get_solar_term_definition,
  get_solar_term_for_date,
  get_solar_term_start,
  is_after_solar_term,
} = require('../index');

describe('A test suite for: solar_term/solar_term', () => {
  describe('SOLAR_TERMS array', () => {
    it('exports SOLAR_TERMS', () => {
      expect(SOLAR_TERMS).toBeDefined();
      expect(SOLAR_TERMS).toHaveLength(24);
    });

    it('exports SOLAR_TERM as first element', () => {
      expect(SOLAR_TERM).toBe('li_chun');
    });
  });

  describe('Localization', () => {
    it('localizes Solar Term identities', () => {
      const definition =
        get_solar_term_definition('li_chun');

      expect(definition.name.en.primary).toBe('li chun');
      expect(definition.name.vi.primary).toBe('lập xuân');
      expect(definition.name.zh_ch.primary).toBe('立春');
      expect(definition.name.zh_tw.primary).toBe('立春');
      expect(definition.name.ja.kanji).toBe('立春');
    });
  });

  describe('Date-based operations', () => {
    it('classifies a date by solar term', () => {
      const occurrence = get_solar_term_for_date(
        new Date(Date.UTC(2026, 5, 10, 0, 0, 0))
      );

      expect(occurrence.solar_term).toBe('mang_zhong');
    });

    it('finds a solar term start', () => {
      const occurrence = get_solar_term_start(
        'li_chun',
        2026
      );

      expect(occurrence.solar_term).toBe('li_chun');
      expect(occurrence.date.year).toBe(2026);
      expect(occurrence.date.month).toBe(2);
    });

    it('checks whether a date is after a term', () => {
      expect(
        is_after_solar_term(
          new Date(Date.UTC(2026, 4, 12, 0, 0, 0)),
          'li_xia'
        )
      ).toBe(true);

      expect(
        is_after_solar_term(
          new Date(Date.UTC(2026, 4, 1, 0, 0, 0)),
          'li_xia'
        )
      ).toBe(false);
    });
  });
});
