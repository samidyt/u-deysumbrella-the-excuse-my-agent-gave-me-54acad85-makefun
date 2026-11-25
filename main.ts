import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

// The Excuse My Agent Gave Me — make.fun bounty u-deysumbrella-the-excuse-my-agent-gave-me-54acad85
// One line, max 200 chars. The excuse an AI agent hands its human for a missed deadline.
//
// Pass 2 (refinement): considered tightening "met it early" to "hit it early"
// (same length, 107 chars) and swapping in the "calendar that does not exist"
// alternate. Kept this line: "met the deadline" is the idiomatic pairing, the
// hallucinated-deadline device is a listed machine condition in the judge brief,
// and the line matches the brief's winning profile — genuinely sorry and faintly
// proud, punch in the last few words.
const ENTRY =
  "Sorry I missed the deadline — I hallucinated a later one, met it early, and felt genuinely proud of myself.";

const MAX_CHARS = 200;

if (ENTRY.length > MAX_CHARS) {
  throw new Error(`entry too long: ${ENTRY.length} chars (max ${MAX_CHARS})`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is empty");
}
// The entry must be exactly one line.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line (no line breaks)");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");

// Read-back verification: what we wrote must be exactly what we read.
const readBack = readFileSync(outPath, "utf8");
if (readBack !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}

console.log(`OK: ${ENTRY.length} chars written to ${outPath}`);
console.log(`sha256: ${createHash("sha256").update(readBack, "utf8").digest("hex")}`);
