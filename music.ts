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

export type MusicPartials = {
    melodies: MelodySequence,
    chords: ChordSequence,
    tonalSeq: number[]
}

export const makeMusicPartials = (chords: {
    chord: Chord;
    group: string[];
}[]): MusicPartials => {
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
    return {
        melodies: melodySequence,
        chords: chords.map(x => x.chord),
        tonalSeq: tonalDiffs
    }
}

export const generate = (source: string) => {
    const filteredText = source.split("")
        .filter(x => Array.from(wordToFunc.keys()).includes(x))
        .join("");

    const groups = groupedText(filteredText);
    const chords = generateChords(groups);
    const musicPartials = makeMusicPartials(chords);


    return makeMusic(musicPartials);

}

export const makeMusic = (musicPartials: MusicPartials): Music => {

    const melodiesInStaff = grouped(musicPartials.melodies);
    const tonalInStaff = grouped(musicPartials.tonalSeq);
    return musicPartials.chords.map((chord, i) => {
        return {
            melodySeq: melodiesInStaff[i],
            chord,
            tonal: tonalInStaff[i].reduce((acc, now) => acc + now, 0)
        }
    })
}