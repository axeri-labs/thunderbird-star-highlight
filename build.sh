#!/usr/bin/env bash
# Packages the add-on as _releases/<version>/star-highlight.xpi, with the
# version taken from manifest.json. Same zip and exclusions as Email Translator,
# plus the files that only matter in the repository.
#
# It also records the package in docs/updates.json, the update manifest that
# Thunderbird fetches through update_url: the download link of the GitHub
# release for this version and the SHA-256 of the file just built. Every build
# changes that hash, so the file uploaded to the release must be the one from
# the last build.
set -euo pipefail

cd "$(dirname "$0")"

REPO="axeri-labs/thunderbird-star-highlight"

version=$(python3 -c 'import json; print(json.load(open("manifest.json"))["version"])')
out="_releases/$version/star-highlight.xpi"

mkdir -p "_releases/$version"
rm -f "$out"

zip -r -X -q "$out" . \
  --exclude "_work/*" --exclude "_releases/*" --exclude "*.git*" \
  --exclude ".claude/*" --exclude "docs/*" --exclude "*.xpi" --exclude "*.code-workspace" \
  --exclude "build.sh" --exclude "WEBEXT-LINTER-CACHE/*" --exclude "node_modules/*"

hash=$(sha256sum "$out" | cut -d' ' -f1)

python3 - "$REPO" "$version" "$hash" <<'EOF'
import json, os, sys

repo, version, digest = sys.argv[1:]
gecko = json.load(open("manifest.json"))["browser_specific_settings"]["gecko"]
path = "docs/updates.json"

data = json.load(open(path)) if os.path.exists(path) else {"addons": {}}
updates = data["addons"].setdefault(gecko["id"], {"updates": []})["updates"]
# Thunderbird 115 reads "applications", not "browser_specific_settings", here.
entry = {
    "version": version,
    "update_link": f"https://github.com/{repo}/releases/download/v{version}/star-highlight.xpi",
    "update_hash": f"sha256:{digest}",
    "applications": {"gecko": {"strict_min_version": gecko["strict_min_version"]}},
}
updates[:] = [u for u in updates if u.get("version") != version] + [entry]

os.makedirs("docs", exist_ok=True)
with open(path, "w") as f:
    f.write(json.dumps(data, indent=2) + "\n")
EOF

unzip -l "$out"
echo "Built $out"
echo "sha256:$hash (recorded in docs/updates.json)"
