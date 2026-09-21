# Details on Kinkaku's "Houkan" (方鑑) Method

![kinkaku_hiden](../../kinkaku_hiden.jpg)

## 1. A plain-language summary of Matsuura Kinkaku's four calendrical levels

Matsuura Kinkaku's (松浦琴鶴) **"Houkan"** (方鑑) method treats the annual, monthly, daily, and hourly **"Nine-Star"** (九星) calculations as related layers of one Purple-White system, but it does not reduce all four layers to one universal arithmetic formula. At the annual level, **"Sixty Gan-Zhi Years"** (干支紀年) form one **"Three-Epoch"** (三元) unit, and three such units form a 180-year cycle. In the **"Upper Epoch"** (上元) the **"Jia-Zi"** (甲子) year begins with One White, in the **"Middle Epoch"** (中元) the **"Jia-Zi"** (甲子) year begins with **"Four Green"** (四緑), and in the **"Lower Epoch"** (下元) the **"Jia-Zi"** (甲子) year begins with **"Seven Red"** (七赤). The annual star is then obtained by combining the **"Sixty Gan-Zhi Years"** (干支紀年) with the **"Three-Epoch"** (三元) in the documented **"forward"** (順飛) and **"reverse"** (逆飛) arrangement; the important point for this historical reconstruction is that the three starting stars belong to the three separate epochs, not to a single temporal sequence called "One-Four-Seven."  

The monthly layer has the same 60-unit structure on a shorter timescale. **"Jia-Zi"** (甲子) month through Gui-Hai month make one 60-month epoch, and Upper, Middle, and Lower Epochs together make 180 months. In the **"Upper Epoch"** (上元), **"Jia-Zi"** (甲子) month begins with **"One White"** (一白); in the **"Middle Epoch"** (中元) it begins with **"Four Green"** (四緑); in the **"Lower Epoch"** (下元) it begins with **"Seven Red"** (七赤). The monthly diagrams show the **"Sixty Gan-Zhi Month"** (干支紀月) paired with a **"Nine-Star"** (九星) value, with the star changing one step at a time from month to month. The monthly **"Three-Epoch"** (三元) therefore has its own state and cannot simply be replaced by ordinary Gregorian or civil-month numbering.  

The daily layer is the most distinctive and the least completely reconstructed part of the method. The documented starting states divide the solar year into six seasonal sections. After the **"Winter Solstice"** (冬至 / dong-zhi / đông chí), **"Rain Water"** (雨水 / yu-shui / vũ thủy), and **"Grain Rain"** (穀雨 / 谷雨 / gu-yu / cốc vũ), the system is in **"Yang Flight"** (陽遁) and uses the Upper, Middle, and Lower daily epochs beginning respectively with **"One White"** (一白), **"Seven Red"** (七赤), and **"Four Green"** (四緑) when the relevant day is **"Jia-Zi"** (甲子). After the Summer Solstice, Limit of Heat, and Frost Descent, the system is in Yin Flight and uses the Upper, Middle, and Lower daily epochs beginning respectively with **"Nine Purple"** (九紫), **"Three Jade"** (三碧), and **"Six White"** (六白) at the corresponding **"Jia-Zi"** (甲子) day. These six statements define the documented seasonal starting states, but they do not by themselves define the complete day-by-day calculation. Matsuura explicitly says that the daily circulation requires the transmitted **"Houkan"** rule and that he investigated competing older rules concerning which **"Jia-Zi"** (甲子) near the solstices should be taken as the beginning of an epoch.  

The daily system also has a second, deeper layer. Matsuura states that the **"Three-Epoch"** (三元) daily **"Nine-Star"** (九星) arrangement begins at the conjunction of a **"Jia-Zi"** (甲子) month and a **"Jia-Zi"** (甲子) day, then circulates through sixty months according to the relevant **"forward"** (順飛) or **"reverse"** (逆飛) order. At the beginning of each monthly Three Epoch he says that the pairing, or correspondence, between the daily stars and the sexagenary structure is "reformed" or renewed. This statement is the central reason why the daily method cannot safely be replaced by a generic 180-day **"Nine-Star"** (九星) formula. The exact computational meaning of this reform of the pairing is still under historical reconstruction.  

Finally, the hourly layer divides time into three **"Three-Epoch"** (三元) groups of five days each, or sixty traditional double-hours per epoch. The documented Yang starting stars are **"One White"** (一白), **"Seven Red"** (七赤), and **"Four Green"** (四緑) for the three groups, while the Yin starting stars are **"Nine Purple"** (九紫), **"Three Jade"** (三碧), and **"Six White"** (六白). One star is advanced for each traditional double-hour in **"Yang Flight"** (陽遁) and reversed in **"Yin Flight"** (陰遁). The historical material also uses day classifications involving the four branch groups **"zi-wu-mao-you"** (子午卯酉), **"yin-shen-si-hai"** (寅申巳亥), and **"chen-xu-chou-wei"** (辰戌丑未) together with **"Jia-Ji"** (甲己) condition to determine the appropriate starting state. The exact OCR of some individual day names in the surviving transcription is imperfect, so the group-level rule is safer than silently correcting every character.  

The four levels are therefore related but not interchangeable. Annual and monthly calculations have explicit 60-unit **"Three-Epoch"** (三元) structures; the daily calculation adds six seasonal starting states, a **"Jia-Zi"** (甲子) month/**"Jia-Zi"** (甲子) day synchronization, a sixty-month circulation, a transformation of the star/sexagenary pairing at monthly **"Three-Epoch"** (三元) boundaries, and a separate leap-bureau problem; and the hourly calculation uses five-day/sixty-double-hour epochs with its own day-group conditions. The purpose of this document is to preserve what the historical material actually establishes while keeping the still-unresolved parts visibly unresolved.  

## 2. Scope and historical status  

This document describes the **"Houkan"** (方鑑) calculation family investigated in connection with Matsuura Kinkaku (松浦琴鶴), especially the rules preserved in the Meiji-period editions of 方鑑秘伝集 and 方鑑弁説 : 神殺撰要.  

The reconstruction distinguishes four levels of certainty:  

-   confirmed: directly supported by a primary text, diagram, or
    machine-readable transcription;
-   documented but not yet algorithmically reconstructed: explicitly
    stated by the source but not yet reducible to an unambiguous
    program;
-   working interpretation: a computational hypothesis used for
    investigation;
-   unresolved: unsafe to hard-code as historical Matsuura behavior.  

Modern **"Nine-Star"** (九星) or Purple-White formulas must not be substituted for an
unresolved Matsuura rule.  

## 3. Annual calculation (年家)  

The historical annual structure treats **"Jia-Zi"** (甲子) through Gui-Hai, the sixty
sexagenary years, as one epoch. Three such epochs form 180 years.  

At the **"Jia-Zi"** (甲子) year of the Upper, Middle, and Lower Epochs the central stars are **"One White"** (一白), **"Four Green"** (四緑), and **"Seven Red"** (七赤) respectively.  

The source explicitly explains that "**"One White"** (一白), **"Four Green"** (四緑), **"Seven Red"** (七赤)" are the names of the central stars at the **"Jia-Zi"** (甲子) year of the three separate annual epochs. This is not a claim that a single epoch progresses temporally as 1 → 4 → 7.  

The annual source also describes the relationship between the year and the star as involving the documented forward/reverse arrangement. The detailed historical implementation of annual output is not the current research bottleneck; the crucial point is the 60-year/180-year structure and the three **"Jia-Zi"** (甲子) starting states.  

Historical examples in the source include a **"Jia-Zi"** (甲子) **"Upper Epoch"** (上元) beginning in the seventeenth century and subsequent Middle and **"Lower Epochs"** (下元). These examples are historical fixtures, not a substitute for the general cycle.  

## 4. Monthly calculation (月家)   

The monthly **"Three-Epoch"** (三元) has the same structural relationship as the
annual **"Three-Epoch"** (三元), but with sexagenary months.  

**"Jia-Zi"** (甲子) month through Gui-Hai month comprise 60 months, one epoch; Upper, Middle, and Lower together comprise 180 months.  

The **"Jia-Zi"** (甲子) starting stars are **"One White"** (一白), **"Four Green"** (四緑), and **"Seven Red"** (七赤) for the Upper, Middle, and Lower Epochs respectively.  

The monthly diagrams show a twelve-month view in which sexagenary-month entries are paired with **"Nine-Star"** (九星) entries. The month sequence must be interpreted from the actual month labels, because the printed layout runs from December toward January rather than presenting a simple left-to-right January-to-December sequence.  

A directly observed computational pattern is that, within each monthly epoch diagram, the **"Nine-Star"** (九星) value changes by one step from month to month in the reverse numerical direction, wrapping through the nine stars. Thus the **"Upper-Epoch"** sequence beginning at **"Jia-Zi"** (甲子) is 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 9, 8 for the first twelve sexagenary months; the **"Middle-Epoch"** sequence begins 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3, 2; and the **"Lower-Epoch"** sequence begins 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6, 5. These sequences are derived from the surviving monthly diagrams and should remain tied to the diagram data until every boundary cell is source-verified.  

Some surviving transcription cells contain apparent OCR or copying anomalies. Such cells must be verified against the page image before becoming authoritative source data.  

## 5. Daily calculation (日家)  

The daily source explicitly divides the year into six daily **"Three-Epoch"** (三元)
starting states.  

**"Yang Flight"** (陽遁) uses **"Winter Solstice"** (冬至), **"Rain Water"** (雨水), and **"Grain Rain"** (穀雨). At the corresponding **"Jia-Zi"** (甲子) day, these begin the Upper, Middle, and Lower daily epochs with **"One White"** (一白), **"Seven Red"** (七赤), and **"Four Green"** (四緑) respectively.  

**"Yin Flight"** (陰遁) uses **"Summer Solstice"** (夏至), **"End of Heat"** (処暑), and Frost Descent. At the corresponding **"Jia-Zi"** (甲子) day, these begin the Upper, Middle, and Lower daily epochs with **"Nine Purple"** (九紫), **"Three Jade"** (三碧), and **"Six White"** (六白) respectively.  

The source describes the six groups together as a 360-day idealized circuit: six groups of sixty days. This statement is a structural description of the **"Nine-Star"** (九星) daily system, not sufficient by itself to produce a complete civil-calendar algorithm.  

**Matsuura** (松浦琴鶴) explicitly discusses disagreement in earlier calendrical literature about whether the relevant **"Jia-Zi"** (甲子) before or after a solstice should be used to establish the beginning of an epoch. He says that he investigated the problem and obtained what he regarded as the true basis, then prepared an allocation diagram. This allocation diagram and the day-by-day circulation it represents are therefore central historical evidence.  

## 6. The daily **"Jia-Zi"** (甲子) synchronization and 配遇改革  

The most important historical statement for the unresolved daily calculation is that the daily **"Three-Epoch"** (三元) **"Nine-Star"** (九星) system begins with a **"Jia-Zi"** (甲子) month and a **"Jia-Zi"** (甲子) day, circulates through sixty months, and at each beginning of a monthly Three Epoch reforms the correspondence between the daily star and the sexagenary structure.  

The two conditions of a synchronization can be represented computationally as:
  
`sexagenaryMonth(date) == Jia-Zi`
  
and  

`sexagenaryDay(date) == Jia-Zi`.  

The month condition is determined from the **"Solar-Term"** (節気) month boundary, the month branch, the year stem, and the Five Tigers Rule. The day condition is determined from a continuous day index modulo sixty. These two calculations should remain separate from the historical **"Nine-Star"** (九星) transformation.  

What remains unresolved is the exact meaning of **"Haigu-Kaikaku"** (配遇改革). It may involve a change of phase, a change of starting star, a change of direction, a cyclic transformation of the star/day pairing, or a combination of these. The historical wording alone does not justify selecting one of those possibilities.  

## 7. Leap bureau (日家閏局)  

The historical leap-bureau explanation treats the ordinary **"Yang"** and Yin daily progressions as an idealized 360-day system while the seasonal year is longer. The accumulated difference eventually requires a correction described as a leap bureau.  

The surviving explanation includes an example around the **"Summer Solstice"** (夏至) of 1894, identifies a **"Jia-Wu"** (甲午) day, and discusses the accumulated seasonal discrepancy. It also explicitly uses the phase families 1 / 4 / 7 for **"Yang"** and 9 / 6 / 3 for **"Yin"**.  

These expressions are phase-family labels, not statements that the stars necessarily occur in those numerical orders in every diagram or seasonal listing.  

The exact entry and exit rule of a leap bureau, whether the correction replaces or overlays ordinary progression, and how it interacts with the **"Jia-Zi"** (甲子) synchronization and monthly **"Three-Epoch"** (三元) transformation remain unresolved.  

## 8. Hourly calculation (時家)  

The hourly material divides each seasonal section into three epochs. One epoch is five days, corresponding to **"sixty traditional double-hours"** (六十時辰 / 六十时辰 / liu-shi shi-chen / sáu mươi thời thần). **"Three epochs"** (三元) therefore cover fifteen days.  

The **"Yang"** starting stars are **"One White"** (一白) for the **"Upper Epoch"** (上元), **"Seven Red"** (七赤) for the **"Middle Epoch"** (中元), and **"Four Green"** (四緑) for the **"Lower Epoch"** (下元). The **"Yin"** starting stars are **"Nine Purple"** (九紫), **"Three Jade"** (三碧), and **"Six White"** (六白).  

The source groups days by the four branch families **"zi-wu-mao-you"** (子午卯酉), **"yin-shen-si-hai"** (寅申巳亥), and **"chen-xu-chou-wei"** (辰戌丑未) and uses a **"Jia-Ji"** (甲己) condition in determining the starting state. One star is assigned per double-hour, with **"Yang"** using forward movement and **"Yin"** using reverse movement.
  
Because the surviving transcription has OCR errors in several individual
sexagenary-day names, the **"Branch"** (支) group and **"Starting Star"** (起始星) structure should be treated as the confirmed core until the page images are checked character by character.  

## 9. **"Solar-Term"** (節気) boundary handling  

Where the implementation needs an actual **"Solar-Term"** (節気) transition, the astronomical transition instant should be preserved. A transition at **05:00:00** belongs to the new interval from **05:00:00** onward; the preceding second remains in the previous interval.  

This infrastructure is independent of the unresolved historical question of which **"Jia-Zi"** (甲子) day a traditional source chooses as an epoch boundary.
  
## 10. Five Tigers Rule and **"Jia-Zi"** (甲子) month detection
  
For the **"Wu-Gui"** (戊癸) year-stem group, the **"Tiger"** (寅) month begins as **"Jia-Yin"** (甲寅). The stem progression through the branches is:

- **"yin"** (寅) = **"jia-yin"** (甲寅),
- **"mao"** (卯) = **"yi-mao"** (乙卯),
- **"chen"** (辰) = **"bing-chen"** (丙辰),
- **"si"** (巳) = **"ding-si"** (丁巳),
- **"wu"** (午) = **"wu-wu"** (戊午),
- **"wei"** (未) = **"ji-wei"** (己未),
- **"shen"** (申) = **"geng-shen"** (庚申),
- **"you"** (酉) = **"xin-you"** (辛酉),
- **"xu"** (戌) = **"ren-xu"** (壬戌),
- **"hai"** (亥) = **"gui-hai"** (癸亥),
- **"zi"** (子) = **"jia-zi"** (甲子),
- **"chou"** (丑) = **"yi-chou"** (乙丑)

Consequently, in that year-stem group the **"Zi"** (子) month is **"Jia-Zi"** (甲子) and the **"Chou"** (丑) month is **"Yi-Chou"** (乙丑). A historical "eleventh month" in this material must not be confused with Gregorian November.  

## 11. Current software status  

The reusable calendrical infrastructure is suitable for continued testing: **"Sixty Gan-Zhi Cycles"** (六十干支), stems and branches, **"Solar-Term"** (節気) boundaries, **"Nine-Star"** (九星) identities, **"forward"** (順飛) and **"reverse"** (逆飛) flight representations, **"Three-Epoch"** (三元) categories, **"Jia-Zi"** (甲子) month detection, **"Jia-Zi"** (甲子) day indexing, and synchronization predicates.  

The historically unresolved **"Houkan"** annual, monthly, and daily results should not be replaced with generic formulas merely to produce output. The project should continue to surface an unresolved-rule state until the missing historical transformation is reconstructed.  

## 12. What is established, what is not  

Established historical structure includes the 60-year annual epoch, the 60-month monthly epoch, the six documented daily starting states, the five-day/sixty-double-hour hourly epoch, the **"Jia-Zi"** (甲子) month/**"Jia-Zi"** (甲子) day statement, the sixty-month circulation statement, the existence of a monthly **"Three-Epoch"** (三元) pairing reform, and the existence of a leap-bureau correction.  

Not established is a complete closed-form Matsuura daily formula, a complete closed-form Matsuura monthly formula independent of the diagrams, the exact operation represented by **"Haigu-Kaikaku"** (配遇改革), the absolute synchronization anchor for the sixty-month circulation, and the exact leap-bureau algorithm.  

## 13. Important terminology correction  

The expressions **"One-Four-Seven"** (一四七) and **"Nine-Six-Three"** (九六三) must not be described as numerical sequences unless the specific source is explicitly describing an order.
  
In the investigated material they are often compact names for star families: **"One-White"** (一白) / **"Four-Green"** (四緑) / **"Seven-Red"** (七赤) and **"Nine-Purple"** (九紫) / **"Six-White"** (六白) / **"Three-Jade"** (三碧). Separately, **"Bensetsu"** (方鑑弁説) gives seasonal starting states in the order **"Winter Solstice"** (冬至) = 1, **"Rain Water"** (雨水) = 7, **"Grain Rain"** (穀雨) = 4, and **"Summer Solstice"** (夏至) = 9, **"End of Heat"** (処暑) = 3, **"Frost Descent"** (霜降) = 6. These are different pieces of information and must not be conflated.  

## 14. Historical source basis  

The principal historical sources for this reconstruction are Matsuura Kinkaku's (松浦琴鶴) **"方鑑秘伝集"** (or **"Hiden"** for short) (especially the 1883) basis used for the fixed **"Hiden"** text and its daily diagrams, and **"方鑑弁説 : 神殺撰要"** (or **"Bensetsu"** for short), especially the monthly and daily explanatory sections and diagrams. Comparative Chinese material may be used to illuminate terminology or historical context, but it must not be substituted for Matsuura's own rule.
