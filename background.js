// background_script.js
let currentData = [];
const audio = new Audio('sound-file.mp3'); // Replace 'notification_sound.mp3' with the actual path to your audio file

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);

  if (message.data) {
    // Compare the new data with the previous data
    const newData = message.data.filter((item) => !currentData.some((el) => el.listingId === item.listingId));

    if (newData.length > 0) {
      // Notify about new entries
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'notification_icon.png',
        title: 'New Entry Found!',
        message: `New entry with Listing ID: ${newData[0].listingId}`,
      });

      // Play the notification sound
      audio.play();

      // Update the current data with the latest scraped data
      currentData = message.data;
    }
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    var runningTabId;
    chrome.storage.local.get("runningTabId", function (result) {
      runningTabId =result.runningTabId ;
      // Check if the URL of the updated tab contains the desired part
    if (tab.url.includes("app.centraldispatch.com/search") && tabId === runningTabId) {
      // Send the message to the content script of the new tab

      chrome.tabs.executeScript(tabId, { file: 'content_script.js' })
      switchToTab(tabId);
      chrome.tabs.sendMessage(tabId, "start");
    }
    });

    
  }
});

function switchToTab(tabId) {
  chrome.tabs.update(tabId, { active: true }, (updatedTab) => {
    // The active tab has been switched to the specified tabId.
    console.log(`Switched to tab with ID: ${tabId}`);
  });
}