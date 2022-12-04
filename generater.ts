import { readFileSync } from "fs";
import { generate } from "./music";
import { convertToMidiFromMusicMelody } from "./music-midi-converter";



const source = readFileSync("/app/converted.txt").toString("utf-8");
const music = generate(source);
convertToMidiFromMusicMelody(music, "./midi.midi");