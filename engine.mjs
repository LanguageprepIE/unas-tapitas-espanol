export const normalize=s=>String(s??'').normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('es');
export function check(q,value){return (q.answers??[q.answer]).some(a=>normalize(a)===normalize(value));}
const personIndex={yo:0,tu:1,alba:2,nosotros:3,vosotros:4,ellos:5};
export function labForm(kind,person){const i=personIndex[person]??0;
 if(kind==='name')return ['Me llamo','Te llamas','se llama'][Math.min(i,2)];
 return (kind==='age'?['Tengo','Tienes','tiene','tenemos','tenéis','tienen']:['Estoy','Estás','está','estamos','estáis','están'])[i];
}
export function labSentence(kind,person,value){
 const subject={yo:'',tu:'',alba:kind==='name'?'Ella ':'Alba ',nosotros:'Nosotros ',vosotros:'Vosotros ',ellos:'Ellos '}[person]??'';
 return `${subject}${labForm(kind,person)} ${value}${kind==='age'?' años':''}.`;
}
export function savedSnapshot(state){return {schema:1,mode:state.mode,section:state.section,completed:[...state.completed],reviewDate:new Date().toISOString().slice(0,10)};}
export function restoreSnapshot(raw){
 const p=JSON.parse(raw);if(p.schema!==1)throw Error('Unknown progress version');
 return {mode:['en','es','bi'].includes(p.mode)?p.mode:'en',section:['home','learn','explore','practise','communicate','grammar','vocabulary','listening'].includes(p.section)?p.section:'home',completed:Array.isArray(p.completed)?p.completed.filter(x=>['learn','explore','practise','communicate'].includes(x)):[]};
}
// Restricted emphasis for authored explanations; arbitrary HTML stays escaped.
export function teachingMarkup(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])).replace(/\*\*([^*]+)\*\*/g,'<strong class="key-language" lang="es">$1</strong>');}
