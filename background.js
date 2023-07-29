// background_script.js
let currentData = [];
const audio = new Audio('sound-file.mp3'); // Replace 'notification_sound.mp3' with the actual path to your audio file

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    

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
