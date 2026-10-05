# Translation Rules

- In this repo, there are '*.md' which contain technical words for East Asian astrology or divination.
- For such words:
  - Apply bold styles. Example: **xx**
  - Enclose them in double-quotes. Example: **"xx"**
  - Associate each word with translations (expressed as a set of locales) enclosed in parenthesis. Example: **"xx"** (xx)
- Depending on the language (of the words), locales for translations will differ:
  - The word is in English:
    - For translations, have the following locales (in the order described):
      "ja", "zh_tw", "zh_ch", "alphabetical expression of zh_ch", and "vi".
      Example:
      **"Forward Flight"** (順飛 / 顺飞 / shun-fei / thuận phi)
  - The word is in languages other than English:
    - For translations, it is about the same as the previous, but omit the alphabetical expression:
      "ja", "zh_tw", "zh_ch", and "vi".
      Example:
      **"Luo-Shu"** (洛書 / 洛书 / lạc thư)
- Follow certain rules for translations:
  - Avoid duplicates in translated words: When you add translations in parenthesis, you will often see some translated words are exactly the same (e.g. "一白 / 一白 / 一白"). For many times, they are "ja" and "zh_tw". If that happes, reduce them to only 1 (e.g. "一白"). Example: **"Purple-White Stars** (紫白星 / zi-bai-xing / tử bạch tinh)
  - For "alphabetical expression" and "vi", have them in small letters.
  - For "alphabetical expression", concatenate words with "-" (kebab-case).
  - IMPORTANT: When you encounter the same word in the same document, you will not need a full set of locales in transilations for the second word onwards. For instance, you see **"Purple-White Stars"** appears close the top of the file. For this, you would add "(紫白星 / zi-bai-xing / tử bạch tinh)" next to it. However, when you see **"Purple-White Stars"** for the second time (in the same file), we will only have "ja" for the locale, so it will look like "(紫白星)".
- There are special rules for special words:
  - When you see one of the 二十四節気, avoid English. Instead, express it in an alphabetical expression of zh_ch. For instance, instead of writing **"Beginning of Spring"** (立春 / li-chun / lập xuân), write as **"Li-Chun"** (立春 / lập xuân). Yet, the rule does not apply to 'docs/terminologies.md'.
  - We frequently use the word "sexagenary". When it means "六十干支", I want to use the therm "Sixty Gan-Zhi Unit" instead. If it meant something generic, no need to apply this rule.
  - For "干支", express them in alphabetical expressions of zh_ch. For instance, I want it written as **"Jia-Zi"** (甲子 / giáp-tý) instead of having **"甲子"** (jia-zi / giáp-tý).
