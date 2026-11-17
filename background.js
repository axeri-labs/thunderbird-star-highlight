"use strict";

import { DEFAULTS, loadSettings } from "./common/settings.js";

async function applySettings() {
    const { enabled, lightColor, darkColor, bold } = await loadSettings();
    if (enabled) {
        await messenger.starHighlight.apply({ lightColor, darkColor, bold });
    } else {
        await messenger.starHighlight.remove();
    }
}

// Dragging across the colour picker saves many times a second. Chaining the
// updates makes them reach the experiment in the order they were made, so the
// list always ends up with the last colour picked, not whichever call won a race.
let pending = Promise.resolve();

function refresh() {
    pending = pending.then(applySettings).catch((e) => {
        console.error("Star Highlight: could not apply the highlight", e);
    });
}

messenger.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && Object.keys(changes).some((key) => key in DEFAULTS)) refresh();
});

refresh();
