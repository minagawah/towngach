# Definitions

This document is the detailed public specification for Towngach's Purple-White Nine Stars (紫白九星) calculations. It distinguishes shared infrastructure from historically specific rules.

## 1. Scope and method families

Towngach calculates Purple-White Nine Stars (紫白九星) through the Nine Palaces (九宮). Method identity is part of the public API. Houkan (方鑑) is a historical reconstruction family and is distinct from modern Kyusei Kigaku (九星気学) and Mizuno Kigaku (水野気学).

## 2. Shared infrastructure

The sexagenary cycle (六十干支) is indexed from Jia-Zi (甲子) at zero. Nine-Palace and Forward/Reverse Flight (順飛・逆飛) structures are shared only where the historical methods genuinely agree.

## 3. Houkan ordinary daily structure

The six documented starting states are:

| Seasonal point | Direction | Epoch | 甲子 star |
|---|---|---|---:|
| 冬至 | 陽遁 | 上元 | 一白 |
| 雨水 | 陽遁 | 中元 | 七赤 |
| 穀雨 | 陽遁 | 下元 | 四緑 |
| 夏至 | 陰遁 | 上元 | 九紫 |
| 処暑 | 陰遁 | 中元 | 三碧 |
| 霜降 | 陰遁 | 下元 | 六白 |

The idealized cycle is 6 × 60 = 360 sexagenary days. With 甲子 = 0 and day index `i`:

```text
陽遁上元 = normalize9(1 + i)
陽遁中元 = normalize9(7 + i)
陽遁下元 = normalize9(4 + i)
陰遁上元 = normalize9(9 - i)
陰遁中元 = normalize9(3 - i)
陰遁下元 = normalize9(6 - i)
```

These reproduce local historical tables but do not determine which table applies to every civil date.

## 4. Current historical implementation source

The current practical leap implementation follows the 1882 second edition of 『日家九星起例一覧』, attributed to **松浦佳宝** and **松浦最陽**. This is an implementation-source decision for a historically situated Houkan procedure, not a claim about universal historical priority.

The broader Houkan framework remains associated with **松浦琴鶴** and his writings.

## 5. 閏九星

The leap-star explanation uses the two solstices (二至) and the sexagenary sequence. Important source wording is:

- 「甲午の進み、合たる」
- 「甚だ気候早くして」
- 「後の甲子を取用ひ」

The current implementation adopts the later 甲子 in the documented winter case. The leap interval is:

```text
甲子 … 癸巳    30 days
甲午 … 癸亥    30 days
翌甲子         ordinary sequence resumes
```

Winter is reverse/Yin first and forward/Yang second. Summer is forward/Yang first and reverse/Yin second. Leap midpoint stars are 七赤 for Yang and 三碧 for Yin.

The project does **not** replace this with a nearest-甲子 rule.

## 6. Central sexagenary points and diagram reading

In the relevant forward sequence, the midpoint is **甲午**. In the reverse orientation, the corresponding midpoint is **癸巳**. The Gan-Zhi region and Nine-Palace region are separate logical structures; visual coordinate matching is not valid.

The 60 Gan-Zhi are read down a column and then continued from the top of the next column. The seven-column visual arrangement contains exactly 60 logical Gan-Zhi entries.

## 7. Solar-year drift

The historical explanation contrasts a 360-day star circuit with **365 days 25 刻**:

```text
365 days 25 刻 - 360 days = 5 days 25 刻 per year
```

An earlier 355-day transcription was corrected to 365 days 25 刻 and must not be reintroduced.

## 8. 配遇改革: historical evidence, not the current primary algorithm

Kinkaku's material describes 甲子月 + 甲子日, a 60-month circulation, and reform of the daily-star/sexagenary pairing at monthly Three-Epoch boundaries (**配遇改革**). This remains important historical evidence, but the current reconstruction does not use it as the primary civil-date daily algorithm.

Do not invent a hidden phase or a 4↔7 transformation from this wording.

## 9. Unresolved rules

The main unresolved question is the exact year-independent civil-date predicate for detecting the historical solstice/sexagenary relation, especially for the Summer Solstice case. Where the evidence does not determine a unique procedure, use an explicit `UNRESOLVED_HISTORICAL_RULE` state rather than modern Kigaku behavior.
