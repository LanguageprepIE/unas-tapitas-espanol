# Unas Tapitas de Español 2.0

Private Orilla prototype. Original Unit 1 for 1st Year Spanish in Ireland.

## Contents

Learn: ten bilingual learning blocks with concise explanations, highlighted Spanish patterns, reference tables, worked examples, optional detail, ten retrieval checkpoints and ten application prompts; three original reading texts with model answers; a flexible twelve-stage teaching route. Explore: all six person forms of tener and estar, plus introductory name chunks. Practise: 48 deterministic activities, selectable by topic or mixed, with hints, explanation links and Spanish character buttons. Communicate: the guided meeting plus three original transfer tasks, fictional identities, optional writing and reflection. Vocabulary: 33 expressions, 0–20 and the full Spanish alphabet.

English, Bilingual and Español share one in-memory activity state. Language changes preserve entered text and choices. Browser storage is opt-in and stores only language, last section and completed sections, never names, free text, recordings, answers or reflection. Downloads are voluntary and may contain whatever the student entered; the application does not upload them. Local speech playback is attempted only when a Spanish voice reports `localService`.

## Structure

`dist/` is buildless static output, with relative paths suitable for GitHub Pages. `data/unit1.mjs` composes the unit; `data/foundations.mjs` owns developed teaching blocks and tasks; `data/practice-extension.mjs` owns the additional practice; `engine.mjs` owns correction and lab transformations; `app.js` owns the view and session state; `style.css` owns Orilla presentation. No external runtime dependencies, keys, backend, analytics or account system.

Twenty-five automated checks cover correction, data minimisation, all eight views in three language modes, and preservation/escaping of in-memory writing. The view harness is not a real browser.

Run checks with `node --test tests/*.test.mjs` and `node --check dist/app.js`.

## Scope and limitations

Phase 3 review prototype. No existing GitHub repositories changed. Original HTML/CSS and all teaching content created for this project. Device speech remains a vocabulary helper. The two listening recordings are original scripts with synthetic ElevenLabs voices, mixed locally at a pitch-preserving tempo factor of 0.75 with pauses. They are static MP3s: learners make no ElevenLabs calls. Automatic Scribe transcription matched the scripted names, ages, states and spelling; human listening review is still needed. Open speaking/writing is not automatically graded. The current unit is the only enabled course content.

Browser automation was unavailable in this session under the supported Sites workflow. Node/content/state checks do not establish rendered layout, screen-reader behavior, physical iPad compatibility, or school-network access. These need the Phase 4 review. Test keyboard focus, narrow viewport, local voices, all three languages, touch controls, printing, download and private browser/storage restrictions on actual devices before classroom release.

## Content revision

The teacher found the initial learning reference too concise for independent learning. The revised Unit 1 follows the school document’s stated four-week scope without copying its commercial resources. Twelve flexible stages are a new pedagogical suggestion, not prescribed hours or an official assessment requirement. See `docs/Revision_contenidos_Unidad_1.md`.

The teacher’s next review requested less explanatory prose and clearer hierarchy. The core reference now foregrounds useful Spanish in semantic bold with a contrasting teal colour; technical detail is optional and the study route is collapsed. Activities, complete conjugation references and the three language modes are retained.

Full-answer models: spelling replies use `[name] se escribe…` or `Mi nombre se escribe…` in the reference, dialogue, guided encounter and practice. Feelings include fenomenal and fatal in the reference, vocabulary and lab.

## Listening

`data/listening.mjs` supplies two recordings and twelve closed comprehension questions, bilingual instructions/feedback, and Spanish transcripts. The `#listening` route is linked from the home page, Learn and navigation. Answers and transcript state remain in memory and are excluded from optional saved progress. Rerendering attempts to preserve audio position and play state during a language switch; route changes do not request autoplay. Real Safari/iPad playback, seeking, focus and download behavior remain unverified.

Production provenance and automatic transcription results are in `docs/listening-production.json`; no credentials or temporary signed media URLs are stored there. All 52 generated alternatives finished successfully; the two static recordings use one selected take per turn.
