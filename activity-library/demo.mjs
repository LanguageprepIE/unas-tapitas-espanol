import {demonstrations} from './demo-data.mjs';
import {modes} from './contract.mjs';
import {createAudioController,mountActivity} from './renderer.mjs';

const root=document.querySelector('#activities');
const audioController=createAudioController(document);
const select=document.querySelector('#language-mode');
const instances=demonstrations.map(activity=>{
  const section=document.createElement('section');
  section.className='activity-card';
  section.setAttribute('aria-label',activity.id);
  root.append(section);
  return mountActivity(section,activity,{mode:select.value,audioController});
});
select.addEventListener('change',()=>{
  if(modes.includes(select.value)) instances.forEach(instance=>instance.setMode(select.value));
});
