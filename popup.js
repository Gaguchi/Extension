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

// Function to toggle the scraping state
function toggleScraping() {
  scrapingActive = !scrapingActive;

  // Send a message to the content script to toggle the scraping state
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    chrome.tabs.sendMessage(currentTab.id, { toggleScraping: scrapingActive }, function (response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      // Update the button text based on the response
      const scrapeButton = document.getElementById('scrape-button');
      scrapeButton.textContent = response.scrapingActive ? 'Stop Scraping' : 'Start Scraping';
    });
  });
}

// Function to handle messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.scrapingState !== undefined) {
    // Update the local variable with the new state
    scrapingActive = request.scrapingState;

    // Update the button text based on the new state
    const scrapeButton = document.getElementById('scrape-button');
    scrapeButton.textContent = scrapingActive ? 'Stop Scraping' : 'Start Scraping';

    // Acknowledge the message
    sendResponse({ message: 'Scraping state updated successfully' });
  }
});

// Wait for the DOM to be fully loaded before adding the event listener
document.addEventListener('DOMContentLoaded', function () {
  // Fetch the scraped data from the background script when the popup is opened
  fetchScrapedData();

  // Add event listener to the "Scrape Data" button
  const scrapeButton = document.getElementById('scrape-button');
  scrapeButton.addEventListener('click', function () {
    toggleScraping();
  });

  // Retrieve the scraping state from storage and update the button text accordingly
  chrome.storage.local.get('scrapingActive', function (data) {
    scrapingActive = data.scrapingActive || false;
    scrapeButton.textContent = scrapingActive ? 'Stop Scraping' : 'Start Scraping';
  });
});
