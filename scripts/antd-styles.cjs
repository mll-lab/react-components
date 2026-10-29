const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const antdEs = path.join(root, 'node_modules/antd/es');

const BASE = 'base';

function hasStylesheet(component) {
  return fs.existsSync(path.join(antdEs, component, 'style/index.less'));
}

function componentsWithStyles() {
  return fs.readdirSync(antdEs).filter(hasStylesheet);
}

function hasStyleEntry(component) {
  return fs.existsSync(path.join(antdEs, component, 'style/index.js'));
}

function directDependencies(component) {
  const source = fs.readFileSync(
    path.join(antdEs, component, 'style/index.js'),
    'utf8',
  );
  return [...source.matchAll(/^import '\.\.\/\.\.\/([a-z-]+)\/style';/gm)].map(
    (match) => match[1],
  );
}

/** Dependencies first, so that the cascade matches the order of the full stylesheet. */
function styleClosure(component) {
  const ordered = [];
  const visited = new Set();
  const visit = (name) => {
    if (visited.has(name) || !hasStyleEntry(name)) return;
    visited.add(name);
    directDependencies(name).forEach(visit);
    if (hasStylesheet(name)) ordered.push(name);
  };
  visit(component);
  return [BASE, ...ordered];
}

function lessEntry(name) {
  const target =
    name === BASE
      ? 'antd/es/style/index.less'
      : `antd/es/${name}/style/index.less`;
  return [
    "@import 'antd/es/style/themes/compact.less';",
    `@import (multiple) '${path.join(root, 'src/antd-variables.less')}';`,
    `@import '${path.join(root, 'node_modules', target)}';`,
    `@import (multiple) '${path.join(root, 'src/antd-variables.less')}';`,
  ].join('\n');
}

async function buildStyles(outDir) {
  const less = require('less');
  const postcss = require('postcss');
  const cssnano = require('cssnano');
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const sizes = {};
  for (const name of [BASE, ...componentsWithStyles()]) {
    const { css } = await less.render(lessEntry(name), {
      javascriptEnabled: true,
      filename: path.join(root, 'src', `${name}.less`),
      paths: [path.join(root, 'node_modules')],
      plugins: [],
    });
    const minified = await postcss([cssnano({ preset: 'default' })]).process(
      css,
      { from: undefined },
    );
    fs.writeFileSync(path.join(outDir, `${name}.css`), minified.css);
    sizes[name] = minified.css.length;
  }
  return sizes;
}

module.exports = {
  BASE,
  componentsWithStyles,
  hasStyleEntry,
  styleClosure,
  buildStyles,
};

if (require.main === module) {
  buildStyles(path.join(root, 'styles')).then((sizes) => {
    const total = Object.values(sizes).reduce((a, b) => a + b, 0);
    console.log(
      `built ${Object.keys(sizes).length} stylesheets, ${total} bytes`,
    );
  });
}
