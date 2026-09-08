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
    expect(get_branch_definition('zi')).toEqual({
      branch: 'zi',
      index: 0,
      polarity: 'yang',
    });
  });
});
