# Implemented Programs

This directory contains the source modules
of the Towngach library.

The current source structure is organized
around foundational concepts that can be
shared by multiple East Asian calendrical
and cosmological systems.

The primary calculation scope is
the **"Purple-White Nine Star"**
(紫白九星 / cửu tinh tử bạch) system
and its movement through the
**"Nine Palaces"** (九宮 / cửu cung).

Calculation methods are separated from
the underlying data structures so that
historically different traditions can
share common concepts without being
forced into the same algorithm.

The library does not treat every system
called **"Nine Stars"** (九星 / jiu-xing /
cửu tinh) as the same system. In particular,
the **"Purple-White Nine Stars"** (紫白九星)
modeled by this source tree are conceptually
distinct from the **"Nine Stars"** (九星 /
jiu-xing / cửu tinh) used by
**"Qi-Men Dun-Jia"** (奇門遁甲 / 奇门遁甲 /
qi-men-dun-jia / kỳ môn độn giáp).

## Top-level entries

### `constants.js`

Contains library-wide constants that do not
belong exclusively to a particular domain module.

Domain-specific constants should normally remain
inside their own modules. For example, the
**"Five Elements"** (五行 / wu-xing / ngũ hành)
belong to `elem`, the **"12 Earthly Branches"**
(十二地支 / shi-er-di-zhi / thập nhị địa chi)
belong to `branch`, and the
**"Purple-White Nine Stars"** (紫白九星) belong
to `purple_white/core/nine_stars`.

### `types.js`

Contains shared typedefs used across
multiple source modules.

Types that belong clearly to a single domain
should remain in the file that owns that domain.
This file is intended only for genuinely
cross-cutting type definitions.

### `index.js`

Defines the top-level public exports of the library.

The public API should expose stable domain
modules and calculation methods while allowing
internal implementation details to remain private.

---

# Foundational Modules

## `elem/` (五行 / ngũ hành)

Defines the **"Five Elements"** (五行 / ngũ hành)
&mdash; the 5 cyclical phases of **"Wood"**,
**"Fire"**, **"Earth"**, **"Metal"**, and **"Water"**.
Each element generates the next in the cycle
and controls a second-step element, forming
the foundational generative and controlling
relationships used throughout East Asian cosmology.

### `elem/elem.js`

Defines:

- `Element` — canonical element key
  (`wood`, `fire`, `earth`, `metal`, `water`).
- `ElementDefinition` — per-element metadata
  (key, index, generation, control, localized name, season, color).
- `ELEMENTS` — frozen canonical array in cyclic order.
- `ELEMENT` — first element (`wood`).
- `ELEMENT_NAMES` — localized name map keyed by element.
- `ELEMENT_DEFINITIONS` — frozen array of per-element
  metadata, built at module load time.

Functions:

- `get_elements()` — returns the canonical element array.
- `get_element(index)` — returns element at a cyclic index.
- `get_element_index(element)` — returns the canonical index of an element.
- `get_element_definition(element)` — returns full metadata for an element.
- `is_element(value)` — validates whether a value is a valid element.
- `shift_element(element, offset)` — shifts an element forward
  or backward through the cycle.
- `get_generated_element(element)` — returns the element this one generates.
- `get_controlled_element(element)` — returns the element this one controls.

This module uses `create_cycle` from `lib/cycle`
for cyclic iteration and `set_multi_helper`
from `locale` for localization. Each element
carries three localization dimensions &mdash;
name, season, and color &mdash; across English,
Vietnamese, Simplified Chinese, Traditional
Chinese, and Japanese (kanji, hiragana, katakana).

### `elem/index.js`

Exports the public API of the `elem` module.

---

## `stem/` (十天干 / shi-tian-gan / thập thiên can)

Defines the **"10 Heavenly Stems"** (十天干 /
shi-tian-gan / thập thiên can) &mdash;
the 10 cyclic characters used in the
**"Sixty Gan-Zhi Unit"**. Each stem carries
a polarity (**Yin**/**Yang**) and an associated
**"Five Element"**, making it a bridge between
the stem system and the element system.

### `stem/stem.js`

Defines:

- `Stem` — canonical stem key.
- `STEMS` — frozen canonical array of 10 stems in order.
- `STEM` — first stem (`jia`).
- `STEM_ELEMENTS` — frozen array mapping
  each stem index to its associated element.
- `STEM_DEFINITIONS` — frozen array of per-stem
  metadata (key, index, polarity, element, localized name).
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

## `branch/` (十二地支 / shi-er-di-zhi / thập nhị địa chi)

Defines the **"12 Earthly Branches"** (十二地支 /
shi-er-di-zhi / thập nhị địa chi) &mdash;
the 12 cyclic symbols paired with **"Stems"**
to form the 60-member **"Sixty Gan-Zhi Unit"**.
Each branch carries a polarity (**Yin**/**Yang**).

### `branch/branch.js`

Defines:

- `Branch` — canonical branch key.
- `BRANCHES` — frozen canonical array of
  12 branches in order.
- `BRANCH` — first branch (`zi`).
- `BRANCH_DEFINITIONS` — frozen array of per-branch
  metadata (key, index, polarity, localized name).
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

## `sexagen/` (六十干支 / 六十花甲 / liu-shi-gan-zhi / lục thập hoa giáp)

Defines the 60-member **"Sixty Gan-Zhi Unit"**
(六十干支) &mdash; the repeating sequence formed
by pairing the **"10 Heavenly Stems"** with
the **"12 Earthly Branches"**. This cycle is
foundational for dating, astrological analysis,
and determining the governing rules
of divination methods.

### `sexagen/sexagen.js`

Defines:

- `Sexagen` — canonical sexagen key (e.g. `"jia_zi"`).
- `SexagenDefinition` — per-sexagen metadata
  (key, stem, branch, index).
- `SEXAGEN` — frozen canonical array of 60 members,
  generated via `Array.from` from stem and branch combinations.
- `SEXAGENARY_CYCLE` — first sexagen (`jia_zi`).
- `SEXAGEN_DEFINITIONS` — frozen array of per-sexagen
  metadata, derived from the `SEXAGEN` array.

Functions:

- `get_sexagen()` — returns the canonical sexagen array.
- `get_sexagen_by_index(index)` — returns the sexagen at a given index (0–59).
- `get_sexagen_index(sexagen)` — returns the canonical index of a sexagen.
- `get_sexagen_definition(sexagen)` — returns full metadata for a sexagen.
- `is_sexagen(value)` — validates whether a value is a valid sexagen.
- `shift_sexagen(sexagen, offset)` — shifts a sexagen forward
  or backward through the 60-member cycle.
- `get_sexagen_stem(sexagen)` — returns the **"Heavenly Stem"** for a sexagen.
- `get_sexagen_branch(sexagen)` — returns the **"Earthly Branch"** for a sexagen.
- `get_sexagen_by_stem_and_branch(stem, branch)` — returns the sexagen key formed by a given stem–branch pair.

The module uses `create_cycle` from `lib/cycle`
for cyclic operations. The `SEXAGEN` array is
the source of truth; `SEXAGEN_DEFINITIONS`
is derived from it. The module does not embed
calendar logic &mdash; determining the
**"Sixty Gan-Zhi"** designation of a specific
date requires additional calendrical machinery
outside this module.

### `sexagen/index.js`

Exports the public API of the `sexagen` module.

---

## `calendar/` (calendar / lịch pháp)

Defines general calendar abstractions used
by later calendrical calculations.

The calendar module should remain independent
from any specific **"Purple-White"** method
whenever possible.

`CalendarDate` represents an absolute UTC instant.
Object inputs without timezone information
are interpreted as UTC. Astronomy conversion
preserves that instant when creating
**"Sowngwala"** datetime values.

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
that can later support **"Sixty Gan-Zhi"** dates,
**"Solar Terms"** (節氣 / 节气 / jie-qi / tiết khí),
**"solstices"** (二至 / er-zhi / nhị chí), and
school-specific **"Purple-White"** boundaries.

### `calendar/index.js`

Exports the public API of the `calendar` module.

---

## `astronomy/` (astronomy / thiên văn)

Provides the Towngach-owned astronomy boundary
used by solar-term calculations.

The concrete sun-position math is delegated
to `sowngwala-js` through a narrow adapter layer.
Towngach code should depend on this module
rather than on the package directly.

The adapter passes UTC calendar fields to
sowngwala's timezone-free datetime type.
Solar-term occurrences therefore represent
instants, not merely Gregorian calendar dates.

### `astronomy/astronomy.js`

Defines:

- `get_sun_ecliptic_longitude`
- `get_solar_term_target_longitude`
- `search_longitude_boundary`

This module keeps the astronomy boundary
separate from the rest of the calendrical
and Purple-White logic.

### `astronomy/index.js`

Exports the public API of the `astronomy` module.

---

# Spatial and Cosmological Structures

## `palace/` (九宮 / 九宫 / jiu-gong / cửu cung)

Defines the **"Nine Palaces"** (九宮) as
the fundamental spatial structure used by
**"Purple-White"** calculations. Each palace
has a canonical key, a compass direction,
and a Luo Shu number.

### `palace/palace.js`

Defines:

- `Palace` — canonical palace key (e.g. `qian`, `kun`, `zhen`).
- `PalaceDefinition` — per-palace metadata
  (key, index, direction, Luoshu number, localized name).
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

## `luoshu/` (洛書 / 洛书 / luo-shu / lạc thư)

Defines the **"Luo-Shu"** (洛書 / 洛书 / luo-shu /
lạc thư) numerical arrangement and its
relationship to the **"Nine Palaces"** (九宮).

The **"Luo-Shu"** is a 3×3 magic square in which
every row, column, and diagonal sums to 15.
It provides the numerical scaffold that maps
numbers to palace positions. This module
is kept separate from the **"Purple-White Star"**
module because the Luoshu is a foundational
spatial and numerical structure, whereas
**"Purple-White Stars"** (紫白九星) are
a separate system that moves through the
**"Nine Palaces"**.

### `luoshu/luoshu.js`

Defines:

- `LuoshuLayout` — 3×2D array representing the Luoshu grid.
- `LuoshuPosition` — object with `number`, `palace`, `row`, and `column`.
- `Luoshu` — composite object containing `layout` and `positions`.
- `LUOSHU` — frozen composite with the canonical layout and position data.

Functions:

- `get_luoshu()` — returns the complete **"Luoshu"** object.
- `get_luoshu_position(number)` — returns the position
  metadata for a **"Luoshu"** number.
- `get_luoshu_number(palace)` — returns the **"Luoshu"** number for a palace.
- `get_luoshu_palace(number)` — returns the palace key for a **"Luoshu"** number.
- `is_luoshu_number(value)` — validates whether a value
  is a valid **"Luoshu"** number (1–9).

### `luoshu/index.js`

Exports the public API of the `luoshu` module.

---

# Calendrical Structures

## `san_yuan/` (三元 / tam nguyên)

Defines the conceptual structure of the
**"Three Epochs"** (三元 / tam nguyên) &mdash;
the division of time into **"Upper"** (上元),
**"Middle"** (中元), and **"Lower"** (下元) periods.

This concept is shared across multiple
historical systems, but the exact temporal
boundaries of each epoch differ by method.

This module defines only the conceptual
categories and result structures, leaving
boundary rules to method-specific code.

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

Defines **"Er-Shi-Si-Jie-Qi"** (二十四節氣 /
二十四节气 / er-shi-si-jie-qi / tiết khí) and
their relationship to calendar dates.
Each solar term corresponds to a specific
ecliptic longitude of the Sun, making
its occurrence an exact astronomical instant
rather than a fixed calendar date.

This module provides the **"Solar Term"**
identities independently from the specific
astronomical implementation used
to calculate the exact beginning of each term.
Exact **"Solar Term"** occurrence is resolved
through the `astronomy/` boundary rather than
through the solar term identities themselves.

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

## `purple_white/` (紫白九星)

Contains the shared **"Purple-White Nine Star"**
structures and the method-specific calculation modules.

The shared modules define:

- The **"Purple-White system"** (紫白九星);
- The **"Nine Stars" (九星);
- The **"Nine Palace Flight"** (九宮飛泊 / cửu cung phi bạc) structure.

The `methods` directory defines calculation rules
that may differ between historical and modern traditions.

---

## `purple_white/core/utils/purple_white.js`

Defines:

- `PurpleWhite`
- `PurpleWhiteResult`
- `PURPLE_WHITE`
- `get_purple_white`
- `is_purple_white_result`
- `create_purple_white_result`

This file defines the shared conceptual
structure of **"Purple-White"** calculations
and the common result format used by
method-specific calculations.

It should not contain the calculation rules
of a particular school.

---

## `purple_white/core/nine_stars/star.js`

Defines:

- `PurpleWhiteStar` — canonical star key (e.g. `one_white`, `two_black`).
- `PurpleWhiteStarDefinition` — per-star metadata
  (key, number, element, color, localized name).
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

Each star definition keeps its canonical ID,
number, element, and color while exposing
localized name presentation data.

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

This module provides the common structural
logic required to place the 9
**"Purple-White Stars"** (紫白九星) through
the **"Nine Palaces"** (九宮).

It is intentionally separated from
the logic that determines the initial star
for a particular year, month, day, or hour.

A calculation method should first determine
its starting conditions and then use
the shared flight structure where
the method's rules permit it.

---

# Purple-White Calculation Methods

## `purple_white/core/` (shared foundations / 共用基礎)

Contains reusable **"Purple-White"** foundations
that do not select a historical calculation method.

### `core/nine_stars/`

Contains the localized **"Purple-White Nine Star"**
(紫白九星) definitions and cyclic star operations.

### `core/movement/`

Contains reusable **"Nine Palace Flight"**
(九宮飛泊) structures. It determines how
a supplied starting star moves; it does not
determine that star.

### `core/utils/`

Contains **"Purple-White"** result normalization
and the explicit unresolved-rule error helper.

The existing general-purpose `palace/` and
`luoshu/` modules remain outside this tree
and are reused directly. No redundant wrapper
is created for them.

## `purple_white/methods/` (紫白九星 / cửu tinh tử bạch)

Contains identifiable method-specific
**"Purple-White"** calculation interfaces.

The method directories are separated because
different traditions may share the same
**"Nine Palace Flight"** while differing in:

- Calendrical boundaries;
- **"Three Epoch"** (三元) definitions;
- Initial stars;
- Flight directions
  - Forward Flight (順飛 / 顺飞 / shun-fei / thuận phi)
  - Reverse Flight (逆飛 / 逆飞 / ni-fei / nghịch phi);
- **"Sixty Gan-Zhi Unit"** (六十干支) day rules;
- **"Solar Term"** (節氣) or solstice transitions (二至).

The purpose of this structure is to allow
shared foundational logic without forcing
historically distinct methods into
one universal algorithm.

---

## `purple_white/methods/houkan/` (方鑑)

Owns the **"Houkan"** (方鑑) **"Purple-White"**
(紫白) calculation family. It reuses the shared
**"Purple-White"** result and flight structures
from `purple_white/`, the **"Nine Palaces"**
(九宮) from `palace/`, and the **"Luo-Shu"**
(洛書) ordering rather than duplicating them.

**"Solar Term"** (節氣) timing comes from
`solar_term/`, which in turn uses the existing
astronomy adapter and `sowngwala-js`.
Monthly periods therefore switch at
the actual astronomical solar-term instant:
before the instant is the previous interval,
and at or after it is the new interval.
This is the library's documented **"Houkan"**
interpretation, not a universal rule
of every **"Purple-White"** tradition.

### `houkan/hourly.js`

Defines `calculate_houkan_hourly` and
the inspectable **"hourly"** helpers.

For a **"Jia-Ji"** day (甲己 / jia-ji / giáp-kỷ),
**"Zi-Wu-Mao-You"** (子午卯酉 / zi-wu-mao-you /
tý ngọ mão dậu) is **"Shang-Yuan"**,
**"Yin-Shen-Si-Hai"** (寅申巳亥 / yin-shen-si-hai /
dần thân tỵ hợi) is **"Zhong-Yuan"**, and
**"Chen-Xu-Chou-Wei"** (辰戌丑未 / chen-xu-chou-wei /
thìn tuất sửu mùi) is **"Xia-Yuan"**.
**"Yang Dun"** (陽遁 / 阳遁 / yang-dun / dương độn)
starts at **"One-White"** (一白),
**"Seven-Red"** (七赤), **"Four-Green"** (四緑);  
**"Yin Dun"** (陰遁 / 阴遁 / yin-dun / âm độn) starts
at **"Nine-Purple"** (九紫), **"Three-Jade"** (三碧),
**"Six-White"** (六白).

Each origin is five days or 60 **"Double-Hours"**
(時辰 / 时辰 / shi-chen / giờ âm lịch), and
one star progresses for each **"Double-Hour"**.
A new calendrical origin resets to
its prescribed starting configuration.

The **"Zi Hour"** (子時 / 子时 / zi-shi / giờ Tý)
uses the examined **"Konya/Kongyo"** (今夜 / 今暁 /
jin-ye / jin-xiao) distinction. The implementation
does not assign the whole **"Zi"** (子) hour
uniformly to one civil date.

### `houkan/monthly.js`

`determine_houkan_monthly` exposes
the actual solar-term boundary.
The final monthly starting-star rule
is not yet established by the examined
material available to this repository,
so `calculate_houkan_monthly` fails explicitly
rather than returning an inferred result.

### `houkan/daily.js`

The 6 ordinary daily starting states are preserved.
The module uses the first **"Jia-Zi"** (甲子) on
or after each relevant seasonal boundary
as the ordinary 60-day state origin.

The historical **"Leap Nine Stars"** (閏九星 /
闰九星 / run-jiu-xing / nhuận cửu tinh) procedure
is also implemented. The trigger is **"Dong-Zhi"**
(冬至 / đông chí) or **"Xia-Zhi"** (夏至 / hạ chí)
occurring on **"Jia-Wu"** (甲午).

The leap interval starts 30 days later at
**"Later Jia-Zi"** (後の甲子 / 後之甲子 /
hou-zhi-jia-zi / hậu Giáp Tý) and lasts 60 days.
Its two halves are **"Jia-Zi–Gui-Si"**
and **"Jia-Wu–Gui-Hai"**.

Winter uses Reverse-First / Forward-Second
operation; summer uses Forward-First /
Reverse-Second operation. The summer
**"Later-Jia-Zi"** rule is an explicit
implementation decision based on the confirmed
winter rule and the parallel summer structure.

The leap interval overrides the ordinary daily
state and ordinary operation resumes afterward.

### `houkan/annual.js`

The examined material currently does not
establish a **Houkan**-specific annual
starting-star rule.

The function remains an explicit unresolved
boundary rather than silently substituting
**"Kyusei Kigaku"** logic.

The relevant historical material is
associated with **Matsura Kinkaku** (松浦琴鶴),
**Iida Tengai** (飯田天涯), and **Kikuchi Yosaku**
(菊池要佐久). Comments and APIs distinguish
their documented structures, library-level
interpretations, and unresolved historical questions.

---

## `purple_white/methods/kigaku/` (九星気学)

Contains the **"Kyusei Kigaku"** method family.
Its annual and monthly modules reuse shared
astronomical boundary and cyclic-star
infrastructure. Daily and hourly rules
remain explicit unresolved boundaries
until their method-specific rules are
formally specified; they do not
inherit **Mizuno** rules.

Exports `calculate_kigaku_annual`,
`calculate_kigaku_monthly`,
`calculate_kigaku_daily`, and
`calculate_kigaku_hourly`.

## `purple_white/methods/mizuno/` (Mizuno-style Kigaku)

Contains the primary current **"Mizuno Kigaku"**
family. It shares annual and monthly calculations
with **"Kyusei Kigaku"**, but its daily calculation
switches **"Yin"** and **"Yang"** at the exact
astronomical **"Dong-Zhi"** (冬至 / đông chí) and
**"Xia-Zhi"** (夏至 / hạ chí) instants.

Its **"hourly"** calculation uses **"Solar Term"**
groups and the twelve traditional **"Double-Hour"**
indices rather than a **Heavenly-Stem**-derived
starting star.

Exports `calculate_mizuno_annual`,
`calculate_mizuno_monthly`,
`calculate_mizuno_daily`, and
`calculate_mizuno_hourly`.

---

## `purple_white/methods/index.js`

Exports the supported **"Purple-White"** method families.

This file should provide a stable entry
point for selecting or importing a specific
method without requiring consumers to know
the internal directory layout.

---

## `purple_white/index.js` (紫白九星)

Exports the public Purple-White API, including:

- shared Purple-White definitions;
- star definitions;
- flight structures;
- supported method families.

---

# Shared Library Utilities

## `lib/` (utilities / tiện ích)

Contains shared implementation utilities
that do not belong to a specific
cosmological or calendrical domain.

### `lib/Result.js`

Contains the library's shared result abstraction.

Domain modules may use this abstraction
when they need to return successful results,
failures, validation errors, or other
standardized outcomes.

### `lib/cycle.js`

Contains `create_cycle`, a factory that
produces a cyclic iterator object
with methods `get(index)`, `get_all()`,
`index_of(value)`, `is(value)`, and
`shift(value, offset)`. This is
the shared cyclic iteration primitive
used by all domain modules (elem, stem, branch,
sexagen, palace, solar_term, star)
in place of manual modulo arithmetic.

### `lib/utils.js`

Contains general utility functions
that can be shared across source modules.

Domain-specific rules should not be moved
here merely for reuse. A function should
belong in `lib/utils.js` only when it is
genuinely independent of the domain concepts
represented by modules such as `elem`,
`sexagen`, `luoshu`, or `purple_white`.

---

# Localization

## `locale/` (localization / bản địa hóa)

Contains localization infrastructure.

Localization should provide human-readable
representations of concepts without changing
the canonical identifiers used internally
by the calculation modules.

Each domain module uses `set_multi_helper`
from `locale/index.js` to convert raw
localization tuples &mdash;
`[key, en, vi, zh_ch, zh_tw, kan, hira, kata]`
&mdash; into a structured map keyed
by the domain's canonical identifier.

The `.map()` transform on each tuple produces
an object with `key` and a nested `name` field
containing locale-specific values.
English, Vietnamese, and Chinese entries
carry a `pr` (pronunciation/term) field;
Japanese entries carry separate `kan` (kanji),
`hira` (hiragana), and `kata` (katakana) fields.

### `locale/constants.js`

Contains localization-related constants.

### `locale/Localizer.js`

Defines the localization implementation
used to resolve library identifiers into
human-readable names or other localized
representations.

### `locale/index.js`

Exports the public localization API,
including `set_multi_helper`.

---

# Type Definitions

## `d.ts/global.d.ts`

Contains global TypeScript declarations
required by the source tree.

Additional domain-specific TypeScript
definitions may eventually be generated
or maintained separately from the JS source API.

---

# Tests

Each domain module contains an `__tests__` directory.

Tests should verify:

- Canonical constant definitions;
- Cyclic ordering;
- Lookup functions;
- Validation functions;
- Structural relationships;
- Method-specific calculation behavior
  once calculation implementations are added.

Foundational modules should be tested
independently from **"Purple-White"** (紫白)
methods whenever possible.

Purple-White method tests (紫白九星)
should distinguish between:

- Shared structural behavior;
- Method-specific boundary rules;
- Historically distinct calculation results.

This distinction is important because 2 methods
may legitimately share the same
**"Nine Palace Flight"** (九宮飛泊) while
producing different results because they
use different definitions of a calendrical
boundary or **"Three Epoch"** (三元) transition.


## Historical reconstruction status: Houkan (方鑑)

The **Houkan** (方鑑) method is a historically
reconstructed method family. It is distinct
from modern **Kyusei Kigaku** (九星気学) and from
the primary **"Mizuno Kigaku"** implementation.

The **"Houkan"** source tree currently contains
the following status:

- `annual.js`: the **Houkan**-specific annual
  starting-star rule remains unresolved.
- `monthly.js`: the astronomical Solar-Term boundary
  is implemented, but the **Houkan**-specific
  monthly starting-star rule remains unresolved.
- `daily.js`: the 6 ordinary daily states and
  the historical **"Leap Nine Stars"** (閏九星)
  procedure are implemented.
- `hourly.js`: the examined **"Houkan"** hourly
  rule is implemented, including the three
  **"Three Epoch"** (三元) groups and
  the examined **"Zi"**-hour boundary treatment.

### Houkan daily implementation

The 6 ordinary daily starting states are:

| 季節・元 | 遁 | 甲子起星 |
|---|---|---:|
| 冬至・上元 | 陽遁 | 一白 |
| 雨水・中元 | 陽遁 | 七赤 |
| 穀雨・下元 | 陽遁 | 四緑 |
| 夏至・上元 | 陰遁 | 九紫 |
| 処暑・中元 | 陰遁 | 三碧 |
| 霜降・下元 | 陰遁 | 六白 |

Chinese (in English) translation for the above table follows:

| Seasonal point and Epoch | Dun | Jia-Zi starting star |
|---|---|---|
| Dong-Zhi / Shang-Yuan | Yang-Dun | Yi-Bai |
| Yu-Shui / Zhong-Yuan | Yang-Dun | Qi-Chi |
| Gu-Yu / Xia-Yuan | Yang-Dun | Si-Lü |
| Xia-Zhi / Shang-Yuan | Yin-Dun | Jiu-Zi |
| Chu-Shu / Zhong-Yuan | Yin-Dun | San-Bi |
| Shuang-Jiang / Xia-Yuan | Yin-Dun | Liu-Bai |

The daily calculation is event-driven.
The traditional day is determined by
the repository's **"Sixty Gan-Zhi Unit"**
(六十干支) sequence. The ordinary state
starts from the first **"Jia-Zi"** (甲子)
on or after the relevant seasonal boundary.

For **"Leap Nine Stars"** (閏九星),
the implementation tests **"Dong-Zhi"**
(冬至 / đông chí) and **"Xia-Zhi"**
(夏至 / hạ chí) for a traditional day
of **"Jia-Wu"** (甲午 / 甲午 / jia-wu /
giáp-ngọ). When the trigger occurs,
the leap interval starts 30 days
later at **"Later Jia-Zi"** (後の甲子 /
後之甲子 / hou-zhi-jia-zi / hậu Giáp Tý)
and lasts 60 days. The first 30 days
and second 30 days use the historical
forward/reverse recipe for the relevant
solstice. The summer case uses
the same Later-Jia-Zi rule as an explicit
implementation decision based on
the confirmed winter rule and
parallel summer structure.

The project therefore does not require
a universal closed-form phase formula
for the daily calculation.
The implementation is a finite-state/
recipe procedure, which is sufficient
for the historical reconstruction goal.

### Source position

The practical leap implementation follows
the 1882 second edition of
**"Daily-Nine-Star Examples List" (日家九星起例一覧),
attributed to **Matsuura Kaho** (松浦佳宝) and
**Matsuura Saiyo** (松浦最陽).

The broader historical framework is
associated with **Matsuura Kinkaku** (松浦琴鶴).
The 1887 **"Nine-Star Diagrams Collection"**
(九星図説日要精義大成) is used as later
comparative evidence.

The code deliberately keeps unresolved
annual and monthly **"Houkan"** rules
explicit rather than substituting
modern Kigaku conventions.

