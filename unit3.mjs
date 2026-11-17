import {months,monthDays,numbers,dateForms,people,lessons,profilesResources,e01,e02,gradeAnswer,clips,f03Model,unavailableClips,weekdays,bagColours,bagPhrase,traits,describeTrait,hairExamples,eyeExamples} from './data/unit3.mjs';
import {teachingMarkup} from './engine.mjs';
import {inlineLabel,aulaSections} from './el-aula.mjs';
import {unitHash} from './catalogue.mjs';

const hash=s=>unitHash(s,'1st-year','3');
const pairQuestions=[
 ['e-topic','What are they talking about?','¿De qué hablan?',['cumpleaños','del cumpleaños','de los cumpleaños','birthday','birthdays'],'Listen for the topic in the opening question.','Escucha el tema en la pregunta inicial.'],
 ['e-carla','When is Carla’s birthday?','¿Cuándo es el cumpleaños de Carla?',['23/05','23/5','23 de mayo','el veintitrés de mayo','veintitrés de mayo'],'Carla speaks after Hugo asks her.','Carla habla después de que Hugo le pregunte.'],
 ['e-hugo','When is Hugo’s birthday?','¿Cuándo es el cumpleaños de Hugo?',['30/05','30/5','30 de mayo','el treinta de mayo','treinta de mayo'],'Listen to the first answer, before the question is passed back.','Escucha la primera respuesta, antes de que se devuelva la pregunta.'],
 ['e-detail','Which visible clue is Hugo’s?','¿Qué pista visible corresponde a Hugo?',['gafas','lleva gafas','glasses'],'Separate character from something you can see.','Distingue el carácter de algo que se puede ver.']
];
const recovery=[
 ['p1','Write 22 in Spanish.','Escribe 22 con letras.',['veintidós'],'The numbers in the twenties use one word. Check the stressed syllable.','Los números de esta serie se escriben en una palabra. Fíjate en la sílaba tónica.'],
 ['p2','Write 26 in Spanish.','Escribe 26 con letras.',['veintiséis'],'Join the parts and check the accent on the last syllable.','Une las partes y revisa la tilde de la última sílaba.'],
 ['p3','Write 31 in Spanish.','Escribe 31 con letras.',['treinta y uno'],'From thirty onwards, use a separate joining word.','A partir de treinta, usa una palabra separada para unir.'],
 ['p4','Write 01/04 as it goes in a birthday sentence.','Escribe 01/04 como en una frase de cumpleaños.',['el uno de abril','el primero de abril'],'Use the article before the day and the linking word before the month.','Usa el artículo delante del día y la palabra de enlace delante del mes.'],
 ['p5','Write month 9 in Spanish.','Escribe el mes 9 en español.',['septiembre'],'It comes just after August.','Va justo después de agosto.'],
 ['p6','Write 21 in Spanish.','Escribe 21 con letras.',['veintiuno'],'Keep the number in one word.','Escribe el número en una sola palabra.']
];
const transform=[
 ['t1','Soy tímido → Álex ___ tímido.','Soy tímido → Álex ___ tímido.',['es'],'Use the form for the person you are describing.','Usa la forma para la persona a la que describes.'],
 ['t2','Tengo el pelo corto → Eva ___ el pelo corto.','Tengo el pelo corto → Eva ___ el pelo corto.',['tiene'],'Switch from talking about yourself to describing Eva.','Pasa de hablar de ti a describir a Eva.'],
 ['t3','Llevo gafas → Eva ___ gafas.','Llevo gafas → Eva ___ gafas.',['lleva'],'The speaker is no longer describing herself.','Quien habla ya no se describe a sí misma.'],
 ['t4','Una mochila azul → unas mochilas ___.','Una mochila azul → unas mochilas ___.',['azules'],'The adjective follows the number of the noun.','El adjetivo concuerda en número con el sustantivo.'],
 ['t5','Un chico tranquilo → una chica ___.','Un chico tranquilo → una chica ___.',['tranquila'],'The adjective follows the gender of the noun.','El adjetivo concuerda en género con el sustantivo.']
];
const reading=[
 ['r1','Who has glasses and a birthday on 21 January?','¿Quién lleva gafas y cumple años el 21 de enero?',['Eva'],'Check both the date and the visible clue.','Comprueba la fecha y la pista visible.'],
 ['r2','Write Óscar’s birthday as a short date.','Escribe el cumpleaños de Óscar como fecha corta.',['22/02','22/2','22 de febrero'],'Find the date after **Su cumpleaños es**.','Localiza la fecha después de **Su cumpleaños es**.']
];
const gamePeople=[
 ['Eva','14','21/01',true,'largo','simpática'],['Óscar','12','22/02',false,'corto','tranquilo'],['Lola','13','30/05',false,'largo','amable']
];
const memoryCards=[['1','23/05'],['2','el uno de abril'],['3','31/10'],['1','el veintitrés de mayo'],['3','el treinta y uno de octubre'],['2','01/04']];
const shuffled=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
export const u3={answers:{},checked:{},disclosures:new Set(),month:4,day:23,gender:'a',speaker:'self',colour:'azul',plural:'one',learnBlock:'A',trait:'simpátic',person:'Eva',clue:'mochila',hair:'corto',eyes:'azules',ref:{},card:false,memory:shuffled(memoryCards),opened:[],matched:[],puzzle:shuffled(gamePeople),clueOrder:shuffled([0,1,2,3]),clues:1};
export function changeU3(action,value){
 if(['month','day','gender','speaker','colour','plural','trait','person','clue','hair','eyes'].includes(action)){
  u3.ref[action]=action==='month'?u3.month:action==='day'?u3.day:u3[action];u3[action]=['month','day'].includes(action)?Number(value):value;
  u3.day=Math.min(u3.day,monthDays[u3.month]);return true;
 }
 if(action==='block'&&'ABCDE'.split('').includes(value)){u3.learnBlock=value;return true;}
 if(action==='check'){u3.checked[value]=true;return true;}
 if(action==='card'||action==='edit'){u3.card=action==='card'&&!!u3.answers['u3-draft']?.trim();return true;}
 if(action==='memory'){
  const i=Number(value);if(u3.matched.includes(u3.memory[i][0])||u3.opened.includes(i))return false;
  if(u3.opened.length===2)u3.opened=[];u3.opened.push(i);
  if(u3.opened.length===2&&u3.opened.every(n=>u3.memory[n][0]===u3.memory[i][0])){u3.matched.push(u3.memory[i][0]);u3.opened=[];}return true;
 }
 if(action==='more'){u3.clues=Math.min(4,u3.clues+1);return true;}
 if(action==='guess'){u3.guess=value;return true;}
 if(action==='restart'){u3.memory=shuffled(memoryCards);u3.opened=[];u3.matched=[];u3.puzzle=shuffled(gamePeople);u3.clueOrder=shuffled([0,1,2,3]);u3.clues=1;u3.guess=null;return true;}
 return false;
}
export function unit3UI({L,E,T,mode},section,resource,back=''){
 const B=(en,es)=>L(E(en),E(es)), S=s=>`<span lang="es">${E(s)}</span>`,
 teach=([en,es])=>L(teachingMarkup(en),mode==='es'?E(es.replaceAll('**','')):teachingMarkup(es));
 const panel=(en,es,body)=>`<section class="panel"><h2>${B(en,es)}</h2>${body}</section>`;
 const details=(id,en,es,body)=>`<details class="hint" data-u3-disclose="${id}"${u3.disclosures.has(id)?' open':''}><summary>${B(en,es)}</summary>${body}</details>`;
 const button=(id,en,es,value='',attrs='')=>`<button type="button" data-action="u3-${id}" data-value="${E(value)}" ${attrs}>${B(en,es)}</button>`;
 const audio=(id,title,src='assets/audio/unit3/'+id+'.mp3')=>`<div class="activity-audio"><audio id="u3-audio-${id}" controls preload="none" src="${E(src)}" aria-label="${E(title)}"></audio><p role="status" data-audio-error hidden>${B('Audio unavailable.','Audio no disponible.')}</p></div>`;
 const clipButton=(id,text,src='assets/audio/unit3/'+id+'.mp3')=>`<div class="u3-clip"><button type="button" data-action="u3-audio" data-value="${id}" aria-label="${E(T('Listen to','Escucha')+': '+text)}" title="${E(T('Play audio','Reproducir audio'))}"><span aria-hidden="true">▶</span></button><audio id="u3-audio-${id}" preload="none" hidden src="${E(src)}"></audio><p role="status" data-audio-error hidden>${B('Audio unavailable.','Audio no disponible.')}</p></div>`;
 const icon=x=>`<span class="u3-icon" aria-hidden="true">${x}</span>`;
 const swatch=hex=>`<span class="u3-swatch" style="--swatch:${hex}" aria-hidden="true"></span>`;
 const tile=(text,{visual='',en='',id,src}={})=>`<li class="u3-tile">${visual}<strong lang="es">${E(text)}</strong>${en&&mode!=='es'?`<small lang="en">${E(en)}</small>`:''}${id?clipButton(id,text,src):''}</li>`;
 const grid=(tiles,compact=false)=>`<ul class="u3-tiles${compact?' compact':''}">${tiles.join('')}</ul>`;
 const bank=(ids,visual=()=>'',compact=false)=>grid(clips.filter(c=>ids.test(c.id)&&!unavailableClips.has(c.id)).map(c=>tile(c.text,{id:c.id,visual:visual(c)})),compact);
 const help=(n,context)=>{const r=profilesResources[n];return details('help-'+context+n,...r.title,`<p>${teach(r.quick)}</p><a href="#library/${r.id}" id="u3-help-${context}-${n}" data-action="aula-resource" data-id="${r.id}">${B('Open resource and practice','Abrir ficha y práctica')}</a>`);};
 const select=(id,en,es,opts,value)=>`<div><label for="u3-${id}">${B(en,es)}</label><select id="u3-${id}" data-u3-select="${id}">${opts.map(([v,x])=>`<option value="${E(v)}"${String(v)===String(value)?' selected':''}>${E(x)}</option>`).join('')}</select></div>`;
 const monthControl=()=>select('month','Month','Mes',months.map((m,i)=>[i,m]),u3.month);
 const calendar=()=>`<div class="u3-controls">${monthControl()}${select('day','Day','Día',numbers.slice(1,monthDays[u3.month]+1).map((_,i)=>[i+1,i+1]),u3.day)}</div>`;
 const monthGrid=()=>{
  const year=2027,offset=(new Date(Date.UTC(year,u3.month,1)).getUTCDay()+6)%7;
  const cells=Array.from({length:Math.ceil((monthDays[u3.month]+offset)/7)*7},(_,i)=>i-offset+1);
  return `<table class="u3-calendar"><caption lang="es">${E(months[u3.month])} de ${year}</caption><thead><tr>${weekdays.map(c=>`<th scope="col" lang="es"><abbr title="${c.text}">${c.text.slice(0,2)}</abbr></th>`).join('')}</tr></thead><tbody>${Array.from({length:cells.length/7},(_,r)=>`<tr>${cells.slice(r*7,r*7+7).map(n=>n<1||n>monthDays[u3.month]?'<td></td>':`<td${n===u3.day?' aria-current="date"':''}>${n}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
 };
 const date=()=>dateForms(u3.day,u3.month).map(S).join(' · ');
 const input=(id,en,es,long=false)=>`<label for="u3-${id}">${B(en,es)}</label>${long?`<textarea id="u3-${id}" class="input" rows="5" lang="es" data-u3-input>${E(u3.answers['u3-'+id]??'')}</textarea>`:`<input id="u3-${id}" class="input" lang="es" data-u3-input autocomplete="off" value="${E(u3.answers['u3-'+id]??'')}">`}`;
 const q=([id,en,es,valid,h1,h2])=>{const g=gradeAnswer(u3.answers['u3-'+id],valid);return `<div class="u3-question">${input(id,en,es)}${button('check','Check','Comprobar',id)}<p id="u3-feedback-${id}" role="status" tabindex="-1">${u3.checked[id]?(g==='correct'?B('That fits.','Encaja.')+' '+teach([h1,h2]):g==='accent'?B('You have the right word. Check the accent.','La palabra es correcta. Revisa la tilde.')+' '+teach([h1,h2]):g==='empty'?B('Write an answer first.','Escribe primero una respuesta.'):teach([h1,h2])):''}</p></div>`;};
 const reveal=(id,lines,questions)=>details('transcript-'+id,'Read the Spanish transcript (alternative to listening)','Lee la transcripción en español (alternativa a la escucha)',`<p lang="es">${lines.map(E).join('<br>')}</p>`)+questions.map(q).join('');
 const liaison=(r)=>`<a id="u3-review-${r}" data-action="aula-resource" data-id="${r}" href="#library/${r}">${B('Review earlier learning','Repasa lo ya aprendido')}</a>`;
 const intro=n=>lessons[n].map(x=>`<p>${teach(x)}</p>`).join('');
 const avatar=(p,i,hairColour='#493525',eyes='#252b36')=>`<svg class="u3-avatar" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="20" fill="${['#f2d190','#d4e8e3','#e8d9f2'][i%3]}"/><path d="M17 100Q25 68 50 69Q75 68 83 100" fill="#275357"/><path d="M25 45Q21 13 50 13Q79 13 77 46${['largo','rizado'].includes(p[4])?'L82 79H19Z':'Z'}" fill="${hairColour}"/><circle cx="50" cy="46" r="21" fill="#bd885f"/><path d="M44 54Q50 61 56 54" stroke="#423128" fill="none" stroke-width="2"/>${p[4]==='rizado'?`<g fill="${hairColour}">${[28,38,49,60,71].map(x=>`<circle cx="${x}" cy="27" r="9"/>`).join('')}</g>`:''}${p[3]?'<path d="M29 43h42M33 43v10h13V43m8 0v10h13V43" fill="none" stroke="#252b36" stroke-width="2"/>':'<circle cx="42" cy="44" r="3" fill="'+eyes+'"/><circle cx="58" cy="44" r="3" fill="'+eyes+'"/>'}</svg>`;
 const profile=(p,i)=>`<article class="panel u3-profile" lang="es">${avatar(p,i)}<h3>${E(p[0])}</h3><p>${E(p[1])} años · ${E(p[2])} · ${p[3]?'con gafas':'sin gafas'} · pelo ${E(p[4])} · ${E(p[5])}</p></article>`;
 const tabs=`<nav class="step-nav" aria-label="${E(T('Unit sections','Apartados de la unidad'))}">${aulaSections.map(([id,en,es])=>`<a href="#${hash(id)}"${section===id?' aria-current="page"':''}>${inlineLabel(mode,E,en,es)}</a>`).join('')}</nav>`;
 const dateTask=()=>q(recovery[3])+q(recovery[4])+q(['date-match','Match 31/10 to the date in words.','Empareja 31/10 con la fecha en letra.',['el treinta y uno de octubre','treinta y uno de octubre'],'October is month ten. Use three words for 31.','Octubre es el mes diez. Escribe 31 en tres palabras.']);
 const produce=(id,en,es,instruction)=>input(id,en,es,true)+details('review-'+id,'Review what you wrote','Revisa lo que has escrito',`<p>${teach(instruction)}</p>`);
 const headings=[
  ['Calendar and birthdays','Calendario y cumpleaños'],['Colours','Colores'],
  ['Hair and eyes','Pelo y ojos'],['Physical appearance','Aspecto físico'],['Personality','Personalidad']
 ];
 const goals=[
  ['Read a date and ask or say when a birthday is.','Lee una fecha y pregunta o di cuándo es un cumpleaños.'],
  ['Name colours and make them agree with the objects they describe.','Nombra colores y haz que concuerden con los objetos que describes.'],
  ['Describe hair and eyes with **tener**.','Describe el pelo y los ojos con **tener**.'],
  ['Describe height and visible clues with **ser** and **llevar**.','Describe la altura y las pistas visibles con **ser** y **llevar**.'],
  ['Describe personality with **soy**, **eres** and **es**.','Describe la personalidad con **soy**, **eres** y **es**.']
 ];
 const quantityNote=['With a known number, say **dos mochilas** or **tres mochilas**. Use **unas mochilas** if you do not give an exact number. **Algunas mochilas** means some bags, for example when talking about part of a group.','Cuando conoces el número, di **dos mochilas** o **tres mochilas**. Usa **unas mochilas** si no das una cantidad exacta. **Algunas mochilas** puede señalar una parte de un grupo.'];
 const lessonText=(en,es)=>`<p>${teach([en,es])}</p>`;
 const heading=(en,es)=>`<h3>${B(en,es)}</h3>`;
 const calendarCards=()=>heading('Days of the week','Días de la semana')+grid(weekdays.map(c=>tile(c.text,c)),true)+
  heading('Months','Meses')+bank(/^M/,c=>icon(c.id.slice(1)),true)+
  heading('Numbers 21–31','Números del 21 al 31')+bank(/^N/,c=>icon(c.id.slice(1)),true);
 const colourBank=()=>{
  const keys=['roja','amarilla','verde','azul','blanca','negra','rosa','gris'];
  const forms=['rojo / roja','amarillo / amarilla','verde','azul','blanco / blanca','negro / negra','rosa','gris'];
  const eng=['red','yellow','green','blue','white','black','pink','grey'];
  const sound=[['C01','C02'],['C03','C04'],['C05'],['C07']];
  return grid(keys.map((k,i)=>`<li class="u3-tile">${swatch(bagColours[k][2])}<strong lang="es">${forms[i]}</strong>${mode!=='es'?`<small lang="en">${eng[i]}</small>`:''}<div class="u3-clip-pair">${(sound[i]??[]).map(id=>clipButton(id,clips.find(c=>c.id===id).text)).join('')}</div></li>`),true);
 };
 const portrait=(style,hair,eye,glasses=false,i=0)=>avatar(['','','',glasses,style],i,hair,eye);
 const hairBank=()=>grid([
  tile('el pelo corto',{visual:portrait('corto'),en:'short hair'}),
  tile('el pelo largo',{visual:portrait('largo'),en:'long hair'}),
  ...hairExamples.map(([label,en,style,hair,eye])=>tile(label,{en,visual:portrait(style,hair,eye)}))
 ])+grid(eyeExamples.map(([label,en,eye])=>tile(label,{en,visual:portrait('corto',undefined,eye)})))+bank(/^(P01|D05|D06)$/);
 const appearanceBank=()=>grid([
  tile('alto / alta',{en:'tall',visual:icon('↟')}),tile('bajo / baja',{en:'short (height)',visual:icon('↡')}),
  tile('de estatura media',{en:'of medium height',visual:icon('↔')}),
  tile('con gafas',{en:'with glasses',visual:portrait('corto',undefined,undefined,true),id:'P03'}),
  tile('sin gafas',{en:'without glasses',visual:portrait('corto'),id:'P04'}),
  tile('las gafas',{en:'glasses',visual:portrait('largo',undefined,undefined,true),id:'P02'})
 ])+bank(/^D0[78]$/);
 const personalityBank=()=>grid(traits.map(([,label,en],i)=>`<li class="u3-tile">${i===1?icon('◔'):i===2?icon('☁'):i===5?icon('✎'):portrait('corto',undefined,undefined,false,i)}<strong lang="es">${label}</strong>${mode!=='es'?`<small lang="en">${en}</small>`:''}<div class="u3-clip-pair">${(i<3?clips.filter(c=>[i*2+1,i*2+2].some(n=>c.id==='A0'+n)):i===3?clips.filter(c=>c.id==='A07'):[]).map(c=>clipButton(c.id,c.text)).join('')}</div></li>`));
 const practiceNew=[
  ['colour-new','Una mochila blanca → tres mochilas ___.','Una mochila blanca → tres mochilas ___.',['blancas'],'Plural: add **-s**.','En plural añade **-s**.'],
  ['eyes-new','Complete: Leo tiene los ojos ___ (green).','Completa: Leo tiene los ojos ___ (a partir de verde).',['verdes'],'The adjective agrees with **ojos**.','El adjetivo concuerda con **ojos**.'],
  ['height-new','Complete: Yo ___ de estatura media.','Completa: Yo ___ de estatura media.',['soy'],'Use **ser** for height.','Usa **ser** para la altura.'],
  ['trait-new','Leo es trabajador → Eva es ___.','Leo es trabajador → Eva es ___.',['trabajadora'],'Add **-a** after **trabajador**.','Añade **-a** después de **trabajador**.']
 ];
 const lessonBlock=(i,practice=true)=>{
  if(i===0)return calendarCards()+intro(0)+calendar()+monthGrid()+`<p role="status">${date()}</p>`+bank(/^F/)+lessonText('One more model: **'+f03Model+'**','Otro modelo: **'+f03Model+'**')+
   details('old-numbers','Review numbers 0–20','Repasa los números 0–20',grid(numbers.slice(0,21).map((n,k)=>tile(n,{visual:icon(k),id:'old'+k,src:`assets/audio/explore/numbers/${String(k).padStart(2,'0')}.mp3`})),true))+
   `<p>${B('In Mexico, people may sing Las Mañanitas on a birthday. How do you congratulate someone where you live?','En México se pueden cantar Las Mañanitas en un cumpleaños. ¿Cómo felicitas a alguien donde vives?')}</p>`+
   (practice?dateTask():'');
  if(i===1)return colourBank()+lessonText('Say **¿De qué color es?** to ask about one thing: **Es azul**.','Pregunta **¿De qué color es?** cuando hablas de una cosa: **Es azul**.')+lessonText('Some colours change in gender and number: **un cuaderno blanco**, **una mochila blanca**, **tres mochilas blancas**. **Verde**, **azul**, **rosa** and **gris** have the same form in both genders. Compare **verdes**, **azules**, **rosas** and **grises**.',
   'Algunos colores cambian en género y número: **un cuaderno blanco**, **una mochila blanca**, **tres mochilas blancas**. **Verde**, **azul**, **rosa** y **gris** no cambian con el género. Compara **verdes**, **azules**, **rosas** y **grises**.')+
   bank(/^C(06|08|09|10)$/)+ (practice?q(practiceNew[0]):'');
  if(i===2)return hairBank()+lessonText('Use **tengo** for yourself and **tiene** for someone else. **El pelo** is masculine singular: **Tengo el pelo rizado**. **Los ojos** is masculine plural: **Tiene los ojos marrones**.',
   'Usa **tengo** para hablar de ti y **tiene** para hablar de otra persona. **El pelo** es masculino singular: **Tengo el pelo rizado**. **Los ojos** es masculino plural: **Tiene los ojos marrones**.')+
   (practice?q(practiceNew[1]):'');
  if(i===3)return appearanceBank()+lessonText('For height, use **soy alto/alta**, **es bajo/baja** or **es de estatura media**. For glasses, use **llevo gafas**, **lleva gafas** or **no lleva gafas**.',
   'Para la altura, usa **soy alto/alta**, **es bajo/baja** o **es de estatura media**. Para las gafas, usa **llevo gafas**, **lleva gafas** o **no lleva gafas**.')+(practice?q(practiceNew[2]):'');
  return personalityBank()+intro(1)+bank(/^D0[12349]$/)+lessonText('Compare **es divertido/divertida** and **es trabajador/trabajadora**. **Amable** stays the same.',
   'Compara **es divertido/divertida** y **es trabajador/trabajadora**. **Amable** tiene la misma forma.')+(practice?q(practiceNew[3]):'');
 };
 let title=['Who is who? — Profiles and birthdays','¿Quién es quién? — Perfiles y cumpleaños'],body='';
 if(resource){
  const n=profilesResources.findIndex(r=>r.id===resource);title=profilesResources[n].title;
  body=`<p><a href="#library">${B('Library','Biblioteca')}</a></p>`+back+panel('Notice the pattern','Fíjate en el patrón',(n===0?lessonBlock(0,false):headings.slice(1).map(([en,es],i)=>details('resource-block-'+i,en,es,lessonBlock(i+1,false))).join('')))+panel('Practise and apply','Practica y aplica',n===0?dateTask()+produce('date-note','Write a fictional birthday reminder','Escribe un recordatorio de cumpleaños ficticio',['Check the article and the month: **el … de …**.','Revisa el artículo y el mes: **el … de …**.']):[...transform.slice(1),...practiceNew].map(q).join('')+produce('profile-note','Write two clues for an avatar','Escribe dos pistas sobre un avatar',['Check that **corto** describes **el pelo**.','Comprueba que **corto** describe **el pelo**.']));
 }else if(section==='learn'){
  const i='ABCDE'.indexOf(u3.learnBlock);
  body=`<nav class="u3-learn-nav" aria-label="${E(T('Learn blocks','Bloques de Aprende'))}">${headings.map(([en,es],n)=>{const id='ABCDE'[n];return button('block',id+' · '+en,id+' · '+es,id,`id="u3-learn-${id}" aria-pressed="${n===i}"`);}).join('')}</nav>`+
   panel(u3.learnBlock+' · '+headings[i][0],u3.learnBlock+' · '+headings[i][1],`<p class="lead">${teach(goals[i])}</p>`+lessonBlock(i)+(i===0?help(0,'learn'):help(1,'learn'))+(i===3?liaison('u1-age'):''))+(i===4?
  panel('Leo’s voice note','Nota de voz de Leo',`<p>${B('Listen for the purpose first. Then catch the date and a visible clue.','Escucha primero para saber para qué habla. Después busca la fecha y una pista visible.')}</p>`+audio('E01',T('Leo’s voice note','Nota de voz de Leo'))+reveal('E01',[e01],[
  ['l-purpose','What is Leo doing?','¿Qué hace Leo?',['se presenta','presentarse','introduces himself','introducing himself'],'Notice what follows the greeting.','Fíjate en lo que viene después del saludo.'],
  ['l-date','When is Leo’s birthday?','¿Cuándo es el cumpleaños de Leo?',['14/09','14/9','14 de septiembre','el catorce de septiembre','catorce de septiembre'],'Listen after **Mi cumpleaños es**.','Escucha lo que sigue a **Mi cumpleaños es**.'],
  ['l-clue','What visible clue does Leo give?','¿Qué pista visible da Leo?',['gafas','lleva gafas','glasses'],'The visible clue follows the description of his character.','La pista visible va después de la descripción de su carácter.']])):'');
 }else if(section==='explore'){
  const trait=(ending,stem)=>describeTrait(stem,ending);
  const line=(sp,end,name,clue)=>sp==='self'?clue==='pelo'?'Tengo el pelo '+u3.hair+'.':clue==='ojos'?'Tengo los ojos '+u3.eyes+'.':clue==='gafas'?'Llevo gafas.':'Soy '+trait(end,u3.trait)+'.':clue==='pelo'?name+' tiene el pelo '+u3.hair+'.':clue==='ojos'?name+' tiene los ojos '+u3.eyes+'.':clue==='gafas'?name+' lleva gafas.':name+' es '+trait(end,u3.trait)+'.';
  const bag=bagPhrase;
  body=panel('Avatar workbench','Mesa de avatares',`<p>${B('Change one control at a time. What changes when someone else describes the same person?','Cambia un control cada vez. ¿Qué cambia cuando otra persona describe al mismo personaje?')}</p><div class="u3-controls">${select('person','Avatar','Avatar',[['Eva','Eva'],['Leo','Leo']],u3.person)}${select('speaker','Speaker','Quién habla',[['self',T('The avatar','El avatar')],['other',T('Another person','Otra persona')]],u3.speaker)}${select('trait','Character','Carácter',traits.map(([v,x])=>[v,x]),u3.trait)}${select('clue','Clue','Pista',[['mochila',T('Character','Carácter')],['pelo',T('Hair','Pelo')],['ojos',T('Eyes','Ojos')],['gafas',T('Glasses','Gafas')]],u3.clue)}${u3.clue==='pelo'?select('hair','Hair','Pelo',['corto','largo','liso','rizado','rubio','castaño','negro'].map(x=>[x,x]),u3.hair):u3.clue==='ojos'?select('eyes','Eye colour','Color de ojos',['azules','verdes','marrones'].map(x=>[x,x]),u3.eyes):''}</div><p role="status">${S(line('self',u3.person==='Eva'?'a':'o',u3.person,u3.clue))} → <strong>${S(line(u3.speaker,u3.person==='Eva'?'a':'o',u3.person,u3.clue))}</strong></p><div class="u3-controls">${select('plural','Quantity','Cantidad',[['one','1'],['two','2'],['three','3'],['unknown',T('An unspecified quantity','Cantidad sin concretar')]],u3.plural)}${select('colour','Bag colour','Color de la mochila',Object.keys(bagColours).map(x=>[x,x]),u3.colour)}</div><p role="status">${S(bag('one',u3.colour))} → <strong>${S(bag(u3.plural,u3.colour))}</strong></p>`+(u3.colour==='azul'&&['one','unknown'].includes(u3.plural)?bank(u3.plural==='one'?/^C08$/:/^C09$/):'')+`<p>${teach(quantityNote)}</p>`+help(1,'explore'))+
  panel('Mirror calendar','Calendario espejo',`<p>${B('Change a day or month. Watch how the same date changes in all three formats.','Cambia el día o el mes. Observa cómo cambia la misma fecha en los tres formatos.')}</p>`+calendar()+`<p role="status">${date()}</p>`+bank(new RegExp('^(M'+String(u3.month+1).padStart(2,'0')+'|N'+u3.day+')$'))+help(0,'explore'));
 }else if(section==='practise'){
  body=panel('1 · Understand','1 · Comprende',`<div class="u3-profiles">${gamePeople.slice(0,2).map(profile).join('')}</div><p lang="es">Se llama Eva. Su cumpleaños es el veintiuno de enero. Lleva gafas.</p><p lang="es">Se llama Óscar. Su cumpleaños es el veintidós de febrero. Tiene el pelo corto.</p>`+reading.map(q).join('')+`<h3>${B('Carla and Hugo prepare the panel','Carla y Hugo preparan el panel')}</h3>`+audio('E02',T('Carla and Hugo','Carla y Hugo'))+reveal('E02',e02,pairQuestions))+
  panel('2 · Recall','2 · Recupera',recovery.map(q).join('')+help(0,'practise'))+panel('3 · Transform','3 · Transforma',[...transform,...practiceNew.map(([id,...rest])=>['practise-'+id,...rest])].map(q).join('')+help(1,'practise'))+
  panel('4 · Produce','4 · Produce',profile(gamePeople[2],2)+produce('mini','Write two clues about Lola, then say them aloud','Escribe dos pistas sobre Lola y dilas en voz alta',['Check **es** for character and **tiene** or **lleva** for appearance.','Revisa **es** para el carácter y **tiene** o **lleva** para el aspecto.']));
 }else if(section==='communicate'){
  body=panel('Welcome panel','Panel de bienvenida',`<p>${B('Identify the person and prepare a card so another participant can recognise them.','Identifica a la persona y prepara una ficha para que otro participante pueda reconocerla.')}</p><p lang="es">Buscamos a una persona: su cumpleaños es el veintiséis de junio y lleva gafas. ¿Quién es?</p><div class="u3-profiles">${people.map(profile).join('')}</div>`+
  input('evidence','Write the two clues that support your choice','Escribe las dos pistas que apoyan tu elección')+
  q(['mission','Who fits both clues?','¿Quién encaja con las dos pistas?',['Mara'],'Nico matches the date and Iris matches the glasses. Look for both clues in one profile.','Nico coincide en la fecha e Iris lleva gafas. Busca las dos pistas en una misma ficha.'])+
  details('pair','Optional partner version','Modalidad opcional en pareja',`<p>${B('One person reports the date and the other the visible clue. Ask for the missing clue before writing your own profile.','Una persona da la fecha y la otra la pista visible. Pide la pista que te falta antes de redactar tu propia ficha.')}</p>`))+
  panel('Write and rehearse','Escribe y ensaya',`<p>${B('Write four or five sentences: name, age, birthday in words, personality and one visible clue (hair, eyes, height or glasses). Your work stays on this page during the session.','Escribe cuatro o cinco frases: nombre, edad, cumpleaños en letra, carácter y una pista visible (pelo, ojos, altura o gafas). Tu trabajo se conserva durante la sesión.')}</p>`+
  (u3.card?`<article id="u3-card" class="notice" tabindex="-1">${avatar(people[0],0)}<p lang="es" class="u3-draft">${E(u3.answers['u3-draft'])}</p></article>`+button('edit','Edit my card','Editar mi ficha'):input('draft','My welcome card','Mi ficha de bienvenida',true)+button('card','Preview my card','Ver mi ficha'))+
  details('starters','Sentence starters and models','Inicios de frase y modelos',`<p lang="es">Se llama… · Tiene… años. · Su cumpleaños es… · Es… · Lleva…</p><p lang="es">Se llama Lola. Tiene trece años. Su cumpleaños es el treinta de mayo. Es amable. Tiene el pelo largo.</p>`+bank(/^(F04|F05|D04|D06|D08)$/))+
  `<p>${B('Say your profile aloud, then answer the question. You can write your answer instead.','Di tu perfil en voz alta y después responde a la pregunta. También puedes escribir tu respuesta.')}</p><p lang="es">¿Cuándo es su cumpleaños?</p>`+input('oral','Optional written rehearsal','Ensayo por escrito (opcional)')+details('self','Self-check','Autoevaluación',`<ul><li>${B('Do the name, age and date match?','¿Coinciden el nombre, la edad y la fecha?')}</li><li>${B('Did you give two useful clues?','¿Has dado dos pistas útiles?')}</li><li>${B('Check the adjective ending.','Revisa la terminación del adjetivo.')}</li></ul>`)+help(0,'communicate')+help(1,'communicate'));
 }else if(section==='play'){
  const p=u3.puzzle[0],clueLabels=[p[2],p[3]?'Lleva gafas.':'No lleva gafas.','Tiene el pelo '+p[4]+'.','Es '+p[5]+'.'];
  body=panel('Birthday memory','Memoria de cumpleaños',`<p>${B('Find the same date in digits and in words.','Busca la misma fecha en cifras y en letra.')}</p><div class="u3-profiles">${u3.memory.map(([key,x],i)=>{const open=u3.opened.includes(i)||u3.matched.includes(key);return button('memory',open?x:'Card '+(i+1),open?x:'Carta '+(i+1),i,`aria-pressed="${open}" aria-disabled="${u3.matched.includes(key)}"`);}).join('')}</div><p role="status">${u3.matched.length}/3 · ${B('pairs','parejas')} ${u3.opened.length===2?B('Compare the day and month, then turn a new card.','Compara el día y el mes y gira otra carta.'):''}</p>`)+
  panel('Who am I?','¿Quién soy?',`<div class="u3-profiles">${gamePeople.map(profile).join('')}</div><ol lang="es">${u3.clueOrder.slice(0,u3.clues).map(i=>`<li>${E(clueLabels[i])}</li>`).join('')}</ol>`+button('more','One more clue','Otra pista','',u3.clues>=4?'disabled':'')+`<div class="flow-actions">${gamePeople.map(x=>button('guess',x[0],x[0],x[0])).join('')}</div><p role="status">${u3.guess?(u3.guess===p[0]?B('Your choice fits all the clues.','Tu elección encaja con todas las pistas.'):B('Compare the clues with another profile.','Compara las pistas con otra ficha.')):''}</p>`+button('restart','Shuffle and start again','Baraja y vuelve a empezar'));
 }else{
  body=`<p class="lead">${B('Prepare a welcome profile for a fictional exchange. Use dates and descriptions to help someone recognise a participant.','Prepara una ficha de bienvenida para un intercambio ficticio. Usa fechas y descripciones para que otra persona pueda reconocer a un participante.')}</p><div class="u3-profiles">${gamePeople.map((p,i)=>avatar(p,i)).join('')}</div><p><a class="primary" href="#${hash('learn')}">${B('Start with Learn','Empieza por Aprende')}</a></p>`;
 }
 return `<div class="page aula unit3"><h1>${B(...title)}</h1>${resource?'':tabs}${body}</div>`;
}
