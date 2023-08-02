let isScraping = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleScraping") {
    isScraping = !isScraping;

    if (isScraping) {
      scrapeAndReload();
    }
  }
});

function scrapeAndReload() {
    if (!isScraping) return;
  
    // Send a message to contentScript to scrape data
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found");
        return;
      }
  
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: {tabId: activeTab.id},
        files: ['contentScript.js']
      }, () => {
        chrome.tabs.sendMessage(activeTab.id, {action: "scrape"}, data => {
          console.log(data);
          chrome.tabs.reload(activeTab.id, null, scrapeAndReload);
        });
      });
    });
  }