# Learn B — Mi semana escolar

Five short discoveries: days → subjects → Álex’s timetable → preferences → comprehension. The three checks have no score. Their answers and feedback are withheld until selection. Listening 3 is prepared as an additional encounter for recognising familiar words, without a displayed transcript, but is currently disabled because the repository binary failed verification. It is not assumed to describe Álex’s fictional timetable.

## Audio audit

21 original files reused, with inventory SHA-256 checks and full FFmpeg decoding: DIA 01–05, ASI 01–07, 10–11, 13–14 and EXP 08–12. No audio files changed or generated. Existing inventory remains the source of provenance and transcription status.

**Listening 3 blocker (already present in main):** `assets/audio/unit2/listenings/1Y_U02_AUD_LIS_03_asignaturas_v1.mp3` contains 30,060 bytes and fails FFmpeg decoding (no MP3 frame found). Its actual SHA-256 is `8cbc6369ca02e553642d5adf19523e40c5d591884c63dd34dbdf50068eb54101`; the inventory describes a 29.753469-second original with SHA-256 `6523530e0a901265b82a23072fb91c422a0a7a970993e33edfa7fe7d718ce123`. This PR preserves the file exactly and does not substitute or regenerate it. Its optional player is disabled with a learner-facing unavailable notice. To enable it, restore the approved original byte for byte, validate its hash and full decoding, then set `weekListeningAvailable` to true. The new block's three comprehension moments do not depend on it.

| Requested subject | Recorded wording / status |
| --- | --- |
| Español | ASI 01: español |
| Inglés | ASI 02: inglés |
| Irlandés | Missing |
| Matemáticas | ASI 03: matemáticas |
| Historia | ASI 05: historia |
| Geografía | ASI 06: geografía |
| Ciencias | ASI 04: ciencias |
| Educación Física | ASI 07: educación física |
| Negocios | ASI 11: empresariales; explicitly presented as another name |
| Economía Doméstica | ASI 10: economía doméstica |
| Tecnología Aplicada | Missing exact title; ASI 12 says only «tecnología» and is not assigned to this title |
| Ingeniería | Missing |
| Dibujo Técnico | Missing |
| Tecnología de la Madera | Missing |
| Educación Plástica | Missing exact title; ASI 09 says «arte» and is not assigned to this title |
| Religión | Missing |
| SPHE | ASI 13: educación personal, social y para la salud |
| CSPE | ASI 14: educación cívica, social y política |

Missing exact titles: **7**. Those entries remain readable and illustrated, with a visible recording-unavailable message and no misleading playback control. Música exists in the audio bank but is outside the requested subject list.

Whole-sentence recordings available here are only EXP 08–12. Timetable sentences, “Me gusta la historia”, “No me gusta la geografía” and the PE favourite model are written models, without fabricated speech or word-splicing. Selecting a timetable cell plays the subject word, not the full sentence.

## Timetable

Fictional learner Álex studies Spanish and the options Home Economics, Wood Technology and Visual Art. Other options can be explored without implying that all learners take them. Days Monday–Thursday contain six 60-minute lessons; Friday contains four. Break after lesson 2: 15 minutes. Lunch after lesson 4: 40 minutes Monday–Thursday only. Friday ends at 13:15 and has no lunch block. Weekly class count: 28. Times are illustrative, not official school times.

The whole-week view scrolls horizontally inside a labelled keyboard-focusable region on small screens. The alternative one-day view displays the selected day in full width. Friday’s column ends after class 4. The common-subject collection is an introductory teaching set, not a claim about compulsory subjects in every school.

## Architecture and review

Block B has its own data, renderer, stylesheet and illustration sprite. The approved Block A module and illustrations and all Unit 1 content files remain untouched. Shared application integration adds the Learn block selector and handles only `u2b-` actions. Existing Unit 1 route and state tests remain in place. Learn → Explore → Practise → Communicate → Play stays visible; unbuilt Unit 2 stages remain unavailable.

State stays in page memory and contains only selections for fictional examples. There are no student accounts, personal information fields, server calls or new persistence.

Automated checks cover timetable structure, resource hashes, all instruction modes, state transitions, answer visibility, preference agreement and application navigation. Browser testing in this environment is unavailable because the required control-browser capability is absent; actual Safari/iPad/mobile playback and visual layout still need review in the deployed preview.

Validation result: `npm test` — 76 passed; `npm run build` — successful; `git diff --check` — clean. The 21 enabled MP3s decode completely with FFmpeg. All 18 original subject illustrations were inspected in a rendered contact sheet. The approved Block A renderer, its illustration sprite, Unit 1 data, shared original stylesheet and all audio binaries have zero diff against the starting main commit `2b2703bdcd6e0bdf9b6c19981c89aa7220d2b8fd`.
