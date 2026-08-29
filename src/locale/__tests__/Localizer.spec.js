const { Localizer } = require('../index');

describe('A test suite for: locale/Localizer', () => {
  it('creates an instance and can set/get locale data', () => {
    const l = Localizer();
    expect(l).toBeDefined();
    expect(typeof l.set).toBe('function');
    expect(typeof l.get).toBe('function');

    l.set_english('test', 'hello', 'world');
    const en = l.get_english('test');
    expect(en.primary).toBe('hello');
    expect(en.secondary).toBe('world');
  });

  it('set_vietnamese and get_vietnamese work', () => {
    const l = Localizer();
    l.set_vietnamese('test', 'xin chào', 'thế giới');
    const vi = l.get_vietnamese('test');
    expect(vi.primary).toBe('xin chào');
    expect(vi.secondary).toBe('thế giới');
  });

  it('set_chinese_simple and get_chinese_simple work', () => {
    const l = Localizer();
    l.set_chinese_simple('test', '你好', '世界');
    const zh = l.get_chinese_simple('test');
    expect(zh.primary).toBe('你好');
    expect(zh.secondary).toBe('世界');
  });

  it('set_chinese_traditional and get_chinese_traditional work', () => {
    const l = Localizer();
    l.set_chinese_traditional('test', '你好', '世界');
    const zh = l.get_chinese_traditional('test');
    expect(zh.primary).toBe('你好');
    expect(zh.secondary).toBe('世界');
  });

  it('set_japanese and get_japanese work', () => {
    const l = Localizer();
    l.set_japanese('test', '漢字', 'ひらがな', 'カタカナ');
    const ja = l.get_japanese('test');
    expect(ja.kanji).toBe('漢字');
    expect(ja.hiragana).toBe('ひらがな');
    expect(ja.katakana).toBe('カタカナ');
  });

  it('set and get generic locale works', () => {
    const l = Localizer();
    l.set('test', 'custom', { foo: 'bar', baz: 'qux' });
    const custom = l.get('test', 'custom');
    expect(custom.foo).toBe('bar');
    expect(custom.baz).toBe('qux');
  });

  it('throws on set without locale', () => {
    const l = Localizer();
    expect(() => l.set('test', null, {})).toThrow(
      'No locale'
    );
    expect(() => l.set('test', '', {})).toThrow(
      'No locale'
    );
  });

  it('throws on set without data', () => {
    const l = Localizer();
    expect(() => l.set('test', 'en', null)).toThrow(
      'No data given for: en'
    );
    expect(() => l.set('test', 'en', undefined)).toThrow(
      'No data given for: en'
    );
  });

  it('setter returns self for chaining', () => {
    const l = Localizer();
    const result = l.set_english('test', 'a', 'b');
    expect(result).toBe(l);
  });

  it('japanese setter allows optional params (null)', () => {
    const l = Localizer();
    l.set_japanese('test', '漢字');
    const ja = l.get_japanese('test');
    expect(ja.kanji).toBe('漢字');
    expect(ja.hiragana).toBeNull();
    expect(ja.katakana).toBeNull();
  });

  it('multiple locales can be set independently', () => {
    const l = Localizer();
    l.set_english('test', 'hello', 'world');
    l.set_vietnamese('test', 'xin chào', 'thế giới');
    l.set_japanese('test', '漢字', 'ひらがな', 'カタカナ');

    expect(l.get_english('test').primary).toBe('hello');
    expect(l.get_vietnamese('test').primary).toBe(
      'xin chào'
    );
    expect(l.get_japanese('test').kanji).toBe('漢字');
  });

  it('get returns null for unset locale', () => {
    const l = Localizer();
    expect(l.get('test', 'unknown')).toBeNull();
  });

  // Additional tests below
  it('get_english_value returns primary', () => {
    const l = Localizer();
    l.set_english('test', 'hello', 'world');
    expect(l.get_english_value('test')).toBe('hello');
  });

  it('get_vietnamese_value returns primary', () => {
    const l = Localizer();
    l.set_vietnamese('test', 'xin chào', 'thế giới');
    expect(l.get_vietnamese_value('test')).toBe('xin chào');
  });

  it('get_chinese_simple_value returns primary', () => {
    const l = Localizer();
    l.set_chinese_simple('test', '你好', '世界');
    expect(l.get_chinese_simple_value('test')).toBe('你好');
  });

  it('get_chinese_traditional_value returns primary', () => {
    const l = Localizer();
    l.set_chinese_traditional('test', '你好', '世界');
    expect(l.get_chinese_traditional_value('test')).toBe(
      '你好'
    );
  });

  it('get_japanese_value returns kanji', () => {
    const l = Localizer();
    l.set_japanese('test', '漢字', 'ひらがな', 'カタカナ');
    expect(l.get_japanese_value('test')).toBe('漢字');
  });

  it('get_english_value returns secondary when primary is missing', () => {
    const l = Localizer();
    l.set('test', 'en', { secondary: 'only secondary' });
    expect(l.get_english_value('test')).toBe(
      'only secondary'
    );
  });

  it('get_japanese_value returns hiragana when kanji is missing', () => {
    const l = Localizer();
    l.set('test', 'ja', { hiragana: 'ひらがな' });
    expect(l.get_japanese_value('test')).toBe('ひらがな');
  });

  it('get_japanese_value returns katakana when kanji and hiragana are missing', () => {
    const l = Localizer();
    l.set('test', 'ja', { katakana: 'カタカナ' });
    expect(l.get_japanese_value('test')).toBe('カタカナ');
  });

  it('get_xxx_value returns undefined when locale not set', () => {
    const l = Localizer();
    expect(l.get_english_value('test')).toBeUndefined();
    expect(l.get_japanese_value('test')).toBeUndefined();
  });

  it('chaining multiple setters works', () => {
    const l = Localizer();
    l.set_english('test', 'a', 'b')
      .set_vietnamese('test', 'c', 'd')
      .set_chinese_simple('test', 'e', 'f')
      .set_chinese_traditional('test', 'g', 'h')
      .set_japanese('test', 'i', 'j', 'k');

    expect(l.get_english('test').primary).toBe('a');
    expect(l.get_vietnamese('test').primary).toBe('c');
    expect(l.get_chinese_simple('test').primary).toBe('e');
    expect(l.get_chinese_traditional('test').primary).toBe(
      'g'
    );
    expect(l.get_japanese('test').kanji).toBe('i');
  });

  it('overwriting locale data replaces previous', () => {
    const l = Localizer();
    l.set_english('test', 'first', '1');
    l.set_english('test', 'second', '2');
    expect(l.get_english('test').primary).toBe('second');
    expect(l.get_english('test').secondary).toBe('2');
  });

  it('set with same key different values works', () => {
    const l = Localizer();
    l.set('test', 'en', { primary: 'p1', secondary: 's1' });
    l.set('test', 'en', { primary: 'p2' });
    expect(l.get('test', 'en').primary).toBe('p2');
    expect(l.get('test', 'en').secondary).toBeUndefined();
  });

  it('different Localizer instances are independent', () => {
    const l1 = Localizer();
    l1.set_english('test', 'l1', 'data');

    const l2 = Localizer();
    l2.set_english('test', 'l2', 'data');

    expect(l1.get_english('test').primary).toBe('l1');
    expect(l2.get_english('test').primary).toBe('l2');
  });

  // --- Tests for setter aliases ---
  describe('setter aliases', () => {
    it('set_en is alias for set_english', () => {
      const l = Localizer();
      l.set_en('test', 'hello', 'world');
      expect(l.get_english('test').primary).toBe('hello');
      expect(l.get_english('test').secondary).toBe('world');
    });

    it('set_vi is alias for set_vietnamese', () => {
      const l = Localizer();
      l.set_vi('test', 'xin chào', 'thế giới');
      expect(l.get_vietnamese('test').primary).toBe(
        'xin chào'
      );
      expect(l.get_vietnamese('test').secondary).toBe(
        'thế giới'
      );
    });

    it('set_zh_ch is alias for set_chinese_simple', () => {
      const l = Localizer();
      l.set_zh_ch('test', '你好', '世界');
      expect(l.get_chinese_simple('test').primary).toBe(
        '你好'
      );
      expect(l.get_chinese_simple('test').secondary).toBe(
        '世界'
      );
    });

    it('set_zh_tw is alias for set_chinese_traditional', () => {
      const l = Localizer();
      l.set_zh_tw('test', '你好', '世界');
      expect(
        l.get_chinese_traditional('test').primary
      ).toBe('你好');
      expect(
        l.get_chinese_traditional('test').secondary
      ).toBe('世界');
    });

    it('set_ja is alias for set_japanese', () => {
      const l = Localizer();
      l.set_ja('test', '漢字', 'ひらがな', 'カタカナ');
      const ja = l.get_japanese('test');
      expect(ja.kanji).toBe('漢字');
      expect(ja.hiragana).toBe('ひらがな');
      expect(ja.katakana).toBe('カタカナ');
    });
  });

  // --- Tests for getter aliases ---
  describe('getter aliases', () => {
    it('en is alias for get_english', () => {
      const l = Localizer();
      l.set_english('test', 'hello', 'world');
      expect(l.en('test')).toEqual({
        primary: 'hello',
        secondary: 'world',
      });
    });

    it('vi is alias for get_vietnamese', () => {
      const l = Localizer();
      l.set_vietnamese('test', 'xin chào', 'thế giới');
      expect(l.vi('test')).toEqual({
        primary: 'xin chào',
        secondary: 'thế giới',
      });
    });

    it('zh_ch is alias for get_chinese_simple', () => {
      const l = Localizer();
      l.set_chinese_simple('test', '你好', '世界');
      expect(l.zh_ch('test')).toEqual({
        primary: '你好',
        secondary: '世界',
      });
    });

    it('zh_tw is alias for get_chinese_traditional', () => {
      const l = Localizer();
      l.set_chinese_traditional('test', '你好', '世界');
      expect(l.zh_tw('test')).toEqual({
        primary: '你好',
        secondary: '世界',
      });
    });

    it('ja is alias for get_japanese', () => {
      const l = Localizer();
      l.set_japanese(
        'test',
        '漢字',
        'ひらがな',
        'カタカナ'
      );
      expect(l.ja('test')).toEqual({
        kanji: '漢字',
        hiragana: 'ひらがな',
        katakana: 'カタカナ',
      });
    });
  });

  // --- Tests for value getter aliases ---
  describe('value getter aliases', () => {
    it('en_value is alias for get_english_value', () => {
      const l = Localizer();
      l.set_english('test', 'hello', 'world');
      expect(l.en_value('test')).toBe('hello');
    });

    it('vi_value is alias for get_vietnamese_value', () => {
      const l = Localizer();
      l.set_vietnamese('test', 'xin chào', 'thế giới');
      expect(l.vi_value('test')).toBe('xin chào');
    });

    it('zh_ch_value is alias for get_chinese_simple_value', () => {
      const l = Localizer();
      l.set_chinese_simple('test', '你好', '世界');
      expect(l.zh_ch_value('test')).toBe('你好');
    });

    it('zh_tw_value is alias for get_chinese_traditional_value', () => {
      const l = Localizer();
      l.set_chinese_traditional('test', '你好', '世界');
      expect(l.zh_tw_value('test')).toBe('你好');
    });

    it('ja_value is alias for get_japanese_value', () => {
      const l = Localizer();
      l.set_japanese(
        'test',
        '漢字',
        'ひらがな',
        'カタカナ'
      );
      expect(l.ja_value('test')).toBe('漢字');
    });

    it('en_value returns secondary when primary is missing', () => {
      const l = Localizer();
      l.set('test', 'en', { secondary: 'only secondary' });
      expect(l.en_value('test')).toBe('only secondary');
    });

    it('ja_value returns hiragana when kanji is missing', () => {
      const l = Localizer();
      l.set('test', 'ja', { hiragana: 'ひらがな' });
      expect(l.ja_value('test')).toBe('ひらがな');
    });

    it('ja_value returns katakana when kanji and hiragana are missing', () => {
      const l = Localizer();
      l.set('test', 'ja', { katakana: 'カタカナ' });
      expect(l.ja_value('test')).toBe('カタカナ');
    });

    it('en_value returns undefined when locale not set', () => {
      const l = Localizer();
      expect(l.en_value('test')).toBeUndefined();
      expect(l.ja_value('test')).toBeUndefined();
    });
  });

  // --- Tests for set_multi() ---
  describe('set_multi()', () => {
    it('set_multi() sets all locales at once (with short key aliases)', () => {
      const l = Localizer();
      l.set_multi('appliances', {
        en: {
          pr: 'washing machine',
          se: 'washing machine',
        },
        vi: {
          pr: 'máy giặt',
          se: 'washing machine',
        },
        zh_ch: {
          pr: '洗衣机',
          se: 'washing machine',
        },
        zh_tw: {
          pr: '洗衣機',
          se: 'washing machine',
        },
        ja: {
          kan: '洗濯機',
          hira: 'せんたっき',
          kata: 'センタッキ',
        },
      });

      expect(l.get_english('appliances')).toEqual({
        primary: 'washing machine',
        secondary: 'washing machine',
      });
      expect(l.get_vietnamese('appliances')).toEqual({
        primary: 'máy giặt',
        secondary: 'washing machine',
      });
      expect(l.get_chinese_simple('appliances')).toEqual({
        primary: '洗衣机',
        secondary: 'washing machine',
      });
      expect(
        l.get_chinese_traditional('appliances')
      ).toEqual({
        primary: '洗衣機',
        secondary: 'washing machine',
      });
      expect(l.get_japanese('appliances')).toEqual({
        kanji: '洗濯機',
        hiragana: 'せんたっき',
        katakana: 'センタッキ',
      });
    });

    it('set_multi() works with long key names (backward compatibility)', () => {
      const l = Localizer();
      l.set_multi('appliances', {
        en: {
          primary: 'washing machine',
          secondary: 'washing machine',
        },
        vi: {
          primary: 'máy giặt',
          secondary: 'washing machine',
        },
        zh_ch: {
          primary: '洗衣机',
          secondary: 'washing machine',
        },
        zh_tw: {
          primary: '洗衣機',
          secondary: 'washing machine',
        },
        ja: {
          kanji: '洗濯機',
          hiragana: 'せんたっき',
          katakana: 'センタッキ',
        },
      });

      expect(l.get_english('appliances')).toEqual({
        primary: 'washing machine',
        secondary: 'washing machine',
      });
      expect(l.get_vietnamese('appliances')).toEqual({
        primary: 'máy giặt',
        secondary: 'washing machine',
      });
      expect(l.get_chinese_simple('appliances')).toEqual({
        primary: '洗衣机',
        secondary: 'washing machine',
      });
      expect(
        l.get_chinese_traditional('appliances')
      ).toEqual({
        primary: '洗衣機',
        secondary: 'washing machine',
      });
      expect(l.get_japanese('appliances')).toEqual({
        kanji: '洗濯機',
        hiragana: 'せんたっき',
        katakana: 'センタッキ',
      });
    });

    it('set_multi() supports mixing short and long keys', () => {
      const l = Localizer();
      l.set_multi('mixed', {
        en: {
          pr: 'primary short',
          secondary: 'secondary long',
        },
        ja: {
          kanji: '漢字',
          hira: 'ひらがな短',
          kata: 'カタカナ短',
        },
      });

      expect(l.get_english('mixed')).toEqual({
        primary: 'primary short',
        secondary: 'secondary long',
      });
      expect(l.get_japanese('mixed')).toEqual({
        kanji: '漢字',
        hiragana: 'ひらがな短',
        katakana: 'カタカナ短',
      });
    });

    it('set_multi() returns self for chaining', () => {
      const l = Localizer();
      const result = l.set_multi('test', {
        en: { primary: 'a', secondary: 'b' },
      });
      expect(result).toBe(l);
    });

    it('set_multi() throws when key is empty', () => {
      const l = Localizer();
      expect(() =>
        l.set_multi('', {
          en: { primary: 'a', secondary: 'b' },
        })
      ).toThrow('No key is given');
      expect(() =>
        l.set_multi(null, {
          en: { primary: 'a', secondary: 'b' },
        })
      ).toThrow('No key is given');
    });

    it('set_multi() supports partial data (only some locales)', () => {
      const l = Localizer();
      l.set_multi('appliances', {
        en: {
          primary: 'washing machine',
          secondary: 'washing machine',
        },
        vi: {
          primary: 'máy giặt',
          secondary: 'washing machine',
        },
      });

      expect(l.get_english('appliances').primary).toBe(
        'washing machine'
      );
      expect(l.get_vietnamese('appliances').primary).toBe(
        'máy giặt'
      );
      expect(l.get_chinese_simple('appliances')).toBeNull();
      expect(l.get_japanese('appliances')).toBeNull();
    });

    it('different keys have independent data', () => {
      const l = Localizer();
      l.set_multi('appliances', {
        en: {
          primary: 'washing machine',
          secondary: 'washing machine',
        },
      });
      l.set_multi('tools', {
        en: { primary: 'hammer', secondary: 'hammer' },
      });

      expect(l.get_english('appliances').primary).toBe(
        'washing machine'
      );

      expect(l.get_english('tools').primary).toBe('hammer');
    });

    it('get_name() returns the instance name', () => {
      const l = Localizer('machines');
      expect(l.get_name()).toBe('machines');
    });

    it('get_name() defaults to "default"', () => {
      const l = Localizer();
      expect(l.get_name()).toBe('default');
    });
  });
});
