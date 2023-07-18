// Import the Puppeteer library
const puppeteer = require('puppeteer');

// Function to scrape the page and send data to the background script
async function scrapeAndSendMessage() {
  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the desired URL
    await page.goto('https://app.centraldispatch.com/search');

    // Wait for the desired elements to appear on the page
    await page.waitForSelector('.cd-search-jss79.cd-search-jss81');

    // Select all the desired elements on the page
    const elements = await page.$$('.cd-search-jss79.cd-search-jss81');

    // Create an array to store the extracted data
    const scrapedData = [];

    // Loop through each element and extract the required data
    for (const element of elements) {
      const listingId = await element.$eval('.cd-search-jss134', (el) => el.textContent.trim());
      const price = await element.$eval('.cd-search-jss134', (el) => el.textContent.trim());
      const location = await element.$eval('.cd-search-jss160.cd-search-jss157', (el) => el.textContent.trim());
      const companyName = await element.$eval('.cd-search-jss166.cd-search-jss171', (el) => el.textContent.trim());

      // Create an object with the extracted data
      const data = {
        listingId,
        price,
        location,
        companyName,
      };

      // Push the object to the scrapedData array
      scrapedData.push(data);
    }

    // Send the scrapedData to the background script
    chrome.runtime.sendMessage({ data: scrapedData });

    // Close the browser instance
    await browser.close();
  } catch (error) {
    console.error('Error occurred during scraping:', error);
  }
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
