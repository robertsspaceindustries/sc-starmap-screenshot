#!/usr/bin/env node

import fs from "node:fs";
import { program } from "commander";
import screenshot, { closeBrowser } from "./index.js";
import path from "node:path";

program
	.option("-l <code>", "location param")
	.requiredOption("-s <code>", "system param")
	.requiredOption("-o <path>", "relative output path (.png)")
	.option("-z <num>", "zoom")
	.option("-r <num>", "rotation");
program.parse();

const options = program.opts();

const buffer = await screenshot(options.l, options.s, options.z, options.r).catch(console.error);
fs.writeFileSync(path.resolve(options.o), buffer);

await closeBrowser();
