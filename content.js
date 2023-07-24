// content.js

// Function to inject the contentScript.js file into the page
function injectContentScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('contentScript.js');
    script.onload = function () {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
  }
  
  // Inject the content script into the page
  injectContentScript();
  