// Public navigation metadata only. A unit is reachable only with an approved runtime.
export const sections=['overview','learn','explore','practise','communicate','play','grammar','vocabulary','listening'];
export const courses=[
 {id:'1st-year',title:['1st Year','1st Year'],description:['Your first steps in Spanish.','Tus primeros pasos en español.']},
 {id:'2nd-year',title:['2nd Year','2nd Year'],description:['Build on what you know.','Amplía lo que ya sabes.']},
 {id:'3rd-year',title:['3rd Year','3rd Year'],description:['Connect your Spanish with new contexts.','Conecta tu español con nuevos contextos.']},
 {id:'lc',title:['Leaving Certificate (LC)','Leaving Certificate (LC)'],description:['One pathway across 5th and 6th Year, with HL and OL options.','Un recorrido entre 5th y 6th Year, con opciones HL y OL.'],levels:[{id:'hl',title:['Higher Level (HL)','Higher Level (HL)']},{id:'ol',title:['Ordinary Level (OL)','Ordinary Level (OL)']}]}
];
export const units=[
 {course:'1st-year',id:'1',title:'Hola y bienvenidos',status:'available',runtime:'unit1',description:['Meet someone new and introduce yourself.','Conoce a alguien y preséntate.']},
 {course:'1st-year',id:'2',title:'El aula',status:'partial',runtime:'unit2',description:['Learn A–D and four Explore laboratories.','Learn A–D y cuatro laboratorios de Explore.']}
];
// Match approved unit metadata to its renderer; placeholders cannot become routes.
export const unitRuntimes=new Set(['unit1','unit2']);
export const findCourse=id=>courses.find(c=>c.id===id);
export const findUnit=(course,id,level)=>units.find(u=>u.course===course&&u.id===id&&u.level===level);
export const availableUnit=u=>!!u&&['available','partial'].includes(u.status)&&unitRuntimes.has(u.runtime);
export const courseHash=(course,level)=>`course/${course}${level?'/'+level:''}`;
export const unitHash=(section='overview',course='1st-year',id='1',level)=>`${courseHash(course,level)}/unit/${id}/${section==='unit'?'overview':section}`;
export function parseRoute(hash=''){
 const value=hash.replace(/^#/,'');
 if(!value||value==='home')return {kind:'home'};
 if(value==='unit'||sections.includes(value))return {kind:'unit',course:'1st-year',unit:'1',section:value==='unit'?'overview':value};
 const p=value.split('/');
 if(p[0]!=='course'||!findCourse(p[1]))return {kind:'home'};
 const course=findCourse(p[1]);let i=2,level;
 if(course.levels&&course.levels.some(l=>l.id===p[i]))level=p[i++];
 const parent={kind:'course',course:course.id,...(level?{level}:{})};
 if(p.length===i)return parent;
 if(course.levels&&!level)return {kind:'course',course:course.id};
 if(p[i]!=='unit'||p.length!==i+3||!sections.includes(p[i+2]))return parent;
 const u=findUnit(course.id,p[i+1],level);
 if(!availableUnit(u))return parent;
 if(u.status==='partial'&&!['overview','learn','explore'].includes(p[i+2]))return parent;
 return {kind:'unit',course:course.id,unit:u.id,section:p[i+2],...(level?{level}:{})};
}
export function routeHash(r){return r.kind==='home'?'home':r.kind==='course'?courseHash(r.course,r.level):unitHash(r.section,r.course,r.unit,r.level);}
