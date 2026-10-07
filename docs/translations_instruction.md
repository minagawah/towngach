# Translation Instructions for AI

This file is an instruction sheet for translation-annotation jobs in this repository. It is intentionally separate from the public `docs/translations.md`.

## 1. Target selection

**Do not search the document for technical terms on your own.**

The human author identifies the targets for translation by making them **bold** and enclosing them in **double quotes**, for example:

- **"Forward Flight"**
- **"紫白星"**
- **"Jia-Zi"**

Only these explicitly marked terms are translation targets.

Do not add bolding, double quotes, or translation annotations to other words unless the human explicitly asks for target discovery or another kind of editing.

## 2. Annotation only

The task is to add or correct translation annotations for the marked targets.

Preserve the source document otherwise.

Do **not**:
- rewrite or paraphrase prose;
- correct unrelated English;
- add, remove, or merge paragraphs;
- add or remove line breaks;
- reorder content;
- rewrite headings, lists, or tables;
- change punctuation except where required to insert the translation annotation;
- modify code blocks, inline code, URLs, or other non-prose markup unless a marked target is explicitly inside them.

The translation job should therefore produce the smallest possible diff.

## 3. Translation format

For an English target, use this locale order:

1. `ja`
2. `zh_tw`
3. `zh_ch`
4. alphabetical expression of `zh_ch`
5. `vi`

Example:

**"Forward Flight"** (順飛 / 顺飞 / shun-fei / thuận phi)

For a target that is not English, use:

1. `ja`
2. `zh_tw`
3. `zh_ch`
4. `vi`

Example:

**"Luo-Shu"** (洛書 / 洛书 / lạc thư)

The locale names are instructions; do not print locale labels in the annotation.

## 4. Duplicate translations

If adjacent locale entries are exactly identical, write the identical translation only once.

For example, do not write:

**"One White"** (一白 / 一白 / 一白)

Write:

**"One White"** (一白)

The same rule applies regardless of which locales are identical.

Do not use a duplicate entry merely to preserve the number of locale positions.

## 5. Romanization

For the alphabetical expression of `zh_ch`:

- use lowercase letters;
- separate words with hyphens;
- follow the project's established zh_ch romanization conventions;
- do not add tone marks unless the project explicitly uses them.

Vietnamese translations are also lowercase.

## 6. First and later occurrences

Occurrence tracking is per Markdown document.

For the first occurrence of the same target term in a document, provide the full translation set.

For later occurrences of that same target term in the same document, provide only the Japanese translation:

**"Purple-White Stars"** (紫白星)

Treat the exact marked term as the occurrence key. Do not assume that related but different terms are the same term merely because they contain the same words.

Do not count an occurrence inside code, URLs, or existing translation metadata when deciding whether a prose occurrence is the first occurrence.

## 7. 二十四節気

For the 二十四節気, use the zh_ch alphabetical expression as the displayed English-facing term, except in `docs/terminologies.md`.

For example:

**"Li-Chun"** (立春 / lập xuân)

Do not use an English translation such as "Beginning of Spring".

For later occurrences in the same document:

**"Li-Chun"** (立春)

The special rule applies to the displayed term itself; do not independently rewrite surrounding prose.

## 8. 六十干支 and 干支

When `sexagenary` means 六十干支, use:

**"Sixty Gan-Zhi Unit"**

Do not change generic uses of `sexagenary`.

For an individual 干支, use its zh_ch alphabetical expression rather than the original Chinese characters as the displayed technical term. For example:

**"Jia-Zi"** (甲子 / giáp-tý)

Follow the same first-occurrence/later-occurrence rules for these terms.

## 9. Existing annotations

If a target already has a translation annotation, correct it only if it conflicts with these rules.

Do not duplicate an existing annotation or append a second parenthesized translation.

## 10. Final validation

Before returning the edited document, verify:

- Only explicitly marked **"targets"** were annotated.
- Every first occurrence has the required full translation set.
- Later occurrences have only the Japanese translation.
- Duplicate translation strings were collapsed.
- zh_ch alphabetical expressions are lowercase and hyphenated.
- Vietnamese is lowercase.
- 二十四節気 follow the Li-Chun-style rule.
- 六十干支 uses **"Sixty Gan-Zhi Unit"** when applicable.
- Individual 干支 use Jia-Zi-style expressions.
- No unrelated prose was rewritten.
- No paragraph or line-break structure was changed.
- No unrelated Markdown, code, URL, heading, list, or table formatting was changed.
- The resulting diff is limited to translation annotations and explicitly required terminology substitutions.
