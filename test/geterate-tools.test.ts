import { makeNextChord, generateChords } from "../chord-maker";
import { groupedText } from "../group-maker"

test("grouped should make group 16 length array", () => {
    const [f, s, t] = groupedText("0123456789abcdefghijklnmopqrstuvwxyz");
    expect(f).toEqual(
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f",]
    )

    expect(s).toEqual(
        ["g", "h", "i", "j", "k", "l", "n", "m", "o", "p", "q", "r", "s", "t", "u", "v",]
    )

    expect(t).toEqual(
        ["w", "x", "y", "z"]
    )
});

test("makeNextChord should return V", () => {
    const next = makeNextChord("I", 8);
    expect(next).toBe("II");
})

test("make chords", () => {
    const groups = groupedText("0123456789abcdefghijklnmopqrstuvwxyz");
    const chords = generateChords(groups);
});