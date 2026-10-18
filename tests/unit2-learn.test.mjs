import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {unit2Objects,unit2Expressions,newUnit2State,updateUnit2State,renderUnit2Learn} from '../unit2-learn.mjs';
import {parseRoute} from '../catalogue.mjs';
const root=new URL('../',import.meta.url);
const button=(action,label,cls='',extra='')=>`<button data-action="${action}" class="${cls}" ${extra}>${label}</button>`;
const L=(en,es)=>`<span lang="en">${en}</span><span lang="es">${es}</span>`;
const T=(en)=>en;
const E=x=>x;
const render=(state=newUnit2State())=>renderUnit2Learn({L,T,E,button,state:{...state,mode:'bi'}});
test('all 20 object and 7 expression recordings match their approved inventory rows and are nonempty MP3s',async()=>{
 const manifest=await readFile(new URL('docs/unit2/audio-inventory.csv',root),'utf8');
 assert.equal(unit2Objects.length,20);assert.equal(unit2Expressions.length,7);
 for(const [items,type,label] of [[unit2Objects,'OBJ',o=>o.name],[unit2Expressions,'EXP',o=>o.text]])for(const item of items){
  const filename=item.audio.split('/').at(-1);
  assert.equal(filename,`1Y_U02_AUD_${type}_${String(item.number).padStart(2,'0')}_v1.mp3`);
  assert(manifest.includes(`${filename},${type},${label(item)},`),`${filename}: expected inventory text`);
  assert(manifest.includes(item.audio),`${filename}: expected approved path`);
  const file=new URL(item.audio,root),info=await stat(file),bytes=await readFile(file);
  assert(info.size>1000,`${filename}: actual audio data`);
  assert(bytes.subarray(0,3).toString()==='ID3'||bytes[0]===0xff,`${filename}: MP3 signature`);
 }
});
test('every object has a distinct original icon in the packaged SVG sprite',async()=>{
 const svg=await readFile(new URL('assets/illustrations/unit2-objects.svg',root),'utf8');
 for(const id of new Set([...unit2Objects.map(o=>o.icon),'notebooks']))assert(svg.includes(`<symbol id="${id}"`),id);
 assert(!svg.includes('<image'));assert(!svg.includes('http://www.w3.org/1999/xlink" href="http'));
});
test('pictures, recorded phrases, articles and number scenes use the intended sources',()=>{
 const state=newUnit2State();let html=render(state);
 assert(html.includes('un lápiz')&&html.includes('una goma')&&html.includes('un cuaderno'));
 assert(!html.includes('speechSynthesis'));
 updateUnit2State(state,'u2-object','pencil');html=render(state);
 assert(html.includes(`id="u2-object-audio" controls preload="none" src="${unit2Objects[0].audio}"`));
 updateUnit2State(state,'u2-group','tools');updateUnit2State(state,'u2-object','scissors');html=render(state);
 assert(html.includes('unas tijeras')&&html.includes(unit2Objects[10].audio));
 updateUnit2State(state,'u2-phrase','plural');html=render(state);
 assert(html.includes(unit2Expressions[3].audio));assert(html.includes('unos cuadernos'));
 updateUnit2State(state,'u2-quantity','2');html=render(state);
 assert(html.includes('Hay dos libros.'));assert(!html.includes('Hay dos libros.</strong><p></p><audio'));
 updateUnit2State(state,'u2-quantity','3');html=render(state);
 assert(html.includes('Hay tres libros.'));assert(html.includes(unit2Expressions[5].audio));
 updateUnit2State(state,'u2-check','notebook');html=render(state);
 assert(html.includes('cuadernos means notebooks'));
});
test('only the implemented Unit 2 routes are available, without entering U1 sections',()=>{
 for(const section of ['learn','overview'])assert.equal(parseRoute(`#course/1st-year/unit/2/${section}`).unit,'2');
 for(const section of ['explore','practise','communicate','play','grammar','vocabulary','listening'])assert.deepEqual(parseRoute(`#course/1st-year/unit/2/${section}`),{kind:'course',course:'1st-year'});
});
