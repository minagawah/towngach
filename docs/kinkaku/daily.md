# Houkan Daily Purple-White (日家紫白)

## 1. Ordinary structure

```text
冬至・上元・陽遁 → 甲子一白
雨水・中元・陽遁 → 甲子七赤
穀雨・下元・陽遁 → 甲子四緑
夏至・上元・陰遁 → 甲子九紫
処暑・中元・陰遁 → 甲子三碧
霜降・下元・陰遁 → 甲子六白
```

The idealized circuit is 360 days = 6 × 60.

With 甲子 = 0:

```text
陽遁上元 = normalize9(1 + i)
陽遁中元 = normalize9(7 + i)
陽遁下元 = normalize9(4 + i)
陰遁上元 = normalize9(9 - i)
陰遁中元 = normalize9(3 - i)
陰遁下元 = normalize9(6 - i)
```

## 2. Diagram reading

The Gan-Zhi sequence and Nine-Palace region are separate logical structures. Read the 60 Gan-Zhi down each column and continue at the top of the next column. The forward midpoint is **甲午**; reverse orientation gives **癸巳**.

Do not match Gan-Zhi and palace cells merely by visual coordinate.

## 3. 閏九星

The historical explanation links the solstices (二至) to the sexagenary sequence.

Important wording:

> 「甲午の進み、合たる」

> 「甚だ気候早くして」

> 「後の甲子を取用ひ」

The current implementation adopts the **later 甲子** in the documented winter case.

```text
甲子 … 癸巳    30 days
甲午 … 癸亥    30 days
翌甲子         ordinary operation resumes
```

Winter is reverse/Yin first, then forward/Yang. Summer is forward/Yang first, then reverse/Yin. Leap midpoint stars are 七赤 and 三碧 respectively.

## 4. Why later 甲子

The source explicitly says the earlier 甲子 is 「甚だ気候早くして」 and then directs the use of the later 甲子. This project therefore treats **後の甲子を取用ひ** as the implementation rule, not merely as a nearest-day convenience.

## 5. Solar-year drift

The historical explanation contrasts 360 days with **365 days 25 刻**:

```text
365 days 25 刻 - 360 days = 5 days 25 刻
```

## 6. Source positioning

The current practical leap specification is the 1882 second edition of **『日家九星起例一覧』**, attributed to **松浦佳宝** and **松浦最陽**. **松浦琴鶴** remains the principal earlier historical framework used for comparison.

## 7. Withdrawn interpretations

- 配遇改革 as the primary daily civil-date algorithm.
- Nearest-甲子 as a replacement for the adopted later 甲子.
- Fixed nine-day blocks.
- Visual coordinate matching between Gan-Zhi and palace cells.
- Hidden phase transformations.
- Modern 九星気学 as a repair mechanism.

## 8. Unresolved

The main question is the exact year-independent civil-date predicate that recognizes the relevant solstice/甲午 relation, especially in the Summer Solstice case. Until established, code should be conservative and may return `UNRESOLVED_HISTORICAL_RULE`.
