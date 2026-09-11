const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const postcss = require('postcss');

const source = fs.readFileSync('src/components/layout/theme-toggle.tsx', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
const layout = fs.readFileSync('src/app/[locale]/layout.tsx', 'utf8');
const bootstrap = layout.match(/__html:\s*`([^`]+)`/)[1];

function fixture(saved = null, blocked = false) {
  const values = new Map(saved === null ? [] : [['departify-theme', saved]]);
  const events = new EventTarget();
  const document = { documentElement: { dataset: { theme: 'dark' } } };
  const localStorage = { getItem: key => { if (blocked) throw Error('Storage blocked'); return values.get(key) ?? null; }, setItem: (key,value) => { if (blocked) throw Error('Storage blocked'); values.set(key,value); } };
  let subscribe;
  const context = vm.createContext({ exports: {}, Event, window: events, document, localStorage, require: name => name === 'react' ? { ...require('react'), useSyncExternalStore: (fn,get) => { subscribe=fn; return get(); } } : require(name) });
  vm.runInContext(bootstrap, context);
  vm.runInContext(compiled, context);
  const render = () => context.exports.ThemeToggle({locale:'es'}).props.children;
  return { render, values, events, document, getSubscribe: () => subscribe };
}

test('default dark; switching themes updates document, persistence and accessible state', () => {
  const f=fixture(); let buttons=f.render();
  assert.equal(buttons[1].props['aria-pressed'],true);
  buttons[1].props.onClick();
  assert.equal(f.document.documentElement.dataset.theme,'dark');
  assert.equal(f.values.get('departify-theme'),'dark');
  buttons=f.render(); assert.equal(buttons[1].props['aria-pressed'],true);
  assert.equal(buttons[1].props['aria-label'],'Modo oscuro');
  buttons[0].props.onClick(); assert.equal(f.values.get('departify-theme'),'light');
});
test('saved dark mode is applied before hydration and survives a new page', () => {
  const f=fixture('dark'); assert.equal(f.document.documentElement.dataset.theme,'dark');
  assert.equal(f.render()[1].props['aria-pressed'],true);
});
test('invalid stored preference falls back to dark', () => {
  assert.equal(fixture('untrusted-value').document.documentElement.dataset.theme,'dark');
});
test('theme remains usable when browser storage is blocked', () => {
  const f=fixture(null,true); f.render()[1].props.onClick();
  assert.equal(f.document.documentElement.dataset.theme,'dark');
});
test('other tabs synchronize the chosen theme and listeners are cleaned up', () => {
  const f=fixture(); f.render(); let updates=0;
  const cleanup=f.getSubscribe()(() => updates++);
  const event=new Event('storage'); event.key='departify-theme'; event.newValue='dark';
  f.events.dispatchEvent(event); assert.equal(updates,1);
  assert.equal(f.document.documentElement.dataset.theme,'dark');
  cleanup(); f.events.dispatchEvent(event); assert.equal(updates,1);
});

function luminance(hex) {
  const values=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return values[0]*.2126+values[1]*.7152+values[2]*.0722;
}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
test('both themes provide AA body-text contrast across shared surfaces', () => {
  const root=postcss.parse(fs.readFileSync('src/styles/site-theme.css','utf8'));
  for(const selector of ['html[data-site="marketing"]','html[data-site="marketing"][data-theme="dark"]']) {
    const tokens={};root.walkRules(rule=>{if(rule.selector===selector)rule.walkDecls(d=>tokens[d.prop]=d.value);});
    for(const ink of ['--foreground','--muted','--muted-foreground'])for(const surface of ['--background','--background-elevated','--surface','--surface-soft']) {
      const ratio=contrast(tokens[ink],tokens[surface]); assert.ok(ratio>=4.5,`${selector} ${ink}/${surface}: ${ratio.toFixed(2)}`);
    }
  }
});
