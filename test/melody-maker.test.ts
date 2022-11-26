import { changePitch } from "../melody-maker"


test("changePitchは、 元が6のpitchで第二引数に2を指定した場合、octaveが1加算され、pitchが1のpitchを返すべき ", () => {
    const newPitch = changePitch({
        pitch: 6,
        octave: 3,
        velocity: 90,
        kind: "attack"
    },
        2);

    expect(newPitch).toEqual({
        pitch: 1,
        octave: 4,
        velocity: 90,
        kind: "attack"
    })

});

test("changePitchは、 元が1のpitchで第二引数に-2を指定した場合、octaveが1減算され、pitchが5のpitchを返すべき ", () => {
    const newPitch = changePitch({
        pitch: 1,
        octave: 3,
        velocity: 90,
        kind: "attack"
    },
        -2);

    expect(newPitch).toEqual({
        pitch: 5,
        octave: 2,
        velocity: 90,
        kind: "attack"
    })

});

test("changePitchは、 元が1のpitchで第二引数に0を指定した場合、そのままのPitchを返すべき", () => {
    const newPitch = changePitch({
        pitch: 1,
        octave: 3,
        velocity: 90,
        kind: "attack"
    }, 0);

    expect(newPitch).toEqual({
        pitch: 1,
        octave: 3,
        velocity: 90,
        kind: "attack"
    })

});