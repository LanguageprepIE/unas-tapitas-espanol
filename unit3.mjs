import {months,monthDays,numbers,dateForms,people,lessons,profilesResources,e01,e02,gradeAnswer,clips} from './data/unit3.mjs';
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
export const u3={answers:{},checked:{},disclosures:new Set(),month:4,day:23,gender:'a',speaker:'self',colour:'azul',plural:'one',trait:'simpátic',person:'Eva',clue:'mochila',ref:{},card:false,memory:shuffled(memoryCards),opened:[],matched:[],puzzle:shuffled(gamePeople),clueOrder:shuffled([0,1,2,3]),clues:1};
export function changeU3(action,value){
 if(['month','day','gender','speaker','colour','plural','trait','person','clue'].includes(action)){
  u3.ref[action]=action==='month'?u3.month:action==='day'?u3.day:u3[action];u3[action]=['month','day'].includes(action)?Number(value):value;
  u3.day=Math.min(u3.day,monthDays[u3.month]);return true;
 }
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
 const bank=ids=>`<ul class="aula-tiles u3-banks">${clips.filter(c=>ids.test(c.id)).map(c=>`<li><strong lang="es">${E(c.text)}</strong>${audio(c.id,c.text)}</li>`).join('')}</ul>`;
 const help=(n,context)=>{const r=profilesResources[n];return details('help-'+context+n,...r.title,`<p>${teach(r.quick)}</p><a href="#library/${r.id}" id="u3-help-${context}-${n}" data-action="aula-resource" data-id="${r.id}">${B('Open resource and practice','Abrir ficha y práctica')}</a>`);};
 const select=(id,en,es,opts,value)=>`<div><label for="u3-${id}">${B(en,es)}</label><select id="u3-${id}" data-u3-select="${id}">${opts.map(([v,x])=>`<option value="${E(v)}"${String(v)===String(value)?' selected':''}>${E(x)}</option>`).join('')}</select></div>`;
 const monthControl=()=>select('month','Month','Mes',months.map((m,i)=>[i,m]),u3.month);
 const calendar=()=>`<div class="u3-controls">${monthControl()}${select('day','Day','Día',numbers.slice(1,monthDays[u3.month]+1).map((_,i)=>[i+1,i+1]),u3.day)}</div>`;
 const date=()=>dateForms(u3.day,u3.month).map(S).join(' · ');
 const input=(id,en,es,long=false)=>`<label for="u3-${id}">${B(en,es)}</label>${long?`<textarea id="u3-${id}" class="input" rows="5" lang="es" data-u3-input>${E(u3.answers['u3-'+id]??'')}</textarea>`:`<input id="u3-${id}" class="input" lang="es" data-u3-input autocomplete="off" value="${E(u3.answers['u3-'+id]??'')}">`}`;
 const q=([id,en,es,valid,h1,h2])=>{const g=gradeAnswer(u3.answers['u3-'+id],valid);return `<div class="u3-question">${input(id,en,es)}${button('check','Check','Comprobar',id)}<p id="u3-feedback-${id}" role="status" tabindex="-1">${u3.checked[id]?(g==='correct'?B('That fits.','Encaja.')+' '+teach([h1,h2]):g==='accent'?B('You have the right word. Check the accent.','La palabra es correcta. Revisa la tilde.')+' '+teach([h1,h2]):g==='empty'?B('Write an answer first.','Escribe primero una respuesta.'):teach([h1,h2])):''}</p></div>`;};
 const reveal=(id,lines,questions)=>details('transcript-'+id,'Read the Spanish transcript (alternative to listening)','Lee la transcripción en español (alternativa a la escucha)',`<p lang="es">${lines.map(E).join('<br>')}</p>`)+questions.map(q).join('');
 const liaison=(r)=>`<a href="#library/${r}">${B('Review earlier learning','Repasa lo ya aprendido')}</a>`;
 const intro=n=>lessons[n].map(x=>`<p>${teach(x)}</p>`).join('');
 const avatar=(p,i)=>`<svg class="u3-avatar" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="20" fill="${['#f2d190','#d4e8e3','#e8d9f2'][i%3]}"/><path d="M17 100Q25 68 50 69Q75 68 83 100" fill="#275357"/><path d="M25 45Q21 13 50 13Q79 13 77 46${p[4]==='largo'?'L82 79H19Z':'Z'}" fill="#493525"/><circle cx="50" cy="46" r="21" fill="#bd885f"/><path d="M44 54Q50 61 56 54" stroke="#423128" fill="none" stroke-width="2"/>${p[3]?'<path d="M29 43h42M33 43v10h13V43m8 0v10h13V43" fill="none" stroke="#252b36" stroke-width="2"/>':'<circle cx="42" cy="44" r="2"/><circle cx="58" cy="44" r="2"/>'}</svg>`;
 const profile=(p,i)=>`<article class="panel u3-profile" lang="es">${avatar(p,i)}<h3>${E(p[0])}</h3><p>${E(p[1])} años · ${E(p[2])} · ${p[3]?'con gafas':'sin gafas'} · pelo ${E(p[4])} · ${E(p[5])}</p></article>`;
 const tabs=`<nav class="step-nav" aria-label="${E(T('Unit sections','Apartados de la unidad'))}">${aulaSections.map(([id,en,es])=>`<a href="#${hash(id)}"${section===id?' aria-current="page"':''}>${inlineLabel(mode,E,en,es)}</a>`).join('')}</nav>`;
 const dateTask=()=>q(recovery[3])+q(recovery[4])+q(['date-match','Match 31/10 to the date in words.','Empareja 31/10 con la fecha en letra.',['el treinta y uno de octubre','treinta y uno de octubre'],'October is month ten. Use three words for 31.','Octubre es el mes diez. Escribe 31 en tres palabras.']);
 const produce=(id,en,es,instruction)=>input(id,en,es,true)+details('review-'+id,'Review what you wrote','Revisa lo que has escrito',`<p>${teach(instruction)}</p>`);
 let title=['Who is who? — Profiles and birthdays','¿Quién es quién? — Perfiles y cumpleaños'],body='';
 if(resource){
  const n=profilesResources.findIndex(r=>r.id===resource);title=profilesResources[n].title;
  body=`<p><a href="#library">${B('Library','Biblioteca')}</a></p>`+back+panel('Notice the pattern','Fíjate en el patrón',intro(n)+bank(n===0?/^[MNF]/:/^[CAPD]/))+panel('Practise and apply','Practica y aplica',n===0?dateTask()+produce('date-note','Write a fictional birthday reminder','Escribe un recordatorio de cumpleaños ficticio',['Check the article and the month: **el … de …**.','Revisa el artículo y el mes: **el … de …**.']):transform.slice(1).map(q).join('')+produce('profile-note','Write two clues for an avatar','Escribe dos pistas sobre un avatar',['Check that **corto** describes **el pelo**.','Comprueba que **corto** describe **el pelo**.']));
 }else if(section==='learn'){
  body=panel('A · Birthday calendar','A · Calendario de cumpleaños',intro(0)+calendar()+`<p role="status">${date()}</p>`+bank(/^[MNF]/)+details('old-numbers','Review numbers 0–20','Repasa los números 0–20',`<ul class="aula-tiles u3-banks">${numbers.slice(0,21).map((n,i)=>`<li>${S(n)}${audio('old'+i,n,`assets/audio/explore/numbers/${String(i).padStart(2,'0')}.mp3`)}</li>`).join('')}</ul>`)+`<p>${B('In Mexico, people may sing Las Mañanitas on a birthday. How do you congratulate someone where you live?','En México se pueden cantar Las Mañanitas en un cumpleaños. ¿Cómo felicitas a alguien donde vives?')}</p>`+help(0,'learn'))+
  panel('B · Portrait by clues','B · Retrato por pistas',intro(1)+`<div class="u3-profiles">${gamePeople.slice(0,2).map(profile).join('')}</div>`+bank(/^[CAPD]/)+liaison('u1-age')+help(1,'learn'))+
  panel('Leo’s voice note','Nota de voz de Leo',`<p>${B('Listen for the purpose first. Then catch the date and a visible clue.','Escucha primero para saber para qué habla. Después busca la fecha y una pista visible.')}</p>`+audio('E01',T('Leo’s voice note','Nota de voz de Leo'))+reveal('E01',[e01],[
  ['l-purpose','What is Leo doing?','¿Qué hace Leo?',['se presenta','presentarse','introduces himself','introducing himself'],'Notice what follows the greeting.','Fíjate en lo que viene después del saludo.'],
  ['l-date','When is Leo’s birthday?','¿Cuándo es el cumpleaños de Leo?',['14/09','14/9','14 de septiembre','el catorce de septiembre','catorce de septiembre'],'Listen after **Mi cumpleaños es**.','Escucha lo que sigue a **Mi cumpleaños es**.'],
  ['l-clue','What visible clue does Leo give?','¿Qué pista visible da Leo?',['gafas','lleva gafas','glasses'],'The visible clue follows the description of his character.','La pista visible va después de la descripción de su carácter.']]));
 }else if(section==='explore'){
  const trait=(ending,stem)=>stem==='amable'?stem:stem+ending;
  const line=(sp,end,name,clue)=>sp==='self'?clue==='pelo'?'Tengo el pelo corto.':clue==='gafas'?'Llevo gafas.':'Soy '+trait(end,u3.trait)+'.':clue==='pelo'?name+' tiene el pelo corto.':clue==='gafas'?name+' lleva gafas.':name+' es '+trait(end,u3.trait)+'.';
  const colours={azul:['azul','azules'],roja:['roja','rojas'],verde:['verde','verdes'],amarilla:['amarilla','amarillas']};
  const bag=(p,c)=>p==='one'?'una mochila '+colours[c][0]:'unas mochilas '+colours[c][1];
  body=panel('Avatar workbench','Mesa de avatares',`<p>${B('Change one control at a time. What changes when someone else describes the same person?','Cambia un control cada vez. ¿Qué cambia cuando otra persona describe al mismo personaje?')}</p><div class="u3-controls">${select('person','Avatar','Avatar',[['Eva','Eva'],['Leo','Leo']],u3.person)}${select('speaker','Speaker','Quién habla',[['self',T('The avatar','El avatar')],['other',T('Another person','Otra persona')]],u3.speaker)}${select('trait','Character','Carácter',[['simpátic','simpático/a'],['tímid','tímido/a'],['tranquil','tranquilo/a'],['amable','amable']],u3.trait)}${select('clue','Clue','Pista',[['mochila',T('Character','Carácter')],['pelo',T('Hair','Pelo')],['gafas',T('Glasses','Gafas')]],u3.clue)}</div><p role="status">${S(line('self',u3.person==='Eva'?'a':'o',u3.person,u3.clue))} → <strong>${S(line(u3.speaker,u3.person==='Eva'?'a':'o',u3.person,u3.clue))}</strong></p><div class="u3-controls">${select('plural','Quantity','Cantidad',[['one','1'],['many','2']],u3.plural)}${select('colour','Bag colour','Color de la mochila',Object.keys(colours).map(x=>[x,x]),u3.colour)}</div><p role="status">${S(bag('one',u3.colour))} → <strong>${S(bag(u3.plural,u3.colour))}</strong></p>`+(u3.colour==='azul'?bank(u3.plural==='one'?/^C08$/:/^C09$/):'')+help(1,'explore'))+
  panel('Mirror calendar','Calendario espejo',`<p>${B('Change a day or month. Watch how the same date changes in all three formats.','Cambia el día o el mes. Observa cómo cambia la misma fecha en los tres formatos.')}</p>`+calendar()+`<p role="status">${date()}</p>`+bank(new RegExp('^(M'+String(u3.month+1).padStart(2,'0')+'|N'+u3.day+')$'))+help(0,'explore'));
 }else if(section==='practise'){
  body=panel('1 · Understand','1 · Comprende',`<div class="u3-profiles">${gamePeople.slice(0,2).map(profile).join('')}</div><p lang="es">Se llama Eva. Su cumpleaños es el veintiuno de enero. Lleva gafas.</p><p lang="es">Se llama Óscar. Su cumpleaños es el veintidós de febrero. Tiene el pelo corto.</p>`+reading.map(q).join('')+`<h3>${B('Carla and Hugo prepare the panel','Carla y Hugo preparan el panel')}</h3>`+audio('E02',T('Carla and Hugo','Carla y Hugo'))+reveal('E02',e02,pairQuestions))+
  panel('2 · Recall','2 · Recupera',recovery.map(q).join('')+help(0,'practise'))+panel('3 · Transform','3 · Transforma',transform.map(q).join('')+help(1,'practise'))+
  panel('4 · Produce','4 · Produce',profile(gamePeople[2],2)+produce('mini','Write two clues about Lola, then say them aloud','Escribe dos pistas sobre Lola y dilas en voz alta',['Check **es** for character and **tiene** or **lleva** for appearance.','Revisa **es** para el carácter y **tiene** o **lleva** para el aspecto.']));
 }else if(section==='communicate'){
  body=panel('Welcome panel','Panel de bienvenida',`<p>${B('Identify the person and prepare a card so another participant can recognise them.','Identifica a la persona y prepara una ficha para que otro participante pueda reconocerla.')}</p><p lang="es">Buscamos a una persona: su cumpleaños es el veintiséis de junio y lleva gafas. ¿Quién es?</p><div class="u3-profiles">${people.map(profile).join('')}</div>`+
  input('evidence','Write the two clues that support your choice','Escribe las dos pistas que apoyan tu elección')+
  q(['mission','Who fits both clues?','¿Quién encaja con las dos pistas?',['Mara'],'Nico matches the date and Iris matches the glasses. Look for both clues in one profile.','Nico coincide en la fecha e Iris lleva gafas. Busca las dos pistas en una misma ficha.'])+
  details('pair','Optional partner version','Modalidad opcional en pareja',`<p>${B('One person reports the date and the other the visible clue. Ask for the missing clue before writing your own profile.','Una persona da la fecha y la otra la pista visible. Pide la pista que te falta antes de redactar tu propia ficha.')}</p>`))+
  panel('Write and rehearse','Escribe y ensaya',`<p>${B('Write four or five sentences: name, age, birthday in words, personality and one visible clue. Your work stays on this page during the session.','Escribe cuatro o cinco frases: nombre, edad, cumpleaños en letra, carácter y una pista visible. Tu trabajo se conserva durante la sesión.')}</p>`+
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
