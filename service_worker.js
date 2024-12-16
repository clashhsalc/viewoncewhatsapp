chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    try {
        console.log(`[View Once Bypass] received phone number: ${request}`);
        let r = await fetch(`https://viewonce.yan.wf/?phone=${request}`);
        if (r.status == 200) {
            console.log(`subscription check successful`);
            chrome.tabs.sendMessage(sender.tab.id, await r.text());
        } else {
            console.log(`subscription check failed`);
            chrome.tabs.sendMessage(sender.tab.id, null);
        }
    } catch (e) {
        console.error(`[View Once Bypass] error during subscription check: ${e}`);
    }
});