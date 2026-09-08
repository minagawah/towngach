const {
  BRANCH,
  BRANCH_DEFINITIONS,
  get_branch_definition,
} = require('../index');

describe('A test suite for: branch/branch', () => {
  it('exports BRANCH', () => {
    expect(BRANCH).toBeDefined();
  });

  it('exposes stable branch metadata', () => {
    expect(BRANCH_DEFINITIONS).toHaveLength(12);
    const definition = get_branch_definition('zi');

    expect(definition.branch).toBe('zi');
    expect(definition.polarity).toBe('yang');
    expect(definition.name.en.primary).toBe('zi');
    expect(definition.name.vi.primary).toBe('tý');
    expect(definition.name.zh_ch.primary).toBe('子');
    expect(definition.name.zh_tw.primary).toBe('子');
    expect(definition.name.ja.kanji).toBe('子');
  });
});
