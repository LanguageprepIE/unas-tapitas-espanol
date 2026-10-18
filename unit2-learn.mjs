// Unit 2, Learn block A. The object and expression IDs refer only to verified MP3s.
const objectRoot='assets/audio/unit2/vocabulary/objects/';
const expressionRoot='assets/audio/unit2/expressions/';
const iconRoot='assets/illustrations/unit2-objects.svg#';

export const unit2Objects=[
 {id:'pencil',name:'un lápiz',meaning:'pencil',number:1,group:'bag',icon:'pencil'},
 {id:'pen',name:'un bolígrafo',meaning:'pen',number:2,group:'tools',icon:'pen'},
 {id:'eraser',name:'una goma',meaning:'eraser',number:3,group:'bag',icon:'eraser'},
 {id:'ruler',name:'una regla',meaning:'ruler',number:4,group:'tools',icon:'ruler'},
 {id:'sharpener',name:'un sacapuntas',meaning:'pencil sharpener',number:5,group:'tools',icon:'sharpener'},
 {id:'case',name:'un estuche',meaning:'pencil case',number:6,group:'bag',icon:'case'},
 {id:'notebook',name:'un cuaderno',meaning:'notebook',number:7,group:'bag',icon:'notebook'},
 {id:'book',name:'un libro',meaning:'book',number:8,group:'bag',icon:'book'},
 {id:'backpack',name:'una mochila',meaning:'school bag',number:9,group:'bag',icon:'backpack'},
 {id:'folder',name:'una carpeta',meaning:'folder',number:10,group:'bag',icon:'folder'},
 {id:'scissors',name:'unas tijeras',meaning:'scissors',number:11,group:'tools',icon:'scissors'},
 {id:'glue',name:'un pegamento',meaning:'glue stick',number:12,group:'tools',icon:'glue'},
 {id:'calculator',name:'una calculadora',meaning:'calculator',number:13,group:'tools',icon:'calculator'},
 {id:'marker',name:'un rotulador',meaning:'marker',number:14,group:'tools',icon:'marker'},
 {id:'highlighter',name:'un subrayador',meaning:'highlighter',number:15,group:'tools',icon:'highlighter'},
 {id:'board',name:'una pizarra',meaning:'board',number:16,group:'room',icon:'board'},
 {id:'desk',name:'una mesa',meaning:'desk',number:17,group:'room',icon:'desk'},
 {id:'chair',name:'una silla',meaning:'chair',number:18,group:'room',icon:'chair'},
 {id:'sheet',name:'una hoja',meaning:'sheet of paper',number:19,group:'bag',icon:'sheet'},
 {id:'computer',name:'un ordenador',meaning:'computer',number:20,group:'room',icon:'computer'}
].map(item=>({...item,audio:`${objectRoot}1Y_U02_AUD_OBJ_${String(item.number).padStart(2,'0')}_v1.mp3`}));

export const unit2Expressions=[
 {id:'what',text:'¿Qué es esto?',number:1,meaning:['What is this?','¿Qué es esto?']},
 {id:'one',text:'Es un lápiz.',number:2,meaning:['It is a pencil.','Es un lápiz.']},
 {id:'whatPlural',text:'¿Qué son?',number:3,meaning:['What are they?','¿Qué son?']},
 {id:'plural',text:'Son unos cuadernos.',number:4,meaning:['They are some notebooks.','Son unos cuadernos.']},
 {id:'howMany',text:'¿Cuántos libros hay?',number:5,meaning:['How many books are there?','¿Cuántos libros hay?']},
 {id:'three',text:'Hay tres libros.',number:6,meaning:['There are three books.','Hay tres libros.']},
 {id:'none',text:'No tengo regla.',number:7,meaning:['I do not have a ruler.','No tengo regla.']}
].map(item=>({...item,audio:`${expressionRoot}1Y_U02_AUD_EXP_${String(item.number).padStart(2,'0')}_v1.mp3`}));

export const newUnit2State=()=>({group:'bag',object:null,phrase:null,quantity:1,check:null});
export function updateUnit2State(state,action,value){
 if(action==='u2-group'&&['bag','tools','room'].includes(value)){state.group=value;state.object=null;return true;}
 if(action==='u2-object'&&unit2Objects.some(o=>o.id===value)){state.object=value;return true;}
 if(action==='u2-phrase'&&unit2Expressions.some(p=>p.id===value)){state.phrase=value;return true;}
 if(action==='u2-quantity'&&[1,2,3].includes(Number(value))){state.quantity=Number(value);return true;}
 if(action==='u2-check'&&['notebook','pencil','book'].includes(value)){state.check=value;return true;}
 return false;
}

const art=(id,cls='')=>`<svg class="u2-art ${cls}" viewBox="0 0 160 140" aria-hidden="true" focusable="false"><use href="${iconRoot}${id}"></use></svg>`;
const route=section=>`#course/1st-year/unit/2/${section}`;
function nav(L){return `<nav class="step-nav u2-steps" aria-label="Unit 2 sections / Apartados de la Unidad 2"><a href="${route('learn')}" aria-current="page">1. ${L('Learn · Block A','Learn · Bloque A')}</a>${[['Explore','Explora'],['Practise','Practica'],['Communicate','Comunica'],['Play','Juega']].map(([en,es],i)=>`<span class="u2-soon">${i+2}. ${L(en,es)}</span>`).join('')}</nav>`;}
const crumb=L=>`<nav class="breadcrumb" aria-label="Breadcrumb / Ruta de navegación"><a href="#home">${L('Courses','Cursos')}</a><span aria-hidden="true"> / </span><a href="#course/1st-year">1st Year</a><span aria-hidden="true"> / </span><a href="${route('overview')}">Unit 2 · El aula</a></nav>`;

export function renderUnit2Overview({L}){
 return `<div class="page u2-page">${crumb(L)}<section class="u2-intro"><div><p class="eyebrow">1st Year · Unit 2 · El aula</p><h1 lang="es">¿Qué hay en mi mochila?</h1><p class="lead">${L('Look inside a school bag. Tap a picture, hear the Spanish, and notice how one object becomes more than one.','Mira dentro de una mochila. Toca un dibujo, escucha el español y observa cómo hablamos de uno o varios objetos.')}</p><a class="primary" href="${route('learn')}">${L('Open Learn · Block A','Abrir Learn · Bloque A')}</a></div><div class="u2-hero-art">${art('backpack')}<span lang="es">un lápiz · una goma · unos cuadernos</span></div></section><div class="u2-roadmap">${[['Learn','Aprende'],['Explore','Explora'],['Practise','Practica'],['Communicate','Comunica'],['Play','Juega']].map(([en,es],i)=>`<div class="panel ${i?'u2-unavailable':''}"><span class="number">0${i+1}</span><h2>${L(en,es)}</h2><p>${i?L('Coming later.','Más adelante.'):L('Block A: classroom objects, articles and quantities.','Bloque A: objetos, artículos y cantidades.')}</p>${i?'':`<a href="${route('learn')}">${L('Start learning','Empezar')}</a>`}</div>`).join('')}</div></div>`;
}

export function renderUnit2Learn({L,T,E,button,state}){
 const current=unit2Objects.find(o=>o.id===state.object),phrase=unit2Expressions.find(p=>p.id===state.phrase);
 const shown=unit2Objects.filter(o=>o.group===state.group);
 const groups=[['bag','Inside the bag','En la mochila'],['tools','More school things','Más material'],['room','In the classroom','En el aula']];
 const countText=[null,'Hay un libro.','Hay dos libros.','Hay tres libros.'][state.quantity];
 return `<div class="page u2-page">${crumb(L)}${nav(L)}<section class="u2-intro"><div><p class="eyebrow">Learn · A / 1st Year · Unit 2</p><h1 lang="es">¿Qué hay en mi mochila?</h1><p class="lead">${L('Look, tap and listen. The words stay on screen so you can connect the picture, the spelling and the sound.','Mira, toca y escucha. Las palabras permanecen a la vista para relacionar dibujo, escritura y sonido.')}</p><a href="#u2-objects" class="primary">${L('Discover the objects','Descubrir los objetos')}</a></div><div class="u2-hero-art">${art('backpack')}<span lang="es">un lápiz · una goma · unos cuadernos</span></div></section>
 <section id="u2-objects" class="u2-section" aria-labelledby="u2-objects-title"><p class="eyebrow">01 / ${T('Look & listen','Mira y escucha')}</p><h2 id="u2-objects-title">${L('What can you see?','¿Qué ves?')}</h2><p>${L('Tap any object to hear its recording. Change shelves whenever you like.','Toca cualquier objeto para escuchar su grabación. Cambia de grupo cuando quieras.')}</p><div class="u2-tabs" role="group" aria-label="${E(T('Object groups','Grupos de objetos'))}">${groups.map(([id,en,es])=>button('u2-group',L(en,es),state.group===id?'u2-tab active':'u2-tab',`data-value="${id}" aria-pressed="${state.group===id}"`)).join('')}</div>
 <div class="u2-object-grid">${shown.map(o=>button('u2-object',`${art(o.icon)}<span class="u2-object-name" lang="es">${o.name}</span>${state.mode!=='es'?`<small lang="en">${o.meaning}</small>`:''}<span class="u2-listen">${L('Tap to listen','Toca para escuchar')} <span aria-hidden="true">↗</span></span>`,state.object===o.id?'u2-object selected':'u2-object',`data-value="${o.id}" aria-pressed="${state.object===o.id}" aria-label="${E(T(`Listen: ${o.name}`,`Escuchar: ${o.name}`))}"`)).join('')}</div>
 <div class="u2-spotlight" aria-live="polite">${current?`${art(current.icon)}<div><p class="eyebrow">${T('Now listening','Ahora escuchas')}</p><h3 lang="es">${current.name}</h3><p>${L(current.meaning,current.name)}</p><audio id="u2-object-audio" controls preload="none" src="${current.audio}" aria-label="${E(T(`Recording: ${current.name}`,`Grabación: ${current.name}`))}"></audio><p class="u2-audio-fallback" hidden>${L('Audio unavailable. You can still read the word.','Audio no disponible. Puedes leer la palabra.')}</p></div>`:`${art('pencil')}<div><h3>${L('Choose an object','Elige un objeto')}</h3><p>${L('Its word and recording will appear here.','Aquí aparecerán su palabra y grabación.')}</p></div>`}</div></section>
 <section class="u2-section" aria-labelledby="u2-notice-title"><p class="eyebrow">02 / ${T('Notice the pattern','Observa el patrón')}</p><h2 id="u2-notice-title">${L('One, or more than one?','¿Uno o varios?')}</h2><p>${L('Keep the little word with the object. Listen to the examples and notice what changes.','Aprende la palabra pequeña junto con el objeto. Escucha los ejemplos y observa qué cambia.')}</p><div class="u2-patterns"><article><span class="u2-pattern-badge">un</span>${art('pencil')}<strong lang="es">un lápiz</strong><small>${L('one pencil','un lápiz')}</small></article><article><span class="u2-pattern-badge">una</span>${art('eraser')}<strong lang="es">una goma</strong><small>${L('one eraser','una goma')}</small></article><article><span class="u2-pattern-badge">unos</span>${art('notebooks')}<strong lang="es">unos cuadernos</strong><small>${L('some notebooks','unos cuadernos')}</small></article><article><span class="u2-pattern-badge">unas</span>${art('scissors')}<strong lang="es">unas tijeras</strong><small>${L('some scissors','unas tijeras')}</small></article></div><p class="u2-rule">${L('Watch the word with the noun: un / una for one, unos / unas for several. Some objects use different little words.','Fíjate en la palabra junto al nombre: un / una para uno, unos / unas para varios. Cada objeto lleva la suya.')}</p>
 <div class="u2-phrase-grid">${unit2Expressions.map(p=>button('u2-phrase',`<span lang="es">${p.text}</span><small>${L(p.meaning[0],p.meaning[1])}</small><span class="u2-listen">${L('Listen to the phrase','Escuchar la frase')}</span>`,state.phrase===p.id?'u2-phrase selected':'u2-phrase',`data-value="${p.id}" aria-pressed="${state.phrase===p.id}"`)).join('')}</div>${phrase?`<div class="u2-phrase-player"><span lang="es">${phrase.text}</span><audio id="u2-phrase-audio" controls preload="none" src="${phrase.audio}" aria-label="${E(T(`Recording: ${phrase.text}`,`Grabación: ${phrase.text}`))}"></audio><p class="u2-audio-fallback" hidden>${L('Audio unavailable. Read the phrase instead.','Audio no disponible. Lee la frase.')}</p></div>`:''}</section>
 <section class="u2-section u2-quantity" aria-labelledby="u2-count-title"><p class="eyebrow">03 / ${T('Use what you know','Usa lo que ya sabes')}</p><h2 id="u2-count-title">${L('How many books?','¿Cuántos libros hay?')}</h2><p>${L('You already know these numbers. Change the quantity and read what happens to libro.','Ya conoces estos números. Cambia la cantidad y observa qué pasa con libro.')}</p><div class="u2-count-controls" role="group" aria-label="${E(T('Number of books','Cantidad de libros'))}">${[1,2,3].map(n=>button('u2-quantity',`${n}`,state.quantity===n?'active':'',`data-value="${n}" aria-pressed="${state.quantity===n}"`)).join('')}</div><div class="u2-count-scene"><div class="u2-count-art">${Array.from({length:state.quantity},()=>art('book')).join('')}</div><strong lang="es">${countText}</strong><p>${L('Hay tells us what is there. The number tells us how many.','Hay nos dice lo que hay. El número nos dice cuántos.')}</p>${state.quantity===3?`<audio controls preload="none" src="${unit2Expressions[5].audio}" aria-label="${E(T('Recording: Hay tres libros.','Grabación: Hay tres libros.'))}"></audio>`:''}</div></section>
 <section class="u2-section u2-final" aria-labelledby="u2-check-title"><p class="eyebrow">04 / ${T('A little check','Una pequeña comprobación')}</p><h2 id="u2-check-title">${L('Listen, then point','Escucha y señala')}</h2><p>${L('Listen to “Son unos cuadernos.” Which picture fits? You can try again.','Escucha «Son unos cuadernos». ¿Qué dibujo corresponde? Puedes volver a intentarlo.')}</p><audio controls preload="none" src="${unit2Expressions[3].audio}" aria-label="${E(T('Recording: Son unos cuadernos.','Grabación: Son unos cuadernos.'))}"></audio><div class="u2-check-options">${['pencil','notebook','book'].map(id=>{const o=unit2Objects.find(x=>x.id===id);return button('u2-check',`${art(id==='notebook'?'notebooks':o.icon)}<span lang="es">${id==='notebook'?'unos cuadernos':o.name}</span>`,state.check===id?'selected':'',`data-value="${id}" aria-pressed="${state.check===id}"`);}).join('')}</div>${state.check?`<div class="feedback ${state.check==='notebook'?'':'error'}" role="status">${state.check==='notebook'?L('Yes: cuadernos means notebooks, and unos tells us there are several.','Sí: cuadernos son varios; unos acompaña a esta palabra en plural.'):L('Look for more than one notebook. Listen again and choose another picture.','Busca varios cuadernos. Escucha otra vez y elige otro dibujo.')}</div>`:''}</section><p class="notice">${L('All playback in this block uses the saved Unit 2 MP3 recordings.','Todo lo que se escucha en este bloque procede de los MP3 guardados de la Unidad 2.')}</p></div>`;
}
