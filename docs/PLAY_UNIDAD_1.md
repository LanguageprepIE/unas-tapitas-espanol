# Play · 1st Year · Unit 1

18 October 2026. First playable implementation following teacher approval of the three-game design.

## Games

- **Anagrams with a twist:** six workshop orders. Reconstruct a word, then build an appropriate message that changes the scene. Progression includes longer words, accents, changed identity and a plural speaker.
- **Impossible conversations:** help fictional visitor Nilo (13) get a badge from Alba, verify Inés’s name and age, and be introduced by Leo. Phrase pieces construct messages. Encounters retain information; greetings, early farewells, repair, repetition and undo are available. All four authored feelings are legitimate.
- **Secret code:** wake a terminal, recover Sara’s identity from spelling, reconstruct two audio badges, then combine the archive’s stand assignments with the recorded ages to open a capsule. Reuses the complete, unchanged `u1-01-presentaciones.mp3`; transcript provides equivalent access.

## Boundaries

Play is optional and is not included in the four academic practice-completion flags or the home continuation algorithm. Existing Learn, Explore, Practise and Communicate content is preserved. Their shared navigation adds the fifth Play destination. No existing MP3 is changed. No API, microphone, account, analytics or speech synthesis is added.

The text is authored for this project, using the current Unit 1 repertoire. Story instructions and feedback support English, Spanish and bilingual modes. Closed authored messages are evaluated with deterministic rules, not natural-language AI. Durations are design estimates, not measured classroom outcomes.

## Architecture

- `data/play-unit1.mjs`: original scenarios, phrase pieces and catalogue with engine and unit identifiers.
- `play-engine.mjs`: state transitions, rule checking and bounded checkpoints.
- `play.mjs`: views using the existing application language/button helpers.
- `play.css`: scoped visual identities and responsive layouts.

The catalogue separates content from the course route for a future Game Zone. The engines currently support this first content pack; broader reuse will require explicit validation for each new pack. Game Zone itself is not implemented here.

## Saving and controls

Optional existing saving preference also controls a separate `tapitas-play-v1` checkpoint. It stores authored progress flags and fictional character selections, never free writing or personal details. Disabling/forgetting saved practice removes both keys. Mid-order workshop reconstruction restarts at the current round after reload; room mechanisms and recorded encounters are retained. Language changes and route changes retain the live session. Undo history stays in memory.

All actions use native buttons, audio controls or details/summary: touch, mouse and keyboard can access the same functions. No dragging, timing or hover is required. Room objects are listed with text. Reduced-motion styling, visible focus, written feedback and a transcript are included.

## Validation

`npm test`: 51 automated tests, including all existing tests. New checks complete all six workshop orders and both stories; exercise repair, valid feelings, undo, premature unlock prevention, checkpoint constraints, all game/room views in three languages and app routing without academic completion.

All 31 existing MP3, educational data files, Explore modules and baseline stylesheet remain unchanged against the main commit used as the base. Browser, real iPad/mobile, screen-reader and classroom play testing remain pending: automated rendering is not a visual or accessibility certification.

## Teacher review

Try each complete ending and an intentional misunderstanding. Check how independently a beginner can discover the purpose, whether scenes are enjoyable, and whether repetition feels worthwhile. This first playable set is deliberately small. No merge to main is performed before teacher review.
