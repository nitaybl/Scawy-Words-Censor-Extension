# Scawy-Words-Censor-Extension
Here’s a short README and quick tutorial to install and use the extension.  

## Overview
- Censors the words “j*b” → **j*b** and “empl*yment” → **empl*yment** across webpages.  
- Always censors, but only shows a Perplexity‑styled popup if there are at least 3 total matches.  

## Files
- manifest.json  
- content.js  
- alert.css  
- icon128.png  

## Folder structure
Scawy-Words-Censor-Extension/  
- manifest.json  
- content.js  
- alert.css  
- icon128.png  

## Install (Load Unpacked)
1) Download or create the folder “Scawy-Words-Censor-Extension” with the files above.  
2) Open Chrome and go to chrome://extensions.  
3) Enable Developer Mode (top-right toggle).  
4) Click “Load unpacked” and select the “Scawy-Words-Censor-Extension” folder.  
5) The extension will appear in the list and start working on all pages that match.  

## Using a ZIP release
- If a ZIP was downloaded, unzip it first so it becomes a regular folder (named like “Scawy-Words-Censor-Extension”).  
- Then follow the “Load Unpacked” steps above (Developer Mode → Load unpacked → select the unzipped folder).  

## Verify it works
- Visit any page with the words “j*b” or “empl*yment” in the visible text.  
- Text should display as “j*b” and “empl*yment.”  
- If there are 3 or more total occurrences, a Perplexity‑styled popup appears in the top-right for ~5s, then slides out.  

## Notes
- The popup won’t show if fewer than 3 matches exist, but text will still be censored.  
- If a site dynamically loads content, reloading the page may reapply censorship to newly added text.  

## Troubleshooting
- If nothing happens, ensure Developer Mode is enabled and the extension is loaded without errors.  
- Click the extension’s “Reload” button in chrome://extensions after making file changes.  
- Make sure there are no typos in file names and the folder structure matches exactly.  

## Optional tweaks
- Adjust popup duration in content.js by modifying the timeout (default 5000 ms).  
