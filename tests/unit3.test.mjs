import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {setAudioSpeed,audioSpeeds} from '../activity-library/audio-speed.mjs';
import {findResources} from '../data/library.mjs';
import {clips,dateForms,gradeAnswer,e01,e02,people} from '../data/unit3.mjs';

test('shared audio setter offers all four speeds, preserves pitch and rejects unsupported values',()=>{
 const audio={preservesPitch:false};
 assert.deepEqual(audioSpeeds,[.65,.8,1,1.25]);
 for(const value of audioSpeeds){
  setAudioSpeed(audio,value);
  assert.deepEqual(audio,{preservesPitch:true,defaultPlaybackRate:value,playbackRate:value});
 }
 setAudioSpeed(audio,0);assert.equal(audio.playbackRate,1.25);
});
test('date formats, accepted forms and character continuity are explicit',()=>{
 assert.deepEqual(dateForms(31,9),['31/10','31 de octubre','el treinta y uno de octubre']);
 assert.equal(gradeAnswer('EL PRIMERO DE ABRIL.',['el uno de abril','el primero de abril']),'correct');
 assert.equal(gradeAnswer('veintitres',['veintitrés']),'accent');
 assert.deepEqual(findResources('cumpleanos').map(x=>x.id),['fechas-y-cumpleanos']);
 assert.deepEqual(findResources('colores').map(x=>x.id),['describir-a-alguien']);
 assert.match(e01,/Tengo catorce años/);assert.match(e02[1],/treinta de mayo/);
 assert.deepEqual(people[1],['Nico','14','26/06',false,'largo','tranquilo']);
});
test('all 61 MP3s have the expected IDs, checked bytes and exact script associations',async()=>{
 const assets=new URL('../assets/audio/unit3/',import.meta.url);
 const qa=JSON.parse(await readFile(new URL('../docs/unit3/audio-verification.json',import.meta.url),'utf8'));
 const files=(await readdir(assets)).filter(x=>x.endsWith('.mp3')).sort();
 assert.deepEqual(files,[...clips.map(x=>x.id),'E01','E02'].map(x=>x+'.mp3').sort());
 assert.equal(qa.length,61);
 for(const item of qa){
  const expected=item.id==='E01'?[e01]:item.id==='E02'?e02:[clips.find(x=>x.id===item.id).text];
  assert.deepEqual(item.takes.map(x=>x.text),expected);
  assert.equal(createHash('sha256').update(await readFile(new URL(item.id+'.mp3',assets))).digest('hex'),item.sha256);
  assert(item.seconds>0 && item.peakDb<=0 && item.meanDb>-35);
 }
});
