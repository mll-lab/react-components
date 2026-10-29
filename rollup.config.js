import path from 'path';

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// eslint-disable-next-line import/extensions
import pkg from './package.json';

const {
  BASE,
  hasStyleEntry,
  styleClosure,
} = require('./scripts/antd-styles.cjs');

const stylesDir = path.resolve('styles');
const dependencyNames = Object.keys(pkg.dependencies);

const isDependency = (id) =>
  /^@babel\/runtime|^rc-picker/.test(id) ||
  dependencyNames.some((name) => id === name || id.startsWith(`${name}/`));

// Imports the stylesheets of the antd components a module uses, so that bundlers only ship those
const antdStyleImports = () => ({
  name: 'antd-style-imports',
  resolveId(source) {
    return source.startsWith(stylesDir) ? { id: source, external: true } : null;
  },
  renderChunk(code, chunk) {
    const toStyles = path.posix.relative(
      path.posix.dirname(chunk.fileName),
      '../styles',
    );
    return {
      code: code.split(`${stylesDir}/`).join(`${toStyles}/`),
      map: null,
    };
  },
  transform(code, id) {
    if (id.includes('node_modules')) return null;
    const used = new Set(
      [...code.matchAll(/from ['"]antd\/(?:es|lib)\/([a-z-]+)/g)]
        .map((match) => match[1])
        .filter(hasStyleEntry),
    );
    if (used.size === 0) return null;
    const stylesheets = new Set([BASE]);
    used.forEach((name) =>
      styleClosure(name).forEach((s) => stylesheets.add(s)),
    );
    const imports = [...stylesheets].map(
      (s) => `import '${stylesDir}/${s}.css';`,
    );
    return { code: `${imports.join('\n')}\n${code}`, map: null };
  },
});

const toEs = (id) => id.replace(/^antd\/lib\//, 'antd/es/');
const toLib = (id) => id.replace(/^antd\/es\//, 'antd/lib/');

const output = {
  preserveModules: true,
  preserveModulesRoot: 'src',
  sourcemap: true,
  assetFileNames: '[name][extname]',
};

export default {
  input: 'src/index.ts',

  output: [
    {
      ...output,
      dir: 'cjs',
      format: 'cjs',
      // https://rollupjs.org/configuration-options/#output-interop
      // Necessary in order for jest in consumers to work
      interop: 'auto',
      exports: 'named',
      paths: toLib,
    },
    {
      ...output,
      dir: 'esm',
      format: 'esm',
      paths: toEs,
    },
  ],

  external: isDependency,

  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      exclude: '**/*.(test|stories).(ts|tsx)',
    }),
    // The TS plugin leaves `import { X } from 'antd'` alone, this maps it to `antd/es/x`
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
      include: 'src/**',
      babelrc: false,
      configFile: false,
      plugins: [
        [
          'import',
          { libraryName: 'antd', libraryDirectory: 'es', style: false },
        ],
      ],
    }),
    babel({
      // https://www.npmjs.com/package/@rollup/plugin-babel#babelhelpers
      babelHelpers: 'runtime',
    }),
    antdStyleImports(),
  ],
};
