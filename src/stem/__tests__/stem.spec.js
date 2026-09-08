const {
  STEM,
  STEM_DEFINITIONS,
  get_stem_definition,
} = require('../index');

describe('A test suite for: stem/stem', () => {
  it('exports STEM', () => {
    expect(STEM).toBeDefined();
  });

  it('exposes stable stem metadata', () => {
    expect(STEM_DEFINITIONS).toHaveLength(10);
    const definition = get_stem_definition('jia');

    expect(definition.stem).toBe('jia');
    expect(definition.element).toBe('wood');
    expect(definition.name.en.primary).toBe('jia');
    expect(definition.name.vi.primary).toBe('giáp');
    expect(definition.name.zh_ch.primary).toBe('甲');
    expect(definition.name.zh_tw.primary).toBe('甲');
    expect(definition.name.ja.kanji).toBe('甲');
  });
});
