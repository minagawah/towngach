# Definitions and Reimplementation Notes

This file is the repository's logic specification. It preserves the current model of the supported and investigated calculation families so that the implementation can be reconstructed without relying only on source code.

It is also written for technically literate third parties who do not already know this project. Basic East Asian calendrical ideas are assumed only at a high level; the project-specific concepts needed to turn Hōkan (方鑑), Purple-White Nine Stars (紫白九星), and related traditions into deterministic software are explained here.

## Status Terms

- **Confirmed**: directly supported by examined material or an established implementation rule.
- **Documented**: explicitly described in a source, but not necessarily fully reconstructed as executable logic.
- **Implemented**: represented in repository code and tests.
- **Working interpretation**: current interpretation that may later change.
- **Unresolved**: historically or computationally open; do not replace with a guessed algorithm.
- **Future research**: a defined task that may change the implementation.

## 1. Shared Purple-White Core (紫白九星)

The primary domain is **Purple-White Nine Stars (紫白九星)**, not the different Nine Stars of **Qimen Dunjia (奇門九星)**.

### 1-1. Star identities

1. **One White (一白)**
2. **Two Black (二黒)**
3. **Three Jade (三碧)**
4. **Four Green (四緑)**
5. **Five Yellow (五黄)**
6. **Six White (六白)**
7. **Seven Red (七赤)**
8. **Eight White (八白)**
9. **Nine Purple (九紫)**

A star's numerical identity and its current Nine-Palace position (九宮) must be represented separately.

### 1-2. Shared computational vocabulary

- **Nine Palaces (九宮)**
- **Central Palace (中宮)**
- **Flying / Flight (飛泊 / 飛星)**
- **Forward Flight (順飛)**
- **Reverse Flight (逆飛)**
- **Three Epochs / Three Origins (三元)**
- **Sexagenary Cycle (干支 / 六十干支)**
- **Solar Terms (節気 / 二十四節気)**
- **Winter Solstice (冬至)** and **Summer Solstice (夏至)**

A generic cyclic algorithm normally does:

1. determine a starting state;
2. determine direction;
3. determine offset;
4. advance through the cycle;
5. resolve star/palace state.

Conceptually:

`resultIndex = mod(startIndex + direction * offset, cycleLength)`

The historical palace order itself must follow repository code and tests, not generic memory.

### 1-3. Four calendrical levels

- annual calculation **(年家)**
- monthly calculation **(月家)**
- daily calculation **(日家)**
- hourly calculation **(時家)**

These share terminology but are not automatically one algorithm. Traditions may differ in starting stars, Three-Epoch definitions, Yin/Yang direction, calendrical boundaries, sexagenary reference points, and reset/transformation rules.

Recommended result metadata:

- `tradition`, `level`, `star`, `palace`, `epoch`, `direction`
- `sexagenaryYear`, `sexagenaryMonth`, `sexagenaryDay`, `sexagenaryHour`
- `boundaryRule`, `boundaryInstant`, `status`, `notes`

## 2. Classical Three-Epoch Purple-White (三元紫白)

The annual, monthly, daily, and hourly levels are structurally related but each may have its own temporal cycle and starting rule.

### 2-1. Annual calculation (年家)

A major structure uses:

- one epoch/origin **(一元)** = 60 years;
- Upper Origin **(上元)** + Middle Origin **(中元)** + Lower Origin **(下元)** = 180 years.

Implementation should separate sexagenary year identity, epoch identity, initial annual star, and resulting annual star.

### 2-2. Monthly calculation (月家)

Monthly logic may depend on:

- annual cycle;
- Earthly Branches **(地支)**;
- month establishment **(月建)**;
- sexagenary month sequence;
- selected month boundary.

A Gregorian month number is not inherently equivalent to a traditional month.

Possible boundaries:

- lunar month;
- branch month;
- solar-term month **(節月)**;
- source-specific operational month.

### 2-3. Daily calculation (日家)

A major model uses:

- 60 days = one epoch;
- 180 days = three epochs.

This must not be replaced by Qimen Dunjia's different Three-Epoch logic.

### 2-4. Hourly calculation (時家)

Traditional double-hours **(時辰)**, rather than ordinary civil clock hours, may be the relevant unit.

Conceptual algorithm:

1. determine traditional day/hour context;
2. determine Three-Epoch group;
3. determine Yin progression **(陰遁)** or Yang progression **(陽遁)**;
4. select starting star;
5. count double-hour offsets;
6. advance according to direction.

## 3. Hōkan (方鑑 / 方鑑紫白術)

**Hōkan (方鑑)** is the repository's name for the Japanese directional Purple-White family investigated through material associated with:

- Matsura Kinkaku **(松浦琴鶴)**;
- Iida Tengai **(飯田天涯)**;
- Kikuchi Yosaku **(菊池要佐久)**;
- related Hōkan literature.

The repository must distinguish:

1. documented rules;
2. implementation interpretations;
3. unresolved historical questions.

Hōkan must not be replaced with modern Ki-gaku formulas merely because both use numbered Nine Stars.

### 3-1. Solar-Term boundaries (節気)

When examined Hōkan material uses entry into a Solar Term **(節気 / 二十四節気)** as a boundary, use the actual astronomical transition instant.

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

The investigated material also confirms a Jia-Ji condition **(甲己)** used by hourly logic.

Yang progression **(陽遁)** starting stars:

- first epoch → **One White (一白)**
- second epoch → **Seven Red (七赤)**
- third epoch → **Four Green (四緑)**

Yin progression **(陰遁)** starting stars:

- first epoch → **Nine Purple (九紫)**
- second epoch → **Three Jade (三碧)**
- third epoch → **Six White (六白)**

One epoch/origin **(一元)** is:

- five days;
- sixty traditional double-hours.

One star advances per traditional double-hour.

### 3-3. Zi-hour handling (子時)

The Zi hour must not be assigned one universal civil-date rule without checking the historical distinction.

The examined material distinguishes concepts corresponding to:

- “tonight” **(今夜)**;
- “the following morning / this dawn” **(今暁)**.

Therefore the traditional day boundary must remain explicit and must not be hidden inside generic JavaScript date handling.

### 3-4. Daily calculation (日家)

The Hōkan daily structure must not be reduced to a guessed fixed 180-day cycle.

The implementation recognizes:

- six seasonal periods **(六気)**;
- Yang progression **(陽遁)**;
- Yin progression **(陰遁)**;
- the continuous sexagenary day cycle.

The historical choice of the absolute Jia-Zi synchronization remains unresolved.

### 3-5. Matsura's daily Three-Epoch model from Bensetsu (弁説)

The examined Bensetsu text describes six daily starting states:

- Winter Solstice **(冬至)** Jia-Zi → Yang Upper → **One White (一白)** in the Central Palace **(中宮)**.
- Rain Water **(雨水)** Jia-Zi → Yang Middle → **Seven Red (七赤)**.
- Grain Rain **(穀雨)** Jia-Zi → Yang Lower → **Four Green (四緑)**.
- Summer Solstice **(夏至)** Jia-Zi → Yin Upper → **Nine Purple (九紫)**.
- Limit of Heat **(処暑)** Jia-Zi → Yin Middle → **Three Jade (三碧)**.
- Frost Descent **(霜降)** Jia-Zi → Yin Lower → **Six White (六白)**.

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

- Jia-Zi month **(甲子月)** through Gui-Hai month **(癸亥月)** = 60 months = one epoch **(一元)**;
- three such epochs = 180 months.

The monthly structure is explicitly compared with the annual Three-Epoch structure.

The text uses branch groups such as:

- Zi-Wu-Mao-You **(子午卯酉)**;
- Yin-Shen-Si-Hai **(寅申巳亥)**;
- Chen-Xu-Chou-Wei **(辰戌丑未)**;

while indicating deeper sexagenary logic involving branch positions traditionally described through birth, flourishing, and storage/tomb relationships.

**Working interpretation:** monthly Three Epochs are a real 60-month/180-month structural layer and must not be reduced to ordinary month numbering.

### 3-7. Five Tigers Rule (五虎遁)

For the Wu/Gui year-stem group **(戊癸)**, the Tiger month begins as Jia-Yin **(甲寅)**. Advancing stems through branch months gives:

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

- Zi month **(子月)** → Jia-Zi month **(甲子月)**;
- Chou month **(丑月)** → Yi-Chou month **(乙丑月)**.

This explains Matsura-style examples such as:

- previous eleventh month = Jia-Zi;
- twelfth month = Yi-Chou;
- following month = Bing-Yin.

**Critical caution:** “eleventh month” is not automatically Gregorian November.

## 4. The Jia-Zi Month / Jia-Zi Day Synchronization Problem (甲子月・甲子日)

A central phrase is:

> 「甲子の月甲子の日に起、而して六十箇月の間を順逆次第に循環する」

Current working interpretation:

- a relevant arrangement begins at a synchronization satisfying:
  - month = Jia-Zi month **(甲子月)**;
  - day = Jia-Zi day **(甲子日)**;
- it then circulates through sixty months **(六十箇月)** according to forward/reverse order **(順逆次第)**.

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
3. deriving the month stem using Five Tigers **(五虎遁)**;
4. combining stem and branch;
5. testing for Jia-Zi **(甲子)**.

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
- the exact relationship between synchronization points and Matsura's sixty-month cycle;
- the exact operational meaning of **配遇改華**.

## 5. Sixty Months (六十箇月) and Monthly Three Epochs

The month system explicitly contains:

- 60 months = one epoch **(一元)**;
- Upper Origin **(上元)** + Middle Origin **(中元)** + Lower Origin **(下元)** = 180 months.

The phrase:

> 「六十箇月の間を順逆次第に循環する」

must be compared with this explicit structure.

Possible interpretations:

- one arrangement lasts for one 60-month epoch;
- each epoch has its own day-star pairing;
- the 60-month period is a table cycle;
- a 60-month boundary triggers transformation/renewal **(配遇改華)**;
- synchronization is an anchor from which month offsets are counted.

These remain hypotheses.

## 6. Page22 / Table Reconstruction

A previously analyzed table referred to as “page22” must eventually be connected to:

- actual sexagenary day;
- Nine Star;
- forward/reverse arrangement **(順局 / 逆局)**;
- monthly Three Epoch **(月家三元)**.

A key phrase has been interpreted as implying that, at a monthly Three-Epoch boundary, the correspondence or pairing **(配遇)** between day stars and sexagenary structure is altered or renewed **(改華)**.

Competing interpretations:

- starting star changes;
- star cycle continues but mapping changes;
- calculation switches table layer;
- operation re-synchronizes with a larger 60-month epoch.

These require tests against consecutive dates and verified boundaries.

## 7. Nine-Star Ki-gaku (九星気学)

Ki-gaku is a modern Japanese Nine-Star family related to the broader Purple-White **(紫白)** and Nine-Palace **(九宮)** framework.

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

Reuse generic Purple-White mechanics only where they genuinely agree. Daily and hourly Ki-gaku logic must not automatically inherit Matsura's unresolved Hōkan synchronization.

## 8. Xuan Kong Flying Stars (玄空飛星)

Xuan Kong Flying Stars are related through:

- Nine Palaces **(九宮)**;
- numbered stars;
- flying movement.

They remain an independent calculation family where temporal structure differs.

**Critical distinction:** Three Epochs and Nine Periods **(三元九運)** is not automatically the same as the Three-Epoch structures used in annual/monthly/daily/hourly Purple-White systems.

## 9. Qimen Dunjia Separation Rule (奇門遁甲)

Purple-White Nine Stars **(紫白九星)** are not Qimen Nine Stars **(奇門九星)**.

Qimen stars such as:

- Tian Peng **(天蓬)**;
- Tian Rui **(天芮)**;
- Tian Chong **(天衝)**

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

- `0..9` for Heavenly Stems **(十干)**;
- `0..11` for Earthly Branches **(十二支)**;
- `0..59` for the Sexagenary Cycle **(六十干支)**.

### 10-2. Month stems

Store separately:

- branch-month identity;
- month stem;
- full sexagenary month.

This is necessary because Jia-Zi month **(甲子月)** is a calendrical identity, not a Gregorian date label.

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

- Winter Solstice **(冬至)**;
- Rain Water **(雨水)**;
- Grain Rain **(穀雨)**;
- Summer Solstice **(夏至)**;
- Limit of Heat **(処暑)**;
- Frost Descent **(霜降)**;
- Major Snow **(大雪)**;
- Minor Cold **(小寒)**.

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

- establish a reliable historical calendar baseline for Meiji dates;
- independently verify Jia-Zi month/Jia-Zi day fixtures;
- determine recurrence intervals and, if possible, a direct recurrence rule;
- determine the exact meaning of **六十箇月**;
- determine the operational meaning of **配遇改華**;
- compare reconstructed algorithms with diagrams and tables;
- keep Matsura's **Hiden (秘伝)** and **Bensetsu (弁説)** separate until agreement/disagreement is demonstrated;
- continue literature search for prior work on sexagenary synchronization, recurrence, conjunction, **会合 / 會合**, **上元**, and **暦積 / 曆積**.

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

- **Shared Purple-White Core (紫白九星)**:
  - reusable star identities;
  - cyclic arithmetic;
  - Nine Palaces;
  - forward/reverse flight.

- **Classical Three-Epoch Purple-White (三元紫白)**:
  - 60-unit and 180-unit structures;
  - historically variable transitions.

- **Hōkan (方鑑)**:
  - Japanese directional Purple-White reconstruction;
  - exact astronomical solar-term boundaries where documented;
  - confirmed hourly groups and starting stars;
  - unresolved absolute daily/monthly Jia-Zi synchronization.

- **Nine-Star Ki-gaku (九星気学)**:
  - related modern Japanese family;
  - reuse only genuinely shared mechanics.

- **Xuan Kong Flying Stars (玄空飛星)**:
  - related flying-star family;
  - Three Epochs/Nine Periods remains distinct.

- **Qimen Dunjia (奇門遁甲)**:
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

Note: the Major Snow **(大雪)** transition can occur late within a civil date, so sources may disagree on the month pillar for the entire transition date.

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
