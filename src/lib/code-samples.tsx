import type { ReactNode } from "react";
import { SpecTip } from "@/components/ui/SpecTip";

/**
 * The SDK samples shown in the "for devs" editor. Hand-tokenised rather than
 * run through a highlighter: there are two short snippets and the design only
 * distinguishes keywords from strings, so a full grammar would be dead weight.
 */
export type Token = { t: string; c?: "kw" | "str" };
export type Line = (Token | ReactNode)[];

const kw = (t: string): Token => ({ t, c: "kw" });
const str = (t: string): Token => ({ t, c: "str" });
const plain = (t: string): Token => ({ t });

/** The placeholder key doubles as a signup nudge. */
const apiKey = (
  // Right-anchored: this sits deep into the line, so a left-anchored panel
  // would run off the editor.
  <SpecTip key="key" align="right" tip="sign up to get a free key, no credit card required">
    <span style={{ color: "#1063B6" }}>&lt;your-api-key&gt;</span>
  </SpecTip>
);

export const pythonSample: Line[] = [
  [kw("from"), plain(" smooth "), kw("import"), plain(" SmoothClient")],
  [],
  [plain("client = SmoothClient(api_key="), str('"'), apiKey, str('"'), plain(")")],
  [],
  [kw("with"), plain(" client.session() "), kw("as"), plain(" session:")],
  [plain("    "), kw("print"), plain("(f"), str('"Live URL: {session.live_url()}"'), plain(")")],
  [],
  [plain("    session.goto("), str('"smooth.sh"'), plain(")")],
  [plain("    task = session.run_task("), str('"find the pricing"'), plain(")")],
  [],
  [plain("    "), kw("print"), plain("(f"), str('"Agent response: {task.output}"'), plain(")")],
];

export const typescriptSample: Line[] = [
  [kw("import"), plain(" { SmoothClient } "), kw("from"), plain(" "), str('"smooth"'), plain(";")],
  [],
  [
    plain("const client = "),
    kw("new"),
    plain(" SmoothClient({ apiKey: "),
    str('"'),
    apiKey,
    str('"'),
    plain(" });"),
  ],
  [],
  [plain("const session = "), kw("await"), plain(" client.session();")],
  [plain("console.log("), str("`Live URL: ${session.live_url()}`"), plain(");")],
  [],
  [kw("await"), plain(" session.goto("), str('"smooth.sh"'), plain(");")],
  [plain("const task = "), kw("await"), plain(" session.run_task("), str('"find the pricing"'), plain(");")],
  [],
  [plain("console.log("), str("`Agent response: ${task.output}`"), plain(");")],
  [kw("await"), plain(" session.close();")],
];

/** Plain-text form for the copy button. */
export const pythonText = `from smooth import SmoothClient

client = SmoothClient(api_key="<your-api-key>")

with client.session() as session:
    print(f"Live URL: {session.live_url()}")

    session.goto("smooth.sh")
    task = session.run_task("find the pricing")

    print(f"Agent response: {task.output}")`;

export const typescriptText = `import { SmoothClient } from "smooth";

const client = new SmoothClient({ apiKey: "<your-api-key>" });

const session = await client.session();
console.log(\`Live URL: \${session.live_url()}\`);

await session.goto("smooth.sh");
const task = await session.run_task("find the pricing");

console.log(\`Agent response: \${task.output}\`);
await session.close();`;
