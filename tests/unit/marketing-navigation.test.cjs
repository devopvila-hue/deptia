const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const React=require('react');
const path=require('node:path');

function harness(file,exportName,props){
 const values=[],deps=[],effects=[];let cursor=0;
 const react={...React,useState(initial){const id=cursor++;if(!(id in values))values[id]=initial;return[values[id],value=>values[id]=typeof value==='function'?value(values[id]):value];},useRef(initial){const id=cursor++;return values[id]??(values[id]={current:initial});},useId(){return 'test-disclosure';},useEffect(fn,next){const id=cursor++;if(!deps[id]||next.some((v,i)=>v!==deps[id][i])){deps[id]=next;effects.push(fn);}}};
 const listeners=new Map();
 const document={activeElement:null,addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:name=>listeners.delete(name)};
 const cache=new Map();
 function load(filename){filename=path.resolve(filename);if(cache.has(filename))return cache.get(filename);const source=fs.readFileSync(filename,'utf8');const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;const exports={};cache.set(filename,exports);const requireLocal=name=>{if(name==='react')return react;if(name==='next/navigation')return{usePathname:()=>'/'};if(name==='next/link')return{default:'a',__esModule:true};if(name==='next/image')return{default:'img',__esModule:true};if(name.includes('mission-demo'))return{MissionDemo:()=>null};if(name.startsWith('@/')||name.startsWith('.')){let f=name.startsWith('@/')?path.resolve('src',name.slice(2)):path.resolve(path.dirname(filename),name);return load(fs.existsSync(f+'.tsx')?f+'.tsx':f+'.ts');}return require(name);};vm.runInNewContext(js,{exports,require:requireLocal,document,setTimeout,clearTimeout});return exports;}
 const component=load(file)[exportName];
 function render(){cursor=0;const tree=component(props);while(effects.length)effects.shift()();return tree;}
 return{render,document,listeners};
}
function nodes(tree,predicate){if(!tree||typeof tree!=='object')return[];if(Array.isArray(tree))return tree.flatMap(x=>nodes(x,predicate));return [...(predicate(tree)?[tree]:[]),...nodes(tree.props?.children,predicate)];}
function text(tree){if(typeof tree==='string'||typeof tree==='number')return String(tree);if(!tree||typeof tree!=='object')return'';if(Array.isArray(tree))return tree.map(text).join(' ');return text(tree.props?.children);}

test('mega menu opens on click, includes seven department destinations and closes on Escape',()=>{
 const h=harness('src/components/layout/departments-dropdown.tsx','DepartmentsDropdown',{locale:'es'});let tree=h.render();let trigger=nodes(tree,n=>n.type==='button')[0];
 assert.equal(trigger.props['aria-expanded'],false);trigger.props.onClick();tree=h.render();trigger=nodes(tree,n=>n.type==='button')[0];assert.equal(trigger.props['aria-expanded'],true);
 const panel=nodes(tree,n=>n.props?.className==='site-mega-panel')[0];assert.equal(panel.props.hidden,false);
 assert.equal(nodes(panel,n=>String(n.props?.className||'').startsWith('site-mega-item')).length,7);
 assert.ok(text(panel).includes('INCLUIDA'));
 tree.props.onKeyDown({key:'Escape',preventDefault(){},stopPropagation(){}});assert.equal(nodes(h.render(),n=>n.type==='button')[0].props['aria-expanded'],false);
});
test('mobile department selection closes both the disclosure and parent navigation',()=>{
 let navigated=0;const h=harness('src/components/layout/departments-dropdown.tsx','DepartmentsDropdown',{locale:'en',mobile:true,onNavigate:()=>navigated++});let tree=h.render();nodes(tree,n=>n.type==='button')[0].props.onClick();tree=h.render();
 const item=nodes(tree,n=>n.props?.className==='site-mega-item')[0];assert.ok(item.props.href.startsWith('/en/departamentos/'));item.props.onClick();assert.equal(navigated,1);assert.equal(nodes(h.render(),n=>n.type==='button')[0].props['aria-expanded'],false);
});
test('how-it-works steps update the explanation and return to the first step',()=>{
 const h=harness('src/components/marketing/premium/how-page.tsx','HowPage',{locale:'es'});let tree=h.render();assert.ok(text(tree).includes('Tu empresa, entendida.'));
 let pickers=nodes(tree,n=>n.type==='button'&&n.props['aria-controls']==='how-step-detail');assert.equal(pickers.length,4);pickers[2].props.onClick();tree=h.render();assert.ok(text(tree).includes('Tu visto bueno cuenta.'));
 let next=nodes(tree,n=>n.type==='button'&&n.props.className==='p-text-link')[0];next.props.onClick();tree=h.render();assert.ok(text(tree).includes('La siguiente misión parte de aquí.'));next=nodes(tree,n=>n.type==='button'&&n.props.className==='p-text-link')[0];next.props.onClick();assert.ok(text(h.render()).includes('Tu empresa, entendida.'));
});
