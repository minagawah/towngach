# Houkan Reconstruction

## 1. Purpose and Source Position

This document records the historical
reconstruction of the **"Houkan"**
(方鑑 / 方鉴 / fang-jian / phương giám)
**"Purple-White"** (紫白 / zi-bai / tử bạch)
system for software implementation.

The earlier historical framework is
associated with **"Matsuura Kinkaku"**
(松浦琴鶴). The practical daily leap
procedure currently implemented comes
from the 1882 second edition of
**"Daily Nine-Stars Example List"**
(日家九星起例一覧), attributed to
**"Matsuura Keihō"** (松浦佳宝) and
**"Matsuura Saiyō"** (松浦最陽).
This is a selected implementation source,
not a claim of universal historical priority.

## 2. Annual calculation

**"Annual Calculation"** (年家 / nian-jia /
niên gia) discussed in **"Houkan Secret"**
(方鑑秘伝集) gives one **"Yuan"** (元 / yuan /
nguyên) as a **"Sixty Gan-Zhi Unit"**
(六十干支 / 六十花甲 / liu-shi-gan-zhi /
lục thập hoa giáp), with **Three Epochs**
(三元 / san-yuan / tam nguyên) making
a 180-year cycle. Its documented anchors are:

- 1684 **"Jia-Zi"** (甲子 / giáp-tý)  
  → **"Upper Yuan"** (上元 / shang-yuan / thượng nguyên)  
  → **"One-White"** (一白 / yi-bai / nhất bạch)
- 1744 **"Jia-Zi"**  
  → **"Middle Yuan"** (中元 / zhong-yuan / trung nguyên)  
  → **"Four-Green"** (四緑 / si-lu / tứ lục)
- 1804 **"Jia-Zi"**  
  → **"Lower Yuan"** (下元 / xia-yuan / hạ nguyên)  
  → **"Seven-Red"** (七赤 / qi-chi / thất xích)

Within each 60-year **"Yuan"**, the annual star
proceeds in reverse order. The implementation
therefore uses the 180-year cycle and the three
documented starting stars rather than importing
a **"Kyusei Kigaku"** (九星気学 / 九星氣學 / 九星气学 /
jiu-xing-qi-xue / cửu tinh khí học) year rule.

The effective year changes at the astronomical
**"Li-Chun"** (立春 / lập xuân) boundary.

## 3. Monthly calculation

**"Monthly Calculation"** (月家 / yue-jia /
nguyệt gia) **"Houkan Secret"** (方鑑秘伝集)
states that a **"Jia-Zi Month"** (甲子月 /
giáp-tý nguyệt) through **"Gui-Hai"**
(癸亥 / quý-hợi) is one 60-month unit,
and three such units make 180 months.
The same passage gives the concrete example
that the November before a **"Jia-Zi Year"**
is a **"Jia-Zi Month"** (甲子月) with
**"One-White"** (一白 / yi-bai / nhất bạch),
the following **"Yi-Chou"** (乙丑 / ất-sửu)
month has **"Nine-Purple"** (九紫 / jiu-zi /
cửu tử), and the following **"Bing-Yin"**
(丙寅 / bính-dần) month follows
in the same reverse-star sequence.

The implementation anchors the **"Upper-Yuan"**
(上元 / shang-yuan / thượng nguyên)
**"Jia-Zi Month"** (甲子月) at the **"Li-Dong"**
(立冬 / lập đông) boundary in 1683, immediately
before the documented 1684 **"Jia-Zi Year"**
(甲子年 / jia-zi-nian / giáp-tý niên).
It then applies the 60-month circulation
in reverse star order, with the three 60-month
units beginning at **"One-White"** (一白),
**"Four-Green"** (四緑), and **"Seven-Red"** (七赤).

The monthly **"Sixty Gan-Zhi Unit"** (六十干支)
is determined from the astronomical
**"Solar-Term Boundary"** (節氣交節 / 节气交节 /
jie-qi-jiao-jie / tiết khí giao tiết),
so the monthly state changes at the actual
astronomical instant rather than at
a civil-calendar month boundary.

## 4. Ordinary daily structure

The 6 documented starting states are:

| 季節・元 | 遁 | 甲子起星 |
|---|---|---:|
| 冬至・上元 | 陽遁 | 一白 |
| 雨水・中元 | 陽遁 | 七赤 |
| 穀雨・下元 | 陽遁 | 四緑 |
| 夏至・上元 | 陰遁 | 九紫 |
| 処暑・中元 | 陰遁 | 三碧 |
| 霜降・下元 | 陰遁 | 六白 |

English translation for the above table follows:

| Seasonal point and Epoch | Dun | **"Jia-Zi"** starting star |
|---|---|---|
| **"Dong-Zhi"** (冬至 / đông chí) / **"Upper Yuan"** | **"Yang Dun"** (陽遁 / 阳遁 / yang-dun / dương độn) | **"One-White"** |
| **"Yu-Shui"** (雨水 / vũ thủy) / **"Middle Yuan"** | **"Yang Dun"** (陽遁 / 阳遁 / yang-dun / dương độn) | **"Seven-Red"** |
| **"Gu-Yu"** (穀雨 / 谷雨 / cốc vũ) / **"Lower Yuan"** | **"Yang Dun"** (陽遁 / 阳遁 / yang-dun / dương độn) | **"Four-Green"** |
| **"Xia-Zhi"** (夏至 / hạ chí) / **"Upper Yuan"** | **"Yin Dun"** (陰遁 / 阴遁 / yin-dun / âm độn) | **"Nine-Purple"** |
| **"Chu-Shu"** (処暑 / 處暑 / 处暑 / xử thử) / **"Middle Yuan"** | **"Yin Dun"** (陰遁 / 阴遁 / yin-dun / âm độn) | **"Three-Jade"** |
| **"Shuang-Jiang"** (霜降 / sương giáng) / **"Lower Yuan"** | **"Yin Dun"** (陰遁 / 阴遁 / yin-dun / âm độn) | **"Six-White"** |

The idealized circuit is 180 **"Yang Dun"**
(陽遁 / 阳遁 / yang-dun / dương độn) days +
180 **"Yin Dun"** (陰遁 / 阴遁 / yin-dun / âm độn)
days = 360 days. With **"Jia-Zi"** (甲子)
as index 0 and day index `i`:

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

## 5. Diagram reading

The **"Sixty Gan-Zhi Unit"** (六十干支) sequence
and **"Nine Palace"** (九宮 / 九宫 / jiu-gong /
cửu cung) region are separate logical structures.
They must not be matched merely by visual coordinates.

The **"Gan-Zhi"** (干支 / gan-zhi / hoa giáp)
cells are read down a column and then continued
from the top of the next column. The forward
midpoint is **"Jia-Wu"** (甲午 / giáp-ngọ);
the corresponding reverse midpoint is
**"Gui-Si"** (癸巳 / quý-tỵ).

## 6. **"Leap Nine Stars"** (閏九星 / 闰九星 / run-jiu-xing / nhuận cửu tinh)

The selected practical source for this
section is the 1882 second edition of
**"Daily Nine-Stars Examples List"**
(日家九星起例一覧) by **"Matsuura Keihō"**
(松浦佳宝) and **"Matsuura Saiyō"** (松浦最陽).
Its explanation of the winter leap procedure contains:

> **"Jia-Zi goes forward"** (「甲午の進み、合たる」)

The same source explains the timing condition with:

> **"The Season is still early"** (「甚だ気候早くして」)

and then explicitly directs:

> **"Using the later Jia-Zi"** (「後の甲子を取用ひ」)

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

Winter is reverse/**"Yin Dun"** (陰遁 / 阴遁 /
yin-dun / âm độn) first and forward/**"Yang Dun"**
(陽遁 / 阳遁 / yang-dun / dương độn) second.

Summer is forward/**"Yang Dun"** (陽遁 / 阳遁 /
yang-dun / dương độn) first and reverse/**"Yin Dun"**
(陰遁 / 阴遁 / yin-dun / âm độn) second.

The source-defined midpoint stars are
**"Seven-Red"** (七赤) for **"Yang Dun"**
(陽遁 / 阳遁 / yang-dun / dương độn) and
**"Three-Jade"** (三碧) for **"Yin Dun"**
(陰遁 / 阴遁 / yin-dun / âm độn).

For implementation purposes, the summer case
receives the same **"Later Jia-Zi"** (後の甲子)
treatment as the documented winter case.
This is an implementation decision based on
the confirmed winter rule and the parallel
summer structure; it is not presented as
a claim that the surviving summer wording
is equally explicit.

## 7. Solar-year drift

The historical explanation contrasts 360 days
with **365 days 25 刻**, giving a difference of
**5 days 25 刻** per year. This is why the 360-day
idealized star circuit cannot by itself serve
as the complete civil-date algorithm.

## 8. Civil-date implementation

The current daily implementation is event-driven and finite-state:

1. Determine the traditional **"Sixty Gan-Zhi Unit"** (六十干支) day.
2. Determine the active ordinary six-state period
   from the first **"Jia-Zi"** (甲子) on or after
   the relevant seasonal boundary.
3. Test **"Dong-Zhi"** (冬至 / đông chí) and **"Xia-Zhi"**
   (夏至 / hạ chí) for a traditional day of
   **"Jia-Wu"** (甲午 / jia-wu / giáp-ngọ).
4. If so, begin the 60-day **"Leap Nine Stars"**
   (閏九星 / 闰九星 / run-jiu-xing / nhuận cửu tinh)
   interval 30 days later at **"Later Jia-Zi"** (後の甲子).
5. Give the leap interval precedence over the ordinary daily state.
6. Resume ordinary operation after the 60-day interval.

The project intentionally uses a recipe/state
machine. A table-driven implementation is equally
acceptable; a universal closed-form phase formula
is not required.

## 9. Hourly calculation

The examined **"Houkan"** (方鑑) hourly implementation
uses the three confirmed traditional double-hour groups:

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
and **"Six-White"** (六白).

The current code preserves the examined
**"Zi Hour"** (子時 / 子时 / zi-shi / giờ Tý)
boundary at 23:00 and derives the hourly origin
from the relevant **"Jia-Ji"** (甲己 / jia-ji /
giáp-kỷ) day. This section records the current
implementation rather than claiming
a new historical reconstruction beyond
the examined source material.

## 10. Implementation status

| Level | Status |
|---|---|
| Annual | Implemented from the documented 180-year **"Three Epochs"** (三元 / san-yuan / tam nguyên) structure |
| Monthly | Implemented from the documented 180-month **"Three Epochs"** (三元 / san-yuan / tam nguyên) structure and astronomical boundaries |
| Daily | Implemented, including the selected **"Leap Nine Stars"** (閏九星 / 闰九星 / run-jiu-xing / nhuận cửu tinh) recipe |
| Hourly | Implemented from the examined **"Three Epochs"** hourly structure |

The project distinguishes historical evidence
from implementation choices. Where the summer
leap rule is adopted by symmetry, that fact
is explicitly recorded instead of being
presented as a verbatim source rule.

The implementation does not borrow
**"Kyusei Kigaku"** (九星気学) rules to fill
**"Houkan"** (方鑑) rules, and it does not
require a hidden mathematical phase when
a finite-state historical recipe is sufficient.
