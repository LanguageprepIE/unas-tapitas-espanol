# Explore Unit 1 audio

Spanish Sounds Lab and Number Machine each use short, word-specific MP3 files. The files are generated with ElevenLabs Multilingual v2 using the same Spanish voice (Laura López, voice ID `yiWEefwu5z3DQCM79clN`). Each audio button is registered only to the MP3 for the displayed word or number; if a file is missing, the interface does not render a player.

## Spanish Sounds Lab

| Pattern | Word | File |
| --- | --- | --- |
| J | jamón | `assets/audio/explore/sounds/jamón.mp3` |
| J | joven | `assets/audio/explore/sounds/joven.mp3` |
| Ñ | niño | `assets/audio/explore/sounds/niño.mp3` |
| Ñ | mañana | `assets/audio/explore/sounds/mañana.mp3` |
| LL | llamo | `assets/audio/explore/sounds/llamo.mp3` |
| LL | calle | `assets/audio/explore/sounds/calle.mp3` |
| Silent H | hola | `assets/audio/explore/sounds/hola.mp3` |
| Silent H | hermano | `assets/audio/explore/sounds/hermano.mp3` |

## Number Machine

Each file contains one spoken number, with the two-digit filename matching the number: `assets/audio/explore/numbers/00.mp3` (*cero*) through `assets/audio/explore/numbers/20.mp3` (*veinte*). The canonical spellings are in `numberWords` in `explore.mjs`.

All 29 files are packaged locally and use the normal HTML audio player; playback does not call ElevenLabs or depend on `speechSynthesis`. The player reports a visible error if a browser cannot play a file. The original listening files in `assets/audio/` are unchanged.

Automated checks confirm that every registered file exists, has an MP3 ID3 header, and is connected to its matching word or number. Browser/device playback still merits a spot-check on Android and iPad when the pull request is reviewed.
