import test from 'node:test';
import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import {schoolWeek,classTimes,weekExpressions} from '../unit2-week-data.mjs';
import {validateActivity,transcriptVisible} from '../activity-library/contract.mjs';
import {renderActivity} from '../activity-library/renderer.mjs';
import {cadizDiscovery,cadizListening,cadizWeek,cadizTimes,cadizSubjects,irishModel,cadizModel,cultureCards} from '../unit2-day-data.mjs';
import {newDayState,updateDayState,renderUnit2Day,renderDayNav} from '../unit2-day.mjs';

const L=(en,es)=>`<span lang="en">${en}</span><span lang="es">${es}</span>`;
const button=(action,label,cls='',extra='')=>`<button data-action="${action}" class="${cls}" ${extra}>${label}</button>`;
const view=(s,mode='en')=>renderUnit2Day({L:(en,es)=>mode==='es'?es:mode==='bi'?L(en,es):en,
  T:(en,es)=>mode==='es'?es:en,button,state:{...s,mode}});

test('activity 1 reuses the discovery contract, exact approved recordings and existing symbols',async()=>{
  assert.equal(validateActivity(cadizDiscovery),cadizDiscovery);
  assert.equal(cadizDiscovery.items.length,3);
  for(const item of cadizDiscovery.items){
    await access(new URL(`../${item.audio.src}`,import.meta.url));
    const svg=await readFile(new URL(`../${item.image.src}`,import.meta.url),'utf8');
    assert(svg.includes(`<symbol id="${item.image.symbol}"`));
    assert.equal(item.audio.transcript,item.label.es);
  }
  const s=newDayState();assert(view(s).includes('data-library-kind="discovery"'));
  assert(!view(s).includes('class="activity-result"'));
  assert(updateDayState(s,'select','history','discovery'));
  assert(view(s).includes('class="activity-result"'));
  assert(view(s).includes('historia'));
  assert.equal(updateDayState(s,'select','nonexistent','discovery'),false);
});
test('activity 2 uses the approved Irish week and contrasts both schedules including Friday',()=>{
  assert.equal(irishModel.week,schoolWeek);assert.equal(irishModel.times,classTimes);
  assert.deepEqual(irishModel.week.map(day=>day.length),[6,6,6,6,4]);
  assert.deepEqual(cadizWeek.map(day=>day.length),[6,6,6,6,6]);
  assert.equal(cadizWeek.flat().length,30);
  assert.equal(cadizTimes[0],'08:15–09:15');assert.equal(cadizTimes.at(-1),'13:45–14:45');
  cadizWeek.flat().forEach(id=>assert(cadizSubjects[id]));
  const s=newDayState();updateDayState(s,'u2d-stage','1');
  assert(view(s).includes('11:15–11:45'));
  assert(view(s).includes('11:00–11:15'));
  assert(view(s).includes('13:15–13:55'));
  updateDayState(s,'u2d-day','4');
  assert(!view(s).includes('13:15–13:55'));
  assert(view(s).includes('13:15'));
  for(const key of ['hours','breaks','lessons']){assert(updateDayState(s,'u2d-compare',key));assert(view(s).includes('role="status"'));}
  assert.equal(updateDayState(s,'u2d-day','5'),false);
});
test('activity 3 uses exact B phrases and shared reveal rules without early transcript',async()=>{
  assert.equal(validateActivity(cadizListening),cadizListening);
  assert.equal(cadizListening.items[0].audio.src,weekExpressions[1].audio);
  assert.equal(cadizListening.items[1].audio.src,weekExpressions[4].audio);
  for(const item of cadizListening.items)await access(new URL(`../${item.audio.src}`,import.meta.url));
  const s=newDayState();updateDayState(s,'u2d-stage','2');
  assert(view(s).includes('data-library-kind="listening"'));
  assert.equal(transcriptVisible(cadizListening.items[0],s.listening),false);
  assert.equal(updateDayState(s,'next',null,'listening'),false);
  assert(updateDayState(s,'select','friday','listening'));
  assert.equal(s.listening.status,'incorrect');assert(!view(s).includes('class="activity-transcript"'));
  assert(updateDayState(s,'select','monday','listening'));
  assert.equal(s.listening.status,'correct');assert(view(s).includes('class="activity-transcript"'));
  assert(updateDayState(s,'next',null,'listening'));assert.equal(s.listening.index,1);
  assert.equal(transcriptVisible(cadizListening.items[1],s.listening),false);
  assert(updateDayState(s,'select','maths','listening'));
  assert(view(s).includes('No me gustan las matemáticas.'));
  assert(updateDayState(s,'next',null,'listening'));assert.equal(s.listening.index,0);
});
test('activity 4 sorts specific evidence and unsupported generalisations with feedback',()=>{
  const s=newDayState();updateDayState(s,'u2d-stage','3');
  assert.equal(cultureCards.length,4);
  assert(view(s).includes('u2d-sort'));
  assert(updateDayState(s,'u2d-sort','all-finish:model'));
  assert(view(s).includes('incorrect'));
  assert(updateDayState(s,'u2d-sort','all-finish:general'));
  assert(view(s).includes('School schedules vary.'));
  assert.equal(updateDayState(s,'u2d-sort','unknown:general'),false);
});
test('one Learn D page renders four stages in three modes and leaves A/B/C selection coherent',()=>{
  const s=newDayState();
  for(let stage=0;stage<4;stage++)for(const mode of ['en','bi','es']){
    s.stage=stage;const html=view(s,mode);
    assert(html.includes('Learn D'));
    assert(html.includes('u2d-stages'));
    assert(!html.includes('undefined'));
    assert(!html.includes('Conocimiento del Medio'));
  }
  for(const active of ['A','B','C','D']){
    const nav=renderDayNav({L,button,week:{open:active==='B'},journey:{open:active==='C'},day:{open:active==='D'}});
    assert.equal((nav.match(/aria-pressed="true"/g)??[]).length,1);
  }
  assert.match(renderActivity(cadizListening,s.listening,'es',''),/assets\/audio\/unit2/);
});
