import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseRoute,routeHash} from '../catalogue.mjs';
import {newAula,updateAula,editAula,aulaUI} from '../el-aula.mjs';
import {findResources,resources,practiceRounds,grade,game,coreObjects,coreSubjects,extraRecordings,objectSprite} from '../data/el-aula.mjs';
import {unit2Objects,unit2Expressions} from '../unit2-learn.mjs';
import {schoolDays,weekExpressions} from '../unit2-week-data.mjs';
import {journeyModes,journeyQuestion,journeyNegative,journeyWalking} from '../unit2-journey-data.mjs';

test('five library entries and three new activities have stable routes; bilingual search combines filters',()=>{
 for(const id of ['library',...resources.map(r=>'library/'+r.id),...['practise','communicate','play'].map(s=>'course/1st-year/unit/2/'+s)])assert.equal(routeHash(parseRoute('#'+id)),id);
 assert.deepEqual(findResources('lapiz').map(r=>r.id),['objects']);
 assert.deepEqual(findResources('school timetable','vocabulary','1st-year').map(r=>r.id),['school-week']);
 assert.deepEqual(findResources('gustan','grammar').map(r=>r.id),['gustar']);
 assert.equal(findResources('gustan','vocabulary').length,0);
 assert.equal(findResources('','grammar').length,2);
 assert.equal(findResources('','','2nd-year').length,0);
});

test('every activity and resource exercise accepts its intended answers and offers a reason and hint',()=>{
 const groups=[...practiceRounds,...resources];
 assert.equal(practiceRounds.length,4);
 assert.equal(resources.length,5);
 const ids=new Set();
 for(const group of groups)for(const item of group.items){
  assert(!ids.has(item.id));ids.add(item.id);
  assert.equal(item.hint.length,2);assert.equal(item.why.length,2);
  assert.equal(grade(item,''),'empty');
  assert.equal(grade(item,'incompatible'),'retry');
  for(const answer of item.answers){
   assert.equal(grade(item,'  '+answer.toUpperCase()+'  '),'correct');
   if(item.options)assert(item.options.includes(answer));
  }
  if(item.options)for(const wrong of item.options.filter(x=>!item.answers.includes(x)))assert.equal(grade(item,wrong),'retry');
 }
 const maths=practiceRounds[1].items[2];
 assert.equal(grade(maths,'matematicas'),'accent');
});

test('activity state stays independent of library answers, application notes and game',()=>{
 const s=newAula();
 assert.equal(s.pair,'solo');
 assert.equal(editAula(s,'communicate',undefined,'aula-draft','El lunes: inglés.'),true);
 updateAula(s,'communicate',undefined,'pair','B');
 assert.equal(updateAula(s,'communicate',undefined,'finish-card'),'aula-card-preview');
 updateAula(s,'practise',undefined,'round','1');
 updateAula(s,'practise',undefined,'next');
 updateAula(s,'practise',undefined,'answer','español');
 updateAula(s,'practise',undefined,'check');
 updateAula(s,'library','gustar','answer','Me gustan las ciencias.');
 updateAula(s,'library','gustar','check');
 editAula(s,'library','gustar','aula-note','Me gusta la música.');
 assert.equal(s.steps.week,1);assert.equal(s.feedback['p-week-b'],'correct');
 assert.equal(s.feedback['r-gus-a'],'correct');assert.equal(s.answers['p-week-b'],'español');
 assert.equal(s.draft,'El lunes: inglés.');assert.equal(s.notes.gustar,'Me gusta la música.');
 for(const first of ['add','swap'])for(const second of ['walk','car']){
  updateAula(s,'play',undefined,'replay');
  updateAula(s,'play',undefined,'pick','keep');
  assert.equal(updateAula(s,'play',undefined,'continue'),null);
  updateAula(s,'play',undefined,'pick',first);
  updateAula(s,'play',undefined,'continue');
  updateAula(s,'play',undefined,'pick','bus');assert.equal(updateAula(s,'play',undefined,'continue'),null);
  updateAula(s,'play',undefined,'pick',second);
  updateAula(s,'play',undefined,'continue');
  assert.equal(s.game.step,game.length);
 }
});

test('new media references point to existing approved captions and existing SVG symbols',async()=>{
 const approved=new Map([...unit2Objects,...unit2Expressions,...coreSubjects,...weekExpressions,...schoolDays].map(x=>[x.audio,x.recorded??x.text??x.name]));
 for(const x of journeyModes){approved.set(x.segmentAudio,x.words);if(x.fullAudio)approved.set(x.fullAudio,x.phrase);}
 for(const x of [journeyQuestion,journeyNegative,journeyWalking])approved.set(x.audio,x.text);
 const files=[...practiceRounds,...resources].flatMap(r=>r.items.flatMap(i=>i.audio?[i.audio]:[]));
 files.push(...Object.values(extraRecordings),...coreObjects.map(o=>({src:o.audio,text:o.name})),...[...coreSubjects,...schoolDays].map(x=>({src:x.audio,text:x.recorded??x.name})),...journeyModes.map(x=>({src:x.segmentAudio,text:x.words})));
 for(const audio of files){
  assert.equal(approved.get(audio.src),audio.text);
  const bytes=await readFile(new URL('../'+audio.src,import.meta.url));assert(bytes.length>100);
 }
 const sprite=await readFile(new URL('../'+objectSprite,import.meta.url),'utf8');
 for(const icon of new Set([...coreObjects.map(o=>o.icon),...resources.flatMap(r=>r.items.flatMap(i=>i.image?[i.image]:[]))]))assert(sprite.includes(`id="${icon}"`));
});

test('all new views and resources render in three modes with all standalone teaching and review sections',()=>{
 for(const mode of ['en','bi','es']){
  const s=newAula(),T=(en,es)=>mode==='es'?es:mode==='en'?en:`${en} / ${es}`;
  const L=(en,es)=>T(en,es),E=String,button=(action,copy,cls,other)=>`<button data-action="${action}" class="${cls}" ${other}>${copy}</button>`;
  const ui=aulaUI({L,T,E,button,state:s});
  for(const view of ['practise','communicate','play'])assert(ui.view(view).includes('<h1>'));
  for(const r of resources){
   const html=ui.library(r.id,'');
   assert(html.includes(T(...r.title)));assert(html.includes(T(...r.lesson[0])));
   assert(html.includes(T(...r.items[0].prompt)));assert(html.includes(T(...r.review)));
   assert(html.includes(T(...r.apply)));
  }
  const html=ui.library(undefined,'');assert(html.includes('aula-search'));assert(!html.includes('undefined'));
 }
});
