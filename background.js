// Create the context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-lines-as-tabs",
    title: "Open lines as separate tabs",
    contexts: ["selection"],
  });
});

// Handle the context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "open-lines-as-tabs" || !info.selectionText) {
    return;
  }

  const lines = info.selectionText.split(/\r?\n/).filter((line) => line.trim());

  for (const line of lines) {
    let url = line.trim();
    if (!url) {
      continue;
    }

    // Add https:// if no protocol is specified
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) {
      url = "https://" + url;
    }

    // Validate that it looks like a plausible URL
    try {
      new URL(url);
    } catch {
      continue;
    }

    chrome.tabs.create({ url, active: false });
  }
});
