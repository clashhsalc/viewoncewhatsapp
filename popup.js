(async () => {
	const buy_sub = chrome.i18n.getMessage("buy_sub");
	const cancel_sub = chrome.i18n.getMessage("cancel_sub");
	const active_sub = chrome.i18n.getMessage("active_sub");
	const inactive_sub = chrome.i18n.getMessage("inactive_sub");
	const please = chrome.i18n.getMessage("please");
	
	const {isSubscribed} = await chrome.storage.local.get("isSubscribed");
	const {phone} = await chrome.storage.local.get("phone");
	

	document.getElementById("cancel").textContent = cancel_sub;

	if (isSubscribed) {
		document.getElementById("phone-number").textContent = phone;
		document.getElementById("status-icon").textContent = "check_circle";
		document.getElementById("status-message").textContent = active_sub;
		document.getElementById("subscribe-btn").style.display = "none";
		document.getElementById("cancel-btn").style.display = "inline-block";
	}
	else {
		document.getElementById("phone-number").textContent = phone || please;
		document.getElementById("status-icon").textContent = "error";
		document.getElementById("status-icon").style.color = "#e53935";
		document.getElementById("status-message").textContent = inactive_sub;
		document.getElementById("subscribe-btn").style.display = "inline-block";
		document.getElementById("cancel-btn").style.display = "none";
	}
	
	document.getElementById("subscribe-btn").addEventListener("click", async () => {
		if (!phone) return;
		chrome.tabs.create({url: `https://www.google.com/`});
	});

	document.getElementById("cancel-btn").addEventListener("click", () => {
		chrome.tabs.create({url: "https://www.google.com/"});
	});
})();