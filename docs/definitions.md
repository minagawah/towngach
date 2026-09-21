# Purple-White Implementation Specification

This document is the single detailed specification for Towngach's **"Purple-White Nine Stars"** (紫白九星 / zi-bai-jiu-xing / Tử Bạch Cửu Tinh) calculations. It describes shared infrastructure, method boundaries, confirmed rules, and intentionally unresolved historical rules.

## 1. Scope and method families

Towngach calculates the **"Purple-White Nine Stars"** through the **"Nine Palaces"** (九宮 / 九宫 / jiu-gong / Cửu Cung). It does not implement **"Qimen Dunjia"** (奇門遁甲 / 奇门遁甲 / qi-men-dun-jia / Kỳ Môn Độn Giáp); **Qimen** star identities, epochs, and algorithms must not enter this domain.

Method identity is part of the public API. Shared calculations may be reused when rules genuinely agree, but method-specific boundaries and formulas remain in their method family. **"Mizuno-style Kigaku"** (水野気学) is the primary current implementation direction. It is a variation of **"Kyusei Kigaku"** (九星気学): annual and monthly calculations share infrastructure, while daily and hourly rules are distinct.

## 2. Shared infrastructure

The calendar layer represents an absolute UTC instant with millisecond precision. The astronomy layer is the only Towngach dependency on `sowngwala-js`. Astronomy provides Sun ecliptic longitude, Solar Term target longitudes, and exact boundary searching. Method modules use this abstraction and do not import `sowngwala-js` directly.

The **"Sixty Gan-Zhi Unit"** (Sexagenary Cycle) (六十干支 / liu-shi-gan-zhi / Lục Thập Can Chi) is indexed from **"Jia-Zi"** (甲子 / jia-zi / Giáp Tý) at zero. The repository's date reference is **2000-01-07** for the traditional day calculation; the traditional **"Zi"** hour begins at **23:00 UTC** in the existing calendar convention.

## 3. Nine-Star Kigaku

The public family is `methods.kigaku`, with `calculate_kigaku_annual`, `calculate_kigaku_monthly`, `calculate_kigaku_daily`, and `calculate_kigaku_hourly`. It remains distinct from Mizuno even when annual or monthly results are identical.

Annual and monthly shared infrastructure follows the rules below. The modern daily and hourly historical rules remain explicit unresolved boundaries until separately specified; they must not silently inherit Mizuno rules.

## 4. Mizuno-style Kigaku

The public family is `methods.mizuno`. Its functions are `calculate_mizuno_annual`, `calculate_mizuno_monthly`, `calculate_mizuno_daily`, and `calculate_mizuno_hourly`.

### 4.1 Annual calculation

The annual boundary is the exact astronomical instant of the **"Beginning of Spring"** (立春 / li-chun / Lập Xuân). The effective year is the year whose **"Beginning of Spring"** boundary has most recently occurred.

The central star progresses in reverse order, `9 -> 8 -> 7 -> ... -> 1 -> 9`. The implementation uses the equivalent cyclic formula `11 - (effective_year % 9)`, normalized to one through nine. This annual rule is shared with the **"Kyusei Kigaku"** (九星気学).

### 4.2 Monthly calculation

The monthly boundary is the exact astronomical instant of the current month-opening **"Solar Term"** (節入り / 节气 / jie-qi / tiết khí), not a civil-date approximation. At the transition instant, the new monthly state applies: one millisecond before belongs to the previous state, and the boundary instant belongs to the new state.

The month-opening terms are **"Li-Chun"** (立春 / lập xuân), **"Jing-Zhe"** (啓蟄 / 驚蟄 / 惊蛰 / kinh trập), **"Qing-Ming"** (清明 / thanh minh), **"Li-Xia"** (立夏 / lập hạ), **"Mang-Zhong"** (芒種 / 芒种 / mang chủng), **"Xiao-Shu"** (小暑 / tiểu thử), **"Li-Qiu"** (立秋 / lập thu), **"Bai-Lu"** (白露 / bạch lộ), **"Han-Lu"** (寒露 / hàn lộ), **"Li-Dong"** (立冬 / lập đông), **"Da-Xue"** (大雪 / đại tuyết), and **"Xiao-Han"** (小寒 / tiểu hàn).

The first month beginning at **"Li-Chun"** (立春) uses the effective annual **"Earthly Branch"** (地支) group:

- **子午卯酉** years: **Eight White** (八白);
- **寅申巳亥** years: **Five Yellow** (五黄);
- **辰戌丑未** years: **Two Black** (二黒).

The monthly central star then progresses one step per month in reverse order. This infrastructure is shared with **"Kyusei Kigaku"** (九星気学), while **Mizuno**'s exact transition instant remains explicit in the result.

### 4.3 Daily calculation

Define `day_index` as the zero-based sexagenary-day index: **"Jia-Zi"** is zero and **"Gui-Hai"** is 59.

The **"Yang"** period (陽遁 / 阳遁 / yang-dun / dương độn) begins at the exact astronomical **"Winter Solstice"** (冬至 / dong-zhi / Đông Chí) instant and continues until immediately before the exact astronomical **"Summer Solstice"** (夏至 / xia-zhi / Hạ Chí). Its central star is:

```text
(day_index % 9) + 1
```

The **"Yin"** period (陰遁 / 阴遁 / yin-dun / âm độn) begins at the exact astronomical **"Summer Solstice"** (夏至) and continues until immediately before the next exact astronomical **"Winter Solstice"** (冬至). Its central star is:

```text
9 - (day_index % 9)
```

Mizuno switches directly at the astronomical instant. It does not wait for the next **"Jia-Zi"** day (甲子日), use a civil-date approximation, or apply a conventional intercalary waiting period.

### 4.4 Hourly calculation

The twelve double-hour indices are `Zi = 0`, `Chou = 1`, through `Hai = 11`. The current **"Solar Term"** determines one of three groups:

- **Group A:**
  - **"Dong-Zhi"** (冬至 / đông chí), **"Jing-Zhe"** (啓蟄 / 驚蟄 / 惊蛰 / kinh trập), **"Qing-Ming"** (清明 / thanh minh), **"Li-Xia"** (立夏 / lập hạ), **"Mang-Zhong"** (芒種 / 芒种 / mang chủng), **"Xiao-Shu"** (小暑 / tiểu thử).
  - **"Yang"** (陽 / dương) starts at **"One-White"** (一白 / yi-bai / nhất bạch);
  - **"Yin"** (陰 / âm) starts at **"Nine-Purple"** (九紫 / jiu-zi / cửu tử).
- **Group B:**
  - **"Li-Chun"** (立春 / lập xuân), **"Chun-Fen"** (春分 / xuân phân), **"Gu-Yu"** (穀雨 / 谷雨 / cốc vũ), **"Da-Shu"** (大暑 / đại thử), **"Li-Qiu"** (立秋 / lập thu), **"Bai-Lu"** (白露 / bạch lộ).
  - **"Yang"** (陽 / dương) starts at **"Seven-Red"** (七赤 / qi-chi / thất xích);
  - **"Yin"** (陰 / âm) starts at **"Three-Blue"** (三碧 / san-bi / tam bích).
- **Group C:**
  - All remaining terms.
  - **"Yang"** (陽 / dương) starts at **"Four-Green"** (四緑 / 四綠 / 四绿 / si-lu / tứ lục);
  - **"Yin"** (陰 / âm) starts at **"Six-White"** (六白 / liu-bai / lục bạch).

For **"Yang"**: `((base_star - 1 + time_index) % 9) + 1`.

For **"Yin"**: `((base_star - 1 + (9 - (time_index % 9))) % 9) + 1`.

The hourly result records its **"Solar Term"** (節気), **"Solar Term boundary"** (節o気境界), group, mode, base star, and time index. It uses the current Mizuno daily **Yin**/**Yang** (陰陽) mode, not a **"Heavenly-Stem"**-derived **"Kyusei Kigaku"** (気学) hourly origin.

## 5. Houkan preservation

**"Houkan"** (方鑑 / fang-jian / phương giám) remains a separate historical/research family under `methods.houkan`. Existing **"Houkan"** (方鑑) modules and confirmed hourly behavior are preserved. Existing unresolved daily, monthly, and annual reconstruction behavior remains explicit and must not be filled with **"Mizuno-style Kigaku"** (水野気学) or **"Kyusei Kigaku"** (九星気学) formulas.

**"Houkan"** (方鑑) is no longer the primary forward implementation target. This does not claim that **"Houkan"** is invalid; it records that its unresolved historical reconstruction continues independently.

For readers who want the preserved historical description and reconstruction
context, see [Houkan Description and Historical Reconstruction Notes](archive/houkan_description.md).
That archive keeps the earlier **"Houkan"**-specific details, open questions, and
research-oriented test guidance without making them requirements for the
current **"Mizuno-style"** implementation.

## 6. Result and boundary requirements

Every implemented method result identifies its method and period and uses the shared star, center-palace, direction, and flight structures. Method-specific metadata may include effective year, **"Solar Term"**, exact boundary, mode, day index, base star, or time index.

Astronomical boundary search resolves to the calendar's millisecond grid. Tests cover one millisecond before, exactly at, and one millisecond after **"Solar Term"**, **"Winter Solstice"** (冬至), and **"Summer Solstice"** (夏至) boundaries. Tests also cover **"Yin"** and **"Yang"** daily progression, all three monthly **"Earthly Branch"** (地支) groups, all hourly (時家) groups, all twelve double-hour (時辰) indices, and cyclic wrap-around.

## 7. Confirmed and unresolved behavior

Confirmed behavior may be implemented directly. Historical behavior that lacks a deterministic rule remains an explicit unresolved error with code `UNRESOLVED_HISTORICAL_RULE`. No method may invent a missing historical formula merely to produce a result.

Future method families, including possible **Tsuchimikado Family** (土御門家) methods, may define different solstice switching, intercalary, calendar, and practical-use rules. Those rules must be implemented as separate families rather than added to the shared core.
