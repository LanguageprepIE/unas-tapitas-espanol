import {unit2Objects} from './unit2-learn.mjs';
import {schoolSubjects,schoolWeek,schoolDays,subjectById} from './unit2-week-data.mjs';
import {journeyModes,journeyMode} from './unit2-journey-data.mjs';
export {schoolSubjects,schoolDays,subjectById,journeyModes,journeyMode};
export const nouns=[
 ['book','libro','libros','m'],['notebook','cuaderno','cuadernos','m'],['eraser','goma','gomas','f'],['ruler','regla','reglas','f'],['backpack','mochila','mochilas','f'],['pencil','lápiz','lápices','m'],['sharpener','sacapuntas','sacapuntas','m'],['scissors','tijeras','tijeras','f']
].map(([id,singular,plural,gender])=>({...unit2Objects.find(o=>o.id===id),singular,plural,gender}));
export const labNames=[['words','Word detective','El detective de palabras'],['preferences','Preferences lab','El laboratorio de preferencias'],['timetable','My timetable, my rules','Mi horario, mis reglas'],['journeys','How do we get to school?','¿Cómo llegamos al colegio?']];
export const timeOptions={start:[480,495,510,525,540,555,570,585,600],duration:[30,45,50,60],breakDuration:[5,10,15,20,30,40],lunchDuration:[0,20,30,40,60]};
export const clock=n=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
const newDay=(classes)=>({classes:[...classes],start:540,duration:60,breakAfter:2,breakDuration:15,lunchAfter:4,lunchDuration:classes.length>4?40:0});
export const newUnit2ExploreState=()=>({lab:'words',visited:['words'],words:{object:'book',count:1,article:'un',form:'singular',pinned:null},preferences:{people:[{name:'Alba',subject:'history',sentiment:'like'},{name:'Leo',subject:'maths',sentiment:'dislike'}]},timetable:{day:0,cell:0,finished:false,days:schoolWeek.map(newDay),before:null},journeys:{distance:'near',transport:'walk',pinned:null}});
export function nounModel(w){const n=nouns.find(n=>n.id===w.object),plural=n.id==='scissors'||w.count>1;return {noun:n,plural,article:n.gender==='m'?(plural?'unos':'un'):(plural?'unas':'una'),word:plural?n.plural:n.singular};}
export function nounFeedback(w){const m=nounModel(w),actual=w.form==='plural'?m.noun.plural:m.noun.singular,match=w.article===m.article&&actual===m.word;return {match,attempt:`${w.article} ${actual}`,model:`${m.article} ${m.word}`,special:m.noun.id==='scissors'?'scissors':m.noun.id==='sharpener'?'invariant':m.noun.id==='pencil'?'pencil':'regular',...m};}
export function preferenceModel(p){const sub=subjectById(p.subject),plural=['las','los'].includes(sub.article);if(p.sentiment==='favourite')return {text:`Mi asignatura favorita es ${sub.name}.`,verb:'',sub};return {text:`${p.sentiment==='dislike'?'No me':'Me'} ${plural?'gustan':'gusta'} ${sub.article} ${sub.name}.`,verb:plural?'gustan':'gusta',sub};}
export function timetableRows(d){let time=d.start;const rows=[];d.classes.forEach((subject,i)=>{rows.push({kind:'class',subject,index:i,start:time,end:time+d.duration});time+=d.duration;if(i+1<d.classes.length){for(const [kind,after,duration] of [['break',d.breakAfter,d.breakDuration],['lunch',d.lunchAfter,d.lunchDuration]])if(i+1===after&&duration>0){rows.push({kind,start:time,end:time+duration});time+=duration;}}});return {rows,end:time};}
// Explicit fictional examples. No speed formula or claim about real transport times.
export const journeyScenarios={near:{words:'cerca',en:'near',x:230,times:{walk:10,bike:5,bus:10,car:5,train:15,scooter:5}},far:{words:'lejos',en:'far',x:130,times:{walk:30,bike:15,bus:20,car:15,train:20,scooter:20}},'quite-far':{words:'bastante lejos',en:'quite far',x:35,times:{walk:30,bike:20,bus:30,car:20,train:15,scooter:20}}};
const minuteWords={5:'cinco',10:'diez',15:'quince',20:'veinte',30:'treinta'};
export function journeyResult(j){const scenario=journeyScenarios[j.distance],mode=journeyMode(j.transport),minutes=scenario.times[j.transport];return {distance:j.distance,transport:j.transport,minutes,text:`Voy ${mode.words}. Vivo ${scenario.words} del colegio. Tardo ${minuteWords[minutes]} minutos.`,scenario,mode};}
const includes=(arr,v)=>arr.includes(Number(v));
export function updateUnit2Explore(s,action,value){
 const w=s.words,t=s.timetable,j=s.journeys,d=t.days[t.day];
 if(action==='u2x-lab'&&labNames.some(([id])=>id===value)){s.lab=value;if(!s.visited.includes(value))s.visited.push(value);return true;}
 if(action==='u2x-object'&&nouns.some(n=>n.id===value)){w.object=value;return true;}
 if(action==='u2x-count'&&includes([1,2,3],value)){w.count=Number(value);return true;}
 if(action==='u2x-article'&&['un','una','unos','unas'].includes(value)){w.article=value;return true;}
 if(action==='u2x-form'&&['singular','plural'].includes(value)){w.form=value;return true;}
 if(action==='u2x-word-pin'){w.pinned={...nounFeedback(w),count:w.count};return true;}
 if(action==='u2x-pref-swap'){[s.preferences.people[0].subject,s.preferences.people[1].subject]=[s.preferences.people[1].subject,s.preferences.people[0].subject];return true;}
 if(action==='u2x-pref-person'){[s.preferences.people[0].name,s.preferences.people[1].name]=[s.preferences.people[1].name,s.preferences.people[0].name];return true;}
 const pref=action.match(/^u2x-pref-(subject|sentiment)-([01])$/);
 if(pref){const [,key,i]=pref;if(key==='subject'&&!schoolSubjects.some(x=>x.id===value))return false;if(key==='sentiment'&&!['like','dislike','favourite'].includes(value))return false;s.preferences.people[i][key]=value;return true;}
 if(action==='u2x-day'&&includes([0,1,2,3,4],value)){t.day=Number(value);t.cell=0;return true;}
 if(action==='u2x-cell'&&Number.isInteger(Number(value))&&d.classes[Number(value)]){t.cell=Number(value);return true;}
 if(action==='u2x-subject'&&subjectById(value)){d.classes[t.cell]=value;return true;}
 const setting=action.match(/^u2x-time-(start|duration|breakAfter|breakDuration|lunchAfter|lunchDuration)$/);
 if(setting){const key=setting[1],v=Number(value);if(key.endsWith('After')?!Number.isInteger(v)||v<1||v>=d.classes.length:!timeOptions[key].includes(v))return false;d[key]=v;return true;}
 if(action==='u2x-add'&&d.classes.length<8){d.classes.push('spanish');return true;}
 if(action==='u2x-remove'&&d.classes.length>1){d.classes.splice(t.cell,1);d.breakAfter=Math.min(d.breakAfter,Math.max(1,d.classes.length-1));d.lunchAfter=Math.min(d.lunchAfter,Math.max(1,d.classes.length-1));t.cell=Math.min(t.cell,d.classes.length-1);return true;}
 if(action==='u2x-move'&&['up','down'].includes(value)){const at=t.cell+(value==='up'?-1:1);if(at<0||at>=d.classes.length)return false;[d.classes[at],d.classes[t.cell]]=[d.classes[t.cell],d.classes[at]];t.cell=at;return true;}
 if(action==='u2x-time-pin'){t.before={day:t.day,end:timetableRows(d).end,classes:d.classes.length,duration:d.duration};return true;}
 if(action==='u2x-apply-week'){t.days=t.days.map((other,i)=>i===t.day?d:{...d,classes:Array.from({length:d.classes.length},(_,k)=>other.classes[k]??'spanish')});return true;}
 if(action==='u2x-finish'){t.finished=!t.finished;return true;}
 if(action==='u2x-distance'&&journeyScenarios[value]){j.distance=value;return true;}
 if(action==='u2x-transport'&&journeyMode(value)){j.transport=value;return true;}
 if(action==='u2x-journey-pin'){j.pinned={...journeyResult(j)};return true;}
 return false;
}

export function unit2ExploreAnnouncement(s){
 if(s.lab==='words'){const f=nounFeedback(s.words);return [`Your experiment: ${f.attempt}. Model: ${f.model}.`,`Tu experimento: ${f.attempt}. Modelo: ${f.model}.`];}
 if(s.lab==='preferences'){const text=s.preferences.people.map(p=>`${p.name}: ${preferenceModel(p).text}`).join(' ');return [text,text];}
 if(s.lab==='timetable'){const d=s.timetable.days[s.timetable.day],end=clock(timetableRows(d).end);return [`${schoolDays[s.timetable.day].en}: ${d.classes.length} classes. Finish ${end}.`,`${schoolDays[s.timetable.day].name}: ${d.classes.length} clases. Salida ${end}.`];}
 const r=journeyResult(s.journeys);return [r.text,r.text];
}
