
/**
 * コード名。-はナポリ、oは順固有和音、xDはx調からの借用の属七
 */
export type Chord = "I" | "II" | "IID" | "oII" | "-II" | "III" | "IV" | "IVD" | "oIV" | "V" | "VI" | "VID" | "oVI" | "VII" | "VD";

export type ChordSequence = Chord[];

/**
 * 相対ピッチ。 0 が主音、4 が属音。
 */
export type Pitch = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * どの調から借用されたかを、今の主調からの相対距離で示す型
 */
export type BorrowedTonal = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type ChordInPitch = {
    borrowedTonal: BorrowedTonal,
    pitchInBorrowedTonal: Pitch[]
}

export type NextChordProb = {
    next: Chord,
    prob: number
}

export const chordToPitch: Map<Chord, ChordInPitch> = new Map([
    ["I", { borrowedTonal: 0, pitchInBorrowedTonal: [0, 2, 4] }],
    ["II", { borrowedTonal: 0, pitchInBorrowedTonal: [1, 3, 5] }],
    ["oII", { borrowedTonal: 11, pitchInBorrowedTonal: [1, 3, 5] }],
    ["IID", { borrowedTonal: 2, pitchInBorrowedTonal: [4, 6, 1, 3] }],
    ["III", { borrowedTonal: 0, pitchInBorrowedTonal: [2, 4, 6] }],
    ["IV", { borrowedTonal: 0, pitchInBorrowedTonal: [3, 5, 0] }],
    ["IVD", { borrowedTonal: 5, pitchInBorrowedTonal: [4, 6, 1, 3] }],
    ["oIV", { borrowedTonal: 8, pitchInBorrowedTonal: [6, 0, 2] }],
    ["V", { borrowedTonal: 0, pitchInBorrowedTonal: [4, 6, 1] }],
    ["VI", { borrowedTonal: 0, pitchInBorrowedTonal: [5, 0, 2] }],
    ["VI", { borrowedTonal: 8, pitchInBorrowedTonal: [4, 6, 1, 3] }],
    ["oVI", { borrowedTonal: 8, pitchInBorrowedTonal: [0, 2, 4] }],
    ["VII", { borrowedTonal: 0, pitchInBorrowedTonal: [6, 1, 3] }],
    ["VD", { borrowedTonal: 7, pitchInBorrowedTonal: [4, 6, 1, 3] }]
]);

const nextChordTable: Map<Chord, NextChordProb[]> = new Map([
    ["I", [
        { next: "IV", prob: 1 },
        { next: "VI", prob: 3 },
        { next: "VD", prob: 4 },
        { next: "oVI", prob: 6 },
        { next: "II", prob: 8 },
        { next: "IID", prob: 9 },
        { next: "oII", prob: 10 },
        { next: "-II", prob: 11 },
        { next: "III", prob: 12 },
        { next: "IVD", prob: 13 },
        { next: "oIV", prob: 14 },
        { next: "V", prob: 16 },
        { next: "VID", prob: 17 },
        { next: "VII", prob: 18 },

    ]],
    ["II", [
        { next: "oII", prob: 1 },
        { next: "-II", prob: 2 },
        { next: "V", prob: 9 },
        { next: "VD", prob: 18 },
    ]],
    ["IID", [
        { next: "II", prob: 18 },
    ]],
    ["oII", [
        { next: "V", prob: 9 },
        { next: "I", prob: 18 },

    ]],
    ["-II", [
        { next: "I", prob: 4 },
        { next: "V", prob: 18 },
    ]],
    ["III", [
        { next: "I", prob: 4 },
        { next: "IV", prob: 8 },
        { next: "V", prob: 18 },
    ]],
    ["IV", [
        { next: "I", prob: 1 },
        { next: "IID", prob: 2 },
        { next: "V", prob: 3 },
        { next: "oII", prob: 7 },
        { next: "oIV", prob: 8 },
        { next: "VID", prob: 11 },
        { next: "VD", prob: 18 },
    ]],
    ["IVD", [
        { next: "IV", prob: 18 },
    ]],
    ["oIV", [
        { next: "I", prob: 1 },
        { next: "oII", prob: 3 },
        { next: "V", prob: 9 },
        { next: "VD", prob: 18 },
    ]],
    ["V", [
        { next: "I", prob: 4 },
        { next: "VI", prob: 8 },
        { next: "oVI", prob: 18 },
    ]],
    ["VI", [
        { next: "I", prob: 1 },
        { next: "IV", prob: 3 },
        { next: "V", prob: 4 },
        { next: "VID", prob: 5 },
        { next: "oIV", prob: 6 },
        { next: "IID", prob: 7 },
        { next: "oII", prob: 8 },
        { next: "-II", prob: 9 },
        { next: "III", prob: 10 },
        { next: "IVD", prob: 11 },
        { next: "oVI", prob: 12 },
        { next: "VII", prob: 13 },
        { next: "VD", prob: 18 },
    ]],
    ["VID", [
        { next: "VI", prob: 18 },
    ]],
    ["oVI", [
        { next: "oII", prob: 3 },
        { next: "oIV", prob: 8 },
        { next: "V", prob: 9 },
        { next: "VID", prob: 11 },
        { next: "oVI", prob: 12 },
        { next: "VD", prob: 16 },
    ]],
    ["VD", [
        { next: "V", prob: 18 },
    ]],
])

/**
 * 現在のコードと、次の `Group` に含まれる `a` の数を受け取り、次のコードを返す
 * @param now 
 * @param numberOfA 
 * @returns 
 */
export const makeNextChord = (now: Chord, numberOfA: number): Chord | "I" => {
    const chordTable = nextChordTable.get(now);
    if (chordTable === undefined) {
        return "I";
    }

    return chordTable.find((x, i) => x.prob >= numberOfA)?.next ?? "I";
}


/**
 * 和声を配列で返す
 */
export const generateChords = (groups: string[][]): { chord: Chord, group: string[] }[] => {
    const chords: { chord: Chord, group: string[] }[] = [{ chord: "I", group: [] }];

    groups.forEach(group => {
        const chord = generateChord(group, chords[chords.length - 1].chord);
        chords.push({ chord, group });
    });
    const [, ...t] = chords;
    return t;
}

/**
 * 1つ前の和声と、16文字区切りの文字列から、次のコードを返す
 */
export const generateChord = (group: string[], current: Chord) => {
    const numberOfA = group.reduce((acc, now) => now === "a" ? acc + 1 : acc, 0);
    return makeNextChord(current, numberOfA);
}
