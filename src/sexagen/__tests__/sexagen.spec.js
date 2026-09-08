const {
  SEXAGENARY_CYCLE,
  SEXAGEN_DEFINITIONS,
  get_sexagen_definition,
} = require('../index');

describe('A test suite for: sexagen/sexagen', () => {
  it('exports SEXAGENARY_CYCLE', () => {
    expect(SEXAGENARY_CYCLE).toBeDefined();
  });

  it('exposes the canonical sixty-member definitions', () => {
    expect(SEXAGEN_DEFINITIONS).toHaveLength(60);
    expect(get_sexagen_definition('jia_zi')).toEqual({
      sexagen: 'jia_zi',
      stem: 'jia',
      branch: 'zi',
      index: 0,
    });
  });
});
