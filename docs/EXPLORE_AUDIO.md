# Explore Unit 1 — individual audio still needed

The two existing listening MP3s are full conversations and are not word or number recordings. Explore therefore uses written and visual discovery for now. Its audio registry, `readyAudio` in `explore.mjs`, is empty: no playback control appears without a matching packaged file. Once files are approved, register each exact path; the tests check every declared file. A playback error shows an on-page message.

Please create and review these **eight separate word files** for Spanish Sounds Lab, with a clear natural peninsular voice and no unrelated spoken material:

| Pattern | Words | Expected paths |
| --- | --- | --- |
| J | jamón, joven | `assets/audio/explore/sounds/jamón.mp3`, `assets/audio/explore/sounds/joven.mp3` |
| Ñ | niño, mañana | `assets/audio/explore/sounds/niño.mp3`, `assets/audio/explore/sounds/mañana.mp3` |
| LL | llamo, calle | `assets/audio/explore/sounds/llamo.mp3`, `assets/audio/explore/sounds/calle.mp3` |
| Silent H | hola, hermano | `assets/audio/explore/sounds/hola.mp3`, `assets/audio/explore/sounds/hermano.mp3` |

Number Machine needs **21 separate files**, one spoken number per file, from `cero` to `veinte`. Paths follow `assets/audio/explore/numbers/00.mp3` through `20.mp3`, where the two-digit filename matches the number spoken. The canonical order and spellings are in `numberWords` in `explore.mjs`; in particular `16.mp3` must say *dieciséis*.

Before registering a file, listen to it, confirm that the spoken word matches the label, verify playback on Android, iPad and desktop, and run `npm test`. Do not reuse the listening dialogues as if they were individual clips. The remaining UI experiments need no audio or paid API.
