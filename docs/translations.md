# Translation Rules

Defining rules for AI agents when applying translations for '*.md' documents present in this repo.

- In this repo, there are '*.md' which contain technical words for East Asian astrology or divination. I want you to associate translations for such words.
- Yet, add translations only when the following 2 conditions are met:
  - For such words, (1) I usually apply bold styles. Example: **xx**
  - Also, (2) sometimes, I enclose them in double-quotes. Example: **"xx"**
- So, the rule is simple: "Find words that are in bold font, or sometimes enclosed in double-quotes, and add traslations for them".
- Bellow, I will explain about the translation format.
- For each target word, add its translations enclosed in parenthesis. Example: **"xx"** (xx)
- When the word is in English:
  - Have translations in the following order:
    "ja", "zh_tw", "zh_ch", "alphabetical expression of zh_ch", and "vi".
    Example:
    **"Forward Flight"** (順飛 / 顺飞 / shun-fei / thuận phi)
- When the words is in languages other than English:    
  - Omit the alphabetical expression, and it will be:
    "ja", "zh_tw", "zh_ch", and "vi".
    Example:
    **"Luo-Shu"** (洛書 / 洛书 / lạc thư)
- Often a time, characters for "ja" and "zh_tw" are the same. To avoid duplicates, reduce them to just one word.
    Example:
    **"Purple-White Stars (紫白星 / zi-bai-xing / tử bạch tinh)
- For "alphabetical expression" and "vi", have them in small letters.
- For "alphabetical expression", concatenate words with "-" (kebab-case).
- When adding translations enclosed in parenthesis, not all of them have to contain a full set of all these locales. I want a full set of translations only when the word appears for the first time in the file. When it appears for the second time onward, you may only have "ja" in the parenthesis.
