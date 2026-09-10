# Definitions and Reimplementation Notes

This is a file for repository's logic specification, and is intended to preserve the current model of the supported and investigated calculation families so that the implementation can be reconstructed without relying only on source code.

Status terms:

- **Confirmed**: directly supported by examined material or an established implementation rule.
- **Working interpretation**: a current repository interpretation that may later change.
- **Unresolved**: historically or computationally open; do not replace with a guessed algorithm.
- **Future research**: a defined task that may change the implementation.

The primary domain is **Purple-White Nine Stars (紫白九星)**, not the different Nine Stars of **Qimen Dunjia (奇門九星)**.

## 1. Shared Purple-White Core (紫白九星)

- The common star identities are:
  - **One White (一白)**
  - **Two Black (二黒)**
  - **Three Jade (三碧)**
  - **Four Green (四緑)**
  - **Five Yellow (五黄)**
  - **Six White (六白)**
  - **Seven Red (七赤)**
  - **Eight White (八白)**
  - **Nine Purple (九紫)**
- The shared computational vocabulary includes:
  - **Nine Palaces (九宮)**
  - **Central Palace (中宮)**
  - **Flying / Flight (飛泊 / 飛星)**
  - **Forward Flight (順飛)**
  - **Reverse Flight (逆飛)**
  - **Three Epochs (三元)**
  - **Sexagenary Cycle (干支 / 六十干支)**
  - **Solar Terms (節気 / 二十四節気)**
  - **Winter Solstice (冬至)** and **Summer Solstice (夏至)**
- A star's numerical identity and its Nine-Palace position must be represented separately.
- Generic cyclic movement should be reusable:
  - determine a starting star,
  - determine a starting palace or central reference,
  - determine direction,
  - advance by an offset,
  - resolve the resulting state.
- Forward and reverse movement should be explicit state or explicit strategy, not inferred from star number.
- The four major calendrical levels are:
  - annual calculation **(年家)**,
  - monthly calculation **(月家)**,
  - daily calculation **(日家)**,
  - hourly calculation **(時家)**.
- These levels share terminology but are not automatically one algorithm.
- Two traditions may share the same Nine-Palace flight while differing in:
  - initial star selection,
  - Three-Epoch definition,
  - Yin/Yang progression,
  - calendrical boundary,
  - sexagenary reference point,
  - cycle reset or transformation.
- Recommended result metadata:
  - tradition,
  - calendrical level,
  - star,
  - palace/flight position,
  - epoch,
  - direction,
  - sexagenary context,
  - boundary rule,
  - boundary instant,
  - status/confidence.
- **Unresolved**:
  - The exact Nine-Palace ordering must follow the repository implementation and tests; do not recreate it from generic memory without checking code.
  - The word **Three Epochs (三元)** has different meanings in different traditions.

## 2. Classical Three-Epoch Purple-White (三元紫白)

- This is a major classical family underlying many annual, monthly, daily, and hourly Purple-White calculations.
- The four levels are structurally related but each has its own temporal cycle and starting rule.

### 2-1. Annual Calculation (年家)

- A major classical structure uses:
  - one epoch = 60 years,
  - three epochs = 180 years.
- The annual result therefore belongs to a larger cycle than a civil year.
- The implementation should separate:
  - sexagenary year identity,
  - epoch identity,
  - initial annual star,
  - resulting annual star.

### 2-2. Monthly Calculation (月家)

- Monthly logic may depend on:
  - annual cycle,
  - Earthly Branches **(地支)**,
  - month establishment **(月建)**,
  - sexagenary month sequence,
  - selected month boundary.
- Gregorian month numbers must not be treated as inherently equivalent to traditional month identities.
- Possible boundaries include:
  - lunar months,
  - branch months,
  - solar-term months,
  - source-specific operational months.

### 2-3. Daily Calculation (日家)

- A major classical model uses:
  - 60 days = one epoch,
  - 180 days = three epochs.
- This is not the same as Qimen Dunjia's 15-day-style Three-Epoch division.
- The sexagenary day is a primary structural component.
- Daily systems may depend on:
  - sexagenary day,
  - daily epoch,
  - initial star,
  - direction,
  - solstice/seasonal boundary.

### 2-4. Hourly Calculation (時家)

- Uses traditional double-hours **(時辰)** rather than merely civil clock hours.
- One star may advance per double-hour depending on the tradition.
- The day classification and traditional hour sequence may determine the epoch and starting state.

### 2-5. Solstice and transition variants

- Winter Solstice **(冬至)** is commonly associated with Yang progression **(陽遁)**.
- Summer Solstice **(夏至)** is commonly associated with Yin progression **(陰遁)**.
- Historical sources differ on exactly when the transition occurs.
- Possible transition rules include:
  - the solstice itself,
  - a nearby Jia-Zi day **(甲子日)**,
  - a before/after Jia-Zi rule,
  - practical branch-day rules such as Zi-Wu-Mao-You **(子午卯酉)**.
- The architecture should support multiple transition strategies.

## 3. Houkan (方鑑 / 方鑑紫白術)

- **Houkan (方鑑)** is the repository's name for the Japanese directional Purple-White calculation family investigated through materials associated with:
  - Matsura Kinkaku **(松浦琴鶴)**,
  - Iida Tengai **(飯田天涯)**,
  - Kikuchi Yosaku **(菊池要佐久)**,
  - and related Houkan literature.
- The repository must distinguish:
  - documented rules,
  - implementation interpretations,
  - unresolved historical questions.
- Houkan should not be replaced with modern Ki-gaku formulas merely because both use numbered Nine Stars.

### 3-1. Solar-Term Boundaries (節気)

- **Confirmed repository rule**:
  - when examined Houkan material uses entry into a Solar Term **(節気 / 二十四節気)** as a boundary, use the actual astronomical transition instant.
- The astronomical transition is supplied through the repository's sowngwala-js astronomy adapter.
- Example:
  - if transition = 05:00:00,
  - 04:59:59 belongs to the previous interval,
  - 05:00:00 belongs to the new interval.
- Do not:
  - round to midnight,
  - replace the instant with a date-only boundary,
  - invent leap adjustments for convenience.

### 3-2. Hourly Calculation (時家)

- **Confirmed Three-Epoch groups**:
  - Upper / first group: `子午卯酉`
  - Middle / second group: `寅申巳亥`
  - Lower / third group: `辰戌丑未`
- The investigated material confirms a **Jia-Ji condition (甲己)** used by the hourly logic.
- **Yang progression (陽遁) starting stars**:
  - first epoch → **One White (一白)**
  - second epoch → **Seven Red (七赤)**
  - third epoch → **Four Green (四緑)**
- **Yin progression (陰遁) starting stars**:
  - first epoch → **Nine Purple (九紫)**
  - second epoch → **Three Jade (三碧)**
  - third epoch → **Six White (六白)**
- One epoch **(一元)** is:
  - five days,
  - equivalently sixty traditional double-hours.
- One star advances per traditional double-hour.
- Conceptual algorithm:
  - determine traditional day/hour context,
  - determine Three-Epoch group,
  - determine Yin or Yang progression,
  - select the corresponding starting star,
  - count double-hour offsets,
  - advance one star per offset in the selected direction.

### 3-3. Zi Hour Handling (子時)

- The Zi hour must not be assigned to one universal civil-date rule without checking the historical distinction.
- The examined material distinguishes concepts corresponding to:
  - "tonight" **(今夜)**,
  - "the following morning / this dawn" **(今暁)**.
- Therefore the traditional day boundary must remain an explicit rule in the implementation.
- Do not hide this logic inside generic JavaScript date handling.

### 3-4. Daily Calculation (日家)

- The Houkan daily structure is intentionally **not** reduced to a simple fixed 180-day cycle.
- The implementation recognizes:
  - six seasonal periods **(六気)**,
  - Yang progression **(陽遁)**,
  - Yin progression **(陰遁)**.
- The historical selection of the absolute Jia-Zi reference point remains **unresolved**.
- Therefore:
  - the sexagenary 60-day structure is recognized,
  - seasonal and directional structure is recognized,
  - but absolute synchronization must not be guessed.

### 3-5. Matsura's Daily Three-Epoch Model from Bensetsu (弁説)

- The examined Bensetsu text describes six daily starting states:
  - Winter Solstice **(冬至)** Jia-Zi → Yang Upper → **One White (一白)** in the Central Palace **(中宮)**.
  - Rain Water **(雨水)** Jia-Zi → Yang Middle → **Seven Red (七赤)**.
  - Grain Rain **(穀雨)** Jia-Zi → Yang Lower → **Four Green (四緑)**.
  - Summer Solstice **(夏至)** Jia-Zi → Yin Upper → **Nine Purple (九紫)**.
  - Limit of Heat **(処暑)** Jia-Zi → Yin Middle → **Three Jade (三碧)**.
  - Frost Descent **(霜降)** Jia-Zi → Yin Lower → **Six White (六白)**.
- Compact mapping:
  - Yang Upper → 1,
  - Yang Middle → 7,
  - Yang Lower → 4,
  - Yin Upper → 9,
  - Yin Middle → 3,
  - Yin Lower → 6.
- The source discusses disagreement among older calendar books concerning:
  - whether the Jia-Zi after a solstice is used,
  - whether a Jia-Zi before/after a boundary is used,
  - how the true origin should be established.
- This disagreement is evidence that the repository must preserve variants rather than force one universal formula.

### 3-6. Monthly Three Epochs (月家三元)

- The examined Bensetsu material describes a monthly sexagenary cycle:
  - Jia-Zi month **(甲子月)** through Gui-Hai month **(癸亥月)** = 60 months = one epoch **(一元)**.
  - Three such epochs = 180 months.
- The monthly structure is explicitly compared with the annual Three-Epoch structure.
- The cycle returns to its origin after the larger sequence.
- The text presents a simplified association using branch groups such as:
  - Zi-Wu-Mao-You **(子午卯酉)**,
  - Yin-Shen-Si-Hai **(寅申巳亥)**,
  - Chen-Xu-Chou-Wei **(辰戌丑未)**,
  while also indicating a deeper sexagenary method involving branch positions traditionally described through birth, flourishing, and storage/tomb relationships.
- **Working interpretation**:
  - monthly Three Epochs are a real 60-month/180-month structural layer and must not be reduced to ordinary month numbering.
- **Unresolved**:
  - the exact operational formula for every historical variant still requires reconstruction from source text and diagrams.

### 3-7. Five Tigers Rule (五虎遁) and Sexagenary Months

- General sexagenary month logic is required to interpret Houkan historical statements.
- For the Wu/Gui year-stem group **(戊癸)**, the Tiger month begins as Jia-Yin **(甲寅)**.
- Advancing stems through branch months produces the relevant sexagenary month sequence, including:
  - Zi month **(子月)** → Jia-Zi month **(甲子月)**,
  - Chou month **(丑月)** → Yi-Chou month **(乙丑月)**,
  under the relevant sequence.
- This helps explain Matsura-style statements such as:
  - previous eleventh month = Jia-Zi month,
  - twelfth month = Yi-Chou month,
  - following months continuing the sexagenary sequence.
- **Critical caution**:
  - traditional "eleventh month" is not automatically Gregorian November.
  - possible meanings include branch month, lunar month, solar-term month, or source-specific month.
- Boundary convention must be explicit in code and test vectors.

### 3-8. Current Jia-Zi Synchronization Research

- A central unresolved phrase in the investigated Houkan material concerns:
  - Jia-Zi month **(甲子月)**,
  - Jia-Zi day **(甲子日)**,
  - circulation through sixty months **(六十箇月)**,
  - transformation or renewal of day-star/sexagenary correspondence at monthly Three-Epoch beginnings.
- Current research principles:
  - distinguish sexagenary month from Gregorian month,
  - verify candidate dates using reliable historical calendar data,
  - never trust one online calendar alone,
  - cross-check by sexagenary continuity and modulo-60 arithmetic.
- A Jia-Zi month does not necessarily contain a Jia-Zi day.
- Therefore "Jia-Zi month + Jia-Zi day" is an actual synchronization condition requiring date-level verification.
- Meiji-period investigation has shown why source checking is essential:
  - year labels, Gregorian years, lunar months, solar-term months, and day cycles can easily be mixed,
  - even 1888 and 1988 can be confused by weak calendar search results.
- Candidate synchronizations must become hard-coded anchors only after independent verification.

### 3-9. Houkan Implementation Status

- Hourly calculation:
  - structurally implemented from confirmed epoch groups and starting stars.
- Solar-term boundary handling:
  - implemented with actual astronomical transition instants.
- Daily calculation:
  - six-period and Yin/Yang framework represented,
  - absolute historical Jia-Zi synchronization unresolved.
- Monthly calculation:
  - 60-month and 180-month structure documented,
  - complete operational reconstruction remains under research.
- Annual calculation:
  - related Purple-White structures are known,
  - exact Houkan-specific behavior should remain explicit rather than guessed.

## 4. Nine-Star Ki-gaku (九星気学)

- Ki-gaku is a modern Japanese Nine-Star family related to the broader Purple-White **(紫白)** and Nine-Palace **(九宮)** framework.
- It should not be treated as entirely unrelated to Houkan, but neither should it be assumed identical.
- Shared concepts may include:
  - numbered Nine Stars,
  - Nine Palaces,
  - annual and monthly cycles,
  - directional use.
- Differences may include:
  - year boundary,
  - solar-term convention,
  - daily rules,
  - practical standardization,
  - modern formula selection.
- Implementation principle:
  - reuse the generic Purple-White core where mechanics genuinely agree,
  - define Ki-gaku-specific initialization and boundary rules separately.
- Annual logic must distinguish:
  - Gregorian year,
  - astrological/calendrical year,
  - annual star.
- Monthly logic must distinguish:
  - Gregorian month number,
  - traditional/solar-term month identity,
  - selected modern Ki-gaku convention.
- Daily and hourly logic must not automatically inherit Matsura's unresolved Houkan synchronization.
- **Future research**:
  - define the exact Ki-gaku variant(s) intended by the repository,
  - establish authoritative test vectors for all four levels.

## 5. Xuan Kong Flying Stars (玄空飛星)

- Xuan Kong Flying Stars are closely related through:
  - Nine Palaces **(九宮)**,
  - numbered stars,
  - flying movement.
- They should remain an independent calculation family where temporal structure differs.
- **Critical distinction**:
  - Three Epochs and Nine Periods **(三元九運)** is not automatically the same as the Three-Epoch divisions used by annual/monthly/daily/hourly Purple-White systems.
- Reuse only genuinely common primitives:
  - star identities where applicable,
  - palace representation,
  - cyclic movement,
  - forward/reverse operations.
- Keep independent:
  - epoch/period definitions,
  - chart construction,
  - orientation rules,
  - building/time references,
  - tradition-specific starting rules.
- **Future research**:
  - define exact Xuan Kong variants before implementation.

## 6. Qimen Dunjia Separation Rule (奇門遁甲)

- Purple-White Nine Stars **(紫白九星)** are not Qimen Nine Stars **(奇門九星)**.
- Qimen stars such as Tian Peng **(天蓬)**, Tian Rui **(天芮)**, and Tian Chong **(天衝)** must not be substituted for One White through Nine Purple.
- Qimen Three-Epoch logic must not be substituted for Purple-White daily Three-Epoch logic.
- A Qimen-style 15-day structure is not a replacement for the Purple-White 60-day epoch.
- Shared utilities may include:
  - stems,
  - branches,
  - sexagenary indexing,
  - date arithmetic,
  - modular arithmetic.
- Star domains and cycle engines must remain separate modules/namespaces.

## 7. Sexagenary Calendar Infrastructure (干支暦)

- The infrastructure should support sexagenary:
  - year,
  - month,
  - day,
  - hour.
- Represent the cycle as indexed cyclic data, not merely concatenated display strings.

### 7-1. Month Stems

- Month-stem logic must support Five Tigers **(五虎遁)** or another explicitly selected rule.
- Store separately:
  - branch-month identity,
  - month stem,
  - full sexagenary month.
- This is necessary because Jia-Zi month **(甲子月)** is a calendrical identity, not a Gregorian date label.

### 7-2. Boundary Conventions

- Every calculation should declare the boundary convention when relevant:
  - civil midnight,
  - traditional day boundary,
  - Zi-hour boundary,
  - solar-term transition,
  - lunar month boundary,
  - branch-month boundary.
- Never silently mix these conventions.

### 7-3. Historical Verification

- Historical date verification should use:
  - independent calendar sources,
  - sexagenary continuity,
  - modulo-60 arithmetic,
  - explicit year/month/day conventions.
- Common failure modes:
  - century-digit mistakes,
  - Gregorian/traditional year mixing,
  - time-zone differences,
  - lunar vs solar-term month confusion,
  - different day-boundary conventions.

## 8. Solar-Term Astronomy (二十四節気)

- Solar-term transitions are instants, not merely named calendar days.
- Infrastructure should expose:
  - term name,
  - transition timestamp,
  - normalized instant/time zone,
  - interval before and after transition.
- Test boundaries with:
  - immediately before,
  - exact transition,
  - immediately after.
- Required terms for current Houkan work include:
  - Winter Solstice **(冬至)**,
  - Rain Water **(雨水)**,
  - Grain Rain **(穀雨)**,
  - Summer Solstice **(夏至)**,
  - Limit of Heat **(処暑)**,
  - Frost Descent **(霜降)**.

## 9. Result Model and Explicit Uncertainty

- Results should preserve provenance and uncertainty.
- Recommended fields:
  - `tradition`,
  - `level`,
  - `star`,
  - `palace`,
  - `epoch`,
  - `direction`,
  - `sexagenaryYear`,
  - `sexagenaryMonth`,
  - `sexagenaryDay`,
  - `sexagenaryHour`,
  - `boundaryRule`,
  - `boundaryInstant`,
  - `status`,
  - `notes`.
- Recommended status values:
  - `confirmed`,
  - `documented`,
  - `implemented`,
  - `working-interpretation`,
  - `unresolved`,
  - `not-applicable`.
- An unresolved historical rule should produce an explicit unresolved state rather than a fabricated result.

## 10. Testing and Reimplementation Strategy

### 10-1. Shared primitives

- Test modulo-9 progression.
- Test forward and reverse flight.
- Test wrap-around.
- Test star identity independently from palace position.

### 10-2. Sexagenary cycle

- Test 60-step wrap-around.
- Test consecutive day increments.
- Test Five Tigers month-stem sequences.
- Test branch month independently from Gregorian month.

### 10-3. Solar-term boundaries

- Test exact astronomical transition instants.
- Test before/exact/after states.
- Test time-zone normalization.
- Verify no rounding to midnight.

### 10-4. Houkan hourly tests

- Test all three epoch branch groups.
- Test Yang starts: 1, 7, 4.
- Test Yin starts: 9, 3, 6.
- Test one star per double-hour.
- Test sixty double-hours / five-day epoch wrap.
- Test Zi-hour historical boundary behavior.

### 10-5. Houkan daily research tests

- Do not encode a guessed Jia-Zi synchronization as confirmed.
- Use separate fixtures for:
  - documented seasonal states,
  - documented epoch starts,
  - candidate synchronizations,
  - hypotheses.
- Promote candidates to regression tests only after independent verification.

### 10-6. Historical regression metadata

- Every historical fixture should record:
  - source,
  - calendar convention,
  - time zone,
  - exact input,
  - expected result,
  - confidence/status.

## 11. Current Research Backlog

- Establish a reliable historical calendar baseline for Meiji-period sexagenary dates.
- Independently verify candidate Jia-Zi month/Jia-Zi day synchronization points.
- Determine recurrence intervals of verified synchronizations.
- Determine the exact algorithmic meaning of "circulate through sixty months" **(六十箇月)**.
- Determine whether a 60-month interval:
  - is an independent operating cycle,
  - begins only at a synchronization point,
  - resets at monthly Three-Epoch boundaries,
  - or transforms rather than resets.
- Determine the exact operational meaning of transformation/renewal of correspondence **(配遇を改華)** at monthly Three-Epoch starts.
- Compare reconstructed algorithms with the historical diagrams and tables already examined.
- Keep Matsura's **Hiden (秘伝)** and **Bensetsu (弁説)** separate until exact agreement/disagreement is demonstrated.
- Treat Meiji 16/17 publication and contemporary practical use as a historical clue about computability, not as proof of a particular synchronization date.
- Maintain a strict distinction among:
  - source text,
  - mathematical inference,
  - historical calendar reconstruction,
  - implementation decision.

## 12. Repository Maintenance Rules

- Update this file whenever:
  - a historical rule is confirmed,
  - an unresolved problem is solved,
  - a calculation family is added,
  - a boundary convention changes,
  - a test vector is accepted or rejected.
- Preserve uncertainty history when it matters to reproducibility.
- Do not silently rewrite an old hypothesis as if it had always been confirmed.
- For each major update, preferably record:
  - source-derived rule,
  - implementation interpretation,
  - unresolved issue,
  - testing impact,
  - migration impact.
- If source code and this file disagree:
  - inspect historical basis and tests,
  - determine which is stale,
  - do not assume executable code is automatically historically authoritative.

## 13. Current Hard Boundaries Between Families

- **Shared Purple-White Core (紫白九星)**:
  - reusable star identities,
  - cyclic arithmetic,
  - Nine Palaces,
  - forward/reverse flight.
- **Classical Three-Epoch Purple-White (三元紫白)**:
  - 60-unit and 180-unit structures,
  - historically variable transitions.
- **Houkan (方鑑)**:
  - Japanese directional Purple-White reconstruction,
  - exact astronomical solar-term boundaries where documented,
  - confirmed hourly groups and starting stars,
  - unresolved absolute daily Jia-Zi synchronization.
- **Nine-Star Ki-gaku (九星気学)**:
  - related modern Japanese family,
  - reuse only genuinely shared mechanics.
- **Xuan Kong Flying Stars (玄空飛星)**:
  - related flying-star family,
  - Three Epochs/Nine Periods remains distinct from Purple-White Three-Epoch cycles.
- **Qimen Dunjia (奇門遁甲)**:
  - explicitly separate star domain,
  - shared calendar utilities may be reused,
  - star and epoch algorithms must not be conflated.

This document is a living specification. It is intended to function as both a reimplementation map and a research ledger: it should make clear what is known, what is implemented, what is inferred, and what remains unresolved.
