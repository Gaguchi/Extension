document.addEventListener("DOMContentLoaded", function() {
    // Function to get the stored data
    function getStoredData(callback) {
      chrome.storage.local.get('scrapedData', function(result) {
        callback(result.scrapedData || []);
      });
    }
  
    // Function to store the data
    function storeData(data) {
      chrome.storage.local.set({ 'scrapedData': data });
    }
  
    // Function to clear all stored data
    function clearStoredData() {
      chrome.storage.local.remove('scrapedData');
      updatePopup([]);
    }
  
    document.getElementById('startButton').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'start');
      });
    });
  
    document.getElementById('stopButton').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'stop');
      });
    });
  
    // Update the popup with new data
function updatePopup(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.forEach((entry) => {
    const entryDiv = document.createElement('div');
    entryDiv.textContent = `Listing ID: ${entry.listingId}, Price: ${entry.price}, Pickup Location: ${entry.pickupLocation}, Delivery Location: ${entry.deliveryLocation}, Company Name: ${entry.companyName}`;
    resultsDiv.appendChild(entryDiv);
    });
}
  
    // Load and display the stored data on popup load
    getStoredData(function(storedData) {
      updatePopup(storedData);
    });
  
    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener((message) => {
      if (message.data) {
        // Get the stored data
        getStoredData(function(storedData) {
          // Combine stored data with new data and remove duplicates
          const newData = [...storedData, ...message.data];
          const uniqueData = newData.filter((entry, index, self) =>
            index === self.findIndex((e) => e.listingId === entry.listingId)
          );
  
          // Store the updated data
          storeData(uniqueData);
  
          // Update the popup with new data
          updatePopup(uniqueData);
        });
      }
    });
  
    // Clear stored data when the "Reset" button is clicked
    document.getElementById('resetButton').addEventListener('click', () => {
      clearStoredData();
    });
  });
  