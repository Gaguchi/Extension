// content_script.js

// Send a message to the background script to resize the window
chrome.runtime.sendMessage({action: "resizeWindowToFullScreenSize"});

try {
  var intervalTime = 10000; // Default value

  // Get the user-defined reload interval from storage
  chrome.storage.local.get("reloadInterval", function(result) {
    if (result.reloadInterval) {
      intervalTime = result.reloadInterval * 1000; // Convert to milliseconds
    }

    // Start scraping only after retrieving the reload interval
    if (localStorage.getItem("state")=="started") {
      console.log('Running...');
      if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startScraping);
      } else {
        startScraping();
      }
    }
  });

  var scrapingIntervalId;

}
catch {
  console.log('..')
}

function scrapeData() {
    const elements = document.querySelectorAll('[data-listing-id]');
    const scrapedData = [];
  
    // Loop through each element and extract the required data
    elements.forEach((element) => {
      const listingId = element.getAttribute('data-listing-id');
      const priceElement = element.querySelector(`[data-pc="${listingId}"]`);
      const price = priceElement ? priceElement.textContent.trim() : '';
      const pickupLocationElement = element.querySelector(`[data-orgn-cv="${listingId}"]`);
      const pickupLocation = pickupLocationElement ? pickupLocationElement.textContent.trim() : '';
      const deliveryLocationElement = element.querySelector(`[data-dest-cv="${listingId}"]`);
      const deliveryLocation = deliveryLocationElement ? deliveryLocationElement.textContent.trim() : '';
      const companyNameElement = element.querySelector(`[data-cn-cv="${listingId}"]`);
      const companyName = companyNameElement ? companyNameElement.textContent.trim() : '';
  
      // Create an object with the extracted data
      const data = {
        listingId,
        price,
        pickupLocation,
        deliveryLocation,
        companyName,
      };
  
      // Push the object to the scrapedData array
      scrapedData.push(data);
  
      // Reload the page after sending the data
      //window.location.reload()
    });
  
    // Send the scrapedData to the background script
    console.log({ data: scrapedData });
  
  // Send the scraped data to the background script
  chrome.runtime.sendMessage({ data: scrapedData });
  location.reload();
}

function startScraping() {
  scrapingIntervalId = setInterval(scrapeData, intervalTime);
}

function stopScraping() {
  clearInterval(scrapingIntervalId);
}

if (localStorage.getItem("state")=="started") {
  console.log('Running...');

  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startScraping);
  } else {
    startScraping();
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
  if (message === 'start') {
    console.log('start');
    localStorage.setItem("state", "started");
    startScraping();
  } else if (message === 'stop') {
    console.log('stop');
    localStorage.setItem("state", "stoped");
    stopScraping();
  }
});