# Notes to Reviewer

<!-- ON HOLD (2026-11-17): addons.thunderbird.net is not accepting new add-ons with their own
Experiment API; webext-linter rejects this one with "experiment-not-allowed". Until the pause ends,
the add-on ships through GitHub Releases. Before uploading here, remove update_url from
manifest.json and rebuild. -->

<!-- Paste into the "Notes to Reviewer" field when uploading a version.

Before uploading:
- Run the Thunderbird linter on the built XPI and fix anything it reports:
  npx github:thunderbird/webext-linter _releases/<version>/star-highlight.xpi
- Upload the plain XPI and answer "No" to the source-code question. Nothing is
  transpiled, minified or bundled; a source archive sends the version to the
  source-code-review queue, which rejected Email Translator 1.0.5 for a
  missing lock file it never needed. -->


Star Highlight colors starred (flagged) rows in the message list. No MailExtension API reaches
about:3pane, so it uses one small Experiment (experiments/implementation.js, about 100 lines).

What the Experiment does:

- Registers one user style sheet with nsIStyleSheetService (USER_SHEET), scoped with
  @-moz-document url("about:3pane"), and unregisters it in onShutdown (disable, removal, update).
  It is a user sheet because @-moz-document is not allowed in author sheets.
- It never receives CSS from the WebExtension side. Its two functions are apply({ lightColor,
  darkColor, bold }) and remove(). The schema restricts both colors to ^#[0-9a-fA-F]{6}$, and the
  style sheet is built inside the Experiment from those values only.
- No other privileged access: no window listeners, no file or network access, no message access.

Everything else is plain WebExtension code: a background page that reads the settings from
storage.local and calls the Experiment, and an options page. The only permission is "storage".

There is no build step and no third-party code: the uploaded files are the source.
