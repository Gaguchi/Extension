console.log("popup is running");

let scrapingActive = false; // Flag to keep track of whether scraping is currently active

// Function to fetch the scraped data from the background script and update the popup.html
function fetchScrapedData() {
  chrome.runtime.sendMessage({ getData: true }, function (response) {
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

// Function to initiate or stop the scraping
function toggleScraping() {
  if (!scrapingActive) {
    // If scraping is not active, initiate the scraping
    chrome.tabs.create({ url: 'https://app.centraldispatch.com/search' }, function (tab) {
      // Wait for the tab to load before initiating the scraping
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          // Remove the listener to avoid multiple calls
          chrome.tabs.onUpdated.removeListener(listener);

          // Send a message to the content script to initiate the scraping
          chrome.tabs.sendMessage(tab.id, { scrapeData: true }, function (response) {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
            }

            // Log a message once the scraping is initiated
            console.log('Scraping initiated...');
          });
        }
      });
    });

    // Update button text and flag
    document.getElementById('scrape-button').textContent = 'Stop Scraping';
    scrapingActive = true;
  } else {
    // If scraping is active, send a message to the content script to stop scraping
    chrome.tabs.query({ url: 'https://app.centraldispatch.com/search' }, function (tabs) {
      if (tabs && tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { stopScraping: true });
      }
    });

    // Update button text and flag
    document.getElementById('scrape-button').textContent = 'Start Scraping';
    scrapingActive = false;
  }
}

// Wait for the DOM to be fully loaded before adding the event listener
document.addEventListener('DOMContentLoaded', function () {
  // Add event listener to the "Scrape Data" button
  document.getElementById('scrape-button').addEventListener('click', function () {
    toggleScraping();
  });

  // Fetch the scraped data from the background script when the popup is opened
  fetchScrapedData();
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.scrapedData) {
    const scrapedData = request.scrapedData;
    console.log('Scraped data popup.js:', scrapedData); // Log the scraped data to the console
    sendResponse({}); // Send an empty response to acknowledge the message
  }
});
