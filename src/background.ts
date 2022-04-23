chrome.windows.onCreated.addListener(async (win) => {
  if (win.id && win.type === 'popup') {
    const windowId = win.id;
    const tabs = await chrome.tabs.query({ windowId });

    const parent = (await chrome.windows.getAll()).find(
      ({ type }) => type === 'normal',
    );

    const openerIndex = await (async () => {
      const momijiTabs = await chrome.tabs.query({
        url: '*://www.momiji.hiroshima-u.ac.jp/*',
      });
      if (!momijiTabs) return -1;
      const opener = momijiTabs.pop();
      if (!opener) return -1;
      return opener.index + 1;
    })();

    if (!parent || !parent.id) return;

    for (const tab of tabs) {
      if (!tab.id) continue;
      chrome.tabs.move(tab.id, {
        windowId: parent.id,
        index: openerIndex,
      });

      chrome.tabs.update(tab.id, {
        active: true,
      });

      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        func: () => {
          window.name = document.title;
        },
      });
    }
  }
});
