import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {schoolDays,schoolSubjects,schoolWeek,classTimes,weekExpressions,weekChecks,weekListening,weekListeningAvailable,newWeekState,updateWeekState,preferenceSentence,subjectById} from '../unit2-week-data.mjs';
import {renderUnit2Week} from '../unit2-week.mjs';
const context=(state,mode='en')=>({state:{...state,mode},L:(en,es)=>mode==='bi'?`<span lang="en">${en}</span><span lang="es">${es}</span>`:mode==='es'?es:en,T:(en,es)=>mode==='es'?es:en,E:x=>String(x).replaceAll('"','&quot;'),button:(action,label,cls='',attrs='')=>`<button data-action="${action}" class="${cls}" ${attrs}>${label}</button>`});
test('the fictional timetable has 28 hour-long classes, the exact breaks and no Friday lunch',()=>{
 assert.deepEqual(schoolWeek.map(x=>x.length),[6,6,6,6,4]);
 assert.deepEqual(classTimes,['09:00–10:00','10:00–11:00','11:15–12:15','12:15–13:15','13:55–14:55','14:55–15:55']);
 assert(schoolWeek.flat().every(id=>subjectById(id)));
 assert.equal(schoolSubjects.length,18);assert.equal(schoolSubjects.filter(x=>x.core).length,8);
 const html=renderUnit2Week(context({...newWeekState(),stage:2}));
 const columns=html.split('<section class="u2b-day-column ').slice(1);
 assert.equal(columns.length,5);
 columns.forEach((column,i)=>{const c=column.split('</section>')[0];assert.equal((c.match(/data-action="u2b-cell"/g)||[]).length,i===4?4:6);assert.equal((c.match(/class="u2b-break"/g)||[]).length,1);assert.equal(c.includes('u2b-lunch'),i!==4);assert(c.includes(i===4?'13:15':'15:55'));});
 assert(!/francés|DMLC/.test(html));
});
test('all 28 enabled recordings match the original inventory or verified subject supplement',async()=>{
 const inventory=await readFile(new URL('../docs/unit2/audio-inventory.csv',import.meta.url),'utf8');
 const supplement=JSON.parse(await readFile(new URL('../docs/unit2/subject-audio-supplement.json',import.meta.url),'utf8'));
 const resources=[...schoolDays,...schoolSubjects,...weekExpressions].filter(x=>x.audio).map(x=>x.audio);
 assert.equal(new Set(resources).size,28);
 for(const file of resources){const bytes=await readFile(new URL('../'+file,import.meta.url));assert(bytes.length>1000,file);const row=inventory.split('\n').find(line=>line.includes(file));const extra=supplement.resources.find(x=>x.path===file);const hash=createHash('sha256').update(bytes).digest('hex');if(extra){assert.equal(bytes.length,extra.bytes,file);assert.equal(hash,extra.sha256,file);assert.equal(subjectById(extra.subject_id).name,extra.text);assert.equal(subjectById(extra.subject_id).audio,extra.path);}else{assert(row,file);assert(row.includes(hash),file);}}
 assert.deepEqual(schoolSubjects.filter(s=>!s.audio),[]);
 assert.equal(subjectById('business').recorded,'empresariales');
});
test('each newly supplied subject has an enabled MP3 control in every instruction mode',()=>{
 for(const mode of ['en','es','bi'])for(const id of ['irish','technology','engineering','graphics','wood','art','religion']){const html=renderUnit2Week(context({...newWeekState(),stage:1,subject:id,more:true},mode));assert(html.includes(`src="${subjectById(id).audio}"`));assert(!html.includes('u2b-no-audio'));}
});
test('the unverified Listening 3 cannot be played by this block',()=>{
 assert.equal(weekListeningAvailable,false);
 const html=renderUnit2Week(context({...newWeekState(),stage:4}));
 assert(!html.includes(`src="${weekListening}"`));assert(html.includes('not available yet'));
});
test('subject cards link to distinct painted original illustrations',async()=>{
 const svg=await readFile(new URL('../assets/illustrations/unit2-subjects.svg',import.meta.url),'utf8');
 for(const sub of schoolSubjects)assert(svg.includes(`id="${sub.id}"`),sub.id);
 assert(!svg.includes('<style'));assert(svg.includes('fill="#'));
});
test('preferences produce correct whole phrases including plural subjects',()=>{
 const s=newWeekState();assert.equal(preferenceSentence(s),'Mi asignatura favorita es educación física.');
 updateWeekState(s,'u2b-sentiment','like');updateWeekState(s,'u2b-preference','history');assert.equal(preferenceSentence(s),'Me gusta la historia.');
 updateWeekState(s,'u2b-sentiment','dislike');updateWeekState(s,'u2b-preference','geography');assert.equal(preferenceSentence(s),'No me gusta la geografía.');
 updateWeekState(s,'u2b-preference','maths');assert.equal(preferenceSentence(s),'No me gustan las matemáticas.');
});
test('listening has no transcript or feedback before selection and next requires a correct response',()=>{
 const s={...newWeekState(),stage:4};let html=renderUnit2Week(context(s));
 assert(!html.includes('Hoy es lunes'));assert(!html.includes('class="feedback'));assert(!html.includes('u2b-next'));
 assert.equal(updateWeekState(s,'u2b-next'),false);
 updateWeekState(s,'u2b-answer','viernes');html=renderUnit2Week(context(s));assert(html.includes('Try again'));assert(!html.includes('Hoy es lunes'));assert.equal(updateWeekState(s,'u2b-next'),false);
 updateWeekState(s,'u2b-answer','lunes');html=renderUnit2Week(context(s));assert(html.includes('Hoy es lunes'));assert(updateWeekState(s,'u2b-next'));assert.equal(s.answer,null);
 for(let i=1;i<3;i++){assert.equal(s.checkIndex,i);updateWeekState(s,'u2b-answer',weekChecks[i].answer);assert(updateWeekState(s,'u2b-next'));}
 assert.equal(s.checkIndex,0);assert.equal(s.answer,null);
});
test('every stage and expanded subject view render in all three instruction modes',()=>{
 for(const mode of ['en','es','bi'])for(let stage=0;stage<5;stage++){const html=renderUnit2Week(context({...newWeekState(),stage,more:true},mode));assert(html.includes('Mi semana escolar'));assert(!html.includes('undefined'));assert(!html.includes('speechSynthesis'));if(mode==='bi')assert(html.includes('lang="en"')&&html.includes('lang="es"'));}
});
test('ideal Friday caps choices at four and rejects invalid cell and action values',()=>{
 const s=newWeekState();for(const id of ['spanish','maths','pe','history','science'])updateWeekState(s,'u2b-ideal',id);
 assert.equal(s.ideal.length,4);updateWeekState(s,'u2b-ideal','maths');assert.equal(s.ideal.length,3);
 assert.equal(updateWeekState(s,'u2b-cell','4:4'),false);assert.equal(updateWeekState(s,'u2b-cell','-1:0'),false);assert.equal(updateWeekState(s,'u2b-stage','99'),false);assert.equal(updateWeekState(s,'u2b-subject','<script>'),false);
 assert(updateWeekState(s,'u2b-cell','4:3'));assert.equal(s.day,4);assert.equal(s.subject,'cspe');
});
