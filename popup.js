console.log("popup is running");

// Function to fetch the scraped data from the background script and update the popup.html
function fetchScrapedData() {
  chrome.runtime.sendMessage({ getData: true }, function(response) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    console.log('Response received:', response); // Log the response to the console

    if (response && response.data) {
      const dataList = document.getElementById('data-list');
      dataList.innerHTML = ''; // Clear the existing data list

      response.data.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Listing ID: ${item.listingId}, Price: ${item.price}, Location: ${item.location}, Company Name: ${item.companyName}`;
        dataList.appendChild(listItem);
      });
    } else {
      console.error('Invalid response received from the background script');
    }
  });
}

// Initiate or stop the scraping
function toggleScraping() {
  chrome.storage.sync.get(['scrapingActive', 'scrapeTabId'], function(data) {
    const isScrapingActive = data.scrapingActive;

    if (!isScrapingActive) {
      // Get the current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        
        // Store the tab ID
        chrome.storage.sync.set({ scrapeTabId: currentTab.id, scrapingActive: true });

        // Create an alarm to initiate scraping at regular intervals
        chrome.alarms.create('scrapeAlarm', { periodInMinutes: 0.1667 }); // 10 seconds

        document.getElementById('scrape-button').textContent = 'Stop Scraping';
      });
    } else {
      // Clear the stored tab ID and stop scraping
      chrome.storage.sync.set({ scrapeTabId: null, scrapingActive: false });

      // Clear the alarm
      chrome.alarms.clear('scrapeAlarm');

      document.getElementById('scrape-button').textContent = 'Start Scraping';
    }
  });
}


// Wait for the DOM to be fully loaded before adding the event listener
document.addEventListener('DOMContentLoaded', function() {
  // Fetch the scraped data from the background script when the popup is opened
  fetchScrapedData();
  
  // Add event listener to the "Scrape Data" button
  document.getElementById('scrape-button').addEventListener('click', function() {
    toggleScraping();
  });
});
