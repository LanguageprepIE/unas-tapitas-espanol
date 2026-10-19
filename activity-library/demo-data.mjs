// Four independent data instances, two of each renderer. Sources are approved U2 Learn A/C assets.
const objects = 'assets/illustrations/unit2-objects.svg';
const journeys = 'assets/illustrations/unit2-journeys.svg';
const objAudio = number => `assets/audio/unit2/vocabulary/objects/1Y_U02_AUD_OBJ_${number}_v1.mp3`;
const traAudio = number => `assets/audio/unit2/vocabulary/transport/1Y_U02_AUD_TRA_${number}_v1.mp3`;
const expAudio = number => `assets/audio/unit2/expressions/1Y_U02_AUD_EXP_${number}_v1.mp3`;
const word = (id, en, es, src, audio) => ({id,label:{en,es},image:{src,symbol:id,alt:{en,es}},audio:{src:audio,transcript:es}});
const choice = (id,en,es) => ({id,label:{en,es}});

export const demonstrations = [
  {
    id:'demo-classroom-objects',kind:'illustrated-discovery',section:'Learn',
    objective:{en:'Discover classroom objects',es:'Descubre objetos del aula'},
    instructions:{en:'Choose a picture, then listen to its word.',es:'Elige un dibujo y escucha su palabra.'},
    items:[word('pencil','a pencil','un lápiz',objects,objAudio('01')),
      word('eraser','an eraser','una goma',objects,objAudio('03'))]
  },
  {
    id:'demo-school-transport',kind:'illustrated-discovery',section:'Learn',
    objective:{en:'Discover ways of getting to school',es:'Descubre formas de ir al instituto'},
    instructions:{en:'Choose a picture, then listen to its expression.',es:'Elige un dibujo y escucha su expresión.'},
    items:[word('bike','by bicycle','en bicicleta',journeys,
      'assets/audio/unit2/vocabulary/transport/1Y_U02_AUD_TRA_05_v2.mp3'),
      word('bus','by bus','en autobús',journeys,traAudio('03'))]
  },
  {
    id:'demo-listen-objects',kind:'listen-choose-reveal',section:'Learn',
    objective:{en:'Recognise an object by listening',es:'Reconoce un objeto al escuchar'},
    instructions:{en:'Listen and choose the object you hear.',es:'Escucha y elige el objeto que oyes.'},
    items:[{
      id:'one-pencil',question:{en:'Which object do you hear?',es:'¿Qué objeto oyes?'},
      audio:{src:expAudio('02'),transcript:'Es un lápiz.'},
      options:[choice('pencil','a pencil','un lápiz'),choice('pen','a pen','un bolígrafo'),choice('eraser','an eraser','una goma')],
      answer:'pencil',feedback:{correct:{en:'Yes, a pencil.',es:'Sí, un lápiz.'},incorrect:{en:'Listen again and try another object.',es:'Escucha otra vez y prueba otro objeto.'}},
      reveal:{transcript:'after-correct'}
    }]
  },
  {
    id:'demo-listen-distance',kind:'listen-choose-reveal',section:'Learn',
    objective:{en:'Recognise a distance by listening',es:'Reconoce una distancia al escuchar'},
    instructions:{en:'Listen and choose where the speaker lives.',es:'Escucha y elige dónde vive quien habla.'},
    items:[{
      id:'near-school',question:{en:'Where does the speaker live?',es:'¿Dónde vive quien habla?'},
      audio:{src:expAudio('20'),transcript:'Vivo cerca del colegio.'},
      options:[choice('near','Near school','Cerca del colegio'),choice('far','Far from school','Lejos del colegio')],
      answer:'near',feedback:{correct:{en:'Yes, nearby.',es:'Sí, cerca.'},incorrect:{en:'Listen again and try another distance.',es:'Escucha otra vez y prueba otra distancia.'}},
      reveal:{transcript:'after-correct'}
    }]
  }
];
