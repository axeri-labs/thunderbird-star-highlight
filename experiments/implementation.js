"use strict";

// The only privileged part of Star Highlight. No MailExtension API reaches the
// message list (about:3pane), so this registers one user style sheet with the
// style sheet service, scoped to about:3pane by @-moz-document. The service
// restyles every open document when a sheet is registered or unregistered, so
// a change shows up immediately, without a restart.
//
// The caller never hands over CSS: it passes two colours, which the schema
// checks against #rrggbb, and a flag. The sheet is built here from those alone.
//
// It is a user sheet because @-moz-document is only allowed outside author
// sheets. User declarations lose to the page's own unless they are !important,
// hence !important on every one of them.

const sss = Cc["@mozilla.org/content/style-sheet-service;1"]
    .getService(Ci.nsIStyleSheetService);

// Every row of the thread pane carries its message state as space-separated
// words in data-properties, and the selection as the "selected" class — the
// same from Thunderbird 115 on. The selected row keeps its native colour so it
// stays obvious which message the user is on.
const FLAGGED = '#threadTree tr[data-properties~="flagged"]';
const UNSELECTED = `${FLAGGED}:not(.selected)`;

function highlightRules(color) {
    const hover = `color-mix(in srgb, ${color} 85%, currentColor)`;
    // Table view: the cells are painted as well as the row, so that nothing
    // drawn on a cell can cover the row colour and leave it white.
    // Card view: the card is .card-container from 128 on, .thread-card-container
    // in 115; the row around it is only padding and stays untouched.
    return `
        ${UNSELECTED}[is="thread-row"],
        ${UNSELECTED}[is="thread-row"] > td,
        ${UNSELECTED}[is="thread-card"] :is(.card-container, .thread-card-container) {
            background-color: ${color} !important;
        }
        ${UNSELECTED}[is="thread-row"]:hover,
        ${UNSELECTED}[is="thread-row"]:hover > td,
        ${UNSELECTED}[is="thread-card"]:hover :is(.card-container, .thread-card-container) {
            background-color: ${hover} !important;
        }
    `;
}

function buildSheet({ lightColor, darkColor, bold }) {
    const boldRules = bold ? `
        ${FLAGGED}[is="thread-row"] > td,
        ${FLAGGED}[is="thread-card"] :is(.subject, .sender) {
            font-weight: bold !important;
        }
    ` : "";
    return `
        @-moz-document url("about:3pane") {
            ${highlightRules(lightColor)}
            @media (prefers-color-scheme: dark) {
                ${highlightRules(darkColor)}
            }
            ${boldRules}
        }
    `;
}

var starHighlight = class extends ExtensionCommon.ExtensionAPI {
    sheetUri = null;

    register(css) {
        const uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent(css));
        if (this.sheetUri?.equals(uri)) return;
        // The new sheet goes in before the old one comes out, so the list never
        // shows a frame without any highlight in between.
        sss.loadAndRegisterSheet(uri, sss.USER_SHEET);
        this.unregister();
        this.sheetUri = uri;
    }

    unregister() {
        if (this.sheetUri && sss.sheetRegistered(this.sheetUri, sss.USER_SHEET)) {
            sss.unregisterSheet(this.sheetUri, sss.USER_SHEET);
        }
        this.sheetUri = null;
    }

    // Disabling, removing or updating the add-on. When the whole application
    // quits, the sheet goes away with it anyway.
    onShutdown(isAppShutdown) {
        if (isAppShutdown) return;
        this.unregister();
    }

    getAPI(context) {
        return {
            starHighlight: {
                apply: async (style) => {
                    this.register(buildSheet(style));
                },
                remove: async () => {
                    this.unregister();
                },
            },
        };
    }
};
