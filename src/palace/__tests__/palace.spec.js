const {
  PALACES,
  PALACE,
  get_palace_definition,
} = require('../index');

describe('A test suite for: palace/palace', () => {
  describe('PALACES array', () => {
    it('exports PALACES', () => {
      expect(PALACES).toBeDefined();
      expect(PALACES).toEqual([
        'qian',
        'kun',
        'zhen',
        'xun',
        'kan',
        'li',
        'gen',
        'dui',
        'center',
      ]);
    });

    it('exports PALACE as first element', () => {
      expect(PALACE).toBe('qian');
    });
  });

  describe('Localization', () => {
    it('localizes palace definitions', () => {
      const definition = get_palace_definition('kan');

      expect(definition.name.en.primary).toBe('kan');
      expect(definition.name.vi.primary).toBe('khảm');
      expect(definition.name.zh_ch.primary).toBe('坎');
      expect(definition.name.zh_tw.primary).toBe('坎');
      expect(definition.name.ja.kanji).toBe('坎');
    });
  });
});
