import { makeMusicPartials } from "../music";

describe("Cases", () => {
    test("makeMusicPartials", () => {
        const g = makeMusicPartials([
            {
                chord: "I",
                group: ["k", "k", "k", "k", "k", "k", "k", "k", "k", "k", "k", "k", "k", "k", "k", "k",]
            }]
        );

        console.log(g);

    });

});

