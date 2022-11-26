import { Chord, ChordSequence, generateChords } from "./chord-maker"
import { grouped, groupedText } from "./group-maker"
import { CurrentMelody, MelodySequence } from "./melody-maker"
import { wordToFunc } from "./melody-maker-functions"


export type Staff = {
    chord: Chord,
    tonal: number
    melodySeq: MelodySequence
}

export type Music = Staff[]


export const generate = (source: string) => {
    const filteredText = source.split("")
        .filter(x => Array.from(wordToFunc.keys()).includes(x))
        .join("");

    const groups = groupedText(filteredText);
    const chords = generateChords(groups);

    let current: CurrentMelody = {
        melodyPitch: {
            pitch: 0,
            octave: 3,
            velocity: 90,
            kind: "rest"
        },
        modulationCount: 0,
        modulationTarget: 0
    }

    let melodySequence: MelodySequence = [];
    const tonalDiffs: number[] = []

    chords.forEach(chordWithGroup => {
        chordWithGroup.group.forEach(word => {
            const f = wordToFunc.get(word);
            if (f === undefined) {
                return;
            }
            const nextMelody = f(current, melodySequence, chordWithGroup.chord);
            current = nextMelody.newCurrent;
            melodySequence = nextMelody.sequence;
            tonalDiffs.push(nextMelody.tonalDiff);
        });
    });

    return makeMusic(
        melodySequence,
        chords.map(x => x.chord),
        tonalDiffs
    )

}

export const makeMusic = (
    melodies: MelodySequence,
    chords: ChordSequence,
    tonalSeq: number[]
): Music => {

    const melodiesInStaff = grouped(melodies);
    const tonalInStaff = grouped(tonalSeq);
    return chords.map((chord, i) => {
        return {
            melodySeq: melodiesInStaff[i],
            chord,
            tonal: tonalInStaff[i].reduce((acc, now) => acc + now, 0)
        }
    })
}