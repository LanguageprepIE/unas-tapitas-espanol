const file=(kind,n)=>`assets/audio/unit2/${kind==='TRA'?'vocabulary/transport':'expressions'}/1Y_U02_AUD_${kind}_${String(n).padStart(2,'0')}_v1.mp3`;
export const journeyModes=[
 {id:'walk',words:'a pie',en:'on foot',number:1,fullNumber:14,person:'Emma'},
 {id:'bike',words:'en bicicleta',en:'by bicycle',number:5,fullNumber:29,person:'Sofía',audioAvailable:true,segmentAudio:'assets/audio/unit2/vocabulary/transport/1Y_U02_AUD_TRA_05_v2.mp3'},
 {id:'bus',words:'en autobús',en:'by bus',number:3,person:'Aidan'},
 {id:'car',words:'en coche',en:'by car',number:4,fullNumber:30,person:'Cian'},
 {id:'train',words:'en tren',en:'by train',number:6,person:'Noa'},
 {id:'scooter',words:'en patinete eléctrico',en:'by electric scooter',number:8,fullNumber:15,person:'Hugo'}
].map(x=>({...x,audioAvailable:x.audioAvailable!==false,phrase:`Voy ${x.words}.`,segmentAudio:x.segmentAudio??file('TRA',x.number),fullAudio:x.fullNumber?file('EXP',x.fullNumber):null}));
export const journeyMode=id=>journeyModes.find(x=>x.id===id);
export const journeyQuestion={text:'¿Cómo vas al colegio?',audio:file('EXP',13)};
export const journeyNegative={text:'No voy en coche.',audio:file('EXP',16)};
export const journeyWalking={text:'andando',audio:file('TRA',2)};
export const marcosListening={file:'assets/audio/unit2/listenings/1Y_U02_AUD_LIS_04_transporte_v1.mp3',sha256:'3c734e8829b85ad67dcb23b57603e4e241e212ea26d528e8cd40822df9862a93',duration:21.368163};
export const journeyMinutes=[5,10,15,20,30];
const numberWords={5:'cinco',10:'diez',15:'quince',20:'veinte',30:'treinta'};
export const journeyDistances=[{id:'near',text:'cerca',en:'near'},{id:'far',text:'lejos',en:'far'},{id:'quite-far',text:'bastante lejos',en:'quite far'}];
export const journeyStages=[['A school morning','Una mañana en el instituto'],['How do you say it?','¿Cómo lo dices?'],['Who is speaking?','Voy, vas, va'],['How long does it take?','¿Cuánto tardas?'],['Listen to Marcos','Escucha a Marcos']];
export const journeyResponses=[
 {id:'routine',en:'Describe a routine',es:'Habla de una rutina',steps:['en autobús','Voy en autobús.','Normalmente voy en autobús.'],audio:file('EXP',17),available:true},
 {id:'reason',en:'Give a reason',es:'Explica el motivo',steps:['andando','Voy andando.','Voy andando porque vivo cerca.'],audio:file('EXP',18),available:true},
 {id:'contrast',en:'Contrast two journeys',es:'Contrasta dos trayectos',steps:['en coche / en bicicleta','No voy en coche.','No voy en coche. Voy en bicicleta.'],audio:file('EXP',19),available:true}
];
export const journeyReviewAudio=[
 ['en bicicleta','assets/audio/unit2/vocabulary/transport/1Y_U02_AUD_TRA_05_v2.mp3'],
 ...[
  'Normalmente voy en autobús.','Voy andando porque vivo cerca.','No voy en coche. Voy en bicicleta.',
  'Vivo cerca del colegio.','Vivo lejos del colegio.','Vivo bastante lejos.',
  '¿Vives cerca o lejos?','¿Cuánto tardas en llegar al colegio?',
  'Normalmente tardo diez minutos.','Tardo unos veinte minutos.','Tardo media hora.',
  'Mi hermana va en bicicleta.','Voy en bicicleta.','Normalmente voy en coche con mi padre.'
 ].map((text,index)=>[text,file('EXP',index+17)])
];
export const newJourneyState=()=>({open:false,stage:0,phase:'listen',listenIndex:0,listenChoice:null,arrival:null,transport:'walk',walking:'pie',person:'yo',distance:'near',minutes:10,level:1,timeStyle:'exact',answer:null,sayIntent:'routine',sayStep:0});
export function updateJourneyState(s,action,value){
 if(action==='u2c-open'){s.open=true;return true;}
 if(action==='u2c-phase'&&['listen','personal'].includes(value)){s.phase=value;return true;}
 if(action==='u2c-listen-choice'){s.listenChoice=value;return true;}
 if(action==='u2c-listen-next'){s.listenIndex=(s.listenIndex+1)%5;s.listenChoice=null;return true;}
 if(action==='u2c-stage'&&/^[0-4]$/.test(value)){s.stage=Number(value);return true;}
 if(action==='u2c-arrival'&&journeyMode(value)){s.arrival=value;return true;}
 if(action==='u2c-transport'&&journeyMode(value)){s.transport=value;if(value==='walk')s.walking='pie';return true;}
 if(action==='u2c-walking'&&['pie','andando'].includes(value)){s.walking=value;return true;}
 if(action==='u2c-say-intent'&&journeyResponses.some(x=>x.id===value)){s.sayIntent=value;s.sayStep=0;return true;}
 if(action==='u2c-say-step'&&[0,1,2].includes(Number(value))){s.sayStep=Number(value);return true;}
 if(action==='u2c-person'&&['yo','tu','ella'].includes(value)){s.person=value;return true;}
 if(action==='u2c-distance'&&journeyDistances.some(d=>d.id===value)){s.distance=value;return true;}
 if(action==='u2c-minutes'&&journeyMinutes.includes(Number(value))){s.minutes=Number(value);if(s.minutes!==30&&s.timeStyle==='half')s.timeStyle='exact';return true;}
 if(action==='u2c-level'&&[1,2,3].includes(Number(value))){s.level=Number(value);return true;}
 if(action==='u2c-time-style'&&(['exact','approx'].includes(value)||(value==='half'&&s.minutes===30))){s.timeStyle=value;return true;}
 if(action==='u2c-answer'&&['walk','bike','bus'].includes(value)){s.answer=value;return true;}
 return false;
}
export const journeyTransportWords=s=>s.transport==='walk'&&s.walking==='andando'?'andando':journeyMode(s.transport).words;
export const journeyDuration=s=>s.timeStyle==='half'&&s.minutes===30?'media hora':`${s.timeStyle==='approx'?'unos ':''}${numberWords[s.minutes]} minutos`;
export function journeyModel(s){
 const transport=journeyTransportWords(s),distance=journeyDistances.find(d=>d.id===s.distance).text;
 if(s.level===1)return `Voy ${transport}.`;
 const model=`Normalmente voy al colegio ${transport} porque vivo ${distance}.`;
 return s.level===2?model:`${model} Tardo ${journeyDuration(s)} en llegar.`;
}
export const journeyAudioFiles=[...new Set([...journeyModes.filter(x=>x.audioAvailable).map(x=>x.segmentAudio),...journeyModes.filter(x=>x.fullAudio).map(x=>x.fullAudio),journeyQuestion.audio,journeyNegative.audio,journeyWalking.audio,marcosListening.file,...journeyReviewAudio.map(([,path])=>path)])];
