import puppeteer from "puppeteer";
import config from "../config.js";

const browser = await puppeteer.launch({
	headless: "new",
	args: ["--no-sandbox"],
	protocolTimeout: 180_000 * 2, // Timeout setting for individual protocol (CDP) calls. (https://pptr.dev/api/puppeteer.browserconnectoptions#properties)
});

function queryParams(locationCode, systemCode, camera) {
	let params = ""; // URLSearchParams URL encodes `camera`, Starmap doesn't like that.

	if (locationCode) params += `location=${locationCode}`;

	if (systemCode && locationCode) params += `&system=${systemCode}`;
	else if (systemCode && !locationCode) params += `location=${systemCode}`;

	params += (systemCode || locationCode ? "&" : "") + `camera=${camera}`;

	return params;
}

export async function closeBrowser() {
	await browser.close();
}

export default async function screenshot(locationCode, systemCode) {
	const type = systemCode && !locationCode ? "system" : "object";

	// Bring variable outside the try-catch scope so it can be closed at the end
	let page;

	try {
		page = await browser.newPage();

		await page.setJavaScriptEnabled(true);
		await page.setViewport({ height: config.height, width: config.width, deviceScaleFactor: config.scale });
		await page.goto(
			"https://robertsspaceindustries.com/starmap?" +
				queryParams(locationCode, systemCode, `${type === "system" ? "5.73" : "60"},0,${config[type]},0,0`),
		);

		// Set some local storage items
		await page.evaluate(() => {
			localStorage.setItem("skipInfo", true);
			localStorage.setItem("skipAcknowledgment", true);
		});

		// Remove certain elements once created
		page.evaluate(() => {
			function waitForSelector(selector) {
				return new Promise((resolve) => {
					if (document.querySelector(selector)) {
						return resolve(document.querySelector(selector));
					}

					const observer = new MutationObserver((mutations) => {
						if (document.querySelector(selector)) {
							observer.disconnect();
							resolve(document.querySelector(selector));
						}
					});

					observer.observe(document.body, {
						childList: true,
						subtree: true,
					});
				});
			}

			waitForSelector("#cookiebanner").then((node) => node.remove());
			waitForSelector("#sm-header-region").then((node) => node.remove());
			waitForSelector("#sm-controls-region").then((node) => node.remove());
		});

		await page.waitForNetworkIdle();
		await page.waitForSelector("button.launch[style='opacity: 1; display: block;']"); // Wait for the button to be completely visible, crashes otherwise
		await page.click("button.launch");
		await new Promise((r) => setTimeout(r, 8_000)); // Give the page time to get into a 'good' state

		if (!page) return;

		const screenshot = await page.screenshot({ type: "png" });

		return screenshot;
	} catch (error) {
		throw error;
	} finally {
		if (page) {
			// Close the page as it won't be used anymore, catch the error and do nothing with it
			page.close().catch(() => {});
		}
	}
}
