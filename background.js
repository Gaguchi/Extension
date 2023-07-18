// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.data) {
      const scrapedData = request.data;
      console.log('Scraped data background.js :', scrapedData); // Log the scraped data to the console
  
      // Delay the response to ensure the popup script is ready to receive it
      setTimeout(() => {
        sendResponse({ data: scrapedData });
      }, 500); // Adjust the delay as needed
    }
  
    // Return true to indicate that the sendResponse function will be called asynchronously
    return true;
  });
  