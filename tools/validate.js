// 모션 데이터 형식 검사. 사용법: node tools/validate.js motions/*.js
// 통과하면 마지막 줄에 "OK - N items total"을 출력하고 종료 코드 0을 반환합니다.
const fs = require('fs');
const vm = require('vm');

const CATS = ['bg', 'text', 'scroll', 'hover', 'cursor', 'loading', 'enter', 'depth', 'shape'];
const TRIGGERS = ['auto', 'hover', 'click', 'mouse', 'scroll', 'load'];
const REQ = ['no', 'id', 'cat', 'name', 'en', 'level', 'trigger', 'timing', 'desc', 'use', 'tech', 'terms', 'prompt', 'html', 'css', 'js'];

const sandbox = { window: { MOTIONS: [] } };
vm.createContext(sandbox);
let ok = true;
const err = (...a) => { ok = false; console.error('ERROR', ...a); };
const warn = (...a) => console.warn('WARN ', ...a);

for (const f of process.argv.slice(2)) {
  const before = sandbox.window.MOTIONS.length;
  try {
    vm.runInContext(fs.readFileSync(f, 'utf8'), sandbox, { filename: f });
  } catch (e) {
    err('parse', f, e.message);
    continue;
  }
  console.log(f.split('/').pop(), 'items:', sandbox.window.MOTIONS.length - before);
}

const ids = new Set();
const nos = new Set();
for (const m of sandbox.window.MOTIONS) {
  const where = '#' + m.no + ' ' + m.id;
  for (const k of REQ) if (m[k] === undefined || m[k] === null) err(where, 'missing field', k);
  if (!CATS.includes(m.cat)) err(where, 'bad cat', m.cat);
  if (!TRIGGERS.includes(m.trigger)) err(where, 'bad trigger', m.trigger);
  if (![1, 2, 3].includes(m.level)) err(where, 'bad level', m.level);
  if (ids.has(m.id)) err(where, 'duplicate id');
  if (nos.has(m.no)) err(where, 'duplicate no');
  ids.add(m.id); nos.add(m.no);
  if (!Array.isArray(m.tech) || !m.tech.length) err(where, 'tech must be non-empty array');
  if (!Array.isArray(m.terms) || m.terms.length < 2) err(where, 'terms must have 2+ entries');
  if (typeof m.js === 'string' && m.js.trim()) {
    try { new Function(m.js); } catch (e) { err(where, 'JS syntax:', e.message); }
  }
  const code = (m.html || '') + (m.css || '') + (m.js || '');
  if (/<\/script/i.test(code)) err(where, 'contains </script');
  const urls = code.replace(/http:\/\/www\.w3\.org\/(2000\/svg|1999\/xlink)/g, '').match(/https?:\/\/\S+/g);
  if (urls) err(where, 'external URL', urls.join(' '));
  if (/console\.log|alert\(|localStorage|fetch\(/.test(m.js || '')) err(where, 'forbidden API in js');
  if (typeof m.prompt === 'string' && m.prompt.length < 160) warn(where, 'prompt looks short (' + m.prompt.length + ' chars)');
  if (typeof m.timing === 'string' && m.timing.length > 40) warn(where, 'timing label long');
  if ((m.trigger === 'hover') && !/is-hover/.test(code)) warn(where, 'hover demo without .is-hover autopilot');
}

console.log(ok ? 'OK' : 'FAILED', '-', sandbox.window.MOTIONS.length, 'items total');
process.exit(ok ? 0 : 1);
