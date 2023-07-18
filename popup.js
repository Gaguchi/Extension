console.log("popup is running")
// Fetch the scraped data from the background script
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
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.scrapedData) {
      const scrapedData = request.scrapedData;
      console.log('Scraped data popup.js:', scrapedData); // Log the scraped data to the console
      sendResponse({}); // Send an empty response to acknowledge the message
    }
  });
  