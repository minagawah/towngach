# Definitions and Reimplementation Notes

This file is the repository's logic specification. It preserves the current model of the supported and investigated calculation families so that the implementation can be reconstructed without relying only on source code.

It is also written for technically literate third parties who do not already know this project. Basic East Asian calendrical ideas are assumed only at a high level; the project-specific concepts needed to turn Hōkan (方鑑 / fang-jian), Purple-White Nine Stars (紫白九星 / zi-bai-jiu-xing), and related traditions into deterministic software are explained here.

## Table of Contents

- [Status Terms](#status-terms)
- [1. Shared Purple-White Core (紫白九星)](#1-shared-purple-white-core-紫白九星)
  - [1-1. Star identities](#1-1-star-identities)
  - [1-3. Four calendrical levels](#1-3-four-calendrical-levels)
- [2. Classical Three-Epoch Purple-White (三元紫白)](#2-classical-three-epoch-purple-white-三元紫白)
  - [2-1. Annual calculation (年家)](#2-1-annual-calculation-年家)
  - [2-2. Monthly calculation (月家)](#2-2-monthly-calculation-月家)
  - [2-3. Daily calculation (日家)](#2-3-daily-calculation-日家)
  - [2-4. Hourly calculation (時家)](#2-4-hourly-calculation-時家)
- [3. Hōkan (方鑑 / 方鑑紫白術)](#3-hōkan-方鑑-方鑑紫白術)
  - [3-1. Solar-Term boundaries (節気)](#3-1-solar-term-boundaries-節気)
  - [3-2. Hourly calculation (時家)](#3-2-hourly-calculation-時家)
  - [3-3. Zi-hour handling (子時)](#3-3-zi-hour-handling-子時)
  - [3-4. Daily calculation (日家)](#3-4-daily-calculation-日家)
  - [3-5. Matsuura's daily Three-Epoch model from Bensetsu (弁説)](#3-5-matsuuras-daily-three-epoch-model-from-bensetsu-弁説)
  - [3-6. Monthly Three Epochs (月家三元)](#3-6-monthly-three-epochs-月家三元)
  - [3-7. Five Tigers Rule (五虎遁)](#3-7-five-tigers-rule-五虎遁)
- [4. The Jia-Zi Month / Jia-Zi Day Synchronization Problem (甲子月・甲子日)](#4-the-jia-zi-month--jia-zi-day-synchronization-problem-甲子月甲子日)
  - [4-1. Why this is a synchronization problem](#4-1-why-this-is-a-synchronization-problem)
  - [4-2. Desired implementation architecture](#4-2-desired-implementation-architecture)
  - [4-3. Jia-Zi month calculation](#4-3-jia-zi-month-calculation)
  - [4-4. Jia-Zi day calculation](#4-4-jia-zi-day-calculation)
  - [4-5. Efficient synchronization test inside a Jia-Zi month](#4-5-efficient-synchronization-test-inside-a-jia-zi-month)
  - [4-6. Boundary distinction](#4-6-boundary-distinction)
  - [4-7. Unresolved](#4-7-unresolved)
- [5. Sixty Months (六十箇月) and Monthly Three Epochs](#5-sixty-months-六十箇月-and-monthly-three-epochs)
- [6. Page22: Reconstruction of the Daily-Star Diagrams in Matsuura's Hiden (秘伝)](#6-page22-reconstruction-of-the-daily-star-diagrams-in-matsuuras-hiden-秘伝)
  - [6-1. Monthly-to-daily connection in Matsuura's own statement](#6-1-monthly-to-daily-connection-in-matsuuras-own-statement)
- [7. Nine-Star Kigaku (九星気学)](#7-nine-star-ki-gaku-九星気学)
- [8. Xuan Kong Flying Stars (玄空飛星)](#8-xuan-kong-flying-stars-玄空飛星)
- [9. Qimen Dunjia Separation Rule (奇門遁甲)](#9-qimen-dunjia-separation-rule-奇門遁甲)
- [10. Sexagenary Calendar Infrastructure (干支暦)](#10-sexagenary-calendar-infrastructure-干支暦)
  - [10-1. Indexed representation](#10-1-indexed-representation)
  - [10-2. Month stems](#10-2-month-stems)
  - [10-3. Boundary conventions](#10-3-boundary-conventions)
  - [10-4. Historical verification](#10-4-historical-verification)
- [11. Solar-Term Astronomy (二十四節気)](#11-solar-term-astronomy-二十四節気)
- [12. Result Model and Explicit Uncertainty](#12-result-model-and-explicit-uncertainty)
- [13. Testing and Reimplementation Strategy](#13-testing-and-reimplementation-strategy)
  - [Shared primitives](#shared-primitives)
  - [Sexagenary cycle](#sexagenary-cycle)
  - [Solar-term boundaries](#solar-term-boundaries-1)
  - [Hōkan hourly tests](#hōkan-hourly-tests)
  - [Hōkan daily/monthly research tests](#hōkan-dailymonthly-research-tests)
- [14. Current Research Backlog](#14-current-research-backlog)
- [15. Repository Maintenance Rules](#15-repository-maintenance-rules)
- [16. Current Hard Boundaries Between Families](#16-current-hard-boundaries-between-families)
- [References: Jia-Zi Month / Jia-Zi Day Synchronization Research](#references-jia-zi-month--jia-zi-day-synchronization-research)
  - [A. Current synchronization fixtures](#a-current-synchronization-fixtures)
    - [1. 1888-12-19 — Working historical fixture; re-verification required](#1-1888-12-19--working-historical-fixture-re-verification-required)
    - [2. 1958-12-13 — Confirmed working synchronization fixture](#2-1958-12-13--confirmed-working-synchronization-fixture)
    - [3. 1968-12-20 — Confirmed working synchronization fixture](#3-1968-12-20--confirmed-working-synchronization-fixture)
    - [4. 1978-12-28 — Confirmed working synchronization fixture](#4-1978-12-28--confirmed-working-synchronization-fixture)
  - [B. Diagnostic non-synchronizing candidates](#b-diagnostic-non-synchronizing-candidates)
    - [1953-12-07](#1953-12-07)
    - [1963-12-08](#1963-12-08)
  - [C. Sources for underlying calculations](#c-sources-for-underlying-calculations)
  - [D. Research rule for references](#d-research-rule-for-references)
  - [E. Comparative reference: 移宮接氣 / Daily Three-Epoch Purple-White](#e-comparative-reference-移宮接氣--daily-three-epoch-purple-white)

## Status Terms

- **Confirmed**: directly supported by examined material or an established implementation rule.
- **Documented**: explicitly described in a source, but not necessarily fully reconstructed as executable logic.
- **Implemented**: represented in repository code and tests.
- **Working interpretation**: current interpretation that may later change.
- **Unresolved**: historically or computationally open; do not replace with a guessed algorithm.
- **Future research**: a defined task that may change the implementation.

## 1. Shared Purple-White Core (紫白九星)

The primary domain is **Purple-White Nine Stars (紫白九星 / zi-bai-jiu-xing)**, not the different Nine Stars of **Qimen Dunjia (奇門九星 / qi-men-jiu-xing)**.

### 1-1. Star identities

1. **One White (一白 / yi-bai)**
2. **Two Black (二黒 / er-hei)**
3. **Three Jade (三碧 / san-bi)**
4. **Four Green (四緑 / si-lv)**
5. **Five Yellow (五黄 / wu-huang)**
6. **Six White (六白 / liu-bai)**
7. **Seven Red (七赤 / qi-chi)**
8. **Eight White (八白 / ba-bai)**
9. **Nine Purple (九紫 / jiu-zi)**

A star's numerical identity and its current Nine-Palace position (九宮 / jiu-gong) must be represented separately.

### 1-3. Four calendrical levels

- annual calculation **(年家 / nian-jia)**
- monthly calculation **(月家 / yue-jia)**
- daily calculation **(日家 / ri-jia)**
- hourly calculation **(時家 / shi-jia)**

These share terminology but are not automatically one algorithm. Traditions may differ in starting stars, Three-Epoch definitions, Yin/Yang direction, calendrical boundaries, sexagenary reference points, and reset/transformation rules.

Recommended result metadata:

- `tradition`, `level`, `star`, `palace`, `epoch`, `direction`
- `sexagenaryYear`, `sexagenaryMonth`, `sexagenaryDay`, `sexagenaryHour`
- `boundaryRule`, `boundaryInstant`, `status`, `notes`

## 2. Classical Three-Epoch Purple-White (三元紫白)

The annual, monthly, daily, and hourly levels are structurally related but each may have its own temporal cycle and starting rule.

### 2-1. Annual calculation (年家)

A major structure uses:

- one epoch/origin **(一元 / yi-yuan)** = 60 years;
- Upper Origin **(上元 / shang-yuan)** + Middle Origin **(中元 / zhong-yuan)** + Lower Origin **(下元 / xia-yuan)** = 180 years.

Implementation should separate sexagenary year identity, epoch identity, initial annual star, and resulting annual star.

### 2-2. Monthly calculation (月家)

Monthly logic may depend on:

- annual cycle;
- Earthly Branches **(地支 / di-zhi)**;
- month establishment **(月建 / yue-jian)**;
- sexagenary month sequence;
- selected month boundary.

A Gregorian month number is not inherently equivalent to a traditional month.

Possible boundaries:

- lunar month;
- branch month;
- solar-term month **(節月 / jie-yue)**;
- source-specific operational month.

### 2-3. Daily calculation (日家)

A major model uses:

- 60 days = one epoch;
- 180 days = three epochs.

This must not be replaced by Qimen Dunjia's different Three-Epoch logic.

### 2-4. Hourly calculation (時家)

Traditional double-hours **(時辰 / shi-chen)**, rather than ordinary civil clock hours, may be the relevant unit.

Conceptual algorithm:

1. determine traditional day/hour context;
2. determine Three-Epoch group;
3. determine Yin progression **(陰遁 / yin-dun)** or Yang progression **(陽遁 / yang-dun)**;
4. select starting star;
5. count double-hour offsets;
6. advance according to direction.

## 3. Hōkan (方鑑 / 方鑑紫白術)

**Hōkan (方鑑 / fang-jian)** is the repository's name for the Japanese directional Purple-White family investigated through material associated with:

- Matsuura Kinkaku **(松浦琴鶴)**;
- Iida Tengai **(飯田天涯)**;
- Kikuchi Yosaku **(菊池要佐久)**;
- related Hōkan literature.

The repository must distinguish:

1. documented rules;
2. implementation interpretations;
3. unresolved historical questions.

Hōkan must not be replaced with modern Kigaku formulas merely because both use numbered Nine Stars.

### 3-1. Solar-Term boundaries (節気)

When examined Hōkan material uses entry into a Solar Term **(節気 / 二十四節気 / jie-qi)** as a boundary, use the actual astronomical transition instant.

Example:

- transition at `05:00:00`;
- `04:59:59` belongs to the previous interval;
- `05:00:00` belongs to the new interval.

Do not round the transition to midnight or silently replace it with a date-only boundary.

### 3-2. Hourly calculation (時家)

Confirmed Three-Epoch groups:

- Upper / first group: `子午卯酉`
- Middle / second group: `寅申巳亥`
- Lower / third group: `辰戌丑未`

The investigated material also confirms a Jia-Ji condition **(甲己 / jia-ji)** used by hourly logic.

Yang progression **(陽遁 / yang-dun)** starting stars:

- first epoch → **One White (一白 / yi-bai)**
- second epoch → **Seven Red (七赤 / qi-chi)**
- third epoch → **Four Green (四緑 / si-lv)**

Yin progression **(陰遁 / yin-dun)** starting stars:

- first epoch → **Nine Purple (九紫 / jiu-zi)**
- second epoch → **Three Jade (三碧 / san-bi)**
- third epoch → **Six White (六白 / liu-bai)**

One epoch/origin **(一元 / yi-yuan)** is:

- five days;
- sixty traditional double-hours.

One star advances per traditional double-hour.

### 3-3. Zi-hour handling (子時)

The Zi hour must not be assigned one universal civil-date rule without checking the historical distinction.

The examined material distinguishes concepts corresponding to:

- “tonight” **(今夜 / jin-ye)**;
- “the following morning / this dawn” **(今暁 / jin-xiao)**.

Therefore the traditional day boundary must remain explicit and must not be hidden inside generic JavaScript date handling.

### 3-4. Daily calculation (日家)

The Hōkan daily structure must not be reduced to a guessed fixed 180-day cycle.

The implementation recognizes:

- six seasonal periods **(六気 / liu-qi)**;
- Yang progression **(陽遁 / yang-dun)**;
- Yin progression **(陰遁 / yin-dun)**;
- the continuous sexagenary day cycle.

The historical choice of the absolute Jia-Zi synchronization remains unresolved.

### 3-5. Matsuura's daily Three-Epoch model from Bensetsu (弁説)

The examined Bensetsu text describes six daily starting states:

- Winter Solstice **(冬至 / dong-zhi)** Jia-Zi → Yang Upper → **One White (一白 / yi-bai)** in the Central Palace **(中宮 / zhong-gong)**.
- Rain Water **(雨水 / yu-shui)** Jia-Zi → Yang Middle → **Seven Red (七赤 / qi-chi)**.
- Grain Rain **(穀雨 / gu-yu)** Jia-Zi → Yang Lower → **Four Green (四緑 / si-lv)**.
- Summer Solstice **(夏至 / xia-zhi)** Jia-Zi → Yin Upper → **Nine Purple (九紫 / jiu-zi)**.
- Limit of Heat **(処暑 / chu-shu)** Jia-Zi → Yin Middle → **Three Jade (三碧 / san-bi)**.
- Frost Descent **(霜降 / shuang-jiang)** Jia-Zi → Yin Lower → **Six White (六白 / liu-bai)**.

Compact mapping:

- Yang Upper → 1;
- Yang Middle → 7;
- Yang Lower → 4;
- Yin Upper → 9;
- Yin Middle → 3;
- Yin Lower → 6.

The source discusses disagreement among older calendar books concerning how the relevant Jia-Zi day should be selected. Preserve variants rather than forcing one universal formula.

### 3-6. Monthly Three Epochs (月家三元)

The examined material describes:

- Jia-Zi month **(甲子月 / jia-zi-yue)** through Gui-Hai month **(癸亥月 / gui-hai-yue)** = 60 months = one epoch **(一元 / yi-yuan)**;
- three such epochs = 180 months.

The monthly structure is explicitly compared with the annual Three-Epoch structure.

The text uses branch groups such as:

- Zi-Wu-Mao-You **(子午卯酉 / zi-wu-mao-you)**;
- Yin-Shen-Si-Hai **(寅申巳亥 / yin-shen-si-hai)**;
- Chen-Xu-Chou-Wei **(辰戌丑未 / chen-xu-chou-wei)**;

while indicating deeper sexagenary logic involving branch positions traditionally described through birth, flourishing, and storage/tomb relationships.

**Working interpretation:** monthly Three Epochs are a real 60-month/180-month structural layer and must not be reduced to ordinary month numbering.

### 3-7. Five Tigers Rule (五虎遁)

For the Wu/Gui year-stem group **(戊癸 / wu-gui)**, the Tiger month begins as Jia-Yin **(甲寅 / jia-yin)**. Advancing stems through branch months gives:

- 寅 = 甲寅;
- 卯 = 乙卯;
- 辰 = 丙辰;
- 巳 = 丁巳;
- 午 = 戊午;
- 未 = 己未;
- 申 = 庚申;
- 酉 = 辛酉;
- 戌 = 壬戌;
- 亥 = 癸亥;
- 子 = 甲子;
- 丑 = 乙丑.

Therefore, in the relevant Wu/Gui year-stem group:

- Zi month **(子月 / zi-yue)** → Jia-Zi month **(甲子月 / jia-zi-yue)**;
- Chou month **(丑月 / chou-yue)** → Yi-Chou month **(乙丑月 / yi-chou-yue)**.

This explains Matsuura-style examples such as:

- previous eleventh month = Jia-Zi;
- twelfth month = Yi-Chou;
- following month = Bing-Yin.

**Critical caution:** “eleventh month” is not automatically Gregorian November.

## 4. The Jia-Zi Month / Jia-Zi Day Synchronization Problem (甲子月・甲子日)

A central phrase is:

> 「日の三元九星は、其(その)始、甲子の月・甲子の日に起(おこる)、
> 而(しか)して六十箇月の間を、順逆(じゆんぎやく)次第(しだい)に循環(じゆんかん)する」

Current working interpretation, based on
Matsuura Kinkaku's (松浦琴鶴 / song-pu-qin-he) **"Hiden"** ("方鑑秘伝集", Dec.1883 edition / fang-jian-mi-chuan-ji) text,
and its daily-start diagram  reconstruction:

- a relevant arrangement begins at a synchronization satisfying:
  - month = Jia-Zi month **(甲子月 / jia-zi-yue)**;
  - day = Jia-Zi day **(甲子日 / jia-zi-ri)**;
- it then circulates through sixty months **(六十箇月 / liu-shi-ge-yue)** according to forward/reverse order **(順逆次第 / shun-ni-ci-di)**.

### 4-1. Why this is a synchronization problem

A Jia-Zi month is determined by sexagenary month rules.

A Jia-Zi day is determined by the continuous 60-day cycle.

Therefore:

`sexagenaryMonth(date) == Jia-Zi`

and

`sexagenaryDay(date) == Jia-Zi`

are independent conditions.

A Jia-Zi month does not automatically contain a Jia-Zi day.

### 4-2. Desired implementation architecture

`solar-term calculation`
→ `sexagenary month calculation`
→ `sexagenary day calculation`
→ `Jia-Zi synchronization test`
→ `60-month forward/reverse cycle`
→ `monthly/daily Nine-Star calculation`

Historical dates should be verification vectors, not the primary algorithm.

### 4-3. Jia-Zi month calculation

A sexagenary month can be calculated by:

1. determining the relevant solar-term month boundary;
2. determining the branch month;
3. deriving the month stem using Five Tigers **(五虎遁 / wu-hu-dun)**;
4. combining stem and branch;
5. testing for Jia-Zi **(甲子 / jia-zi)**.

Therefore Jia-Zi month detection does not inherently require a lookup table.

### 4-4. Jia-Zi day calculation

The day sexagenary cycle is continuous.

A general implementation can:

1. convert the date/time using an explicit day-boundary convention;
2. derive a continuous day number;
3. map that number to a sexagenary index modulo 60;
4. test for Jia-Zi.

Conceptually:

`sexagenaryDayIndex = mod(dayNumber - epochOffset, 60)`

The exact epoch constant and convention must be independently validated.

### 4-5. Efficient synchronization test inside a Jia-Zi month

If Jia-Zi is index `0` and the relevant starting day has index `i`:

`offset = mod(60 - i, 60)`

A synchronization occurs if the resulting Jia-Zi day lies inside the actual Jia-Zi-month interval.

This reduces the problem from “search every day forever” to:

1. identify Jia-Zi months;
2. determine the day-cycle phase;
3. calculate the next Jia-Zi offset;
4. test the month interval.

### 4-6. Boundary distinction

The month begins at a solar-term instant, not necessarily at civil midnight.

Therefore software must distinguish:

- the astronomical transition instant;
- the sexagenary day containing that instant;
- the selected project convention for date-level daily classification.

### 4-7. Unresolved

The current research has not yet established:

- a closed-form recurrence for all synchronizations;
- the exact long-term recurrence pattern;
- the exact relationship between synchronization points and Matsuura's sixty-month cycle;
- the exact operational meaning of **配遇改革**.

## 5. Sixty Months (六十箇月) and Monthly Three Epochs

The month system explicitly contains:

- 60 months = one epoch **(一元 / yi-yuan)**;
- Upper Origin **(上元 / shang-yuan)** + Middle Origin **(中元 / zhong-yuan)** + Lower Origin **(下元 / xia-yuan)** = 180 months.

The phrase:

> 「六十箇月の間を、順逆(じゆんぎやく)次第(しだい)に循環(じゆんかん)する」

must be compared with this explicit structure.

Possible interpretations:

- one arrangement lasts for one 60-month epoch;
- each epoch has its own day-star pairing;
- the 60-month period is a table cycle;
- a 60-month boundary triggers transformation/renewal **(配遇改革 / pei-yu-gai-ge)**;
- synchronization is an anchor from which month offsets are counted.

These remain hypotheses.

## 6. Page22: Reconstruction of the Daily-Star Diagrams in Matsuura's Hiden (秘伝)

There are daily-start diagrams on the relevant page
of Matsuura Kinkaku's (松浦琴鶴 / song-pu-qin-he) **"Hiden"**,
fixed for this research as "方鑑秘伝集" (Dec.1883 edition).
It is not an independent modern reference table.
The purpose of the workbook is to expose the internal structure of
Matsuura's printed daily-star diagrams
in a form that can be tested computationally.

The workbook contains two sheets, `left` and `right`. Their common structure is significant:

- the upper three rows contain three nine-star sequences;
- the `left` sheet gives the reverse-running side, with starting stars **Nine Purple → Six White → Three Jade**;
- the `right` sheet gives the forward-running side, with starting stars **One White → Four Green → Seven Red**;
- the lower rows contain palace sequences and the corresponding sexagenary-day arrangement;
- the sexagenary-day arrangement is shared between the two sheets.

The current reconstruction therefore treats `left` and `right` as two directional/phase arrangements applied to the same sexagenary-day framework, rather than as unrelated day tables. The exact selection and transformation rule is still under investigation.

### 6-1. Monthly-to-daily connection in Matsuura's own statement

The central problem is not merely to compare diagrams. Matsuura explicitly connects the daily arrangement to the monthly Three-Epoch structure. In the examined **Hiden** passage he writes:

> 「日の三元九星は其始甲子の月甲子の日に起而して六十箇月の間を順逆次第に循環する…月三元の首毎に日星干支の配遇改革して用るを例とす」

For implementation purposes, the currently established reading is:

- the relevant daily arrangement begins from a **Jia-Zi month / Jia-Zi day** condition;
- it circulates through **sixty months** in forward/reverse order;
- at each beginning of a monthly Three Epoch **(月三元の首 / yue-san-yuan)**, the pairing **(配遇 / pei-yu)** of daily stars and sexagenary structure is **transformed/renewed (改革 / gai-ge)**.

This passage is direct evidence that the monthly and daily layers must be investigated as connected parts of Matsuura's method. It does **not yet** prove which exact computational operation implements **配遇改革**. The remaining task is to recover that operation from Matsuura's text and diagrams, especially the said "daily-star diagrams" (of Matsuura's) reconstruction, without replacing it with a rule borrowed from another tradition.

Current competing implementation hypotheses remain:

- the starting star changes;
- the direction/phase changes while the sexagenary-day framework remains fixed;
- the star-to-day pairing changes at the monthly Three-Epoch boundary;
- a larger sixty-month cycle re-synchronizes the arrangement.

These hypotheses must be tested against the actual diagram structure and verified month/day boundaries.

## 7. Nine-Star Kigaku (九星気学)

Kigaku is a modern Japanese Nine-Star family related to the broader Purple-White **(紫白 / zi-bai)** and Nine-Palace **(九宮 / jiu-gong)** framework.

Shared concepts may include:

- numbered Nine Stars;
- Nine Palaces;
- annual and monthly cycles;
- directional use.

Differences may include:

- year boundary;
- solar-term convention;
- daily rules;
- practical standardization;
- modern formula selection.

Reuse generic Purple-White mechanics only where they genuinely agree. Daily and hourly Kigaku logic must not automatically inherit Matsuura's unresolved Hōkan synchronization.

## 8. Xuan Kong Flying Stars (玄空飛星)

Xuan Kong Flying Stars are related through:

- Nine Palaces **(九宮 / jiu-gong)**;
- numbered stars;
- flying movement.

They remain an independent calculation family where temporal structure differs.

**Critical distinction:** Three Epochs and Nine Periods **(三元九運 / san-yuan-jiu-yun)** is not automatically the same as the Three-Epoch structures used in annual/monthly/daily/hourly Purple-White systems.

## 9. Qimen Dunjia Separation Rule (奇門遁甲)

Purple-White Nine Stars **(紫白九星 / zi-bai-jiu-xing)** are not Qimen Nine Stars **(奇門九星 / qi-men-jiu-xing)**.

Qimen stars such as:

- Tian Peng **(天蓬 / tian-peng)**;
- Tian Rui **(天芮 / tian-rui)**;
- Tian Chong **(天衝 / tian-chong)**

must not be substituted for One White through Nine Purple.

Likewise:

- Qimen Three-Epoch logic must not replace Purple-White Three-Epoch logic;
- a Qimen-style 15-day structure is not a replacement for a Purple-White 60-day epoch.

Shared utilities may include stems, branches, sexagenary indexing, date arithmetic, and modular arithmetic. Star domains and cycle engines must remain separate.

## 10. Sexagenary Calendar Infrastructure (干支暦)

The infrastructure should support sexagenary:

- year;
- month;
- day;
- hour.

Represent cycles as indexed cyclic data, not merely concatenated display strings.

### 10-1. Indexed representation

Recommended:

- `0..9` for Heavenly Stems **(十干 / shi-gan)**;
- `0..11` for Earthly Branches **(十二支 / shi-er-zhi)**;
- `0..59` for the Sexagenary Cycle **(六十干支 / liu-shi-gan-zhi)**.

### 10-2. Month stems

Store separately:

- branch-month identity;
- month stem;
- full sexagenary month.

This is necessary because Jia-Zi month **(甲子月 / jia-zi-yue)** is a calendrical identity, not a Gregorian date label.

### 10-3. Boundary conventions

Every calculation should declare relevant boundaries:

- civil midnight;
- traditional day boundary;
- Zi-hour boundary;
- solar-term transition;
- lunar month boundary;
- branch-month boundary.

Never silently mix them.

### 10-4. Historical verification

Use:

- independent calendar sources;
- sexagenary continuity;
- modulo-60 arithmetic;
- explicit year/month/day conventions.

Common failures:

- century-digit mistakes;
- Gregorian/traditional year mixing;
- time-zone differences;
- lunar vs solar-term month confusion;
- different day-boundary conventions.

The 1888/1988 confusion discovered during this project is a concrete warning.

## 11. Solar-Term Astronomy (二十四節気)

Solar-term transitions are instants, not merely named dates.

Infrastructure should expose:

- term name;
- transition timestamp;
- normalized instant/time zone;
- before/exact/after behavior.

Important terms include:

- Winter Solstice **(冬至 / dong-zhi)**;
- Rain Water **(雨水 / yu-shui)**;
- Grain Rain **(穀雨 / gu-yu)**;
- Summer Solstice **(夏至 / xia-zhi)**;
- Limit of Heat **(処暑 / chu-shu)**;
- Frost Descent **(霜降 / shuang-jiang)**;
- Major Snow **(大雪 / da-xue)**;
- Minor Cold **(小寒 / xiao-han)**.

## 12. Result Model and Explicit Uncertainty

Recommended fields:

- `tradition`
- `level`
- `star`
- `palace`
- `epoch`
- `direction`
- `sexagenaryYear`
- `sexagenaryMonth`
- `sexagenaryDay`
- `sexagenaryHour`
- `boundaryRule`
- `boundaryInstant`
- `status`
- `notes`

Recommended status values:

- `confirmed`
- `documented`
- `implemented`
- `working-interpretation`
- `unresolved`
- `not-applicable`

An unresolved historical rule should produce an explicit unresolved state rather than a fabricated result.

## 13. Testing and Reimplementation Strategy

### Shared primitives

Test:

- modulo-9 progression;
- forward and reverse flight;
- wrap-around;
- star identity independently from palace position.

### Sexagenary cycle

Test:

- 60-step wrap-around;
- consecutive day increments;
- Five Tigers month-stem sequences;
- branch month independently from Gregorian month;
- independent day-index calculation from a fixed epoch.

### Solar-term boundaries

Test:

- exact astronomical transition instants;
- before/exact/after states;
- time-zone normalization;
- no rounding to midnight.

### Hōkan hourly tests

Test:

- all three epoch branch groups;
- Yang starts: 1, 7, 4;
- Yin starts: 9, 3, 6;
- one star per double-hour;
- sixty double-hours / five-day epoch wrap;
- Zi-hour historical boundary behavior.

### Hōkan daily/monthly research tests

Do not encode a guessed synchronization as confirmed.

Use separate fixtures for:

- documented seasonal states;
- documented epoch starts;
- candidate synchronizations;
- hypotheses.

Promote candidates only after independent verification.

## 14. Current Research Backlog

- Establish a reliable historical calendar baseline for Meiji dates;
- Independently verify Jia-Zi month/Jia-Zi day fixtures;
- Determine recurrence intervals and, if possible, a direct recurrence rule;
- Determine the exact meaning of **六十箇月**;
- Determine the operational meaning of **配遇改革**;
- Compare reconstructed algorithms with diagrams and tables;
- Keep Matsuura's **Hiden (秘伝 / mi-chuan)** and **Bensetsu (弁説 / bian-shuo)** separate until agreement/disagreement is demonstrated;
- Continue literature search for prior work on sexagenary synchronization, recurrence, conjunction, **会合 / 會合**, **上元**, and **暦積 / 曆積**.

## 15. Repository Maintenance Rules

Update this file whenever:

- a historical rule is confirmed;
- an unresolved problem is solved;
- a calculation family is added;
- a boundary convention changes;
- a test vector is accepted or rejected.

Do not silently rewrite old hypotheses as if they had always been confirmed.

Maintain a distinction among:

- source text;
- mathematical inference;
- historical reconstruction;
- implementation decision.

## 16. Current Hard Boundaries Between Families

- **Shared Purple-White Core (紫白九星 / zi-bai-jiu-xing)**:
  - reusable star identities;
  - cyclic arithmetic;
  - Nine Palaces;
  - forward/reverse flight.

- **Classical Three-Epoch Purple-White (三元紫白 / san-yuan-zi-bai)**:
  - 60-unit and 180-unit structures;
  - historically variable transitions.

- **Hōkan (方鑑 / fang-jian)**:
  - Japanese directional Purple-White reconstruction;
  - exact astronomical solar-term boundaries where documented;
  - confirmed hourly groups and starting stars;
  - unresolved absolute daily/monthly Jia-Zi synchronization.

- **Nine-Star Kigaku (九星気学 / jiu-xing-qi-xue)**:
  - related modern Japanese family;
  - reuse only genuinely shared mechanics.

- **Xuan Kong Flying Stars (玄空飛星 / xuan-kong-fei-xing)**:
  - related flying-star family;
  - Three Epochs/Nine Periods remains distinct.

- **Qimen Dunjia (奇門遁甲 / qi-men-dun-jia)**:
  - explicitly separate star domain;
  - shared calendar utilities may be reused;
  - star and epoch algorithms must not be conflated.

---

# References: Jia-Zi Month / Jia-Zi Day Synchronization Research

This section records current research fixtures and supporting web sources. Status labels are important. A candidate must not be treated as a final historical epoch unless independently rechecked.

## A. Current synchronization fixtures

### 1. 1888-12-19 — Working historical fixture; re-verification required

Working claim:

- `戊子年・甲子月・甲子日`

Status:

- **working fixture / continued independent verification required**
- 1888 = 戊子 and 1889 = 己丑 under the year sequence used here.
- Earlier investigation contained an erroneous 1888/1988 source mix-up.
- The candidate must not be discarded merely because that later contradictory claim used the wrong Gregorian year.

Earlier research referred to DateDB and Bao Lam Dong calendar pages, but their exact URLs were not preserved in the currently available handoff text. They are therefore not reconstructed from memory here.

### 2. 1958-12-13 — Confirmed working synchronization fixture

Claim:

- `戊戌年・甲子月・甲子日`

Sources:

- https://www.chinesecalendaronline.com/zh/1958/12/13.htm
- https://www.kumokiri.net/data/1958/12.html

Related boundary/day reference:

- https://www.rili.com.cn/wannianli/1958/1207.html

Note: the Major Snow **(大雪 / da-xue)** transition can occur late within a civil date, so sources may disagree on the month pillar for the entire transition date.

### 3. 1968-12-20 — Confirmed working synchronization fixture

Claim:

- `戊申年・甲子月・甲子日`

Source:

- https://www.chinesecalendaronline.com/1968/12/

### 4. 1978-12-28 — Confirmed working synchronization fixture

Claim:

- `戊午年・甲子月・甲子日`

Source:

- https://www.kumokiri.net/data/1978/12.html

## B. Diagnostic non-synchronizing candidates

### 1953-12-07

Reported as:

- `癸巳年・甲子月・壬辰日`

Source:

- https://m.life.httpcn.com/huangli_date/1953-12-7

With `甲子 = 0`, `壬辰` has index 28.

`offset = 60 - 28 = 32`

The next Jia-Zi day therefore falls outside a normal Jia-Zi-month interval.

### 1963-12-08

Reported as:

- `癸卯年・甲子月・乙酉日`

Source:

- https://m.life.httpcn.com/huangli_date/1963-12-8/

With `甲子 = 0`, `乙酉` has index 21.

`offset = 60 - 21 = 39`

The next Jia-Zi day therefore falls outside a normal Jia-Zi-month interval.

## C. Sources for underlying calculations

- Sexagenary day-cycle validation:
  https://wiki.openfate.ai/ja/bazi/calendar/sexagenary-day-cycle-validation

- Chinese calendar / sexagenary calculation:
  https://ytliu0.github.io/ChineseCalendar/sexagenary.html

- Historical calendar mathematics:
  https://www.kurims.kyoto-u.ac.jp/~kyodo/kokyuroku/contents/pdf/1787-02.pdf

- Classical Chinese calendrical text:
  https://ctext.org/wiki.pl?chapter=720301&if=gb

- Month-cycle reference:
  https://en.wikipedia.org/wiki/Sexagenary_cycle

## D. Research rule for references

Do not use one calendar website as the sole production authority.

For any synchronization promoted to a permanent regression anchor:

1. verify sexagenary year;
2. verify sexagenary month using an explicit month-boundary convention;
3. verify sexagenary day using an independent continuous-day calculation;
4. record source URLs;
5. record time zone and boundary rule;
6. retain contradictory sources when they reveal a convention difference.

This document is a living specification. It should make clear what is known, implemented, inferred, and unresolved.

## E. Comparative reference: 移宮接氣 / Daily Three-Epoch Purple-White

The following comparative source is retained for research interest only. It is **not** used to replace Matsuura's own algorithm. The source is relevant because its **日家三元紫白** section explicitly organizes daily Purple-White by the seasonal groups **冬至・雨水・穀雨** and **夏至・處暑・霜降**, assigns Jia-Zi starting states, and uses forward movement for the Yang side and reverse movement for the Yin side. It also states:

> 「蓋日白之法，惟此訣得陰陽順逆節節相續之義。至諸家每多錯亂舛謬者，由不知古人移宮接氣之理也。」

The same text describes the broader principle as **移宮接氣**: connecting palace/star states across seasonal boundaries so that forward/reverse movement continues without breaking the sequence.

Source:

- 《選擇紀要／上編》, Wikisource: https://zh.wikisource.org/zh-hant/選擇紀要/上編
