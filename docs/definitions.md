# Definitions

This document is the detailed public specification for Towngach's
**"Purple-White Nine Stars"** (紫白九星 / zi-bai-jiu-xing / cửu tinh tử bạch).

The primary method order is:

1. **"Mizuno Kigaku"** (水野気学 / 水野氣學 / 水野气学 / shui-ye-qi-xue / thủy dã khí học)
2. **"Houkan"** (方鑑 / 方鉴 / fang-jian / phương giám)
3. **"Kyusei Kigaku"** (九星気学 / 九星氣學 / 九星气学 / jiu-xing-qi-xue / cửu tinh khí học)

**"Xuan-Kong"** (玄空 / xuan-kong / huyền không) is a related method family
that is not currently implemented.

## Table of Contents

- [1. Method status](#1-method-status)
- [2. Shared structure](#2-shared-structure)
  - [2-1. Purple-White Stars and Nine Palaces](#2-1-purple-white-stars-and-nine-palaces)
  - [2-2. Calendrical levels](#2-2-calendrical-levels)
  - [2-3. Three-Epoch structure](#2-3-three-epoch-structure)
  - [2-4. Calendrical boundaries](#2-4-calendrical-boundaries)
- [3. Houkan](#3-houkan)
  - [3-1. Purpose and source position](#3-1-purpose-and-source-position)
  - [3-2. Annual calculation](#3-2-annual-calculation)
  - [3-3. Monthly calculation](#3-3-monthly-calculation)
  - [3-4. Ordinary daily structure](#3-4-ordinary-daily-structure)
  - [3-5. Diagram reading](#3-5-diagram-reading)
  - [3-6. Leap Nine Stars](#3-6-leap-nine-stars)
  - [3-7. Solar-year drift](#3-7-solar-year-drift)
  - [3-8. Civil-date implementation](#3-8-civil-date-implementation)
  - [3-9. Hourly calculation](#3-9-hourly-calculation)
  - [3-10. Implementation status](#3-10-implementation-status)
- [4. Mizuno Kigaku](#4-mizuno-kigaku)
  - [4-1. Position and relationship to Kyusei Kigaku](#4-1-position-and-relationship-to-kyusei-kigaku)
  - [4-2. Annual calculation](#4-2-annual-calculation)
  - [4-3. Monthly calculation](#4-3-monthly-calculation)
  - [4-4. Daily calculation](#4-4-daily-calculation)
  - [4-5. Hourly calculation](#4-5-hourly-calculation)
- [5. Kyusei Kigaku](#5-kyusei-kigaku)
  - [5-1. Method position](#5-1-method-position)
  - [5-2. Annual calculation](#5-2-annual-calculation)
  - [5-3. Monthly calculation](#5-3-monthly-calculation)
  - [5-4. Daily and hourly status](#5-4-daily-and-hourly-status)
- [6. Xuan-Kong](#6-xuan-kong)
  - [6-1. Method position](#6-1-method-position)
  - [6-2. Relationship to Purple-White calculations](#6-2-relationship-to-purple-white-calculations)
- [7. Historical evidence versus implementation rules](#7-historical-evidence-versus-implementation-rules)

## 1. Method status

| Method | Annual | Monthly | Daily | Hourly |
|---|---|---|---|---|
| **"Mizuno Kigaku"** (水野気学) | implemented | implemented | implemented | implemented |
| **"Houkan"** (方鑑) | implemented | implemented | implemented | implemented |
| **"Kyusei Kigaku"** (九星気学) | implemented | implemented | unresolved | unresolved |
| **"Xuan-Kong"** (玄空) | not implemented | not implemented | not implemented | not implemented |

## 2. Shared structure

The methods described in this document do not all use the same historical
rules, but they share a substantial computational vocabulary and a common
set of calendrical and spatial structures.

### 2-1. Purple-White Stars and Nine Palaces

Towngach represents **"Purple-White Stars"** (紫白星 / zi-bai-xing / tử bạch tinh)
through the **"Nine Palaces"** (九宮 / 九宫 / jiu-gong / cửu cung).

The common infrastructure includes numbered stars, palaces, **"Forward Flight"** (順飛 / 顺飞 / shun-fei / thuận phi), **"Reverse Flight"** (逆飛 / 逆飞 / ni-fei / nghịch phi), and the movement of a star from the
center palace through the palace sequence.

The methods differ in how they select the starting star, direction, period,
and calendrical boundary. The shared representation should therefore not
be mistaken for a claim that all traditions use the same calculation.

### 2-2. Calendrical levels

Towngach exposes four calendrical levels:

- **"Annual Calculation"** (年家 / nian-jia / niên gia)
- **"Monthly Calculation"** (月家 / yue-jia / nguyệt gia)
- **"Daily Calculation"** (日家 / ri-jia / nhật gia)
- **"Hourly Calculation"** (時家 / 时家 / shi-jia / thời gia)

A method may implement all four levels or only a subset. In particular,
the current **"Kyusei Kigaku"** (九星気学) implementation does not claim resolved
daily and hourly rules.

### 2-3. Three-Epoch structure

Several traditions use **"Three Epochs"** (三元 / san-yuan / tam nguyên),
but the same name does not guarantee the same historical application.

A **"Sixty Gan-Zhi Unit"** (六十干支 / 六十花甲 / liu-shi-gan-zhi / lục thập hoa giáp) consists of sixty consecutive Gan-Zhi positions.
Three such units form a 180-unit cycle where a method applies a
Three-Epoch structure.

Towngach indexes a sixty-unit sequence from **"Jia-Zi"** (甲子 / jia-zi / giáp-tý)
at zero where the relevant method uses that sequence.

### 2-4. Calendrical boundaries

The implementations use astronomical **"Solar-Term Boundaries"** (節氣交節 / 节气交节 / jie-qi-jiao-jie / tiết khí giao tiết) where
the method requires a solar-term transition.

This distinction matters because an astronomical boundary is not necessarily
identical to midnight, the first day of a civil-calendar month, or another
civil-calendar convention.

The astronomical **"Li-Chun"** (立春 / lập xuân) boundary is used to select
the effective year in the modern Kigaku implementations and in the
**"Houkan"** (方鑑) annual implementation. Monthly implementations similarly
use actual solar-term boundaries rather than simply using civil-calendar
month numbers.

## 3. Houkan

### 3-1. Purpose and source position

This section records the historical reconstruction
of the **"Houkan"** (方鑑) **"Purple-White"**
(紫白 / zi-bai / tử bạch) system for software
implementation.

The earlier historical framework is associated
with **"Matsuura Kinkaku"** (松浦琴鶴 / 松浦琴鹤 /
song-pu-qin-he / tùng-phổ-cầm-hạc).
The practical daily leap procedure currently
implemented comes from the 1882 second edition of
**"Daily Nine-Star Examples"** (『日家九星起例一覧』)
attributed to **"Matsuura Keihō"** (松浦佳宝 /
松浦佳寶 / song-pu-jia-bao / tùng-phổ-giai-bảo) and
**"Matsuura Saiyō"** (松浦最陽 / 松浦最阳 /
song-pu-zui-yang / tùng-phổ-tối-dương).
This is a selected implementation source,
not a claim of universal historical priority.

### 3-2. Annual calculation

**"Annual Calculation"** (年家) in
**"Houkan Secret"** (『方鑑秘伝集』) gives
1 **"Yuan"** (元 / yuan / nguyên)
as a **"Sixty Gan-Zhi Unit"** (六十干支),
with 3 **"Yuan"** (元) making a 180-year cycle.

Its documented anchors are:

- 1684 **"Jia-Zi"** (甲子)  
  → **"Upper Yuan"** (上元 / shang-yuan / thượng nguyên)  
  → **"One-White"** (一白 / yi-bai / nhất bạch)
- 1744 **"Jia-Zi"** (甲子)  
  → **"Middle Yuan"** (中元 / zhong-yuan / trung nguyên)  
  → **"Four-Green"** (四緑 / si-lu / tứ lục)
- 1804 **"Jia-Zi"** (甲子)  
  → **"Lower Yuan"** (下元 / xia-yuan / hạ nguyên)  
  → **"Seven-Red"** (七赤 / qi-chi / thất xích)

Within each 60-year **"Yuan"** (元),
the annual star proceeds in reverse order.
The implementation therefore uses
the 180-year cycle and the 3 documented
**"Starting Stars"** (起始星) rather than
importing a modern **"Kyusei Kigaku"**
(九星気学) year rule.

The effective year changes at
the astronomical **"Li-Chun"**
(立春) boundary.

### 3-3. Monthly calculation

**"Monthly Calculation"** (月家) in
**"Houkan Hiden"** (『方鑑秘伝集』) states
that a **"Jia-Zi Month"** (甲子月 /
giáp-tý nguyệt) through **"Gui-Hai"**
(癸亥 / quý-hợi) is one 60-month unit,
and 3 such units make 180 months.

The same passage gives the concrete example
that the November before a **"Jia-Zi Year"**
(甲子年 / jia-zi / giáp-tý niên) is a
**"Jia-Zi Month"** (甲子月) with
**"One-White"** (一白), the following
**"Yi-Chou"** (乙丑 / ất-sửu) month has
**"Nine-Purple"** (九紫 / jiu-zi / cửu tử),
and the following **"Bing-Yin"**
(丙寅 / bính-dần) month follows in
the same reverse-star sequence.

The implementation anchors the
**"Upper-Yuan"** (上元 / shang-yuan /
thượng nguyên) **"Jia-Zi Month"** (甲子月)
at the **"Li-Dong"** (立冬 / lập đông) boundary
in 1683, immediately before the documented
1684 **"Jia-Zi Year"** (甲子年). It then applies
the 60-month circulation in reverse star order,
with the three 60-month units beginning
at **"One-White"** (一白), **"Four-Green"**
(四緑), and **"Seven-Red"** (七赤).

The monthly **"Sixty Gan-Zhi Unit"** (六十干支)
is determined from the astronomical
**"Solar-Term Boundary"** (節氣交節 / 节气交节 /
jie-qi-jiao-jie / tiết khí giao tiết),
so the **monthly** state changes at
the actual astronomical instant rather than
at a civil-calendar **month** boundary.

### 3-4. Ordinary daily structure

The six documented starting states are:

| 季節・元 | 遁 | 甲子起星 |
|---|---|---:|
| 冬至・上元 | 陽遁 | 一白 |
| 雨水・中元 | 陽遁 | 七赤 |
| 穀雨・下元 | 陽遁 | 四緑 |
| 夏至・上元 | 陰遁 | 九紫 |
| 処暑・中元 | 陰遁 | 三碧 |
| 霜降・下元 | 陰遁 | 六白 |

The idealized circuit is 180 **"Yang Dun"**
(陽遁 / 阳遁 / yang-dun / dương độn) days + 180
**"Yin Dun"** (陰遁 / 阴遁 / yin-dun / âm độn)
days = 360 days.

With **"Jia-Zi"** (甲子) as index 0 and day index `i`:

```text
Yang-Dun Shang-Yuan = normalize9(1 + i)
Yang-Dun Zhong-Yuan = normalize9(7 + i)
Yang-Dun Xia-Yuan   = normalize9(4 + i)
Yin-Dun Shang-Yuan  = normalize9(9 - i)
Yin-Dun Zhong-Yuan  = normalize9(3 - i)
Yin-Dun Xia-Yuan    = normalize9(6 - i)
```

These are local diagram mappings,
not the complete civil-date algorithm.

### 3-5. Diagram reading

The **"Sixty Gan-Zhi Unit"** (六十干支) sequence
and **"Nine Palaces"** (九宮) region are
separate logical structures. They must not
be matched merely by visual coordinates.

The **"Gan-Zhi"** (干支 / gan-zhi / hoa giáp)
cells are read down a column and then continued
from the top of the next column. The forward
midpoint is **"Jia-Wu"** (甲午 / giáp-ngọ);
the corresponding reverse midpoint is
**"Gui-Si"** (癸巳 / quý-tỵ).

### 3-6. Leap Nine Stars

The selected practical source for this section
is the 1882 second edition of
**"Daily Nine-Star Examples"**
(『日家九星起例一覧』) by **"Matsuura Keihō"**
(松浦佳宝) and **"Matsuura Saiyō"** (松浦最陽).

Its explanation of the winter leap procedure contains:

> 「甲午の進み、合たる」

The same source explains the timing condition with:

> 「甚だ気候早くして」

and then explicitly directs:

> 「後の甲子を取用ひ」

The implementation therefore uses the
**"Later Jia-Zi"** (後の甲子 / 後之甲子 /
hou-zhi-jia-zi / hậu giáp-tý) rather than
a generic nearest-**"Jia-Zi"** (甲子) rule.

The resulting 60-day interval is:

```text
Jia-Zi … Gui-Si    30 days
Jia-Wu … Gui-Hai   30 days
following Jia-Zi   ordinary operation resumes
```

Winter is reverse/**"Yin Dun"** (陰遁)
first and forward/**"Yang Dun"** (陽遁) second.
Summer is forward/**"Yang Dun"** (陽遁)
first and reverse/**"Yin Dun"** (陰遁) second.

The source-defined midpoint stars are
**"Seven-Red"** (七赤) for **"Yang Dun"**
(陽遁) and **"Three-Jade"** (三碧 / san-bi /
tam bích) for **"Yin Dun"** (陰遁).

For implementation purposes, the summer case
receives the same **"Later Jia-Zi"** (後の甲子)
treatment as the documented winter case.
This is an implementation decision based on
the confirmed winter rule and the parallel
summer structure; it is not presented
as a claim that the surviving summer wording
is equally explicit.

### 3-7. Solar-year drift

The historical explanation contrasts 360 days
with **365 days 25 刻**, giving a difference of
**5 days 25 刻** per year. This is why
the 360-day idealized star circuit
cannot by itself serve as the complete
civil-date algorithm.

### 3-8. Civil-date implementation

The current daily implementation is
event-driven and finite-state:

1. Determine the traditional **"Sixty Gan-Zhi Unit"** (六十干支) day.
2. Determine the active ordinary six-state period from the first
   **"Jia-Zi"** (甲子) on or after the relevant seasonal boundary.
3. Test **"Dong-Zhi"** (冬至 / đông chí) and **"Xia-Zhi"** (夏至 / hạ chí)
   for a traditional day of **"Jia-Wu"** (甲午).
4. If the leap trigger occurs, begin the 60-day interval 30 days later
   at **"Later Jia-Zi"** (後の甲子).
5. Give the leap interval precedence over the ordinary daily state.
6. Resume ordinary operation after the 60-day interval.

The project intentionally uses a recipe/state machine.
A table-driven implementation is equally acceptable;
a universal closed-form phase formula is not required.

### 3-9. Hourly calculation

The examined **"Houkan"** (方鑑) hourly
implementation uses the three confirmed
traditional double-hour groups:

```text
Zi-Wu-Mao-You → Upper Yuan
Yin-Shen-Si-Hai → Middle Yuan
Chen-Xu-Chou-Wei → Lower Yuan
```

The **"Yang Dun"** (陽遁) starting stars are
**"One-White"** (一白), **"Seven-Red"** (七赤),
and **"Four-Green"** (四緑).

The **"Yin Dun"** (陰遁) starting stars are
**"Nine-Purple"** (九紫), **"Three-Jade"** (三碧),
and **"Six-White"** (六白 / liu-bai / lục bạch).

The current code preserves the examined
**"Zi Hour"** (子時 / 子时 / zi-shi / giờ Tý)
boundary at 23:00 and derives the **hourly**
origin from the relevant **"Jia-Ji"**
(甲己 / jia-ji / giáp-kỷ) day.

### 3-10. Implementation status

| Level | Status |
|---|---|
| Annual | Implemented from the documented 180-year **"Three Epochs"** (三元) structure |
| Monthly | Implemented from the documented 180-month **"Three Epochs"** (三元) structure and astronomical boundaries |
| Daily | Implemented, including the selected **"Leap Nine Stars"** (閏九星 / 闰九星 / run-jiu-xing / nhuận cửu tinh) recipe |
| Hourly | Implemented from the examined **"Three Epochs"** (三元) hourly structure |

The project distinguishes historical evidence
from implementation choices. Where the summer
leap rule is adopted by symmetry, that fact
is explicitly recorded instead of being
presented as a verbatim historical rule.

## 4. Mizuno Kigaku

### 4-1. Position and relationship to Kyusei Kigaku

**"Mizuno Kigaku"** (水野気学 / 水野氣學 /
水野气学 / shui-ye-qi-xue / thủy dã khí học)
is the primary current production method in the library.

The older specification describes it
as a variation of **"Kyusei Kigaku"**
(九星気学 / 九星氣學 / 九星气学 / jiu-xing-qi-xue /
cửu tinh khí học): **annual** and **monthly**
calculations share infrastructure,
while daily and hourly rules are distinct.

The method shares the documented
**"Honmei-Sei"** (本命星 / ben-ming-xing /
sao bản mệnh) rules of **"Kyusei Kigaku"**
(九星気学) and reuses the **"Kyusei Kigaku"**
**annual** and **monthly** cycle infrastructure.
Its **daily** and **hourly** calculations use
more direct astronomical timing rules.

Unlike **"Houkan"** (方鑑 / 方鉴 / fang-jian /
phương giám), Mizuno's daily calculation
does not use the six historical **Houkan**
starting states or the **"Leap Nine Stars"**
(閏九星 / 闰九星 / run-jiu-xing / nhuận cửu tinh)
recipe described in Chapter 3.

### 4-2. Annual calculation

The annual boundary is the exact astronomical
**"Li-Chun"** (立春 / lập xuân) instant.
The effective year is the year whose
**"Li-Chun"** (立春) boundary has
most recently occurred.

The central star progresses in reverse order:

```text
9 -> 8 -> 7 -> ... -> 1 -> 9
```

For effective year `year`, the implementation
uses the equivalent cyclic formula:

```text
number = 11 - (year % 9)
if number <= 0, add 9
```

This **annual** rule is shared with
**"Kyusei Kigaku"** (九星気学), while
the method identity remains distinct.

### 4-3. Monthly calculation

The **monthly** calculation selects
the effective year at **"Li-Chun"** (立春)
and selects the latest astronomical boundary
from the 12 monthly solar terms.

The **monthly** boundary is the exact
astronomical instant of the current
month-opening **"Solar Term"** (節入り),
not a civil-date approximation.
At the transition instant,
the new monthly state applies:

```text
one millisecond before boundary -> previous state
boundary instant                  -> new state
one millisecond after boundary    -> new state
```

The month-opening terms are:

- **"Li-Chun"** (立春 / lập xuân)
- **"Jing-Zhe"** (啓蟄 / 驚蟄 / 惊蛰 / kinh trập)
- **"Qing-Ming"** (清明 / thanh minh)
- **"Li-Xia"** (立夏 / lập hạ)
- **"Mang-Zhong"** (芒種 / 芒种 / mang chủng)
- **"Xiao-Shu"** (小暑 / tiểu thử)
- **"Li-Qiu"** (立秋 / lập thu)
- **"Bai-Lu"** (白露 / bạch lộ)
- **"Han-Lu"** (寒露 / hàn lộ)
- **"Li-Dong"** (立冬 / lập đông)
- **"Da-Xue"** (大雪 / đại tuyết)
- **"Xiao-Han"** (小寒 / tiểu hàn)

The first month beginning at **"Li-Chun"**
uses the effective annual **"Earthly Branch"**
(地支 / di-zhi / địa chi) group:

- 子午卯酉 years: **"Eight White"** (八白 / ba-bai / bát bạch)
- 寅申巳亥 years: **"Five Yellow"** (五黄 / wu-huang / ngũ hoàng)
- 辰戌丑未 years: **"Two Black"** (二黒 / 二黑 / er-hei / nhị hắc)

The **monthly** central star then progresses
one step per month in reverse order.

The **monthly** calculation therefore
depends on actual **Solar-Term** boundaries
rather than the civil-calendar month number.
The exact transition instant remains
explicit in the result.

### 4-4. Daily calculation

Define `day_index` as the zero-based
sexagenary-day index:

```text
Jia-Zi = 0
Gui-Hai = 59
```

The **"Yang"** (陽 / 阳 / yang / dương) period
begins at the exact astronomical
**"Winter Solstice"** (冬至 / dong-zhi /
đông chí) instant and continues until
immediately before the exact astronomical
**"Summer Solstice"** (夏至 / xia-zhi / hạ chí).

Its central star is:

```text
(day_index % 9) + 1
```

The **"Yin"** (陰 / 阴 / yin / âm) period begins
at the exact astronomical **Summer Solstice**
instant and continues until immediately
before the next exact astronomical
**"Winter Solstice"**.

Its central star is:

```text
9 - (day_index % 9)
```

Mizuno switches directly at the astronomical instant.  
It does not:

- wait for the next **"Jia-Zi"** day (甲子日);
- use a civil-date approximation of the solstice;
- apply a conventional intercalary waiting period.

Thus the astronomical solstice boundary itself
is part of the **daily** calculation.

### 4-5. Hourly calculation

The 12 **"double-hour"** indices are:

```text
Zi = 0
Chou = 1
Yin = 2
Mao = 3
Chen = 4
Si = 5
Wu = 6
Wei = 7
Shen = 8
You = 9
Xu = 10
Hai = 11
```

The current **"Solar Term"** determines
one of three groups.

#### Group A

- **"Dong-Zhi"** (冬至 / đông chí)
- **"Jing-Zhe"** (啓蟄 / 驚蟄 / 惊蛰 / kinh trập)
- **"Qing-Ming"** (清明 / thanh minh)
- **"Li-Xia"** (立夏 / lập hạ)
- **"Mang-Zhong"** (芒種 / 芒种 / mang chủng)
- **"Xiao-Shu"** (小暑 / tiểu thử)

Starting stars (起始星):

- Yang: **"One-White"** (一白 / yi-bai / nhất bạch)
- Yin: **"Nine-Purple"** (九紫 / jiu-zi / cửu tử)

#### Group B

- **"Li-Chun"** (立春 / lập xuân)
- **"Chun-Fen"** (春分 / xuân phân)
- **"Gu-Yu"** (穀雨 / 谷雨 / cốc vũ)
- **"Da-Shu"** (大暑 / đại thử)
- **"Li-Qiu"** (立秋 / lập thu)
- **"Bai-Lu"** (白露 / bạch lộ)

Starting stars (起始星):

- Yang: **"Seven-Red"** (七赤 / qi-chi / thất xích)
- Yin: **"Three-Blue"** (三碧 / san-bi / tam bích)

#### Group C

All remaining Solar Terms:

- **"Yu-Shui"** (雨水 / vũ thủy)
- **"Xiao-Man"** (小満 / 小满 / tiểu mãn)
- **"Xia-Zhi"** (夏至 / hạ chí)
- **"Chu-Shu"** (処暑 / 处暑 / thử thử)
- **"Qiu-Fen"** (秋分 / thu phân)
- **"Shuang-Jiang"** (霜降 / sương giáng)
- **"Xiao-Xue"** (小雪 / tiểu tuyết)
- **"Da-Xue"** (大雪 / đại tuyết)

Starting stars (起始星):

- Yang: **"Four-Green"** (四緑 / 四綠 / 四绿 / si-lu / tứ lục)
- Yin: **"Six-White"** (六白 / liu-bai / lục bạch)

For **Yang** (陽) mode:

```text
((base_star - 1 + time_index) % 9) + 1
```

For **Yin** (陰) mode:

```text
((base_star - 1 + (9 - (time_index % 9))) % 9) + 1
```

The **hourly** result records its **Solar Term**,
exact **Solar-Term** boundary, group, mode,
base star, and time index.

The **hourly** calculation uses the current
Mizuno daily **Yin**/**Yang** mode.
It does not use a **"Heavenly-Stem"**-derived
(天干 / tian-gan / thiên can) Kyusei
**hourly** origin.

This makes the Mizuno **hourly** calculation
explicitly dependent on both astronomical
**Solar-Term** timing and the
solstice-defined daily **Yin**/**Yang** state.

## 5. Kyusei Kigaku

### 5-1. Method position

**"Kyusei Kigaku"** (九星気学), associated here
with **"Sonoda Shinjiro"** (園田真次郎 / 园田真次郎 /
yuan-tian-zhen-ci-lang / viên-điền-chân-thứ-lang),
is a modern Japanese family of methods built upon
the broader **"Purple-White Stars"** (紫白星) and
**"Nine Palaces"** (九宮) framework.

It shares much of **"Kyusei Kigaku"** (九星気学)
**annual** and **monthly** infrastructure with
**"Mizuno Kigaku"** (水野気学), but the project
does not silently use Mizuno rules to fill
unresolved **"Kyusei Kigaku"** (九星気学) calculations.

### 5-2. Annual calculation

**Annual** calculation is implemented through
the shared **"Kyusei Kigaku"** (九星気学)
**annual** cycle. The effective year is
selected at **"Li-Chun"** (立春), and
the **annual** star follows the reverse
9-year calculation used by the Kigaku
shared infrastructure.

### 5-3. Monthly calculation

**Monthly** calculation is implemented
through the shared **"Kyusei Kigaku"** (九星気学)
**monthly** cycle. The calculation uses
the effective year, the 12 monthly **solar-term**
boundaries, the year-based **"Starting-Star"**
group, and the reverse monthly sequence.

### 5-4. Daily and hourly status

**Daily** and **hourly** **"Kyusei Kigaku"**
(九星気学) rules remain explicit unresolved
method boundaries in this project.

The implementation therefore does not infer
them from **"Mizuno Kigaku"** (水野気学),
**"Houkan"** (方鑑), or another tradition
merely because the underlying
**"Purple-White Stars"** (紫白星) and
**"Nine Palaces"** (九宮) structures are shared.

## 6. Xuan-Kong

### 6-1. Method position

**"Xuan-Kong"** (玄空), including
**"Xuan-Kong Feng-Shui"** (玄空風水 / 玄空风水 /
xuan-kong-feng-shui / phong thủy huyền không)
and related **"Xuan-Kong Fei-Xing Feng-Shui"**
(玄空飛星風水 / 玄空飞星风水 /
xuan-kong-fei-xing-feng-shui /
phong thủy huyền không phi tinh),
is treated as a related method family.

### 6-2. Relationship to Purple-White calculations

These systems use the **"Nine Palaces"** (九宮)
and numbered-star movement, but
their **"Three-Epochs-Nine-Periods"**
(三元九運 / 三元九运 / san-yuan-jiu-yun /
tam nguyên cửu vận) structure should not
be confused with the **"Three Epochs"** (三元)
divisions used in **annual**, **monthly**,
**daily**, or **hourly** **"Purple-White"**
(紫白) calculations.

The library therefore treats **"Xuan-Kong"**
(玄空) as related rather than assuming that
all of its temporal rules can be shared directly.
It is not currently implemented.

## 7. Historical evidence versus implementation rules

Historical sources may describe broader
frameworks, competing procedures,
or terms whose exact historical operation
is uncertain. The implementation records
a selected practical recipe where
the project has enough evidence
to do so.

An implementation decision made by symmetry
is identified as such rather than silently
presented as a verbatim historical rule.

The project also does not use one tradition
to fill historical gaps in another.
In particular, **"Kyusei Kigaku"** (九星気学)
rules are not imported to fill **"Houkan"**
(方鑑) gaps, and **"Mizuno Kigaku"** (水野気学)
rules are not imported to fill unresolved
**"Kyusei Kigaku"** (九星気学) **daily**
or **hourly** rules.
