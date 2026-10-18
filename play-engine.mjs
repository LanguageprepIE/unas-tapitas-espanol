import {normalize} from './engine.mjs';
import {workshop,alienPeople,alienPieces} from './data/play-unit1.mjs';
export const newPlayState=()=>({game:null,finished:[],anagrams:{round:0,letters:[],built:false,tokens:[],solved:false,hint:0},alien:{person:'alba',tokens:[],greeted:[],name:false,age:false,feeling:'',spelling:false,inesAge:false,presented:false,left:false,history:[],last:'',line:''},code:{object:'terminal',terminal:false,archive:false,voices:false,opened:false,terminalTokens:[],nameTokens:[],slots:['','','',''],dial:[0,0],transcript:false,hint:0},notice:null});
export function finish(s,id){if(!s.finished.includes(id))s.finished.push(id);}
export function workshopWord(s){const q=workshop[s.round];return s.letters.map(i=>[...q.letters][i]).join('');}
export function checkWord(s){return normalize(workshopWord(s))===normalize(workshop[s.round].word);}
export function checkWorkshopMessage(s){return workshop[s.round].answers.includes(s.tokens.map(i=>workshop[s.round].pieces[i]).join(' '));}
const feedback=(s,en,es)=>{s.notice=[en,es];return true;};
export function updatePlay(s,action,value){
 const a=s.anagrams,c=s.code,x=s.alien;
 if(action==='pg-open'&&['anagrams','alien','code'].includes(value)){s.game=value;s.notice=null;return true;}
 if(action==='pg-menu'){s.game=null;s.notice=null;return true;}
 if(action==='pg-restart'){if(s.game==='anagrams')s.anagrams=newPlayState().anagrams;if(s.game==='alien')s.alien=newPlayState().alien;if(s.game==='code')s.code=newPlayState().code;s.notice=null;return true;}
 if(action==='pg-letter'&&!a.built){const i=Number(value);if(Number.isInteger(i)&&i>=0&&i<[...workshop[a.round].letters].length&&!a.letters.includes(i))a.letters.push(i);s.notice=null;return true;}
 if(action==='pg-letter-undo'){a.letters.pop();s.notice=null;return true;}
 if(action==='pg-word-check'){if(checkWord(a)){a.built=true;return feedback(s,'Word recovered. Now use it in the encounter.','Palabra recuperada. Ahora úsala en el encuentro.');}return feedback(s,'Keep your letters. Try a hint or move the last letter back.','Conserva tus letras. Prueba una pista o devuelve la última letra.');}
 if(action==='pg-work-token'&&a.built&&!a.solved){const i=Number(value);if(workshop[a.round].pieces[i]&&!a.tokens.includes(i))a.tokens.push(i);s.notice=null;return true;}
 if(action==='pg-work-undo'){a.tokens.pop();s.notice=null;return true;}
 if(action==='pg-work-check'){if(checkWorkshopMessage(a)){a.solved=true;if(a.round===workshop.length-1)finish(s,'anagrams');return feedback(s,...workshop[a.round].result);}return feedback(s,...workshop[a.round].hint);}
 if(action==='pg-work-next'&&a.solved&&a.round<workshop.length-1){s.anagrams={round:a.round+1,letters:[],built:false,tokens:[],solved:false,hint:0};s.notice=null;return true;}
 if(action==='pg-hint'){if(s.game==='anagrams')a.hint=Math.min(3,a.hint+1);if(s.game==='code')c.hint=Math.min(3,c.hint+1);return true;}
 if(action==='pg-alien-person'&&alienPeople.some(p=>p.id===value)){x.person=value;x.tokens=[];x.line='';x.last='';s.notice=null;return true;}
 if(action==='pg-alien-token'){const i=Number(value);if(Number.isInteger(i)&&i>=0&&i<alienPieces.length&&x.tokens.length<16)x.tokens.push(i);s.notice=null;return true;}
 if(action==='pg-alien-clear'){x.tokens=[];s.notice=null;return true;}
 if(action==='pg-alien-undo-token'){x.tokens.pop();s.notice=null;return true;}
 if(action==='pg-alien-back'){const prev=x.history.pop();if(prev){const history=x.history;Object.assign(x,prev,{history});s.notice=null;}return true;}
 if(action==='pg-alien-send'){const match=String(value).match(/^(Hola\.|Buenos días\.|Buenas tardes\.)\s+(.+)$/);if(match){alienSend(s,match[1]);return alienSend(s,match[2]);}return alienSend(s,value);}
 if(action==='pg-room'&&['terminal','archive','voices','capsule'].includes(value)){c.object=value;c.hint=0;s.notice=null;return true;}
 if(action==='pg-terminal-token'&&c.terminalTokens.length<4){if(['Hola.','¿Cómo','te','llamas?'].includes(value))c.terminalTokens.push(value);s.notice=null;return true;}
 if(action==='pg-terminal-clear'){c.terminalTokens=[];s.notice=null;return true;}
 if(action==='pg-terminal-check'){if(c.terminalTokens.join(' ')==='Hola. ¿Cómo te llamas?'){c.terminal=true;return feedback(s,'Terminal awake. Archive released. It prints HOLA on a ridiculously long receipt.','Terminal activado. Archivo disponible. Imprime HOLA en un recibo ridículamente largo.');}return feedback(s,'Greet the terminal, then ask its name. Check the question marks.','Saluda al terminal y pregunta cómo se llama. Comprueba los signos.');}
 if(action==='pg-name-token'&&c.nameTokens.length<6){if(['S','a','r','L','e','o'].includes(value))c.nameTokens.push(value);s.notice=null;return true;}
 if(action==='pg-name-clear'){c.nameTokens=[];s.notice=null;return true;}
 if(action==='pg-archive-check'&&c.terminal){if(c.nameTokens.join('')==='Sara'){c.archive=true;return feedback(s,'Record found: Sara → left stand; Leo → right stand. The voice panel is now available.','Registro encontrado: Sara → soporte izquierdo; Leo → soporte derecho. Panel de voces disponible.');}return feedback(s,'Follow the spelling: ese, a, erre, a. You may use a more than once.','Sigue el deletreo: ese, a, erre, a. Puedes usar la a más de una vez.');}
 if(action==='pg-slot'&&c.archive){const [slot,v]=value.split(':');const i=Number(slot);const allowed=[['doce','catorce'],['fenomenal','fatal'],['doce','catorce'],['fenomenal','fatal']];if(allowed[i]?.includes(v))c.slots[i]=v;s.notice=null;return true;}
 if(action==='pg-voices-check'&&c.archive){if(c.slots.join('|')==='doce|fenomenal|catorce|fatal'){c.voices=true;return feedback(s,'Both badges match the voices. Place their ages in the capsule stands.','Las dos acreditaciones coinciden con las voces. Coloca sus edades en los soportes de la cápsula.');}const first=c.slots[0]!=='doce'||c.slots[1]!=='fenomenal';return feedback(s,first?'Check Sara first: listen after Tengo and Estoy. Replay or open the transcript.':'Sara is ready. Check Leo: listen after Tengo and Estoy.',first?'Comprueba primero a Sara: escucha después de Tengo y Estoy. Repite o abre la transcripción.':'Sara está lista. Comprueba a Leo: escucha después de Tengo y Estoy.');}
 if(action==='pg-transcript'){c.transcript=!c.transcript;return true;}
 if(action==='pg-dial'&&c.voices){const [i,delta]=value.split(':').map(Number);if((i===0||i===1)&&Math.abs(delta)===1)c.dial[i]=(c.dial[i]+delta+21)%21;s.notice=null;return true;}
 if(action==='pg-capsule-check'&&c.voices){if(c.dial[0]===12&&c.dial[1]===14){c.opened=true;finish(s,'code');return feedback(s,'Capsule open. All that security… for a first hello!','Cápsula abierta. ¡Tanta seguridad… para un primer hola!');}return feedback(s,'Use the archive to place each person, then the badges to set their ages.','Usa el archivo para situar a cada persona y las acreditaciones para colocar sus edades.');}
 return false;
}
// Finite authored messages; no generated dialogue, free-text grading or network requests.
export function alienSend(s,message){const x=s.alien,p=x.person,m=normalize(message);if(!m)return feedback(s,'Build a message first.','Construye primero un mensaje.');
 const copy=JSON.parse(JSON.stringify(x));delete copy.history;x.history.push(copy);if(x.history.length>12)x.history.shift();x.tokens=[];x.last=message;
 if(/^(hola\.|buenos días\.|buenas tardes\.)$/.test(m)){if(!x.greeted.includes(p))x.greeted.push(p);x.left=false;x.line=p==='alba'?(x.name?(x.age?(x.feeling?'Gracias.':'¿Cómo estás?'):'¿Cuántos años tienes?'):'Hola. ¿Cómo te llamas?'):alienPeople.find(z=>z.id===p).line;return feedback(s,'Encounter started. Look at the speech bubble and decide what to do next.','Encuentro iniciado. Mira el bocadillo y decide qué hacer después.');}
 if(['hasta mañana.','hasta luego.','adiós.'].includes(m)){x.left=true;x.line='Hasta luego.';return feedback(s,x.presented?'Mission complete. Nilo leaves with a readable badge and two new contacts.':'They wave goodbye. Your unfinished badge is still here. Say Hola to return.',x.presented?'Misión completada. Nilo se marcha con una acreditación legible y dos nuevos contactos.':'Se despiden. Tu acreditación sigue incompleta. Di Hola para volver.');}
 if(x.left||!x.greeted.includes(p))return feedback(s,'They have not joined the encounter yet. Start with a greeting.','Todavía no han iniciado el encuentro. Empieza con un saludo.');
 if(m==='¿y tú?'){x.line=p==='ines'?'Estoy fenomenal, gracias.':/tengo/i.test(copy.last)?'Tengo catorce años.':/estoy/i.test(copy.last)?'Estoy bien, gracias.':'Me llamo '+(p==='alba'?'Alba':'Leo')+'.';return feedback(s,'The question goes back to your partner.','La pregunta vuelve a tu interlocutor.');}
 if(m==='¿puedes repetir, por favor?'||m==='más despacio, por favor.'||m==='no entiendo.'){if(!x.line)x.line=alienPeople.find(z=>z.id===p).line;return feedback(s,'The speaker repeats. Their words stay visible as long as you need.','La persona repite. Sus palabras siguen visibles todo el tiempo que necesites.');}
 if(p==='alba'){
  if(m==='me llamo nilo.'||m==='me llamo nilo. ¿y tú?'){x.name=true;x.line='Me llamo Alba. ¿Cuántos años tienes?';return feedback(s,'Name badge repaired: Nilo. Alba can now ask his age.','Nombre corregido: Nilo. Ahora Alba puede preguntar su edad.');}
  if(m==='tengo trece años.'||m==='tengo trece años. ¿y tú?'){if(!x.name){x.line='¿Cómo te llamas?';return feedback(s,'Alba puts 13 in the name box and looks puzzled. That is an age. Try Me llamo…','Alba coloca 13 en la casilla del nombre y se extraña. Es una edad. Prueba Me llamo…');}x.age=true;x.line='Tengo catorce años. ¿Cómo estás?';return feedback(s,'Age recorded: 13. The printer adds a tiny alien crown.','Edad registrada: 13. La impresora añade una coronita extraterrestre.');}
  const feel=m.match(/^estoy (bien|regular|fatal|fenomenal), gracias\.( ¿y tú\?)?$/);if(feel){x.feeling=feel[1];x.line='Estoy bien, gracias.';return feedback(s,'Alba understands. All four feelings are valid. When your badge is ready, visit Inés.','Alba entiende. Los cuatro estados son válidos. Cuando tu acreditación esté lista, visita a Inés.');}
 }
 if(p==='ines'){
  if(m==='¿cómo te llamas?'){x.line='Me llamo Inés.';return feedback(s,'You have a name. Check its spelling for the contact card.','Ya tienes un nombre. Comprueba cómo se escribe para la ficha de contacto.');}
  if(m==='¿cómo se escribe tu nombre?'){x.spelling=true;x.line='Inés se escribe i, ene, e, ese. Con tilde en la e.';return feedback(s,'Contact card repaired: Inés. The accent is part of the written name.','Ficha corregida: Inés. La tilde forma parte del nombre escrito.');}
  if(m==='¿cuántos años tienes?'){x.inesAge=true;x.line='Tengo doce años.';return feedback(s,'Inés: 12. Her contact card now has an age.','Inés: 12. Su ficha de contacto ya tiene edad.');}
  if(m==='¿cómo estás?'){x.line='Estoy fenomenal, gracias. ¿Y tú?';return feedback(s,'Inés feels great. You can answer using Nilo’s chosen feeling.','Inés está fenomenal. Puedes responder con el estado elegido para Nilo.');}
  if(m.startsWith('estoy ')&&/^(estoy (bien|regular|fatal|fenomenal), gracias\.)$/.test(m)){x.feeling=m.split(' ')[1].replace(',','');x.line='Gracias.';return feedback(s,'Inés understands. You can still ask for her name, spelling or age.','Inés entiende. Puedes preguntar por su nombre, su deletreo o su edad.');}
 }
 if(p==='leo'&&m==='se llama nilo. tiene trece años.'){
  if(x.name&&x.age&&x.feeling&&x.spelling&&x.inesAge){x.presented=true;x.line='Hola, Nilo. ¡Mucho gusto!';finish(s,'alien');return feedback(s,'Leo introduces Nilo. Both contact cards are complete. Say goodbye whenever you are ready.','Leo presenta a Nilo. Las fichas están completas. Despídete cuando quieras.');}
  return feedback(s,'Leo needs Nilo’s complete badge and Inés’s checked contact card. Open the notebook to see what is missing.','Leo necesita la acreditación completa de Nilo y la ficha comprobada de Inés. Consulta el cuaderno para ver qué falta.');
 }
 if(m==='¿cómo estás?'){x.line='Estoy bien, gracias.';return feedback(s,'You asked how they feel. That keeps the encounter going.','Has preguntado cómo se encuentra. Así continúa el encuentro.');}
 if(m==='gracias.'){x.line='De nada.';return feedback(s,'A small thank-you keeps the encounter friendly.','Dar las gracias ayuda a mantener un encuentro amable.');}
 return feedback(s,p==='leo'?'Present Nilo to Leo: Se llama Nilo. Tiene trece años.':'The message does not yet give the detail needed. Check the speech bubble or open the phrase guide.',p==='leo'?'Presenta a Nilo a Leo: Se llama Nilo. Tiene trece años.':'El mensaje todavía no aporta el dato necesario. Consulta el bocadillo o la guía de expresiones.');
}
// Only bounded authored state is persisted; undo history and messages stay in memory.
export function playSnapshot(s){return {schema:1,finished:s.finished.filter(x=>['anagrams','alien','code'].includes(x)),workshopRound:s.anagrams.round,workshopComplete:s.finished.includes('anagrams'),alien:{name:s.alien.name,age:s.alien.age,feeling:s.alien.feeling,spelling:s.alien.spelling,inesAge:s.alien.inesAge,presented:s.alien.presented},code:{terminal:s.code.terminal,archive:s.code.archive,voices:s.code.voices,opened:s.code.opened}};}
export function restorePlay(raw){const p=JSON.parse(raw),s=newPlayState();if(p.schema!==1)throw Error('Unknown play progress');s.finished=Array.isArray(p.finished)?p.finished.filter(x=>['anagrams','alien','code'].includes(x)):[];s.anagrams.round=Number.isInteger(p.workshopRound)?Math.max(0,Math.min(workshop.length-1,p.workshopRound)):0;if(p.workshopComplete&&s.finished.includes('anagrams')){s.anagrams.round=workshop.length-1;s.anagrams.built=true;s.anagrams.solved=true;s.anagrams.letters=[...workshop[s.anagrams.round].word].map((ch,i,arr)=>{const used=arr.slice(0,i).filter(c=>c===ch).length;return [...workshop[s.anagrams.round].letters].map((c,j)=>c===ch?j:-1).filter(j=>j>=0)[used];});}for(const k of ['name','age','spelling','inesAge','presented'])s.alien[k]=p.alien?.[k]===true;s.alien.feeling=['bien','regular','fatal','fenomenal'].includes(p.alien?.feeling)?p.alien.feeling:'';s.code.terminal=p.code?.terminal===true;s.code.archive=s.code.terminal&&p.code?.archive===true;s.code.voices=s.code.archive&&p.code?.voices===true;s.code.opened=s.code.voices&&p.code?.opened===true;if(s.code.voices)s.code.slots=['doce','fenomenal','catorce','fatal'];if(s.code.opened)s.code.dial=[12,14];return s;}

// Orientation is derived from story state; it never restricts visits or dialogue.
export function alienGuidance(x){
 const goals=[['name','alba',['Introduce Nilo to Alba.','Preséntale Nilo a Alba.']],['age','alba',['Tell Alba that Nilo is thirteen.','Dile a Alba que Nilo tiene trece años.']],['feeling','alba',['Tell Alba how Nilo feels. Choose any feeling.','Dile a Alba cómo se encuentra Nilo. Elige cualquier estado.']],['spelling','ines',['Ask Inés how her name is spelt.','Pregunta a Inés cómo se escribe su nombre.']],['inesAge','ines',['Ask Inés her age.','Pregunta a Inés su edad.']],['presented','leo',['Introduce Nilo: give Leo his name and age.','Presenta a Nilo: dile a Leo su nombre y edad.']]];
 const completed=goals.filter(([key])=>Boolean(x[key])).length;
 const next=goals.find(([key])=>!x[key]);
 if(!next)return {completed,target:null,objective:['Mission complete. Say goodbye or keep exploring.','Misión completada. Despídete o sigue explorando.'],remaining:['All six mission details are ready.','Los seis datos de la misión están listos.']};
 const [,target,task]=next,name=alienPeople.find(p=>p.id===target).name;
 const objective=x.person!==target?[`Next: visit ${name}. ${task[0]}`,`Siguiente: visita a ${name}. ${task[1]}`]:x.left||!x.greeted.includes(target)?[`Greet ${name} first. Then: ${task[0]}`,`Saluda primero a ${name}. Después: ${task[1]}`]:task;
 return {completed,target,objective,remaining:task};
}
