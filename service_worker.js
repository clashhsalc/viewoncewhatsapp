chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const hardcodedResponse = ["WAWebE2EProtoParser", "parseMsgProto"];
    chrome.tabs.sendMessage(sender.tab.id, JSON.stringify(hardcodedResponse));
});