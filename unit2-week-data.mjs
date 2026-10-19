const audio=(kind,n)=>`assets/audio/unit2/${kind==='EXP'?'expressions':`vocabulary/${kind==='DIA'?'days':'subjects'}`}/1Y_U02_AUD_${kind}_${String(n).padStart(2,'0')}_v1.mp3`;
export const schoolDays=['lunes','martes','miércoles','jueves','viernes'].map((name,i)=>({id:String(i),name,en:['Monday','Tuesday','Wednesday','Thursday','Friday'][i],audio:audio('DIA',i+1)}));
// Exact recorded wording is kept separately: related vocabulary is never passed off as the full title.
export const schoolSubjects=[
 ['spanish','español','Spanish',1,'español',true,'el'],
 ['english','inglés','English',2,'inglés',true,'el'],
 ['irish','irlandés','Irish',15,'irlandés',true,'el'],
 ['maths','matemáticas','Mathematics',3,'matemáticas',true,'las'],
 ['history','historia','History',5,'historia',true,'la'],
 ['geography','geografía','Geography',6,'geografía',true,'la'],
 ['science','ciencias','Science',4,'ciencias',true,'las'],
 ['pe','educación física','Physical Education',7,'educación física',true,'la'],
 ['business','negocios','Business Studies',11,'empresariales',false,'los'],
 ['homeec','economía doméstica','Home Economics',10,'economía doméstica',false,'la'],
 ['technology','tecnología aplicada','Applied Technology',16,'tecnología aplicada',false,'la'],
 ['engineering','ingeniería','Engineering',17,'ingeniería',false,'la'],
 ['graphics','dibujo técnico','Graphics',18,'dibujo técnico',false,'el'],
 ['wood','tecnología de la madera','Wood Technology',19,'tecnología de la madera',false,'la'],
 ['art','educación plástica','Visual Art',20,'educación plástica',false,'la'],
 ['religion','religión','Religious Education',21,'religión',false,'la'],
 ['sphe','educación personal, social y para la salud','SPHE',13,'educación personal, social y para la salud',false,'la'],
 ['cspe','educación cívica, social y política','CSPE',14,'educación cívica, social y política',false,'la']
].map(([id,name,en,n,recorded,core,article])=>({id,name,en,recorded,core,article,audio:n?audio('ASI',n):null}));
export const subjectById=id=>schoolSubjects.find(s=>s.id===id);
export const weekExpressions=[
 [8,'¿Qué día es hoy?','What day is it today?'],[9,'Hoy es lunes.','Today is Monday.'],
 [10,'¿Cuál es tu asignatura favorita?','What is your favourite subject?'],
 [11,'Mi asignatura favorita es español.','My favourite subject is Spanish.'],
 [12,'No me gustan las matemáticas.','I do not like mathematics.']
].map(([n,text,en])=>({id:String(n),text,en,audio:audio('EXP',n)}));
// A fictional Spanish learner with three option subjects, not every elective.
export const schoolWeek=[
 ['english','maths','spanish','science','history','homeec'],
 ['irish','spanish','geography','maths','wood','pe'],
 ['maths','english','science','homeec','art','sphe'],
 ['irish','english','spanish','history','wood','geography'],
 ['maths','science','pe','cspe']
];
export const classTimes=['09:00–10:00','10:00–11:00','11:15–12:15','12:15–13:15','13:55–14:55','14:55–15:55'];
export const weekListening='assets/audio/unit2/listenings/1Y_U02_AUD_LIS_03_asignaturas_v1.mp3';
// Approved original recovered byte for byte; inventory SHA-256 and full decoding verified.
export const weekListeningAvailable=true;
export const weekChecks=[
 {kind:'audio',audio:weekExpressions[1].audio,question:['Listen. Which day do you hear?','Escucha. ¿Qué día oyes?'],options:['miércoles','lunes','viernes'],answer:'lunes',feedback:['She says “Hoy es lunes”. Lunes means Monday.','Dice «Hoy es lunes».']},
 {kind:'reading',text:'El martes tengo español y matemáticas.',question:['Which two subjects does this student mention?','¿Qué dos asignaturas menciona este estudiante?'],options:['historia y ciencias','español y matemáticas','inglés y geografía'],answer:'español y matemáticas',feedback:['Tengo tells you what classes the student has. Here: Spanish and mathematics.','Tengo indica las clases del estudiante: español y matemáticas.']},
 {kind:'reading',text:'El viernes tengo matemáticas, ciencias, educación física y educación cívica, social y política.',question:['How many classes does this student have on Friday?','¿Cuántas clases tiene este estudiante el viernes?'],options:['tres','seis','cuatro'],answer:'cuatro',feedback:['Four subjects: “Tengo cuatro clases”. Breaks are not classes.','Son cuatro asignaturas: «Tengo cuatro clases». Los descansos no son clases.']}
];
export const newWeekState=()=>({open:false,stage:0,day:0,subject:'spanish',more:false,view:'week',cell:null,preference:'pe',sentiment:'favourite',checkIndex:0,answer:null,ideal:[],idealOpen:false});
export function updateWeekState(s,action,value){
 if(action==='u2b-open'){s.open=true;return true;}if(action==='u2b-back'){s.open=false;return true;}
 if(action==='u2b-stage'&&/^[0-4]$/.test(value)){s.stage=Number(value);return true;}
 if(action==='u2b-day'&&/^[0-4]$/.test(value)){s.day=Number(value);s.cell=null;return true;}
 if(action==='u2b-view'&&['day','week'].includes(value)){s.view=value;return true;}
 if(action==='u2b-subject'&&subjectById(value)){s.subject=value;return true;}
 if(action==='u2b-more'){s.more=!s.more;return true;}
 if(action==='u2b-cell'){const [d,i]=String(value).split(':').map(Number);if(!Number.isInteger(d)||!Number.isInteger(i)||!schoolWeek[d]?.[i])return false;s.day=d;s.cell=i;s.subject=schoolWeek[d][i];return true;}
 if(action==='u2b-preference'&&subjectById(value)){s.preference=value;return true;}
 if(action==='u2b-sentiment'&&['favourite','like','dislike'].includes(value)){s.sentiment=value;return true;}
 if(action==='u2b-answer'&&weekChecks[s.checkIndex].options.includes(value)){s.answer=value;return true;}
 if(action==='u2b-next'&&s.answer===weekChecks[s.checkIndex].answer){s.checkIndex=(s.checkIndex+1)%weekChecks.length;s.answer=null;return true;}
 if(action==='u2b-ideal'&&subjectById(value)){s.ideal=s.ideal.includes(value)?s.ideal.filter(x=>x!==value):s.ideal.length<4?[...s.ideal,value]:s.ideal;return true;}
 return false;
}
export function preferenceSentence(s){const subject=subjectById(s.preference);if(s.sentiment==='favourite')return `Mi asignatura favorita es ${subject.name}.`;return `${s.sentiment==='dislike'?'No me':'Me'} ${subject.article==='las'||subject.article==='los'?'gustan':'gusta'} ${subject.article} ${subject.name}.`;}
