# towngach

Provides algorithms for planetary calculations popular in Asia. 

## 1. About

![astrolabe](./astrolabe.jpg)

### What is "Towngach"?

The name **Towngach** (`/taʊŋˈɡætʃ/`) originates from "Tawgač" (`/tɑwˈɣɑtʃ/` or tahw-GHAHCH) or "Tabgach" (`/tɑbˈɣɑtʃ/` or tahb-GHAHCH), an ancient Turkic (突厥) term recorded in historical monuments like the Bilge Khagan Inscription (毗伽可汗碑) to denote the Tang Dynasty (唐) and the vast sovereign realm of China. Grammatically, the suffix `-č` in Ancient Turkic signifies _"people of"_ or _"clan of"_. The root traces back to the Tuobay (拓跋) clan of the Xianbei (鮮卑) who founded the Northern Wei Dynasty (北魏). To the Turks (突厥) and Sogdian (ソグド) merchants along the Silk Road, this word transcended a single clan name to become a universal noun representing _"the sovereign imperial domain of the East, bathed in celestial light"_.

This royal bloodline of the Tuoba (拓跋) clan-endowed with advanced metal refining technologies and military prowess &mdash; originally migrated eastward from ancient Western Asia (Sumer and Babylonia). Centuries later, this same lineage founded the Western Xia Dynasty (西夏). The royal family carried this ancient heritage, creating _"the Tangut script"_ (西夏文字) as a revival of the sacred, highly mystical pictographs from China's ancient Shang Dynasty (殷) &mdash; a script from an era before characters became abstracted, preserving intense spiritual depth.

Furthermore, the state religion of Western Xia (西夏) was a deeply mystical Esoteric Buddhism (密教) transmitted from Tibet and Central Asia. This ritualistic tradition placed supreme importance on the positions and movements of celestial bodies, including the Sun, Moon, and the Big Dipper (北斗七星). This cosmic veneration directly inherited the ancient astral worship of Sumer and Babylonia, where priests observed the night sky to commune with the divine. Flowing through Persia and India, this astral lore culminated during the Tang Dynasty (唐) and infused the entire East Asian cultural sphere.

Although East Asian astrological calculations &mdash; such as Nine Stars (九星), Qi Men Dun Jia (奇門遁甲), and Zi Wei Dou Shu (紫微斗数) &mdash; eventually branched into specialized systems across different regions, they all share this single, grand origin.

By taking the name as **"Towngach"**, this library honors that deep historical thread: connecting Mesopotamian celestial worship, the metallurgical and royal heritage of the Tuoba (拓跋) clan, the mystical arts of Tang-era Asia, and modern computational algorithms into a single unified toolkit.

### Scope: "purple-white-nine-stars" (紫白九星) rather than "qimen-nine-stars" (奇門九星)

This library is primarily concerned with the calculation and movement of the **"purple-white-nine-stars"** (紫白九星 / cửu tinh tử bạch) through the **"nine-palaces"** (九宮 / cửu cung). Its subject is therefore the cosmological and calendrical system of stars commonly represented by the numbers and colors **"one-white"** (一白 / nhất bạch) through **"nine-purple"** (九紫 / cửu-tử), and their movement according to the structure of **"the Luo-shu"** (洛書 / 洛书 / lạc thư) and the **"nine-palaces"** (九宮).

The library does not, at least in its primary scope, attempt to calculate the nine stars of **"Qimen Dunjia"** (奇門遁甲 / 奇门遁甲 / Kỳ Môn Độn Giáp), such as "Tian Peng" (天蓬星 / thiên bồng), "Tinh Tian Rui" (天芮星 / thiên nhuế), Tinh Tian Chong (天衝星 / 天冲星 / thiên xung tinh) and the other stars belonging to that system. Although both traditions use the expression "Nine Stars," they represent different technical systems.

### A Shared Foundation: "purple-white-stars" (紫白九星) and the "nine-palaces" (九宮)

The common foundation of the systems covered by this library is the relationship between the "purple-white-nine-stars" (紫白九星) and the "nine-palaces" (九宮). A star may be assigned to the central palace (中宮) and then allowed to move through the palace (宮) sequence according to a defined rule. Depending on the method, this movement may proceed forward or backward, corresponding to forward flight (順飛 / 顺飞 / thuận phi) and reverse flight (逆飛 / 逆飞 / nghịch phi).

This common foundation makes it possible for apparently different traditions to share a substantial amount of computational logic. The same "nine-palace" (九宮) structure can support annual, monthly, daily, and hourly calculations, even when the rules used to determine the initial star or the calendrical boundary differ.

### Four Calendrical Levels

The "purple-white" (紫白) system is commonly applied at four calendrical levels: annual calculation (年家 / Niên Gia), monthly calculation (月家 / Nguyệt Gia), daily calculation (日家 / Nhật Gia), and hourly calculation (時家 / 时家 / Thời Gia).

These four levels should not necessarily be understood as four unrelated systems. They share the same general cosmological vocabulary of "purple-white stars" (紫白九星) and the "nine-palaces" (九宮), but each level may define its own temporal cycles, starting points, transitions, and rules for determining the initial star. For this reason, a reusable implementation should recognize both their shared structure and their independent calendrical logic.

### Classical San Yuan Purple-White Traditions

One major family of methods is the classical "three-epochs-purple-white" (三元紫白 / Tam Nguyên Tử Bạch) system found in Chinese calendrical and selection traditions. Within this family, annual, monthly, daily, and hourly purple-white calculations (時家九星) are treated as related expressions of the same general system.

The annual calculation (年家) is based on the large cycle of the "three-epochs" (三元 / Tam Nguyên), traditionally expressed through a sequence of 60 year units and a larger 180 year cycle. The monthly calculation (月家) uses its own relationship between annual cycles (歲運 / 岁运 / Tuế Vận), terrestrial branches (地支 / 地支 / Địa Chi), and the monthly sequence (月建 / 月建 / Nguyệt Kiến). The daily calculation (日家) is based on a 60 day unit and a larger cycle of 3 such units. The hourly calculation (時家) again uses its own division of time, often derived from the classification of the day and the sequence of the traditional "double-hours" (時辰 / 时辰 / giờ âm lịch).

These methods form an important baseline for the library because they provide one of the most coherent historical families of purple-white (紫白) calculations.

### Japanese Directional and Divinatory Traditions

Japanese systems of **"directional divination"** (方鑑 / 方鉴 / phương giám) adopted and reorganized purple-white (紫白) calculations within their own calendrical and practical traditions. Annual, monthly, daily, and hourly stars continued to be calculated through the nine-palaces (九宮), and the "sixty-unit" (六十干支 / 六十花甲 / lục thập hoa giáp) and "three-epoch" (三元) structures remained particularly important.

At the level of general structure, many of these methods can be grouped with the classical "three-epochs-purple-white" (三元紫白) tradition. However, the Japanese traditions developed their own questions concerning calendrical boundaries, the relationship between solstices and stellar movement, and the proper treatment of transitions between cycles. Therefore, methods that appear identical at the level of the main cycle may still differ in their boundary conditions.

### The "daily-purple-white" (日家紫白) Cycle

The "daily-purple-white" (日家紫白 / nhật gia tử bạch) calculation is one of the most important areas of variation covered by the historical traditions. A major classical model treats 60 days as one epoch (一元), with three such epochs (三元) forming a 180 day cycle.

This model is fundamentally different from the daily divisions used in Qimen Dunjia (奇門遁甲). In purple-white (紫白) calculation, the 60 day sexagenary sequence is itself part of the basic structure of the daily cycle (日家). A library implementing purple-white (紫白) methods should therefore avoid assuming that a Qimen (奇門) style 15 day "three-epoch cycle" (三元) can be used as a substitute.

The daily sequence (日家) is also closely connected with the winter and summer solstices and with the distinction between "yang-progression" (陽遁 / 阳遁 / dương độn) and "yin-progression" (陰遁 / 阴遁 / âᴍ độɴ)**. Exactly how the transition is handled, however, is one of the places where historical methods diverge.

### Alternative Rules for Daily Transitions

Not all historical "daily-purple-white" (日家紫白) methods use the same rule for changing between Yang (陽) and Yin (陰) progression. Some methods emphasize calendrical boundaries associated directly with the solstices and the "three-epoch-cycle" (三元). Other methods use nearby days associated with the four branches (支) "Zi", "Wu", "Mao", and "You" (子午卯酉 / Tý Ngọ Mão Dậu) as practical transition points.

These methods may share the same 60 day foundation and the same "nine-palace-flight" (九宮飛泊 / 九宫飞泊 / cửu cung phi bạc), while differing only in the rule that determines when the direction of movement changes. From the perspective of software design, such methods should therefore not necessarily require completely separate systems. They may instead be represented as variants of a common "daily-purple-white" (日家紫白) engine with different transition rules.

At the same time, methods that reorganize the Three Epoch structure itself, rather than merely changing the boundary condition, may require genuinely independent calculation logic.

### Modern Japanese Nine-Star Systems

Modern Japanese "nine-star" (九星 / cửu tinh) systems, including traditions commonly associated with "nine-star-ki" (九星気学 / 九星氣學 / 九星气学 / Cửu Tinh Khí Học), inherit much of the broader "purple-white" (紫白) and "nine-palace" (九宮) framework.

Annual (年家) and monthly (月家) calculations are generally based on recognizable calendrical cycles and seasonal boundaries, while daily (日家) and hourly (時家) calculations continue to depend on the interaction between the traditional calendar, the sexagenary cycle, and the nine-palace (九宮) movement. These systems can often share substantial computational logic with earlier purple-white (紫白) traditions, but differences may appear in such matters as the precise definition of a year boundary, the handling of solar terms (節氣 / 节气 / tiết khí), and the treatment of daily transitions.

For this reason, modern Japanese methods are best regarded not as an entirely separate cosmology, but as a family of related implementations built upon the same Purple-White foundation.

### Xuan Kong Flying Stars (玄空飛星)

The library may also be useful to traditions associated with "xuan-kong-flying-stars" (玄空飛星 / 玄空飞星 / Huyền Không Phi Tinh). These systems likewise use the "nine-palaces" (九宮) and the movement of numbered stars, and therefore share a natural computational vocabulary with Purple-White calculation.

However, the concept of the "three-epochs-and-nine-periods" (三元九運 / 三元九运 / Tam Nguyên Cửu Vận) should not be confused with the "three-epoch" (三元) divisions used in annual (年家), monthly (月家), daily (日家), or hourly (時家) "purple-white" (紫白) calculations. The two systems may both use the word "Three Epochs" (三元) but they describe different temporal structures and may serve different purposes.

For this reason, "xuan-kong" (玄空) calculations should be treated as closely related to the library's "purple-white" (紫白) core without assuming that every temporal rule can be shared directly.

### Shared Logic and Independent Logic

The main purpose of supporting multiple traditions is not to erase their differences, but to identify where their computational structures genuinely coincide. The "nine-palaces" (九宮 / 九宫 / cửu cung), the sequence of the "purple-white-stars" (紫白九星 / 紫白九星 / cửu tinh tử bạch), and the concepts of "forward-flight" (順飛 / 顺飞 / thuận phi) and "reverse-flight" (逆飛 / 逆飞 / nghịch phi) provide a common foundation. These can often be implemented once and reused.

The determination of the "starting-star" (起始星 / 起始星 / khởi thủy tinh), however, may depend on the annual (年家 / Niên Gia), monthly (月家 / Nguyệt Gia), daily (日家 / Nhật Gia), or hourly (時家 / 时家 / Thời Gia) cycle. The definition of a calendrical boundary may depend on "solar-terms" (節氣 / 节气 / tiết khí), "solstices" (二至 / nhị chí), "sexagenary-days" (六十干支 / 六十花甲 / lục thập hoa giáp), or tradition-specific rules. The definition of the "three-epochs" (三元 / Tam Nguyên) may also vary between systems. These differences should therefore remain explicit rather than being hidden behind a single universal formula.

### Historical Variants as Calculation Rules

The traditions represented by this library should be understood as historical and technical variants of "purple-white" (紫白 / tử bạch) calculation rather than as mutually exclusive systems. In many cases, two traditions may use exactly the same "nine-palace-flight" (九宮飛泊 / 九宫飞泊 / cửu cung phi bạc) while differing only in the way they determine the "initial-star" (起始星 / 起始星 / khởi thủy tinh). In other cases, they may share the same "sixty-unit-cycle" (六十干支 / 六十花甲 / lục thập hoa giáp) while differing only in the treatment of a transition near a "solar-term" (節氣 / 节气 / tiết khí) or "solstice" (二至 / nhị chí).

A useful implementation can therefore distinguish between the underlying "purple-white-cycle" (紫白九星 / cửu tinh tử bạch), the rule used to determine the "three-epochs" (三元 / Tam Nguyên), the rule used to select the "starting-star" (起始星 / 起始星 / khởi thủy tinh), the rule used to determine "forward-flight" (順飛 / 顺飞 / thuận phi) or "reverse-flight" (逆飛 / 逆飞 / nghịch phi), and the calendrical method used to determine the relevant boundary. This makes it possible to represent closely related traditions without incorrectly forcing them into complete identity.

### A Focus on Purple-White Compatibility

The intended scope of this library is therefore the broad family of calculations in which the "purple-white-nine-stars" (紫白九星 / cửu tinh tử bạch) move through the "nine-palaces" (九宮 / 九宫 / cửu cung) across annual (年家 / Niên Gia), monthly (月家 / Nguyệt Gia), daily (日家 / Nhật Gia), and hourly (時家 / 时家 / Thời Gia) time scales. This includes traditions that developed in China and Japan and may also provide a useful computational foundation for related "flying-star" (飛星 / 飞星 / phi tinh) traditions.

The library does not attempt to treat every historical system that uses the name "nine-stars" (九星 / cửu tinh) as part of the same algorithm. In particular, "Qimen-Dunjia" (奇門遁甲 / 奇门遁甲 / Kỳ Môn Độn Giáp) and its own "nine-stars" (九星 / cửu tinh) and "three-epochs" (三元 / Tam Nguyên) divisions belong to a different technical context. The goal here is instead to preserve the specific family of "purple-white" (紫白 / tử bạch) calculations based on the numbered stars, the "nine-palaces" (九宮 / 九宫 / cửu cung), and their historically distinct but structurally related methods of movement.

## 6. Installed NPM Packages

### Babel

- core-js
- @babel/cli
- @babel/core
- @babel/preset-env
- babel-loader
- babel-plugin-preval
- babel-plugin-polyfill-corejs3

### ESLint & Prettier

- prettier
- eslint
- @eslint/js
- eslint-config-prettier
- eslint-plugin-prettier
- @stylistic/eslint-plugin

### JSDoc

- jsdoc
- jsdoc-tsimport-plugin
- jsdoc-plugin-intersection
- typescript
- @types/ramda

### Jest

- jest
- babel-jest

### Others

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

## 7. License

### For Towngach Library

Dual-licensed under either of the following.  
Choose whichever you prefer.

- The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE))
- MIT license ([LICENSE.MIT](LICENSE.MIT))
