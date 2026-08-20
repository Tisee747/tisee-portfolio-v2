#!/usr/bin/env bash
set -euo pipefail

mkdir -p assets/projects

curl -fsSL "https://web-tisee.vercel.app/resume.pdf" -o "assets/resume.pdf"
curl -fsSL "https://web-tisee.vercel.app/images/projects/posyandu_dashboard.png" -o "assets/projects/posyandu_dashboard.png"
curl -fsSL "https://web-tisee.vercel.app/images/projects/nexevent_mobile_login.jpg" -o "assets/projects/nexevent_mobile_login.jpg"
curl -fsSL "https://web-tisee.vercel.app/images/projects/nexevent_mobile_dashboard.jpg" -o "assets/projects/nexevent_mobile_dashboard.jpg"
curl -fsSL "https://web-tisee.vercel.app/images/projects/nexevent_mobile_tiket.jpg" -o "assets/projects/nexevent_mobile_tiket.jpg"

echo "Assets vendored successfully."