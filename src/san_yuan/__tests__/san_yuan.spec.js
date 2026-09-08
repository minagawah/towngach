const {
  SAN_YUAN,
  get_san_yuan_definition,
} = require('../index');

describe('A test suite for: san_yuan/san_yuan', () => {
  it('exports SAN_YUAN', () => {
    expect(SAN_YUAN).toBeDefined();
  });

  it('localizes Three Epoch definitions', () => {
    const definition = get_san_yuan_definition('upper');

    expect(definition.name.en.primary).toBe('upper');
    expect(definition.name.vi.primary).toBe(
      'thượng nguyên'
    );
    expect(definition.name.zh_ch.primary).toBe('上元');
    expect(definition.name.zh_tw.primary).toBe('上元');
    expect(definition.name.ja.kanji).toBe('上元');
  });
});
