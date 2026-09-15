import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

await mkdir("artifacts", { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const runtimeErrors = [];

page.on("pageerror", (error) => runtimeErrors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") runtimeErrors.push(message.text());
});

try {
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.locator("button.start").click();
  await page.locator(".scene canvas").first().waitFor({ state: "visible" });

  assert.equal(
    await page.locator(".scene").getAttribute("data-character-rendering"),
    "procedural-mist",
    "duelists should use procedural mist rendering",
  );
  assert.equal(
    await page.locator(".scene canvas").first().evaluate((canvas) =>
      Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")),
    ),
    true,
    "Three.js should acquire a WebGL context",
  );

  await page.keyboard.down("w");
  await page.waitForTimeout(450);
  assert.match(
    await page.locator(".execution-hint").innerText(),
    /release W to commit/i,
    "holding W should keep Aim active",
  );
  assert.match(
    await page.locator(".action.selected").innerText(),
    /Aim/i,
    "browser key repeat must not commit or change the held action",
  );

  await page.screenshot({ path: "artifacts/mist-hold.png", fullPage: true });

  await page.keyboard.up("w");
  await page.waitForTimeout(120);
  assert.equal(
    (await page.locator(".ammo span").innerText()).trim(),
    "5 / 6",
    "releasing W should commit exactly one shot",
  );

  await page.keyboard.press("Escape");
  await page.locator(".pause-panel").waitFor({ state: "visible" });
  assert.equal(runtimeErrors.length, 0, runtimeErrors.join("\n"));
} catch (error) {
  await page.screenshot({ path: "artifacts/browser-failure.png", fullPage: true });
  throw error;
} finally {
  await browser.close();
}
