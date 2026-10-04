# Definitions

This document is the detailed public specification
for Towngach's **"Purple-White Nine Stars"**
(紫白九星 / 紫白九星 / zi-bai-jiu-xing / cửu tinh tử bạch).
It describes shared calculation structures and
the current status of each supported method family.
The primary method order for the library is:

1. **"Mizuno Kigaku"** (水野気学)
2. **"Houkan"** (方鑑 / 方鉴 / fang-jian / phương giám)
3. **"Kyusei Kigaku"** (九星気学 / 九星氣學 / 九星气学 / jiu-xing-qi-xue / cửu tinh khí học)

**"Xuan-Kong"** (玄空 / xuan-kong / huyền không)
is a related method family that is not currently implemented.

## 1. Shared structure

Towngach represents **"Purple-White Stars"**
through the **"Nine Palaces"** (九宮 / 九宫 /
jiu-gong / cửu cung). The common infrastructure
includes stars, palaces, **"Forward Flight"**
(順飛 / 顺飞 / shun-fei / thuận phi),
**"Reverse Flight"** (逆飛 / 逆飞 / ni-fei /
nghịch phi), and calendrical boundaries.
Method-specific rules determine how these
shared structures are used.

The **"Sixty Gan-Zhi Unit"** (六十干支 / 六十花甲 /
liu-shi-gan-zhi / lục thập hoa giáp) is indexed
from **"Jia-Zi"** (甲子 / jia-zi / giáp-tý)
at zero where a method uses the sixty-unit sequence.

## 2. Method status

| Method | Annual | Monthly | Daily | Hourly |
|---|---|---|---|---|
| **Kyusei Kigaku** | implemented | implemented | unresolved | unresolved |
| **Houkan** | unresolved | boundary implemented; calculation unresolved | implemented | implemented |
| **Mizuno Kigaku** | implemented | implemented | implemented | implemented |
| **Xuan-Kong** | not implemented | not implemented | not implemented | not implemented |

## 3. Mizuno Kigaku

**"Mizuno Kigaku"** (水野気学) is the primary
current production method in the library.
Its **"annual"** and **"monthly"** calculations
reuse the **"Kyusei Kigaku"** cycle infrastructure.
Its daily calculation changes **Yin**/**Yang** mode
at the actual astronomical **"Dong-Zhi"** (冬至 /
đông chí) and **"Xia-Zhi"** (夏至 / hạ chí) boundaries.
Its hourly calculation uses the solar-term group
and the traditional double-hour index.

## 4. Houkan ordinary daily structure

The current Houkan daily implementation preserves
the 6 historical starting states:

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
| Dong-Zhi / Shang-Yuan | Yang-Dun | **"One-White"** (Yi-Bai) |
| Yu-Shui / Zhong-Yuan | Yang-Dun | **"Seven-Red"** (Qi-Chi) |
| Gu-Yu / Xia-Yuan | Yang-Dun | **"Four-Green"** (Si-Lu) |
| Xia-Zhi / Shang-Yuan | Yin-Dun | **"Nine-Purple"* (Jiu-Zi) |
| Chu-Shu / Zhong-Yuan | Yin-Dun | **"Three-Jade"** (San-Bi) |
| Shuang-Jiang / Xia-Yuan | Yin-Dun | **"Six-White"** (Liu-Bai) |

These are 6 local 60-day starting states.
With **"Jia-Zi"** as index 0 and day index `i`,
their local mappings are:

```text
Yang-Dun Shang-Yuan = normalize9(1 + i)
Yang-Dun Zhong-Yuan = normalize9(7 + i)
Yang-Dun Xia-Yuan   = normalize9(4 + i)
Yin-Dun Shang-Yuan  = normalize9(9 - i)
Yin-Dun Zhong-Yuan  = normalize9(3 - i)
Yin-Dun Xia-Yuan    = normalize9(6 - i)
```

These formulas reproduce the local historical tables.
They are not, by themselves, the civil-date rule
for deciding which state is active.

## 5. Houkan **"Leap Nine Stars"** (閏九星)

The current practical implementation source
for the leap procedure is the 1882 second
edition of **"Daily Nine-Stars Example List"**
(日家九星起例一覧), attributed to **Matuura Kaho**
(松浦佳宝) and **Matsuura Saiyo** (松浦最陽).

This source is used as a historically situated
implementation source; it is not treated
as proof of universal historical priority.

The source connects the leap procedure with
the **"Two Solstices"** (**"Er-Zhi"** / 二至 /
er-zhi / nhị chí) and the
**"Sixty Gan-Zhi Unit"**. Its important
wording includes:

- **"Jia-Zi goes forward"** (「甲午の進み、合たる」)
- **"The Season is still early"** (「甚だ気候早くして」)
- **"Using the later Jia-Ji"** (「後の甲子を取用ひ」)

The implementation interprets **"Jia-Wu"**
(甲午 / jia-wu / giáp-ngọ) at the relevant
solstice as the trigger. The leap starts at
**"Later Jia-Zi"** (後の甲子 / 後之甲子 /
hou-zhi-jia-zi / hậu Giáp Tý), exactly
30 days after **"Jia-Wu"** (甲午),
and lasts 60 days.

```text
Jia-Zi … Gui-Si    30 days
Jia-Wu … Gui-Hai   30 days
following Jia-Zi   ordinary operation resumes
```

The winter recipe is reverse/**Yin** first
and forward/**Yang** second. The summer
recipe is forward/Yang first and
reverse/**Yin** second. The implementation
uses **"Nine-Purple"** as the first winter
**"leap star"** and **"Nine-Purple"** as
the first summer **"leap star"**, giving
the source-defined midpoint stars
**"Seven-Red"** for **"Yang"** and
**"Three-Jade"** for **"Yin"**.

For implementation purposes, the summer
case receives the same **"Later Jia-Zi"**
(後の甲子) treatment as the documented
winter case. This is an implementation
decision made from the confirmed
winter rule and the parallel summer
structure; it is not presented as
a claim that the surviving summer
wording is equally explicit.

## 6. Houkan daily civil-date procedure

The Houkan daily implementation is
event-driven rather than based on
a search for a hidden phase formula:

1. Determine the traditional **"Sixty Gan-Zhi Unit"** day.
2. Determine the active ordinary six-state period from the first **"Jia-Zi"**
   on or after each relevant solar-term boundary.
3. Check whether the current **"Dong-Zhi"** or
   **"Xia-Zhi"** occurs on **"Jia-Wu"**.
4. If so, create the 60-day **"Leap Nine Stars"**
   (閏九星) interval beginning 30 days later at
   **"Later Jia-Zi"**.
5. Use the leap interval in preference to the ordinary daily state.
6. Resume ordinary operation after the 60-day interval.

This is a finite-state/recipe implementation.
No universal closed-form phase equation is required.

## 7. Houkan hourly and monthly boundaries

The **"Houkan"** hourly implementation
uses the confirmed three groups of
traditional double-hours:

```text
Zi-Wu-Mao-You → Shang-Yuan
Yin-Shen-Si-Hai → Zhong-Yuan
Chen-Xu-Chou-Wei → Xia-Yuan
```

The **"Yang-Dun"** starting stars are
**"Yi-Bai"**, **"Qi-Chi"**, and **"Si-Lü"**.  
The **"Yin-Dun"** starting stars are
**"Jiu-Zi"**, **"San-Bi"**, and **"Liu-Bai"**.

The implementation also preserves
the examined distinction around
the **"Zi"** hour.

`determine_houkan_monthly` exposes
the actual astronomical **"Solar-Term"**
boundary. The monthly starting-star
calculation itself remains unresolved;
the source code does not silently
substitute a modern Kigaku rule.

## 8. Houkan annual calculation

The current examined material does not
establish a Houkan-specific annual
starting-star calculation that the project
is prepared to treat as final.
`calculate_houkan_annual` therefore
remains an explicit unresolved method boundary.

## 9. Modern Kyusei Kigaku

The modern **"Kyusei Kigaku"** family
shares the common **"Purple-White"**
and **"Nine Palace"** infrastructure.
Its annual and monthly calculations
are implemented. Its daily and hourly
calculations remain explicit unresolved
method boundaries and do not inherit
**"Mizuno Kigaku"** rules.

## 10. Historical evidence versus implementation rules

Historical sources may describe broader
frameworks, competing procedures, or terms
whose exact historical operation is uncertain.
The implementation records a selected practical
recipe where the project has enough evidence to
do so. A remaining historical question must
not be filled silently with a modern convention.
