const {
  ELEMENTS,
  ELEMENT,
  ELEMENT_NAMES,
  ELEMENT_DEFINITIONS,
  get_elements,
  get_element,
  get_element_index,
  get_element_definition,
  is_element,
  shift_element,
  get_generated_element,
  get_controlled_element,
} = require('../index');

describe('A test suite for: elem/elem', () => {
  describe('ELEMENTS array', () => {
    it('exports ELEMENTS in canonical order', () => {
      expect(ELEMENTS).toEqual([
        'wood',
        'fire',
        'earth',
        'metal',
        'water',
      ]);
    });

    it('exports the first element as ELEMENT', () => {
      expect(ELEMENT).toBe('wood');
    });
  });

  describe('Localization (ELEMENT_NAMES)', () => {
    const expectedLocales = [
      'en',
      'vi',
      'zh_ch',
      'zh_tw',
      'ja',
    ];

    it('contains translations for all elements', () => {
      expect(Object.keys(ELEMENT_NAMES)).toEqual(ELEMENTS);
    });

    for (const key of ELEMENTS) {
      it(`${key} has complete localization data`, () => {
        const data = ELEMENT_NAMES[key].name;
        for (const locale of expectedLocales) {
          expect(data).toHaveProperty(locale);
          if (locale === 'ja') {
            expect(data.ja).toHaveProperty('kanji');
            expect(data.ja).toHaveProperty('hiragana');
            expect(data.ja).toHaveProperty('katakana');
          } else {
            expect(data[locale]).toHaveProperty('primary');
          }
        }
      });
    }
  });

  describe('Metadata (ELEMENT_DEFINITIONS)', () => {
    it('contains definitions for all elements', () => {
      expect(
        ELEMENT_DEFINITIONS.map(d => d.element)
      ).toEqual(ELEMENTS);
    });

    for (const key of ELEMENTS) {
      it(`${key} definition has all required properties`, () => {
        const def = ELEMENT_DEFINITIONS.find(
          d => d.element === key
        );
        expect(def).toBeDefined();
        expect(def).toHaveProperty('element');
        expect(def).toHaveProperty('index');
        expect(def).toHaveProperty('generation');
        expect(def).toHaveProperty('control');
        expect(def).toHaveProperty('name');
        expect(def).toHaveProperty('season');
        expect(def).toHaveProperty('color');
      });
    }
  });

  describe('Cycle functions', () => {
    it('get_elements returns a copy of ELEMENTS', () => {
      const result = get_elements();
      expect(result).toEqual(ELEMENTS);
      expect(result).not.toBe(ELEMENTS);
    });

    for (const key of ELEMENTS) {
      it(`get_element(${get_element_index(key)}) returns ${key}`, () => {
        expect(get_element_index(key)).toBe(
          ELEMENTS.indexOf(key)
        );
        expect(get_element(ELEMENTS.indexOf(key))).toBe(
          key
        );
      });
    }

    it('get_element wraps around for negative/overflow indices', () => {
      expect(get_element(-1)).toBe(
        ELEMENTS[ELEMENTS.length - 1]
      );
      expect(get_element(ELEMENTS.length)).toBe(
        ELEMENTS[0]
      );
      expect(get_element(ELEMENTS.length + 1)).toBe(
        ELEMENTS[1]
      );
    });
  });

  describe('get_element_index', () => {
    for (const key of ELEMENTS) {
      it(`returns correct index for ${key}`, () => {
        expect(get_element_index(key)).toBe(
          ELEMENTS.indexOf(key)
        );
      });
    }
  });

  describe('get_element_definition', () => {
    for (const key of ELEMENTS) {
      it(`returns definition for ${key}`, () => {
        const def = get_element_definition(key);
        expect(def.element).toBe(key);
        expect(def.index).toBe(ELEMENTS.indexOf(key));
      });
    }

    it('throws for invalid element', () => {
      expect(() =>
        get_element_definition('invalid')
      ).toThrow(TypeError);
    });
  });

  describe('is_element', () => {
    for (const key of ELEMENTS) {
      it(`${key} is a valid element`, () => {
        expect(is_element(key)).toBe(true);
      });
    }

    it('rejects invalid values', () => {
      expect(is_element('invalid')).toBe(false);
      expect(is_element(null)).toBe(false);
      expect(is_element(undefined)).toBe(false);
      expect(is_element(1)).toBe(false);
    });
  });

  describe('shift_element', () => {
    it('shifts wood by +1 to fire', () => {
      expect(shift_element('wood', 1)).toBe('fire');
    });

    it('shifts water by -1 to metal', () => {
      expect(shift_element('water', -1)).toBe('metal');
    });

    it('shifts water by +1 to wood (wrap)', () => {
      expect(shift_element('water', 1)).toBe('wood');
    });

    it('shifts wood by +5 to wood (full cycle)', () => {
      expect(shift_element('wood', 5)).toBe('wood');
    });

    it('throws for invalid element', () => {
      expect(() => shift_element('invalid', 1)).toThrow(
        TypeError
      );
    });
  });

  describe('get_generated_element', () => {
    it('wood -> fire', () => {
      expect(get_generated_element('wood')).toBe('fire');
    });
    it('fire -> earth', () => {
      expect(get_generated_element('fire')).toBe('earth');
    });
    it('earth -> metal', () => {
      expect(get_generated_element('earth')).toBe('metal');
    });
    it('metal -> water', () => {
      expect(get_generated_element('metal')).toBe('water');
    });
    it('water -> wood', () => {
      expect(get_generated_element('water')).toBe('wood');
    });
  });

  describe('get_controlled_element', () => {
    it('wood -> earth', () => {
      expect(get_controlled_element('wood')).toBe('earth');
    });
    it('fire -> metal', () => {
      expect(get_controlled_element('fire')).toBe('metal');
    });
    it('earth -> water', () => {
      expect(get_controlled_element('earth')).toBe('water');
    });
    it('metal -> wood', () => {
      expect(get_controlled_element('metal')).toBe('wood');
    });
    it('water -> fire', () => {
      expect(get_controlled_element('water')).toBe('fire');
    });
  });
});
