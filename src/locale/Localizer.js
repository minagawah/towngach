/**
 * @module locale/Localizer
 */

import { LOCALES } from './index';

/**
 * @typedef {import('../constants').Locale} Locale
 */

/**
 * Localized data for "en", "vi",
 * "zh_ch", and "zh_tw" has "primary"
 * and "secondary".
 * @typedef {('primary'|'secondary')} KeyNormal
 */

/**
 * Localized data for "ja" has "kanji",
 * "hiragana", and "katakana".
 * @typedef {('kanji'|'hiragana'|'katakana')} KeyJapanese
 */

/**
 * @typedef {Object.<KeyNormal, string>} DataNormal
 */

/**
 * @typedef {Object.<KeyJapanese, string>} DataJapanese
 */

/**
 * @typedef {DataNormal|DataJapanese} DataGeneric
 */

// BEGIN: Only for: set_multi
// =====================================

/**
 * Not for localized data but only for "set_multi".
 * @typedef {('pr'|'se')} KeyNormalShort
 */

/**
 * Not for localized data but only for "set_multi".
 * @typedef {('kan'|'hira'|'kata')} KeyJapaneseShort
 */

/**
 * Not for localized data but only for "set_multi".
 * @typedef {Object.<KeyNormalShort, string>} DataNormalShort
 */

/**
 * Not for localized data but only for "set_multi".
 * @typedef {Object.<KeyJapaneseShort, short>} DataJapaneseShort
 */

/**
 * Not for localized data but only for "set_multi".
 * @typedef {Object} DataMultiSetterArgs
 * @property {DataNormal|DataNormalShort} [en]
 * @property {DataNormal|DataNormalShort} [vi]
 * @property {DataNormal|DataNormalShort} [zh_ch]
 * @property {DataNormal|DataNormalShort} [zh_tw]
 * @property {DataJapanese|DataJapaneseShort} [ja]
 */

// =====================================
// END OF: Only for: set_multi

/**
 * @typedef {Object} LocalizedData
 * @property {DataNormal} [en]
 * @property {DataNormal} [vi]
 * @property {DataNormal} [zh_ch]
 * @property {DataNormal} [zh_tw]
 * @property {DataJapanese} [ja]
 */

/**
 * @typedef {Object.<string, LocalizedData>} LocalizedDataPackage
 */

/**
 * __LocalizerInterface (interface)__<br />
 * Interface design for `Instance`.
 * @interface LocalizerInterface
 * @see {@link module:locale/Localizer~Instance|Instance}
 */

/**
 * Get the instance name.
 * @typedef GetterName
 * @function
 * @returns {string}
 */

/**
 * @typedef {Function} Setter
 * @param {string} key
 * @param {string} locale
 * @param {LocaleDataGeneric} hash
 * @returns {Instance}
 * @throws {Error}
 */

/**
 * Set multiple locales at once for a key.
 * @typedef {Function} MultiSetter
 * @param {string} key
 * @param {DataMultiSetterArgs} data
 * @returns {Instance}
 * @throws {Error}
 */

/**
 * @typedef {Function} Getter
 * @param {string} key
 * @param {string} locale
 * @returns {LocaleDataGeneric}
 * @throws {Error}
 */

/**
 * @typedef {function} SetterNormal
 * @param {string} key
 * @param {string} [primary]
 * @param {string} [secondary]
 * @returns {Instance}
 * @throws {Error}
 */

/**
 * @typedef {Function} SetterJapanese
 * @param {string} key
 * @param {string} [kanji]
 * @param {string} [hiragana]
 * @param {string} [katakana]
 * @returns {Instance}
 * @throws {Error}
 */

/**
 * @typedef {Function} GetterNormal
 * @param {string} key
 * @returns {DataNormal}
 */

/**
 * @typedef {Function} GetterJapanese
 * @param {string} key
 * @returns {DataJapanese}
 */

/**
 * @typedef {function} GetterGenericValue
 * @param {string} key
 * @returns {string}
 */

/**
 * Runs 'set_multi' multiple times
 * to have you set multi-layered
 * locale dataset.
 *
 * @typedef {function} MultiSetterHelper
 * @param {Object} raw_array
 * @param {Array.<string>} attribute_keys
 * @return {LocalizedDataPackage}
 * @throws {Error}
 * @example.
 * Given the Array.<Object>:
 *
 * [0] {
 *   key: 'wood',
 *   name: {
 *     en: { pr: 'wood' },
 *     vi: { pr: 'gỗ', se: 'go' },
 *     zh_ch: { pr: '木', se: 'mu' },
 *     zh_tw: { pr: '木', se: 'mu' },
 *     ja: { kan: '木', hira: 'き', kata: 'キ' }
 *   },
 *   season: {
 *     en: { pr: 'spring' },
 *     vi: { pr: 'mùa xuân', se: 'mua xuan' },
 *     zh_ch: { pr: '春天', se: 'chun tian' },
 *     zh_tw: { pr: '春天', se: 'chun tian' },
 *     ja: { kan: '春', hira: 'はる', kata: 'ハル' }
 *   },
 *
 * will become Object.<Object> like this:
 * {
 *   wood: {
 *     name: {
 *       en: [Object],
 *       ja: [Object],
 *       vi: [Object],
 *       zh_ch: [Object],
 *       zh_tw: [Object]
 *     },
 *     season: {
 *       en: [Object],
 *       ja: [Object],
 *       vi: [Object],
 *       zh_ch: [Object],
 *       zh_tw: [Object]
 *     },
 */

/**
 * @type {MultiSetterHelper}
 */
export const set_multi_helper = (
  raw_array,
  attribute_keys
) => {
  const _d_all = raw_array.reduce((acc, raw, i) => {
    // Raw Data each:
    // --> [raw] { key: "wood", name: {}, season: {} }

    // console.log(`[${i}]`, raw);

    // Element Key
    // e_key --> "wood", "fire", "earth", etc.
    const e_key = raw?.key;

    if (!e_key)
      throw new Error(
        `No hash key is set in the given source[${i}]`
      );

    const l = Localizer(e_key);

    const _d1 = {
      ...attribute_keys.reduce((acc2, a_key, j) => {
        // Attribute Key
        // a_key --> "name", "season", "color", etc.

        // Raw Source Data
        // raw[color] --> { en: 'xxx', vi: 'xxx', ja: 'xxx' }
        const locale_raw = raw[a_key];

        let _d2;

        if (a_key && locale_raw) {
          l.set_multi(a_key, locale_raw);

          _d2 = LOCALES.reduce((acc3, locale) => {
            // Notice the function name
            // being the actual locale.
            // e.g. ---> l.zh_tw("color")
            let _d3 = l[locale](a_key);

            // 3rd data layer.
            // "locale" being the key
            // for this layer.
            acc3[locale] = _d3;
            return acc3;
          }, {});

          // 2nd data layer.
          // "a_key" being the key
          // for this layer.
          acc2[a_key] = _d2;
        }

        return acc2;
      }, {}),
    };

    // 1st data layer.
    // "e_key" being the key
    // for this layer.
    acc[e_key] = _d1;

    return acc;
  }, {});

  return _d_all;
};
// END OF: set_multi_helper

/**
 * @typedef Instance
 * @type {Object}
 * @implements {module:locale/Localizer~LocalizerInterface}
 * @property {GetterName} get_name - Returns the instance name.
 * @property {Setter} set - Given "key", "locale", and "hash", allows you to set "LocaleDataGeneric".
 * @property {Getter} get - Given "key" and "locale", gives you "LocaleDataGeneric".
 * @property {MultiSetter} set_multi - Allows you to set "en", "vi", "zh_ch", "zh_tw", and "ja" at the same time.
 * @property {SetterNormal} set_english - Given "key", allows you to set "primary" and "secondary" on the data where locale being "en".
 * @property {SetterNormal} set_vietnamese - Given "key", allows you to set "primary" and "secondary" on the data where locale being "vi".
 * @property {SetterNormal} set_chinese_simple - Given "key", allows you to set "primary" and "secondary" on the data where locale being "zh_ch".
 * @property {SetterNormal} set_chinese_traditional - Given "key", allows you to set "primary" and "secondary" on the data where locale being "zh_ch".
 * @property {SetterJapanese} set_japanese - Given "key", allows you to set "kanji", "hiragana", and "katakana" on the data where locale being "ja".
 * @property {SetterNormal} set_en - Alias for "set_english()"
 * @property {SetterNormal} set_vi - Alias for "set_vietnamese()"
 * @property {SetterNormal} set_zh_ch - Alias for "set_chinese_simple()"
 * @property {SetterNormal} set_zh_tw - Alias for "set_chinese_traditional()"
 * @property {SetterJapanese} set_ja - Alias for "set_japanese()"
 * @property {GetterNormal} get_english - Returns "primary" or "secondary" for given "key" where "locale" being "en".
 * @property {GetterNormal} get_vietnamese - Returns "primary" or "secondary" for given "key" where "locale" being "vi".
 * @property {GetterNormal} get_chinese_simple - Returns "primary" or "secondary" for given "key" where "locale" being "zh_ch".
 * @property {GetterNormal} get_chinese_traditional - Returns "primary" or "secondary" for given "key" where "locale" being "zh_tw".
 * @property {GetterJapanese} get_japanese - Returns "kanji", "hiragana", and "katakana" for given "key" where "locale" being "ja".
 * @property {GetterNormal} en - Alias for "get_english()"
 * @property {GetterNormal} vi - Alias for "get_vietnamese()"
 * @property {GetterNormal} zh_ch - Alias for "get_chinese_simple()"
 * @property {GetterNormal} zh_tw - Alias for "get_chinese_traditional()"
 * @property {GetterJapanese} ja - Alias for "get_japanese()"
 * @property {GetterGenericValue} get_english_value - Either returns "primary" or "secondary" for given "key" where "locale" being "en".
 * @property {GetterGenericValue} get_vietnamese_value - Either returns "primary" or "secondary" for given "key" where "locale" being "vi".
 * @property {GetterGenericValue} get_chinese_simple_value - Either returns "primary" or "secondary" for given "key" where "locale" being "zh_ch".
 * @property {GetterGenericValue} get_chinese_traditional_value - Either returns "primary" or "secondary" for given "key" where "locale" being "zh_tw".
 * @property {GetterGenericValue} get_japanese_value - Either returns "kanji", "hiragana", or "katakana" for given "key" where "locale" being "ja".
 * @property {GetterGenericValue} en_value - Alias for "get_english()"
 * @property {GetterGenericValue} vi_value - Alias for "get_vietnamese()"
 * @property {GetterGenericValue} zh_ch_value - Alias for "get_chinese_simple()"
 * @property {GetterGenericValue} zh_tw_value - Alias for "get_chinese_traditional()"
 * @property {GetterGenericValue} ja_value - Alias for "get_japanese_value()"
 */

/**
 * __Localizer (factory)__<br />
 * A factory function to create `Instance`.
 * @function
 * @name Localizer
 * @param {string} [name] - Instance name for debugging
 * @returns {Instance}
 * @see {@link module:lib/Localizer~Instance|Instance} - See definitions of the returned "Instance".
 * @see {@link module:lib/Localizer~LocalizerInterface|LocalizerInterface} - For the interface of "Instance".
 */
export const Localizer = (name = 'default') => {
  /**
   * @private
   * @type {LocalizedDataPackage}
   */
  const _datapack = {};

  /**
   * @type {Instance}
   */
  const self = {};

  /**
   * @private
   * @param {string} key
   * @returns {string}
   * @throws {Error}
   */
  const _validate_key = key => {
    if (!key) throw new Error('No key is given');
    if (!_datapack[key]) {
      _datapack[key] = {};
    }
    return key;
  };

  /**
   * @type {GetterName}
   * @method module:locale/Localizer~LocalizerInterface#get_name
   */
  self.get_name = () => name;

  /**
   * @type {MultiSetter}
   * @method module:locale/Localizer~LocalizerInterface#set_multi
   */
  self.set_multi = (key, data) => {
    key = _validate_key(key);

    const _ternary = (data, short, long) =>
      data[short] ?? data[long];

    if (data.en) {
      const en = data.en;
      self.set_en(
        key,
        _ternary(en, 'pr', 'primary'),
        _ternary(en, 'se', 'secondary')
      );
    }

    if (data.vi) {
      const vi = data.vi;
      self.set_vi(
        key,
        _ternary(vi, 'pr', 'primary'),
        _ternary(vi, 'se', 'secondary')
      );
    }

    if (data.zh_ch) {
      const zh = data.zh_ch;
      self.set_zh_ch(
        key,
        _ternary(zh, 'pr', 'primary'),
        _ternary(zh, 'se', 'secondary')
      );
    }

    if (data.zh_tw) {
      const zh = data.zh_tw;
      self.set_zh_tw(
        key,
        _ternary(zh, 'pr', 'primary'),
        _ternary(zh, 'se', 'secondary')
      );
    }

    if (data.ja) {
      const ja = data.ja;
      self.set_ja(
        key,
        _ternary(ja, 'kan', 'kanji'),
        _ternary(ja, 'hira', 'hiragana'),
        _ternary(ja, 'kata', 'katakana')
      );
    }

    return self;
  };

  /**
   * @type {Setter}
   * @method module:locale/Localizer~LocalizerInterface#set
   */
  self.set = (key, locale, hash) => {
    if (!locale) throw new Error('No locale');
    if (!hash) {
      throw new Error(`No data given for: ${locale}`);
    }
    key = _validate_key(key);
    _datapack[key][locale] = hash;
    return self;
  };

  /**
   * This is a factory function.
   * @private
   * @function
   * @param {string} locale
   * @returns {SetterNormal}
   */
  const _normal_setter_factory =
    locale => (key, primary, secondary) => {
      key = _validate_key(key);
      _datapack[key][locale] = { primary, secondary };
      return self;
    };

  /**
   * @type {SetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#set_english
   */
  self.set_english = _normal_setter_factory('en');

  /**
   * @type {SetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#set_en
   */
  self.set_en = self.set_english;

  /**
   * @type {SetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#set_vietnamese
   */
  self.set_vietnamese = _normal_setter_factory('vi');

  /**
   * @type {SetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#set_vi
   */
  self.set_vi = self.set_vietnamese;

  /**
   * @type {SetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#set_chinese_simple
   */
  self.set_chinese_simple = _normal_setter_factory('zh_ch');

  /**
   * @type {SetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#set_zh_ch
   */
  self.set_zh_ch = self.set_chinese_simple;

  /**
   * @type {SetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#set_chinese_traditional
   */
  self.set_chinese_traditional =
    _normal_setter_factory('zh_tw');

  /**
   * @type {SetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#set_zh_tw
   */
  self.set_zh_tw = self.set_chinese_traditional;

  /**
   * @type {SetterJapanese}
   * @method module:locale/Localizer~LocalizerInterface#set_japanese
   */
  self.set_japanese = (key, kanji, hiragana, katakana) => {
    key = _validate_key(key);
    _datapack[key]['ja'] = {
      kanji: kanji ?? null,
      hiragana: hiragana ?? null,
      katakana: katakana ?? null,
    };
    return self;
  };

  /**
   * @type {SetterJapanese}
   * @method module:locale/Localizer~LocalizerInterface#ja
   */
  self.set_ja = self.set_japanese;

  /**
   * @type {Getter}
   * @method module:locale/Localizer~LocalizerInterface#get
   */
  self.get = (key, locale) => {
    if (!locale) throw new Error('No locale');
    key = _validate_key(key);
    return _datapack[key][locale] ?? null;
  };

  /**
   * This is a factory function.
   * @private
   * @function
   * @param {string} locale
   * @returns {GetterNormal}
   */
  const _normal_getter_factory = locale => key => {
    key = _validate_key(key);
    return _datapack[key][locale] ?? null;
  };

  /**
   * @type {GetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#get_english
   */
  self.get_english = _normal_getter_factory('en');

  /**
   * @type {GetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#en
   */
  // self.en = _normal_getter_factory('en');
  self.en = self.get_english;

  /**
   * @type {GetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#get_vietnamese
   */
  self.get_vietnamese = _normal_getter_factory('vi');

  /**
   * @type {GetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#vi
   */
  // self.vi = _normal_getter_factory('vi');
  self.vi = self.get_vietnamese;

  /**
   * @type {GetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#get_chinese_simple
   */
  self.get_chinese_simple = _normal_getter_factory('zh_ch');

  /**
   * @type {GetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#zh_ch
   */
  self.zh_ch = self.get_chinese_simple;

  /**
   * @type {GetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#get_chinese_traditional
   */
  self.get_chinese_traditional =
    _normal_getter_factory('zh_tw');

  /**
   * @type {GetterNormal}
   * @method module:locale/Localizer~LocalizerInterface#zh_tw
   */
  // self.zh_tw = _normal_getter_factory('zh_tw');
  self.zh_tw = self.get_chinese_traditional;

  /**
   * @type {GetterJapanese}
   * @method module:locale/Localizer~LocalizerInterface#get_japanese
   */
  self.get_japanese = _normal_getter_factory('ja');

  /**
   * @type {GetterJapanese}
   * @method module:locale/Localizer~LocalizerInterface#ja
   */
  self.ja = self.get_japanese;

  /**
   * This is a factory function.
   * @private
   * @function
   * @param {string} locale
   * @returns {GetterGenericValue}
   */
  const _generic_value_getter_factory = locale => key => {
    key = _validate_key(key);
    const hash = _datapack[key][locale];
    return hash?.primary ?? hash?.secondary;
  };

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#get_english_value
   */
  self.get_english_value =
    _generic_value_getter_factory('en');

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#get_vietnamese_value
   */
  self.get_vietnamese_value =
    _generic_value_getter_factory('vi');

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#get_chinese_simple_value
   */
  self.get_chinese_simple_value =
    _generic_value_getter_factory('zh_ch');

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#get_chinese_traditional_value
   */
  self.get_chinese_traditional_value =
    _generic_value_getter_factory('zh_tw');

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#get_japanese_value
   */
  self.get_japanese_value = key => {
    key = _validate_key(key);
    const hash = _datapack[key]['ja'];
    let value;
    if (hash) {
      value = hash.kanji;
      if (!value) {
        value = hash.hiragana;
      }
      if (!value) {
        value = hash.katakana;
      }
    }
    return value;
  };

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#en_value
   */
  self.en_value = self.get_english_value;

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#vi_value
   */
  self.vi_value = self.get_vietnamese_value;

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#zh_ch_value
   */
  self.zh_ch_value = self.get_chinese_simple_value;

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#zh_tw_value
   */
  self.zh_tw_value = self.get_chinese_traditional_value;

  /**
   * @type {GetterGenericValue}
   * @method module:locale/Localizer~LocalizerInterface#ja_value
   */
  self.ja_value = self.get_japanese_value;

  return Object.freeze(self);
};
// END OF: Localizer
