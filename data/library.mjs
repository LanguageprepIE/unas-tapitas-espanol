import {profilesResources} from './unit3.mjs';
// Index metadata only: each reference opens the approved Unit 1 activity.
import {resources as classroomResources} from './el-aula.mjs';
import {listenings} from './listening.mjs';

const reference=(id,type,section,selection,title,tags,quick)=>({
 id,type,title,tags,quick,level:'1st-year',unit:'1',target:{section,selection}
});
export const unit1References=[
 reference('u1-age','grammar','grammar','age',['Age with tener','La edad con tener'],
  ['años','tengo','tienes','tiene','age','verb'],['Open the original lab and change who you are talking about.','Abre el laboratorio original y cambia la persona de la que hablas.']),
 reference('u1-names','grammar','grammar','name',['Names with llamarse','Decir el nombre con llamarse'],
  ['me llamo','te llamas','se llama','name','introductions','presentaciones'],['Compare how to give your name and ask someone theirs.','Compara cómo decir tu nombre y cómo preguntar el de otra persona.']),
 reference('u1-feelings','grammar','grammar','feeling',['Feelings with estar','Cómo te encuentras: estar'],
  ['estoy','estás','cómo estás','ánimo','feelings','wellbeing'],['Open the lab to say how you or someone else feels.','Abre el laboratorio para decir cómo te encuentras tú u otra persona.']),
 reference('u1-expressions','vocabulary','vocabulary','phrases',['Useful conversation phrases','Expresiones para conversar'],
  ['greetings','saludos','despedidas','farewells','courtesy','cortesía','pedir ayuda','repetir','help','repeat','presentaciones','introductions'],
  ['Search the original bank for greetings, farewells and ways to ask for help.','Busca saludos, despedidas y formas de pedir ayuda en el banco original.']),
 reference('u1-numbers','vocabulary','vocabulary','numbers',['Numbers 0–20','Números 0–20'],
  ['count','contar','números hasta veinte','cero','veinte','dieciséis','sixteen','numerals'],['Open the original number grid.','Abre la cuadrícula original de números.']),
 reference('u1-alphabet','vocabulary','vocabulary','alphabet',['Spanish alphabet','Alfabeto español'],
  ['alphabet','abecedario','letters','letras','ñ','spelling','deletrear'],
  ['Open the original letter grid and practise spelling.','Abre la cuadrícula original de letras y practica el deletreo.']),
 ...listenings.map((l,i)=>reference('u1-listening-'+(i+1),'listening','listening',l.id,l.title,
  ['audio','escucha','comprensión auditiva','introductions','presentaciones','age','edad',...(i===1?['deletrear','spelling']:[])],l.focus))
];
export const libraryEntries=[...classroomResources,...unit1References,...profilesResources];
export const referenceById=id=>unit1References.find(r=>r.id===id);
export const resourceTypes={vocabulary:['Vocabulary','Vocabulario'],grammar:['Grammar','Gramática'],listening:['Listening','Comprensión auditiva']};
const searchForm=value=>String(value).normalize('NFD').replace(/\p{M}/gu,'').trim().toLocaleLowerCase('es');
export function findResources(query='',type='',level=''){
 const words=searchForm(query).split(/\s+/).filter(Boolean);
 return libraryEntries.filter(r=>(!type||r.type===type)&&(!level||r.level===level)&&
  words.every(word=>searchForm([...r.title,...r.tags,...resourceTypes[r.type]].join(' ')).includes(word)));
}
