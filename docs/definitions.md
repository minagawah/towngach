# Definitions

This document is the detailed public
specification for Towngach's
**"Purple-White Nine Stars"** (紫白九星 /
zi-bai-jiu-xing / cửu tinh tử bạch).
The primary method order is:

1. **"Mizuno Kigaku"** (水野気学)
2. **"Houkan"** (方鑑 / 方鉴 / fang-jian / phương giám)
3. **"Kyusei Kigaku"** (九星気学 / 九星氣學 / 九星气学 / jiu-xing-qi-xue / cửu tinh khí học)

**"Xuan-Kong"** (玄空 / xuan-kong / huyền không)
is a related method family that is
not currently implemented.

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
| **Mizuno Kigaku** | implemented | implemented | implemented | implemented |
| **Houkan** | implemented | implemented | implemented | implemented |
| **Kyusei Kigaku** | implemented | implemented | unresolved | unresolved |
| **Xuan-Kong** | not implemented | not implemented | not implemented | not implemented |

## 3. Mizuno Kigaku

**"Mizuno Kigaku"** (水野気学) is the primary
current production method in the library.
Its **annual** and **monthly** calculations
reuse the **"Kyusei Kigaku"** (九星気学) cycle
infrastructure. Its daily calculation changes
**Yin**/**Yang** mode at the actual astronomical
**"Dong-Zhi"** (冬至 / đông chí) and **"Xia-Zhi"**
(夏至 / hạ chí) boundaries. Its hourly calculation
uses the **"solar-term"** (節氣) group and
the traditional **"double-hour"** (時辰) index.

## 4. Houkan annual calculation

The historical **"Houkan"** (方鑑) annual rule uses
three 60-year **"Yuan"** (元 / yuan / nguyên) units.
The documented **"Jia-Zi"** (甲子) anchors are:

- 1684 **"Jia-Zi"** (甲子)  
  → **"Upper Yuan"** (上元 / shang-yuan / thượng nguyên)  
  → **"One-White"** (一白 / yi-bai / nhất bạch)  
  &nbsp;
- 1744 **"Jia-Zi"** (甲子)  
  → **"Middle Yuan"** (中元 / zhong-yuan / trung nguyên)  
  → **"Four-Green"** (四緑 / si-lu / tứ lục)  
  &nbsp;
- 1804 **"Jia-Zi"** (甲子)
  → **"Lower Yuan"** (下元 / xia-yuan / hạ nguyên)  
  → **"Seven-Red"** (七赤 / qi-chi / thất xích)

Within each 60-year **"Yuan"** (元), the annual
star reverses. The effective year changes
at the astronomical **"Li-Chun"** (立春 / lập xuân)
boundary.

## 5. Houkan monthly calculation

The historical monthly rule uses a 60-month
**"Sixty Gan-Zhi Unit"** from **"Jia-Zi Month"**
(甲子月 / giáp-tý nguyệt) through **"Gui-Hai"**
(癸亥 / quý-hợi). Three such units form
the 180-month **"Three Epochs"** (三元 / san-yuan /
tam nguyên).

The source example gives **"Jia-Zi Month"**
(甲子月 / jia-zi-yue / giáp-tý nguyệt) →
**"One-White"** (一白), followed by
**"Yi-Chou"** (乙丑 / ất-sửu) →
**"Nine-Purple"** (九紫 / jiu-zi / cửu tử),
then **"Bing-Yin"** (丙寅 / bính-dần)
in the same reverse-star sequence.

The implementation anchors the
**"Upper-Yuan"** (上元) **"Jia-Zi Month"**
(甲子月) at the **"Li-Dong"** (立冬 / lập đông)
boundary in 1683, immediately before
the documented 1684 **"Jia-Zi Year"** (甲子年).

Monthly boundaries use the actual astronomical
**"Solar-Term Boundary"** (節氣交節 / 节气交节 /
jie-qi-jiao-jie / tiết khí giao tiết).

## 6. Houkan ordinary daily structure

The current implementation preserves
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

These mappings are not, by themselves,
the complete civil-date algorithm.

## 7. Houkan **"Leap Nine Stars"**

The selected practical implementation source
is the 1882 second edition of
**"Daily Nine-Stars Example List"**
(日家九星起例一覧), attributed to
**"Matsuura Keiho"** (松浦佳宝) and
**"Matsuura Saiyo"** (松浦最陽).

The source selects **"Later Jia-Zi"**
(後の甲子 / 後之甲子 / hou-zhi-jia-zi /
hậu giáp-tý) in the documented winter case.

The leap interval is 60 days:
30 days in reverse/**"Yin Dun"**
(陰遁 / 阴遁 / yin-dun / âm độn), then
30 days in forward/**"Yang Dun"**
(陽遁 / 阳遁 / yang-dun / dương độn) for winter;
summer uses the opposite order.

For implementation purposes, the summer
case receives the same **"Later Jia-Zi"**
(後の甲子 / 後之甲子 / hou-zhi-jia-zi /
hậu Giáp Tý) treatment as the documented
winter case. This is an implementation
decision based on the confirmed winter rule
and the parallel summer structure,
not a claim that the surviving summer
wording is equally explicit.

## 8. Houkan civil-date procedure

The daily implementation is event-driven:

1. Determine the traditional **"Sixty Gan-Zhi Unit"** (六十干支) day.
2. Determine the ordinary six-state period from
   the first **"Jia-Zi"** (甲子) on or after
   the relevant seasonal boundary.
3. Test **"Dong-Zhi"** (冬至/ đông chí) and **"Xia-Zhi"**
   (夏至 / xia-zhi / hạ chí) for **"Jia-Wu"** (甲午 / giáp-ngọ).
4. If the leap trigger occurs, begin the 60-day interval 30 days later.
5. Give the leap interval precedence over ordinary operation.
6. Resume ordinary operation afterward.

The project intentionally uses a recipe/state machine.
A table-driven implementation is equally acceptable;
a universal closed-form phase
formula is not required.

## 9. Houkan hourly calculation

The examined **"Houkan"** hourly implementation
uses three traditional double-hour groups:

```text
Zi-Wu-Mao-You → Upper Yuan
Yin-Shen-Si-Hai → Middle Yuan
Chen-Xu-Chou-Wei → Lower Yuan
```

The **"Yang Dun"** (陽遁 / 阳遁 / yang-dun /
dương độn) starting stars are
**"One-White"** (一白), **"Seven-Red"** (七赤),
and **"Four-Green"** (四緑). The **"Yin Dun"**
(陰遁 / 阴遁 / âm độn) starting stars are
**"Nine-Purple"** (九紫), **"Three-Jade"** (三碧),
and **"Six-White"** (六白).

The current code preserves the examined
**"Zi Hour"** (子時 / 子时 / zi-shi / giờ tý)
boundary at 23:00 and derives the hourly origin
from the relevant **"Jia-Ji"** (甲子) day.

## 10. Modern Kyusei Kigaku

The modern **"Kyusei Kigaku"** (九星気学) family
shares the common **"Purple-White"** (紫白)
and **"Nine Palace"** (九宮) infrastructure.
Its annual and monthly calculations
are implemented. Its daily and hourly
calculations remain explicit unresolved
method boundaries and do not inherit
**"Mizuno Kigaku"** (水野気学) rules.

## 11. Historical evidence versus implementation rules

Historical sources may describe broader
frameworks, competing procedures, or terms
whose exact historical operation is uncertain.
The implementation records a selected practical
recipe where the project has enough evidence to
do so. A remaining historical question must
not be filled silently with a modern convention.
