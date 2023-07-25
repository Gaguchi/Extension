let scrapedData = []; // Store the scraped data

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.data) {
    scrapedData = request.data; // Update the scraped data
    console.log('Scraped data background.js:', scrapedData); // Log the scraped data to the console
  }

  // If the popup requests the data
  if (request.getData) {
    sendResponse({ data: scrapedData });
  }

  // Return true to indicate that the sendResponse function will be called asynchronously
  return true;
});

// Listen for the alarm
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'scrapeAlarm') {
    // Retrieve the stored tab ID
    chrome.storage.sync.get('scrapeTabId', function(data) {
      const tabId = data.scrapeTabId;
      
      if (tabId) {
        // Send a message to the content script to initiate scraping
        chrome.tabs.sendMessage(tabId, { scrapeData: true });
      }
    });
  }
});
