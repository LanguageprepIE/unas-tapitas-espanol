export const sections = ['Learn', 'Explore', 'Practise', 'Communicate', 'Play'];
export const modes = ['en', 'bi', 'es'];
export const revealPolicies = ['after-correct', 'after-answer', 'never'];
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const localized = value => value && nonempty(value.en) && nonempty(value.es);
const unique = items => new Set(items.map(item => item.id)).size === items.length;
const asset = (path, extension) => typeof path === 'string' &&
  new RegExp(`^assets/[a-zA-Z0-9_./-]+\\.${extension}$`).test(path) &&
  !path.split('/').includes('..');
const image = value => value && asset(value.src, 'svg') &&
  /^[a-zA-Z][\w-]*$/.test(value.symbol) && localized(value.alt);
const audio = value => value && asset(value.src, 'mp3') && nonempty(value.transcript);

// Throw before rendering: malformed author data must not silently reach students.
export function validateActivity(activity) {
  const errors = [];
  const check = (condition, path) => { if (!condition) errors.push(path); };
  check(activity && /^[a-z][a-z0-9-]*$/.test(activity.id), 'id');
  check(sections.includes(activity?.section), 'section');
  check(localized(activity?.objective), 'objective.en/es');
  check(localized(activity?.instructions), 'instructions.en/es');
  check(['illustrated-discovery', 'listen-choose-reveal'].includes(activity?.kind), 'kind');
  const items = activity?.items;
  check(Array.isArray(items) && items.length > 0, 'items');
  if (Array.isArray(items)) {
    check(unique(items), 'items: unique ids');
    items.forEach((item, i) => {
      const p = `items[${i}]`;
      check(nonempty(item.id), `${p}.id`);
      check(audio(item.audio), `${p}.audio (existing MP3 and exact transcript)`);
      if (activity.kind === 'illustrated-discovery') {
        check(image(item.image), `${p}.image/alt`);
        check(localized(item.label), `${p}.label.en/es`);
        check(item.audio?.transcript === item.label?.es, `${p}.audio.transcript = label.es`);
      } else if (activity.kind === 'listen-choose-reveal') {
        check(localized(item.question), `${p}.question.en/es`);
        check(Array.isArray(item.options) && item.options.length >= 2 && unique(item.options), `${p}.options`);
        if (Array.isArray(item.options)) item.options.forEach((option, j) => {
          check(nonempty(option.id) && localized(option.label), `${p}.options[${j}].id/label`);
          if (option.image !== undefined) check(image(option.image), `${p}.options[${j}].image/alt`);
        });
        check(item.options?.some(option => option.id === item.answer), `${p}.answer`);
        check(localized(item.feedback?.correct) && localized(item.feedback?.incorrect), `${p}.feedback`);
        check(revealPolicies.includes(item.reveal?.transcript), `${p}.reveal.transcript`);
      }
    });
  }
  if (errors.length) throw new TypeError(`Invalid activity ${activity?.id ?? ''}: ${errors.join(', ')}`);
  return activity;
}

export function localize(value, mode) {
  if (!modes.includes(mode)) throw new TypeError(`Unknown language mode: ${mode}`);
  return mode === 'bi' ? `${value.en} / ${value.es}` : value[mode === 'es' ? 'es' : 'en'];
}

export const initialState = () => ({index: 0, selected: null, attempts: 0, status: 'ready'});
export function transition(activity, state, action) {
  const item = activity.items[state.index];
  if (!item) return state;
  if (action.type === 'select' && item.options?.some(option => option.id === action.id)) {
    const correct = item.answer === action.id;
    return {...state, selected: action.id, attempts: state.attempts + 1, status: correct ? 'correct' : 'incorrect'};
  }
  if (action.type === 'select' && activity.kind === 'illustrated-discovery' &&
      activity.items.some(option => option.id === action.id)) {
    return {...state, index: activity.items.findIndex(option => option.id === action.id), selected: action.id,
      attempts: state.attempts + 1, status: 'revealed'};
  }
  if (action.type === 'next' && ['correct', 'revealed'].includes(state.status)) {
    return state.index === activity.items.length - 1
      ? {...state, status: 'complete'}
      : {...initialState(), index: state.index + 1};
  }
  if (action.type === 'restart') return initialState();
  return state;
}

export function transcriptVisible(item, state) {
  const policy = item.reveal?.transcript;
  return policy === 'after-answer' && state.attempts > 0 ||
    policy === 'after-correct' && ['correct', 'complete'].includes(state.status);
}
