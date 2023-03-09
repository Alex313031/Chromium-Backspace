#!/bin/bash
# Zip the files needed for this extension, excluding screenshots, promotional
# images, and backup files.

# Constants
readonly ZIP_FILE='go-back-with-backspace.zip'
# The individual files within directories are listed so an error will be
# raised if one is missing.
declare -ar ZIP_CONTENTS=(LICENSE
                          _locales/
                          background.js
                          content_script.js
                          icons/
                          icons/icon16.png
                          icons/icon19.png
                          icons/icon32.png
                          icons/icon38.png
                          icons/icon48.png
                          icons/icon128.png
                          is_editable.js
                          manifest.json
                          pages/
                          pages/common.js
                          pages/feedback.png
                          pages/options.css
                          pages/options.html
                          pages/options.js
                          pages/popup.css
                          pages/popup.html
                          pages/popup.js
                          pages/settings.png
                          readme.txt)

# Remove backup files.
rm -f $(find . -name \*~ -or -name \#\*\#)

if ! mkdir -p icons; then
  echo "Error creating icons/ directory" >&2
  exit 1
fi

if ! cp assets/icon*.png icons/; then
  echo "No icon images found in icons/" >&2
  exit 2
fi

rm -f "${ZIP_FILE}"
if ! zip -r --quiet --must-match "${ZIP_FILE}" "${ZIP_CONTENTS[@]}"; then
  echo "Error zipping required files (${ZIP_CONTENTS[@]})" >&2
  exit 3
fi
