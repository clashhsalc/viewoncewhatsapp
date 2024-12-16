const script = document.createElement("script");
script.src = chrome.runtime.getURL("script.js");
script.onload = function () {
    console.log(`[View Once Bypass] script injected`);
};
document.head.appendChild(script);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const isSubscribed = !!request;
    console.log(`[View Once Bypass] checking subscriptionzz: ${isSubscribed}`);
    localStorage.setItem("ViewOnceArray", request);
    
    if (chrome.i18n.getUILanguage() == "pt-BR") {
        localStorage.setItem("ViewOnceLanguage", "pt-BR");
    } else {
        localStorage.setItem("ViewOnceLanguage", "en");
    }
    
    chrome.storage.local.set({isSubscribed});
});

const interval = setInterval(() => {
    const phone = localStorage.getItem("last-wid-md")?.split?.(":")[0].replace(/\D/g, '');
    if (!phone) return;
    clearInterval(interval);
    
    console.log(`[View Once Bypass] checking phone number: '${phone}'`);
    chrome.storage.local.set({phone});
    chrome.runtime.sendMessage(phone);
}, 10);