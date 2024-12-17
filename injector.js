const script = document.createElement("script");
script.src = chrome.runtime.getURL("script.js");
script.onload = function () {
    console.log(`[View Once Bypass] script injected`);
};
document.head.appendChild(script);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const isSubscribed = !!request;
    localStorage.setItem("ViewOnceArray", request);
    localStorage.setItem("ViewOnceLanguage", "en");
    chrome.storage.local.set({isSubscribed});
});

const interval = setInterval(() => {
    const isWhatsAppReady = localStorage.getItem("last-wid-md");
    if (!isWhatsAppReady) return;
    clearInterval(interval);
    chrome.runtime.sendMessage("whatsapp_ready");
}, 10);