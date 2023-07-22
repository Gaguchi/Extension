// Function to scrape the page and send data to the background script
function scrapeAndSendMessage() {
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
  chrome.runtime.sendMessage({ data: scrapedData });
}

// Reload the page after it has been initially loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    scrapeAndSendMessage();
  }, 5000); // Wait for 5 seconds after the page has loaded
});

// Schedule the reload and scrape process every 10 seconds
setInterval(() => {
  location.reload();
  setTimeout(() => {
    scrapeAndSendMessage();
  }, 5000); // Wait for 5 seconds after the page has reloaded
}, 10000);
