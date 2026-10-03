# Houkan historical reconstruction

## 1. Purpose and source position

This document records the historical reconstruction of the Houkan (方鑑) daily Purple-White system for software implementation.

The earlier research centered on **松浦琴鶴 (Matsuura Kinkaku)**. The current practical daily leap implementation follows the 1882 second edition of **『日家九星起例一覧』**, attributed to **松浦佳宝 (Matsuura Keihō)** and **松浦最陽 (Matsuura Saiyō)**. This is a selected implementation source, not a claim that every later practical rule originated with Kinkaku.

## 2. Ordinary daily structure

The six documented states are:

| 季節・元 | 遁 | 甲子起星 |
|---|---|---:|
| 冬至・上元 | 陽遁 | 一白 |
| 雨水・中元 | 陽遁 | 七赤 |
| 穀雨・下元 | 陽遁 | 四緑 |
| 夏至・上元 | 陰遁 | 九紫 |
| 処暑・中元 | 陰遁 | 三碧 |
| 霜降・下元 | 陰遁 | 六白 |

The idealized circuit is 180 Yang + 180 Yin = 360 days.

With 甲子 = 0:

```text
陽遁上元 = normalize9(1 + i)
陽遁中元 = normalize9(7 + i)
陽遁下元 = normalize9(4 + i)
陰遁上元 = normalize9(9 - i)
陰遁中元 = normalize9(3 - i)
陰遁下元 = normalize9(6 - i)
```

These are local diagram mappings, not the complete civil-date algorithm.

## 3. Diagram reading

The 60 Gan-Zhi sequence and Nine-Palace/star region are separate logical structures. Do not match them merely by visual coordinates.

The Gan-Zhi cells are read down a column, then from the top of the next column. The forward midpoint is **甲午**; the corresponding reverse midpoint is **癸巳**.

## 4. Historical 配遇改革 statement

Kinkaku's material describes a starting condition of **甲子月 + 甲子日**, a 60-month circulation, and reform of the daily-star/sexagenary pairing at monthly Three-Epoch boundaries (**配遇改革**).

Earlier research considered this the possible primary daily synchronization algorithm. That interpretation has been withdrawn as the current primary mechanism. The statement remains historical evidence and may be revisited only if the leap reconstruction proves it necessary.

## 5. 閏九星

The leap procedure is associated with the two solstices (二至) and the sexagenary sequence. The key wording is:

> 「甲午の進み、合たる」

The winter example says the earlier 甲子 is too early:

> 「甚だ気候早くして」

and then explicitly says:

> 「後の甲子を取用ひ」

The current implementation therefore uses the **later 甲子** as the leap starting point in the documented winter case.

```text
甲子 … 癸巳    30 days
甲午 … 癸亥    30 days
翌甲子         ordinary sequence resumes
```

Winter: reverse/Yin first, forward/Yang second.
Summer: forward/Yang first, reverse/Yin second.

Leap midpoint stars: 七赤 (Yang), 三碧 (Yin).

## 6. Solar-year drift

The historical explanation uses **365 days 25 刻** versus the 360-day star circuit, a difference of **5 days 25 刻 per year**.

## 7. Status classification

### Confirmed

- Six ordinary 60-day starting states.
- 360-day idealized daily structure.
- 二至 and the sexagenary cycle are central to 閏九星.
- 甲午 is the forward midpoint; 癸巳 the reverse midpoint.
- The winter example explicitly selects later 甲子.
- The leap interval is 60 days, split 30 + 30.
- Winter is reverse-first/forward-second; summer forward-first/reverse-second.

### Current implementation decision

Use the later 甲子 in the documented winter case. Treat the leap procedure as an event/state sequence rather than assuming a hidden phase.

### Withdrawn

- 配遇改革 as the primary daily civil-date algorithm.
- A generic nearest-甲子 rule.
- Modern 九星気学 as a substitute for missing historical rules.
- Invented phase transformations such as 4↔7.

### Unresolved

- The exact year-independent civil-date predicate for all applicable leap cases.
- The fully explicit Summer Solstice civil-date anchor.
- Whether 癸巳 is only the midpoint or also an independent trigger.
- Any remaining character-level uncertainties in the original worked example.

## 8. Next research target

Determine the year-independent civil-date predicate for the relevant solstice/甲午 relation, including the Summer Solstice case, without replacing the historical rule with modern practice.
