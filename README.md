# Star Highlight for Thunderbird

Gives starred (flagged) messages a background color in the message list, so they stand out at a
glance, in both Table View and Cards View.

## What it does

- **Colored rows for starred messages** — in Table View the whole row, in Cards View the card.
- **One color for a light theme, one for a dark theme** — Thunderbird's own theme decides which
  one is used, and switching themes switches the color with it.
- **Optional bold text** for starred messages, read or unread.
- **The selected message keeps Thunderbird's selection color**, so you always see which message
  you are on. Hovering a starred row shades its color slightly.
- **Changes apply at once** — no restart, and disabling or removing the add-on removes the colors
  straight away.
- **Interface in English, Hungarian, German, French, Russian and Japanese** — it follows
  Thunderbird's own language, and uses the same words Thunderbird uses for starred messages in each
  of them.

## Installing

1. Download `star-highlight.xpi` from the latest
   [release](https://github.com/axeri-labs/thunderbird-star-highlight/releases/latest).
2. Thunderbird → *Add-ons and Themes* → gear icon ⚙ → *Install Add-on From File…* → pick the
   downloaded file.
3. Confirm the prompt. Thunderbird asks to give the add-on full access; see
   [How it works](#how-it-works) for why.

Thunderbird checks for new versions by itself and installs them like updates from
addons.thunderbird.net.

**Why it is not on addons.thunderbird.net:** addons.thunderbird.net is currently not accepting new
add-ons that use their own Experiment API, which Star Highlight needs (see
[How it works](#how-it-works)). It will be submitted there once that pause ends.

**From a working copy (developer mode, until the next restart):**

1. Thunderbird → *Add-ons and Themes* → gear icon ⚙ → *Debug Add-ons*
2. On the `about:debugging` page, click **This Thunderbird** in the left sidebar
3. Click **Load Temporary Add-on…** and pick `manifest.json` (not the `.xpi`)
4. After changing a file, click **Reload** next to Star Highlight on the same page

A temporarily loaded add-on is gone after Thunderbird restarts, and its settings can be lost when
it is removed.

Settings: *Add-ons and Themes* → Star Highlight → *Options* tab.

## Building

There is no build step — the shipped code is the source, plain JavaScript, HTML and CSS.
Packaging is a single script:

```bash
./build.sh
```

It writes `_releases/<version>/star-highlight.xpi`, with the version read from `manifest.json`,
and lists what went into it. It needs `zip` and `python3`.

It also records the package in `docs/updates.json`, the update manifest Thunderbird reads through
`update_url`: the release download link and the SHA-256 of the file just built. Thunderbird refuses
an update whose hash does not match, so upload exactly the file from the last build.

## Releasing

1. Raise `version` in `manifest.json` and run `./build.sh`.
2. Create a GitHub release with the tag `v<version>` and attach
   `_releases/<version>/star-highlight.xpi` under that name.
3. Commit `docs/updates.json` and get it onto `main`, which GitHub Pages serves at
   `https://axeri-labs.github.io/thunderbird-star-highlight/updates.json`. Do this after step 2, so
   the update never points at a file that is not there yet.

For addons.thunderbird.net, remove `update_url` from `manifest.json` before building: add-ons
hosted there are updated by addons.thunderbird.net itself. The listing texts are in `docs/atn/`.

## How it works

No MailExtension API can style the message list, so Star Highlight ships a small
[Experiment API](https://webextension-api.thunderbird.net/en/latest/guides/experiments.html)
(`experiments/`). It registers a single user style sheet that applies only to the message list
page (`about:3pane`) and removes it when the add-on is disabled, removed or updated. The
experiment never receives CSS: it gets two `#rrggbb` colors, checked by its schema, and an on/off
flag for bold, and builds the style sheet from those alone.

Because it uses an Experiment, Thunderbird asks at installation to give the add-on full access.
That is how Thunderbird presents every Experiment; Star Highlight does nothing beyond the style
sheet described above.

## Privacy

Star Highlight sends nothing anywhere and reads no messages. Its only permission is `storage`, for
its own settings, which stay in your Thunderbird profile. The only request is Thunderbird's own
update check, which fetches `updates.json` from GitHub Pages.

## Compatibility

Requires Thunderbird 115 or later; the message list it styles was introduced in 115. Tested on
Thunderbird 140 ESR, 153 ESR and 159; the selectors were also checked against the message list
style sheets of 115 and 128.

There is deliberately no upper version limit, so a Thunderbird update never disables the add-on.
If a future Thunderbird changes how the message list is built, the colors may stop showing until
Star Highlight is updated; nothing else is affected.

## Known limitations

- **The selected message is not highlighted** — by design, it keeps Thunderbird's selection
  color.
- **Message list only** — the folder pane, the message header and the Quick Filter bar are not
  colored.
- **Tagged messages** — in Table View Thunderbird colors the text of a tagged message with the tag
  color. A starred and tagged message gets both, and some tag colors may be hard to read on the
  highlight color. Choose a highlight color that suits the tags you use.
- **High contrast mode** — Thunderbird replaces colors with system colors there; the highlight is
  not expected to show and has not been tested.
- **Third-party themes** — whether the light or the dark color is used depends on whether the theme
  tells Thunderbird it is light or dark.
- **Thunderbird 102 and older** use a different message list and are not supported.

## License

[MIT](LICENSE) © axeri-labs
