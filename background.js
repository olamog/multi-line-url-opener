// Create the context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-lines-as-tabs",
    title: "Open lines as separate tabs",
    contexts: ["selection"],
  });
});

// Handle the context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "open-lines-as-tabs" || !tab?.id) {
    return;
  }

  // info.selectionText strips newlines, so inject a script to get the
  // actual selection which preserves line breaks.
  const [result] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString(),
  });

  const selectionText = result?.result;
  if (!selectionText) {
    return;
  }

  const lines = selectionText.split(/\r?\n/).filter((line) => line.trim());

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
