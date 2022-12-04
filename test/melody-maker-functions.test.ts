import { I, II, III, V, VI, VII } from "../chord-maker";
import { caseA, caseB, caseD, caseE, caseF, caseG, caseH, caseI, caseJ, caseK, caseM, caseN, caseR } from "../melody-maker-functions";

describe("Cases", () => {
    test("caseAは、既にあるnoteをtieに変換したnoteを突っ込むべき", () => {
        const caseAResult = caseA({
            melodyPitch: {
                pitch: 0,
                octave: 3,
                velocity: 90,
                kind: "rest"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(caseAResult.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 0,
                    octave: 3,
                    velocity: 90,
                    kind: "tie"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(caseAResult.sequence).toEqual(
            [{
                pitch: 0,
                octave: 3,
                velocity: 90,
                kind: "tie"
            }]
        );
        expect(caseAResult.tonalDiff).toEqual(0);
    });

    test("caseBは、既にあるnoteをtieに変換し、velocityを足したnoteを突っ込むべき", () => {
        const result = caseB({
            melodyPitch: {
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "rest"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 0,
                    octave: 3,
                    velocity: 90,
                    kind: "tie"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 0,
                octave: 3,
                velocity: 90,
                kind: "tie"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseDは、現在のvelocityを10下げ、発音はしないがすでに発音されている音があれば伸ばすべき", () => {
        const result = caseD({
            melodyPitch: {
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "rest"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 0,
                    octave: 3,
                    velocity: 70,
                    kind: "tie"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 0,
                octave: 3,
                velocity: 70,
                kind: "tie"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseEは、発音はしないがすでに発音されている音があれば伸ばすべき", () => {
        const result = caseE({
            melodyPitch: {
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 0,
                    octave: 3,
                    velocity: 80,
                    kind: "tie"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "tie"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseFは、発音せずに1度下行する, すでに発音されている音があれば伸ばす", () => {
        const result = caseF({
            melodyPitch: {
                pitch: 0,
                octave: 4,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 6,
                    octave: 3,
                    velocity: 80,
                    kind: "tie"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 6,
                octave: 3,
                velocity: 80,
                kind: "tie"
            }]
        );

        expect(result.tonalDiff).toEqual(0);
    });

    test("caseGは、発音せずに1度下行する, すでに発音されている音があれば伸ばす", () => {
        const result = caseG({
            melodyPitch: {
                pitch: 0,
                octave: 4,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 1,
                    octave: 4,
                    velocity: 80,
                    kind: "tie"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 1,
                octave: 4,
                velocity: 80,
                kind: "tie"
            }]
        );

        expect(result.tonalDiff).toEqual(0);
    });

    test("caseHは、発音せずに2度下行する, すでに発音されている音があれば伸ばす", () => {
        const result = caseH({
            melodyPitch: {
                pitch: 0,
                octave: 4,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 5,
                    octave: 3,
                    velocity: 80,
                    kind: "tie"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 5,
                octave: 3,
                velocity: 80,
                kind: "tie"
            }]
        );

        expect(result.tonalDiff).toEqual(0);
    });

    test("caseIは、発音はしないがすでに発音されている音があれば伸ばすべき", () => {
        const result = caseI({
            melodyPitch: {
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 0,
                    octave: 3,
                    velocity: 80,
                    kind: "tie"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "tie"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseRは、発音はしないがすでに発音されている音があれば伸ばし、2度上行すべき", () => {
        const result = caseR({
            melodyPitch: {
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 2,
                    octave: 3,
                    velocity: 80,
                    kind: "tie"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 2,
                octave: 3,
                velocity: 80,
                kind: "tie"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseJは、合計で5回出現した場合、転調する", () => {
        const result = caseJ({
            melodyPitch: {
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 4,
            modulationTarget: 5
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 0,
                    octave: 3,
                    velocity: 80,
                    kind: "rest"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "rest"
            }]
        );
        expect(result.tonalDiff).toEqual(1);
    });

    test("caseKは、1つ前の音が和音内だった場合、1つ上の和音外の音が発音されるべき", () => {
        const result = caseK({
            melodyPitch: {
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [{
            pitch: 0,
            octave: 3,
            velocity: 80,
            kind: "attack"
        }], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 1,
                    octave: 3,
                    velocity: 80,
                    kind: "attack"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            {
                pitch: 1,
                octave: 3,
                velocity: 80,
                kind: "attack"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseKは、1つ前に発音された音が和音外の音だった場合もっとも近い和音内の音が発音されるべき、\
    同じ距離に2つの和音内の音がある場合、高い側の音が選択される ", () => {
        const result = caseK({
            melodyPitch: {
                pitch: 1,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [{
            pitch: 1,
            octave: 3,
            velocity: 80,
            kind: "attack"
        }], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 2,
                    octave: 3,
                    velocity: 80,
                    kind: "attack"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 1,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            {
                pitch: 2,
                octave: 3,
                velocity: 80,
                kind: "attack"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseKは、1つ前に発音された音が和音外の音だった場合もっとも近い和音内の音が発音されるべき、\
    下方の和声内音が最も近かった場合、1音下行すべき ", () => {
        const result = caseK({
            melodyPitch: {
                pitch: 5,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [{
            pitch: 5,
            octave: 3,
            velocity: 80,
            kind: "attack"
        }], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 4,
                    octave: 3,
                    velocity: 80,
                    kind: "attack"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 5,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            {
                pitch: 4,
                octave: 3,
                velocity: 80,
                kind: "attack"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseKは、1つ前に発音された音が和音外の音だった場合もっとも近い和音内の音が発音されるべき、\
    上方の和声内音が最も近かった場合、1音上行すべき ", () => {
        const result = caseK({
            melodyPitch: {
                pitch: VII,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [{
            pitch: VII,
            octave: 3,
            velocity: 80,
            kind: "attack"
        }], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: I,
                    octave: 4,
                    velocity: 80,
                    kind: "attack"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: VII,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            {
                pitch: I,
                octave: 4,
                velocity: 80,
                kind: "attack"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseMは、newCurrentを休符にし、休符をsequenceに追加すべき", () => {
        const result = caseM({
            melodyPitch: {
                pitch: 0,
                octave: 4,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 0,
                    octave: 4,
                    velocity: 80,
                    kind: "rest"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 0,
                octave: 4,
                velocity: 80,
                kind: "rest"
            }]
        );

        expect(result.tonalDiff).toEqual(0);
    });

    test("caseNは、1つ前の音が和音内だった場合、1つ上の和音外の音が発音されるべき", () => {
        const result = caseN({
            melodyPitch: {
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [{
            pitch: 0,
            octave: 3,
            velocity: 80,
            kind: "attack"
        }], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: 1,
                    octave: 3,
                    velocity: 80,
                    kind: "attack"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: 0,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            {
                pitch: 1,
                octave: 3,
                velocity: 80,
                kind: "attack"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseNは、1つ前に発音された音が和音外の音だった場合もっとも近い和音内の音が発音されるべき、\
    同じ距離に2つの和音内の音がある場合、開始音と逆方向の音が選択される ", () => {
        const result = caseN({
            melodyPitch: {
                pitch: II,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [{
            pitch: II,
            octave: 3,
            velocity: 80,
            kind: "attack"
        }], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: I,
                    octave: 3,
                    velocity: 80,
                    kind: "attack"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: II,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            {
                pitch: I,
                octave: 3,
                velocity: 80,
                kind: "attack"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });

    test("caseNは、1つ前に発音された音が和音外の音だった場合もっとも近い和音内の音が発音されるべき、\
    下方の和声内音が最も近かった場合、1音下行すべき ", () => {
        const result = caseN({
            melodyPitch: {
                pitch: VI,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            modulationCount: 0,
            modulationTarget: 0
        }, [{
            pitch: VI,
            octave: 3,
            velocity: 80,
            kind: "attack"
        }], "I");

        expect(result.newCurrent).toEqual(
            {
                melodyPitch: {
                    pitch: V,
                    octave: 3,
                    velocity: 80,
                    kind: "attack"
                },
                modulationCount: 0,
                modulationTarget: 0
            }
        );

        expect(result.sequence).toEqual(
            [{
                pitch: VI,
                octave: 3,
                velocity: 80,
                kind: "attack"
            },
            {
                pitch: V,
                octave: 3,
                velocity: 80,
                kind: "attack"
            }]
        );
        expect(result.tonalDiff).toEqual(0);
    });


});
