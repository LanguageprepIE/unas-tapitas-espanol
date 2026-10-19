import test from 'node:test';
import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import {demonstrations} from '../activity-library/demo-data.mjs';
import {validateActivity,localize,initialState,transition,transcriptVisible} from '../activity-library/contract.mjs';
import {createAudioController,renderActivity} from '../activity-library/renderer.mjs';

const clone=value=>structuredClone(value);
test('four independent data instances validate against one contract',()=>{
  assert.equal(demonstrations.length,4);
  assert.equal(new Set(demonstrations.map(x=>x.id)).size,4);
  assert.deepEqual(demonstrations.map(x=>x.kind),[
    'illustrated-discovery','illustrated-discovery','listen-choose-reveal','listen-choose-reveal']);
  demonstrations.forEach(activity=>assert.equal(validateActivity(activity),activity));
});
test('invalid answers, missing translations, alt, transcript and unsafe paths fail author validation',()=>{
  const invalidAnswer=clone(demonstrations[2]);invalidAnswer.items[0].answer='absent';
  assert.throws(()=>validateActivity(invalidAnswer),/answer/);
  const translation=clone(demonstrations[1]);delete translation.instructions.es;
  assert.throws(()=>validateActivity(translation),/instructions/);
  const alt=clone(demonstrations[0]);delete alt.items[0].image.alt.es;
  assert.throws(()=>validateActivity(alt),/image\/alt/);
  const transcript=clone(demonstrations[0]);transcript.items[0].audio.transcript='wrong';
  assert.throws(()=>validateActivity(transcript),/transcript = label/);
  const unsafe=clone(demonstrations[3]);unsafe.items[0].audio.src='assets/../secret.mp3';
  assert.throws(()=>validateActivity(unsafe),/audio/);
});
test('all referenced assets exist, and transcripts match approved source data',async()=>{
  const expected=new Map([
    ['1Y_U02_AUD_OBJ_01_v1.mp3','un lápiz'],['1Y_U02_AUD_OBJ_03_v1.mp3','una goma'],
    ['1Y_U02_AUD_TRA_05_v2.mp3','en bicicleta'],['1Y_U02_AUD_TRA_03_v1.mp3','en autobús'],
    ['1Y_U02_AUD_EXP_02_v1.mp3','Es un lápiz.'],['1Y_U02_AUD_EXP_20_v1.mp3','Vivo cerca del colegio.']
  ]);
  for(const activity of demonstrations) for(const item of activity.items){
    await access(new URL(`../${item.audio.src}`,import.meta.url));
    assert.equal(item.audio.transcript,expected.get(item.audio.src.split('/').at(-1)));
    if(item.image){
      const svg=await readFile(new URL(`../${item.image.src}`,import.meta.url),'utf8');
      assert.match(svg,new RegExp(`<symbol id="${item.image.symbol}"`));
    }
  }
});
test('states gate progression and reveal only at the configured time',()=>{
  const activity=demonstrations[2],item=activity.items[0],ready=initialState();
  assert.equal(transition(activity,ready,{type:'next'}),ready);
  assert.equal(transition(activity,ready,{type:'select',id:'invalid'}),ready);
  assert.equal(transcriptVisible(item,ready),false);
  const wrong=transition(activity,ready,{type:'select',id:'eraser'});
  assert.equal(wrong.status,'incorrect');assert.equal(wrong.attempts,1);
  assert.equal(transcriptVisible(item,wrong),false);
  assert.equal(transition(activity,wrong,{type:'next'}),wrong);
  const right=transition(activity,wrong,{type:'select',id:'pencil'});
  assert.equal(right.status,'correct');assert.equal(transcriptVisible(item,right),true);
  assert.equal(transition(activity,right,{type:'next'}).status,'complete');
  assert.deepEqual(transition(activity,right,{type:'restart'}),initialState());
  const afterAnswer=clone(item);afterAnswer.reveal.transcript='after-answer';
  assert.equal(transcriptVisible(afterAnswer,wrong),true);
  afterAnswer.reveal.transcript='never';assert.equal(transcriptVisible(afterAnswer,right),false);
  const discovery=transition(demonstrations[1],ready,{type:'select',id:'bus'});
  assert.equal(discovery.selected,'bus');assert.equal(discovery.index,1);
});
test('English, bilingual and Spanish renders use the same activity data',()=>{
  const activity=demonstrations[3];
  assert.equal(localize(activity.instructions,'en'),activity.instructions.en);
  assert.equal(localize(activity.instructions,'es'),activity.instructions.es);
  assert.match(localize(activity.instructions,'bi'),/ \/ /);
  for(const mode of ['en','bi','es']){
    const html=renderActivity(activity,initialState(),mode);
    assert.match(html,/aria-label=/);assert.match(html,/role="group"/);
    assert.doesNotMatch(html,/Vivo cerca del colegio\.<\/strong>/);
  }
  assert.match(renderActivity(activity,transition(activity,initialState(),{type:'select',id:'near'}),'es'),/Vivo cerca del colegio\.<\/strong>/);
  assert.match(renderActivity(demonstrations[0],transition(demonstrations[0],initialState(),{type:'select',id:'pencil'})),/un lápiz/);
});
test('shared audio controller pauses other players, reports errors and detaches',()=>{
  const handlers=new Map(),players=[];
  const root={
    addEventListener:(name,fn)=>handlers.set(name,fn),
    removeEventListener:(name,fn)=>{if(handlers.get(name)===fn)handlers.delete(name);},
    querySelectorAll:()=>players
  };
  const makePlayer=()=>({tagName:'AUDIO',paused:0,pause(){this.paused++},parentElement:{querySelector:()=>({hidden:true})}});
  players.push(makePlayer(),makePlayer());
  const controller=createAudioController(root);
  handlers.get('play')({target:players[0]});
  assert.equal(players[0].paused,0);assert.equal(players[1].paused,1);
  const message=players[0].parentElement.querySelector();
  players[0].parentElement.querySelector=()=>message;
  handlers.get('error')({target:players[0]});assert.equal(message.hidden,false);
  controller.stop();assert.equal(players[0].paused,1);assert.equal(players[1].paused,2);
  controller.destroy();assert.equal(handlers.size,0);
});
