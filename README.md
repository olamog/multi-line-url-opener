# Multi Line URL Opener

A Chrome browser extension that lets you highlight multiple lines of text, right-click, and open each line as a URL in a separate new tab. The original tab stays in focus.

## Features

- Adds an **"Open lines as separate tabs"** option to the right-click context menu when text is selected.
- Each non-empty line in the selection is treated as a distinct URL and opened in a new background tab.
- Lines without a protocol prefix (e.g. `example.com`) automatically get `https://` prepended.
- Invalid URLs are silently skipped.
- The tab you're on stays in focus — new tabs open in the background.

## Installation

### Load as an unpacked extension (Developer Mode)

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked**.
5. Select the root directory of this repository (the folder containing `manifest.json`).
6. The extension is now installed. You should see its icon in the toolbar.

## Usage

1. On any web page, highlight text that contains one URL per line, for example:

   ```
   https://github.com
   https://news.ycombinator.com
   https://stackoverflow.com
   ```

2. Right-click the highlighted text.
3. Click **"Open lines as separate tabs"** in the context menu.
4. Each line opens in a new background tab. Your current tab remains in focus.

## Project Structure

```
├── manifest.json   # Extension manifest (Manifest V3)
├── background.js   # Service worker handling context menu and tab creation
├── icons/          # Extension icons (16, 48, 128 px)
└── README.md
```

## Permissions

| Permission    | Reason                                                 |
|---------------|--------------------------------------------------------|
| `contextMenus`| Required to add the right-click menu item.            |
| `activeTab`   | Required to read the selected text on the active tab. |

## Compatibility

- Chrome 88+ (Manifest V3 support required).
- Also works in Chromium-based browsers (Edge, Brave, Arc, etc.) that support Manifest V3.
