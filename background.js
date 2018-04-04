chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  chrome.pageAction.show(tabId);
});