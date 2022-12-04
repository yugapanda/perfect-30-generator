import * as exp from "constants"
import { Chord, chordToPitch, Pitch } from "./chord-maker"

export type MelodyKind = "rest" | "attack" | "tie";
export type PitchAddition = -3 | -2 | -1 | 0 | 1 | 2 | 3;

/**
 * メロディの1音
 */
export type MelodyPitch = {
    pitch: Pitch,
    octave: number,
    velocity: number,
    kind: MelodyKind
}

/**
 * 転調の管理等のメタデータ付きメロディの1音
 */
export type CurrentMelody = {
    melodyPitch: MelodyPitch,
    modulationCount: number,
    modulationTarget: number,
}

/**
 * メロディのシーケンス
 */
export type MelodySequence = MelodyPitch[]

/**
 * 1文字と現在の和音からメタデータ付きメロディと、
 * そのメロディをpushしたシーケンスを返す
 * @param word 
 * @param chord 
 * @param melody 
 * @returns 
 */
export const makeNextPitch = (
    word: string,
    chord: Chord,
    melody: {
        current: CurrentMelody,
        sequence: MelodySequence
    }
): {
    current: CurrentMelody,
    sequence: MelodySequence,
} => {


    return {
        current: melody.current,
        sequence: melody.sequence,
    }

}

/**
 * 下限と上限を指定し、入力値が下限を下回るなら下限値を、
 * 入力値が上限値を上回るなら上限値を、
 * どちらでもないなら入力値をそのまま返す
 * @param current 
 * @param under 
 * @param upper 
 * @returns 
 */
const constrain = (current: number, under: number, upper: number): number => {
    if (under > current) {
        return under;
    }
    if (current > upper) {
        return upper;
    }

    return current;
}

/**
 * 上限下限をmidiのvelocityにあわせる
 * @param val 
 * @returns 
 */
export const midiVelocityFit = (val: number) => {
    return constrain(val, 30, 90);
}

/**
 * currentをそのままに、kindだけ指定したものを適用して返す
 * @param current 
 * @param kind 
 * @returns 
 */
export const keepCurrent = (current: CurrentMelody, kind: MelodyKind) => {
    return {
        ...current, melodyPitch: {
            ...current.melodyPitch,
            kind
        }
    }
}

/**
 * 2つのピッチの距離を返す
 * @param pitch1 
 * @param pitch2 
 * @returns 
 */
export const distancePitches = (pitch1: MelodyPitch, pitch2: MelodyPitch): number => {
    const octaveDist = Math.abs(pitch1.octave - pitch2.octave) * 7;
    const pitchDist = Math.abs(pitch1.pitch - pitch2.pitch);
    return octaveDist + pitchDist;
}

/**
 * currentをそのままに、pitchだけ指定したものを適用して返す
 * 
 * @param current 
 * @param kind 
 * @returns 
 */
export const changePitchTie = (current: CurrentMelody, pitchAddition: PitchAddition): CurrentMelody => {
    return {
        ...current,
        melodyPitch: {
            ...changePitch(current.melodyPitch, pitchAddition),
            kind: "tie",
        }
    }
}

export const changePitch = (current: MelodyPitch, pitchAddition: PitchAddition): MelodyPitch => {

    const newPitch = current.pitch + pitchAddition;

    if (newPitch > 6) {
        return {
            ...current,
            octave: constrain(current.octave + 1, 3, 6),
            pitch: (newPitch % 7) as Pitch
        }
    }

    if (newPitch < 0) {
        return {
            ...current,
            octave: constrain(current.octave - 1, 3, 6),
            pitch: (7 + newPitch) as Pitch // newPitchは0より小さくなっているので、実質減算
        }

    }

    return {
        ...current,
        pitch: newPitch as Pitch
    }

}


/**
 * Chordと現在のPitchを指定し、最も近い和音内のPitchを返す
 * Chordが見つからない場合や、すでにChordに含まれているPitchの場合は受け取ったPitchをそのまま返す
 * 同じ距離に複数のPitchがある場合、高い側を返す
 * @param chord 
 * @param pitch 
 * @returns 
 */
export const nearPitchInChordVerHigh = (chord: Chord, pitch: MelodyPitch): MelodyPitch => {
    const pitchInChord = chordToPitch.get(chord);
    // コードがそもそも見つからなければそのままのPitchを返す
    // 型システム上はありえないケース
    if (pitchInChord === undefined) {
        return pitch;
    }

    if (pitchInChord.pitchInBorrowedTonal.includes(pitch.pitch)) {
        return pitch;
    }

    // 和音外のPitchの場合
    const up = changePitch(pitch, 1);


    if (pitchInChord.pitchInBorrowedTonal.includes(up.pitch)) {
        return up;
    }

    const down = changePitch(pitch, -1);

    return down;
}

/**
 * Chordと現在のPitchを指定し、最も近い和音内のPitchを返す
 * Chordが見つからない場合や、すでにChordに含まれているPitchの場合は受け取ったPitchをそのまま返す
 * 同じ距離に複数のPitchがある場合、低い側を返す
 * @param chord 
 * @param pitch 
 * @returns 
 */
export const nearPitchInChordVerLow = (chord: Chord, pitch: MelodyPitch): MelodyPitch => {
    const pitchInChord = chordToPitch.get(chord);
    // コードがそもそも見つからなければそのままのPitchを返す
    // 型システム上はありえないケース
    if (pitchInChord === undefined) {
        return pitch;
    }

    if (pitchInChord.pitchInBorrowedTonal.includes(pitch.pitch)) {
        return pitch;
    }

    // 和音外のPitchの場合
    const down = changePitch(pitch, -1);


    if (pitchInChord.pitchInBorrowedTonal.includes(down.pitch)) {
        return down;
    }

    const up = changePitch(pitch, -1);

    return up;
}

/**
 * Chordと現在のPitchを指定し、最も近い和音内のPitchを返す
 * Chordが見つからない場合や、すでにChordに含まれているPitchの場合は受け取ったPitchをそのまま返す
 * 同じ距離に複数のPitchがある場合、高い側を返す
 * @param chord 
 * @param pitch 
 * @returns 
 */
export const nearPitchInChordVerFar = (chord: Chord, pitch: MelodyPitch, firstAttack: MelodyPitch): MelodyPitch => {
    const pitchInChord = chordToPitch.get(chord);
    // コードがそもそも見つからなければそのままのPitchを返す
    // 型システム上ありえないケース
    if (pitchInChord === undefined) {
        return pitch;
    }

    if (pitchInChord.pitchInBorrowedTonal.includes(pitch.pitch)) {
        return pitch;
    }

    // 和音外のPitchの場合
    const up = changePitch(pitch, 1);
    const down = changePitch(pitch, -1);

    // upのみが和音内の場合
    if (pitchInChord.pitchInBorrowedTonal.includes(up.pitch) &&
        !pitchInChord.pitchInBorrowedTonal.includes(down.pitch)
    ) {
        return up;
    }

    // downのみが和音内の場合
    if (!pitchInChord.pitchInBorrowedTonal.includes(up.pitch) &&
        pitchInChord.pitchInBorrowedTonal.includes(down.pitch)
    ) {
        return down;
    }

    // 両方和音内の場合、開始音に距離が近い方を返す
    return distancePitches(up, firstAttack) < distancePitches(down, firstAttack) ? up : down

}

/**
 * Chordと現在のPitchを指定し、最も近い和音内のPitchを返す
 * Chordが見つからない場合や、すでにChordに含まれているPitchの場合は受け取ったPitchをそのまま返す
 * 同じ距離に複数のPitchがある場合、高い側を返す
 * @param chord 
 * @param pitch 
 * @returns 
 */
export const nearPitchInChordVerNear = (chord: Chord, pitch: MelodyPitch, firstAttack: MelodyPitch): MelodyPitch => {
    const pitchInChord = chordToPitch.get(chord);
    // コードがそもそも見つからなければそのままのPitchを返す
    // 型システム上ありえないケース
    if (pitchInChord === undefined) {
        return pitch;
    }

    if (pitchInChord.pitchInBorrowedTonal.includes(pitch.pitch)) {
        return pitch;
    }

    // 和音外のPitchの場合
    const up = changePitch(pitch, 1);
    const down = changePitch(pitch, -1);

    // upのみが和音内の場合
    if (pitchInChord.pitchInBorrowedTonal.includes(up.pitch) &&
        !pitchInChord.pitchInBorrowedTonal.includes(down.pitch)
    ) {
        return up;
    }

    // downのみが和音内の場合
    if (!pitchInChord.pitchInBorrowedTonal.includes(up.pitch) &&
        pitchInChord.pitchInBorrowedTonal.includes(down.pitch)
    ) {
        return down;
    }

    // 両方和音内の場合、開始音に距離が遠い方を返す
    return distancePitches(up, firstAttack) > distancePitches(down, firstAttack) ? up : down

}
