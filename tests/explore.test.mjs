import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {newExploreState,updateExplore,renderExplore,greetingScene,personScene,conversationScene,questionScene,pendingAudio,readyAudio,numberWords,soundWords} from '../explore.mjs';

const h={T:(en)=>en,L:(en)=>en,pair:(x)=>x[0],E:(s)=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;'),button:(action,label,cls='',extra='')=>`<button data-action="${action}" class="${cls}" ${extra}>${label}</button>`};
test('each laboratory renders distinct controls in the original Explore route',()=>{
 const s=newExploreState();const controls={greetings:'ex-time',sounds:'ex-select-sound',numbers:'ex-number',person:'ex-person-kind',conversation:'ex-turn',questions:'ex-q-lead'};
 for(const [lab,action] of Object.entries(controls)){updateExplore(s,'ex-lab',lab);const html=renderExplore(s,h);assert(html.includes(action),lab);assert(html.includes('ex-nav'),lab);assert(!html.includes('undefined'),lab);if(lab==='numbers')assert(html.includes('audio[data-explore-audio]')||html.includes('data-explore-audio'),`number audio missing in ${lab}`);else if(lab!=='sounds')assert(!html.includes('<audio'),`unexpected audio in ${lab}`);}
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
 const s=newExploreState();assert.deepEqual(s.turns,['greeting','question','goodbye','answer']);assert(conversationScene(s).tip[0].includes('shuffled'));updateExplore(s,'ex-turn','answer:up');assert.deepEqual(s.turns,['greeting','question','answer','goodbye']);assert(conversationScene(s).tip[0].includes('full answer now sit together'));updateExplore(s,'ex-turn','answer:down');updateExplore(s,'ex-question','age');assert.equal(conversationScene(s).text.answer,'Tengo trece años.');assert(conversationScene(s).tip[0].includes('shuffled'));
});
test('conversation builder makes the reordering task visible and explains each move',()=>{
 const s=newExploreState();s.lab='conversation';const html=renderExplore(s,h);assert(html.includes('This exchange has been shuffled.'));assert(html.includes('Move up one place'));assert(html.includes('Move down one place'));assert(html.indexOf('¡Hasta luego!')<html.indexOf('Me llamo Alba.'));
});
test('question machine connects words, answers, and both question marks',()=>{
 const s=newExploreState();s.lab='questions';
 assert.equal(questionScene(s).question,'¿Cómo te llamas?');assert.equal(questionScene(s).answer,'Me llamo Alba.');
 updateExplore(s,'ex-q-goal','age');assert.equal(questionScene(s).question,'¿Cuántos años tienes?');assert.equal(questionScene(s).answer,'Tengo trece años.');
 updateExplore(s,'ex-q-lead','Cómo');assert.equal(questionScene(s).status,'unusual');
 updateExplore(s,'ex-q-lead','Cuántos');assert(questionScene(s).observation[0].includes('number'));
 updateExplore(s,'ex-q-punct','open');assert.equal(questionScene(s).question,'Cuántos años tienes?');assert(questionScene(s).punctuation[0].includes('both'));
 updateExplore(s,'ex-q-punct','close');assert.equal(questionScene(s).question,'Cuántos años tienes');
 updateExplore(s,'ex-q-goal','meaning');assert.equal(questionScene(s).question,'Qué significa hola');
 updateExplore(s,'ex-q-lead','invalid');assert.equal(s.qLead,'Qué');
 updateExplore(s,'ex-lab','world');assert.equal(s.lab,'questions');
 const html=renderExplore(s,h);assert(html.includes('The Question Machine'));assert(!html.includes('Spanish Around the World'));
});
test('only verified packaged audio can enter the ready registry',async()=>{
 assert.equal(pendingAudio.sounds.length,soundWords.length);assert.equal(pendingAudio.numbers.length,21);
 assert.deepEqual(Object.keys(readyAudio.sounds).sort(),soundWords.map(x=>x.word).sort());assert.deepEqual(Object.keys(readyAudio.numbers).map(Number).sort((a,b)=>a-b),Array.from({length:21},(_,i)=>i));
 for(const group of ['sounds','numbers'])for(const [key,path] of Object.entries(readyAudio[group])){
  const planned=pendingAudio[group].find(x=>String(group==='sounds'?x.word:x.number)===String(key));assert.equal(path,planned?.expected);
  const bytes=await readFile(new URL('../'+path,import.meta.url));assert(bytes.length>1000&&bytes[0]===0x49&&bytes[1]===0x44&&bytes[2]===0x33,`${key} must be a real ID3 MP3`);
 }
});
test('word and number audio controls point to their own labelled recordings',()=>{
 const s=newExploreState();s.lab='sounds';
 for(const item of soundWords){s.sound=item.letter;s.compare=item.word;const html=renderExplore(s,h);assert(html.includes(`src="${readyAudio.sounds[item.word]}"`),item.word);}
 s.lab='numbers';for(let n=0;n<=20;n++){s.number=n;const html=renderExplore(s,h);assert(html.includes(`src="${readyAudio.numbers[n]}"`),`number ${n}`);}
});

test('all 75 question, ending and answer combinations distinguish naturalness from answer fit',()=>{
 const models=[['name','Cómo','te llamas'],['age','Cuántos','años tienes'],['feeling','Cómo','estás'],['spelling','Cómo','se escribe tu nombre'],['meaning','Qué','significa hola']];
 const s=newExploreState();s.lab='questions';
 for(const [goal] of models){updateExplore(s,'ex-q-goal',goal);
  for(const lead of ['Cómo','Cuántos','Qué'])for(const [tailGoal,naturalLead,tail] of models){
   updateExplore(s,'ex-q-lead',lead);updateExplore(s,'ex-q-tail',tail);
   const scene=questionScene(s),natural=lead===naturalLead,fit=natural&&goal===tailGoal;
   assert.equal(scene.natural,natural,scene.question);assert.equal(scene.matchesAnswer,fit,scene.question);
   assert.equal(scene.status,!natural?'unusual':fit?'fits':'answer-mismatch');
   const html=renderExplore(s,h);assert(html.includes(fit?'🙂':'🤔'));assert(html.includes('💡'));assert(html.includes('Try another combination!'));assert(html.includes('lang="en" aria-labelledby="ex-q-feedback-title"'));
   if(fit)assert(html.includes('That works!'));
   else if(natural)assert(scene.observation[0].includes('The question itself works'));
   else assert(scene.observation[0].includes('Can you find out why?'));
  }
 }
});
test('Cuántos te llamas invites investigation without correction or blocking',()=>{
 const s=newExploreState();s.lab='questions';updateExplore(s,'ex-q-lead','Cuántos');
 const scene=questionScene(s);assert.equal(scene.question,'¿Cuántos te llamas?');assert.equal(scene.answer,'Me llamo Alba.');
 assert.equal(scene.status,'unusual');assert.equal(scene.title[0],'Hmm… something sounds unusual!');
 assert(scene.observation[0].includes('Your question and answer don’t quite match.'));
 assert(!scene.observation[0].includes('Cómo'));assert(!scene.observation[0].includes('Incorrect'));
 updateExplore(s,'ex-q-tail','años tienes');assert.equal(questionScene(s).status,'answer-mismatch');
 updateExplore(s,'ex-q-goal','age');assert.equal(questionScene(s).status,'fits');
 updateExplore(s,'ex-q-punct','open');assert.equal(questionScene(s).status,'fits');assert(!questionScene(s).question.includes('¿'));
});
