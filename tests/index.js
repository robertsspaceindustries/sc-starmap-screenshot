import fs from "node:fs";
import path from "node:path";
import screenshot, { closeBrowser } from "../src/index.js";

const solScreenshot = await screenshot(null, "SOL").catch(console.error);
fs.writeFileSync(path.join("tests", "sol.test.png"), solScreenshot);

const earthScreenshot = await screenshot("SOL.PLANETS.EARTH", "SOL").catch(console.error);
fs.writeFileSync(path.join("tests", "earth.test.png"), earthScreenshot);

await closeBrowser();
