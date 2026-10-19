import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import * as content from '../data/unit1.mjs';
import * as catalogue from '../catalogue.mjs';
import * as progress from '../progress.mjs';
import * as engine from '../engine.mjs';
import * as explore from '../explore.mjs';
import * as playEngine from '../play-engine.mjs';
import * as playViews from '../play.mjs';
import * as playData from '../data/play-unit1.mjs';
import * as unit2 from '../unit2-learn.mjs';
import * as week from '../unit2-week.mjs';
import * as journey from '../unit2-journey.mjs';
import * as day from '../unit2-day.mjs';
import {createAudioController} from '../activity-library/renderer.mjs';
// A rendering harness, not a browser or an accessibility audit.
function element(){return {innerHTML:'',textContent:'',value:'',listeners:{},classList:{toggle(){}},addEventListener(k,fn){this.listeners[k]=fn;},setAttribute(){},contains(){return false;},append(){},focus(){},scrollIntoView(){},closest(){return this;},querySelector(){return null;}};}
async function harness({initialHash='',initialStorage=new Map(),blockedStorage=false}={}){const elements=new Map();const get=s=>{if(!elements.has(s))elements.set(s,element());return elements.get(s);};const document={activeElement:null,documentElement:element(),body:element(),querySelector:get,createElement:()=>element()};const window={listeners:{},addEventListener(k,fn){this.listeners[k]=fn;},scrollTo(){}};const location={hash:initialHash};window.history={replaceState(_s,_t,hash){location.hash=hash;}};const storage=initialStorage;const localStorage={get length(){return storage.size;},key:i=>[...storage.keys()][i],getItem:k=>{if(blockedStorage)throw Error('blocked');return storage.get(k);},setItem:(k,v)=>{if(blockedStorage)throw Error('blocked');storage.set(k,v);},removeItem:k=>{if(blockedStorage)throw Error('blocked');storage.delete(k);}};const source=(await readFile(new URL('../app.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'');vm.runInNewContext(source,{...content,...engine,...catalogue,...progress,...explore,...playEngine,...playViews,...playData,...unit2,...week,...journey,...day,createAudioController,document,window,location,localStorage,console,setTimeout,Blob,URL});return {get,document,window,location,storage,route(id){location.hash='#'+id;window.listeners.hashchange();},mode(value){get('#mode').listeners.change({target:{value}});}};}
test('all eight views render in all three language modes without runtime failures',async()=>{const h=await harness();for(const mode of ['en','bi','es']){h.mode(mode);for(const route of ['home','learn','explore','practise','communicate','grammar','vocabulary','listening']){h.route(route);const html=h.get('#main').innerHTML;assert(html.includes('<h1>'),`${mode}/${route}`);assert(!html.includes('undefined'),`${mode}/${route}`);if(mode==='bi')assert(html.includes('lang="en"')&&html.includes('lang="es"'));}}});
test('language switches and route changes preserve text and escape entered markup',async()=>{const h=await harness();h.route('communicate');const input=h.get('#main').listeners.input;input({target:{id:'draft',value:'Hola <script>private</script>'}});input({target:{id:'reflection',value:'Puedo pedir ayuda.'}});for(const mode of ['bi','es','en']){h.mode(mode);const html=h.get('#main').innerHTML;assert(html.includes('Hola &lt;script&gt;private&lt;/script&gt;'));assert(html.includes('Puedo pedir ayuda.'));}h.route('home');h.route('communicate');assert(h.get('#main').innerHTML.includes('Hola &lt;script&gt;private&lt;/script&gt;'));});
test('a practice answer survives language switching and contextual help',async()=>{const h=await harness();h.route('practise');h.document.body.listeners.click({target:{closest:()=>({dataset:{action:'q-choice',value:'Me llamo Leo.'}})}});h.mode('es');assert(h.get('#main').innerHTML.includes('aria-pressed="true"'));h.route('grammar');h.route('practise');assert(h.get('#main').innerHTML.includes('aria-pressed="true"'));});

test('skip-to-content retains the current learning section',async()=>{const h=await harness();h.route('explore');const before=h.get('#main').innerHTML;h.route('main');assert.equal(h.get('#main').innerHTML,before);});

function click(h,action,extra={}){h.document.body.listeners.click({target:{closest:()=>({dataset:{action,...extra}})}});}
test('visiting all activities without answering never completes the practice section',async()=>{const h=await harness();h.route('practise');for(let i=0;i<content.questions.length;i++)click(h,'q-next');assert(h.get('#main').innerHTML.includes('No sections marked yet.'));});
test('attempting the full practice set records practice without a grade gate',async()=>{const h=await harness();h.route('practise');for(const q of content.questions){if(q.type==='order'){for(const token of q.answers[0].split(' '))click(h,'q-token',{index:String(q.tokens.indexOf(token))});}else if(q.type==='text'){h.get('#main').listeners.input({target:{id:'practice-answer',value:'an incorrect attempt'}});}else click(h,'q-choice',{value:q.options[0]});h.document.body.listeners.submit({target:{id:'practice-form'},preventDefault(){}});click(h,'q-next');}assert(h.get('#main').innerHTML.includes('1 of 4 sections marked as practised.'));});
test('every topic set and every question renders in all modes',async()=>{const h=await harness();for(const mode of ['en','bi','es']){h.mode(mode);for(const topic of ['all',...content.topics.map(t=>t[0]),'reading']){h.route('practise');h.get('#main').listeners.change({target:{id:'practice-topic',value:topic}});const qs=topic==='all'?content.questions:content.questions.filter(q=>q.topic===topic);for(const q of qs){const html=h.get('#main').innerHTML;assert(html.includes(q.prompt[mode==='es'?1:0]),q.id);assert(!html.includes('undefined'));if(q.reading)assert(html.includes('reading-text'));click(h,'q-next');}}}});
test('opening a learning explanation retains its revealed state when language changes',async()=>{const h=await harness();h.route('learn');click(h,'learn-check',{id:'greetings'});h.mode('es');assert(h.get('#main').innerHTML.includes(content.lessons[0].checkpoint.answer[1]));h.mode('bi');assert(h.get('#main').innerHTML.includes(content.lessons[0].checkpoint.answer[0]));});
test('a filtered answer survives switching topics and returning',async()=>{const h=await harness();h.route('practise');h.get('#main').listeners.change({target:{id:'practice-topic',value:'age'}});click(h,'q-choice',{value:'tengo'});h.get('#main').listeners.change({target:{id:'practice-topic',value:'greetings'}});h.get('#main').listeners.change({target:{id:'practice-topic',value:'age'}});assert(h.get('#main').innerHTML.includes('data-value="tengo" aria-pressed="true"'));});
test('optional detail is closed initially and retains its state across language switches',async()=>{const h=await harness();h.route('learn');assert(h.get('#main').innerHTML.includes('id="extra-age" hidden'));click(h,'learn-extra',{id:'age'});assert(h.get('#main').innerHTML.includes('id="extra-age" >'));h.mode('es');assert(h.get('#main').innerHTML.includes('id="extra-age" >'));assert(!h.get('#main').innerHTML.includes('**'));click(h,'learn-extra',{id:'age'});assert(h.get('#main').innerHTML.includes('id="extra-age" hidden'));});
test('listening choices and transcript visibility survive language switches',async()=>{const h=await harness();h.route('listening');assert(h.get('#main').innerHTML.includes('id="transcript-l1" hidden'));h.get('#main').listeners.change({target:{dataset:{listeningQuestion:'l1-name',recording:'l1'},value:'Sara'}});click(h,'listening-transcript',{id:'l1'});h.mode('es');assert(h.get('#main').innerHTML.includes('value="Sara" selected'));assert(h.get('#main').innerHTML.includes('id="transcript-l1" >'));click(h,'listening-check',{id:'l1'});assert(!h.get('#main').innerHTML.includes('undefined'));h.mode('bi');assert(h.get('#main').innerHTML.includes('She says Me llamo Sara.'));assert(h.get('#main').innerHTML.includes('Dice Me llamo Sara.'));});
test('a language switch restores audio position, volume and playback intent',async()=>{const h=await harness();h.route('listening');const old={dataset:{listening:'l1'},currentTime:7.25,playbackRate:1,volume:.6,muted:false,paused:false};let played=false;const next={dataset:{listening:'l1'},currentTime:0,play(){played=true;return Promise.resolve();}};let n=0;h.get('#main').querySelectorAll=()=>++n===1?[old]:[next];h.mode('bi');assert.equal(next.currentTime,7.25);assert.equal(next.volume,.6);assert.equal(next.playbackRate,1);assert(played);});
test('leaving the listening route does not request playback on the next render',async()=>{const h=await harness();h.route('listening');const old={dataset:{listening:'l1'},currentTime:3,playbackRate:1,volume:1,muted:false,paused:false};let played=false;const next={dataset:{listening:'l1'},currentTime:0,play(){played=true;return Promise.resolve();}};let n=0;h.get('#main').querySelectorAll=()=>++n===1?[old]:[next];h.route('home');assert(!played);});
test('Explore navigation and controls respond within the existing route',async()=>{const h=await harness();h.route('explore');click(h,'ex-lab',{value:'numbers'});click(h,'ex-pick-number',{value:'20'});assert(h.get('#main').innerHTML.includes('veinte'));h.get('#main').listeners.change({target:{id:'ex-number',value:'16'}});assert(h.get('#main').innerHTML.includes('dieciséis'));click(h,'ex-lab',{value:'person'});h.get('#main').listeners.change({target:{id:'ex-person',value:'alba'}});assert(h.get('#main').innerHTML.includes('Alba <mark>tiene</mark> trece años.'));h.mode('es');assert(h.get('#main').innerHTML.includes('Alba <mark>tiene</mark> trece años.'));h.route('home');h.route('explore');assert(h.get('#main').innerHTML.includes('Alba <mark>tiene</mark> trece años.'));});
test('a failed Explore recording reveals a visible fallback',async()=>{const h=await harness();const fallback={hidden:true},audio={hidden:false,nextElementSibling:fallback,matches:s=>s==='audio[data-explore-audio]'};h.get('#main').listeners.error({target:audio});assert.equal(audio.hidden,true);assert.equal(fallback.hidden,false);});

test('Question Machine announces the actual question and feedback after either piece or a button changes',async()=>{
 const h=await harness();h.route('explore');click(h,'ex-lab',{value:'questions'});
 const change=(id,value)=>h.get('#main').listeners.change({target:{id,value}});
 change('ex-q-lead','Cuántos');let message=h.get('#announcement').textContent;
 assert(message.includes('¿Cuántos te llamas?'));assert(message.includes('Your question and answer don’t quite match.'));
 change('ex-q-tail','años tienes');message=h.get('#announcement').textContent;assert(message.includes('The question itself works'));
 click(h,'ex-q-goal',{value:'age'});assert(h.get('#announcement').textContent.includes('That works!'));
 click(h,'ex-q-punct',{value:'open'});assert(h.get('#announcement').textContent.includes('needs both'));
});

test('Play is reachable without changing academic progress and all games retain state across language switches',async()=>{
 const h=await harness();h.route('play');assert(h.get('#main').innerHTML.includes('pg-catalogue'));
 click(h,'pg-open',{value:'anagrams'});click(h,'pg-letter',{value:'0'});h.mode('bi');assert(h.get('#main').innerHTML.includes('pg-built'));h.route('unit');assert(h.get('#main').innerHTML.includes('No sections marked yet.'));h.route('play');assert(h.get('#main').innerHTML.includes('pg-workbench'));
 click(h,'pg-menu');click(h,'pg-open',{value:'alien'});click(h,'pg-alien-token',{value:'0'});click(h,'pg-alien-send');h.mode('es');assert(h.get('#main').innerHTML.includes('Hola. ¿Cómo te llamas?'));click(h,'pg-menu');click(h,'pg-open',{value:'code'});click(h,'pg-room',{value:'voices'});assert(h.get('#main').innerHTML.includes('Panel de voces en espera'));
});

test('catalogue, all courses, LC levels and U1 sections render in three modes',async()=>{
 const h=await harness();
 for(const mode of ['en','es','bi']){h.mode(mode);for(const route of ['home',...catalogue.courses.map(c=>catalogue.courseHash(c.id)),'course/lc/hl','course/lc/ol',...catalogue.sections.map(s=>catalogue.unitHash(s))]){h.route(route);const html=h.get('#main').innerHTML;assert(html.includes('<h1>'),mode+'/'+route);assert(!html.includes('undefined'));if(mode==='bi')assert(html.includes('lang="en"')&&html.includes('lang="es"'));}}
 h.mode('en');h.route('home');assert.equal((h.get('#main').innerHTML.match(/class="panel course-card"/g)??[]).length,4);
 h.route('course/1st-year');const html=h.get('#main').innerHTML;assert(html.includes('El aula'));assert(html.includes('Block A available'));assert(html.includes('/unit/2/overview'));
 h.route('course/lc');assert(h.get('#main').innerHTML.includes('#course/lc/hl'));assert(h.get('#main').innerHTML.includes('#course/lc/ol'));
});
test('every generated navigation link resolves and unavailable deep links stay outside U1',async()=>{
 const h=await harness();for(const route of ['home','course/1st-year','course/2nd-year','course/3rd-year','course/lc','course/lc/hl','course/lc/ol',...catalogue.sections.map(s=>catalogue.unitHash(s))]){h.route(route);for(const region of ['#main','#nav'])for(const [,hash] of h.get(region).innerHTML.matchAll(/href="#([^"]+)"/g)){const parsed=catalogue.parseRoute(hash);assert.equal(catalogue.routeHash(parsed),hash,route+' → '+hash);}}
 for(const route of ['course/1st-year/unit/2/play','course/2nd-year/unit/1/play','course/lc/hl/unit/1/learn']){h.route(route);assert(!h.get('#main').innerHTML.includes('step-nav'));assert(!h.get('#main').innerHTML.includes('pg-catalogue'));assert.equal(catalogue.parseRoute(h.location.hash).kind,'course');}
});
test('navigation away and back retains answers, writing, games and U1 completion without leaking into another course',async()=>{
 const h=await harness();h.route('communicate');h.get('#main').listeners.input({target:{id:'draft',value:'Fictional draft'}});click(h,'mission-complete');h.route('play');click(h,'pg-open',{value:'anagrams'});click(h,'pg-letter',{value:'0'});
 h.route('course/2nd-year');assert(!h.get('#main').innerHTML.includes('Fictional draft'));h.route('course/lc/ol');h.route('communicate');assert(h.get('#main').innerHTML.includes('Fictional draft'));h.route('unit');assert(h.get('#main').innerHTML.includes('1 of 4 sections'));h.route('play');assert(h.get('#main').innerHTML.includes('pg-built'));
});
test('legacy U1 data migrates with checkpoints, survives reload, and is never written to a pending unit',async()=>{
 const play=playEngine.newPlayState();playEngine.updatePlay(play,'pg-open','code');play.code.terminal=true;
 const old=JSON.stringify(engine.savedSnapshot({mode:'bi',section:'play',completed:new Set(['learn','explore'])}));const storage=new Map([['tapitas-orilla-v1',old],['tapitas-play-v1',JSON.stringify(playEngine.playSnapshot(play))]]);
 let h=await harness({initialStorage:storage});assert(h.get('#main').innerHTML.includes('Your Spanish journey'));h.route('unit');assert(h.get('#main').innerHTML.includes('2 of 4 sections'));h.route('play');assert(h.get('#main').innerHTML.includes('pg-catalogue'));assert.equal(progress.loadUnitProgress({getItem:k=>storage.get(k)},'1st-year','1').play.code.terminal,true);assert(storage.has(progress.progressKey('1st-year','1')));assert.equal(storage.get('tapitas-orilla-v1'),old);
 h.route('course/1st-year/unit/2/learn');assert(!storage.has(progress.progressKey('1st-year','2')));
 h=await harness({initialStorage:storage,initialHash:'#'+catalogue.unitHash('play')});assert(h.get('#main').innerHTML.includes('pg-catalogue'));assert.equal(progress.loadUnitProgress({getItem:k=>storage.get(k)},'1st-year','1').play.code.terminal,true);
});
test('saving stays opt-in; disabling or forgetting removes only Tapitas practice, including old backups',async()=>{
 const storage=new Map([['other-app','keep']]);const h=await harness({initialStorage:storage});h.route('learn');click(h,'learn-done');assert.equal(storage.size,1);
 const toggle=checked=>h.get('#options').listeners.change({target:{id:'save-progress',checked}});toggle(true);assert(storage.has(progress.progressKey('1st-year','1')));storage.set(progress.progressKey('lc','1','hl'),'{}');storage.set('tapitas-orilla-v1','old');toggle(false);assert.deepEqual([...storage],[['other-app','keep']]);
 toggle(true);h.get('#options').close=()=>{};click(h,'forget');assert.deepEqual([...storage],[['other-app','keep']]);h.route('unit');assert(h.get('#main').innerHTML.includes('No sections marked yet.'));
});
test('blocked and corrupt storage allow learning and show the storage notice',async()=>{
 for(const args of [{blockedStorage:true},{initialStorage:new Map([['tapitas-orilla-v1','broken JSON']])}]){const h=await harness(args);h.route('learn');assert(h.get('#main').innerHTML.includes('Your first Spanish toolkit'));h.get('#options').showModal=()=>{};click(h,'options');assert(h.get('#options-content').innerHTML.includes('could not read or save practice'));}
});

test('Unit 2 Learn A works in every language mode and retains its object selection',async()=>{
 const h=await harness();h.route('course/1st-year/unit/2/learn');
 for(const mode of ['en','bi','es']){h.mode(mode);const html=h.get('#main').innerHTML;assert(html.includes('¿Qué hay en mi mochila?'));assert(html.includes('u2-scene-objects'));assert(!html.includes('pg-catalogue'));assert(!html.includes('undefined'));}
 click(h,'u2-object',{value:'pencil'});assert(h.get('#main').innerHTML.includes('id="u2-object-audio"'));
 h.mode('bi');assert(h.get('#main').innerHTML.includes('1Y_U02_AUD_OBJ_01_v1.mp3'));
 click(h,'u2-group',{value:'tools'});click(h,'u2-object',{value:'scissors'});
 assert(h.get('#main').innerHTML.includes('1Y_U02_AUD_OBJ_11_v1.mp3'));
 click(h,'u2-phrase',{value:'plural'});assert(h.get('#main').innerHTML.includes('id="u2-phrase-audio"'));
 click(h,'u2-quantity',{value:'3'});assert(h.get('#main').innerHTML.includes('Hay tres libros.'));
 click(h,'u2-check',{value:'pencil'});assert(h.get('#main').innerHTML.includes('A single pencil: es un lápiz.'));
 click(h,'u2-next-check');assert(h.get('#main').innerHTML.includes('1Y_U02_AUD_EXP_04_v1.mp3'));
 click(h,'u2-check',{value:'notebooks'});assert(h.get('#main').innerHTML.includes('Several notebooks: son unos cuadernos.'));
 h.route('course/1st-year/unit/1/learn');assert(!h.get('#main').innerHTML.includes('u2-scene-objects'));
 h.route('course/1st-year/unit/2/learn');assert(h.get('#main').innerHTML.includes('1Y_U02_AUD_OBJ_11_v1.mp3'));
});

test('Block B navigation, timetable selection, recordings and answers persist across modes without changing Block A',async()=>{
 const h=await harness();h.route('course/1st-year/unit/2/learn');click(h,'u2-object',{value:'pencil'});
 click(h,'u2b-open');assert(h.get('#main').innerHTML.includes('Mi semana escolar'));
 for(const mode of ['en','es','bi']){h.mode(mode);for(let n=0;n<5;n++){click(h,'u2b-stage',{value:String(n)});assert(!h.get('#main').innerHTML.includes('undefined'));}}
 click(h,'u2b-stage',{value:'1'});click(h,'u2b-subject',{value:'irish'});assert(h.get('#main').innerHTML.includes('1Y_U02_AUD_ASI_15_v1.mp3'));
 click(h,'u2b-stage',{value:'2'});click(h,'u2b-cell',{value:'4:1'});h.mode('en');assert(h.get('#main').innerHTML.includes('1Y_U02_AUD_ASI_04_v1.mp3'));assert(h.get('#main').innerHTML.includes('Tengo cuatro clases.'));
 click(h,'u2b-stage',{value:'4'});click(h,'u2b-answer',{value:'lunes'});h.mode('es');assert(h.get('#main').innerHTML.includes('Dice «Hoy es lunes»'));
 click(h,'u2b-back');assert(h.get('#main').innerHTML.includes('1Y_U02_AUD_OBJ_01_v1.mp3'));
 h.route('learn');assert(h.get('#main').innerHTML.includes('Tus primeras herramientas de español'));assert(!h.get('#main').innerHTML.includes('u2b-blocks'));
});

test('Learn C discovery navigation and selections survive modes while A, B and Unit 1 stay independent',async()=>{
 const h=await harness();h.route('course/1st-year/unit/2/overview');assert(h.get('#main').innerHTML.includes('data-action="u2c-open"'));
 click(h,'u2c-open');h.route('course/1st-year/unit/2/learn');
 for(const mode of ['en','es','bi']){h.mode(mode);for(let n=0;n<5;n++){click(h,'u2c-stage',{value:String(n)});assert(h.get('#main').innerHTML.includes('Learn C'));assert(!h.get('#main').innerHTML.includes('undefined'));}}
 click(h,'u2c-stage',{value:'0'});click(h,'u2c-arrival',{value:'car'});assert(h.get('#main').innerHTML.includes('Normalmente voy en coche con mi padre.'));
 click(h,'u2c-stage',{value:'1'});assert(h.get('#main').innerHTML.includes('Construye la respuesta'));assert(!h.get('#main').innerHTML.includes('u2c-mode-picks'));click(h,'u2c-say-intent',{value:'reason'});click(h,'u2c-say-step',{value:'2'});assert(h.get('#main').innerHTML.includes('Voy andando porque vivo cerca.'));assert(h.get('#main').innerHTML.includes('1Y_U02_AUD_EXP_18_v1.mp3'));assert(!h.get('#main').innerHTML.includes('1Y_U02_AUD_TRA_05_v1.mp3'));
 click(h,'u2c-stage',{value:'3'});assert(h.get('#main').innerHTML.includes('1Y_U02_AUD_EXP_20_v1.mp3'));click(h,'u2c-listen-choice',{value:'near'});assert(h.get('#main').innerHTML.includes('Vivo cerca del colegio.'));click(h,'u2c-phase',{value:'personal'});for(const [action,value] of [['u2c-transport','bus'],['u2c-distance','far'],['u2c-minutes','20']])click(h,action,{value});h.mode('es');assert(h.get('#main').innerHTML.includes('Tardo veinte minutos en llegar.'));assert(!h.get('#main').innerHTML.includes('<audio'));
 click(h,'u2b-open');assert(h.get('#main').innerHTML.includes('Learn B'));assert(!h.get('#main').innerHTML.includes('u2c-content'));
 click(h,'u2b-back');assert(h.get('#main').innerHTML.includes('u2-scene-objects'));
 click(h,'u2c-open');assert(h.get('#main').innerHTML.includes('Tardo veinte minutos en llegar.'));
 h.route('course/1st-year/unit/1/learn');assert(!h.get('#main').innerHTML.includes('u2c-content'));assert(!h.get('#main').innerHTML.includes('u2b-blocks'));
});
test('failed Learn C audio reveals a visible error without a synthetic replacement',async()=>{
 const h=await harness();const fallback={hidden:true},audio={hidden:false,nextElementSibling:fallback,matches:s=>s==='audio[data-journey-audio]'};h.get('#main').listeners.error({target:audio});assert.equal(audio.hidden,true);assert.equal(fallback.hidden,false);
});
test('Learn C prevents overlapping recordings and pauses playback on discovery changes',async()=>{
 const h=await harness();h.route('course/1st-year/unit/2/learn');click(h,'u2c-open');let pauses=0;
 const a={pause(){pauses++;},matches:s=>s==='audio[data-journey-audio]'},b={pause(){pauses++;}};
 h.get('#main').querySelectorAll=s=>s==='audio[data-journey-audio]'?[a,b]:[];
 h.get('#main').listeners.play({target:a});assert.equal(pauses,1);
 click(h,'u2c-stage',{value:'1'});assert.equal(pauses,3);
});
test('Learn D opens within Unit 2, keeps its state across modes and returns to approved blocks',async()=>{
 const h=await harness();h.route('course/1st-year/unit/2/overview');
 assert(h.get('#main').innerHTML.includes('Open Block D'));
 h.route('course/1st-year/unit/2/learn');click(h,'u2d-open');
 assert(h.get('#main').innerHTML.includes('Un día de colegio en España'));
 click(h,'u2d-stage',{value:'1'});click(h,'u2d-day',{value:'4'});
 assert(h.get('#main').innerHTML.includes('13:15'));
 h.mode('es');assert(h.get('#main').innerHTML.includes('Entrada y salida'));
 assert(h.get('#main').innerHTML.includes('D · Un día de colegio en Cádiz'));
 click(h,'u2d-stage',{value:'2'});
 const libraryClick=(id,kind)=>h.document.body.listeners.click({target:{closest:()=>({dataset:{action:'select',id},closest:()=>({dataset:{libraryKind:kind}})})}});
 assert(!h.get('#main').innerHTML.includes('class="activity-transcript"'));
 libraryClick('friday','listening');assert(!h.get('#main').innerHTML.includes('class="activity-transcript"'));
 libraryClick('monday','listening');assert(h.get('#main').innerHTML.includes('Hoy es lunes.'));
 h.mode('bi');assert(h.get('#main').innerHTML.includes('class="activity-transcript"'));
 click(h,'u2b-open');assert(h.get('#main').innerHTML.includes('Mi semana escolar'));
 click(h,'u2c-open');assert(h.get('#main').innerHTML.includes('¿Cómo voy al colegio?'));
 click(h,'u2b-back');assert(h.get('#main').innerHTML.includes('¿Qué hay en mi mochila?'));
});
