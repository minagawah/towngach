# Source Modules

This directory contains the source modules of the Towngach library.

The current source structure is organized around foundational concepts that can be shared by multiple East Asian calendrical and cosmological systems. The primary calculation scope is the "purple-white-nine-star" (紫白九星 / cửu tinh tử bạch) system and its movement through the "nine-palaces" (九宮 / cửu cung). Calculation methods are separated from the underlying data structures so that historically different traditions can share common concepts without being forced into the same algorithm.

The library does not treat every system called "nine-stars" (九星 / cửu tinh) as the same system. In particular, the "purple-white-nine-stars" (紫白九星 / cửu tinh tử bạch) modeled by this source tree are conceptually distinct from the "nine-stars" (九星 / cửu tinh) used by "qimen-dunjia" (奇門遁甲 / kỳ môn độn giáp).

## Top-level entries

### `constants.js`

Contains library-wide constants that do not belong exclusively to a particular domain module.

Domain-specific constants should normally remain inside their own modules. For example, the "five-elements" (五行 / ngũ hành) belong to `elem`, the "twelve-earthly-branches" (十二地支 / thập nhị địa chi) belong to `branch`, and the "purple-white-nine-stars" (紫白九星 / cửu tinh tử bạch) belong to `purple_white/core/nine_stars`.

### `types.js`

Contains shared typedefs used across multiple source modules.

Types that belong clearly to a single domain should remain in the file that owns that domain. This file is intended only for genuinely cross-cutting type definitions.

### `index.js`

Defines the top-level public exports of the library.

The public API should expose stable domain modules and calculation methods while allowing internal implementation details to remain private.

---

# Foundational Modules

## `elem/` (五行 / ngũ hành)

Defines the Five Elements (五行 / ngũ hành) — the five cyclical phases of wood, fire, earth, metal, and water. Each element generates the next in the cycle and controls a second-step element, forming the foundational generative and controlling relationships used throughout East Asian cosmology.

### `elem/elem.js`

Defines:

- `Element` — canonical element key (`wood`, `fire`, `earth`, `metal`, `water`).
- `ElementDefinition` — per-element metadata (key, index, generation, control, localized name, season, color).
- `ELEMENTS` — frozen canonical array in cyclic order.
- `ELEMENT` — first element (`wood`).
- `ELEMENT_NAMES` — localized name map keyed by element.
- `ELEMENT_DEFINITIONS` — frozen array of per-element metadata, built at module load time.

Functions:

- `get_elements()` — returns the canonical element array.
- `get_element(index)` — returns element at a cyclic index.
- `get_element_index(element)` — returns the canonical index of an element.
- `get_element_definition(element)` — returns full metadata for an element.
- `is_element(value)` — validates whether a value is a valid element.
- `shift_element(element, offset)` — shifts an element forward or backward through the cycle.
- `get_generated_element(element)` — returns the element this one generates.
- `get_controlled_element(element)` — returns the element this one controls.

This module uses `create_cycle` from `lib/cycle` for cyclic iteration and `set_multi_helper` from `locale` for localization. Each element carries three localization dimensions — name, season, and color — across English, Vietnamese, Simplified Chinese, Traditional Chinese, and Japanese (kanji, hiragana, katakana).

### `elem/index.js`

Exports the public API of the `elem` module.

---

## `stem/` (十天干 / thập thiên can)

Defines the Ten Heavenly Stems (十天干 / thập thiên can) — the ten cyclic characters used in the sexagenary cycle. Each stem carries a polarity (yang/yin) and an associated Five Element, making it a bridge between the stem system and the element system.

### `stem/stem.js`

Defines:

- `Stem` — canonical stem key.
- `STEMS` — frozen canonical array of ten stems in order.
- `STEM` — first stem (`jia`).
- `STEM_ELEMENTS` — frozen array mapping each stem index to its associated element.
- `STEM_DEFINITIONS` — frozen array of per-stem metadata (key, index, polarity, element, localized name).
- `STEM_NAMES` — localized name map keyed by stem.

Functions:

- `get_stems()` — returns the canonical stem array.
- `get_stem(index)` — returns stem at a cyclic index.
- `get_stem_index(stem)` — returns the canonical index of a stem.
- `get_stem_definition(stem)` — returns full metadata for a stem.
- `is_stem(value)` — validates whether a value is a valid stem.
- `shift_stem(stem, offset)` — shifts a stem through the cycle.

### `stem/index.js`

Exports the public API of the `stem` module.

---

## `branch/` (十二地支 / thập nhị địa chi)

Defines the Twelve Earthly Branches (十二地支 / thập nhị địa chi) — the twelve cyclic symbols paired with stems to form the sixty-member sexagenary cycle. Each branch carries a polarity (yang/yin).

### `branch/branch.js`

Defines:

- `Branch` — canonical branch key.
- `BRANCHES` — frozen canonical array of twelve branches in order.
- `BRANCH` — first branch (`zi`).
- `BRANCH_DEFINITIONS` — frozen array of per-branch metadata (key, index, polarity, localized name).
- `BRANCH_NAMES` — localized name map keyed by branch.

Functions:

- `get_branches()` — returns the canonical branch array.
- `get_branch(index)` — returns branch at a cyclic index.
- `get_branch_index(branch)` — returns the canonical index of a branch.
- `get_branch_definition(branch)` — returns full metadata for a branch.
- `is_branch(value)` — validates whether a value is a valid branch.
- `shift_branch(branch, offset)` — shifts a branch through the cycle.

### `branch/index.js`

Exports the public API of the `branch` module.

---

## `sexagen/` (六十干支 / lục thập hoa giáp)

Defines the sixty-member sexagenary cycle (六十干支 / lục thập hoa giáp) — the repeating sequence formed by pairing the ten Heavenly Stems with the twelve Earthly Branches. This cycle is foundational for dating, astrological analysis, and determining the governing rules of divination methods.

### `sexagen/sexagen.js`

Defines:

- `Sexagen` — canonical sexagen key (e.g. `"jia_zi"`).
- `SexagenDefinition` — per-sexagen metadata (key, stem, branch, index).
- `SEXAGEN` — frozen canonical array of 60 members, generated via `Array.from` from stem and branch combinations.
- `SEXAGENARY_CYCLE` — first sexagen (`jia_zi`).
- `SEXAGEN_DEFINITIONS` — frozen array of per-sexagen metadata, derived from the `SEXAGEN` array.

Functions:

- `get_sexagen()` — returns the canonical sexagen array.
- `get_sexagen_by_index(index)` — returns the sexagen at a given index (0–59).
- `get_sexagen_index(sexagen)` — returns the canonical index of a sexagen.
- `get_sexagen_definition(sexagen)` — returns full metadata for a sexagen.
- `is_sexagen(value)` — validates whether a value is a valid sexagen.
- `shift_sexagen(sexagen, offset)` — shifts a sexagen forward or backward through the 60-member cycle.
- `get_sexagen_stem(sexagen)` — returns the Heavenly Stem for a sexagen.
- `get_sexagen_branch(sexagen)` — returns the Earthly Branch for a sexagen.
- `get_sexagen_by_stem_and_branch(stem, branch)` — returns the sexagen key formed by a given stem–branch pair.

The module uses `create_cycle` from `lib/cycle` for cyclic operations. The `SEXAGEN` array is the source of truth; `SEXAGEN_DEFINITIONS` is derived from it. The module does not embed calendar logic — determining the sexagenary designation of a specific date requires additional calendrical machinery outside this module.

### `sexagen/index.js`

Exports the public API of the `sexagen` module.

---

## `calendar/` (calendar / lịch pháp)

Defines general calendar abstractions used by later calendrical calculations.

The calendar module should remain independent from any specific Purple-White method whenever possible.

`CalendarDate` represents an absolute UTC instant. Object inputs without timezone information are interpreted as UTC. Astronomy conversion preserves that instant when creating sowngwala datetime values.

### `calendar/calendar.js`

Defines:

- `CalendarDate`
- `CalendarRange`
- `create_calendar_date`
- `is_calendar_date`
- `compare_calendar_dates`
- `is_calendar_date_in_range`
- `normalize_calendar_date`

This module provides a common date representation that can later support sexagenary dates, Solar Terms (節氣 / tiết khí), solstices (二至 / nhị chí), and school-specific Purple-White boundaries.

### `calendar/index.js`

Exports the public API of the `calendar` module.

---

## `astronomy/` (astronomy / thiên văn)

Provides the Towngach-owned astronomy boundary used by solar-term calculations.

The concrete sun-position math is delegated to `sowngwala-js` through a narrow adapter layer. Towngach code should depend on this module rather than on the package directly.

The adapter passes UTC calendar fields to sowngwala's timezone-free datetime type. Solar-term occurrences therefore represent instants, not merely Gregorian calendar dates.

### `astronomy/astronomy.js`

Defines:

- `get_sun_ecliptic_longitude`
- `get_solar_term_target_longitude`
- `search_longitude_boundary`

This module keeps the astronomy boundary separate from the rest of the calendrical and Purple-White logic.

### `astronomy/index.js`

Exports the public API of the `astronomy` module.

---

# Spatial and Cosmological Structures

## `palace/` (九宮 / cửu cung)

Defines the Nine Palaces (九宮 / cửu cung) as the fundamental spatial structure used by Purple-White calculations. Each palace has a canonical key, a compass direction, and a Luo Shu number.

### `palace/palace.js`

Defines:

- `Palace` — canonical palace key (e.g. `qian`, `kun`, `zhen`).
- `PalaceDefinition` — per-palace metadata (key, index, direction, Luoshu number, localized name).
- `PALACES` — frozen canonical array of nine palaces.
- `PALACE` — first palace (`qian`).
- `PALACE_DEFINITIONS` — frozen array of per-palace metadata.

Functions:

- `get_palaces()` — returns the canonical palace array.
- `get_palace(index)` — returns palace at a cyclic index.
- `get_palace_index(palace)` — returns the canonical index of a palace.
- `get_palace_definition(palace)` — returns full metadata for a palace.
- `is_palace(value)` — validates whether a value is a valid palace.
- `shift_palace(palace, offset)` — shifts a palace through the cycle.

### `palace/index.js`

Exports the public API of the `palace` module.

---

## `luoshu/` (洛書 / lạc thư)

Defines the Luoshu (洛書 / lạc thư) numerical arrangement and its relationship to the Nine Palaces (九宮 / cửu cung).

The Luoshu is a 3×3 magic square in which every row, column, and diagonal sums to 15. It provides the numerical scaffold that maps numbers to palace positions. This module is kept separate from the Purple-White Star module because the Luoshu is a foundational spatial and numerical structure, whereas Purple-White Stars (紫白九星 / cửu tinh tử bạch) are a separate system that moves through the Nine Palaces.

### `luoshu/luoshu.js`

Defines:

- `LuoshuLayout` — 3×2D array representing the Luoshu grid.
- `LuoshuPosition` — object with `number`, `palace`, `row`, and `column`.
- `Luoshu` — composite object containing `layout` and `positions`.
- `LUOSHU` — frozen composite with the canonical layout and position data.

Functions:

- `get_luoshu()` — returns the complete Luoshu object.
- `get_luoshu_position(number)` — returns the position metadata for a Luoshu number.
- `get_luoshu_number(palace)` — returns the Luoshu number for a palace.
- `get_luoshu_palace(number)` — returns the palace key for a Luoshu number.
- `is_luoshu_number(value)` — validates whether a value is a valid Luoshu number (1–9).

### `luoshu/index.js`

Exports the public API of the `luoshu` module.

---

# Calendrical Structures

## `san_yuan/` (三元 / tam nguyên)

Defines the conceptual structure of the Three Epochs (三元 / tam nguyên) — the division of time into Upper (上元), Middle (中元), and Lower (下元) periods. This concept is shared across multiple historical systems, but the exact temporal boundaries of each epoch differ by method. This module defines only the conceptual categories and result structures, leaving boundary rules to method-specific code.

### `san_yuan/san_yuan.js`

Defines:

- `SanYuan` — canonical epoch key (`upper`, `middle`, `lower`).
- `SanYuanDefinition` — per-epoch metadata (key, index, localized name).
- `SanYuanResult` — method-specific result wrapper.
- `SAN_YUAN` — frozen canonical array of three epochs.
- `SAN_YUAN_DEFINITIONS` — frozen array of per-epoch metadata.

Functions:

- `get_san_yuan()` — returns the canonical epoch array.
- `is_san_yuan(value)` — validates whether a value is a valid epoch.
- `get_san_yuan_index(san_yuan)` — returns the canonical index of an epoch.
- `get_san_yuan_definition(san_yuan)` — returns full metadata for an epoch.
- `shift_san_yuan(san_yuan, offset)` — shifts an epoch through the cycle.
- `create_san_yuan_result(value)` — creates a normalized Three Epoch result.

### `san_yuan/index.js`

Exports the public API of the `san_yuan` module.

---

## `solar_term/` (二十四節氣 / nhị thập tứ tiết khí)

Defines the Twenty-Four Solar Terms (二十四節氣 / nhị thập tứ tiết khí) and their relationship to calendar dates. Each solar term corresponds to a specific ecliptic longitude of the Sun, making its occurrence an exact astronomical instant rather than a fixed calendar date.

This module provides the Solar Term identities independently from the specific astronomical implementation used to calculate the exact beginning of each term. Exact Solar Term occurrence is resolved through the `astronomy/` boundary rather than through the solar term identities themselves.

### `solar_term/solar_term.js`

Defines:

- `SolarTerm` — canonical term key (e.g. `lichun`, `dongzhi`).
- `SolarTermOccurrence` — object with `date` (Date) and `solar_term` (key).
- `SOLAR_TERMS` — frozen canonical array of 24 terms.
- `SOLAR_TERM` — first term (`lichun`).
- `SOLAR_TERM_DEFINITIONS` — frozen array of per-term metadata.

Functions:

- `get_solar_terms()` — returns the canonical solar term array.
- `get_solar_term(index)` — returns the solar term at a given index (0–23).
- `get_solar_term_index(solar_term)` — returns the canonical index of a solar term.
- `get_solar_term_definition(solar_term)` — returns full metadata for a solar term.
- `is_solar_term(value)` — validates whether a value is a valid solar term.
- `get_solar_term_for_date(date)` — returns the solar term occurring on a given date.
- `get_solar_term_start(solar_term, year)` — returns the exact start moment of a solar term in a given year.
- `is_after_solar_term(date, solar_term)` — checks whether a date falls on or after a solar term's start.

### `solar_term/index.js`

Exports the public API of the `solar_term` module.

---

# Purple-White Nine Stars

## `purple_white/` (紫白九星 / cửu tinh tử bạch)

Contains the shared Purple-White Nine Star structures and the method-specific calculation modules.

The shared modules define:

- the Purple-White system (紫白九星 / cửu tinh tử bạch);
- the nine stars (九星 / cửu tinh);
- the Nine Palace flight structure (九宮飛泊 / cửu cung phi bạc).

The `methods` directory defines calculation rules that may differ between historical and modern traditions.

---

## `purple_white/core/utils/purple_white.js`

Defines:

- `PurpleWhite`
- `PurpleWhiteResult`
- `PURPLE_WHITE`
- `get_purple_white`
- `is_purple_white_result`
- `create_purple_white_result`

This file defines the shared conceptual structure of Purple-White calculations and the common result format used by method-specific calculations.

It should not contain the calculation rules of a particular school.

---

## `purple_white/core/nine_stars/star.js`

Defines:

- `PurpleWhiteStar` — canonical star key (e.g. `one_white`, `two_black`).
- `PurpleWhiteStarDefinition` — per-star metadata (key, number, element, color, localized name).
- `PURPLE_WHITE_STARS` — frozen canonical array of nine stars.
- `STAR` — first star.
- `PURPLE_WHITE_STAR_DEFINITIONS` — frozen array of per-star metadata.

Functions:

- `get_purple_white_stars()` — returns the canonical star array.
- `get_purple_white_star(number)` — returns a star by its number (1–9).
- `get_purple_white_star_number(star)` — returns the number of a star.
- `get_purple_white_star_index(star)` — returns the canonical index of a star.
- `get_purple_white_star_definition(star)` — returns full metadata for a star.
- `is_purple_white_star(value)` — validates whether a value is a valid star.
- `shift_purple_white_star(star, offset)` — shifts a star through the cycle.

Each star definition keeps its canonical ID, number, element, and color while exposing localized name presentation data.

---

## `purple_white/core/movement/flight.js`

Defines:

- `FlightDirection`
- `FLIGHT_DIRECTIONS`
- `PurpleWhiteFlight`
- `is_flight_direction`
- `reverse_flight_direction`
- `create_purple_white_flight`
- `get_flight_star`
- `get_flight_palace`
- `is_purple_white_flight`

This module provides the common structural logic required to place the nine Purple-White Stars (紫白九星 / cửu tinh tử bạch) through the Nine Palaces (九宮 / cửu cung).

It is intentionally separated from the logic that determines the initial star for a particular year, month, day, or hour.

A calculation method should first determine its starting conditions and then use the shared flight structure where the method's rules permit it.

---

# Purple-White Calculation Methods

## `purple_white/core/` (shared foundations / 共用基礎)

Contains reusable Purple-White foundations that do not select a historical calculation method.

### `core/nine_stars/`

Contains the localized Purple-White Nine Star (紫白九星 / cửu tinh tử bạch) definitions and cyclic star operations.

### `core/movement/`

Contains reusable Nine Palace flight (九宮飛泊 / cửu cung phi bạc) structures. It determines how a supplied starting star moves; it does not determine that star.

### `core/utils/`

Contains Purple-White result normalization and the explicit unresolved-rule error helper.

The existing general-purpose `palace/` and `luoshu/` modules remain outside this tree and are reused directly. No redundant wrapper is created for them.

## `purple_white/methods/` (紫白九星 / cửu tinh tử bạch)

Contains identifiable method-specific Purple-White calculation interfaces.

The method directories are separated because different traditions may share the same Nine Palace flight while differing in:

- calendrical boundaries;
- Three Epoch definitions (三元 / tam nguyên);
- initial stars;
- flight directions (順飛 / 逆飛 / thuận phi / nghịch phi);
- sexagenary-day rules (六十干支 / lục thập hoa giáp);
- Solar Term (節氣 / tiết khí) or solstice transitions (二至 / nhị chí).

The purpose of this structure is to allow shared foundational logic without forcing historically distinct methods into one universal algorithm.

---

## `purple_white/methods/houkan/` (方鑑 / 方鉴 / phương giám / ほうかん)

Owns the Houkan Purple-White calculation family. It reuses the shared Purple-White result and flight structures from `purple_white/`, the Nine Palaces (九宮 / cửu cung) from `palace/`, and the Luo Shu (洛書 / lạc thư) ordering rather than duplicating them.

Solar-term (節氣 / tiết khí) timing comes from `solar_term/`, which in turn uses the existing astronomy adapter and `sowngwala-js`. Monthly periods therefore switch at the actual astronomical solar-term instant: before the instant is the previous interval, and at or after it is the new interval. This is the library's documented Houkan interpretation, not a universal rule of every Purple-White tradition.

### `houkan/hourly.js`

Defines `calculate_houkan_hourly` and the inspectable hourly helpers. For a 甲己 reference day, 子午卯酉 is 上元, 寅申巳亥 is 中元, and 辰戌丑未 is 下元. Yang Dun (陽遁 / 阳遁 / dương độn) starts at 一白, 七赤, 四緑; Yin Dun (陰遁 / 阴遁 / âm độn) starts at 九紫, 三碧, 六白. Each origin is five days or sixty traditional double-hours, and one star progresses for each double-hour. A new calendrical origin resets to its prescribed starting configuration.

The 子 hour uses the examined 今夜/今暁 distinction. The implementation does not assign the whole 子 hour uniformly to one civil date.

### `houkan/monthly.js`

`determine_houkan_monthly` exposes the actual solar-term boundary. The final monthly starting-star rule is not yet established by the examined material available to this repository, so `calculate_houkan_monthly` fails explicitly rather than returning an inferred result.

### `houkan/daily.js`

The six documented daily periods are represented: winter solstice, rain water, and grain rain use Yang Dun; summer solstice, limit of heat, and frost descent use Yin Dun. Their Upper/Middle/Lower Yuan starting stars are preserved. The historical daily 甲子 reference-point choice remains unresolved, so `calculate_houkan_daily` explicitly throws when a final star configuration would be required.

### `houkan/annual.js`

The examined material currently does not establish a Houkan-specific annual starting-star rule. The function remains an explicit unresolved boundary rather than silently substituting modern Kigaku logic.

The relevant historical material is associated with Matsura Kinkaku (松浦琴鶴), Iida Tengai (飯田天涯), and Kikuchi Yosaku (菊池要佐久). Comments and APIs distinguish their documented structures, library-level interpretations, and unresolved historical questions.

---

## `purple_white/methods/kigaku/` (九星気学 / 九星氣學 / 九星气学 / jiu-xing-qi-xue / cửu tinh khí học)

Contains the modern Nine-Star Kigaku method family. Its annual and monthly modules reuse shared astronomical boundary and cyclic-star infrastructure. Daily and hourly rules remain explicit unresolved boundaries until their method-specific rules are formally specified; they do not inherit Mizuno rules.

Exports `calculate_kigaku_annual`, `calculate_kigaku_monthly`, `calculate_kigaku_daily`, and `calculate_kigaku_hourly`.

## `purple_white/methods/mizuno/` (Mizuno-style Kigaku)

Contains the primary current Mizuno-style Kigaku family. It shares annual and monthly calculations with modern Kigaku, but its daily calculation switches Yang and Yin at the exact astronomical Winter and Summer Solstice instants. Its hourly calculation uses Solar Term groups and the twelve traditional double-hour indices rather than a Heavenly-Stem-derived starting star.

Exports `calculate_mizuno_annual`, `calculate_mizuno_monthly`, `calculate_mizuno_daily`, and `calculate_mizuno_hourly`.

---

## `purple_white/methods/index.js` (method families / phương pháp)

Exports the supported Purple-White method families.

This file should provide a stable entry point for selecting or importing a specific method without requiring consumers to know the internal directory layout.

---

## `purple_white/index.js` (紫白九星 / cửu tinh tử bạch)

Exports the public Purple-White API, including:

- shared Purple-White definitions;
- star definitions;
- flight structures;
- supported method families.

---

# Shared Library Utilities

## `lib/` (utilities / tiện ích)

Contains shared implementation utilities that do not belong to a specific cosmological or calendrical domain.

### `lib/Result.js`

Contains the library's shared result abstraction.

Domain modules may use this abstraction when they need to return successful results, failures, validation errors, or other standardized outcomes.

### `lib/cycle.js`

Contains `create_cycle`, a factory that produces a cyclic iterator object with methods `get(index)`, `get_all()`, `index_of(value)`, `is(value)`, and `shift(value, offset)`. This is the shared cyclic iteration primitive used by all domain modules (elem, stem, branch, sexagen, palace, solar_term, star) in place of manual modulo arithmetic.

### `lib/utils.js`

Contains general utility functions that can be shared across source modules.

Domain-specific rules should not be moved here merely for reuse. A function should belong in `lib/utils.js` only when it is genuinely independent of the domain concepts represented by modules such as `elem`, `sexagen`, `luoshu`, or `purple_white`.

---

# Localization

## `locale/` (localization / bản địa hóa)

Contains localization infrastructure.

Localization should provide human-readable representations of concepts without changing the canonical identifiers used internally by the calculation modules.

Each domain module uses `set_multi_helper` from `locale/index.js` to convert raw localization tuples — `[key, en, vi, zh_ch, zh_tw, kan, hira, kata]` — into a structured map keyed by the domain's canonical identifier. The `.map()` transform on each tuple produces an object with `key` and a nested `name` field containing locale-specific values. English, Vietnamese, and Chinese entries carry a `pr` (pronunciation/term) field; Japanese entries carry separate `kan` (kanji), `hira` (hiragana), and `kata` (katakana) fields.

### `locale/constants.js`

Contains localization-related constants.

### `locale/Localizer.js`

Defines the localization implementation used to resolve library identifiers into human-readable names or other localized representations.

### `locale/index.js`

Exports the public localization API, including `set_multi_helper`.

---

# Type Definitions

## `d.ts/global.d.ts`

Contains global TypeScript declarations required by the source tree.

Additional domain-specific TypeScript definitions may eventually be generated or maintained separately from the JavaScript source API.

---

# Tests

Each domain module contains an `__tests__` directory.

Tests should verify:

- canonical constant definitions;
- cyclic ordering;
- lookup functions;
- validation functions;
- structural relationships;
- method-specific calculation behavior once calculation implementations are added.

Foundational modules should be tested independently from Purple-White methods (紫白九星 / cửu tinh tử bạch) whenever possible.

Purple-White method tests (紫白九星 / cửu tinh tử bạch) should distinguish between:

- shared structural behavior;
- method-specific boundary rules;
- historically distinct calculation results.

This distinction is important because two methods may legitimately share the same Nine Palace flight (九宮飛泊 / cửu cung phi bạc) while producing different results because they use different definitions of a calendrical boundary or Three Epoch transition (三元 / tam nguyên).
