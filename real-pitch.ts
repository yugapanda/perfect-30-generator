import { Chord, chordToPitch, Pitch } from "./chord-maker";
import { MelodyPitch } from "./melody-maker";

const majorScale = new Map<number, Map<Pitch, number>>([
    [0, // ド
        new Map<Pitch, number>([
            [0, 0],
            [1, 2],
            [2, 4],
            [3, 5],
            [4, 7],
            [5, 9],
            [6, 11],
        ])
    ],
    [1,// ド#
        new Map<Pitch, number>([
            [0, 1],
            [1, 3],
            [2, 5],
            [3, 7],
            [4, 8],
            [5, 10],
            [6, 12],
        ])
    ], [2,// レ
        new Map<Pitch, number>([
            [0, 1],
            [1, 2],
            [2, 4],
            [3, 6],
            [4, 7],
            [5, 9],
            [6, 11],
        ])
    ], [3,// ミb
        new Map<Pitch, number>([
            [0, 0],
            [1, 2],
            [2, 3],
            [3, 5],
            [4, 7],
            [5, 8],
            [6, 10],
        ])
    ], [4,// ミ
        new Map<Pitch, number>([
            [0, 1],
            [1, 3],
            [2, 4],
            [3, 6],
            [4, 8],
            [5, 9],
            [6, 11],
        ])
    ], [5,// ファ
        new Map<Pitch, number>([
            [0, 0],
            [1, 2],
            [2, 4],
            [3, 5],
            [4, 7],
            [5, 9],
            [6, 10],
        ])
    ], [6,// ファ#
        new Map<Pitch, number>([
            [0, 1],
            [1, 3],
            [2, 5],
            [3, 6],
            [4, 8],
            [5, 10],
            [6, 11],
        ])
    ], [7,// ソ
        new Map<Pitch, number>([
            [0, 0],
            [1, 2],
            [2, 4],
            [3, 6],
            [4, 7],
            [5, 9],
            [6, 11],
        ])
    ], [8,// ラb
        new Map<Pitch, number>([
            [0, 0],
            [1, 1],
            [2, 3],
            [3, 5],
            [4, 7],
            [5, 8],
            [6, 10],
        ])
    ], [9,// ラ
        new Map<Pitch, number>([
            [0, 1],
            [1, 2],
            [2, 4],
            [3, 6],
            [4, 8],
            [5, 9],
            [6, 11],
        ])
    ], [10,// シb
        new Map<Pitch, number>([
            [0, 0],
            [1, 2],
            [2, 3],
            [3, 5],
            [4, 7],
            [5, 9],
            [6, 10],
        ])
    ], [11,// シ
        new Map<Pitch, number>([
            [0, 1],
            [1, 3],
            [2, 4],
            [3, 6],
            [4, 8],
            [5, 10],
            [6, 11],
        ])
    ],

])

export type RealPitch = {
    realPitch: number;
    velocity: number;
    kind: "rest" | "attack" | "tie"
}

/**
 * 
 * @param pitch 
 * @param tonal 
 * @param chord 
 */
export const toRealPitch = (
    pitch: MelodyPitch,
    tonal: number,
    chord: Chord
): RealPitch => {

    const chordInPitch = chordToPitch.get(chord) ?? { borrowedTonal: 0, pitchInBorrowedTonal: [0, 2, 4] };

    const borrow = majorScale.get(chordInPitch.borrowedTonal) ?? new Map<Pitch, number>([
        [0, 0],
        [1, 2],
        [2, 4],
        [3, 5],
        [4, 7],
        [5, 9],
        [6, 11],
    ]);
    const realPitch = (borrow.get(pitch.pitch) ?? 0) + (pitch.octave * 12) + tonal;
    const kind = pitch.kind;
    const velocity = pitch.velocity;
    return {
        realPitch, kind, velocity
    }
}

