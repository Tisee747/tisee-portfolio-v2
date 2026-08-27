#!/usr/bin/env bash
set -euo pipefail

BASE="https://raw.githubusercontent.com/Tisee747/web-tisee/main/public"
mkdir -p assets/projects

fetch() {
  local src="$1"
  local dest="$2"
  echo "Fetching $dest"
  curl --fail --location --silent --show-error "$BASE/$src" --output "$dest"
}

fetch "images/projects/posyandu_dashboard.png" "assets/projects/posyandu_dashboard.png"
fetch "images/projects/nexevent_mobile_login.jpg" "assets/projects/nexevent_mobile_login.jpg"
fetch "images/projects/nexevent_mobile_dashboard.jpg" "assets/projects/nexevent_mobile_dashboard.jpg"
fetch "images/projects/nexevent_mobile_tiket.jpg" "assets/projects/nexevent_mobile_tiket.jpg"
fetch "resume.pdf" "assets/resume.pdf"

echo "Assets vendored successfully."
