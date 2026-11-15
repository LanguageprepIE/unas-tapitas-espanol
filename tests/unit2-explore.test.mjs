import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {newUnit2ExploreState,updateUnit2Explore,nouns,nounFeedback,preferenceModel,preferenceView,schoolSubjects,unit2ExploreAnnouncement,timetableRows,clock,journeyResult,journeyScenarios,labNames} from '../unit2-explore-data.mjs';
import {renderUnit2Explore,attachWordModelReveal} from '../unit2-explore.mjs';
const act=(s,key,value)=>assert.equal(updateUnit2Explore(s,'u2x-'+key,value),true,key);
const render=(s,mode)=>renderUnit2Explore({state:s,L:(en,es)=>mode==='es'?es:mode==='bi'?`${en} / ${es}`:en,T:(en,es)=>mode==='es'?es:mode==='bi'?`${en} / ${es}`:en});
test('word experiments keep intentional mismatches and distinguish regular, z/ces, invariant and scissors',()=>{
 const s=newUnit2ExploreState();act(s,'count',3);assert.equal(nounFeedback(s.words).match,false);assert.equal(nounFeedback(s.words).model,'unos libros');
 act(s,'article','unos');act(s,'form','plural');assert.equal(nounFeedback(s.words).match,true);
 act(s,'object','pencil');assert.equal(nounFeedback(s.words).model,'unos lápices');
 act(s,'word-pin');act(s,'object','sharpener');assert.equal(nounFeedback(s.words).model,'unos sacapuntas');assert.equal(s.words.pinned.model,'unos lápices');
 act(s,'object','scissors');act(s,'count',1);assert.equal(nounFeedback(s.words).model,'unas tijeras');act(s,'article','unas');assert.equal(nounFeedback(s.words).match,true);
 for(const n of nouns)for(const count of [1,2,3]){const f=nounFeedback({object:n.id,count,article:'un',form:'singular'});assert(f.model&&!f.model.includes('undefined'));}
});
test('preferences keep first-person quotes with correct agreement and independent names, subjects and feelings',()=>{
 const s=newUnit2ExploreState(),p=s.preferences.people;assert.equal(preferenceModel(p[0]).text,'Me gusta la historia.');assert.equal(preferenceModel(p[1]).text,'No me gustan las matemáticas.');
 act(s,'pref-level','who');assert.equal(preferenceModel(p[0],preferenceView(s.preferences)).text,'A Alba le gusta la historia.');
 act(s,'pref-explicit');assert.equal(preferenceModel(p[0],preferenceView(s.preferences)).text,'Le gusta la historia.');
 act(s,'pref-perspective','self');act(s,'pref-explicit');assert.equal(preferenceModel(p[1],preferenceView(s.preferences)).text,'A mí no me gustan las matemáticas.');
 act(s,'pref-level','what');assert.equal(preferenceModel(p[0],preferenceView(s.preferences)).text,'Me gusta la historia.');
 assert.equal(s.preferences.perspective,'self');
 assert.equal(p[0].name,'Alba');
 act(s,'pref-subject-0','maths');assert.equal(preferenceModel(p[0]).text,'Me gustan las matemáticas.');act(s,'pref-sentiment-0','favourite');assert.equal(preferenceModel(p[0]).text,'Mi asignatura favorita es matemáticas.');
 act(s,'pref-subject-1','history');act(s,'pref-swap');assert.equal(p[0].subject,'history');assert.equal(p[1].subject,'maths');assert.equal(p[0].sentiment,'favourite');
});
test('timetable calculations preserve baseline including Friday, shift times and never overlap',()=>{
 const s=newUnit2ExploreState();assert.equal(clock(timetableRows(s.timetable.days[0]).end),'15:55');assert.equal(clock(timetableRows(s.timetable.days[4]).end),'13:15');
 act(s,'time-pin');act(s,'time-breakDuration',30);assert.equal(clock(timetableRows(s.timetable.days[0]).end),'16:10');assert.equal(clock(s.timetable.before.end),'15:55');
 act(s,'time-duration',45);act(s,'time-start',480);act(s,'time-lunchAfter',2);const r=timetableRows(s.timetable.days[0]);assert.equal(r.end,480+6*45+30+40);for(let i=1;i<r.rows.length;i++)assert.equal(r.rows[i].start,r.rows[i-1].end);
 act(s,'cell',2);const subjects=[...s.timetable.days[0].classes];act(s,'move','up');assert.equal(s.timetable.days[0].classes[1],subjects[2]);act(s,'subject','art');assert.equal(s.timetable.days[0].classes[1],'art');
 act(s,'remove');assert.equal(s.timetable.days[0].classes.length,5);act(s,'add');assert.equal(s.timetable.days[0].classes.length,6);
 act(s,'apply-week');assert.equal(s.timetable.days[4].duration,45);assert.notEqual(s.timetable.days[0].classes,s.timetable.days[1].classes);act(s,'finish');assert.equal(s.timetable.finished,true);
});
test('journeys keep a snapshot and demonstrate equal times across modes and distinct times for distant journeys',()=>{
 const s=newUnit2ExploreState();act(s,'journey-pin');act(s,'transport','bus');assert.equal(journeyResult(s.journeys).minutes,s.journeys.pinned.minutes);assert.notEqual(s.journeys.transport,s.journeys.pinned.transport);
 act(s,'distance','far');act(s,'transport','train');const far=journeyResult(s.journeys);act(s,'distance','quite-far');assert.equal(far.minutes,20);assert.equal(journeyResult(s.journeys).minutes,15);
 for(const distance of Object.keys(journeyScenarios))for(const transport of ['walk','bike','bus','car','train','scooter']){const r=journeyResult({distance,transport});assert([5,10,15,20,30].includes(r.minutes));assert(!r.text.includes('undefined'));}
});
test('invalid experiment inputs cannot change state and timetable sizes stay within usable bounds',()=>{
 const s=newUnit2ExploreState(),before=structuredClone(s);for(const [key,v] of [['object','bad'],['count','0'],['count','NaN'],['article','el'],['form','bad'],['day',5],['cell',-1],['pref-subject-0','bad'],['pref-sentiment-1','love'],['time-start',999],['time-duration',-1],['time-breakAfter',0],['distance','bad'],['transport','plane'],['move','bad'],['lab','bad']])assert.equal(updateUnit2Explore(s,'u2x-'+key,v),false,key);assert.deepEqual(s,before);
 while(updateUnit2Explore(s,'u2x-add')){}assert.equal(s.timetable.days[0].classes.length,8);while(updateUnit2Explore(s,'u2x-remove')){}assert.equal(s.timetable.days[0].classes.length,1);assert.equal(s.timetable.cell,0);assert.equal(timetableRows(s.timetable.days[0]).rows.length,1);
});
test('all four labs render in three modes and snapshots, product view and symbols are available without new audio',async()=>{
 const objects=await readFile(new URL('../assets/illustrations/unit2-objects.svg',import.meta.url),'utf8'),journeys=await readFile(new URL('../assets/illustrations/unit2-journeys.svg',import.meta.url),'utf8');
 for(const n of nouns)assert(objects.includes(`id="${n.icon}"`));for(const id of ['walk','bike','bus','car','train','scooter','school'])assert(journeys.includes(`id="${id}"`));
 for(const mode of ['en','bi','es']){const s=newUnit2ExploreState();for(const [lab] of labNames){act(s,'lab',lab);const html=render(s,mode);assert(!html.includes('undefined'));assert(html.includes('id="u2x-stage"'));assert(!html.includes('<audio'));if(mode==='es')assert(!html.includes('Change the picture'));}
 act(s,'lab','timetable');act(s,'finish');assert(render(s,mode).includes('u2x-print-sheet'));act(s,'day',4);assert(render(s,mode).includes('13:15'));}
});

test('chosen journey duration is independent, survives other changes and returns to the example on request',()=>{
 const s=newUnit2ExploreState();act(s,'lab','journeys');act(s,'journey-minutes','20');assert.equal(journeyResult(s.journeys).minutes,20);assert(journeyResult(s.journeys).text.includes('Tardo veinte minutos.'));
 act(s,'journey-pin');act(s,'transport','train');act(s,'distance','quite-far');assert.equal(journeyResult(s.journeys).minutes,20);assert.equal(s.journeys.pinned.minutes,20);
 act(s,'journey-minutes','auto');assert.equal(journeyResult(s.journeys).minutes,15);assert.equal(s.journeys.pinned.minutes,20);
 for(const invalid of ['0','7','31','NaN',''])assert.equal(updateUnit2Explore(s,'u2x-journey-minutes',invalid),false);
 for(const mode of ['en','bi','es'])assert(render(s,mode).includes('id="u2x-journey-minutes"'));
});

test('four print themes preserve the complete edited week and exclude editor controls from the sheet',()=>{
 const s=newUnit2ExploreState();act(s,'lab','timetable');act(s,'time-breakDuration','30');act(s,'subject','art');act(s,'finish');
 for(const style of ['ocean','coral','notebook','mono']){
  act(s,'print-style',style);
  for(const mode of ['en','bi','es']){const html=render(s,mode),sheet=html.slice(html.indexOf('<article class="u2x-print-sheet'),html.indexOf('</article>'));
   assert(sheet.includes('u2x-print-'+style));assert.equal((sheet.match(/class="u2x-print-day"/g)||[]).length,5);assert(sheet.includes('16:10')&&sheet.includes('13:15'));assert(sheet.includes('educación plástica'));assert(!sheet.includes('<button')&&!sheet.includes('<select'));assert(html.includes('data-action="u2x-print"'));
  }
 }
 assert.equal(updateUnit2Explore(s,'u2x-print-style','unknown'),false);act(s,'finish');assert.equal(s.timetable.days[0].classes[0],'art');assert.equal(s.timetable.printStyle,'mono');
});

test('all subject, sentiment and person combinations retain agreement, pronoun and word order',()=>{
 const cases=[
  ['self',false,'Me','No me'],
  ['self',true,'A mí me','A mí no me'],
  ['other',false,'Le','No le'],
  ['other',true,'A {name} le','A {name} no le']
 ];
 for(const subject of schoolSubjects)for(const name of ['Alba','Leo'])for(const [perspective,explicit,likes,dislikes] of cases){
  const noun=subject.article+' '+subject.name;
  const verb=/^l[ao]s$/.test(subject.article)?'gustan':'gusta';
  const p={name,subject:subject.id},opts={perspective,explicit};
  assert.equal(preferenceModel({...p,sentiment:'like'},opts).text,`${likes.replace('{name}',name)} ${verb} ${noun}.`);
  assert.equal(preferenceModel({...p,sentiment:'dislike'},opts).text,`${dislikes.replace('{name}',name)} ${verb} ${noun}.`);
  assert.equal(preferenceModel({...p,sentiment:'favourite'},opts).text,`Mi asignatura favorita es ${subject.name}.`);
 }
 const s=newUnit2ExploreState();act(s,'lab','preferences');act(s,'pref-level','who');act(s,'pref-subject-1','science');
 assert.match(render(s,'en'),/A Leo no le <mark>gustan<\/mark> las ciencias\./);
 for(const [mode,english,spanish] of [['en',true,false],['bi',true,true],['es',false,true]]){
  const html=render(s,mode);
  assert.equal(html.includes('Make it clear who'),english);
  assert.equal(html.includes('Indica a quién'),spanish);
  assert.equal(html.includes('You can leave it out if it is already clear'),english);
  assert.equal(html.includes('Puedes omitirlo si ya está claro'),spanish);
 }
});

test('word model starts hidden and the live result does not reveal the solution',()=>{
 const s=newUnit2ExploreState();act(s,'count',2);act(s,'word-pin');
 for(const [mode,english,spanish] of [['en',true,false],['bi',true,true],['es',false,true]]){
  const html=render(s,mode);
  assert.match(html,/aria-controls="u2x-model" aria-expanded="false"/);
  const [visible,hidden]=html.split('<div id="u2x-model" hidden>');
  assert.equal(visible.includes('Hold to see the model'),english);
  assert.equal(visible.includes('Mantén pulsado para ver el modelo'),spanish);
  assert.match(hidden,/<mark>unos<\/mark> libros/);
  assert(!visible.includes('unos libros'));
  assert(!html.includes('<p lang="es">unos libros</p>'));
 }
 assert(unit2ExploreAnnouncement(s).every(msg=>msg.includes('un libro')&&!msg.includes('unos libros')));
 act(s,'count',1);
 assert.match(render(s,'en'),/Your earlier model<\/h4><p lang="es">unos libros<\/p>/);
});

test('word reveal releases on mouse/touch completion and interruption, and supports native activation',()=>{
 const eventTarget=()=>({listeners:{},addEventListener(type,callback){this.listeners[type]=callback;}});
 const view=eventTarget(),root=eventTarget(),doc=eventTarget(),model={hidden:true};
 const button={expanded:'false',setAttribute(_key,value){this.expanded=value;},setPointerCapture(id){this.capture=id;}};
 root.querySelector=()=>model;
 const target={closest:()=>button};
 const event=(more={})=>({target,button:0,isPrimary:true,pointerId:7,...more});
 const reset=attachWordModelReveal(root,view,doc);
 const check=visible=>{assert.equal(model.hidden,!visible);assert.equal(button.expanded,String(visible));};
 check(false);
 for(const [receiver,end] of [[view,'pointerup'],[view,'pointercancel'],[root,'lostpointercapture'],[view,'blur'],[view,'pagehide'],[root,'focusout']]){
  root.listeners.pointerdown(event({pointerType:end==='pointerup'?'mouse':'touch'}));check(true);
  assert.equal(button.capture,7);
  receiver.listeners[end](event());
  root.listeners.click(event({detail:1}));check(false);
 }
 root.listeners.pointerdown(event());view.listeners.pointerup(event({pointerId:8}));check(true);
 doc.hidden=true;doc.listeners.visibilitychange();check(false);
 root.listeners.click(event({detail:0}));check(true);
 root.listeners.click(event({detail:0}));check(false);
 root.listeners.click(event({detail:0}));check(true);
 reset();check(false);
});
