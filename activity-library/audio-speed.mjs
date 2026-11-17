export const audioSpeeds=[.65,.80,1,1.25];
export function setAudioSpeed(audio,rate){
 if(!audioSpeeds.includes(rate))return;
 for(const key of ['preservesPitch','webkitPreservesPitch','mozPreservesPitch'])if(key in audio)audio[key]=true;
 audio.defaultPlaybackRate=rate;
 audio.playbackRate=rate;
}
export function speedSelect(rate,E,L){
 return `<div class="flow-actions audio-speed"><label for="audio-speed">${L('Audio speed','Velocidad del audio')}</label><select id="audio-speed">${audioSpeeds.map(n=>`<option value="${n}"${n===rate?' selected':''}>${E(n.toFixed(2))}×</option>`).join('')}</select></div>`;
}
