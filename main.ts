// Make the AI Judge Laugh: Cat Reviews Its Human
// (make.fun bounty u-motasimfuad-make-the-ai-judge-laugh-cat-reviews-its-42a34990)
//
// Writes one funny single-line one-star review, written in the voice of a
// house cat about its human owner, to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). Deterministic: the same bytes every run.
//
// The line, against the judge's brief:
//   - One-star review by a cat about its human, deadpan review shape.
//   - Specific, recognisable complaint: the laptop keyboard, and a file
//     named FINAL_v2 — every cat owner has lived this.
//   - Unmistakably feline voice: the cat believes sitting on the keyboard
//     is *helping*; the human is measured by cat standards, and the review
//     gives away more about the cat (vindictive, proud, unrepentant) than
//     about the owner.
//   - Tight wording with the sting in the last few words: "and I would do
//     it again" rewards a second read and lands the laugh.
//   - No pun stacking; the humour comes from the cat, not wordplay.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star. I sat on his keyboard to help and he moved me. Twice. " +
  "I have since deleted a file named FINAL_v2 and I would do it again.";

// The kit's gate: UTF-8 text of 1 to 200 characters, not only whitespace,
// a single line. Enforce it here so a bad line can never be written.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters; gate requires 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY + "\n", "utf8");
// Read back and confirm the written file holds exactly the gated entry.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY + "\n") {
  throw new Error("entry.txt does not match the gated entry");
}
console.log(`wrote ${chars.length} characters to ${outPath}`);
