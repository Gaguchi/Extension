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
        message: `Price: ${newData[0].price}, Pickup: ${newData[0].pickupLocation}, Delivery: ${newData[0].deliveryLocation}`,
        requireInteraction: true // This line makes the notification permanent unless closed by the user
      });

      // Play the notification sound
      audio.play();

      // Update the current data with the latest scraped data
      currentData = message.data;
    }
  }
});


// Listen for the resizeWindowToFullScreenSize action from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "resizeWindowToFullScreenSize") {
    // Get the current window
    chrome.windows.getCurrent({}, (window) => {
      // If the window is in fullscreen mode, set it to normal state first
      if (window.state === 'fullscreen') {
        chrome.windows.update(window.id, { state: 'normal' }, () => {
          // Then resize the window to the screen's dimensions
          chrome.windows.update(window.id, {
            width: window.screen.availWidth,
            height: window.screen.availHeight
          });
        });
      } else {
        // If the window is not in fullscreen mode, directly resize it
        chrome.windows.update(window.id, {
          width: window.screen.availWidth,
          height: window.screen.availHeight
        });
      }
    });
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