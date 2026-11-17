# ATN listing — English (default)

<!-- ON HOLD (2026-11-17): addons.thunderbird.net is not accepting new add-ons with their own
Experiment API; webext-linter rejects this one with "experiment-not-allowed". Until the pause ends,
the add-on ships through GitHub Releases. Before uploading here, remove update_url from
manifest.json and rebuild. -->

## Name

Star Highlight

## Summary

<!-- ATN limit: 250 characters. This one: 156. -->

Highlights starred (flagged) messages in the Thunderbird message list with a background color, so
they stand out. Separate colors for light and dark themes.

## Description

Starred (flagged) messages are easy to lose in a long message list: the only mark is a small star
in one column. Star Highlight gives the whole row a background color, so you see your starred
messages at a glance.

**What it does**

- Colors starred messages in the message list, in both Table View and Cards View
- One color for a light theme and one for a dark theme; Thunderbird's theme decides which is used
- Optional bold text for starred messages
- The selected message keeps Thunderbird's own selection color, so you always see where you are
- Changes in the settings show up immediately, without a restart
- Disabling or removing the add-on removes the colors at once

**Settings**

Add-ons and Themes → Star Highlight → Options: turn the highlight on or off, pick the two colors
(with a preview of each) and choose bold text.

**Languages**

English, Hungarian, German, French, Russian and Japanese. The add-on follows Thunderbird's
language and uses Thunderbird's own word for starred messages in each.

**Why it asks for full access**

No standard add-on API can change how the message list looks, so Star Highlight uses a small
Experiment API, and Thunderbird asks for full access for every add-on that does. All the
Experiment does is register one style sheet for the message list and remove it again. Star
Highlight reads no messages, sends nothing anywhere, and stores only its own settings.

**Compatibility**

Thunderbird 115 and later.

## Categories

<!-- Pick on ATN; suggested: -->

- Appearance
- Message and News Reading

## Tags

starred, flagged, flag, star, highlight, message list, color

## Support

- Email: info@axerilabs.com
- Site: <!-- repository or support page URL, once public -->

## License

MIT

## Privacy policy

Not required: the add-on collects and transmits no data.
