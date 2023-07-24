// contentScript.js

let scrapingActive = false; // Flag to keep track of whether scraping is currently active

// Function to scrape the page and send data to the background script
function scrapeAndSendMessage() {
  console.log('Scraping State:', scrapingActive); // Log the scraping state

  if (scrapingActive) {
    // Select all the desired elements on the page
    const elements = document.querySelectorAll('.cd-search-jss216');

    // Create an array to store the extracted data
    const scrapedData = [];

    // Loop through each element and extract the required data
    elements.forEach((element) => {
      const listingId = element.getAttribute('data-listing-id');
      const priceElement = element.querySelector('.cd-search-jss271');
      const price = priceElement ? priceElement.textContent.trim() : '';
      const locationElement = element.querySelector('.cd-search-jss310');
      const location = locationElement ? locationElement.textContent.trim() : '';
      const companyNameElement = element.querySelector('.cd-search-jss460');
      const companyName = companyNameElement ? companyNameElement.textContent.trim() : '';

      // Create an object with the extracted data
      const data = {
        listingId,
        price,
        location,
        companyName,
      };

      // Push the object to the scrapedData array
      scrapedData.push(data);
    });

    // Send the scrapedData to the background script
    chrome.runtime.sendMessage({ data: scrapedData }, function(response) {
      console.log('Response from Background:', response);
    });

    // Schedule the next scraping
    setTimeout(scrapeAndSendMessage, 5000); // Wait for 5 seconds after scraping
  }
}

// Function to handle messages from the popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.toggleScraping !== undefined) {
    // Toggle the scraping state
    const newScrapingState = request.toggleScraping;
    scrapingActive = newScrapingState;

    console.log('Scraping State Changed:', scrapingActive); // Log the state change

    // Send a response to acknowledge the message and provide the current state
    sendResponse({ scrapingActive: newScrapingState });

    // If scraping is active, start the scrapeAndSendMessage process
    if (newScrapingState) {
      scrapeAndSendMessage();
    }
  }

  // Return true to indicate that the sendResponse function will be called asynchronously
  return true;
});
