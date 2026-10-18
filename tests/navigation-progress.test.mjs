import test from 'node:test';
import assert from 'node:assert/strict';
import {parseRoute,routeHash,sections,unitHash} from '../catalogue.mjs';
import {loadUnitProgress,saveUnitProgress,progressKey,forgetProgress} from '../progress.mjs';
import {newPlayState} from '../play-engine.mjs';
function storage(){const m=new Map();return {get length(){return m.size;},key:i=>[...m.keys()][i],getItem:k=>m.get(k),setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)};}
test('old section bookmarks resolve to canonical U1 routes; invalid and pending routes resolve safely',()=>{
 for(const section of sections){assert.equal(routeHash(parseRoute('#'+section)),unitHash(section));assert.equal(parseRoute('#'+unitHash(section)).section,section);}
 for(const hash of ['#course/1st-year/unit/2/learn','#course/1st-year/unit/999/play','#course/1st-year/unit/1/fake'])assert.deepEqual(parseRoute(hash),{kind:'course',course:'1st-year'});
 assert.deepEqual(parseRoute('#course/lc/unit/1/learn'),{kind:'course',course:'lc'});
 assert.deepEqual(parseRoute('#course/lc/hl/unit/1/learn'),{kind:'course',course:'lc',level:'hl'});
 for(const hash of ['#javascript:bad','#course/5th-year','#course/6th-year','#unknown'])assert.deepEqual(parseRoute(hash),{kind:'home'});
});
test('unit progress is isolated by course, unit and LC level; private work is excluded',()=>{
 const s=storage();const state={mode:'es',section:'learn',completed:new Set(['learn']),play:newPlayState(),draft:'PRIVATE',reflection:'PRIVATE',qValues:{name:'PRIVATE'}};
 state.play.code.terminal=true;saveUnitProgress(s,'1st-year','1',state);
 assert.equal(loadUnitProgress(s,'1st-year','2'),null);assert.equal(loadUnitProgress(s,'2nd-year','1'),null);
 saveUnitProgress(s,'lc','1',{...state,completed:new Set(['explore'])},'hl');saveUnitProgress(s,'lc','1',{...state,completed:new Set()},'ol');
 assert.deepEqual(loadUnitProgress(s,'1st-year','1').completed,['learn']);assert.deepEqual(loadUnitProgress(s,'lc','1','hl').completed,['explore']);assert.deepEqual(loadUnitProgress(s,'lc','1','ol').completed,[]);
 assert(loadUnitProgress(s,'1st-year','1').play.code.terminal);assert(!s.getItem(progressKey('1st-year','1')).includes('PRIVATE'));
 s.setItem('unrelated','keep');forgetProgress(s);assert.equal(s.length,1);assert.equal(s.getItem('unrelated'),'keep');
});
test('migration failure retains original progress and rejects unknown schemas',()=>{
 const s=storage();const old=JSON.stringify({schema:1,mode:'en',section:'play',completed:['communicate']});s.setItem('tapitas-orilla-v1',old);
 const p=loadUnitProgress(s,'1st-year','1');assert.deepEqual(p.completed,['communicate']);
 const denied={...s,setItem(){throw Error('quota');}};assert.throws(()=>saveUnitProgress(denied,'1st-year','1',{...p,completed:new Set(p.completed)}));assert.equal(s.getItem('tapitas-orilla-v1'),old);
 s.setItem(progressKey('1st-year','1'),'{"schema":99}');assert.throws(()=>loadUnitProgress(s,'1st-year','1'));
});
