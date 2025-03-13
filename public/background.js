let enableCustomSubtitles = false;

chrome.runtime.onInstalled.addListener(() => {
    console.log("Netflix Subtitle Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SEND_DATA') {
      enableCustomSubtitles = message.data;
  
      // You can do something with the data here
  
      // Optionally, send a response back to the sender (React)
      sendResponse({ success: true, receivedData: message.data });
    }
    // Return true to indicate you will send a response asynchronously
    return true;
});

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url?.includes("netflix.com") && enableCustomSubtitles) {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });
    } else {
        alert("Please open Netflix to use this extension.");
    }
});