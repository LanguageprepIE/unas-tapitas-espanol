import test from 'node:test';
import assert from 'node:assert/strict';
import {newPlayState,updatePlay,playSnapshot,restorePlay,workshopWord} from '../play-engine.mjs';
import {workshop,alienPieces} from '../data/play-unit1.mjs';
import {renderPlay} from '../play.mjs';
import {restoreSnapshot} from '../engine.mjs';
const act=(s,a,v)=>assert.equal(updatePlay(s,a,v),true,a);
const send=(s,msg)=>act(s,'pg-alien-send',msg);
test('all six workshop orders have a playable spelling and contextual application',()=>{
 const s=newPlayState();act(s,'pg-open','anagrams');
 for(let r=0;r<workshop.length;r++){
  const q=workshop[r];assert.equal([...q.word].sort().join(''),[...q.letters].sort().join(''));
  for(const ch of q.word){const i=[...q.letters].findIndex((c,i)=>c===ch&&!s.anagrams.letters.includes(i));act(s,'pg-letter',String(i));}
  assert.equal(workshopWord(s.anagrams),q.word);act(s,'pg-word-check');assert(s.anagrams.built);
  // Wrong contextual message keeps the recovered word and never completes the order.
  act(s,'pg-work-check');assert(!s.anagrams.solved);assert(s.anagrams.built);
  for(const piece of q.answers[0].split(' ')){const i=q.pieces.indexOf(piece);assert(i>=0,piece);act(s,'pg-work-token',String(i));}
  act(s,'pg-work-check');assert(s.anagrams.solved);
  if(r<workshop.length-1)act(s,'pg-work-next');
 }
 assert.deepEqual(s.finished,['anagrams']);
});
test('workshop hints, repeated letters, undo and accents do not destroy progress',()=>{
 const s=newPlayState();act(s,'pg-open','anagrams');act(s,'pg-letter','0');act(s,'pg-letter','0');assert.equal(s.anagrams.letters.length,1);act(s,'pg-word-check');assert(!s.anagrams.built);act(s,'pg-letter-undo');assert.equal(s.anagrams.letters.length,0);for(let i=0;i<6;i++)act(s,'pg-hint');assert.equal(s.anagrams.hint,3);assert(!s.anagrams.built);
});
function alienJourney(feeling='fatal'){
 const s=newPlayState();act(s,'pg-open','alien');send(s,'Hasta mañana.');assert(s.alien.left);send(s,'Hola.');send(s,'Tengo trece años.');assert(!s.alien.name&&!s.alien.age);assert.match(s.notice[0],/13 in the name/);send(s,'Me llamo Nilo. ¿Y tú?');send(s,'Tengo trece años.');send(s,`Estoy ${feeling}, gracias.`);act(s,'pg-alien-person','ines');send(s,'Hola.');send(s,'¿Cómo te llamas?');send(s,'¿Cómo se escribe tu nombre?');send(s,'¿Cuántos años tienes?');act(s,'pg-alien-person','leo');send(s,'Hola.');send(s,'Se llama Nilo. Tiene trece años.');assert(s.alien.presented);assert(s.finished.includes('alien'));send(s,'Hasta luego.');return s;
}
test('alien story can be finished after an early farewell and a repaired age/name misunderstanding',()=>{const s=alienJourney();assert(s.alien.left);assert.equal(s.alien.feeling,'fatal');});
test('all feelings are valid and hints/repetition never penalize the alien story',()=>{for(const f of ['bien','regular','fatal','fenomenal']){const s=alienJourney(f);assert.equal(s.alien.feeling,f);}});
test('alien presentation requires the accumulated records and undo restores prior world state',()=>{
 const s=newPlayState();act(s,'pg-open','alien');send(s,'Hola.');send(s,'Me llamo Nilo.');act(s,'pg-alien-back');assert(!s.alien.name);send(s,'¿Puedes repetir, por favor?');assert(s.alien.line);act(s,'pg-alien-person','leo');send(s,'Hola.');send(s,'Se llama Nilo. Tiene trece años.');assert(!s.alien.presented);assert(!s.finished.length);for(let i=0;i<alienPieces.length;i++){act(s,'pg-alien-clear');act(s,'pg-alien-token',String(i));assert.deepEqual(s.alien.tokens,[i]);}
});
function codeJourney(){const s=newPlayState();act(s,'pg-open','code');for(const v of ['Hola.','¿Cómo','te','llamas?'])act(s,'pg-terminal-token',v);act(s,'pg-terminal-check');assert(s.code.terminal);act(s,'pg-room','archive');for(const v of ['S','a','r','a'])act(s,'pg-name-token',v);act(s,'pg-archive-check');assert(s.code.archive);act(s,'pg-room','voices');for(const [i,v] of ['doce','fenomenal','catorce','fatal'].entries())act(s,'pg-slot',`${i}:${v}`);act(s,'pg-voices-check');assert(s.code.voices);act(s,'pg-room','capsule');for(let i=0;i<12;i++)act(s,'pg-dial','0:1');for(let i=0;i<14;i++)act(s,'pg-dial','1:1');act(s,'pg-capsule-check');assert(s.code.opened);assert(s.finished.includes('code'));return s;}
test('all room mechanisms form a connected, solvable adventure',()=>{codeJourney();});
test('room revisits and failed mechanisms keep collected clues; premature unlocks fail',()=>{
 const s=newPlayState();act(s,'pg-open','code');assert.equal(updatePlay(s,'pg-capsule-check'),false);act(s,'pg-terminal-check');assert(!s.code.terminal);for(const v of ['Hola.','¿Cómo','te','llamas?'])act(s,'pg-terminal-token',v);act(s,'pg-terminal-check');act(s,'pg-room','voices');act(s,'pg-room','terminal');assert(s.code.terminal);act(s,'pg-transcript');assert(s.code.transcript);assert.equal(s.code.slots.join(''),'');
});
test('save/restore preserves only authored checkpoints, constrains data and resumes all endings',()=>{
 const s=codeJourney();s.alien.last='PRIVATE';s.alien.history=[{private:'PRIVATE'}];const raw=JSON.stringify(playSnapshot(s));assert(!raw.includes('PRIVATE'));const restored=restorePlay(raw);assert(restored.code.opened&&restored.code.voices);assert.deepEqual(restored.code.dial,[12,14]);assert.throws(()=>restorePlay('{"schema":8}'));const bounded=restorePlay('{"schema":1,"workshopRound":999,"finished":["alien","<script>"],"alien":{"feeling":"PRIVATE"},"code":{"opened":true}}');assert.equal(bounded.anagrams.round,5);assert.equal(bounded.alien.feeling,'');assert(!bounded.code.opened);assert.deepEqual(bounded.finished,['alien']);
});
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function ui(mode){const L=(en,es)=>mode==='es'?es:mode==='en'?en:`<span lang="en">${en}</span><span lang="es">${es}</span>`;return {L,T:(en,es)=>mode==='es'?es:en,pair:p=>L(...p),E,button:(a,l,c='',x='')=>`<button data-action="${a}" class="${c}" ${x}>${l}</button>`};}
test('every game and room renders in all language modes, including locked and completed states',()=>{
 for(const mode of ['en','bi','es'])for(const s of [newPlayState(),alienJourney(),codeJourney()])for(const game of [null,'anagrams','alien','code']){s.game=game;for(const obj of ['terminal','archive','voices','capsule']){s.code.object=obj;const html=renderPlay(s,ui(mode));assert(!html.includes('undefined'));assert(!html.includes('[object Object]'));assert(html.includes('<button'));}}
});
test('Play route can be restored without entering the academic completion set',()=>{const s=restoreSnapshot('{"schema":1,"section":"play","completed":["play","learn"]}');assert.equal(s.section,'play');assert.deepEqual(s.completed,['learn']);});
