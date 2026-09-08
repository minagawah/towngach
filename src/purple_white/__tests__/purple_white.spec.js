const {
  PURPLE_WHITE_STARS,
  get_purple_white_star_definition,
  methods,
} = require('../index');

describe('A test suite for: purple_white/purple_white', () => {
  it('exports PURPLE_WHITE_STARS', () => {
    expect(PURPLE_WHITE_STARS).toBeDefined();
  });

  it('localizes Purple-White star definitions', () => {
    const definition = get_purple_white_star_definition(
      'one_white'
    );

    expect(definition.name.en.primary).toBe('one white');
    expect(definition.name.vi.primary).toBe('nhất bạch');
    expect(definition.name.zh_ch.primary).toBe('一白');
    expect(definition.name.zh_tw.primary).toBe('一白');
    expect(definition.name.ja.kanji).toBe('一白');
  });

  it('does not fabricate unresolved historical results', () => {
    expect(() =>
      methods.classical.calculate_classical_annual(
        new Date(Date.UTC(2026, 0, 1))
      )
    ).toThrow('Historical rule is unresolved');
  });
});
