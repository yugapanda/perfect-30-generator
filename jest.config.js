/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  "roots": [
    "./"
  ],
  "testMatch": [
    "**/test/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}