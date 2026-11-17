"use strict";

export const DEFAULTS = {
    enabled:    true,
    lightColor: "#fff3c4",
    darkColor:  "#4a3f1a",
    bold:       false
};

const COLOR = /^#[0-9a-fA-F]{6}$/;

// Anything stored that is not what the settings page writes falls back to the
// default, so the experiment only ever sees values its schema accepts.
export async function loadSettings() {
    const stored = await messenger.storage.local.get(Object.keys(DEFAULTS));
    return {
        enabled:    typeof stored.enabled === "boolean" ? stored.enabled : DEFAULTS.enabled,
        lightColor: COLOR.test(stored.lightColor) ? stored.lightColor : DEFAULTS.lightColor,
        darkColor:  COLOR.test(stored.darkColor)  ? stored.darkColor  : DEFAULTS.darkColor,
        bold:       typeof stored.bold === "boolean" ? stored.bold : DEFAULTS.bold
    };
}
