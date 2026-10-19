import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {newJourneyState,updateJourneyState,journeyModes,journeyModel,journeyDuration,journeyAudioFiles,marcosListening} from '../unit2-journey-data.mjs';
import {renderUnit2Journey} from '../unit2-journey.mjs';
const E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const render=(s,mode='en')=>renderUnit2Journey({E,T:(en,es)=>mode==='es'?es:mode==='bi'?`${en} / ${es}`:en,L:(en,es)=>mode==='bi'?`<span lang="en">${en}</span><span lang="es">${es}</span>`:`<span lang="${mode}">${mode==='es'?es:en}</span>`,button:(a,l,c='',extra='')=>`<button type="button" data-action="${a}" class="${c}" ${extra}>${l}</button>`,state:{...s,mode}});
test('journey models grow from a short answer to a connected response without a tense table',()=>{
 const s=newJourneyState();assert.equal(journeyModel(s),'Voy a pie.');
 for(const [action,value] of [['u2c-transport','bus'],['u2c-distance','far'],['u2c-minutes','20'],['u2c-time-style','approx'],['u2c-level','3']])assert(updateJourneyState(s,action,value));
 assert.equal(journeyModel(s),'Normalmente voy al colegio en autobús porque vivo lejos. Tardo unos veinte minutos en llegar.');
 updateJourneyState(s,'u2c-minutes','30');updateJourneyState(s,'u2c-time-style','half');assert.equal(journeyDuration(s),'media hora');
 updateJourneyState(s,'u2c-minutes','15');assert.equal(journeyDuration(s),'quince minutos');
 updateJourneyState(s,'u2c-transport','walk');updateJourneyState(s,'u2c-walking','andando');assert(journeyModel(s).includes('voy al colegio andando'));
});
test('unknown actions and invalid values cannot corrupt the guided journey',()=>{
 const s=newJourneyState(),before=structuredClone(s);
 for(const [a,v] of [['u2c-stage','5'],['u2c-stage','-1'],['u2c-transport','plane'],['u2c-minutes','99'],['u2c-distance','<img>'],['u2c-level','4'],['u2c-time-style','half'],['u2c-person','nosotros'],['u2c-answer','train'],['delete','']])assert.equal(updateJourneyState(s,a,v),false);
 assert.deepEqual(s,before);
});
test('all five discoveries and every guided duration render in three instruction modes',()=>{
 const s=newJourneyState();
 for(const mode of ['en','es','bi'])for(let stage=0;stage<5;stage++){
  s.stage=stage;const html=render(s,mode);assert(!html.includes('undefined'));assert(html.includes('id="u2c-title" tabindex="-1"'));assert(!html.includes('speechSynthesis'));assert(!html.includes('<input'));
  if(mode==='bi')assert(html.includes('lang="en"')&&html.includes('lang="es"'));
 }
 s.stage=3;s.level=3;for(const minutes of [5,10,15,20,30]){s.minutes=minutes;assert(render(s).includes(journeyModel(s)));}
 s.stage=2;for(const person of ['yo','tu','ella']){s.person=person;assert(!render(s).includes('undefined'));}
});
test('transport players identify exact approved fragments and full sentences separately',()=>{
 const s=newJourneyState();s.stage=1;
 for(const x of journeyModes){s.transport=x.id;const html=render(s);assert(html.includes(`src="${x.fullAudio??x.segmentAudio}"`));assert(html.includes(x.fullAudio?'Listen to the complete sentence:':'Listen to the transport expression:'));}
 s.transport='walk';s.walking='andando';assert(render(s).includes('1Y_U02_AUD_TRA_02_v1.mp3'));assert(render(s).includes('<strong lang="es">andando</strong>'));
 s.stage=3;assert(!render(s).includes('<audio'));assert(render(s).includes('not facts from Marcos'));
});
test('Marcos recognition hides feedback until selection and keeps picture options label-free',()=>{
 const s=newJourneyState();s.stage=4;let html=render(s);assert(html.includes(marcosListening.file));assert(!html.includes('Marcos says he walks'));assert(!html.includes('role="status"'));assert(!html.includes('twenty minutes'));
 const choices=html.split('class="u2c-picture-choices"')[1].split('</section>')[0];assert(!choices.includes('<span'));assert(!choices.includes('<strong'));assert.equal((choices.match(/aria-label=/g)||[]).length,4);
 s.answer='bus';html=render(s);assert(html.includes('Listen again to the first sentence'));assert(!html.includes('Marcos says he walks'));
 s.answer='walk';assert(render(s).includes('Marcos says he walks because he lives nearby'));
});
test('all 12 referenced MP3s match the approved inventory and decode fully; Marcos stays original',async()=>{
 const inventory=await readFile(new URL('../docs/unit2/audio-inventory.csv',import.meta.url),'utf8');
 assert.equal(new Set(journeyAudioFiles).size,12);
 for(const file of journeyAudioFiles){const url=new URL('../'+file,import.meta.url),bytes=await readFile(url),sha=createHash('sha256').update(bytes).digest('hex');assert(bytes.length>1000,file);const row=inventory.split('\n').find(line=>line.startsWith(file.split('/').pop()+','));assert(row,file);assert(row.includes(sha),file);execFileSync('ffmpeg',['-v','error','-xerror','-i',url.pathname,'-f','null','-'],{stdio:'pipe'});}
 assert.equal(createHash('sha256').update(await readFile(new URL('../'+marcosListening.file,import.meta.url))).digest('hex'),marcosListening.sha256);
 const duration=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',new URL('../'+marcosListening.file,import.meta.url).pathname],{encoding:'utf8'}));assert(Math.abs(duration-marcosListening.duration)<.01);
});
test('each illustrated mode has an original colour SVG symbol and CSS has tablet/mobile layouts',async()=>{
 const svg=await readFile(new URL('../assets/illustrations/unit2-journeys.svg',import.meta.url),'utf8');for(const x of journeyModes)assert(svg.includes(`id="${x.id}"`));assert(svg.includes('id="school"'));assert(!svg.includes('currentColor'));const css=await readFile(new URL('../unit2-journey.css',import.meta.url),'utf8');assert(css.includes('max-width:760px'));assert(css.includes('max-width:450px'));assert(css.includes(':focus-visible'));
});
