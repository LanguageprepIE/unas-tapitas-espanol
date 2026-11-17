export const months='enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre'.split(' ');
export const monthDays=[31,28,31,30,31,30,31,31,30,31,30,31];
export const numbers='cero|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|dieciséis|diecisiete|dieciocho|diecinueve|veinte|veintiuno|veintidós|veintitrés|veinticuatro|veinticinco|veintiséis|veintisiete|veintiocho|veintinueve|treinta|treinta y uno'.split('|');
export const dateForms=(day,month)=>[`${day}/${String(month+1).padStart(2,'0')}`,`${day} de ${months[month]}`,`el ${numbers[day]} de ${months[month]}`];
export const people=[
 ['Mara','13','26/06',true,'corto','amable'],
 ['Nico','14','26/06',false,'largo','tranquilo'],
 ['Iris','13','23/06',true,'largo','simpática']
];
export const lessons=[
 [
 ['Say **el** + day + **de** + month in a sentence: **Mi cumpleaños es el veintitrés de mayo.** On a calendar, **23 de mayo** is enough. Write months in lower case.','En una frase, usa **el** + día + **de** + mes. En el calendario basta con **23 de mayo**. Escribe los meses con minúscula.'],
 ['For the first day, **el uno de abril** and **el primero de abril** both work. Write **veintidós**, **veintitrés** and **veintiséis** with an accent. **Treinta y uno** has three words.','Para el primer día valen **el uno de abril** y **el primero de abril**. **Veintidós**, **veintitrés** y **veintiséis** llevan tilde. **Treinta y uno** se escribe en tres palabras.'],
 ['Ask **¿Cuándo es tu cumpleaños?**. Say **Mi cumpleaños es…** about yourself and **Su cumpleaños es…** about someone else. **¿Y el tuyo?** passes the question back.','Pregunta **¿Cuándo es tu cumpleaños?**. Usa **Mi cumpleaños es…** para hablar de ti y **Su cumpleaños es…** para hablar de otra persona. Con **¿Y el tuyo?** devuelves la pregunta.']
 ],
 [
 ['Use **soy** for yourself, **eres** when you ask someone and **es** when you describe someone else. **Ana es amable. Hoy está nerviosa.** The first sentence describes Ana; the second says how she feels today.','Usa **soy** para hablar de ti, **eres** cuando preguntas a alguien y **es** para describir a otra persona. **Ana es amable. Hoy está nerviosa.** La primera frase describe a Ana; la segunda dice cómo se encuentra hoy.'],
 ['Compare **un chico tímido** and **una chica tímida**. **Amable**, **verde** and **azul** keep the same form in both genders. Compare **simpáticos/simpáticas**, **verdes** and **azules** in the plural.','Compara **un chico tímido** y **una chica tímida**. **Amable**, **verde** y **azul** tienen la misma forma para los dos géneros. Compara **simpáticos/simpáticas**, **verdes** y **azules** en plural.'],
 ['Say **Tengo el pelo corto** or **Tiene el pelo corto**. **Corto** describes **el pelo**. Compare **Llevo gafas** and **Lleva gafas**. In **una mochila roja**, **roja** describes the bag.','Di **Tengo el pelo corto** o **Tiene el pelo corto**. **Corto** describe **el pelo**. Compara **Llevo gafas** y **Lleva gafas**. En **una mochila roja**, **roja** describe la mochila.']
 ]
];
export const profilesResources=[
 {id:'fechas-y-cumpleanos',type:'vocabulary',level:'1st-year',title:['Dates and birthdays','Fechas y cumpleaños'],tags:['meses','calendar','cumpleaños','months','dates','31','números'],quick:lessons[0][0]},
 {id:'describir-a-alguien',type:'grammar',level:'1st-year',title:['Describing someone','Describir a alguien'],tags:['description','aspecto','carácter','ser','tener','llevar','colores','adjetivos'],quick:lessons[1][0]}
];
export const e01='Hola, me llamo Leo. Tengo catorce años. Mi cumpleaños es el catorce de septiembre. Soy tranquilo y llevo gafas. Hasta luego.';
export const e02=['Hola, Hugo. ¿Cuándo es tu cumpleaños?','Mi cumpleaños es el treinta de mayo. ¿Y el tuyo?','El veintitrés de mayo. Para la ficha: soy simpática y tengo el pelo corto.','Yo soy tímido y llevo gafas.'];
export const normalize=s=>String(s??'').toLowerCase().trim().replace(/[.!?]+$/, '').replace(/\s+/g,' ');
export function gradeAnswer(input,answers){
 const n=normalize(input),plain=s=>s.normalize('NFD').replace(/\p{M}/gu,'');
 return !n?'empty':answers.some(a=>normalize(a)===n)?'correct':answers.some(a=>plain(normalize(a))===plain(n))?'accent':'try';
}

export const clips=[{"id":"M01","text":"enero","voice":"L"},{"id":"M02","text":"febrero","voice":"L"},{"id":"M03","text":"marzo","voice":"L"},{"id":"M04","text":"abril","voice":"L"},{"id":"M05","text":"mayo","voice":"L"},{"id":"M06","text":"junio","voice":"L"},{"id":"M07","text":"julio","voice":"L"},{"id":"M08","text":"agosto","voice":"L"},{"id":"M09","text":"septiembre","voice":"L"},{"id":"M10","text":"octubre","voice":"L"},{"id":"M11","text":"noviembre","voice":"L"},{"id":"M12","text":"diciembre","voice":"L"},{"id":"N21","text":"veintiuno","voice":"L"},{"id":"N22","text":"veintidós","voice":"L"},{"id":"N23","text":"veintitrés","voice":"L"},{"id":"N24","text":"veinticuatro","voice":"L"},{"id":"N25","text":"veinticinco","voice":"L"},{"id":"N26","text":"veintiséis","voice":"L"},{"id":"N27","text":"veintisiete","voice":"L"},{"id":"N28","text":"veintiocho","voice":"L"},{"id":"N29","text":"veintinueve","voice":"L"},{"id":"N30","text":"treinta","voice":"L"},{"id":"N31","text":"treinta y uno","voice":"L"},{"id":"C01","text":"rojo","voice":"L"},{"id":"C02","text":"roja","voice":"L"},{"id":"C03","text":"amarillo","voice":"L"},{"id":"C04","text":"amarilla","voice":"L"},{"id":"C05","text":"verde","voice":"L"},{"id":"C06","text":"verdes","voice":"L"},{"id":"C07","text":"azul","voice":"L"},{"id":"C08","text":"una mochila azul","voice":"L"},{"id":"C09","text":"unas mochilas azules","voice":"L"},{"id":"C10","text":"Lleva una mochila roja.","voice":"L"},{"id":"A01","text":"simpático","voice":"L"},{"id":"A02","text":"simpática","voice":"L"},{"id":"A03","text":"tímido","voice":"L"},{"id":"A04","text":"tímida","voice":"L"},{"id":"A05","text":"tranquilo","voice":"L"},{"id":"A06","text":"tranquila","voice":"L"},{"id":"A07","text":"amable","voice":"L"},{"id":"P01","text":"el pelo","voice":"L"},{"id":"P02","text":"las gafas","voice":"L"},{"id":"P03","text":"con gafas","voice":"L"},{"id":"P04","text":"sin gafas","voice":"L"},{"id":"F01","text":"¿Cuándo es tu cumpleaños?","voice":"L"},{"id":"F02","text":"Mi cumpleaños es el uno de abril.","voice":"J"},{"id":"F03","text":"Mi cumpleaños es el treinta y","voice":"L"},{"id":"F04","text":"¿Cuándo es su cumpleaños?","voice":"L"},{"id":"F05","text":"Su cumpleaños es el veintidós de marzo.","voice":"J"},{"id":"F06","text":"¡Feliz cumpleaños!","voice":"L"},{"id":"D01","text":"¿Cómo eres?","voice":"J"},{"id":"D02","text":"Soy simpática.","voice":"L"},{"id":"D03","text":"¿Cómo es Leo?","voice":"L"},{"id":"D04","text":"Leo es simpático.","voice":"J"},{"id":"D05","text":"Tengo el pelo corto.","voice":"L"},{"id":"D06","text":"Tiene el pelo largo.","voice":"J"},{"id":"D07","text":"Llevo gafas.","voice":"L"},{"id":"D08","text":"Lleva gafas.","voice":"L"},{"id":"D09","text":"Ana es amable. Hoy está nerviosa.","voice":"L"}];

export const f03Model='Mi cumpleaños es el treinta y uno de octubre.';
export const unavailableClips=new Set(['F03']);
export const weekdays=[
 ['lunes','Monday'],['martes','Tuesday'],['miércoles','Wednesday'],['jueves','Thursday'],
 ['viernes','Friday'],['sábado','Saturday'],['domingo','Sunday']
].map(([text,en],i)=>({id:'weekday'+(i+1),text,en,src:'assets/audio/unit2/vocabulary/days/1Y_U02_AUD_DIA_0'+(i+1)+'_v1.mp3'}));
export const bagColours={
 azul:['azul','azules','#4c8ff4'],roja:['roja','rojas','#e45857'],verde:['verde','verdes','#68ad75'],
 amarilla:['amarilla','amarillas','#f7c456'],blanca:['blanca','blancas','#fff'],negra:['negra','negras','#242832'],
 rosa:['rosa','rosas','#f3a7be'],gris:['gris','grises','#9096a1']
};
export const bagPhrase=(quantity,colour)=>quantity==='one'?'una mochila '+bagColours[colour][0]:
 ({two:'dos',three:'tres',unknown:'unas'}[quantity]+' mochilas '+bagColours[colour][1]);
export const traits=[['simpátic','simpático/a','friendly'],['tímid','tímido/a','shy'],['tranquil','tranquilo/a','calm'],['amable','amable','kind'],['divertid','divertido/a','fun'],['trabajador','trabajador/a','hard-working']];
export const describeTrait=(stem,ending)=>stem==='amable'?stem:stem==='trabajador'?stem+(ending==='a'?'a':''):stem+ending;
export const hairExamples=[
 ['el pelo liso','straight hair','liso','#493525','#815940'],['el pelo rizado','curly hair','rizado','#332417','#815940'],
 ['el pelo rubio','blond hair','largo','#dcaa54','#815940'],['el pelo castaño','brown hair','corto','#805439','#815940'],
 ['el pelo negro','black hair','corto','#28222d','#815940']
];
export const eyeExamples=[['los ojos azules','blue eyes','#3475ad'],['los ojos verdes','green eyes','#438767'],['los ojos marrones','brown eyes','#805439']];
