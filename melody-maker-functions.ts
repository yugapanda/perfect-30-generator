import { Chord, chordToPitch } from "./chord-maker";
import { changePitch, CurrentMelody, keepCurrent, MelodySequence, midiVelocityFit, nearPitchInChordVerFar, nearPitchInChordVerHigh, nearPitchInChordVerLow, nearPitchInChordVerNear } from "./melody-maker";


export type NextMelody = {
    newCurrent: CurrentMelody,
    sequence: MelodySequence,
    tonalDiff: number
}

/**
 * グループ内の数を和声の決定に利用する
 * すでに発音されている音があれば、伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 */
export const caseA = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent = keepCurrent(current, "tie");
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * 現在のvelocityを10上げる。
 * 発音はしないがすでに発音されている音があれば伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 */
export const caseB = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "tie",
            velocity: midiVelocityFit(current.melodyPitch.velocity + 10)
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * 現在のvelocityを10下げる、発音はしないがすでに発音されている音があれば伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseD = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "tie",
            velocity: midiVelocityFit(current.melodyPitch.velocity - 10)
        }
    }
    sequence.push({ ...sequence[sequence.length - 1], kind: "tie" });
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * すでに発音されている音があれば、伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseE = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "tie",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * 発音せずに3度下行する, すでに発音されている音があれば伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseF = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...changePitch(current.melodyPitch, -3),
            kind: "tie",
        }
    }
    sequence.push({ ...sequence[sequence.length - 1], kind: "tie" });
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * 発音せずに3度上行する, すでに発音されている音があれば伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseG = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...changePitch(current.melodyPitch, 3),
            kind: "tie",
        }
    }
    sequence.push({ ...sequence[sequence.length - 1], kind: "tie" });
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * 発音せずに2度下行する, すでに発音されている音があれば伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseH = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...changePitch(current.melodyPitch, -2),
            kind: "tie",
        }
    }
    sequence.push({ ...sequence[sequence.length - 1], kind: "tie" });
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * すでに発音されている音があれば、伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseI = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "tie",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * 発音せずに2度上行する, すでに発音されている音があれば伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseR = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...changePitch(current.melodyPitch, 2),
            kind: "tie",
        }
    }
    sequence.push({ ...sequence[sequence.length - 1], kind: "tie" });
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * すでに発音されている音があれば、伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseJ = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {

    const count = current.modulationCount + 1;

    const newCurrent: CurrentMelody = count >= 5
        ? {
            ...current,
            modulationCount: 0,
            modulationTarget: 0,
            melodyPitch: {
                ...current.melodyPitch,
                kind: "rest",
            }
        }
        : {
            ...current,
            modulationCount: current.modulationCount + 1,
            melodyPitch: {
                ...current.melodyPitch,
                kind: "rest",
            }
        }

    sequence.push(newCurrent.melodyPitch);
    const tonalDiff = (current.modulationTarget * 5) % 24
    return {
        newCurrent,
        sequence,
        tonalDiff
    }
}

/**
 * - 1つ前の音が和音内の音だった場合  
 *  - 1つ上の和音外の音が発音される  
 * - 1つ前に発音された音が和音外の音だった場合  
 *  - もっとも近い和音内の音が発音される  
 *  - 同じ距離に2つの和音内の音がある場合、高い側の音が選択される 
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseK = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const pastAttacked = sequence.reverse().find(x => x.kind === "attack");
    // 過去に発音された音が１つもなかった場合
    if (pastAttacked === undefined) {
        const newCurrent: CurrentMelody = {
            ...current,
            melodyPitch: {
                ...current.melodyPitch,
                pitch: chordToPitch.get(chord)?.pitchInBorrowedTonal[0] ?? 0,
                kind: "attack"
            },
        }
        sequence.push(newCurrent.melodyPitch);
        return {
            newCurrent,
            sequence,
            tonalDiff: 0
        }
    }

    // 1つ前の音が和音内の音だった場合
    if (chordToPitch.get(chord)?.pitchInBorrowedTonal?.includes(current.melodyPitch.pitch)) {
        // 1つ上の和音外の音が発音される
        const newCurrent: CurrentMelody = {
            ...current,
            melodyPitch: {
                ...changePitch(current.melodyPitch, 1),
                kind: "attack",
            }
        }
        sequence.push(newCurrent.melodyPitch);
        return {
            newCurrent,
            sequence,
            tonalDiff: 0
        }
    }

    // 1つ前に発音された音が和音外の音だった場合

    // もっとも近い和音内の音が発音される
    // 同じ距離に2つの和音内の音がある場合、高い側の音が選択される
    const newCurrent: CurrentMelody = {
        ...current,
        melodyPitch: {
            ...nearPitchInChordVerHigh(chord, current.melodyPitch),
            kind: "attack",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * 休符
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseM = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "rest",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}


/**
 * - 1つ前に発音された音が和音内の音だった場合  
 *  - 「今の音」の高さの和音内の音が発音される  
 * - 1つ前に発音された音が和音外の音だった場合  
 *  - もっとも近い和音内の音が発音される  
 *  - 同じ距離に2つの和音内の音がある場合、開始音と逆方向の音が選択される  
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseN = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const pastAttacked = sequence.reverse().find(x => x.kind === "attack");
    // 過去に発音された音が１つもなかった場合
    if (pastAttacked === undefined) {
        const newCurrent: CurrentMelody = {
            ...current,
            melodyPitch: {
                ...current.melodyPitch,
                pitch: chordToPitch.get(chord)?.pitchInBorrowedTonal[0] ?? 0,
                kind: "attack"
            },
        }
        sequence.push(newCurrent.melodyPitch);
        return {
            newCurrent,
            sequence,
            tonalDiff: 0
        }
    }

    // 1つ前の音が和音内の音だった場合
    if (chordToPitch.get(chord)?.pitchInBorrowedTonal?.includes(current.melodyPitch.pitch)) {
        // 同じ高さの音が発音される
        const newCurrent: CurrentMelody = {
            ...current,
            melodyPitch: {
                ...changePitch(current.melodyPitch, 0),
                kind: "attack",
            }
        }
        sequence.push(newCurrent.melodyPitch);
        return {
            newCurrent,
            sequence,
            tonalDiff: 0
        }
    }

    const firstAttack = sequence.find(x => x.kind === "attack");
    // 1つ前に発音された音が和音外の音だった場合
    // もっとも近い和音内の音が発音される
    // 同じ距離に2つの和音内の音がある場合、開始音と逆方向の音が選択される
    const newCurrent: CurrentMelody = {
        ...current,
        melodyPitch: {
            ...nearPitchInChordVerFar(chord, current.melodyPitch, firstAttack ?? current.melodyPitch),
            kind: "attack",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * すでに発音されている音があれば、伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseO = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "tie",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * - 転調するまでの間、何度出現したかを「転調先カウント」に保持し、転調される時に０にする
 * - 1個貯まる毎に5度上の調に転調する
 * - 休符とする
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseP = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current,
        modulationTarget: current.modulationTarget + 1,
        melodyPitch: {
            ...current.melodyPitch,
            kind: "rest",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * - 1つ前に発音された音が和音内の音だった場合  
 *  - 「今の音」の高さの和音内の音が発音される  
 * - 1つ前に発音された音が和音外の音だった場合  
 *  - もっとも近い和音内の音が発音される  
 *  - 同じ距離に2つの和音内の音がある場合、開始音と逆方向の音が選択される  
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseS = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const pastAttacked = sequence.reverse().find(x => x.kind === "attack");
    // 過去に発音された音が１つもなかった場合
    if (pastAttacked === undefined) {
        const newCurrent: CurrentMelody = {
            ...current,
            melodyPitch: {
                ...current.melodyPitch,
                pitch: chordToPitch.get(chord)?.pitchInBorrowedTonal[0] ?? 0,
                kind: "attack"
            },
        }
        sequence.push(newCurrent.melodyPitch);
        return {
            newCurrent,
            sequence,
            tonalDiff: 0
        }
    }

    // 1つ前の音が和音内の音だった場合
    if (chordToPitch.get(chord)?.pitchInBorrowedTonal?.includes(current.melodyPitch.pitch)) {
        // 同じ高さの音が発音される
        const newCurrent: CurrentMelody = {
            ...current,
            melodyPitch: {
                ...changePitch(current.melodyPitch, 0),
                kind: "attack",
            }
        }
        sequence.push(newCurrent.melodyPitch);
        return {
            newCurrent,
            sequence,
            tonalDiff: 0
        }
    }

    const firstAttack = sequence.find(x => x.kind === "attack");
    // 1つ前に発音された音が和音外の音だった場合
    // もっとも近い和音内の音が発音される
    // 同じ距離に2つの和音内の音がある場合、開始音方向の音が選択される
    const newCurrent: CurrentMelody = {
        ...current,
        melodyPitch: {
            ...nearPitchInChordVerNear(chord, current.melodyPitch, firstAttack ?? current.melodyPitch),
            kind: "attack",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * - 1つ前の音が和音内の音だった場合  
 *  - 1つ低いの和音外の音が発音される  
 * - 1つ前に発音された音が和音外の音だった場合  
 *  - もっとも近い和音内の音が発音される  
 *  - 同じ距離に2つの和音内の音がある場合、低い側の音が選択される 
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseT = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const pastAttacked = sequence.reverse().find(x => x.kind === "attack");
    // 過去に発音された音が１つもなかった場合
    if (pastAttacked === undefined) {
        const newCurrent: CurrentMelody = {
            ...current,
            melodyPitch: {
                ...current.melodyPitch,
                pitch: chordToPitch.get(chord)?.pitchInBorrowedTonal[0] ?? 0,
                kind: "attack"
            },
        }
        sequence.push(newCurrent.melodyPitch);
        return {
            newCurrent,
            sequence,
            tonalDiff: 0
        }
    }

    // 1つ前の音が和音内の音だった場合
    if (chordToPitch.get(chord)?.pitchInBorrowedTonal?.includes(current.melodyPitch.pitch)) {
        // 1つ上の和音外の音が発音される
        const newCurrent: CurrentMelody = {
            ...current,
            melodyPitch: {
                ...changePitch(current.melodyPitch, -1),
                kind: "attack",
            }
        }
        sequence.push(newCurrent.melodyPitch);
        return {
            newCurrent,
            sequence,
            tonalDiff: 0
        }
    }

    // 1つ前に発音された音が和音外の音だった場合
    // もっとも近い和音内の音が発音される
    // 同じ距離に2つの和音内の音がある場合、低い側の音が選択される
    const newCurrent: CurrentMelody = {
        ...current,
        melodyPitch: {
            ...nearPitchInChordVerLow(chord, current.melodyPitch),
            kind: "attack",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * すでに発音されている音があれば、伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseU = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "tie",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}


/**
 * - 転調するまでの間、何度出現したかを「転調先カウント」に保持し、転調される時に０にする
 * - 1個貯まる毎に5度上の調に転調する
 * - 休符とする
 * @param current 
 * @param sequence 
 * @param chord 
 * @returns 
 */
export const caseV = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current,
        modulationTarget: current.modulationTarget + 1,
        melodyPitch: {
            ...current.melodyPitch,
            kind: "rest",
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}


/**
 * 現在のvelocityを20下げる
 * 発音はしないがすでに発音されている音があれば伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 */
export const caseW = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "tie",
            velocity: midiVelocityFit(current.melodyPitch.velocity - 20)
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}


/**
 * 現在のvelocityを20上げる
 * 発音はしないがすでに発音されている音があれば伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 */
export const caseY = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "tie",
            velocity: midiVelocityFit(current.melodyPitch.velocity + 20)
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

/**
 * 現在のvelocityを90にする
 * 発音はしないがすでに発音されている音があれば伸ばす
 * @param current 
 * @param sequence 
 * @param chord 
 */
export const caseZ = (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
): NextMelody => {
    const newCurrent: CurrentMelody = {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind: "tie",
            velocity: 90
        }
    }
    sequence.push(newCurrent.melodyPitch);
    return {
        newCurrent,
        sequence,
        tonalDiff: 0
    }
}

export const wordToFunc: Map<string, (
    current: CurrentMelody,
    sequence: MelodySequence,
    chord: Chord
) => NextMelody> = new Map([
    ["a", caseA],
    ["b", caseB],
    ["d", caseD],
    ["e", caseE],
    ["f", caseF],
    ["g", caseG],
    ["h", caseH],
    ["i", caseI],
    ["j", caseJ],
    ["k", caseK],
    ["n", caseN],
    ["m", caseM],
    ["o", caseO],
    ["p", caseP],
    ["r", caseR],
    ["s", caseS],
    ["t", caseT],
    ["u", caseU],
    ["v", caseV],
    ["w", caseW],
    ["y", caseY],
    ["z", caseZ],
]);