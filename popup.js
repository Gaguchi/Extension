console.log("popup.js: Script started");

function fetchScrapedData() {
  console.log("popup.js: Fetching scraped data");
  chrome.runtime.sendMessage({ getData: true }, function(response) {
    if (chrome.runtime.lastError) {
      console.error("popup.js:", chrome.runtime.lastError);
      return;
    }

    console.log('popup.js: Response received:', response);

    if (response && response.data) {
      const dataList = document.getElementById('data-list');
      dataList.innerHTML = '';
      
      response.data.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Listing ID: ${item.listingId}, Price: ${item.price}, Location: ${item.location}, Company Name: ${item.companyName}`;
        dataList.appendChild(listItem);
      });
    } else {
      console.error('popup.js: Invalid response received from the background script');
    }
  });
}

function toggleScraping() {
  console.log("popup.js: Toggling scraping");
  chrome.storage.sync.get(['scrapingActive', 'scrapeTabId'], function(data) {
    const isScrapingActive = data.scrapingActive;

    if (!isScrapingActive) {
      if (!data.scrapeTabId) {
        console.log("popup.js: No scrapeTabId found, querying for active tab");
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          if (!tabs || !tabs.length) {
            console.error("popup.js: No active tab found");
            return;
          }

          const currentTab = tabs[0];
          console.log("popup.js: Setting scrapeTabId to:", currentTab.id);

          chrome.storage.sync.set({ scrapeTabId: currentTab.id, scrapingActive: true }, function() {
            if (chrome.runtime.lastError) {
              console.error("popup.js: Error while storing scrapeTabId:", chrome.runtime.lastError);
              return;
            }
            
            console.log("popup.js: scrapeTabId stored successfully");
            chrome.alarms.create('scrapeAlarm', { periodInMinutes: 1 });
            chrome.runtime.sendMessage({ startScraping: true });
            document.getElementById('scrape-button').textContent = 'Stop Scraping';
          });
        });
      } else {
        console.log("popup.js: Found scrapeTabId, continuing scraping");
        chrome.storage.sync.set({ scrapingActive: true });
        chrome.alarms.create('scrapeAlarm', { periodInMinutes: 1 });
        document.getElementById('scrape-button').textContent = 'Stop Scraping';
      }
    } else {
      console.log("popup.js: Stopping scraping");
      chrome.storage.sync.set({ scrapeTabId: null, scrapingActive: false });
      document.getElementById('scrape-button').textContent = 'Start Scraping';
      chrome.alarms.clear('scrapeAlarm');
      document.getElementById('scrape-button').textContent = 'Start Scraping';
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  console.log("popup.js: DOM loaded");
  fetchScrapedData();
  setButtonState();
  document.getElementById('scrape-button').addEventListener('click', function() {
    toggleScraping();
  });
});

// New function to set the button state on popup load
function setButtonState() {
  chrome.storage.sync.get(['scrapingActive'], function(data) {
    const isScrapingActive = data.scrapingActive;
    document.getElementById('scrape-button').textContent = isScrapingActive ? 'Stop Scraping' : 'Start Scraping';
  });
}
