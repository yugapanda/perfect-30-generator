import { Chord, makeNextChord } from "./chord-maker";


export type Groups = string[][]

/**
 * 16文字ずつの配列に切り分ける
 */
export const groupedText = (text: string): Groups => grouped(text.split(""));


export const grouped = <T>(list: T[]): T[][] => list.reduce((acc, now) => {
    if (acc[acc.length - 1].length >= 16) {
        acc.push([]);
    }
    acc[acc.length - 1].push(now);
    return acc;
}, new Array<Array<T>>(new Array<T>()));
