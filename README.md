# towngach

## Table of Contents

- [1. Overview](#1-overview)
  - [1-1. What is "Towngach"?](#1-1-what-is-towngach)
  - [1-2. "Purple-White Nine-Stars" (紫白九星) rather than "Qi-Men Nine-Stars" (奇門九星)](#1-2-purple-white-nine-stars-紫白九星-rather-than-qi-men-nine-stars-奇門九星)
  - [1-3. A Shared Foundation: "Purple-White Stars" (紫白九星) and the "Nine-Palaces" (九宮)](#1-3-a-shared-foundation-purple-white-stars-紫白九星-and-the-nine-palaces-九宮)
  - [1-4. Four Calendrical Levels](#1-4-four-calendrical-levels)
  - [1-5. Classical "Three-Epoch Purple-White" (三元紫白) Traditions](#1-5-classical-three-epoch-purple-white-三元紫白-traditions)
  - [1-6. Houkan (方鑑): Japanese Directional-and-Divinatory Traditions](#1-6-houkan-方鑑-japanese-directional-and-divinatory-traditions)
  - [1-7. The Daily "Purple-White" (日家紫白) Cycle](#1-7-the-daily-purple-white-日家紫白-cycle)
  - [1-8. Alternative Rules for "Daily" (日家) Transitions](#1-8-alternative-rules-for-daily-日家-transitions)
  - [1-9. Modern Japanese "Nine-Star Kigaku" (九星気学)](#1-9-modern-japanese-nine-star-kigaku-九星気学)
  - [1-10. About "Xuan-Kong Flying Stars" (玄空飛星)](#1-10-about-xuan-kong-flying-stars-玄空飛星)
  - [1-11. Shared Logic and Independent Logic](#1-11-shared-logic-and-independent-logic)
  - [1-12. Historical Variants as Calculation Rules](#1-12-historical-variants-as-calculation-rules)
  - [1-13. A Focus on "Purple-White" (紫白) Compatibility](#1-13-a-focus-on-purple-white-紫白-compatibility)
- [2. Scripts](#2-scripts)
  - [2-1. Houkan (方鑑) Check Script](#2-1-houkan-方鑑-check-script)
- [3. Installed NPM Packages](#3-installed-npm-packages)
  - [3-1. Babel](#3-1-babel)
  - [3-2. ESLint & Prettier](#3-2-eslint--prettier)
  - [3-3. JSDoc](#3-3-jsdoc)
  - [3-4. Jest](#3-4-jest)
  - [3-5. Others](#3-5-others)
- [4. FAQ](#4-faq)
  - [4-1. Q1. Do you have a dictionary of some sort?](#4-1-q1-do-you-have-a-dictionary-of-some-sort)
  - [4-2. Q2. Aren't **"九宮"** (ja + zh_tw) and **"九宫"** (zh_ch) same?](#4-2-q2-arent-九宮-ja--zh_tw-and-九宫-zh_ch-same)
- [5. License](#5-license)
  - [5-1. For Towngach Library](#5-1-for-towngach-library)

A computational library for East Asian calendrical,
astronomical, directional, and purple-white nine-star
traditions &mdash; combining solar-term and celestial
calculations with historically distinct methods
for annual, monthly, daily, and hourly divination.

![astrolabe](./astrolabe.jpg)

## 1. Overview

There are 2 resources available:
- [docs/definitions.md](./docs/definitions.md)  
As the filename says, it explain in details about divination logic implemented, but it also talks about things are not done.
- [docs/terminology.md](./docs/terminology.md)  
As it says, it is a list of terminology (used in this repo).

We have a lot to deal with in our lives, and so do I.
Although I'm trying hard to implement as much as possible,
so far, I have only implemented partially
of what I originally intended initially.
So... bare with me.

### 1-1. What is "Towngach"?

The name **Towngach** (`/taʊŋˈɡætʃ/`) originates from "Tawgač" (`/tɑwˈɣɑtʃ/` or tahw-GHAHCH) or "Tabgach" (`/tɑbˈɣɑtʃ/` or tahb-GHAHCH), an ancient Turkic (突厥 / tu-jue) term recorded in historical monuments like the Bilge Khagan Inscription (毗伽可汗碑 / pi-jia-ke-han-bei) to denote the Tang Dynasty (唐 / tang) and the vast sovereign realm of China. Grammatically, the suffix `-č` in Ancient Turkic signifies _"people of"_ or _"clan of"_. The root traces back to the Tuobay (拓跋 / tuo-ba) clan of the Xianbei (鮮卑 / xian-bei) who founded the Northern Wei Dynasty (北魏 / bei-wei). To the Turks (突厥 / tu-jue) and Sogdian (ソグド) merchants along the Silk Road, this word transcended a single clan name to become a universal noun representing _"the sovereign imperial domain of the East, bathed in celestial light"_.

This royal bloodline of the Tuoba (拓跋 / tuo-ba) clan-endowed with advanced metal refining technologies and military prowess &mdash; originally migrated eastward from ancient Western Asia (Sumer and Babylonia). Centuries later, this same lineage founded the Western Xia Dynasty (西夏 / xi-xia). The royal family carried this ancient heritage, creating _"the Tangut script"_ (西夏文字 / xi-xia-wen-zi) as a revival of the sacred, highly mystical pictographs from China's ancient Shang Dynasty (殷 / yin) &mdash; a script from an era before characters became abstracted, preserving intense spiritual depth.

Furthermore, the state religion of Western Xia (西夏 / xi-xia) was a deeply mystical Esoteric Buddhism (密教 / mi-jiao) transmitted from Tibet and Central Asia. This ritualistic tradition placed supreme importance on the positions and movements of celestial bodies, including the Sun, Moon, and the Big Dipper (北斗七星 / bei-dou-qi-xing). This cosmic veneration directly inherited the ancient astral worship of Sumer and Babylonia, where priests observed the night sky to commune with the divine. Flowing through Persia and India, this astral lore culminated during the Tang Dynasty (唐 / tang) and infused the entire East Asian cultural sphere.

Although East Asian astrological calculations &mdash; such as "nine-stars" (九星 / jiu-xing / cửu tinh), "qi-men-dun-jia" (奇門遁甲 / 奇门遁甲 / qi-men-dun-jia / kỳ môn độn giáp), and "ziwei-doushu" (紫微斗數 / 紫微斗数 / zi-wei-dou-shu / tử vi đẩu số) &mdash; eventually branched into specialized systems across different regions, they all share this single, grand origin.

By taking the name as **"Towngach"**, this library honors that deep historical thread: connecting Mesopotamian celestial worship, the metallurgical and royal heritage of the Tuoba (拓跋 / tuo-ba) clan, the mystical arts of Tang-era Asia, and modern computational algorithms into a single unified toolkit.

### 1-2. "Purple-White Nine-Stars" (紫白九星) rather than "Qi-Men Nine-Stars" (奇門九星)

This library is primarily concerned with the calculation and movement of the **"purple-white-nine-stars"** (紫白九星 / zi-bai-jiu-xing / cửu tinh tử bạch) through the **"nine-palaces"** (九宮 / 九宫 / jiu-gong / cửu cung). Its subject is therefore the cosmological and calendrical system of stars commonly represented by the numbers and colors **"one-white"** (一白 / yi-bai / nhất bạch) through **"nine-purple"** (九紫 / jiu-zi / cửu-tử), and their movement according to the structure of the **"luo-shu"** (洛書 / 洛书 / luo-shu / lạc thư) and the **"nine-palaces"** (九宮 / 九宫 / jiu-gong / cửu cung).

The library does not, at least in its primary scope, attempt to calculate the nine stars of **"qi-men-dun-jia"** (奇門遁甲 / 奇门遁甲 / qi-men-dun-jia / kỳ môn độn giáp), such as "tian-peng" (天蓬星 / tian-peng-xing / thiên bồng), "tinh-tian-rui" (天芮星 / tian-rui-xing / thiên nhuế), "tinh-tian-chong" (天衝星 / 天冲星 / tian-chong-xing / thiên xung tinh) and the other stars belonging to that system. Although both traditions use the expression "Nine Stars", they represent different technical systems.

The implementation separates reusable
"purple-white" (紫白 / zi-bai / tử bạch) foundations under
`src/purple_white/core/` from identifiable
calculation methods under `src/purple_white/methods/`.
The current public method families are:
(1) Houkan (方鑑 / 方鉴 / fang-jian / phương giám) and
(2) Kyusei (九星気学 / 九星氣學 / 九星气学 / jiu-xing-qi-xue / cửu tinh khí học).
Shared "nine-star" (九星 / jiu-xing / cửu tinh), movement (of stars),
and result structures do not imply that
those methods use one identical historical algorithm.

### 1-3. A Shared Foundation: "Purple-White Stars" (紫白九星) and the "Nine-Palaces" (九宮)

The common foundation of the systems covered by this library is the relationship between the **"purple-white-nine-stars"** (紫白九星 / zi-bai-jiu-xing / cửu tinh tử bạch) and the **"nine-palaces"** (九宮 / 九宫 / jiu-gong / cửu cung). A star may be assigned to the central palace (中宮 / 中宫 / zhong-gong / trung cung) and then allowed to move through the palace (宮 / 宫 / gong / cung) sequence according to a defined rule. Depending on the method, this movement may proceed forward or backward, corresponding to forward flight (順飛 / 顺飞 / shun-fei / thuận phi) and reverse flight (逆飛 / 逆飞 / ni-fei / nghịch phi).

This common foundation makes it possible for apparently different traditions to share a substantial amount of computational logic. The same **"nine-palace"** (九宮 / 九宫 / jiu-gong / cửu cung) structure can support annual, monthly, daily, and hourly calculations, even when the rules used to determine the initial star or the calendrical boundary differ.

### 1-4. Four Calendrical Levels

The **"purple-white"** (紫白 / zi-bai / tử bạch) system is commonly applied at four calendrical levels: **annual calculation** (年家 / nian-jia / niên gia), **monthly calculation** (月家 / yue-jia / nguyệt gia), **daily calculation** (日家 / ri-jia / nhật gia), and **hourly calculation** (時家 / 时家 / shi-jia / thời gia).

These four levels should not necessarily be understood as four unrelated systems. They share the same general cosmological vocabulary of **"purple-white stars"** (紫白九星 / zi-bai-jiu-xing / cửu tinh tử bạch) and the **"nine-palaces"** (九宮 / 九宫 / jiu-gong / cửu cung), but each level may define its own temporal cycles, starting points, transitions, and rules for determining the initial star. For this reason, a reusable implementation should recognize both their shared structure and their independent calendrical logic.

### 1-5. Classical "Three-Epoch Purple-White" (三元紫白) Traditions

One major family of methods is the classical **"three-epochs-purple-white"** (三元紫白 / san-yuan-zi-bai / tam nguyên tử bạch) system found in Chinese calendrical and selection traditions. Within this family, annual (年家 / nian-jia / niên gia), monthly (月家 / yue-jia / nguyệt gia), daily (日家 / ri-jia / nhật gia), and hourly (時家 / 时家 / shi-jia / thời gia) purple-white (紫白 / zi-bai / tử bạch) calculations are treated as related expressions of the same general system.

This historical description does not represent
a single universal method in the public API.
The repository keeps concrete calculations under
identifiable method families instead.

The **annual calculation** (年家 / nian-jia / niên gia) is based on the large cycle of the **"three-epochs"** (三元 / san-yuan / tam nguyên), traditionally expressed through a sequence of 60 year units and a larger 180 year cycle. The **monthly calculation** (月家 / yue-jia / nguyệt gia) uses its own relationship between annual cycles (歲運 / 岁运 / sui-yun / tuế vận), terrestrial branches (地支 / di-zhi / địa chi), and the monthly sequence (月建 / yue-jian / nguyệt kiến). The **daily calculation** (日家 / ri-jia / nhật gia) is based on a 60 day unit and a larger cycle of 3 such units. The **hourly calculation** (時家 / 时家 / shi-jia / thời gia) again uses its own division of time, often derived from the classification of the day and the sequence of the traditional **"double-hours"** (時辰 / 时辰 / shi-chen / giờ âm lịch).

These methods form an important baseline for the library because they provide one of the most coherent historical families of "purple-white" (紫白 / zi-bai / tử bạch) calculations.

### 1-6. Houkan (方鑑): Japanese Directional-and-Divinatory Traditions

Japanese **"directional-and-divinatory (Houkan)"**
(方鑑 / 方鉴 / fang-jian / phương giám) traditions,
including the calculation family represented
in this library as **"Houkan"**,
adopted and reorganized
**"purple-white"** (紫白 / zi-bai / tử bạch)
calculations within their own calendrical
and practical traditions. The implementation
is examined especially through the works
and traditions associated with
**Matsuura Kinkaku** (松浦琴鶴), **Iida Tengai** (飯田天涯),
and **Kikuchi Yosaku** (菊池要佐久), while recognizing
that historical methods are not always identical.
The implementation therefore distinguishes
documented rules from library interpretations
and unresolved questions.

At the level of general structure,
these Japanese methods share important features
with the classical **"three-epoch-purple-white"**
(三元紫白 / san-yuan-zi-bai / tam nguyên tử bạch) tradition.
Annual, monthly, daily, and hourly stars
may be calculated through
the **"nine-palaces"** (九宮 / 九宫 / jiu-gong / cửu cung),
while the **"sixty-unit-cycle (sexagenary)"**
(六十干支 / 六十花甲 / liu-shi-gan-zhi / lục thập can chi)
and the **"three-epochs"** (三元 / san-yuan / tam nguyên)
remain important structural principles.
At the same time, Japanese traditions developed
their own questions concerning calendrical
boundaries, the relationship between
seasonal transitions and stellar movement,
and the proper treatment of transitions
between cycles. Methods that appear identical
at the level of a main cycle may therefore differ
substantially in their boundary conditions.

For the Houkan implementation, where
the examined material treats entry into a
**"solar-term"** (節気 / 節氣 / 节气 / jie-qi / tiết khí)
as the relevant boundary (境界 / 边界 / jing-jie / ranh giới),
the library uses the actual astronomical
"solar-term" (節気 / 節氣 / 节气 / jie-qi / tiết khí) transition instant
supplied by its existing
[sowngwala-js](https://github.com/minagawah/sowngwala-js)
adapter. Thus, if a transition occurs at 05:00:00,
04:59:59 remains in the previous interval,
while the new interval begins at
the transition itself. The boundary is
not rounded to midnight or given
an artificial leap adjustment.

The Houkan **"hourly"** (時家 / 时家 / shi-jia / thời gia)
calculation uses the **"three-epochs"**
(三元 / san-yuan / tam nguyên) groups
**"子午卯酉"**, **"寅申巳亥"**, and **"辰戌丑未"**,
together with the confirmed
**"jia-ji"** (甲己 / jia-ji / giáp-kỷ) condition.

**IMPORTANT** &mdash; Notice it is not
**"jia-zi"** (甲子 / jia-zi / giáp-tý)
but **"jia-ji"** (甲己 / jia-ji / giáp-kỷ).

In **"yang-dun"** (陽遁 / 阳遁 / yang-dun / dương độn),
the "three-epoch" begins with
**"one-white"** (一白 / yi-bai / nhất bạch),
**"seven-red"** (七赤 / qi-chi / thất xích),
and **"four-green"** (四緑 / 四绿 / si-lv / tứ lục).

In **"yin-dun"** (陰遁 / 阴遁 / yin-dun / âm độn),
they begin with **"nine-purple"** (九紫 / jiu-zi / cửu tử),
**"three-blue"** (三碧 / san-bi / tam bích),
and **"six-white"** (六白 / liu-bai / lục bạch).

One **"origin"** (元 / yuan / nguyên) consists of
five days, or 60 traditional
**"double-hours"** (時辰 / 时辰 / shi-chen / giờ),
and one star advances for each
**"double-hour"** (時辰 / 时辰 / shi-chen / giờ âm lịch).
Because 60 does not divide evenly by 9,
the **"nine-star"** (九星 / jiu-xing / cửu tinh) sequence
is not artificially adjusted to complete
at an origin boundary; the calendrical
and origin boundaries take precedence
over numerical continuity.

The **"zi-hour"** (子時 / 子时 / zi-shi / giờ tý)
follows the examined distinction between
_"tonight"_ and the _"following morning"_,
rather than being assigned uniformly
to a modern civil date. When determining
the origin containing a target datetime,
the implementation therefore uses the valid
starting boundary that has already begun relative
to that datetime and does not treat a future
**"zi-hour"** (子時 / 子时 / zi-shi / giờ tý) boundary
as the beginning of the current origin.

The **"daily calculation"** (日家 / ri-jia / nhật gia)
requires a more careful distinction
between historical traditions.
The Houkan daily structure is intentionally
not reduced to a fixed 180-day cycle.
Its **"six-seasonal-periods"**
(六気 / 六氣 / 六气 / liu-qi / lục khí)
and Yin/Yang Dun structure are represented,
but the historical selection of the daily
**"jia-zi"** (甲子 / jia-zi / giáp-tý) reference point
remains unresolved. Where that unresolved decision
is required, the API throws an explicit error
rather than fabricating a nine-star configuration.

Current reconstruction work is centered
on Matsuura Kinkaku's **"Hiden"** (方鑑秘伝集, Dec.1883 edition),
and his daily-star diagrams. Matsuura states that the daily
**"three-epoch-nine-star"** (日の三元九星 / ri-jia-san-yuan-jiu-xing)
arrangement begins at
a **"jia-zi-month"** (甲子月 / jia-zi-yue / giáp-tý nguyệt)
and **"jia-zi-day"** (甲子日 / jia-zi-ri / giáp-tý nhật),
circulates for
**"sixty-months"**
(六十箇月 / liu-shi-ge-yue / lục thập cá nguyệt)
in forward/reverse order,
and at the beginning of each monthly
**"three-epoch"** (月三元 / yue-san-yuan / nguyệt tam nguyên)
renews or transforms the
**"pairing"** (配遇 / pei-yu / phối ngộ)
of daily stars and the sexagenary structure.
The exact operation represented by
**"renewing the pairing"**
(配遇改革 / pei-yu-gai-ge / phối ngộ cải cách)
remains unresolved, so the library does not yet
hard-code a replacement formula.

The daily-star diagrams reconstruction
currently indicates that the two printed
sides share the same sexagenary-day framework
while using different star directions
and three starting phases:
**"one-white → four-green → seven-red"**
(一白 → 四緑 → 七赤 / yi-bai) on one side and
**"nine-purple → six-white → three-jade"**
(九紫 → 六白 → 三碧 / jiu-zi) on the other.
This is treated as evidence about
the internal structure of Matsuura's diagrams,
not yet as a final monthly-to-daily conversion formula.

This treatment of Houkan is therefore
not intended to claim that every Japanese
directional method follows one universal formula.
Instead, it preserves the shared
**"purple-white"** (紫白九星 / zi-bai-jiu-xing / cửu tinh tử bạch)
and **"nine-palace"** (九宮 / 九宫 / jiu-gong / cửu cung)
foundations while keeping historically
significant differences in
**"solar-term boundaries"**
(節気境界 / 節氣交節 / 节气交节 / jie-qi-jiao-jie / tiết khí giao tiết),
daily reference points, Yin/Yang progression,
and origin transitions explicit.

![kinkaku_hiden](./kinkaku_hiden.jpg)

### 1-7. The Daily "Purple-White" (日家紫白) Cycle

The **"daily-purple-white"** (日家紫白 / ri-jia-zi-bai / nhật gia tử bạch) calculation is one of the most important areas of variation covered by the historical traditions. A major classical model treats 60 days as **"one epoch"** (一元 / yi-yuan / nhất nguyên), with the **"three-epochs"** (三元 / san-yuan / tam nguyên) forming a 180 day cycle.

This model is fundamentally different from the daily divisions used in **"qi-men-dun-jia"** (奇門遁甲 / 奇门遁甲 / qi-men-dun-jia / kỳ môn độn giáp). In **"purple-white"** (紫白 / zi-bai / tử bạch) calculation, the 60 day sexagenary sequence is itself part of the basic structure of the daily (日家 / ri-jia / nhật gia) cycle. A library implementing **"purple-white"** (紫白 / zi-bai / tử bạch) methods should therefore avoid assuming that a **"qi-men"** (奇門 / 奇门 / qi-men / kỳ môn) style 15 day **"three-epoch cycle"** (三元 / san-yuan / tam nguyên) can be used as a substitute.

The daily sequence (日家 / ri-jia / nhật gia) is also closely connected with the **"winter solstice"** (冬至 / dong-zhi / đông chí) and the **"summer solstice"** (夏至 / xia-zhi / hạ chí) and with the distinction between **"yang-progression"** (陽遁 / 阳遁 / yang-dun / dương độn) and **"yin-progression"** (陰遁 / 阴遁 / yin-dun / âm độn). Exactly how the transition is handled, however, is one of the places where historical methods diverge.

### 1-8. Alternative Rules for "Daily" (日家) Transitions

Not all historical **"daily-purple-white"** (日家紫白 / ri-jia-zi-bai / nhật gia tử bạch) methods use the same rule for changing between Yang (陽 / 阳 / yang / dương) and Yin (陰 / 阴 / yin / âm) progression. Some methods emphasize calendrical boundaries associated directly with the **"solstices"** (二至 / er-zhi / nhị chí) and the **"three-epoch"** (三元 / san-yuan / tam nguyên) cycle. Other methods use nearby days associated with the 4 branches (支 / zhi / chi) **"Zi &ndash; Wu &ndash; Mao &ndash; You"** (子午卯酉 / zi-wu-mao-you / tý ngọ mão dậu) as practical transition points.

These methods may share the same 60 day foundation and the same **"nine-palace-flight"** (九宮飛泊 / 九宫飞泊 / jiu-gong-fei-bo / cửu cung phi bạc), while differing only in the rule that determines when the direction of movement changes. From the perspective of software design, such methods should therefore not necessarily require completely separate systems. They may instead be represented as variants of a common **"daily-purple-white"** (日家紫白 / ri-jia-zi-bai / nhật gia tử bạch) engine with different transition rules.

At the same time, methods that reorganize the **"three-epoch"** (三元 / san-yuan / tam nguyên) structure itself, rather than merely changing the boundary condition, may require genuinely independent calculation logic.

### 1-9. Modern Japanese "Nine-Star Kigaku" (九星気学)

Modern Japanese **"nine-star"** (九星 / jiu-xing / cửu tinh) systems, including traditions commonly associated with **"nine-star-kigaku"** (九星気学 / 九星氣學 / 九星气学 / jiu-xing-qi-xue / cửu tinh khí học), for which "Sonoda Shinjiro" (園田真次郎) is commonly known, inherit much of the broader **"purple-white"** (紫白 / zi-bai / tử bạch) and **"nine-palace"** (九宮 / 九宫 / jiu-gong / cửu cung) framework.

**Annual** (年家 / nian-jia / niên gia) and **monthly** (月家 / yue-jia / nguyệt gia) calculations are generally based on recognizable calendrical cycles and seasonal boundaries, while **daily** (日家 / ri-jia / nhật gia) and **hourly** (時家 / 时家 / shi-jia / thời gia) calculations continue to depend on the interaction between the traditional calendar, the sixty-unit (sexagenary) cycle, and the **"nine-palace"** (九宮 / 九宫 / jiu-gong / cửu cung) movement. These systems can often share substantial computational logic with earlier **"purple-white"** (紫白 / zi-bai / tử bạch) traditions, but differences may appear in such matters as the precise definition of a year boundary, the handling of **"solar-terms"** (節気 / 節氣 / 节气 / jie-qi / tiết khí), and the treatment of daily transitions.

For this reason, modern Japanese methods are best regarded not as an entirely separate cosmology, but as a family of related implementations built upon the same **"purple-white"** (紫白 / zi-bai / tử bạch) foundation.

### 1-10. About "Xuan-Kong Flying Stars" (玄空飛星)

The library may also be useful to traditions associated with **"xuan-kong-flying-stars"** (玄空飛星 / 玄空飞星 / xuan-kong-fei-xing / huyền không phi tinh). These systems likewise use the **"nine-palaces"** (九宮 / 九宫 / jiu-gong / cửu cung) and the movement of numbered stars, and therefore share a natural computational vocabulary with **"purple-white"** (紫白 / zi-bai / tử bạch) calculation.

However, the concept of the **"three-epochs-and-nine-periods"** (三元九運 / 三元九运 / san-yuan-jiu-yun / tam nguyên cửu vận) should not be confused with the **"three-epoch"** (三元 / san-yuan / tam nguyên) divisions used in annual (年家 / nian-jia / niên gia), monthly (月家 / yue-jia / nguyệt gia), daily (日家 / ri-jia / nhật gia), or hourly (時家 / 时家 / shi-jia / thời gia) **"purple-white"** (紫白 / zi-bai / tử bạch) calculations. The two systems may both use the word **"Three Epochs"** (三元 / san-yuan / tam nguyên) but they describe different temporal structures and may serve different purposes.

For this reason, **"xuan-kong"** (玄空 / xuan-kong / huyền không) calculations should be treated as closely related to the library's **"purple-white"** (紫白 / zi-bai / tử bạch) core without assuming that every temporal rule can be shared directly.

### 1-11. Shared Logic and Independent Logic

The main purpose of supporting multiple traditions is not to erase their differences, but to identify where their computational structures genuinely coincide. The **"nine-palaces"** (九宮 / 九宫 / jiu-gong / cửu cung), the sequence of the **"purple-white-stars"** (紫白九星 / zi-bai-jiu-xing / cửu tinh tử bạch), and the concepts of **"forward-flight"** (順飛 / 顺飞 / shun-fei / thuận phi) and **"reverse-flight"** (逆飛 / 逆飞 / ni-fei / nghịch phi) provide a common foundation. These can often be implemented once and reused.

The determination of the **"starting-star"** (起始星 / qi-shi-xing / khởi thủy tinh), however, may depend on the **annual** (年家 / nian-jia / niên gia), **monthly** (月家 / yue-jia / nguyệt gia), **daily** (日家 / ri-jia / nhật gia), or **hourly** (時家 / 时家 / shi-jia / thời gia) cycle. The definition of a calendrical boundary may depend on **"solar-terms"** (節気 / 節氣 / 节气 / jie-qi / tiết khí), **"solstices"** (二至 / er-zhi / nhị chí), **"sixty-unit-cycle (sexagenary)"** (六十干支 / 六十花甲 / liu-shi-gan-zhi / lục thập hoa giáp), or tradition-specific rules. The definition of the **"three-epochs"** (三元 / san-yuan / tam nguyên) may also vary between systems. These differences should therefore remain explicit rather than being hidden behind a single universal formula.

### 1-12. Historical Variants as Calculation Rules

The traditions represented by this library should be understood as historical and technical variants of **"purple-white"** (紫白 / zi-bai / tử bạch) calculation rather than as mutually exclusive systems. In many cases, two traditions may use exactly the same **"nine-palace-flight"** (九宮飛泊 / 九宫飞泊 / jiu-gong-fei-bo / cửu cung phi bạc) while differing only in the way they determine the **"initial-star"** (起始星 / qi-shi-xing / khởi thủy tinh). In other cases, they may share the same **"sixty-unit-cycle (sexagenary)"** (六十干支 / 六十花甲 / liu-shi-gan-zhi / lục thập hoa giáp) while differing only in the treatment of a transition near a **"solar-term"** (節気 / 節氣 / 节气 / jie-qi / tiết khí) or **"solstice"** (二至 / er-zhi / nhị chí).

A useful implementation can therefore distinguish between the underlying **"purple-white-cycle"** (紫白九星 / zi-bai-jiu-xing / cửu tinh tử bạch), the rule used to determine the **"three-epochs"** (三元 / san-yuan / tam nguyên), the rule used to select the **"starting-star"** (起始星 / qi-shi-xing / khởi thủy tinh), the rule used to determine **"forward-flight"** (順飛 / 顺飞 / shun-fei / thuận phi) or **"reverse-flight"** (逆飛 / 逆飞 / ni-fei / nghịch phi), and the calendrical method used to determine the relevant boundary. This makes it possible to represent closely related traditions without incorrectly forcing them into complete identity.

### 1-13. A Focus on "Purple-White" (紫白) Compatibility

The intended scope of this library is therefore the broad family of calculations in which the **"purple-white-nine-stars"** (紫白九星 / zi-bai-jiu-xing / cửu tinh tử bạch) move through the **"nine-palaces"** (九宮 / 九宫 / jiu-gong / cửu cung) across **annual** (年家 / nian-jia / niên gia), **monthly** (月家 / yue-jia / nguyệt gia), **daily** (日家 / ri-jia / nhật gia), and **hourly** (時家 / 时家 / shi-jia / thời gia) time scales. This includes traditions that developed in China and Japan and may also provide a useful computational foundation for related **"flying-star"** (飛星 / 飞星 / fei-xing / phi tinh) traditions.

The library does not attempt to treat every historical system that uses the name **"nine-stars"** (九星 / jiu-xing / cửu tinh) as part of the same algorithm. In particular, **"qi-men-dun-jia"** (奇門遁甲 / 奇门遁甲 / qi-men-dun-jia / kỳ môn độn giáp) and its own **"nine-stars"** (九星 / jiu-xing / cửu tinh) and **"three-epochs"** (三元 / san-yuan / tam nguyên) divisions belong to a different technical context. The goal here is instead to preserve the specific family of **"purple-white"** (紫白 / zi-bai / tử bạch) calculations based on the numbered stars, the **"nine-palaces"** (九宮 / 九宫 / jiu-gong / cửu cung), and their historically distinct but structurally related methods of movement.

## 2. Scripts

## 2-1. Houkan (方鑑) Check Script

The repository includes a small manual checker
for the Houkan's "purple-white" (方鑑紫白 / 方鉴紫白 / fang-jian-zi-bai / phương giám tử bạch) calculations:

```bash
node scripts/check_houkan.js
```

When run interactively, the script asks for the year,
month, day, hour, and minute.
Blank answers use the predefined example datetime:

```text
1985-10-26 01:35:00
```

You can also provide the values as positional arguments:

```bash
node scripts/check_houkan.js 1985 10 26 1 35
```

The checker reports the hourly day and branch,
"yin/yang-dun" (陰陽遁 / 阴阳遁 / yin-yang-dun / âm dương độn),
"three-yuan" (三元 / san-yuan / tam nguyên),
"purple-white-star" (紫白星 / zi-bai-xing / tử bạch tinh),
"flight" (飛泊 / fei-bo / phi bạc),
the monthly "solar-term boundary"
(節気境界 / 節氣交節 / 节气交节 / jie-qi-jiao-jie / tiết khí giao tiết),
and the documented daily structure.
It also reports annual, monthly, and daily
calculations as unresolved where
the historical rule is intentionally not guessed.

The example datetime is accompanied by the following message:

> Marty McFly escaping the Libyans at Twin Pines Mall

The script uses UTC-normalized Towngach dates
and the existing astronomy adapter.

## 3. Installed NPM Packages

## 3-1. Babel

- core-js
- @babel/cli
- @babel/core
- @babel/preset-env
- babel-loader
- babel-plugin-preval
- babel-plugin-polyfill-corejs3

## 3-2. ESLint & Prettier

- prettier
- eslint
- @eslint/js
- eslint-config-prettier
- eslint-plugin-prettier
- @stylistic/eslint-plugin

## 3-3. JSDoc

- jsdoc
- jsdoc-tsimport-plugin
- jsdoc-plugin-intersection
- typescript
- @types/ramda

## 3-4. Jest

- jest
- babel-jest

## 3-5. Others

- rimraf
- nodemon
- concurrently
- cross-env
- ramda
- moment
- moment-timezone
- csv-parse

```
# Why core-js belongs in production?
# Since @babel/preset-env injects helper imports
# directly into the runtime code
# (e.g. import "core-js/modules/es.array.flat.js"),
# the deployment environment needs to have
# core-js installed in the main dependencies block.
# If it is only in devDependencies, the app will
* crash in production with a "Module not found"
# error when it tries to run those polyfills.

npm install --save core-js ramda luxon csv-parse

npm install --save-dev \
  @babel/cli @babel/core @babel/preset-env @babel/preset-typescript \
  babel-jest babel-loader babel-plugin-preval \
  eslint @eslint/js eslint-plugin-prettier eslint-config-prettier \
  @stylistic/eslint-plugin globals \
  jsdoc jsdoc-tsimport-plugin jsdoc-plugin-intersection \
  typescript @types/ramda jest \
  rimraf nodemon concurrently cross-env
```

## 4. FAQ

## 4-1. Q1. Do you have a dictionary of some sort?

A1. Sure. I prepared a list of terminology used in this repo.  
[terminology.md](./terminology.md).

## 4-2. Q2. Aren't **"九宮"** (ja + zh_tw) and **"九宫"** (zh_ch) same?

A2. They are different.
- **九宮** (Japanese Kanji/Traditional Chinese):  
Uses the traditional form of the second character,
`宮`, where the two square "mouth" components (`口`)
inside are connected by a stroke or written cleanly
as two distinct boxes depending on the typeface,
matching standard traditional Chinese variants.
- **九宫** (Simplified/ context):  
In this form, the second character is written as `宫`,
which simplifies the inner component by removing
the stroke that links the two boxes or changing
the internal structure to a single stroke
connection (`宀` + `吕`)
depending on the script standards.

## 5. License

## 5-1. For Towngach Library

Dual-licensed under either of the following.  
Choose whichever you prefer.

- The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE))
- MIT license ([LICENSE.MIT](LICENSE.MIT))
