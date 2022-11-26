import { readFileSync } from "fs";
import { generate } from "../music";


test("music", () => {
    const source = readFileSync("/app/converted.txt").toString("utf-8");
    const music = generate(source);
});