# Learn B — Mi semana escolar

Five short discoveries: days → subjects → Álex’s timetable → preferences → comprehension. The three checks have no score. Their answers and feedback are withheld until selection. The approved original Listening 3 is enabled as an additional encounter for recognising familiar words, without a displayed transcript. It describes Lucía’s week, not Álex’s fictional timetable.

## Audio audit

29 original files enabled, with inventory SHA-256 checks and full FFmpeg decoding: DIA 01–05, ASI 01–07, 10–11, 13–21, EXP 08–12 and LIS 03. The seven new subject files ASI 15–21 are byte-for-byte copies of the teacher's attachments, checked against local automatic Spanish transcription. Listening 3 is restored from its approved original; all other pre-existing audio files are unchanged.

The original 69-resource CSV inventory is retained. `subject-audio-supplement.json` adds the seven new records (76 listed resources altogether), with text, file path, original attachment name, source-flow reference, duration, SHA-256, voice/speed documentation status and verification result. The attachment bytes are the authority for these seven files; the flow references do not assert a binary download match. Voice and speed are not recoverable from the attached MP3 metadata and are explicitly marked undocumented, with the original audio preserved.

**Listening 3 restored:** `assets/audio/unit2/listenings/1Y_U02_AUD_LIS_03_asignaturas_v1.mp3` now contains the approved original recovered from the teacher's `New tts node (1).mp3` attachment: 493,642 bytes, duration 29.753469 seconds, SHA-256 `6523530e0a901265b82a23072fb91c422a0a7a970993e33edfa7fe7d718ce123`, exactly matching the original inventory. Full FFmpeg decoding succeeds. The previous 30,060-byte invalid repository blob is preserved in Git history. No generated alternative is used. `listening3-restoration.json` records the recovered transcript, evidence and the teacher's voice correction: Matilda Paz, superseding the historical Laura López attribution in the original CSV. The generation of another take was separately requested during recovery; that take is not part of this PR.

| Requested subject | Recorded wording / status |
| --- | --- |
| Español | ASI 01: español |
| Inglés | ASI 02: inglés |
| Irlandés | ASI 15: irlandés; New tts node 4.mp3 |
| Matemáticas | ASI 03: matemáticas |
| Historia | ASI 05: historia |
| Geografía | ASI 06: geografía |
| Ciencias | ASI 04: ciencias |
| Educación Física | ASI 07: educación física |
| Negocios | ASI 11: empresariales; explicitly presented as another name |
| Economía Doméstica | ASI 10: economía doméstica |
| Tecnología Aplicada | ASI 16: tecnología aplicada; New tts node 11.mp3 |
| Ingeniería | ASI 17: ingeniería; New tts node 5.mp3 |
| Dibujo Técnico | ASI 18: dibujo técnico; New tts node 6.mp3 |
| Tecnología de la Madera | ASI 19: tecnología de la madera; New tts node 8.mp3 |
| Educación Plástica | ASI 20: educación plástica; New tts node 9.mp3 |
| Religión | ASI 21: religión; New tts node 10.mp3 |
| SPHE | ASI 13: educación personal, social y para la salud |
| CSPE | ASI 14: educación cívica, social y política |

All 18 subject entries now have playback controls. Negocios keeps the explicitly identified recorded synonym «empresariales». General «tecnología», «arte» and «música» remain in the original bank but are not reassigned to different labels.

Whole-sentence recordings available here are only EXP 08–12. Timetable sentences, “Me gusta la historia”, “No me gusta la geografía” and the PE favourite model are written models, without fabricated speech or word-splicing. Selecting a timetable cell plays the subject word, not the full sentence.

## Timetable

Fictional learner Álex studies Spanish and the options Home Economics, Wood Technology and Visual Art. Other options can be explored without implying that all learners take them. Days Monday–Thursday contain six 60-minute lessons; Friday contains four. Break after lesson 2: 15 minutes. Lunch after lesson 4: 40 minutes Monday–Thursday only. Friday ends at 13:15 and has no lunch block. Weekly class count: 28. Times are illustrative, not official school times.

The whole-week view scrolls horizontally inside a labelled keyboard-focusable region on small screens. The alternative one-day view displays the selected day in full width. Friday’s column ends after class 4. The common-subject collection is an introductory teaching set, not a claim about compulsory subjects in every school.

## Architecture and review

Block B has its own data, renderer, stylesheet and illustration sprite. The approved Block A module and illustrations and all Unit 1 content files remain untouched. Shared application integration adds the Learn block selector and handles only `u2b-` actions. Existing Unit 1 route and state tests remain in place. Learn → Explore → Practise → Communicate → Play stays visible; unbuilt Unit 2 stages remain unavailable.

State stays in page memory and contains only selections for fictional examples. There are no student accounts, personal information fields, server calls or new persistence.

Automated checks cover timetable structure, resource hashes, all instruction modes, state transitions, answer visibility, preference agreement and application navigation. The teacher tested and approved Learn B on iPad on 2026-10-19 and authorised merging PR #8 after final checks. That real-device approval is separate from this environment's automated checks; no additional mobile or desktop browser test is claimed.

## Agreed next stages — documentation only

The [Unit 2 roadmap](../HOJA_DE_RUTA.md#1st-year--unidad-2-el-aula) records a future customisable timetable laboratory in Explore, followed in Communicate by learners creating and using their real school timetable. Both will display times only as digital numbers; teaching how to say the time in Spanish is deferred. Neither activity is implemented here.

Practise will reuse the same approved Lucía Listening 3 for listening-comprehension questions with feedback after answering and replay. Learn keeps this recording as first exposure, without adding questions or changing the audio now. Learn Block C must be designed pedagogically with the teacher before implementation begins.

Validation result: `npm test` — 77 passed; `npm run build` — successful; `git diff --check` — clean. All enabled MP3s have been checked with FFmpeg. All 18 original subject illustrations were inspected in a rendered contact sheet. The approved Block A renderer, its illustration sprite, Unit 1 data, shared original stylesheet and all pre-existing audio binaries except the restored Listening 3 have zero diff against the starting main commit `2b2703bdcd6e0bdf9b6c19981c89aa7220d2b8fd`.
