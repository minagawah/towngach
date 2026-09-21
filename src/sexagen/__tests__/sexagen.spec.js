const {
  SEXAGEN,
  SEXAGEN_DEFINITIONS,
  SEXAGENARY_CYCLE,
  get_sexagen_definition,
  get_sexagen_index,
  is_sexagen,
  get_sexagen_by_index,
  get_sexagen_by_stem_and_branch,
  get_sexagen_stem,
  get_sexagen_branch,
  shift_sexagen,
} = require('../index');

describe('A test suite for: sexagen/sexagen', () => {
  describe('SEXAGEN array', () => {
    it('exports SEXAGENARY_CYCLE as first element', () => {
      expect(SEXAGENARY_CYCLE).toBe('jia_zi');
    });

    it('has 60 sexagenary members', () => {
      expect(SEXAGEN).toHaveLength(60);
    });

    it('first element is jia_zi and last is gui_hai', () => {
      expect(SEXAGEN[0]).toBe('jia_zi');
      expect(SEXAGEN[59]).toBe('gui_hai');
    });
  });

  describe('SEXAGEN_DEFINITIONS', () => {
    it('exposes the canonical sixty-member definitions', () => {
      expect(SEXAGEN_DEFINITIONS).toHaveLength(60);
    });

    it('first definition matches jia_zi', () => {
      const first = SEXAGEN_DEFINITIONS[0];
      expect(first.sexagen).toBe('jia_zi');
      expect(first.stem).toBe('jia');
      expect(first.branch).toBe('zi');
      expect(first.index).toBe(0);
    });

    it('last definition matches gui_hai', () => {
      const last = SEXAGEN_DEFINITIONS[59];
      expect(last.sexagen).toBe('gui_hai');
      expect(last.stem).toBe('gui');
      expect(last.branch).toBe('hai');
      expect(last.index).toBe(59);
    });
  });

  describe('get_sexagen_definition', () => {
    it('returns definition for jia_zi', () => {
      expect(get_sexagen_definition('jia_zi')).toEqual({
        sexagen: 'jia_zi',
        stem: 'jia',
        branch: 'zi',
        index: 0,
      });
    });

    it('throws for invalid sexagen', () => {
      expect(() =>
        get_sexagen_definition('invalid')
      ).toThrow(TypeError);
    });
  });

  describe('get_sexagen_index', () => {
    it('returns correct index for known members', () => {
      expect(get_sexagen_index('jia_zi')).toBe(0);
      expect(get_sexagen_index('yi_chou')).toBe(1);
      expect(get_sexagen_index('gui_hai')).toBe(59);
    });

    it('throws for invalid sexagen', () => {
      expect(() => get_sexagen_index('invalid')).toThrow(
        TypeError
      );
    });
  });

  describe('is_sexagen', () => {
    it('returns true for valid sexagen', () => {
      expect(is_sexagen('jia_zi')).toBe(true);
      expect(is_sexagen('gui_hai')).toBe(true);
    });

    it('returns false for invalid values', () => {
      expect(is_sexagen('invalid')).toBe(false);
      expect(is_sexagen(null)).toBe(false);
      expect(is_sexagen(1)).toBe(false);
    });
  });

  describe('get_sexagen_by_index', () => {
    it('returns member at valid index', () => {
      expect(get_sexagen_by_index(0)).toBe('jia_zi');
      expect(get_sexagen_by_index(59)).toBe('gui_hai');
    });

    it('wraps for out-of-range index', () => {
      expect(get_sexagen_by_index(60)).toBe('jia_zi');
      expect(get_sexagen_by_index(-1)).toBe('gui_hai');
    });
  });

  describe('get_sexagen_by_stem_and_branch', () => {
    it('returns sexagen for valid stem+branch pair', () => {
      expect(
        get_sexagen_by_stem_and_branch('jia', 'zi')
      ).toBe('jia_zi');
      expect(
        get_sexagen_by_stem_and_branch('gui', 'hai')
      ).toBe('gui_hai');
    });

    it('throws for mismatched pair', () => {
      expect(() =>
        get_sexagen_by_stem_and_branch('jia', 'chou')
      ).toThrow(TypeError);
    });
  });

  describe('get_sexagen_stem / get_sexagen_branch', () => {
    it('returns correct stem for jia_zi', () => {
      expect(get_sexagen_stem('jia_zi')).toBe('jia');
    });

    it('returns correct branch for jia_zi', () => {
      expect(get_sexagen_branch('jia_zi')).toBe('zi');
    });
  });

  describe('shift_sexagen', () => {
    it('shifts jia_zi by +1 to yi_chou', () => {
      expect(shift_sexagen('jia_zi', 1)).toBe('yi_chou');
    });

    it('shifts jia_zi by +60 back to jia_zi', () => {
      expect(shift_sexagen('jia_zi', 60)).toBe('jia_zi');
    });

    it('shifts jia_zi by -1 to gui_hai', () => {
      expect(shift_sexagen('jia_zi', -1)).toBe('gui_hai');
    });
  });
});
