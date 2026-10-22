import {timetableRows,clock,schoolDays,subjectById,printStyles} from './unit2-explore-data.mjs';

// A dedicated, browser-native print sheet: no new tab, remote service or file upload.
export function renderPrintableTimetable(t,{L}){
 const theme=printStyles.some(([id])=>id===t.printStyle)?t.printStyle:'ocean';
 const columns=t.days.map((day,i)=>{
  const {rows,end}=timetableRows(day);
  return `<section class="u2x-print-day"><h4 lang="es">${schoolDays[i].name}</h4><ol>${rows.map(row=>`<li class="u2x-print-slot ${row.kind==='class'?'':'u2x-print-rest'}"><time>${clock(row.start)}–${clock(row.end)}</time>${row.kind==='class'?`<span lang="es">${subjectById(row.subject).name}</span>`:`<span>${L(...(row.kind==='break'?['Break','Recreo']:['Lunch','Almuerzo']))}</span>`}</li>`).join('')}</ol><p class="u2x-print-end">${L('Finish','Salida')} · ${clock(end)}</p></section>`;
 }).join('');
 return `<div class="u2x-print-preview" role="region" tabindex="0" aria-label="${L('Printable weekly timetable','Horario semanal para imprimir').replace(/<[^>]*>/g,'')}"><article class="u2x-print-sheet u2x-print-${theme}"><header class="u2x-print-header"><div><p>UNAS TAPITAS DE ESPAÑOL</p><h3>${L('My school week','Mi semana escolar')}</h3></div><span class="u2x-print-decoration" aria-hidden="true">✦ · ✦</span></header><div class="u2x-print-columns">${columns}</div><footer class="u2x-print-footer">1st Year · Unit 2 · El aula</footer></article></div>`;
}

export function renderDailyTimetable(t,{L}){
 const day=t.days[t.day],{rows,end}=timetableRows(day);
 return `<section class="u2x-day"><h3 lang="es">${schoolDays[t.day].name}</h3><ol>${rows.map(row=>`<li><time>${clock(row.start)}–${clock(row.end)}</time><span>${row.kind==='class'?subjectById(row.subject).name:L(...(row.kind==='break'?['Break','Recreo']:['Lunch','Almuerzo']))}</span></li>`).join('')}</ol><p>${L('Finish','Salida')}: ${clock(end)}</p></section>`;
}
