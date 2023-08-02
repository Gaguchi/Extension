console.log("background.js: Script started");

let scrapedData = [];
let scrapingActive = false;  // New state to track scraping
let scrapingURL = null;  // Store the URL of the tab we are scraping
console.log('background.js: "scrapingActive" status:',scrapingActive)


function shouldContinueScraping() {
  return scrapingActive;
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("background.js: Received message", request);

  if (request.startScraping !== undefined) {
      scrapingActive = request.startScraping;
      handleScrapingStart();
      return true;
  }

  if (request.data) {
    scrapedData = request.data;
    console.log('background.js: Updated scraped data', scrapedData);
  }

  if (request.getData) {
    sendResponse({ data: scrapedData });
  }
  
  
  if (request.shouldContinueScraping !== undefined) {
    sendResponse({ continue: shouldContinueScraping() });
  }

  return true;
});

function handleScrapingStart() {
  if (scrapingActive) {
    chrome.storage.sync.get('scrapeTabId', function(data) {
        const tabId = data.scrapeTabId;
        if (tabId) {
            sendMessageToTab(tabId);
        }
    });
  } else {
    console.log('background.js: Scraping has been stopped.');
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("background.js: Received message", request);

  if (request.startScraping !== undefined) {
      scrapingActive = request.startScraping;
      if(scrapingActive && sender.tab) {
          scrapingURL = sender.tab.url;  // Store the URL when scraping starts
      }
      handleScrapingStart();
      return true;
  }

  if (request.data) {
    scrapedData = request.data;
    console.log('background.js: Updated scraped data', scrapedData);
  }

  if (request.getData) {
    console.log("background.js: Sending scraped data in response");
    sendResponse({ data: scrapedData });
  }

  return true;
});

// Check if our content script is loaded in the tab
function isContentScriptLoaded(tabId, callback) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: function() {
      return !!window.myContentScriptLoaded;
    }
  }, (results) => {
    if (chrome.runtime.lastError) {
      callback(false);
      return;
    }
    callback(results && results[0] && results[0].result);
  });
}

// Inject our content script into the tab
function injectContentScript(tabId, callback) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['contentscript.js']
  }, () => {
    if (chrome.runtime.lastError) {
      console.error('background.js: Error injecting content script:', chrome.runtime.lastError);
      callback(false);
    } else {
      callback(true);
    }
  });
}

// Listen for the alarm
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'scrapeAlarm') {
    // Retrieve the stored tab ID
    chrome.storage.sync.get('scrapeTabId', function(data) {
      const tabId = data.scrapeTabId;
      
      if(!tabId) {
          console.error('background.js: No tabId found in storage.');
          return;
      }

      chrome.tabs.get(tabId, function(tab) {
        if (chrome.runtime.lastError) {
          console.error('background.js: Error getting tab:', chrome.runtime.lastError);
          return;
        }

        if (tab && tab.status === "complete") {
          isContentScriptLoaded(tabId, isLoaded => {
            if (!isLoaded) {
              injectContentScript(tabId, success => {
                if (!success) return; 
                sendMessageToTab(tabId);
              });
            } else {
              sendMessageToTab(tabId);
            }
          });
        } else if (tab) {
            console.log('background.js: Tab is not in "complete" status:', tab.status);
        } else {
            console.error('background.js: Tab with ID', tabId, 'does not exist.');
        }
      });
    });
  }
});

// Moved the message sending code to a separate function
function sendMessageToTab(tabId) {
  console.log('background.js: Sending message to scrape data to tab:', tabId);
  chrome.tabs.sendMessage(tabId, { scrapeData: true }, function(response) {
    if (chrome.runtime.lastError) {
      console.error('background.js: Error sending message to tab:', chrome.runtime.lastError.message);
    } else {
      console.log('background.js: Message sent successfully, response:', response);
    }
  });
}


// Listen for tab updates to check for the reload of our scraping tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url === scrapingURL) {
      // The tab with our target URL has finished loading. Check if our content script is loaded and if not, inject it.
      isContentScriptLoaded(tabId, isLoaded => {
          if (!isLoaded) {
              injectContentScript(tabId, success => {
                  if (!success) return; 
                  sendMessageToTab(tabId);
              });
          } else {
              sendMessageToTab(tabId);
          }
      });
  }
});
