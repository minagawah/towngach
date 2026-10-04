# Historical Reconstruction of "Houkan"

## 1. Purpose and Source Position

This document records the historical
reconstruction of the **"Houkan"**
(方鑑 / 方鉴 / fang-jian / phương giám)
**"Daily Purple-White"** system
for software implementation.

The broader historical framework is
associated with **Matsuura Kinkaku** (松浦琴鶴).
For the practical leap procedure, the current
implementation uses the 1882 second edition of
**"Daily Nine-Stars Example List"**
(日家九星起例一覧), attributed to
**Matsuura Keihō** (松浦佳宝)
and **Matsuura Saiyō** (松浦最陽).
This is an implementation-source decision
for a historically situated procedure,
not a claim about universal historical priority.

The 1887 **"Nine-Stars Diagram Collection"**
(九星図説日要精義大成) is used as later
comparative evidence. It is useful for
checking continuity and presentation,
but it does not replace the selected
1882 implementation rule.

## 2. Ordinary daily structure

The 6 documented starting states are:

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

The idealized circuit is 180 Yang days +
180 Yin days = 360 days.  
With **"Jia-Zi"** (甲子 / 甲子 / jia-zi / giáp-tý)
as index 0 and day index `i`:

```text
Yang-Dun Shang-Yuan = normalize9(1 + i)
Yang-Dun Zhong-Yuan = normalize9(7 + i)
Yang-Dun Xia-Yuan   = normalize9(4 + i)
Yin-Dun Shang-Yuan  = normalize9(9 - i)
Yin-Dun Zhong-Yuan  = normalize9(3 - i)
Yin-Dun Xia-Yuan    = normalize9(6 - i)
```

These are local diagram mappings, not
a complete civil-date algorithm.

## 3. Diagram reading

The **"60 Gan-Zhi"** sequence and the
**"Nine-Palace"**/star region are separate
logical structures. They must not be
matched merely by visual coordinates.

The **"Gan-Zhi"** cells are read down a column
and then continued from the top of the next column.
The forward midpoint is **"Jia-Wu"** (甲午 / 甲午 /
jia-wu / giáp-ngọ); the corresponding reverse
midpoint is **"Gui-Si"** (癸巳 / 癸巳 / gui-si / quý-tỵ).

## 4. **"Leap Nine Stars"** (閏九星 / 闰九星 / run-jiu-xing / nhuận cửu tinh) and its sources

The key practical source for this section
is the 1882 second edition of
**"Daily Nine-Stars Examples List"**
(日家九星起例一覧). In its explanation of the leap
procedure, the source uses the expressions:

> **"Jia-Zi goes forward"** (「甲午の進み、合たる」)
> **"The Season is still early"** (「甚だ気候早くして」)
> **"Using the later Jia-Ji"** (「後の甲子を取用ひ」)

The first expression describes the relevant
relation involving **"Jia-Wu"**. The second
explains why the earlier **"Jia-Zi"** is not used.
The third explicitly selects the **"Later Jia-Zi"**
(後の甲子 / 後之甲子 / hou-zhi-jia-zi / hậu Giáp Tý).

The source's worked winter case therefore gives
a direct implementation recipe: when the relevant
solstice falls on Jia-Wu, the leap interval starts
at the **"Later Jia-Zi"**, which is
30 days after **"Jia-Wu"**.

The resulting 60-day interval is:

```text
Jia-Zi … Gui-Si    30 days
Jia-Wu … Gui-Hai   30 days
following Jia-Zi   ordinary operation resumes
```

The winter interval is Reverse/**Yin** First
and Forward/**Yang** Second. The summer interval
is Forward/**Yang** First and Reverse/**Yin** Second.

The implementation treats the summer case
symmetrically: when **"Xia-Zhi"** (夏至 / hạ chí)
falls on **"Jia-Wu"**, the **"Later Jia-Zi"** is
likewise used as the 60-day leap starting point.

This is a program implementation decision based
on the confirmed winter rule and the parallel
summer structure. It is not a claim that
the surviving summer wording states the
**"Later-Jia-Zi"** rule with the same
explicitness as the winter passage.

The later 1887 **"Nine-Stars Diagram Collection"**
(九星図説日要精義大成) is used only as corroboration
of the same general daily framework
and is not used to replace the 1882 rule.

## 5. Civil-date implementation

The current implementation is event-driven
and finite-state:

1. Determine the traditional **"Sixty Gan-Zhi Unit"**
   (六十干支 / 六十花甲 / liu-shi-gan-zhi / lục thập hoa giáp) day.
2. Determine the ordinary six-state daily period from
   the first **"Jia-Zi"** on or after the relevant seasonal boundary.
3. Test the two solstices, **"Dong-Zhi"** (冬至 / đông chí) and
   **"Xia-Zhi"**, for a traditional day of **"Jia-Wu"**.
4. If the test succeeds, start **"Leap Nine Stars"** (閏九星)
   30 days later at **"Later Jia-Zi"**.
5. Use the resulting 60-day leap interval in preference
   to the ordinary daily state.
6. Resume ordinary operation after the leap interval.

This implementation intentionally uses
a recipe/state machine rather than searching
for a universal hidden phase equation.
A table-driven equivalent would also satisfy
the project's implementation goal.

## 6. Solar-year drift

The historical explanation contrasts
a 360-day star circuit with **"365 days 25 刻"**,
giving a difference of **"5 days 25 刻"** per year.

This explains why a simple assumption that
the 360-day star circuit and the astronomical year
remain permanently synchronized cannot be used
as a complete civil-date algorithm.

## 7. Current implementation status

### Confirmed and implemented

- The six ordinary daily 60-day starting states.
- The 360-day idealized daily circuit.
- The separation between **"Gan-Zhi"** cells and
  **"Nine-Palace"** cells in the diagrams.
- **"Jia-Wu"** as the forward midpoint and
  **"Gui-Si"** as the reverse midpoint.
- The winter leap trigger when the relevant solstice is **"Jia-Wu"**.
- **"Later Jia-Zi"** as the winter leap starting point.
- The 60-day leap interval, split 30 + 30.
- Winter Reverse-First / Forward-Second operation.
- Summer Forward-First / Reverse-Second operation.
- The summer **"Later-Jia-Zi"** rule as an explicit implementation decision.

### Still unresolved elsewhere in Houkan

- A final Houkan-specific annual starting-star calculation.
- A final Houkan-specific monthly starting-star calculation.
  The actual astronomical Solar-Term boundary is implemented,
  but the monthly star calculation remains unresolved.

These unresolved annual and monthly questions
do not block the current daily implementation.

## 8. Historical interpretation policy

The project distinguishes historical evidence from
implementation decisions. A statement that is
explicit in the selected source is recorded as such.
A program rule that is adopted by symmetry or
reconstruction is identified as an implementation
decision rather than presented as a verbatim historical rule.

The project does not substitute **"Kyusei Kigaku"**
rules for unresolved **"Houkan"** rules, and
it does not require a closed-form mathematical
formula when a finite-state or table-driven
historical recipe is sufficient.

