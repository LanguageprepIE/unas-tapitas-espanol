import {findResources,libraryEntries,unit1References} from '../data/library.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseRoute,routeHash} from '../catalogue.mjs';
import {newAula,updateAula,editAula,aulaUI} from '../el-aula.mjs';
import {resources,practiceRounds,grade,game,coreObjects,coreSubjects,extraRecordings,objectSprite} from '../data/el-aula.mjs';
import {unit2Objects,unit2Expressions} from '../unit2-learn.mjs';
import {schoolDays,weekExpressions} from '../unit2-week-data.mjs';
import {journeyModes,journeyQuestion,journeyNegative,journeyWalking} from '../unit2-journey-data.mjs';

test('five library entries and three new activities have stable routes; bilingual search combines filters',()=>{
 for(const id of ['library',...resources.map(r=>'library/'+r.id),...['practise','communicate','play'].map(s=>'course/1st-year/unit/2/'+s)])assert.equal(routeHash(parseRoute('#'+id)),id);
 assert.deepEqual(findResources('lapiz').map(r=>r.id),['objects']);
 assert.deepEqual(findResources('school timetable','vocabulary','1st-year').map(r=>r.id),['school-week']);
 assert.deepEqual(findResources('gustan','grammar').map(r=>r.id),['gustar']);
 assert.equal(findResources('gustan','vocabulary').length,0);
 assert.equal(findResources('','grammar').length,6);
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
  assert.equal(s.game.step,2);
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
  const ui=render(s,mode);
  for(const view of ['practise','communicate','play'])assert(ui.view(view).includes('<h1>'));
  for(const r of resources){
   const html=ui.library(r.id,'');
   assert(html.includes(T(...r.title)));assert(visible(html).includes(T(...r.lesson[0]).replaceAll('**','')));
   assert(html.includes(T(...r.items[0].prompt)));assert(visible(html).includes(T(...r.review).replaceAll('**','')));
   assert(visible(html).includes(T(...r.apply).replaceAll('**','')));
  }
  const html=ui.library(undefined,'');assert(html.includes('aula-search'));assert(!html.includes('undefined'));
 }
});


const visible=html=>html.replace(/<[^>]+>/g,'');
function render(state,mode){
 const T=(en,es)=>mode==='es'?es:mode==='en'?en:`${en} / ${es}`;
 const L=(en,es)=>T(en,es),E=String;
 const button=(action,copy,cls,other)=>`<button data-action="${action}" class="${cls}" ${other??''}>${copy}</button>`;
 return aulaUI({L,T,E,button,mode,state});
}

test('comprehension presents one Spanish stimulus before checking, with no answer-bearing English translation',()=>{
 const reading=[
  [1,0,'A las 09:00 tengo inglés.',/09:00|English|Monday/i],
  [1,1,'El martes, ¿qué clase hay a las 10:00?',/10:00|Tuesday|second|Spanish/i],
  [1,2,'El lunes, ¿qué clase hay a las 10:00?',/10:00|Monday|Mathematics/i],
  [3,2,'Noa: «Voy en tren».',/train|bus/i]
 ];
 for(const mode of ['en','bi','es']){
  const s=newAula(),ui=render(s,mode);
  for(const [round,step,source,translation] of reading){
   s.round=round;s.steps[practiceRounds[round].id]=step;
   const html=ui.view('practise');
   const stem=html.match(/<h3 id="aula-question".*?<\/h3>/)[0];
   assert.doesNotMatch(stem,translation);
   assert.equal(html.split(source).length,2);
   assert(html.includes(`<p class="spanish"><span lang="es">${source}</span></p>`));
   assert.match(html,/id="aula-feedback" tabindex="-1" hidden/);
  }
  for(const [round,step] of [[0,0],[2,1],[3,0]]){
   s.round=round;s.steps[practiceRounds[round].id]=step;
   const html=ui.view('practise');
   assert.match(html,/<audio controls .*?<details[^>]*><summary/);
   assert.doesNotMatch(html,/<details[^>]*data-aula-details="text-[^"]+" open/);
  }
 }
});

test('examples and correction use Spanish language markup and deliberate bold in English and Bilingual',()=>{
 for(const mode of ['en','bi','es']){
  const s=newAula(),ui=render(s,mode);
  s.steps.kit=1;
  updateAula(s,'practise',undefined,'answer','una mochila');
  updateAula(s,'practise',undefined,'check');
  const html=ui.view('practise'),library=ui.library('gustar','');
  assert.doesNotMatch(html+library,/\*\*/);
  if(mode==='es'){
   assert.match(html,/<span lang="es">una mochila<\/span>/);
   assert.doesNotMatch(library,/class="key-language"/);
  }else{
   assert.match(html,/<strong lang="es">una mochila<\/strong>/);
   assert.match(html,/<strong class="key-language" lang="es">Mochila<\/strong> is feminine/);
   assert.match(library,/<strong class="key-language" lang="es">Me gusta la historia<\/strong>/);
   if(mode==='bi')assert.equal(library.split('<strong class="key-language" lang="es">Me gusta la historia</strong>').length,3);
  }
 }
});

test('four connected game decisions support every viable plan, feedback before continuing, and replay',()=>{
 assert.equal(game.length,4);
 const paths=game.reduce((xs,scene)=>xs.flatMap(path=>scene.options.filter(o=>o.ready).map(o=>[...path,o.id])),[[]]);
 assert.equal(paths.length,8);
 for(const path of paths){
  const s=newAula(),ui=render(s,'en');
  for(let i=0;i<path.length;i++){
   const scene=game[i],html=ui.view('play');
   assert.match(html,new RegExp(`Decision ${i+1} / 4`));
   if(scene.source)assert(html.includes(`<span lang="es">${scene.source}</span>`));
   if(i>0) assert(visible(html).includes(game[i-1].options.find(o=>o.id===path[i-1]).effect[0].replaceAll('**','')));
   for(const option of scene.options.filter(o=>!o.ready)){
    assert.equal(updateAula(s,'play',undefined,'pick',option.id),'aula-consequence');
    assert(!ui.view('play').includes('data-action="aula-continue"'));
    assert.equal(updateAula(s,'play',undefined,'continue'),null);
   }
   updateAula(s,'play',undefined,'pick',path[i]);
   assert(ui.view('play').includes('data-action="aula-continue"'));
   assert.equal(updateAula(s,'play',undefined,'continue'),'aula-task-title');
  }
  const final=visible(ui.view('play'));
  for(let i=0;i<path.length;i++)assert(final.includes(game[i].options.find(o=>o.id===path[i]).effect[0].replaceAll('**','')));
  updateAula(s,'play',undefined,'replay');
  assert.deepEqual(s.game,{step:0,picks:[]});
 }
});

test('agreement teaching includes all four rows and practises both rule and meaning in context',()=>{
 for(const mode of ['en','bi','es']){
  const s=newAula(),ui=render(s,mode);
  const lesson=ui.library('agreement','');
  for(const [indefinite,definite] of [['un libro','el libro'],['una mochila','la mochila'],['unos libros','los libros'],['unas mochilas','las mochilas']]){
   assert.match(lesson,new RegExp(`<td><(?:span|strong) lang="es">${indefinite}</(?:span|strong)></td><td><(?:span|strong) lang="es">${definite}</(?:span|strong)></td>`));
  }
  const r=resources.find(r=>r.id==='agreement');
  const work=[
   ['r-agr-consonant','unos rotuladores','unas rotuladores',/rotulador.*-es/],
   ['r-agr-invariant','unos sacapuntas','unos sacapuntases',/un → unos/],
   ['r-agr-context','un / el','el / un',/cuaderno de Lucía/],
   ['r-agr-material','unas','unos',/feminine plural|femenino plural/]
  ];
  for(const [id,right,wrong,explanation] of work){
   const index=r.items.findIndex(q=>q.id===id);assert(index>=0);
   s.steps['resource-agreement']=index;
   for(const [value,status] of [[wrong,'retry'],[right,'correct']]){
    if(r.items[index].options)updateAula(s,'library','agreement','answer',value);
    else editAula(s,'library','agreement','aula-reply',value);
    updateAula(s,'library','agreement','check');
    assert.equal(s.feedback[id],status);
   }
   const feedback=ui.library('agreement','').match(/id="aula-feedback".*?<\/div>/)[0];
   assert.match(visible(feedback),explanation);
  }
 }
});


test('shared index retains five full Unit 2 resources and links eight original Unit 1 resources',()=>{
 assert.equal(libraryEntries.length,15);
 assert.equal(new Set(libraryEntries.map(r=>r.id)).size,15);
 assert.equal(unit1References.length,8);
 assert.deepEqual(libraryEntries.filter(r=>resources.some(original=>original.id===r.id)),resources);
 assert.deepEqual(findResources('dieciseis','vocabulary','1st-year').map(r=>r.id),['u1-numbers']);
 assert.deepEqual(findResources('saludos help','vocabulary').map(r=>r.id),['u1-expressions']);
 assert.deepEqual(findResources('llamarse','grammar').map(r=>r.id),['u1-names']);
 assert.deepEqual(findResources('deletrear','listening').map(r=>r.id),['u1-listening-2']);
 assert.deepEqual(findResources('age','listening').map(r=>r.id),['u1-listening-1','u1-listening-2']);
});
