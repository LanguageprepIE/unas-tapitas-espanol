import {teachingMarkup} from './engine.mjs';
import {unitHash} from './catalogue.mjs';
import {coreObjects,coreSubjects,extraRecordings,objectSprite,timetable,practiceRounds,resources,resourceById,resourceTypes,findResources,grade,game,agreementModels} from './data/el-aula.mjs';
import {schoolDays} from './unit2-week-data.mjs';
import {journeyModes} from './unit2-journey-data.mjs';

export const aulaSections=[
 ['learn','Learn','Aprende'],['explore','Explore','Explora'],['practise','Practise','Practica'],
 ['communicate','Communicate','Comunica'],['play','Play','Juega']
];
export const aulaHash=id=>unitHash(id,'1st-year','2');
export const resourceHash=id=>'library/'+id;
export const inlineLabel=(mode,E,en,es)=>mode==='bi'
 ?`<span lang="en">${E(en)}</span> · <span lang="es">${E(es)}</span>`
 :`<span lang="${mode==='es'?'es':'en'}">${E(mode==='es'?es:en)}</span>`;
export function aulaTabs({section,mode,E,T}){
 return `<nav class="step-nav" aria-label="${E(T('Unit sections','Apartados de la unidad'))}">${aulaSections.map(([id,en,sp],i)=>`<a href="#${aulaHash(id)}"${id===section?' aria-current="page"':''}>${i+1}. ${inlineLabel(mode,E,en,sp)}</a>`).join('')}</nav>`;
}
export const newAula=()=>({round:0,steps:{},answers:{},feedback:{},draft:'',checks:{},pair:'solo',cardReady:false,
 game:{step:0,picks:[]},library:{q:'',type:'',level:''},notes:{},disclosures:new Set()});
const current=(s,list,key)=>list[s.steps[key]??0];
const quizAt=(s,section,id)=>{
 if(section==='library'){
  const resource=resourceById(id);
  return resource?{list:resource.items,key:'resource-'+id}:null;
 }
 if(section==='practise'){
  const round=practiceRounds[s.round];return {list:round.items,key:round.id};
 }
 return null;
};
export function updateAula(s,section,id,action,value){
 const quiz=quizAt(s,section,id);
 if(section==='practise'&&action==='round'&&practiceRounds[Number(value)]){
  s.round=Number(value);return 'aula-task-title';
 }
 if(quiz){
  const {list,key}=quiz,item=current(s,list,key);
  if(action==='answer'&&item.options?.includes(value)){
   s.answers[item.id]=value;delete s.feedback[item.id];return 'aula-choice-'+item.options.indexOf(value);
  }
  if(action==='check'){
   s.feedback[item.id]=grade(item,s.answers[item.id]);return 'aula-feedback';
  }
  if(action==='previous'||action==='next'){
   const start=s.steps[key]??0;
   s.steps[key]=Math.min(list.length-1,Math.max(0,start+(action==='next'?1:-1)));return 'aula-question';
  }
 }
 if(section==='communicate'&&action==='pair'&&['solo','A','B'].includes(value)){
  s.pair=value;return 'aula-role-'+value;
 }
 if(section==='communicate'&&(action==='finish-card'||action==='edit-card')){
  if(action==='finish-card'&&!s.draft.trim())return 'aula-draft';
  s.cardReady=action==='finish-card';return s.cardReady?'aula-card-preview':'aula-draft';
 }
 if(section==='play'){
  const g=s.game,scene=game[g.step];
  if(action==='pick'&&scene?.options.some(x=>x.id===value)){g.picks[g.step]=value;return 'aula-consequence';}
  if(action==='continue'&&scene?.options.some(x=>x.id===g.picks[g.step]&&x.ready)){g.step++;return 'aula-task-title';}
  if(action==='replay'){s.game={step:0,picks:[]};return 'aula-task-title';}
 }
 return null;
}
export function editAula(s,section,id,name,value){
 const quiz=quizAt(s,section,id);
 if(name==='aula-reply'&&quiz){
  const item=current(s,quiz.list,quiz.key);s.answers[item.id]=value;delete s.feedback[item.id];return true;
 }
 if(section==='communicate'&&name==='aula-draft'){s.draft=value;return true;}
 if(section==='library'&&name==='aula-note'&&resourceById(id)){s.notes[id]=value;return true;}
 return false;
}

export function aulaUI({L,T,E,button,mode,state:s}){
 const pair=x=>L(...x),es=text=>`<span lang="es">${E(text)}</span>`;
 // Use the platform's existing explicit Spanish emphasis syntax.
 const teaching=([en,sp])=>L(teachingMarkup(en),mode==='es'?E(sp.replace(/\*\*/g,'')):teachingMarkup(sp));
 const example=text=>mode==='es'?es(text):`<strong lang="es">${E(text)}</strong>`;
 const act=(id,label,cls='',extra='')=>button('aula-'+id,Array.isArray(label)?pair(label):es(label),cls,extra);
 const nav=section=>`<nav class="breadcrumb" aria-label="${E(T('Breadcrumb','Ruta'))}"><a href="#course/1st-year">1st Year</a> / <a href="#${aulaHash('overview')}">Unit 2 · El aula</a></nav>${aulaTabs({section,mode,E,T})}`;
 const unitLinks=(i,section)=>`<div class="flow-actions"><a class="primary" href="#${aulaHash(section)}">${pair(i)}</a></div>`;
 const describe=(key,label,body)=>`<details class="hint aula-details" data-aula-details="${key}"${s.disclosures.has(key)?' open':''}><summary id="aula-${key}">${pair(label)}</summary>${body}</details>`;
 const help=(ids,context)=>`<aside class="aula-helps" aria-label="${E(T('Help with this activity','Ayuda para esta actividad'))}"><p class="eyebrow">${pair(['Useful help','Ayuda útil'])}</p>${ids.map(id=>{
  const r=resourceById(id),key=`help-${context}-${id}`;
  return describe(key,r.title,`<p>${teaching(r.quick)}</p><a class="aula-textlink" href="#${resourceHash(id)}" data-action="aula-resource" data-id="${id}" id="aula-open-${context}-${id}">${pair(['Explanation and practice','Explicación y práctica'])}</a>`);
 }).join('')}</aside>`;
 const panel=(title,body)=>`<section class="panel"><h2>${pair(title)}</h2>${body}</section>`;
 const gloss=word=>T('en','es')==='es'?'':`<p lang="en">${E(word)}</p>`;
 const audio=(record,tag,showText=true)=>`<audio controls preload="none" src="${E(record.src)}" aria-label="${E(T('Spanish recording','Grabación en español'))}"></audio>${showText?describe('text-'+tag,['Read instead','Leer en su lugar'],`<p>${es(record.text)}</p>`):''}`;
 const picture=(icon,alt)=>`<svg viewBox="0 0 160 140" class="aula-icon" role="img" aria-label="${E(T(...alt))}"><use href="${objectSprite}#${E(icon)}"></use></svg>`;
 const schedule=(firstOnly=false)=>`<div class="aula-table"><table><caption>${pair(['Host school in Ireland · first classes','Centro irlandés · primeras clases'])}</caption><thead><tr><th scope="col">${pair(['Time','Hora'])}</th>${(firstOnly?timetable.slice(0,1):timetable).map(d=>`<th scope="col">${es(d.day)}</th>`).join('')}</tr></thead><tbody>${timetable[0].rows.map(([time],i)=>`<tr><th scope="row">${time}</th>${(firstOnly?timetable.slice(0,1):timetable).map(d=>`<td>${es(d.rows[i][1])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 function quiz({list,key}){
  const item=current(s,list,key),idx=s.steps[key]??0,answer=s.answers[item.id]??'',state=s.feedback[item.id];
  const status={empty:['Choose or write an answer first.','Primero elige o escribe una respuesta.'],accent:['Almost: check the accent mark.','Casi: revisa la tilde.'],retry:['Have another go.','Prueba otra vez.'],correct:['That fits.','Encaja.']}[state];
  const correct=`<p>${pair(['Model:','Modelo:'])} ${example(item.answers[0])}</p><p>${teaching(item.why)}</p>`;
  return `<div class="aula-quiz"><h3 id="aula-question" tabindex="-1">${teaching(item.prompt)} <small>${idx+1} / ${list.length}</small></h3>
  ${item.table?schedule():''}${item.source?`<p class="spanish">${es(item.source)}</p>`:''}${item.image?picture(item.image,item.alt):''}${item.audio?audio(item.audio,item.id):''}
  ${item.options?`<div class="choices" role="group" aria-labelledby="aula-question">${item.options.map((v,i)=>act('answer',v,'choice',`id="aula-choice-${i}" data-value="${E(v)}" aria-pressed="${v===answer}"`)).join('')}</div>`:`<label for="aula-reply">${pair(['Your answer in Spanish','Tu respuesta en español'])}</label><input id="aula-reply" class="input" lang="es" autocomplete="off" value="${E(answer)}">`}
  <div class="flow-actions">${act('check',['Check','Comprueba'],'primary')}</div>
  <div id="aula-feedback" tabindex="-1"${status?'':' hidden'} class="feedback ${state==='retry'?'error':''}">${status?`<strong>${pair(status)}</strong>${state==='correct'?correct:state==='empty'?'':`<p>${teaching(item.hint)}</p>${describe('model-'+item.id,['See the explanation','Ver la explicación'],correct)}`}`:''}</div>
  <div class="flow-actions">${act('previous',['Previous','Anterior'],'ghost',idx===0?'disabled':'')}${act('next',['Next','Siguiente'],'ghost',idx===list.length-1?'disabled':'')}</div></div>`;
 }
 function bank(r){
  if(r.bank==='objects')return describe('bank-objects',['Pictures and recordings','Imágenes y grabaciones'],`<ul class="aula-tiles">${coreObjects.map(o=>`<li>${picture(o.icon,[o.meaning,o.name])}<p>${es(o.name)}</p>${gloss(o.meaning)}${audio({src:o.audio,text:o.name},o.id,false)}</li>`).join('')}</ul>`);
  if(r.bank==='agreement')return `<ul>${agreementModels.map(n=>`<li>${es(n.name+' → '+(n.gender==='m'?'unos ':'unas ')+n.plural)}</li>`).join('')}</ul>`;
  if(r.bank==='school')return describe('bank-school',['Listen to days and subjects','Escucha los días y las asignaturas'],`<ul class="aula-tiles">${[...schoolDays,...coreSubjects].map(v=>`<li><p>${es(v.name)}</p>${gloss(v.en)}${audio({src:v.audio,text:v.recorded??v.name},v.name,false)}</li>`).join('')}</ul>`);
  if(r.bank==='journeys')return describe('bank-journeys',['Listen to transport and useful phrases','Escucha los transportes y algunas expresiones'],`<ul class="aula-tiles">${[...journeyModes.filter(x=>x.audioAvailable).map(x=>({src:x.segmentAudio,text:x.words,en:x.en})),...Object.values(extraRecordings)].map(a=>`<li><p>${es(a.text)}</p>${a.en?gloss(a.en):''}${audio(a,a.text,false)}</li>`).join('')}</ul>`);
  return '';
 }
 const options=(values,initial)=>values.map(([v,txt])=>`<option value="${E(v)}"${initial===v?' selected':''}>${E(txt)}</option>`).join('');
 const hits=()=>findResources(s.library.q,s.library.type,s.library.level).map(r=>`<li class="panel"><h2><a href="#${resourceHash(r.id)}">${pair(r.title)}</a></h2><p class="small">${pair(resourceTypes[r.type])} · 1st Year</p><p>${teaching(r.quick)}</p></li>`).join('');
 function library(id,back){
  const r=resourceById(id);
  if(!r){
   const found=hits();
   return `<div class="page aula"><h1>${pair(['Resource library','Biblioteca de recursos'])}</h1>${back}<p class="lead">${pair(['Find an explanation and try it out, at your own pace.','Busca una explicación y ponla en práctica a tu ritmo.'])}</p>
   <div class="aula-filters"><label for="aula-search">${pair(['Search by topic or word','Busca por tema o palabra'])}</label><input type="search" id="aula-search" class="input" value="${E(s.library.q)}">
   <div class="aula-filter-row"><label for="aula-type">${pair(['Type','Tipo'])}</label><select id="aula-type">${options([['',T('All types','Todos los tipos')],...Object.entries(resourceTypes).map(([id,t])=>[id,T(...t)])],s.library.type)}</select>
   <label for="aula-level">${pair(['Level','Nivel'])}</label><select id="aula-level">${options([['',T('All levels','Todos los niveles')],...Array.from(new Set(resources.map(r=>r.level))).map(id=>[id,id==='1st-year'?'1st Year':id])],s.library.level)}</select></div></div>
   <ul class="aula-results" id="aula-results">${found}</ul><p id="aula-no-matches"${found?' hidden':''}>${pair(['No results. Try another word or remove a filter.','No hay resultados. Prueba otra palabra o quita un filtro.'])}</p></div>`;
  }
  return `<div class="page aula"><nav class="breadcrumb"><a id="aula-index" href="#library">${pair(['Library','Biblioteca'])}</a></nav><h1>${pair(r.title)}</h1>${back}
  ${panel(['Notice the pattern','Fíjate en el patrón'],r.lesson.map(p=>`<p>${teaching(p)}</p>`).join('')+bank(r))}
  ${panel(['Practise','Practica'],quiz({list:r.items,key:'resource-'+id}))}
  ${panel(['Use it','Ponlo en práctica'],`<p>${teaching(r.apply)}</p><label for="aula-note">${pair(['Notes in Spanish (optional)','Notas en español (opcional)'])}</label><textarea id="aula-note" lang="es" class="input">${E(s.notes[id]??'')}</textarea>${describe('review-'+id,['Review your work','Revisa tu trabajo'],`<p>${teaching(r.review)}</p>`)}`)}</div>`;
 }
 function practise(){
  const round=practiceRounds[s.round];
  return `<p class="lead">${pair(['Prepare for Lucía’s first morning. Choose a short set and try again as often as you like.','Prepara la primera mañana de Lucía. Elige una tanda breve y repítela cuando quieras.'])}</p><div class="chips" role="group" aria-label="${E(T('Choose a practice set','Elige una tanda de práctica'))}">${practiceRounds.map((r,i)=>act('round',r.title,s.round===i?'primary':'',`data-value="${i}" aria-pressed="${s.round===i}"`)).join('')}</div>
  <section class="panel aula-space"><h2 id="aula-task-title" tabindex="-1">${pair(round.title)}</h2>${round.table?schedule():''}${quiz({list:round.items,key:round.id})}${help(round.help,'practice-'+round.id)}</section>
  ${unitLinks(['Prepare the card for Lucía','Prepara la tarjeta para Lucía'],'communicate')}`;
 }
 function communicate(){
  const solo=s.pair==='solo',a=solo||s.pair==='A',b=solo||s.pair==='B';
  const sourcesA=`<h3>${pair(['School sources','Información del centro'])}</h3>${schedule(true)}<p class="spanish">${es('Nota de la primera clase: un cuaderno y una goma.')}</p>`;
  const sourcesB=`<h3>${pair(['Lucía’s notes','Notas de Lucía'])}</h3><dl class="aula-facts"><dt>${pair(['Preference','Preferencia'])}</dt><dd>${es('las ciencias')}</dd><dt>${pair(['Transport','Transporte'])}</dt><dd>${es('en autobús')}</dd></dl>`;
  const checks=[['I included the day and first class.','He incluido el día y la primera clase.'],['The material matches the notice.','El material coincide con el aviso.'],['I wrote how Lucía gets to school and what she likes.','He escrito cómo va Lucía al instituto y qué le gusta.'],['I checked the articles and whether to use **gusta** or **gustan**.','He revisado los artículos y si corresponde gusta o gustan.']];
  return `<p class="lead">${pair(['Lucía is visiting a fictional school in Ireland. Write her a short card to help her on her first morning.','Lucía visita un instituto irlandés ficticio. Escríbele una tarjeta breve que le sirva para su primera mañana.'])}</p><p>${pair(['Use the Irish timetable here. The Cádiz timetable in Learn D is a separate example.','Usa el horario irlandés de aquí. El de Cádiz, en Learn D, es otro ejemplo.'])}</p>
  <div class="chips" role="group" aria-label="${E(T('How to work','Modo de trabajo'))}">${[['solo','On my own','Por mi cuenta'],['A','Pair: role A','En pareja: papel A'],['B','Pair: role B','En pareja: papel B']].map(([id,en,sp])=>act('pair',[en,sp],s.pair===id?'primary':'',`id="aula-role-${id}" data-value="${id}" aria-pressed="${s.pair===id}"`)).join('')}</div>
  <p class="aula-space">${solo?pair(['Read both sources. Choose the details the card needs.','Lee las dos fuentes. Elige qué datos necesita la tarjeta.']):s.pair==='A'?pair(['Keep your source to yourself at first. Ask B how Lucía gets to school and what she likes.','Al principio no enseñes tu fuente. Pregunta a B cómo va Lucía al instituto y qué le gusta.']):pair(['Keep your source to yourself at first. Ask A what class comes first and what to bring.','Al principio no enseñes tu fuente. Pregunta a A qué asignatura hay primero y qué material hace falta.'])}</p>
  <div class="aula-source-grid">${a?`<section class="panel">${sourcesA}</section>`:''}${b?`<section class="panel">${sourcesB}</section>`:''}</div>
  ${panel(['Write the welcome card','Escribe la tarjeta de bienvenida'],`<p>${pair(['Include the day and first lesson, the material, how Lucía gets to school and one preference. Use short sentences in Spanish.','Incluye el día y la primera clase, el material, cómo va Lucía al instituto y una preferencia. Usa frases breves en español.'])}</p>
  ${!s.cardReady?`${describe('card-starters',['Optional sentence starters','Inicios de frase opcionales'],`<ul><li>${example('El lunes…')}</li><li>${example('Material: un… / una…')}</li><li>${example('Lucía va…')}</li><li>${example('A Lucía le…')}</li></ul>`)}
  <label for="aula-draft">${pair(['Your card in Spanish','Tu tarjeta en español'])}</label><textarea id="aula-draft" lang="es" class="input">${E(s.draft)}</textarea><p class="small">${pair(['Your draft stays in this tab until you reload or close it.','El borrador se conserva en esta pestaña hasta que recargues o cierres.'])}</p><div class="flow-actions">${act('finish-card',['View my card','Ver mi tarjeta'],'primary')}</div>`:`<div class="output" id="aula-card-preview" tabindex="-1"><h3>${pair(['Your card for Lucía','Tu tarjeta para Lucía'])}</h3><p lang="es" class="aula-card-text">${E(s.draft)}</p>${act('edit-card',['Edit my card','Editar mi tarjeta'],'ghost')}</div>`}
  ${describe('card-review',['Check your card','Revisa tu tarjeta'],`<p>${solo?pair(['Compare with both sources before you finish.','Contrasta la tarjeta con las dos fuentes antes de terminar.']):pair(['Compare both sources together when you have finished.','Cuando terminéis, comparad juntos las dos fuentes.'])}</p><div class="checklist">${checks.map((label,i)=>`<label><input type="checkbox" data-aula-check="${i}"${s.checks[i]?' checked':''}><span>${teaching(label)}</span></label>`).join('')}</div>`)}
  ${help(['objects','agreement','school-week','gustar','journeys'],'card')}`)}
  ${unitLinks(['Try what happens when the plan changes','Prueba qué pasa si cambia el plan'],'play')}`;
 }
 function play(){
  const g=s.game,scene=game[g.step];
  const picked=i=>game[i].options.find(x=>x.id===g.picks[i]);
  if(!scene)return `<section class="panel"><h2 id="aula-task-title" tabindex="-1">${pair(['Lucía is ready for the morning','Lucía está preparada para la mañana'])}</h2><ul>${game.map((entry,i)=>`<li><strong>${pair(entry.title)}</strong> · ${teaching(picked(i).effect)}</li>`).join('')}</ul><p>${pair(['Try another way to pack, another route or another welcome table. Compare how Lucía’s morning changes.','Prueba otra manera de preparar la mochila, otro trayecto u otra mesa de bienvenida. Compara cómo cambia la mañana de Lucía.'])}</p>${act('replay',['Try another plan','Prueba otro plan'],'primary')}</section>`;
  const choice=picked(g.step);
  return `<p class="lead">${pair(['Plans change. Help Lucía adapt. Explore the consequences before moving on.','Hay un cambio de planes. Ayuda a Lucía a adaptarse. Explora las consecuencias antes de seguir.'])}</p><section class="panel"><p class="eyebrow">${pair(['Decision','Decisión'])} ${g.step+1} / ${game.length}</p><h2 tabindex="-1" id="aula-task-title">${pair(scene.title)}</h2>
  ${g.step>0?`<p class="notice">${teaching(picked(g.step-1).effect)}</p>`:''}<p>${pair(scene.scene)}</p>${scene.source?`<p class="spanish">${es(scene.source)}</p>`:''}
  <div class="choices" role="group" aria-labelledby="aula-task-title">${scene.options.map(v=>act('pick',v.label,'choice',`data-value="${E(v.id)}" aria-pressed="${choice?.id===v.id}"`)).join('')}</div>
  ${choice?`<div id="aula-consequence" tabindex="-1" class="feedback"><h3>${pair(['What happens now?','¿Qué pasa ahora?'])}</h3><p>${teaching(choice.effect)}</p></div>`:''}
  ${choice?.ready?`<div class="flow-actions">${act('continue',g.step===game.length-1?['See the final plan','Ver el plan final']:['Continue','Continúa'],'primary')}</div>`:''}
  ${help([scene.help],'game-'+g.step)}</section>`;
 }
 const views={practise,communicate,play};
 const title={practise:['Prepare for the morning','Prepara la mañana'],communicate:['A card for Lucía','Una tarjeta para Lucía'],play:['Change of plans','Cambio de planes']};
 const view=section=>`<div class="page aula">${nav(section)}<header><p class="eyebrow">${pair(['The first day of an exchange student','El primer día de una alumna de intercambio'])}</p><h1>${pair(title[section])}</h1></header>${views[section]()}</div>`;
 return {library,view,hits};
}
