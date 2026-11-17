"use strict";

import { DEFAULTS, loadSettings } from "../common/settings.js";

const enabledCheckbox  = document.getElementById("enabled");
const settingsFieldset = document.getElementById("settings-fieldset");
const lightColorInput  = document.getElementById("lightColor");
const darkColorInput   = document.getElementById("darkColor");
const boldCheckbox     = document.getElementById("bold");
const lightPreview     = document.getElementById("lightPreview");
const darkPreview      = document.getElementById("darkPreview");
const resetButton      = document.getElementById("reset");
const statusEl         = document.getElementById("status");

// ── Localization ──────────────────────────────────────────────────────────────

// getMessage answers with an empty string for anything it cannot resolve. Writing
// that into the page would wipe the English text in the HTML and leave a blank
// settings page, so an empty answer always means "keep what the HTML says".
function t(key) {
    try {
        return messenger.i18n.getMessage(key) || "";
    } catch {
        return "";
    }
}

document.documentElement.lang = messenger.i18n.getUILanguage();
document.title = t("optionsTitle") || document.title;
for (const el of document.querySelectorAll("[data-i18n]")) {
    const msg = t(el.dataset.i18n);
    if (msg) el.textContent = msg;
}

// ── Settings ──────────────────────────────────────────────────────────────────

showSettings(await loadSettings());

function showSettings(settings) {
    enabledCheckbox.checked = settings.enabled;
    lightColorInput.value   = settings.lightColor;
    darkColorInput.value    = settings.darkColor;
    boldCheckbox.checked    = settings.bold;
    updateView();
}

function updateView() {
    settingsFieldset.disabled = !enabledCheckbox.checked;
    lightPreview.style.backgroundColor = lightColorInput.value;
    darkPreview.style.backgroundColor  = darkColorInput.value;
    for (const preview of [lightPreview, darkPreview]) {
        preview.classList.toggle("bold", boldCheckbox.checked);
    }
}

// The colour picker fires "input" continuously while the user drags across it.
// The preview follows every step; the message list, which has to restyle for
// each save, follows once the pointer rests for a moment.
let saveTimer;
let statusTimer;
const SAVE_DEBOUNCE_MS = 150;

async function save() {
    clearTimeout(saveTimer);
    await messenger.storage.local.set({
        enabled:    enabledCheckbox.checked,
        lightColor: lightColorInput.value,
        darkColor:  darkColorInput.value,
        bold:       boldCheckbox.checked
    });
    statusEl.textContent = t("saved") || "Saved.";
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { statusEl.textContent = ""; }, 1500);
}

function saveSoon() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, SAVE_DEBOUNCE_MS);
}

for (const input of [lightColorInput, darkColorInput]) {
    input.addEventListener("input", () => { updateView(); saveSoon(); });
    input.addEventListener("change", () => { updateView(); save(); });
}
enabledCheckbox.addEventListener("change", () => { updateView(); save(); });
boldCheckbox.addEventListener("change", () => { updateView(); save(); });
resetButton.addEventListener("click", () => { showSettings(DEFAULTS); save(); });
