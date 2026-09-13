# Houkan Description and Historical Reconstruction Notes

This document preserves the Houkan (方鑑 / fang-jian / phương giám) material that was previously included in `docs/definitions.md`. It is an archival description of the preserved method family, not a replacement for the current primary Mizuno-style Kigaku specification.

![kinkaku_hiden](../../kinkaku_hiden.jpg)

## 0. Overview

Japanese **"directional-and-divinatory (Houkan)"**
(方鑑 / 方鉴 / fang-jian / phương giám) traditions,
including the calculation family represented
in this library as **"Houkan"**,
adapted **"purple-white"**
(紫白 / zi-bai / tử bạch) calculations
within Japanese calendrical and practical traditions.

The current reconstruction is examined especially
through material associated with
**Matsuura Kinkaku** (松浦琴鶴),
**Iida Tengai** (飯田天涯),
and **Kikuchi Yosaku** (菊池要佐久).
Historically different methods are not assumed to be
identical. The library therefore separates:

- documented rules;
- implementation interpretations;
- unresolved historical logic.

The documented Kinkaku material combines:

- A continuous "sixty-unit (sexagenary) day" (六十干支日 / liu-shi-gan-zhi-ri / lục thập can chi nhật) framework;
- Six "seasonal-starting-states" (季節起局 / ji-jie-qi-ju / quý tiết khởi cục);
- **"yang-dun"** (陽遁 / 阳遁 / yang-dun / dương độn) and **"yin-dun"** (陰遁 / 阴遁 / yin-dun / âm độn) movement;
- A "jia-zi-month" (甲子月 / jia-zi-yue / giáp tý nguyệt) / "jia-zi-day" (甲子日 / jia-zi-ri / giáp tý nhật) synchronization;
- A "sixty-month" (六十箇月 / liu-shi-ge-yue / lục thập cá nguyệt) circulation;
- A transformation at "monthly-three-epoch" (月三元 / yue-san-yuan / nguyệt tam nguyên) beginnings;
- A separate **"leap-bureau"** (閏局 / 润局 / run-ju / nhuận cục) correction problem.

For rules that use entry into a
**"solar-term"**
(節気 / 節氣 / 节气 / jie-qi / tiết khí)
as a boundary, Towngach uses the actual
astronomical transition instant rather than
rounding the boundary to midnight.

The implemented **"hourly"**
(時家 / 时家 / shi-jia / thời gia)
logic currently uses 3 groups:

- 子午卯酉;
- 寅申巳亥;
- 辰戌丑未;

with the documented **"jia-ji"**
(甲己 / jia-ji / giáp-kỷ) condition.

The documented starting phases are:

- **"yang-dun"** (陽遁 / 阳遁 / dương độn):
  - **"one-white"** (一白)
  - **"seven-red"** (七赤)
  - **"four-green"** (四緑)
- **"yin-dun"** (陰遁 / 阴遁 / âm độn):
  - **"nine-purple"** (九紫)
  - **"three-jade"** (三碧)
  - **"six-white"** (六白)

The historical **"daily"**
(日家 / ri-jia / nhật gia)
and **"monthly"**
(月家 / yue-jia / nguyệt gia)
logic is more complex and is still under reconstruction.

Kinkaku's fixed **"Hiden"**
(方鑑秘伝集, Dec.1883 edition) states that
the daily **"three-epoch-nine-star"**
(日の三元九星 / ri-jia-san-yuan-jiu-xing)
arrangement begins from a **"jia-zi-month"**
(甲子月 / jia-zi-yue / giáp tý nguyệt)
and **"jia-zi-day"**
(甲子日 / jia-zi-ri / giáp tý nhật),
circulates for **"sixty-months"**
(六十箇月 / liu-shi-ge-yue / lục thập cá nguyệt),
and changes or renews the **"pairing"**
(配遇 / pei-yu / phối ngộ) of daily stars and
the sexagenary structure at the
beginning of each monthly **"three-epoch"**
(月三元 / yue-san-yuan / nguyệt tam nguyên).

Kinkaku's **"Bensetsu"**
(方鑑弁説, April 1884 edition)
includes corresponding
monthly diagrams which describes:

- Upper Epoch (上元);
- Middle Epoch (中元);
- Lower Epoch (下元).

Those diagrams directly show
"sexagenary-month"
(六十干支月 / liu-shi-gan-zhi-yue /
lục thập can chi nguyệt) rows,
"nine-star" (九星 / jiu-xing / cửu tinh) rows,
and associated "sexagenary-year"
(六十干支年 / liu-shi-gan-zhi-nian /
lục thập can chi niên) groups.
They are being compared with
the "Hiden" (秘伝) daily diagrams
to recover the exact transformation rule.

A second primary-source research strand is the
**"leap-bureau"**
(日家閏局 / 闰局 / run-ju / nhật gia nhuận cục)
explanation. It describes accumulated
drift between a regular star progression
and the seasonal year and gives the phase families:

- Yang → **1 / 4 / 7**;
- Yin → **9 / 6 / 3**.

This makes the daily reconstruction
a stateful historical calculation problem
involving "seasonal-boundaries"
(節気 / 節氣 / 节气 / jie-qi /
tiết khí), "sexagenary-cycles"
(六十干支 / liu-shi-gan-zhi /
lục thập can chi),
"monthly-three-epochs"
(月三元 / yue-san-yuan /
nguyệt tam nguyên), and
"leap-bureau"
(閏局 / 润局 / run-ju / nhuận cục)
correction.

Accordingly, Towngach does not currently
pretend that the complete historical
daily/monthly formula has been recovered.
Where a production result would require
an unresolved rule, the current API
explicitly throws `UNRESOLVED_HISTORICAL_RULE`
rather than fabricating a "nine-star" result.

## 1. Houkan method family

Houkan is a Japanese directional Purple-White method family investigated through material associated with:

- Matsuura Kinkaku (松浦琴鶴);
- Iida Tengai (飯田天涯);
- Kikuchi Yosaku (菊池要佐久);
- related Houkan literature.

The method must distinguish documented rules, implementation interpretations, and unresolved historical questions. Houkan must not be replaced with modern Kigaku formulas merely because both use numbered Nine Stars.

## 2. Solar-Term boundaries

When Houkan material uses entry into a Solar Term (節気 / jie-qi / tiết khí) as a boundary, use the actual astronomical transition instant.

If a transition occurs at `05:00:00`, `04:59:59` belongs to the previous interval and `05:00:00` belongs to the new interval. The transition must not be rounded to midnight or silently replaced with a date-only boundary.

## 3. Hourly calculation

The confirmed Three-Epoch (三元 / san-yuan / Tam Nguyên) groups are:

- Upper / first group: 子午卯酉;
- Middle / second group: 寅申巳亥;
- Lower / third group: 辰戌丑未.

The investigated material also confirms a Jia-Ji (甲己 / jia-ji) condition used by hourly logic.

Yang Flight (陽遁 / 阳遁 / yang-dun / Dương Độn) starting stars are:

- first epoch: One White;
- second epoch: Seven Red;
- third epoch: Four Green.

Yin Flight (陰遁 / 阴遁 / yin-dun / Âm Độn) starting stars are:

- first epoch: Nine Purple;
- second epoch: Three Jade;
- third epoch: Six White.

One epoch (一元 / yi-yuan / nhất nguyên) is five days or sixty traditional double-hours. One star advances per traditional double-hour.

## 4. Zi-hour handling

The Zi hour (子時 / zi-shi / giờ Tý) must not be assigned one universal civil-date rule without checking the historical distinction. The examined material distinguishes concepts corresponding to Tonight (今夜 / jin-ye) and the following morning or This Dawn (今暁 / jin-xiao).

The traditional day boundary must remain explicit and must not be hidden inside generic JavaScript date handling.

## 5. Daily calculation

The Houkan daily structure must not be reduced to a guessed fixed 180-day cycle. The implementation recognizes six seasonal starting states, Yang and Yin Flight, and the continuous Sexagenary Cycle (六十干支 / liu-shi-gan-zhi / Lục Thập Can Chi).

The historical reconstruction contains three distinct layers that must not be collapsed into one formula:

1. the six seasonal starting states described in Bensetsu (弁説);
2. the Jia-Zi month (甲子月 / jia-zi-yue / Giáp Tý nguyệt) and Jia-Zi day (甲子日 / jia-zi-ri / Giáp Tý nhật) synchronization and sixty-month circulation described in Hiden (秘伝);
3. the daily leap-bureau (閏局 / 润局 / run-ju / nhuận cục) correction described in the Secret Explanation passage of Seigi (方鑑正義).

The third layer explains that a simple continuous 60-day/nine-star progression does not remain aligned with the seasonal year indefinitely. The difference between a 360-day two-flight progression and the approximately 365.25-day seasonal year accumulates and produces a leap-bureau correction. The passage gives an example around the 1894 Summer Solstice and explicitly states these phase families:

- Yang Three Epochs: 1, 4, 7;
- Yin Three Epochs: 9, 6, 3.

It also associates the phase immediately before Summer Solstice with Three Jade and the phase immediately before Winter Solstice with Seven Red.

This evidence preserves the leap-bureau mechanism as a required part of the historical reconstruction, but it is not sufficient to hard-code a complete day-star correction formula. The unresolved work is to convert the textual procedure, solstice or Jia-Wu criterion, and sixty-day leap-bureau examples into an unambiguous algorithm with independently reproducible test vectors.

The production API must therefore continue to reject unresolved daily logic rather than silently substituting a generic 180-day formula.

### 5.1 Six seasonal starting states

The Bensetsu text describes these daily starting states:

- Winter Solstice Jia-Zi → Yang Upper → One White in the center palace;
- Rain Water Jia-Zi → Yang Middle → Seven Red;
- Grain Rain Jia-Zi → Yang Lower → Four Green;
- Summer Solstice Jia-Zi → Yin Upper → Nine Purple;
- Limit of Heat Jia-Zi → Yin Middle → Three Jade;
- Frost Descent Jia-Zi → Yin Lower → Six White.

Compact mapping:

- Yang Upper → 1;
- Yang Middle → 7;
- Yang Lower → 4;
- Yin Upper → 9;
- Yin Middle → 3;
- Yin Lower → 6.

The source discusses disagreement among older calendar books concerning which relevant Jia-Zi day should be selected. Variants must be preserved rather than forced into one universal formula.

These six seasonal states define documented phase families, but the historical system also requires rules for the sixty-month circulation and leap-bureau correction. A correct implementation therefore needs an explicit state model rather than a single hard-coded arithmetic cycle.

## 6. Monthly Three Epochs

The examined material describes Jia-Zi month through Gui-Hai month as sixty months, or one epoch, with three epochs totaling 180 months. The monthly structure is explicitly compared with the annual Three-Epoch structure.

Bensetsu contains three monthly diagrams:

- Upper-Epoch Month-Star Diagram;
- Middle-Epoch Month-Star Diagram;
- Lower-Epoch Month-Star Diagram.

The diagrams use a common layout: month headings from December to January, alternating sexagenary-month and nine-star rows, and associated sexagenary-year groups. Their computational structure shows:

1. a twelve-month sexagenary-month sequence paired with a twelve-month nine-star sequence;
2. one-star monthly changes within each complete visible block;
3. the need to interpret the sheet according to month labels rather than ordinary left-to-right reading;
4. different phase arrangements across the three diagrams;
5. year groups that are part of the rule rather than decorative metadata.

Examples include January starting phases such as Eight White → Five Yellow → Two Black for successive complete blocks in the Upper Epoch, Two Black → Five Yellow → Eight White in the Middle Epoch, and Five Yellow → Two Black → Eight White in the Lower Epoch.

These observations support a phase rotation among the three monthly epochs, but the diagrams alone do not justify a universal one-line formula for every block. Partial page-boundary cells and apparent transcription anomalies require source verification before those cells become authoritative data.

The material also uses the branch groups Zi-Wu-Mao-You (子午卯酉), Yin-Shen-Si-Hai (寅申巳亥), and Chen-Xu-Chou-Wei (辰戌丑未), together with deeper sexagenary logic involving birth, flourishing, and storage or tomb relationships.

Working interpretation: monthly Three Epochs are a real 60-month/180-month structural layer and must not be reduced to ordinary civil month numbering.

## 7. Five Tigers Rule

For the Wu-Gui year-stem group (戊癸), the Tiger month begins as Jia-Yin (甲寅). Advancing stems through branch months gives:

```text
寅 = 甲寅; 卯 = 乙卯; 辰 = 丙辰; 巳 = 丁巳; 午 = 戊午;
未 = 己未; 申 = 庚申; 酉 = 辛酉; 戌 = 壬戌; 亥 = 癸亥;
子 = 甲子; 丑 = 乙丑.
```

Therefore, in the relevant Wu-Gui year-stem group, the Zi month is Jia-Zi month and the Chou month is Yi-Chou month. This explains examples in which a previous eleventh month is Jia-Zi, the twelfth month is Yi-Chou, and the following month is Bing-Yin.

Critical caution: an eleventh month is not automatically Gregorian November.

## 8. Jia-Zi month and Jia-Zi day synchronization

The central historical phrase is:

> 「日の三元九星は、其(その)始、甲子の月・甲子の日に起(おこる)、而(しか)して六十箇月の間を、順逆(じゆんぎやく)次第(しだい)に循環(じゆんかん)する」

The current working interpretation is that a relevant arrangement begins at a synchronization satisfying both Jia-Zi month and Jia-Zi day, then circulates through sixty months according to forward or reverse order.

A Jia-Zi month is determined by sexagenary-month rules, while a Jia-Zi day is determined by the continuous sixty-day cycle. The conjunction is therefore a synchronization problem, not a lookup-table identity:

```text
sexagenary_month(date) == jia_zi
and sexagenary_day(date) == jia_zi
```

The implementation should keep month calculation, day calculation, synchronization search, and the resulting star arrangement as separate responsibilities.

## 9. Current implementation status

The preserved Houkan behavior is deliberate:

- Houkan hourly calculation has an implemented shared calculation path;
- Houkan daily calculation intentionally throws `UNRESOLVED_HISTORICAL_RULE`;
- Houkan monthly calculation intentionally throws `UNRESOLVED_HISTORICAL_RULE`;
- Houkan annual calculation intentionally throws `UNRESOLVED_HISTORICAL_RULE`.

The library distinguishes implemented mathematics from historically unresolved reconstruction work. The unresolved behavior must not be replaced with guessed formulas.

## 10. Houkan research backlog

### Monthly-to-daily transformation

The immediate historical question is what exact computational operation is meant by transforming or renewing the pairing of daily stars and sexagenary structure at each beginning of a monthly Three Epoch.

The daily diagrams and monthly diagrams must be compared with the explicit Hiden statement. Generic Purple-White formulas must not be used as a substitute for this reconstruction.

### Jia-Zi synchronization model

Established:

- a Jia-Zi month is computable from Solar Term month boundaries and the Five Tigers Rule;
- a Jia-Zi day is computable from a continuous sexagenary-day index;
- their conjunction is testable without a permanent lookup table.

Still unresolved:

- the best direct recurrence or search strategy;
- the exact absolute anchor used by the sixty-month circulation;
- how synchronization anchors interact with monthly Three-Epoch transformation.

A recurrence of the 60-day phase must not be mistaken for recurrence of the full month/day synchronization.

### Leap-bureau algorithm

The remaining work includes exact parsing of the worked example, definition of the leap-bureau start and end days, the relation between correction and normal daily progression, and independent historical test vectors.

Until these operations are reconstructed, retain shared sexagenary infrastructure, Solar Term boundary handling, Jia-Zi month detection, Jia-Zi day indexing, direction and phase representations, diagram data, and regression fixtures. Do not claim a complete Kinkaku daily or monthly algorithm by filling the gap with a convenient formula or lookup table.

## 11. Houkan testing

Houkan tests should cover:

- all three hourly epoch branch groups;
- Yang starting stars 1, 7, and 4;
- Yin starting stars 9, 3, and 6;
- one star per double-hour;
- sixty double-hours or one five-day epoch;
- historical Zi-hour boundary behavior;
- documented seasonal states;
- documented epoch starts;
- candidate synchronizations and hypotheses as separate fixtures.

A guessed synchronization must not be encoded as confirmed behavior.

## 12. Houkan boundary in the repository

The shared Purple-White core provides reusable star identities, cyclic arithmetic, Nine Palaces, and forward or reverse flight. Houkan owns Japanese directional Purple-White reconstruction, documented exact astronomical Solar Term boundaries, confirmed hourly groups and starting stars, and unresolved absolute daily/monthly Jia-Zi synchronization.

Modern Kigaku and Mizuno-style Kigaku are related but remain separate families. Xuan Kong Flying Stars (玄空飛星 / xuan-kong-fei-xing / huyền không phi tinh) and Qimen Dunjia remain outside Houkan's calculation identity and must not be conflated with it.
