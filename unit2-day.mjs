import {initialState,transition} from './activity-library/contract.mjs';
import {renderActivity} from './activity-library/renderer.mjs';
import {cadizDiscovery,cadizListening,cadizModel,irishModel,comparisons,cultureCards} from './unit2-day-data.mjs';

export const newDayState=()=>({open:false,stage:0,day:0,compare:'hours',sort:{},
  discovery:initialState(),listening:initialState()});

export function updateDayState(state,action,value,kind){
  if(action==='u2d-open'){state.open=true;return true;}
  if(action==='u2d-stage'&&/^[0-3]$/.test(value)){state.stage=Number(value);return true;}
  if(action==='u2d-day'&&/^[0-4]$/.test(value)){state.day=Number(value);return true;}
  if(action==='u2d-compare'&&comparisons[value]){state.compare=value;return true;}
  if(action==='u2d-sort'&&cultureCards.some(card=>card.id===value?.split(':')[0])&&['model','general'].includes(value?.split(':')[1])){
    const [id,answer]=value.split(':');state.sort[id]=answer;return true;
  }
  if(['select','next'].includes(action)&&['discovery','listening'].includes(kind)){
    const activity=kind==='discovery'?cadizDiscovery:cadizListening;
    const before=state[kind];
    const next=action==='next'&&before.index===activity.items.length-1&&before.status==='correct'
      ?initialState():transition(activity,before,{type:action,id:value});
    if(next===before)return false;
    state[kind]=next;return true;
  }
  return false;
}

// Kept here so approved Learn A/B/C renderers and state handlers remain untouched.
export function renderDayNav({L,button,week,journey,day}){
  const tabs=[['u2b-back','A · What is in my school bag?','A · ¿Qué hay en mi mochila?',!week.open&&!journey.open&&!day.open],
    ['u2b-open','B · My school week','B · Mi semana escolar',week.open&&!journey.open&&!day.open],
    ['u2c-open','C · How do I get to school?','C · ¿Cómo voy al colegio?',journey.open&&!day.open],
    ['u2d-open','D · A school day in Cádiz','D · Un día de colegio en Cádiz',day.open]];
  return `<nav class="u2b-blocks" aria-label="Learn blocks / Bloques de Learn">${tabs.map(([action,en,es,on])=>button(action,L(en,es),on?'active':'',`aria-pressed="${on}"`)).join('')}</nav>`;
}

export function renderDayOverviewCard({L}){return `<section class="page"><div class="panel"><p class="eyebrow">Learn · D</p><h2 lang="es">Un día de colegio en España</h2><p>${L('Meet Lucía at a fictional school in Cádiz and compare two school days.','Conoce a Lucía en un instituto ficticio de Cádiz y compara dos jornadas escolares.')}</p><a class="primary" href="#course/1st-year/unit/2/learn" data-action="u2d-open">${L('Open Block D','Abrir el Bloque D')}</a></div></section>`;}

const renderTimetable=(model,day,L,title,isCadiz)=>{
  const subjects=model.week[day];
  const row=(i)=>`<li class="u2d-slot"><time>${model.times[i]}</time><span>${L(model.subject(subjects[i]).en,model.subject(subjects[i]).es)}</span></li>`;
  const breakRow=(label,time)=>`<li class="u2d-slot rest"><time>${time}</time><strong>${L(...label)}</strong></li>`;
  const rows=subjects.map((_,i)=>{
    const after=i===2&&isCadiz?breakRow(['Morning break','Recreo'],'11:15–11:45'):
      i===1&&!isCadiz?breakRow(['Morning break','Descanso'],'11:00–11:15'):
      i===3&&!isCadiz&&day<4?breakRow(['Lunch','Almuerzo'],'13:15–13:55'):'';
    return row(i)+after;
  }).join('');
  return `<section class="u2d-timetable" aria-label="${title}"><h3>${title}</h3><p>${L(...(isCadiz?['Fictional 1.º ESO · Lucía','1.º de ESO ficticio · Lucía']:['Approved Irish example from Block B','Ejemplo irlandés aprobado del Bloque B']))}</p><ol>${rows}</ol><p class="u2d-finish">${L('End of school day','Fin de la jornada')}: ${isCadiz?'14:45':day===4?'13:15':'15:55'}</p></section>`;
};

export function renderUnit2Day({L,T,button,state}){
  const mode=state.mode;
  const names=[['A school in Cádiz','Un instituto en Cádiz'],['Two days, two countries','Dos jornadas, dos países'],
    ['Listen and discover','Escucha y descubre'],['Are all schools alike?','¿Todos los institutos son iguales?']];
  const nav=`<nav class="u2d-stages" aria-label="${T('Four discoveries','Cuatro descubrimientos')}">${names.map(([en,es],i)=>button('u2d-stage',`${i+1}. ${L(en,es)}`,state.stage===i?'active':'',`data-value="${i}" aria-current="${state.stage===i?'step':'false'}"`)).join('')}</nav>`;
  let content='';
  if(state.stage===0)content=`<section class="u2d-panel"><h2>${L(...names[0])}</h2><div class="u2d-intro"><svg viewBox="0 0 200 160" role="img" aria-label="${T('Drawing of a secondary school','Dibujo de un instituto')}"><use href="assets/illustrations/unit2-journeys.svg#school"></use></svg><p>${L('Lucía studies in 1.º de ESO at the imaginary IES Bahía de Cádiz. Her week includes Mathematics and English, as well as subjects with longer names. This is one possible timetable, not a timetable for every school in Spain.',
    'Lucía estudia 1.º de ESO en el IES Bahía de Cádiz, un instituto imaginario. Tiene Matemáticas e Inglés, y otras asignaturas con nombres más largos. Es un horario posible, no el horario de todos los institutos de España.')}</p></div><p>${L('In her timetable, Geografía e Historia is one subject. She also studies Lengua Castellana y Literatura and Biología y Geología. The drawings below play only the short words recorded for them.',
    'En su horario, Geografía e Historia es una sola asignatura. También estudia Lengua Castellana y Literatura y Biología y Geología. Los dibujos de abajo reproducen solo las palabras breves grabadas.')}</p><div class="u2d-library" data-library-kind="discovery">${renderActivity(cadizDiscovery,state.discovery,mode,'')}</div></section>`;
  if(state.stage===1){const day=state.day,compare=comparisons[state.compare];content=`<section class="u2d-panel"><h2>${L(...names[1])}</h2><p>${L('Choose a day to see both timetables side by side. The Irish timetable is the same model used in Block B. Times are here to compare, not to say in Spanish.',
    'Elige un día para ver los dos horarios. El horario irlandés es el mismo modelo del Bloque B. Las horas sirven para comparar; no tienes que decirlas en español.')}</p><div class="u2d-days" role="group" aria-label="${T('Choose a weekday','Elige un día')}">${cadizModel.days.map((item,i)=>button('u2d-day',L(item.en,item.name),'',`data-value="${i}" aria-pressed="${day===i}"`)).join('')}</div><div class="u2d-pair">${renderTimetable(cadizModel,day,L,'IES Bahía de Cádiz · Lucía',true)}${renderTimetable(irishModel,day,L,T('Irish school · Block B','Instituto irlandés · Bloque B'),false)}</div><div class="u2d-compare"><h3>${L('Look more closely','Mira con atención')}</h3><div role="group" aria-label="${T('Comparison focus','Aspecto de comparación')}">${Object.entries(comparisons).map(([id,value])=>button('u2d-compare',L(value.en,value.es),'',`data-value="${id}" aria-pressed="${state.compare===id}"`)).join('')}</div><p role="status">${L(compare.detail.en,compare.detail.es)}</p></div></section>`;}
  if(state.stage===2)content=`<section class="u2d-panel"><h2>${L(...names[2])}</h2><p>${L('Here are two short phrases you have heard before. They mention a day and a subject that also appear in Lucía’s timetable. Listen for the words, then choose.',
    'Aquí tienes dos frases breves que ya has escuchado. Mencionan un día y una asignatura que aparecen en el horario de Lucía. Escucha y elige.')}</p><div class="u2d-library" data-library-kind="listening">${renderActivity(cadizListening,state.listening,mode,'')}</div></section>`;
  if(state.stage===3)content=`<section class="u2d-panel"><h2>${L(...names[3])}</h2><p>${L('Sort each statement. Does it describe the two examples, or does it make a claim about every school? Tap a label and read what you found.',
    'Clasifica cada frase. ¿Describe los dos ejemplos o habla de todos los institutos? Toca una etiqueta y lee lo que has descubierto.')}</p><div class="u2d-sort">${cultureCards.map(card=>{const choice=state.sort[card.id],right=choice===card.answer;return `<article><p>${L(card.statement.en,card.statement.es)}</p><div role="group" aria-label="${T('Classify statement','Clasifica la frase')}">${[['model','In these timetables','En estos horarios'],['general','Claim about every school','Afirmación sobre todos']].map(([id,en,es])=>button('u2d-sort',L(en,es),'',`data-value="${card.id}:${id}" aria-pressed="${choice===id}"`)).join('')}</div>${choice?`<p class="u2d-sort-feedback ${right?'correct':'incorrect'}" role="status">${L(right?card.feedback.en:'Look at the words “all” and “both” and try again. / '+card.feedback.en,right?card.feedback.es:'Fíjate en «todos» y «dos», y vuelve a intentarlo. / '+card.feedback.es)}</p>`:''}</article>`}).join('')}</div></section>`;
  const next=state.stage<3?button('u2d-stage',L('Next discovery','Siguiente descubrimiento'),'primary',`data-value="${state.stage+1}"`):'';
  return `<div class="page u2d"><p class="eyebrow">1st Year · Unit 2 · Learn D</p><h1 id="u2d-title" tabindex="-1" lang="es">Un día de colegio en España</h1><p class="lead">${L('Spend a school day with Lucía in an imaginary institute in Cádiz. Compare, listen and ask what can change between schools.',
    'Acompaña a Lucía en un instituto imaginario de Cádiz. Compara, escucha y descubre qué puede cambiar entre centros.')}</p>${nav}${content}<div class="flow-actions">${next}<a class="ghost" href="#course/1st-year/unit/2/overview">${L('Back to Unit 2','Volver a la Unidad 2')}</a></div></div>`;
}
