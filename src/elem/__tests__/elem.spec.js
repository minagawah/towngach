const { ELEMENTS } = require('../index');

describe('A test suite for: elem/elem', () => {
  describe('ELEMENT_KEYS', () => {
    it('exports ELEMENT_KEYS array', () => {
      const { ELEMENT_KEYS } = require('../elem');
      expect(ELEMENT_KEYS).toEqual([
        'wood',
        'fire',
        'earth',
        'metal',
        'water',
      ]);
    });
  });

  describe('ELEMENTS structure', () => {
    it('has all five elements', () => {
      expect(Object.keys(ELEMENTS)).toEqual([
        'wood',
        'fire',
        'earth',
        'metal',
        'water',
      ]);
    });

    it('each element has name, season, and color', () => {
      for (const key of Object.keys(ELEMENTS)) {
        const element = ELEMENTS[key];
        expect(element).toHaveProperty('name');
        expect(element).toHaveProperty('season');
        expect(element).toHaveProperty('color');
      }
    });
  });

  describe('All elements have complete localized data', () => {
    const expectedLocales = [
      'en',
      'vi',
      'zh_ch',
      'zh_tw',
      'ja',
    ];

    for (const elementKey of Object.keys(ELEMENTS)) {
      for (const prop of ['name', 'season', 'color']) {
        it(`${elementKey}.${prop} has all required locales`, () => {
          const data = ELEMENTS[elementKey][prop];
          for (const locale of expectedLocales) {
            expect(data).toHaveProperty(locale);
            if (locale === 'ja') {
              const ja = data.ja;
              expect(ja).toHaveProperty('kanji');
              expect(ja).toHaveProperty('hiragana');
              expect(ja).toHaveProperty('katakana');
              expect(typeof ja.kanji).toBe('string');
              expect(typeof ja.hiragana).toBe('string');
              expect(typeof ja.katakana).toBe('string');
            } else {
              const loc = data[locale];
              expect(loc).toHaveProperty('primary');
              expect(typeof loc.primary).toBe('string');
              // secondary may be undefined for English
              if (loc.secondary !== undefined) {
                expect(typeof loc.secondary).toBe('string');
              }
            }
          }
        });
      }
    }
  });

  describe('No missing data for wood element (reference element)', () => {
    it('wood has all properties fully populated', () => {
      const wood = ELEMENTS.wood;
      // name
      expect(wood.name.en.primary).toBeTruthy();
      expect(wood.name.vi.primary).toBeTruthy();
      expect(wood.name.zh_ch.primary).toBeTruthy();
      expect(wood.name.zh_tw.primary).toBeTruthy();
      expect(wood.name.ja.kanji).toBeTruthy();
      // season
      expect(wood.season.en.primary).toBeTruthy();
      expect(wood.season.vi.primary).toBeTruthy();
      expect(wood.season.zh_ch.primary).toBeTruthy();
      expect(wood.season.zh_tw.primary).toBeTruthy();
      expect(wood.season.ja.kanji).toBeTruthy();
      // color
      expect(wood.color.en.primary).toBeTruthy();
      expect(wood.color.vi.primary).toBeTruthy();
      expect(wood.color.zh_ch.primary).toBeTruthy();
      expect(wood.color.zh_tw.primary).toBeTruthy();
      expect(wood.color.ja.kanji).toBeTruthy();
    });
  });

  describe('No missing data for fire element (reference element)', () => {
    it('fire has all properties fully populated', () => {
      const fire = ELEMENTS.fire;
      // name
      expect(fire.name.en.primary).toBeTruthy();
      expect(fire.name.vi.primary).toBeTruthy();
      expect(fire.name.zh_ch.primary).toBeTruthy();
      expect(fire.name.zh_tw.primary).toBeTruthy();
      expect(fire.name.ja.kanji).toBeTruthy();
      // season
      expect(fire.season.en.primary).toBeTruthy();
      expect(fire.season.vi.primary).toBeTruthy();
      expect(fire.season.zh_ch.primary).toBeTruthy();
      expect(fire.season.zh_tw.primary).toBeTruthy();
      expect(fire.season.ja.kanji).toBeTruthy();
      // color
      expect(fire.color.en.primary).toBeTruthy();
      expect(fire.color.vi.primary).toBeTruthy();
      expect(fire.color.zh_ch.primary).toBeTruthy();
      expect(fire.color.zh_tw.primary).toBeTruthy();
      expect(fire.color.ja.kanji).toBeTruthy();
    });
  });

  describe('No missing data for earth element (reference element)', () => {
    it('earth has all properties fully populated', () => {
      const earth = ELEMENTS.earth;
      // name
      expect(earth.name.en.primary).toBeTruthy();
      expect(earth.name.vi.primary).toBeTruthy();
      expect(earth.name.zh_ch.primary).toBeTruthy();
      expect(earth.name.zh_tw.primary).toBeTruthy();
      expect(earth.name.ja.kanji).toBeTruthy();
      // season
      expect(earth.season.en.primary).toBeTruthy();
      expect(earth.season.vi.primary).toBeTruthy();
      expect(earth.season.zh_ch.primary).toBeTruthy();
      expect(earth.season.zh_tw.primary).toBeTruthy();
      expect(earth.season.ja.kanji).toBeTruthy();
      // color
      expect(earth.color.en.primary).toBeTruthy();
      expect(earth.color.vi.primary).toBeTruthy();
      expect(earth.color.zh_ch.primary).toBeTruthy();
      expect(earth.color.zh_tw.primary).toBeTruthy();
      expect(earth.color.ja.kanji).toBeTruthy();
    });
  });

  describe('No missing data for metal element (reference element)', () => {
    it('metal has all properties fully populated', () => {
      const metal = ELEMENTS.metal;
      // name
      expect(metal.name.en.primary).toBeTruthy();
      expect(metal.name.vi.primary).toBeTruthy();
      expect(metal.name.zh_ch.primary).toBeTruthy();
      expect(metal.name.zh_tw.primary).toBeTruthy();
      expect(metal.name.ja.kanji).toBeTruthy();
      // season
      expect(metal.season.en.primary).toBeTruthy();
      expect(metal.season.vi.primary).toBeTruthy();
      expect(metal.season.zh_ch.primary).toBeTruthy();
      expect(metal.season.zh_tw.primary).toBeTruthy();
      expect(metal.season.ja.kanji).toBeTruthy();
      // color
      expect(metal.color.en.primary).toBeTruthy();
      expect(metal.color.vi.primary).toBeTruthy();
      expect(metal.color.zh_ch.primary).toBeTruthy();
      expect(metal.color.zh_tw.primary).toBeTruthy();
      expect(metal.color.ja.kanji).toBeTruthy();
    });
  });

  describe('No missing data for water element (reference element)', () => {
    it('water has all properties fully populated', () => {
      const water = ELEMENTS.water;
      // name
      expect(water.name.en.primary).toBeTruthy();
      expect(water.name.vi.primary).toBeTruthy();
      expect(water.name.zh_ch.primary).toBeTruthy();
      expect(water.name.zh_tw.primary).toBeTruthy();
      expect(water.name.ja.kanji).toBeTruthy();
      // season
      expect(water.season.en.primary).toBeTruthy();
      expect(water.season.vi.primary).toBeTruthy();
      expect(water.season.zh_ch.primary).toBeTruthy();
      expect(water.season.zh_tw.primary).toBeTruthy();
      expect(water.season.ja.kanji).toBeTruthy();
      // color
      expect(water.color.en.primary).toBeTruthy();
      expect(water.color.vi.primary).toBeTruthy();
      expect(water.color.zh_ch.primary).toBeTruthy();
      expect(water.color.zh_tw.primary).toBeTruthy();
      expect(water.color.ja.kanji).toBeTruthy();
    });
  });
});
