document.addEventListener("DOMContentLoaded", function () {
  let runningTabId = null; // To store the tab ID where the script is running

  // Function to get the stored data
  function getStoredData(callback) {
    chrome.storage.local.get("scrapedData", function (result) {
      callback(result.scrapedData || []);
    });
  }

  // Function to store the data
  function storeData(data) {
    chrome.storage.local.set({ scrapedData: data });
  }

  // Function to clear all stored data
  function clearStoredData() {
    chrome.storage.local.remove("scrapedData");
    updatePopup([]);
  }

  document.getElementById("startButton").addEventListener("click", () => {
    // Open a new tab with the specified URL
    chrome.tabs.create({ url: "https://app.centraldispatch.com/search" }, (tab) => {
      runningTabId = tab.id; // Save the tab ID
      chrome.storage.local.set({ runningTabId: runningTabId })
      // Send the message to start the script
      chrome.tabs.sendMessage(tab.id, "start");
    });
  });

  document.getElementById("stopButton").addEventListener("click", () => {
    // Check if there is a running tab
    chrome.storage.local.get("runningTabId", function (result) {
        runningTabId=result.runningTabId;
    });
    console.log(runningTabId);
  
    if (runningTabId) {
      // Send the message to stop the script on the running tab
      chrome.tabs.sendMessage(runningTabId, "stop");
      runningTabId = null; // Reset the running tab ID
      chrome.storage.local.remove("runningTabId");
    }
  });

  // Update the popup with new data
  function updatePopup(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    data.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.textContent = `Listing ID: ${entry.listingId}, Price: ${entry.price}, Pickup Location: ${entry.pickupLocation}, Delivery Location: ${entry.deliveryLocation}, Company Name: ${entry.companyName}`;
      resultsDiv.appendChild(entryDiv);
    });
  }

  // Load and display the stored data on popup load
  getStoredData(function (storedData) {
    updatePopup(storedData);
  });

  // Listen for messages from the content script
  chrome.runtime.onMessage.addListener((message) => {
    console.log(message.data)
    if (message.data) {
      // Get the stored data
      getStoredData(function (storedData) {
        // Combine stored data with new data and remove duplicates
        const newData = [...storedData, ...message.data];
        const uniqueData = newData.filter(
          (entry, index, self) =>
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
  document.getElementById("resetButton").addEventListener("click", () => {
    clearStoredData();
  });

  // Get the saved reload interval and populate the input field
  chrome.storage.local.get("reloadInterval", function(result) {
    document.getElementById("reload-interval").value = result.reloadInterval || "";
  });

  // Add event listener for the "Save" button to save the reload interval
  document.getElementById("save-interval").addEventListener("click", function() {
    const reloadInterval = document.getElementById("reload-interval").value;
    chrome.storage.local.set({ reloadInterval: reloadInterval }, function() {
      alert("Reload interval saved!");
    });
  });
});

// Listen for the onUpdated event to send the message after the new tab has loaded