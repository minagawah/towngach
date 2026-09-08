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
    expect(get_stem_definition('jia')).toEqual({
      stem: 'jia',
      index: 0,
      polarity: 'yang',
      element: 'wood',
    });
  });
});
