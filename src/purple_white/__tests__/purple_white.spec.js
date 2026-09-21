const {
  PURPLE_WHITE_STARS,
  STAR,
  get_purple_white_star_definition,
  methods,
} = require('../index');

describe('A test suite for: purple_white/purple_white', () => {
  describe('PURPLE_WHITE_STARS array', () => {
    it('exports PURPLE_WHITE_STARS', () => {
      expect(PURPLE_WHITE_STARS).toBeDefined();
      expect(PURPLE_WHITE_STARS).toEqual([
        'one_white',
        'two_black',
        'three_jade',
        'four_green',
        'five_yellow',
        'six_white',
        'seven_red',
        'eight_white',
        'nine_purple',
      ]);
    });

    it('exports STAR as first element', () => {
      expect(STAR).toBe('one_white');
    });
  });

  describe('Localization', () => {
    it('localizes Purple-White star definitions', () => {
      const definition =
        get_purple_white_star_definition('one_white');

      expect(definition.name.en.primary).toBe('one white');
      expect(definition.name.vi.primary).toBe('nhất bạch');
      expect(definition.name.zh_ch.primary).toBe('一白');
      expect(definition.name.zh_tw.primary).toBe('一白');
      expect(definition.name.ja.kanji).toBe('一白');
    });
  });

  describe('Methods', () => {
    it('exports identifiable Purple-White methods', () => {
      expect(methods.classical).toBeUndefined();
      expect(methods.houkan).toBeDefined();
      expect(methods.kigaku).toBeDefined();
      expect(methods.mizuno).toBeDefined();
    });
  });
});
