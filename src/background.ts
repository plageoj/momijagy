chrome.tabs.onUpdated.addListener(async (id, change, tab) => {
  const win = await chrome.windows.get(tab.windowId);
  if (
    change.status !== 'complete' ||
    !tab.url?.startsWith('https://www.momiji.hiroshima-u.ac.jp/campusweb/') ||
    win.type !== 'popup'
  )
    return;

  const momijiTabs = await chrome.tabs.query({
    url: 'https://www.momiji.hiroshima-u.ac.jp/campusweb/*',
    windowType: 'normal',
  });
  const parent = momijiTabs.pop();

  if (!parent) return;

  void chrome.tabs.move(id, {
    windowId: parent.windowId,
    index: parent.index + 1,
  });

  void chrome.tabs.update(id, {
    active: true,
  });

  void chrome.scripting.executeScript({
    target: { tabId: id, allFrames: true },
    func: () => {
      window.name = document.title;
    },
  });
});
