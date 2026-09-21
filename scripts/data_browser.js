#!/usr/bin/env node

/**
 * Non-interactive data browser that dumps all module
 * datasets from src/ as formatted tables.
 *
 * Usage:
 *   node scripts/data_browser.js
 */

const path = require('path');
const babel = require('@babel/core');

// ---------------------------------------------------------------------------
// Babel require hook (mirrors scripts/shared/manual_checker.js)
// ---------------------------------------------------------------------------

const original_loader = require.extensions['.js'];

require.extensions['.js'] = (module, filename) => {
  if (
    filename.includes(`${path.sep}node_modules${path.sep}`)
  ) {
    original_loader(module, filename);
    return;
  }

  const transformed = babel.transformFileSync(filename, {
    configFile: path.resolve(
      __dirname,
      '..',
      'babel.config.js'
    ),
    envName: 'commonjs',
  });
  module._compile(transformed.code, filename);
};

// ---------------------------------------------------------------------------
// Table formatter
// ---------------------------------------------------------------------------

/**
 * Builds an array of column widths from an array of row objects.
 *
 * @param {Object[]} rows
 * @param {string[]} headers
 * @returns {number[]}
 */
const compute_widths = (rows, headers) =>
  headers.map(header => {
    let max = header.length;
    for (const row of rows) {
      const val = row[header];
      const len =
        val == null || val === ''
          ? 0
          : typeof val === 'object'
            ? JSON.stringify(val).length
            : String(val).length;
      if (len > max) max = len;
    }
    return max;
  });

/**
 * Renders rows as a pipe-separated table string.
 *
 * @param {string[][]} rows        – flattened values (not objects)
 * @param {number[]}   widths
 * @param {string}     separator
 * @returns {string}
 */
const render_table = (rows, widths, separator = ' | ') => {
  // Pad header names
  const headerLine = rows[0]
    .map((cell, i) => cell.padEnd(widths[i]))
    .join(separator);
  const sepLine = rows[0]
    .map((_, i) => '-'.repeat(widths[i]))
    .join(separator);
  const bodyLines = rows
    .slice(1)
    .map(row =>
      row
        .map((cell, i) => cell.padEnd(widths[i]))
        .join(separator)
    );
  return [headerLine, sepLine, ...bodyLines].join('\n');
};

// ---------------------------------------------------------------------------
// Module scanners — each returns { file, headers, rows }
// ---------------------------------------------------------------------------

/**
 * Scans a definitions array exported by a module.
 *
 * @param {string[]}   headers – keys to surface as columns (in order)
 * @param {Object[]}   defs    – the definitions array
 * @returns {{ headers: string[], rows: string[][] }}
 */
const scan_definitions = (headers, defs) => {
  const rows = defs.map(def =>
    headers.map(h => {
      const val = def[h];
      if (val == null) return '';
      if (typeof val !== 'object') return String(val);
      // Skip localized data objects — show a placeholder.
      if (val.name && typeof val.name === 'object')
        return '(localized)';
      return JSON.stringify(val);
    })
  );
  return { headers, rows };
};

// ---------------------------------------------------------------------------
// Import & scan each module
// ---------------------------------------------------------------------------

const modules = [
  {
    file: 'purple_white/core/nine_stars/star.js',
    scan: () => {
      const m = require(
        path.join(
          __dirname,
          '..',
          'src',
          'purple_white',
          'core',
          'nine_stars',
          'star.js'
        )
      );
      return scan_definitions(
        ['star', 'number', 'element', 'color'],
        m.PURPLE_WHITE_STAR_DEFINITIONS
      );
    },
  },
  {
    file: 'elem/elem.js',
    scan: () => {
      const m = require(
        path.join(__dirname, '..', 'src', 'elem', 'elem.js')
      );
      return scan_definitions(
        ['element', 'index', 'generation', 'control'],
        m.ELEMENT_DEFINITIONS
      );
    },
  },
  {
    file: 'luoshu/luoshu.js',
    scan: () => {
      const m = require(
        path.join(
          __dirname,
          '..',
          'src',
          'luoshu',
          'luoshu.js'
        )
      );
      return scan_definitions(
        ['number', 'palace', 'row', 'column'],
        m.LUOSHU.positions
      );
    },
  },
  {
    file: 'solar_term/solar_term.js',
    scan: () => {
      const m = require(
        path.join(
          __dirname,
          '..',
          'src',
          'solar_term',
          'solar_term.js'
        )
      );
      return scan_definitions(
        ['solar_term', 'index'],
        m.SOLAR_TERM_DEFINITIONS
      );
    },
  },
  {
    file: 'stem/stem.js',
    scan: () => {
      const m = require(
        path.join(__dirname, '..', 'src', 'stem', 'stem.js')
      );
      return scan_definitions(
        ['stem', 'index', 'polarity', 'element'],
        m.STEM_DEFINITIONS
      );
    },
  },
  {
    file: 'branch/branch.js',
    scan: () => {
      const m = require(
        path.join(
          __dirname,
          '..',
          'src',
          'branch',
          'branch.js'
        )
      );
      return scan_definitions(
        ['branch', 'index', 'polarity'],
        m.BRANCH_DEFINITIONS
      );
    },
  },
  {
    file: 'palace/palace.js',
    scan: () => {
      const m = require(
        path.join(
          __dirname,
          '..',
          'src',
          'palace',
          'palace.js'
        )
      );
      // PALACE_DEFINITIONS is not exported, so build it from individual definitions
      const defs = m.PALACES.map(palace =>
        m.get_palace_definition(palace)
      );
      return scan_definitions(
        ['palace', 'index', 'direction', 'number'],
        defs
      );
    },
  },
  {
    file: 'sexagen/sexagen.js',
    scan: () => {
      const m = require(
        path.join(
          __dirname,
          '..',
          'src',
          'sexagen',
          'sexagen.js'
        )
      );
      return scan_definitions(
        ['sexagen', 'stem', 'branch', 'index'],
        m.SEXAGEN_DEFINITIONS
      );
    },
  },
  {
    file: 'san_yuan/san_yuan.js',
    scan: () => {
      const m = require(
        path.join(
          __dirname,
          '..',
          'src',
          'san_yuan',
          'san_yuan.js'
        )
      );
      return scan_definitions(
        ['san_yuan', 'index'],
        m.SAN_YUAN_DEFINITIONS
      );
    },
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const main = () => {
  const sections = [];

  for (const mod of modules) {
    const { headers, rows } = mod.scan();
    const widths = compute_widths(rows, headers);

    // Build rows with padded key column, including header row
    const keyedRows = [
      headers.map((h, i) => h.padEnd(widths[i])),
      ...rows.map(row => [
        row[0].padEnd(widths[0]),
        ...row
          .slice(1)
          .map((v, i) =>
            String(v ?? '').padEnd(widths[i + 1])
          ),
      ]),
    ];

    const table = render_table(keyedRows, widths);
    sections.push(`Module: ${mod.file}\n${table}`);
  }

  console.log(sections.join('\n\n'));
};

main();
