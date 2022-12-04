import { readFileSync } from "fs";
import { generate } from "../music";
import { convertToMidiFromMusicChord, convertToMidiFromMusicMelody } from "../music-midi-converter";


test("main", () => {
    const source = readFileSync("/app/converted.txt").toString("utf-8");
    const music = generate(source);
    convertToMidiFromMusicMelody(music, "./midi.midi");
    convertToMidiFromMusicChord(music, "./midi-chord.midi");
})