const {
  PURPLE_WHITE_STARS,
  methods,
} = require('../index');

describe('A test suite for: purple_white/purple_white', () => {
  it('exports PURPLE_WHITE_STARS', () => {
    expect(PURPLE_WHITE_STARS).toBeDefined();
  });

  it('does not fabricate unresolved historical results', () => {
    expect(() =>
      methods.classical.calculate_classical_annual(
        new Date(Date.UTC(2026, 0, 1))
      )
    ).toThrow('Historical rule is unresolved');
  });
});
