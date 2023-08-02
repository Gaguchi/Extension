// Function to scrape the page and send data to the background script
function scrapeAndSendMessage() {
  console.log("contentscript.js: Starting scraping...");

  // Select all the desired elements on the page
  const elements = document.querySelectorAll('.cd-search-jss216');
  console.log(`contentscript.js: Found ${elements.length} matching elements for scraping.`);

  // Create an array to store the extracted data
  const scrapedData = [];

  // Loop through each element and extract the required data
  elements.forEach((element, index) => {
    const listingId = element.getAttribute('data-listing-id');
    const priceElement = element.querySelector('.cd-search-jss271');
    const price = priceElement ? priceElement.textContent.trim() : 'Price not found';
    const locationElement = element.querySelector('.cd-search-jss310');
    const location = locationElement ? locationElement.textContent.trim() : 'Location not found';
    const companyNameElement = element.querySelector('.cd-search-jss460');
    const companyName = companyNameElement ? companyNameElement.textContent.trim() : 'Company name not found';

    console.log(`contentscript.js: Extracted data from element ${index} - ListingID: ${listingId}, Price: ${price}, Location: ${location}, Company: ${companyName}`);

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
  console.log("contentscript.js: Sending scraped data to background script...");
  chrome.runtime.sendMessage({ data: scrapedData }, response => {
    if(chrome.runtime.lastError) {
      console.error('contentscript.js: Error sending message:', chrome.runtime.lastError);
    } else {
      console.log('contentscript.js: Successfully sent scraped data. Background response:', response);
    }
  });

  // Reload the page after sending the data
  console.log("contentscript.js: Reloading page...");
  window.location.reload();
}

// If you want to scrape every 10 seconds
function initiateScraping() {
  console.log("contentscript.js: Initiating scraping sequence...");
  scrapeAndSendMessage();

  // Introduce delay after scraping and then check if should continue
  setTimeout(function() {
      chrome.runtime.sendMessage({ shouldContinueScraping: true }, function(response) {
          if (response && response.continue) {
              console.log("contentscript.js: Reloading page for next scraping cycle...");
              location.reload();
          }
      });
  }, 5000);  // 10 seconds delay
}

// Listen for a message from the background script to start scraping
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.scrapeData) {
        console.log("contentscript.js: Received scrapeData message. Starting scraping...");
        initiateScraping();
        sendResponse({ data: 'Data scraped successfully' });
    } else {
        console.log("contentscript.js: Message received but it's not a scrapeData command.", request);
    }
});

