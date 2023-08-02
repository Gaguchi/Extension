document.getElementById('toggleScrape').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "toggleScraping"});
  });
  