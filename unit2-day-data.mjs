import {schoolWeek,classTimes,schoolDays,subjectById,weekExpressions} from './unit2-week-data.mjs';
import {validateActivity} from './activity-library/contract.mjs';

// Approved, exact vocabulary clips from Learn B; the longer curricular names below have no linked audio.
const subjectSprite='assets/illustrations/unit2-subjects.svg';
const subject=(id,en,es,number)=>({id,label:{en,es},image:{src:subjectSprite,symbol:id,
  alt:{en:`Illustration for ${en}`,es:`Dibujo de ${es}`}},audio:{src:`assets/audio/unit2/vocabulary/subjects/1Y_U02_AUD_ASI_${String(number).padStart(2,'0')}_v1.mp3`,transcript:es}});
export const cadizDiscovery=validateActivity({
  id:'cadiz-discovery',kind:'illustrated-discovery',section:'Learn',
  objective:{en:'Lucía’s school in Cádiz',es:'El instituto de Lucía en Cádiz'},
  instructions:{en:'Choose a drawing to hear a useful word.',es:'Elige un dibujo para escuchar una palabra útil.'},
  items:[subject('history','History','historia',5),subject('geography','Geography','geografía',6),subject('pe','Physical Education','educación física',7)]
});

// These recordings were approved for Learn B. They say these exact sentences, not a new narration about Lucía.
export const cadizListening=validateActivity({
  id:'cadiz-listening',kind:'listen-choose-reveal',section:'Learn',
  objective:{en:'Listen for a day and a subject',es:'Escucha un día y una asignatura'},
  instructions:{en:'Listen first. Choose an answer; the sentence appears after you get it right.',
    es:'Escucha primero. Elige una respuesta; la frase aparece después de acertar.'},
  items:[
    {id:'monday',question:{en:'Which day do you hear?',es:'¿Qué día oyes?'},
      audio:{src:weekExpressions[1].audio,transcript:'Hoy es lunes.'},
      options:[{id:'monday',label:{en:'Monday',es:'lunes'}},{id:'tuesday',label:{en:'Tuesday',es:'martes'}},{id:'friday',label:{en:'Friday',es:'viernes'}}],answer:'monday',
      feedback:{correct:{en:'Yes, Monday. Find Monday in Lucía’s timetable.',es:'Sí, lunes. Busca el lunes en el horario de Lucía.'},
        incorrect:{en:'Listen once more for the day.',es:'Escucha otra vez para reconocer el día.'}},reveal:{transcript:'after-correct'}},
    {id:'maths',question:{en:'Which subject is mentioned?',es:'¿Qué asignatura se menciona?'},
      audio:{src:weekExpressions[4].audio,transcript:'No me gustan las matemáticas.'},
      options:[{id:'maths',label:{en:'Mathematics',es:'matemáticas'}},{id:'history',label:{en:'History',es:'historia'}},{id:'pe',label:{en:'Physical Education',es:'educación física'}}],answer:'maths',
      feedback:{correct:{en:'Yes, mathematics. You can find it in both timetables.',es:'Sí, matemáticas. Aparece en los dos horarios.'},
        incorrect:{en:'Listen again for the subject at the end.',es:'Escucha otra vez la asignatura al final.'}},reveal:{transcript:'after-correct'}}
  ]
});

export const cadizSubjects={
  lengua:{en:'Spanish Language and Literature',es:'Lengua Castellana y Literatura'},
  maths:{en:'Mathematics',es:'Matemáticas'},gh:{en:'Geography and History',es:'Geografía e Historia'},
  bio:{en:'Biology and Geology',es:'Biología y Geología'},english:{en:'English',es:'Inglés'},
  pe:{en:'Physical Education',es:'Educación Física'},music:{en:'Music',es:'Música'},
  french:{en:'French',es:'Francés'},art:{en:'Visual Art',es:'Educación Plástica, Visual y Audiovisual'},
  computing:{en:'Computing and Robotics (elective)',es:'Computación y Robótica (optativa)'},
  tutor:{en:'Tutor period',es:'Tutoría'},attention:{en:'Educational support',es:'Atención educativa'}
};
// Fictional 1.º ESO: 30 hour-long lessons, one 30-minute break each day. No claim of a standard timetable.
export const cadizWeek=[
  ['lengua','maths','gh','bio','english','pe'],
  ['maths','lengua','bio','gh','music','french'],
  ['english','maths','lengua','pe','bio','art'],
  ['gh','lengua','english','maths','music','computing'],
  ['french','english','pe','computing','tutor','attention']
];
export const cadizTimes=['08:15–09:15','09:15–10:15','10:15–11:15','11:45–12:45','12:45–13:45','13:45–14:45'];
export const irishModel={days:schoolDays,week:schoolWeek,times:classTimes,subject:id=>({en:subjectById(id).en,es:subjectById(id).name})};
export const cadizModel={days:schoolDays,week:cadizWeek,times:cadizTimes,subject:id=>cadizSubjects[id]};

export const comparisons={
  hours:{en:'Start and finish',es:'Entrada y salida',detail:{en:'Lucía: 08:15–14:45 each day. The Irish model: 09:00–15:55 Monday–Thursday and 09:00–13:15 Friday.',
    es:'Lucía: 08:15–14:45 todos los días. El horario irlandés: 09:00–15:55 de lunes a jueves y 09:00–13:15 el viernes.'}},
  breaks:{en:'Breaks',es:'Descansos',detail:{en:'Lucía has a 30-minute morning break after class 3. The Irish model has a 15-minute break after class 2, plus a 40-minute lunch Monday–Thursday. No school lunch on Friday.',
    es:'Lucía tiene un recreo de 30 minutos después de la clase 3. El horario irlandés tiene un descanso de 15 minutos después de la clase 2 y un almuerzo de 40 minutos de lunes a jueves. El viernes no hay almuerzo escolar.'}},
  lessons:{en:'Lessons and subjects',es:'Clases y asignaturas',detail:{en:'Lucía has six classes each day. The Irish model has six Monday–Thursday and four on Friday. Both include Mathematics and English; some subject names are different.',
    es:'Lucía tiene seis clases cada día. El horario irlandés tiene seis de lunes a jueves y cuatro el viernes. Ambos incluyen Matemáticas e Inglés; algunos nombres de asignaturas son diferentes.'}}
};
export const cultureCards=[
  {id:'lucia-finish',statement:{en:'Lucía finishes at 14:45 on Friday.',es:'Lucía termina a las 14:45 el viernes.'},answer:'model',
    feedback:{en:'Yes: her fictional timetable shows that. Other schools can finish at different times.',es:'Sí: aparece en su horario ficticio. Otros centros pueden terminar a otra hora.'}},
  {id:'all-finish',statement:{en:'All Spanish secondary schools finish at 14:45.',es:'Todos los institutos españoles terminan a las 14:45.'},answer:'general',
    feedback:{en:'We cannot conclude that from one timetable. School schedules vary.',es:'No podemos deducirlo de un solo horario. Los horarios cambian según el centro.'}},
  {id:'two-maths',statement:{en:'Both timetables include Mathematics.',es:'En los dos horarios hay Matemáticas.'},answer:'model',
    feedback:{en:'Yes: you can see Mathematics in both examples.',es:'Sí: puedes ver Matemáticas en ambos ejemplos.'}},
  {id:'all-breaks',statement:{en:'Every school in Spain has one 30-minute break.',es:'Todos los institutos españoles tienen un recreo de 30 minutos.'},answer:'general',
    feedback:{en:'That is only Lucía’s fictional example. Other schools may organise breaks differently.',es:'Ese es solo el ejemplo ficticio de Lucía. Otros centros pueden organizar el recreo de otra forma.'}}
];
