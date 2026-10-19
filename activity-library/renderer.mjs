import {validateActivity, localize, initialState, transition, transcriptVisible} from './contract.mjs';

const escape = value => String(value).replace(/[&<>"']/g, character =>
  ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));
const labels = {
  listen:{en:'Listen', es:'Escucha'}, next:{en:'Next',es:'Siguiente'},
  again:{en:'Start again',es:'Empezar de nuevo'},
  unavailable:{en:'Audio unavailable. You can continue with the written activity.',es:'Audio no disponible. Puedes continuar con la actividad escrita.'},
  transcript:{en:'What you heard',es:'Lo que has oído'}
};

// One controller for all instances on this page; capture media events before they bubble.
export function createAudioController(root) {
  const onPlay = event => {
    if (event.target?.tagName !== 'AUDIO') return;
    root.querySelectorAll('audio').forEach(other => {
      if (other !== event.target) other.pause();
    });
  };
  const onError = event => {
    if (event.target?.tagName !== 'AUDIO') return;
    const message = event.target.parentElement?.querySelector('[data-audio-error]');
    if (message) message.hidden = false;
  };
  root.addEventListener('play', onPlay, true);
  root.addEventListener('error', onError, true);
  return {
    stop() {root.querySelectorAll('audio').forEach(player => player.pause());},
    destroy() {root.removeEventListener('play', onPlay, true);root.removeEventListener('error', onError, true);}
  };
}

const art = (image, prefix, mode) => `<svg class="activity-art" role="img" aria-label="${escape(localize(image.alt,mode))}" viewBox="0 0 200 160"><use href="${escape(prefix + image.src + '#' + image.symbol)}"></use></svg>`;
const player = (audio, prefix, mode) => `<div class="activity-audio"><audio controls preload="none" src="${escape(prefix + audio.src)}" aria-label="${escape(localize(labels.listen,mode))}: ${escape(audio.transcript)}"></audio><p data-audio-error hidden role="alert">${escape(localize(labels.unavailable,mode))}</p></div>`;

export function renderActivity(activity, state, mode = 'bi', prefix = '../') {
  validateActivity(activity);
  const item = activity.items[state.index];
  const t = value => escape(localize(value, mode));
  const heading = `<header><p class="activity-kicker">${escape(activity.section)} · ${state.index+1}/${activity.items.length}</p><h2>${t(activity.objective)}</h2><p>${t(activity.instructions)}</p></header>`;
  if (activity.kind === 'illustrated-discovery') {
    const choices = activity.items.map(option => `<button type="button" data-action="select" data-id="${escape(option.id)}" aria-label="${t(option.image.alt)}" aria-pressed="${state.selected===option.id}">${art(option.image,prefix,mode)}</button>`).join('');
    const found = state.selected ? `<section class="activity-result" aria-live="polite">${art(item.image,prefix,mode)}<div><strong lang="es">${escape(item.label.es)}</strong><p>${t(item.label)}</p>${player(item.audio,prefix,mode)}</div></section>` : '';
    return `${heading}<div class="activity-choices" role="group" aria-label="${t(activity.instructions)}">${choices}</div>${found}`;
  }
  const choices = item.options.map(option => `<button type="button" data-action="select" data-id="${escape(option.id)}" aria-pressed="${state.selected===option.id}">${option.image ? art(option.image,prefix,mode) : ''}<span>${t(option.label)}</span></button>`).join('');
  const feedback = state.selected ? `<p class="activity-feedback ${state.status}" role="status">${t(item.feedback[state.status])}</p>` : '';
  const revealed = transcriptVisible(item,state) ? `<p class="activity-transcript"><span>${t(labels.transcript)}:</span> <strong lang="es">${escape(item.audio.transcript)}</strong></p>` : '';
  const advance = state.status === 'correct' ? `<button type="button" data-action="next">${t(state.index === activity.items.length-1 ? labels.again : labels.next)}</button>` : '';
  return `${heading}<p class="activity-question">${t(item.question)}</p>${player(item.audio,prefix,mode)}<div class="activity-choices" role="group" aria-label="${t(item.question)}">${choices}</div>${feedback}${revealed}${advance}`;
}

export function mountActivity(root, activity, {mode = 'bi', prefix = '../', audioController} = {}) {
  validateActivity(activity);
  let state = initialState();
  const render = () => {root.innerHTML = renderActivity(activity,state,mode,prefix);};
  const onClick = event => {
    const button = event.target.closest?.('button[data-action]');
    if (!button || !root.contains(button)) return;
    const action = button.dataset.action === 'next' && state.index === activity.items.length - 1
      ? {type:'restart'} : {type:button.dataset.action,id:button.dataset.id};
    const next = transition(activity,state,action);
    if (next === state) return;
    audioController?.stop();
    state = next;
    render();
    const target = root.querySelector(`[data-action="${button.dataset.action}"][data-id="${button.dataset.id}"]`);
    (target ?? root.querySelector('button[data-action]'))?.focus();
  };
  root.addEventListener('click',onClick);
  render();
  return {
    setMode(value) {mode=value;audioController?.stop();render();},
    state:()=>state,
    destroy() {audioController?.stop();root.removeEventListener('click',onClick);root.replaceChildren();}
  };
}
