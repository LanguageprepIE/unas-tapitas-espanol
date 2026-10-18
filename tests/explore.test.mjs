import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {newExploreState,updateExplore,renderExplore,greetingScene,personScene,conversationScene,pendingAudio,readyAudio,numberWords,soundWords} from '../explore.mjs';

const h={T:(en)=>en,L:(en)=>en,pair:(x)=>x[0],E:(s)=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;'),button:(action,label,cls='',extra='')=>`<button data-action="${action}" class="${cls}" ${extra}>${label}</button>`};
test('each laboratory renders distinct controls in the original Explore route',()=>{
 const s=newExploreState();const controls={greetings:'ex-time',sounds:'ex-select-sound',numbers:'ex-number',person:'ex-person-kind',conversation:'ex-turn',world:'ex-country'};
 for(const [lab,action] of Object.entries(controls)){updateExplore(s,'ex-lab',lab);const html=renderExplore(s,h);assert(html.includes(action),lab);assert(html.includes('ex-nav'),lab);assert(!html.includes('undefined'),lab);assert(!html.includes('<audio'),`unverified audio in ${lab}`);}
});
test('greeting variables change the encounter without declaring a single correct answer',()=>{
 const s=newExploreState();assert.equal(greetingScene(s).greeting,'Hola');updateExplore(s,'ex-other','adult');assert.equal(greetingScene(s).greeting,'Buenos días');updateExplore(s,'ex-time','night');assert.equal(greetingScene(s).greeting,'Buenas noches');assert.equal(greetingScene(s).departure,'Hasta mañana');
});
test('letter comparison changes with the pattern and never links an unrelated recording',()=>{
 const s=newExploreState();s.lab='sounds';updateExplore(s,'ex-compare','jamón');assert.equal(s.compare,'jamón');updateExplore(s,'ex-select-sound','Ñ');assert.equal(s.compare,'');updateExplore(s,'ex-compare','jamón');assert.equal(s.compare,'');updateExplore(s,'ex-compare','niño');assert(renderExplore(s,h).includes('canyon'));
});
test('number machine covers every value, including zero and twenty',()=>{
 const s=newExploreState();s.lab='numbers';assert.equal(numberWords.length,21);for(let n=0;n<=20;n++){updateExplore(s,'ex-pick-number',String(n));assert.equal(s.number,n);const html=renderExplore(s,h);assert(html.includes(numberWords[n]));assert.equal((html.match(/class="ex-dot"/g)||[]).length,n);}updateExplore(s,'ex-number','16');assert.equal(s.number,16);
});
test('person changes the short phrase while retaining its detail',()=>{
 const s=newExploreState();s.personKind='age';s.personDetail='trece';assert.equal(personScene(s).sentence,'Tengo trece años.');updateExplore(s,'ex-person','tu');assert.equal(personScene(s).sentence,'Tienes trece años.');updateExplore(s,'ex-person','alba');assert.equal(personScene(s).sentence,'Alba tiene trece años.');updateExplore(s,'ex-person-kind','name');assert.equal(personScene(s).sentence,'Alba se llama Alba.');
});
test('conversation turns move and full answer responds to a change of question',()=>{
 const s=newExploreState();updateExplore(s,'ex-turn','answer:up');assert.deepEqual(s.turns,['greeting','answer','question','goodbye']);assert(conversationScene(s).tip[0].includes('immediately after'));updateExplore(s,'ex-turn','answer:down');updateExplore(s,'ex-question','age');assert.equal(conversationScene(s).text.answer,'Tengo trece años.');assert(conversationScene(s).tip[0].includes('now sit together'));
});
test('country comparison includes context and disallows unexpected keys',()=>{
 const s=newExploreState();s.lab='world';updateExplore(s,'ex-country','argentina');updateExplore(s,'ex-compare-country','spain');const html=renderExplore(s,h);assert(html.includes('Buenos Aires')&&html.includes('Madrid'));updateExplore(s,'ex-country','not-a-place');assert.equal(s.country,'argentina');
});
test('only verified packaged audio can enter the ready registry',async()=>{
 assert.equal(pendingAudio.sounds.length,soundWords.length);assert.equal(pendingAudio.numbers.length,21);
 for(const group of ['sounds','numbers'])for(const [key,path] of Object.entries(readyAudio[group])){
  const planned=pendingAudio[group].find(x=>String(x.word===undefined?x.number:x.word)===String(key));assert.equal(path,planned?.expected);
  const bytes=await readFile(new URL('../'+path,import.meta.url));assert(bytes.length>1000&&bytes[0]===0x49&&bytes[1]===0x44&&bytes[2]===0x33,`${key} must be a real ID3 MP3`);
 }
});
