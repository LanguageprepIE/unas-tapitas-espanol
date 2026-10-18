import test from 'node:test';
import assert from 'node:assert/strict';
import {cultureCapsules} from '../data/culture.mjs';
import {newCultureState,updateCulture,renderCulture} from '../culture.mjs';

const h={T:(en)=>en,L:(en)=>en,pair:(x)=>x[0],E:(s)=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;'),button:(action,label,cls='',extra='')=>`<button data-action="${action}" class="${cls}" ${extra}>${label}</button>`};
test('catalogue offers three original Unit 1 capsules and leaves the four steps optional',()=>{
 assert.equal(cultureCapsules.length,3);assert(cultureCapsules.every(x=>x.year===1&&x.unit===1&&x.reflection.length===2));
 const html=renderCulture(newCultureState(),h);assert(html.includes('culture-capsule'));assert(html.includes('Where is Spanish spoken?'));
});
test('place, name and greeting experiments update their own display',()=>{
 const s=newCultureState();updateCulture(s,'culture-place','guinea');assert(renderCulture(s,h).includes('Guinea Ecuatorial'));
 updateCulture(s,'culture-capsule','two-surnames');updateCulture(s,'culture-name','ines');assert(renderCulture(s,h).includes('Ruiz')&&renderCulture(s,h).includes('Soto'));
 updateCulture(s,'culture-capsule','greetings');updateCulture(s,'culture-greeting','shop');assert(renderCulture(s,h).includes('¡Buenas tardes!'));
 assert.equal(updateCulture(s,'culture-capsule','not-a-capsule'),false);assert.equal(s.capsule,'greetings');
});
