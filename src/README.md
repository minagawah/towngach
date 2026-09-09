# Source Modules

This directory contains the source modules of the Towngach library.

The current source structure is organized
around foundational concepts that can be
shared by multiple East Asian calendrical
and cosmological systems.
The primary calculation scope is
the "purple-white-nine-star"
(紫白九星 / cửu tinh tử bạch) system
and its movement through
the "nine-palaces" (九宮 / cửu cung).
Calculation methods are separated from
the underlying data structures so that
historically different traditions
can share common concepts
without being forced into the same algorithm.

The library does not treat every system called
"nine-stars" (九星 / cửu tinh) as the same system.
In particular, the "purple-white-nine-stars"
(紫白九星 / cửu tinh tử bạch) modeled
by this source tree are conceptually
distinct from the "nine-stars" (九星 / cửu tinh)
used by "qimen-dunjia" (奇門遁甲 / kỳ môn độn giáp).

## `constants.js`

Contains library-wide constants that do not belong
exclusively to a particular domain module.

Domain-specific constants should normally remain
inside their own modules. For example,
the "five-elements" (五行 / ngũ hành)
belong to `elem`, the "twelve-earthly-branches"
(十二地支 / thập nhị địa chi) belong to `branch`,
and the "purple-white-nine-stars"
(紫白九星 / cửu tinh tử bạch) belong to
`purple_white/star`.

## `types.js`

Contains shared typedefs used across
multiple source modules.

Types that belong clearly to a single domain
should remain in the file that owns that domain.
This file is intended only for genuinely
cross-cutting type definitions.

## `index.js`

Defines the top-level public exports of the library.

The public API should expose stable domain modules
and calculation methods while allowing internal
implementation details to remain private.

---

# Foundational Modules

## `branch/` (十二地支 / thập nhị địa chi)

Defines the Twelve Earthly Branches
(十二地支 / thập nhị địa chi).

### `branch/branch.js`

Defines:

- `Branch`
- `BRANCHES`
- `BRANCH_DEFINITIONS`
- `get_branches`
- `get_branch`
- `get_branch_index`
- `get_branch_definition`
- `is_branch`
- `shift_branch`

This module provides the canonical twelve-member
cyclic structure used by the sexagenary cycle
(六十干支 / lục thập hoa giáp) and by later
calendrical calculations.

Each branch definition keeps its canonical ID and
stable polarity while exposing localized `name`
presentation data through `Localizer`.

### `branch/index.js`

Exports the public API of the `branch` module.

---

## `calendar/` (calendar / lịch pháp)

Defines general calendar abstractions used by later
calendrical calculations.

The calendar module should remain independent from
any specific Purple-White method whenever possible.

`CalendarDate` represents an absolute UTC instant.
Object inputs without timezone information are
interpreted as UTC. Astronomy conversion preserves
that instant when creating sowngwala datetime values.

### `calendar/calendar.js`

Defines:

- `CalendarDate`
- `CalendarRange`
- `create_calendar_date`
- `is_calendar_date`
- `compare_calendar_dates`
- `is_calendar_date_in_range`
- `normalize_calendar_date`

This module provides a common date representation
that can later support sexagenary dates, Solar
Terms (節氣 / tiết khí), solstices (二至 / nhị chí),
and school-specific Purple-White boundaries.

### `calendar/index.js`

Exports the public API of the `calendar` module.

---

## `astronomy/` (astronomy / thiên văn)

Provides the Towngach-owned astronomy boundary
used by solar-term calculations.

The concrete sun-position math is delegated to
`sowngwala-js` through a narrow adapter layer.
Towngach code should depend on this module rather
than on the package directly.

The adapter passes UTC calendar fields to
sowngwala's timezone-free datetime type. Solar-term
occurrences therefore represent instants, not merely
Gregorian calendar dates.

### `astronomy/astronomy.js`

Defines:

- `get_sun_ecliptic_longitude`
- `get_solar_term_target_longitude`
- `search_longitude_boundary`

This module keeps the astronomy boundary separate
from the rest of the calendrical and Purple-White
logic.

### `astronomy/index.js`

Exports the public API of the `astronomy` module.

---

## `elem/` (五行 / ngũ hành)

Defines the Five Elements (五行 / ngũ hành).

### `elem/elem.js`

Defines:

- `Element`
- `ELEMENTS`
- `get_elements`
- `is_element`
- `shift_element`
- `get_generated_element`
- `get_controlled_element`

This module contains the Five Element identities and
their basic cyclical relationships.

It should remain a foundational data module rather than becoming dependent on
Purple-White calculations.

### `elem/index.js`

Exports the public API of the `elem` module.

---

## `stem/` (十天干 / thập thiên can)

Defines the Ten Heavenly Stems
(十天干 / thập thiên can).

### `stem/stem.js`

Defines:

- `Stem`
- `STEMS`
- `STEM_DEFINITIONS`
- `get_stems`
- `get_stem`
- `get_stem_index`
- `get_stem_definition`
- `is_stem`
- `shift_stem`

This module provides the canonical ten-member cyclic
structure used by the sexagenary cycle
(六十干支 / lục thập hoa giáp).

Each stem definition keeps its canonical ID,
polarity, and associated element while exposing
localized `name` presentation data.

### `stem/index.js`

Exports the public API of the `stem` module.

---

## `sexagen/` (六十干支 / lục thập hoa giáp)

Defines the sixty-member sexagenary cycle
(六十干支 / lục thập hoa giáp).

The `sexagen` module combines the foundational structures defined by `stem` and
`branch`.

### `sexagen/sexagen.js`

Defines:

- `Sexagen`
- `SexagenDefinition`
- `SEXAGEN`
- `SEXAGEN_DEFINITIONS`
- `get_sexagen`
- `get_sexagen_by_index`
- `get_sexagen_index`
- `get_sexagen_definition`
- `get_sexagen_by_stem_and_branch`
- `get_sexagen_stem`
- `get_sexagen_branch`
- `is_sexagen`
- `shift_sexagen`

This module represents the canonical sixty-unit cycle independently from the
question of how a particular calendar determines the sexagenary designation of
a specific date.

The latter question may require additional calendrical logic and should not be
silently embedded into the basic cycle definition.

### `sexagen/index.js`

Exports the public API of the `sexagen` module.

---

# Spatial and Cosmological Structures

## `palace/` (九宮 / cửu cung)

Defines the Nine Palaces (九宮 / cửu cung) as the
fundamental spatial structure used by Purple-White
calculations.

### `palace/palace.js`

Defines:

- `Palace`
- `PalaceDefinition`
- `PALACES`
- `get_palaces`
- `get_palace`
- `get_palace_index`
- `is_palace`
- `shift_palace`
- `get_palace_definition`

This module defines the Nine Palace identities and
their basic structural relationships.

Each palace definition keeps its canonical ID,
direction, and Luo Shu number while exposing
localized `name` presentation data.

It does not define Purple-White Stars or the method used to fly those stars.

### `palace/index.js`

Exports the public API of the `palace` module.

---

## `luoshu/` (洛書 / lạc thư)

Defines the Luoshu (洛書 / lạc thư) numerical
arrangement and its relationship to the Nine
Palaces (九宮 / cửu cung).

The Luoshu (洛書 / lạc thư) is kept separate from
the Purple-White Star module because it is a
foundational spatial and numerical structure,
whereas Purple-White Stars (紫白九星 / cửu tinh tử
bạch) are a separate system that moves through the
Nine Palaces (九宮 / cửu cung).

### `luoshu/luoshu.js`

Defines:

- `LuoshuPosition`
- `Luoshu`
- `LUOSHU`
- `get_luoshu`
- `get_luoshu_position`
- `get_luoshu_number`
- `get_luoshu_palace`
- `is_luoshu_number`

This module provides the canonical relationship between the Luoshu numbers and
the Nine Palace positions.

### `luoshu/index.js`

Exports the public API of the `luoshu` module.

---

# Calendrical Structures

## `san_yuan/` (三元 / tam nguyên)

Defines the conceptual structure of the Three Epochs
(三元 / tam nguyên).

The term "Three Epochs" (三元 / tam nguyên) is
shared by multiple historical systems, but its exact
temporal definition may differ depending on the
calculation method. Therefore, this module defines
the conceptual categories and common result
structures without deciding a universal calculation
rule.

### `san_yuan/san_yuan.js`

Defines:

- `SanYuan`
- `SAN_YUAN`
- `SAN_YUAN_DEFINITIONS`
- `SanYuanResult`
- `get_san_yuan`
- `is_san_yuan`
- `get_san_yuan_index`
- `get_san_yuan_definition`
- `shift_san_yuan`
- `create_san_yuan_result`

Method-specific code should determine how a particular date, year, month, or
hour is assigned to Upper, Middle, or Lower Epoch.

Each definition preserves its canonical ID and
exposes localized `name` presentation data.

### `san_yuan/index.js`

Exports the public API of the `san_yuan` module.

---

## `solar_term/` (二十四節氣 / nhị thập tứ tiết khí)

Defines the Twenty-Four Solar Terms
(二十四節氣 / nhị thập tứ tiết khí) and their
relationship to calendar dates.

This module provides the Solar Term identities
independently from the specific astronomical
implementation used to calculate the exact beginning
of each term.

Exact Solar Term occurrence is resolved through the
`astronomy/` boundary rather than through the solar
term identities themselves.

### `solar_term/solar_term.js`

Defines:

- `SolarTerm`
- `SolarTermOccurrence`
- `SOLAR_TERMS`
- `SOLAR_TERM_DEFINITIONS`
- `get_solar_terms`
- `get_solar_term`
- `get_solar_term_index`
- `get_solar_term_definition`
- `is_solar_term`
- `get_solar_term_for_date`
- `get_solar_term_start`
- `is_after_solar_term`

Exact Solar Term calculation may later depend on an
astronomical algorithm, ephemeris data, or another
supported calendrical source.

The module should provide a stable interface so that Purple-White methods can
depend on Solar Term boundaries without embedding astronomical calculations
directly inside every method.

Each Solar Term definition preserves its canonical
identity and exposes localized `name` presentation
data. A definition is not an occurrence or boundary
instant.

### `solar_term/index.js`

Exports the public API of the `solar_term` module.

---

# Purple-White Nine Stars

## `purple_white/` (紫白九星 / cửu tinh tử bạch)

Contains the shared Purple-White Nine Star
structures and the method-specific calculation
modules.

The shared modules define:

- the Purple-White system (紫白九星 / cửu tinh tử
  bạch);
- the nine stars (九星 / cửu tinh);
- the Nine Palace flight structure (九宮飛泊 /
  cửu cung phi bạc).

The `methods` directory defines calculation rules that may differ between
historical and modern traditions.

---

## `purple_white/purple_white.js`

Defines:

- `PurpleWhite`
- `PurpleWhiteResult`
- `PURPLE_WHITE`
- `get_purple_white`
- `is_purple_white_result`
- `create_purple_white_result`

This file defines the shared conceptual structure of Purple-White calculations
and the common result format used by method-specific calculations.

It should not contain the calculation rules of a particular school.

---

## `purple_white/star.js`

Defines:

- `PurpleWhiteStar`
- `PurpleWhiteStarDefinition`
- `PURPLE_WHITE_STARS`
- `PURPLE_WHITE_STAR_DEFINITIONS`
- `get_purple_white_stars`
- `get_purple_white_star`
- `get_purple_white_star_number`
- `get_purple_white_star_definition`
- `is_purple_white_star`
- `shift_purple_white_star`

This module defines the nine stars from One White
through Nine Purple and their stable properties.

The identities of the stars belong here. Their movement through the Nine
Palaces belongs to `flight.js`.

Each star definition keeps its canonical ID, number,
element, and color while exposing localized `name`
presentation data.

---

## `purple_white/flight.js`

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

This module provides the common structural logic
required to place the nine Purple-White Stars
(紫白九星 / cửu tinh tử bạch) through the Nine
Palaces (九宮 / cửu cung).

It is intentionally separated from the logic that determines the initial star
for a particular year, month, day, or hour.

A calculation method should first determine its starting conditions and then
use the shared flight structure where the method's rules permit it.

---

# Purple-White Calculation Methods

## `purple_white/methods/` (紫白九星 / cửu tinh tử bạch)

Contains method-specific Purple-White calculation
interfaces.

The method directories are separated because
different traditions may share the same Nine Palace
flight while differing in:

- calendrical boundaries;
- Three Epoch definitions (三元 / tam nguyên);
- initial stars;
- flight directions (順飛 / 逆飛 / thuận phi /
  nghịch phi);
- sexagenary-day rules (六十干支 / lục thập hoa
  giáp);
- Solar Term (節氣 / tiết khí) or solstice
  transitions (二至 / nhị chí).

The purpose of this structure is to allow shared foundational logic without
forcing historically distinct methods into a single universal algorithm.

---

## `purple_white/methods/classical/` (三元紫白 / tam nguyên tử bạch)

Contains the classical Three Epoch Purple-White
calculation interfaces.

### `classical/annual.js`

Defines:

- `calculate_classical_annual`

This function defines the classical annual method boundary.
It currently reports an unresolved-rule error because
the historical rule has not been specified.

### `classical/monthly.js`

Defines:

- `calculate_classical_monthly`

This function defines the classical monthly method boundary.
It currently reports an unresolved-rule error because
the historical rule has not been specified.

### `classical/daily.js`

Defines:

- `calculate_classical_daily`

This function defines the classical daily method boundary.
It currently reports an unresolved-rule error because
the historical rule has not been specified.

Its eventual implementation should explicitly
determine the relevant sexagenary cycle
(六十干支 / lục thập hoa giáp), Three Epoch
classification (三元 / tam nguyên), transition
rules, and starting conditions required by the
method.

### `classical/hourly.js`

Defines:

- `calculate_classical_hourly`

This function defines the classical hourly method boundary.
It currently reports an unresolved-rule error because
the historical rule has not been specified.

### `classical/index.js`

Exports the public APIs of the classical method.

---

## `purple_white/methods/houkan/` (方鑑 / 方鉴 / phương giám / ほうかん)

Owns the Houkan Purple-White calculation family.
mosaikekkan
It reuses the shared Purple-White result and flight structures from `purple_white/`, the
Nine Palaces (九宮 / cửu cung) from `palace/`, and the Luo Shu (洛書 /
lạc thư) ordering rather than duplicating them.

Solar-term (節氣 / tiết khí) timing comes from `solar_term/`, which in
turn uses the existing astronomy adapter and `sowngwala-js`. Monthly
periods therefore switch at the actual astronomical solar-term instant:
before the instant is the previous interval, and at or after it is the
new interval. This is the library's documented Houkan interpretation,
not a universal rule of every Purple-White tradition.

### `houkan/hourly.js`

Defines `calculate_houkan_hourly` and the inspectable hourly helpers.
For a 甲己 reference day, 子午卯酉 is 上元, 寅申巳亥 is 中元, and
辰戌丑未 is 下元. Yang Dun (陽遁 / 阳遁 / dương độn) starts at 一白,
七赤, 四緑; Yin Dun (陰遁 / 阴遁 / âm độn) starts at 九紫, 三碧, 六白.
Each origin is five days or sixty traditional double-hours, and one
star progresses for each double-hour. A new calendrical origin resets
to its prescribed starting configuration.

The 子 hour uses the examined 今夜/今暁 distinction. The implementation
does not assign the whole 子 hour uniformly to one civil date.

### `houkan/monthly.js`

`determine_houkan_monthly` exposes the actual solar-term boundary. The
final monthly starting-star rule is not yet established by the examined
material available to this repository, so `calculate_houkan_monthly`
fails explicitly rather than returning an inferred result.

### `houkan/daily.js`

The six documented daily periods are represented: winter solstice,
rain water, and grain rain use Yang Dun; summer solstice, limit of heat,
and frost descent use Yin Dun. Their Upper/Middle/Lower Yuan starting
stars are preserved. The historical daily 甲子 reference-point choice
remains unresolved, so `calculate_houkan_daily` explicitly throws when a
final star configuration would be required.

### `houkan/annual.js`

The examined material currently does not establish a Houkan-specific
annual starting-star rule. The function remains an explicit unresolved
boundary rather than silently substituting modern Kyusei logic.

The relevant historical material is associated with Matsura Kinkaku
(松浦琴鶴), Iida Tengai (飯田天涯), and Kikuchi Yosaku (菊池要佐久).
Comments and APIs distinguish their documented structures, library-level
interpretations, and unresolved historical questions.

---

## `purple_white/methods/modern_kyusei/` (九星気学 / cửu tinh khí học)

Contains calculation interfaces for the supported
modern Kyusei method family.

Modern Kyusei implementations may share a broad
Purple-White and Nine Palace foundation with earlier
traditions while using their own definitions of
year boundaries, monthly boundaries, daily
transitions, and other practical rules.

### `modern_kyusei/annual.js`

Defines:

- `calculate_modern_kyusei_annual`

The function currently reports an unresolved-rule error
until the modern Kyusei annual rule is specified.

### `modern_kyusei/monthly.js`

Defines:

- `calculate_modern_kyusei_monthly`

The function currently reports an unresolved-rule error
until the modern Kyusei monthly rule is specified.

### `modern_kyusei/daily.js`

Defines:

- `calculate_modern_kyusei_daily`

The function currently reports an unresolved-rule error
until the modern Kyusei daily rule is specified.

The eventual implementation should explicitly define
which sexagenary-day (六十干支 / lục thập hoa giáp)
and boundary rules are supported.

### `modern_kyusei/hourly.js`

Defines:

- `calculate_modern_kyusei_hourly`

The function currently reports an unresolved-rule error
until the modern Kyusei hourly rule is specified.

### `modern_kyusei/index.js`

Exports the public APIs of the modern Kyusei method.

---

## `purple_white/methods/index.js` (method families / phương pháp)

Exports the supported Purple-White method families.

This file should provide a stable entry point for selecting or importing a
specific method without requiring consumers to know the internal directory
layout.

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

Contains shared implementation utilities that do not
belong to a specific cosmological or calendrical
domain.

### `lib/Result.js`

Contains the library's shared result abstraction.

Domain modules may use this abstraction when they need to return successful
results, failures, validation errors, or other standardized outcomes.

### `lib/utils.js`

Contains general utility functions that can be shared across source modules.

Domain-specific rules should not be moved here merely
for reuse. A function should belong in `lib/utils.js`
only when it is genuinely independent of the domain
concepts represented by modules such as `elem`,
`sexagen`, `luoshu`, or `purple_white`.

---

# Localization

## `locale/` (localization / bản địa hóa)

Contains localization infrastructure.

Localization should provide human-readable representations of concepts without
changing the canonical identifiers used internally by the calculation modules.

### `locale/constants.js`

Contains localization-related constants.

### `locale/Localizer.js`

Defines the localization implementation used to
resolve library identifiers into human-readable
names or other localized representations.

### `locale/index.js`

Exports the public localization API.

---

# Type Definitions

## `d.ts/global.d.ts`

Contains global TypeScript declarations required by the source tree.

Additional domain-specific TypeScript definitions may eventually be generated
or maintained separately from the JavaScript source API.

---

# Tests

Each domain module contains an `__tests__` directory.

Tests should verify:

- canonical constant definitions;
- cyclic ordering;
- lookup functions;
- validation functions;
- structural relationships;
- method-specific calculation behavior once calculation implementations are
  added.

Foundational modules should be tested independently
from Purple-White methods (紫白九星 / cửu tinh tử
bạch) whenever possible.

Purple-White method tests (紫白九星 / cửu tinh tử
bạch) should distinguish between:

- shared structural behavior;
- method-specific boundary rules;
- historically distinct calculation results.

This distinction is important because two methods
may legitimately share the same Nine Palace flight
(九宮飛泊 / cửu cung phi bạc) while producing
different results because they use different
definitions of a calendrical boundary or Three Epoch
transition (三元 / tam nguyên).
