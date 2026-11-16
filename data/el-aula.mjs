import {packGender,packNumber,identifyAndCount,likesPattern} from './unit2-foundations.mjs';
import {unit2Objects,unit2Expressions} from '../unit2-learn.mjs';
import {schoolDays,schoolSubjects,schoolWeek,classTimes,subjectById,weekExpressions} from '../unit2-week-data.mjs';
import {journeyModes,journeyMode,journeyQuestion,journeyNegative,journeyWalking} from '../unit2-journey-data.mjs';

const object=id=>unit2Objects.find(o=>o.id===id);
const word=id=>object(id).name;
const subject=id=>subjectById(id).name;
const recorded=(src,text)=>({src,text});
const objAudio=id=>recorded(object(id).audio,word(id));
const dayAudio=id=>recorded(schoolDays[id].audio,schoolDays[id].name);
const journeyAudio=id=>recorded(journeyMode(id).segmentAudio,journeyMode(id).words);
const exprAudio=n=>{const x=unit2Expressions.find(v=>v.number===n);return recorded(x.audio,x.text);};
const weekAudio=n=>{const x=weekExpressions.find(v=>v.id===String(n));return recorded(x.audio,x.text);};
const closed=(id,prompt,source,options,answer,hint,why,extra={})=>({id,prompt,source,options,answers:[answer],hint,why,...extra});
const recall=(id,prompt,source,answers,hint,why,extra={})=>({id,prompt,source,answers,hint,why,...extra});
const listen=['Listen, then choose what you hear.','Escucha y elige lo que oyes.'];
const finish=['Complete the phrase.','Completa la expresión.'];
const select=['Choose the phrase that fits.','Elige la expresión que encaja.'];
const objectRule=['The article and noun must match in gender and number.','El artículo y el sustantivo tienen que concordar en género y número.'];
const gustRule=['Look at what is liked: is it one thing, several things or an action?','Fíjate en lo que gusta: ¿es una cosa, varias cosas o una acción?'];
const tripRule=['Look for **a pie** or **en** before the transport.','Busca **a pie** o en delante del medio de transporte.'];
const dayRule=['Start with the day, then check the time or subject in that column.','Busca primero el día y comprueba la hora o la asignatura de esa columna.'];
export const timetable=schoolDays.slice(0,2).map((day,i)=>({day:day.name,rows:schoolWeek[i].slice(0,3).map((id,j)=>[classTimes[j],subject(id)])}));
export const coreObjects=['pencil','pen','eraser','ruler','notebook','book','backpack','scissors'].map(object);
export const coreSubjects=schoolSubjects.filter(x=>x.core);
export const objectSprite='assets/illustrations/unit2-objects.svg';

export const practiceRounds=[
 {id:'kit',title:['The school bag','La mochila'],help:['objects','agreement'],items:[
  closed('p-kit-a',listen,'',[word('book'),word('pencil'),word('pen')],word('pencil'),['Listen to the last word.','Escucha la última palabra.'],['The speaker identifies a pencil: **lápiz**.','Se identifica un **lápiz**.'],{audio:exprAudio(2)}),
  closed('p-kit-b',select,'1 × mochila',['un mochila','una mochila','unas mochilas'],'una mochila',objectRule,['**Mochila** is feminine and there is one: **una**.','**Mochila** es femenino y solo hay una: una.']),
  recall('p-kit-c',finish,'dos ___ (cuaderno)',['cuadernos'],['You need the plural noun only.','Escribe solo el sustantivo en plural.'],['**Cuaderno** ends in a vowel, so add **-s** here.','**Cuaderno** termina en vocal: aquí se añade -s.'])
 ]},
 {id:'week',title:['The timetable','El horario'],help:['school-week'],table:true,items:[
  closed('p-week-a',['Read the note. Use the timetable to find the day.','Lee la nota. Usa el horario para encontrar el día.'],'A las 09:00 tengo inglés.',['martes','lunes'],'lunes',dayRule,['Look across the 09:00 row: **inglés** is under **lunes**, while **irlandés** is under **martes**.','Mira la fila de las 09:00: **inglés** está en la columna del **lunes** e **irlandés** en la del **martes**.']),
  closed('p-week-b',['Read the note. Find the class in the timetable.','Lee la nota. Busca la asignatura en el horario.'],'El martes, ¿qué clase hay a las 10:00?',['matemáticas','irlandés','español'],'español',dayRule,['In the **martes** column, **irlandés** starts at 09:00 and **español** starts at 10:00.','En la columna del **martes**, **irlandés** empieza a las 09:00 y **español** a las 10:00.']),
  recall('p-week-c',['Read the note. Write the subject in Spanish.','Lee la nota. Escribe la asignatura en español.'],'El lunes, ¿qué clase hay a las 10:00?',['matemáticas'],dayRule,['The 10:00 row under **lunes** shows **matemáticas**.','La fila de las 10:00 del **lunes** indica **matemáticas**.'])
 ]},
 {id:'likes',title:['Preferences','Preferencias'],help:['gustar'],items:[
  closed('p-like-a',finish,'Me ___ la historia.',['gustan','gusta'],'gusta',gustRule,['**La historia** is singular.','**La historia** está en singular.']),
  closed('p-like-b',listen,'',['No me gustan las matemáticas.','Me gustan las matemáticas.','No me gusta la historia.'],'No me gustan las matemáticas.',['Listen for **no** and the name of the subject.','Escucha si se dice no y fíjate en la asignatura.'],['**No** makes it negative and **las matemáticas** names the subject.','No indica negación y **las matemáticas** es la asignatura.'],{audio:weekAudio(12)}),
  recall('p-like-c',finish,'A Lucía le ___ estudiar español.',['gusta'],gustRule,['**Estudiar** is an infinitive; use **gusta** for this action.','**Estudiar** es un infinitivo; para esta acción se usa **gusta**.'])
 ]},
 {id:'trip',title:['Getting to school','Ir al instituto'],help:['journeys'],items:[
  closed('p-trip-a',listen,'',['en coche','a pie','en patinete eléctrico'],'a pie',['Listen again and notice how the speaker describes the journey.','Escucha otra vez y fíjate en cómo la persona describe el trayecto.'],['The speaker says they walk, not that they take a vehicle.','La persona dice que va caminando, no en un vehículo.'],{audio:recorded(journeyMode('walk').fullAudio,journeyMode('walk').phrase)}),
  recall('p-trip-b',finish,'Voy ___ autobús.',['en'],['What short word goes between the verb and the vehicle?','¿Qué palabra corta va entre el verbo y el vehículo?'],['With **autobús**, use **en**.','Con **autobús** se usa en.']),
  closed('p-trip-c',['Read Noa’s message. Choose how Emma can pass it on.','Lee el mensaje de Noa. Elige cómo puede contarlo Emma.'],'Noa: «Voy en tren».',['Voy en tren.','Noa va en tren.','Noa va en autobús.'],'Noa va en tren.',['Who is Emma talking about? Check the transport in the message too.','¿De quién habla Emma? Comprueba también el medio de transporte del mensaje.'],['Emma uses **va** because she is talking about Noa. The message says **en tren**.','Emma usa va porque habla de Noa. El mensaje dice **en tren**.'])
 ]}
];

const resource=(id,title,type,tags,quick,lesson,items,apply,review,bank)=>({id,title,type,tags,quick,lesson,items,apply,review,bank,level:'1st-year'});
export const resources=[
 resource('objects',['School objects','Objetos escolares'],'vocabulary',['mochila','material escolar','school bag','classroom','cuaderno','lápiz'],
  ['Learn the article with the object: **un lápiz**, **una goma**.','Aprende el artículo junto con el objeto: **un lápiz**, **una goma**.'],
  [
   ['Start with the essentials in the pictures. Read the article and noun together, then listen and say the pair aloud.','Empieza con el material de las imágenes. Lee el artículo y el sustantivo juntos, escucha y repite el grupo.'],
   ...identifyAndCount
  ],[
   closed('r-obj-a',listen,'',[word('eraser'),word('ruler'),word('pencil')],word('eraser'),['Listen for the name after **una**.','Escucha el nombre después de una.'],['**Goma** is the eraser in this list.','**Goma** es el objeto que sirve para borrar.'],{audio:objAudio('eraser')}),
   recall('r-obj-b',['Write the Spanish name with the article.','Escribe el nombre en español con el artículo.'],'',['un cuaderno'],['It is an object for writing your notes.','Sirve para tomar apuntes.'],['**Cuaderno** is masculine; use **un** for one.','**Cuaderno** es masculino; usa un para indicar uno.'],{image:'notebook',alt:['Object for taking notes','Objeto para tomar apuntes']}),
   closed('r-obj-c',['Which object is missing?','¿Qué objeto falta?'],'No tengo regla.',['una goma','un bolígrafo','una regla'],'una regla',['Read the word after **No tengo**.','Lee la palabra que va después de **No tengo**.'],['**Regla** refers to the ruler.','**Regla** indica qué objeto falta.'])
  ],['Write a short list of three things you would pack. Then say what you have using **Tengo…**','Escribe una lista de tres cosas que llevarías. Después, di lo que tienes usando **Tengo…**'],
  ['Compare each noun with the picture and check its article.','Compara cada nombre con la imagen y comprueba su artículo.'],'objects'),
 resource('agreement',['Articles, gender and number','Artículos, género, número y concordancia'],'grammar',['concordancia','singular','plural','género','gender','indefinite','definite','article'],
  ['Compare **una mochila** and **unas mochilas**. The article and the noun change together.','Compara **una mochila** y **unas mochilas**. El artículo y el sustantivo cambian juntos.'],
  [
   ...packGender,
   ['Nouns ending in **-e** or a consonant can be masculine or feminine: compare **un estuche** and **la clase**; **un lápiz** and **la pared** (an extra example).',
    'Los sustantivos acabados en **-e** o consonante pueden ser masculinos o femeninos: compara **un estuche** y **la clase**; **un lápiz** y **la pared** (un ejemplo adicional).'],
   ...packNumber,
   ['The article agrees with the noun in gender and number. The chart shows all four possible combinations.',
    'El artículo concuerda con el sustantivo en género y número. La tabla muestra las cuatro combinaciones.'],
   ['Use an indefinite article when you do not mean a particular object: **Necesito un lápiz** (any pencil). Use a definite article when it is clear which one you mean: **El lápiz de Lucía** (a particular pencil).',
    'Usa un artículo indefinido si no te refieres a un objeto concreto: **Necesito un lápiz** (cualquiera). Usa un artículo definido si está claro a cuál te refieres: **El lápiz de Lucía** (uno en concreto).']
  ],[
   closed('r-agr-gender',['Which pair shows masculine first and feminine second?','¿Qué pareja presenta primero el masculino y después el femenino?'],'',['el día / la mano','la mano / el día'],'el día / la mano',['Use the articles, not the final vowels.','Fíjate en los artículos, no en las vocales finales.'],['**El** marks **día** as masculine and **la** marks **mano** as feminine, even though their endings suggest the opposite.','**El** indica que **día** es masculino y **la**, que **mano** es femenino, aunque las terminaciones parezcan indicar lo contrario.']),
   closed('r-agr-e',['Which pair contains two words ending in -e with different genders?','¿En qué pareja hay dos palabras en -e de distinto género?'],'',['el estuche / la clase','el estuche / los estuches'],'el estuche / la clase',['Compare the articles: changing number does not change gender.','Compara los artículos: cambiar el número no cambia el género.'],['**El estuche** is masculine; **la clase** is feminine. **Los estuches** is still masculine.','**El estuche** es masculino y **la clase** es femenino. **Los estuches** sigue siendo masculino.']),
   closed('r-agr-a',select,'1 × libro → varios',['unos libros','unas libros','un libros'],'unos libros',objectRule,['**Libro** is masculine and the group is plural, so choose **unos**.','**Libro** es masculino y el grupo está en plural: **unos**.']),
   closed('r-agr-b',finish,'la mochila → ___ mochilas',['las','los','la'],'las',objectRule,['You are keeping the definite article; the feminine plural form is **las**.','Se mantiene el artículo definido: la forma femenina en plural es las.']),
   recall('r-agr-consonant',['Write the whole group in the plural.','Escribe todo el grupo en plural.'],'un rotulador → ___',['unos rotuladores'],['Change both the article and the noun.','Cambia el artículo y el sustantivo.'],['**Un** becomes **unos** and **rotulador** adds **-es** after **-r**.','**Un** cambia a **unos** y **rotulador** añade **-es** después de **-r**.']),
   recall('r-agr-c',finish,'un lápiz → unos ___',['lápices'],['Look at the final consonant, not just the number.','Fíjate en la consonante final, además del número.'],['The final **z** changes to **c** before **-es**.','La z final cambia a c delante de **-es**.']),
   recall('r-agr-invariant',['Show that you have several by writing the whole group in the plural.','Escribe todo el grupo en plural para indicar que tienes varios.'],'un sacapuntas → ___',['unos sacapuntas'],['Check whether the noun ending changes in the example above.','Comprueba si la terminación del sustantivo cambia en el ejemplo de arriba.'],['Only the article changes: **un → unos**. **Sacapuntas** stays the same.','Solo cambia el artículo: **un → unos**. **Sacapuntas** no cambia.']),
   closed('r-agr-d',select,'1 × ✂',['una tijeras','un tijeras','unas tijeras'],'unas tijeras',['Use the form presented in this unit.','Usa la forma que se ha presentado en esta unidad.'],['**Unas tijeras** is the plural group practised here, even for one pair.','**Unas tijeras** es el grupo en plural que practicamos aquí, aunque haya una sola herramienta.']),
   closed('r-agr-context',['Choose an article for any notebook, then one for Lucía’s specific notebook.','Elige un artículo para cualquier cuaderno y otro para el cuaderno concreto de Lucía.'],'Necesito ___ cuaderno. Aquí está ___ cuaderno de Lucía.',['un / el','el / un','una / la'],'un / el',['Both articles must be masculine singular. Which notebook is identified?','Los dos artículos deben estar en masculino singular. ¿En qué frase sabemos de qué cuaderno se trata?'],['**Un cuaderno** can be any notebook; **el cuaderno de Lucía** identifies which one.','**Un cuaderno** puede ser cualquiera; **el cuaderno de Lucía** identifica de cuál se trata.']),
   recall('r-agr-material',['Write the missing article to ask for some folders.','Pides carpetas sin indicar cuáles. Escribe el artículo que falta.'],'Para clase necesito ___ carpetas.',['unas'],['Use the indefinite article. Look at the gender and number of the noun.','Usa el artículo indefinido. Fíjate en el género y el número del sustantivo.'],['**Carpetas** is feminine plural, so use **unas**.','**Carpetas** es femenino plural, así que se usa **unas**.'])
  ],['Write a material request: one object and several of another. Use **un**/**una** and **unos**/**unas**.','Escribe una petición de material: un objeto y varios de otro. Usa un/una y **unos**/**unas**.'],
  ['Check that each article matches its noun in gender and number.','Comprueba que cada artículo concuerda con su sustantivo en género y número.'],'agreement'),
 resource('school-week',['School days and subjects','Días lectivos y asignaturas'],'vocabulary',['lunes','martes','horario','timetable','school week','classes','matemáticas','materias'],
  ['Find the day first. **El jueves tengo historia** means history is on Thursday.','Busca primero el día. **El jueves tengo historia** indica que hay historia ese día.'],
  [
   ['Use the names from **lunes** to **viernes** to read a timetable. Write weekday and subject names with lower case inside a sentence.','Usa los nombres de **lunes** a **viernes** para leer un horario. Dentro de una frase se escriben con minúscula.'],
   ['Read down the day’s column. **A las 11:15** points to the time a class starts. For a school notice, use **El** + day + **tengo** + subject.','Lee hacia abajo en la columna del día. **A las 11:15** indica la hora a la que empieza una clase. Para un aviso, usa **El** + día + **tengo** + asignatura.']
  ],[
   closed('r-week-a',listen,'',['jueves','miércoles','viernes'],'jueves',['Think of the days in order.','Recuerda el orden de los días.'],['**Jueves** comes after **miércoles**.','**Jueves** viene después de **miércoles**.'],{audio:dayAudio(3)}),
   recall('r-week-b',['Write the next day.','Escribe el día siguiente.'],'miércoles → ___',['jueves'],['It is the fourth school day.','Es el cuarto día lectivo.'],['Wednesday is followed by Thursday: **jueves**.','Después del miércoles viene el **jueves**.']),
   closed('r-week-c',['Use the timetable to answer the question.','Usa el horario para responder a la pregunta.'],'El lunes, ¿qué clase hay a las 11:15?',['ciencias','español','geografía'],'español',dayRule,['The third class on Monday is **español**.','La tercera clase del lunes es **español**.'],{table:true})
  ],['Pick a day from the timetable and write a notice that names one subject and the day.','Elige un día del horario y escribe un aviso con el día y una asignatura.'],
  ['Read it back and point to the matching cell. Check the spelling of the day and subject.','Relee tu aviso y señala la casilla que coincide. Revisa cómo se escriben el día y la asignatura.'],'school'),
 resource('gustar',['Gustar and preferences','Gustar y preferencias'],'grammar',['gusta','gustan','me gusta','a mí','gustos','favourite','likes','infinitivo'],
  ['One thing or an action: **gusta**. A plural noun: **gustan**. **Me** or **le** tells you who likes it.','Una cosa o una acción: **gusta**. Un sustantivo plural: **gustan**. Me o le indica a quién le **gusta**.'],
  [
   ...likesPattern
  ],[
   closed('r-gus-a',select,'las ciencias',['Me gusta las ciencias.','Me gustan las ciencias.'],'Me gustan las ciencias.',gustRule,['**Las ciencias** is plural, so use **gustan**.','**Las ciencias** está en plural: usa **gustan**.']),
   recall('r-gus-b',finish,'No me ___ estudiar español.',['gusta'],gustRule,['**Estudiar** names an action and takes **gusta** here.','**Estudiar** expresa una acción y aquí se usa **gusta**.']),
   closed('r-gus-c',['Read what Leo says. Who likes the subject?','Lee lo que dice Leo. ¿A quién le gusta la asignatura?'],'A Lucía le gusta el español.',['Leo','Lucía'],'Lucía',['Find the name after **A**.','Busca el nombre que aparece después de A.'],['**A Lucía** makes it clear who likes the subject.','**A Lucía** indica a quién le gusta la asignatura.']),
   recall('r-gus-d',finish,'A Leo no ___ gustan las matemáticas.',['le'],['The sentence is about Leo, not about the speaker.','La frase habla de Leo, no de quien habla.'],['Use **le** here, after **no**.','Aquí se usa le, detrás de no.']),
   recall('r-gus-write',['Rewrite the preference about Alba. Use the start given.','Escribe el gusto de Alba en tercera persona. Usa el inicio indicado.'],'Alba: «Me gustan las ciencias». → A Alba ___',['le gustan las ciencias','le gustan las ciencias.'],['Change who likes it. Keep the subject and check whether it is singular or plural.','Cambia a quién le gusta. Mantén la asignatura y comprueba si es singular o plural.'],['For someone else, use **le**. **Las ciencias** is plural, so keep **gustan**.','Para hablar de otra persona, usa **le**. **Las ciencias** está en plural, así que se mantiene **gustan**.'])
  ],['Say or write two preferences: one of your own and one for a fictional student. Try a subject and an action.','Di o escribe dos preferencias: una tuya y una de un personaje. Prueba con una asignatura y una acción.'],
  ['Check who likes it, where **no** goes if you use it, and what decides **gusta** or **gustan**.','Comprueba a quién le **gusta**, dónde va no si lo usas y qué determina **gusta** o **gustan**.']),
 resource('journeys',['Transport and journeys','Transporte y desplazamientos'],'vocabulary',['transporte','transport','school journey','cole','a pie','andando','autobús','voy','va','minutos'],
  ['Use **voy a pie** or **voy andando** on foot, and **voy en autobús** by bus.','Usa **voy a pie** o **voy andando** si caminas, y **voy en autobús** si usas ese medio.'],
  [
   ['Compare **¿Cómo vas al colegio?**, **Voy a pie** and **Noa va en tren**. Use **voy** to talk about yourself and **va** to talk about Noa.','Compara **¿Cómo vas al colegio?**, **Voy a pie** y **Noa va en tren**. Usa voy para hablar de ti y va para hablar de Noa.'],
   ['To rule out a means of transport, put **no** before the verb: **No voy en coche**. Optional: describe distance or time with **Vivo cerca/lejos del colegio** or **Tardo unos veinte minutos**.','Para descartar un medio, coloca no delante del verbo: **No voy en coche**. Si quieres, añade distancia o duración con **Vivo cerca/lejos del colegio** o **Tardo unos veinte minutos**.']
  ],[
   closed('r-trip-a',listen,'',['en tren','en coche','en autobús'],'en autobús',['Listen for the word after **en**.','Escucha la palabra que va después de en.'],['The recording says **en autobús**.','La grabación dice **en autobús**.'],{audio:journeyAudio('bus')}),
   recall('r-trip-b',finish,'Noa ___ en tren.',['va'],['Noa is the person you are talking about.','Noa es la persona de la que hablas.'],['Use **va** with a name here.','Aquí se usa va con un nombre.']),
   closed('r-trip-c',['Choose an alternative way to say **Voy a pie**.','Elige otra forma de decir **Voy a pie**.'],'',['Voy andando.','Voy en tren.','No voy a pie.'],'Voy andando.',tripRule,['**Andando** means walking.','**Andando** indica que vas caminando.'])
  ],['Describe how you or an invented student gets to school. If you want, add a distance or a duration.','Cuenta cómo vas al colegio tú o cómo va un personaje. Si quieres, añade la distancia o la duración.'],
  ['Check the verb and the expression that follows it. Are they consistent with the person and transport you chose?','Revisa el verbo y la expresión que lo sigue. ¿Encajan con la persona y el medio que has elegido?'],'journeys')
];
export const resourceById=id=>resources.find(x=>x.id===id);
export const resourceTypes={vocabulary:['Vocabulary','Vocabulario'],grammar:['Grammar','Gramática']};
export const extraRecordings={question:recorded(journeyQuestion.audio,journeyQuestion.text),negative:recorded(journeyNegative.audio,journeyNegative.text),walking:recorded(journeyWalking.audio,journeyWalking.text)};
const normalise=value=>String(value).normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('es');
const searchForm=value=>normalise(value).normalize('NFD').replace(/\p{M}/gu,'');
export function findResources(query='',type='',level=''){
 const terms=searchForm(query).split(' ').filter(Boolean);
 return resources.filter(r=>(!type||r.type===type)&&(!level||r.level===level)&&terms.every(word=>searchForm([...r.title,...r.tags,...resourceTypes[r.type]].join(' ')).includes(word)));
}
export function grade(item,response){
 if(!response?.trim())return 'empty';
 if(item.answers.some(a=>normalise(a)===normalise(response)))return 'correct';
 if(!item.options&&item.answers.some(a=>searchForm(a)===searchForm(response)))return 'accent';
 return 'retry';
}

export const game=[
 {title:['The first lesson changes','Cambia la primera clase'],scene:['The first lesson has changed. You already have a book in the bag. Read the school notice to decide what to pack.','Ha cambiado la primera clase. Ya tienes un libro en la mochila. Lee el aviso del instituto para decidir qué llevar.'],source:'Lunes, 09:00: educación plástica. Material: un lápiz y una goma.',
  support:['Action words: **añadir** = add; **dejar** = leave behind; **llevar** = take with you.','Acciones: **añadir** es meter algo más; **dejar** es no llevar algo; **llevar** es traerlo contigo.'],
  options:[
   {id:'add',label:'Añadir un lápiz y una goma.',effect:['You have what art requires and keep your book for later.','Ya tienes lo que necesitas para plástica y conservas el libro para después.'],ready:true},
   {id:'swap',label:'Dejar el libro y llevar un lápiz y una goma.',effect:['You can start art. If you need the book later, collect it at break.','Puedes empezar plástica. Si necesitas el libro más tarde, recógelo en el recreo.'],ready:true},
   {id:'keep',label:'Llevar solo el libro.',effect:['The book alone does not meet the new notice. Before art you will need to borrow a pencil and an eraser.','El libro solo no basta para lo que pide el aviso. Antes de plástica tendrás que pedir prestados un lápiz y una goma.'],ready:false}
  ],help:'objects'},
 {title:['The bus is cancelled','Se cancela el autobús'],scene:['The school is near. The host can walk with Lucía, or a family member can take her by car. The bus is not running this morning.','El instituto está cerca. La persona que la recibe puede ir con Lucía a pie, o un familiar puede llevarla en coche. Esta mañana no hay autobús.'],
  options:[
   {id:'walk',label:'Voy a pie.',effect:['Lucía can walk with her host. They can still get to school this morning.','Lucía puede ir andando con la persona que la recibe. Pueden llegar esta mañana.'],ready:true},
   {id:'car',label:'Voy en coche.',effect:['A family member can take Lucía. This route also works.','Un familiar puede llevar a Lucía. Esta alternativa también funciona.'],ready:true},
   {id:'bus',label:'Voy en autobús.',effect:['Lucía would be waiting for a bus that will not come. Try a route listed as available.','Lucía se quedaría esperando un autobús que no va a pasar. Prueba una de las alternativas disponibles.'],ready:false}
  ],help:'journeys'},
 {title:['At school: check the board','En el instituto: consulta el tablón'],
  scene:['You’ve arrived. After art, Lucía needs to know where to go next. Read the updated timetable on the board.','Ya habéis llegado. Después de plástica, Lucía necesita saber qué clase tiene ahora. Lee el horario actualizado del tablón.'],
  source:'Lunes: 09:00 educación plástica · 10:00 historia · 11:15 español.',
  options:[
   {id:'spanish-first',label:'10:00 · español',effect:['**Español** is later, at 11:15. Look again at the 10:00 slot.','**Español** es más tarde, a las 11:15. Vuelve a mirar la clase de las 10:00.'],ready:false},
   {id:'history-next',label:'10:00 · historia',effect:['Lucía can go straight to **historia** at 10:00 and keep **español** on her plan for 11:15.','Lucía puede ir directamente a **historia** a las 10:00 y apuntar **español** para las 11:15.'],ready:true},
   {id:'maths-next',label:'10:00 · matemáticas',effect:['**Matemáticas** was in the original timetable. Check the updated one before you go.','**Matemáticas** estaba en el horario original. Consulta el horario actualizado antes de ir.'],ready:false}
  ],help:'school-week'},
 {title:['At break: pick a welcome table','En el recreo: elige una mesa de bienvenida'],
  scene:['At break, there are three welcome tables with short subject games. Read what Lucía says and suggest one she might enjoy.','En el recreo hay tres mesas de bienvenida con juegos cortos de distintas asignaturas. Lee lo que dice Lucía y proponle una que le pueda gustar.'],
  source:'Lucía: «Me gustan las ciencias y las matemáticas. No me gusta la historia».',
  options:[
   {id:'science-table',label:'Mesa de ciencias',effect:['Lucía joins the science game. When you introduce her, you can say **A Lucía le gustan las ciencias**.','Lucía se apunta al juego de ciencias. Al presentarla puedes decir: **A Lucía le gustan las ciencias**.'],ready:true},
   {id:'maths-table',label:'Mesa de matemáticas',effect:['Lucía joins the maths game. When you introduce her, you can say **A Lucía le gustan las matemáticas**.','Lucía se apunta al juego de matemáticas. Al presentarla puedes decir: **A Lucía le gustan las matemáticas**.'],ready:true},
   {id:'history-table',label:'Mesa de historia',effect:['Lucía would rather try another table. In her note, **No me gusta la historia** tells you why.','Lucía prefiere probar otra mesa. En su nota, **No me gusta la historia** te dice por qué.'],ready:false}
  ],help:'gustar'}
];
