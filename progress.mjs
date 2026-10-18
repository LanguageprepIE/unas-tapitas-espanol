import {savedSnapshot,restoreSnapshot} from './engine.mjs';
import {playSnapshot,restorePlay,newPlayState} from './play-engine.mjs';
export const preferenceKey='tapitas-preferences-v2';
export const legacyKeys=['tapitas-orilla-v1','tapitas-play-v1'];
export const progressKey=(course,unit,level)=>`tapitas-unit-v2:${course}:${level??'common'}:${unit}`;
const modes=['en','bi','es'];
export function loadPreferences(storage){
 const raw=storage.getItem(preferenceKey);if(!raw)return null;
 const p=JSON.parse(raw);if(p.schema!==2)throw Error('Unknown preferences version');
 return {mode:modes.includes(p.mode)?p.mode:'en'};
}
export function loadUnitProgress(storage,course,unit,level){
 const raw=storage.getItem(progressKey(course,unit,level));
 if(raw){const p=JSON.parse(raw);if(p.schema!==2)throw Error('Unknown unit version');return {...restoreSnapshot(JSON.stringify(p.practice)),play:restorePlay(JSON.stringify(p.play))};}
 // Read old keys without deleting them. They belong exclusively to 1st Year U1.
 if(course==='1st-year'&&unit==='1'&&!level){const old=storage.getItem(legacyKeys[0]);if(old){const p=restoreSnapshot(old);const play=storage.getItem(legacyKeys[1]);return {...p,play:play?restorePlay(play):newPlayState()};}}
 return null;
}
export function saveUnitProgress(storage,course,unit,state,level){
 storage.setItem(progressKey(course,unit,level),JSON.stringify({schema:2,practice:savedSnapshot(state),play:playSnapshot(state.play)}));
}
export function savePreferences(storage,mode){storage.setItem(preferenceKey,JSON.stringify({schema:2,mode:modes.includes(mode)?mode:'en'}));}
export function forgetProgress(storage){
 // Collect first: removing items changes Storage indices. Never clear unrelated apps.
 const keys=[preferenceKey,...legacyKeys];
 for(let i=0;i<storage.length;i++){const key=storage.key(i);if(key?.startsWith('tapitas-unit-v2:'))keys.push(key);}
 for(const key of new Set(keys))storage.removeItem(key);
}
