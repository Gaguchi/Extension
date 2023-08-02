// Function to scrape the data (adjust based on what you need)
function scrapeData() {
    // Write your scraping logic here, for example:
    const elements = document.querySelectorAll('.cd-search-jss216');

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

    console.log(data)
    return data;
  })
}
  
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrape") {
      const data = scrapeData();
      sendResponse(data);
    }
  });
  