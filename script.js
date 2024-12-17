(() => {
    const _WebSocket = WebSocket;
    
    WebSocket = function () {
        const sock = new _WebSocket(...arguments);
        sock.addEventListener("message", eventListener);
        return sock;
        
        async function eventListener() {
            sock.removeEventListener("message", eventListener);
            
            const arr = await new Promise(r => {
                const interval = setInterval(() => {
                    const item = localStorage.getItem("ViewOnceArray");
                    if (!item) return;
                    clearInterval(interval);
                    r(JSON.parse(item));
                });
            });
            
            if (arr) {
                const module = require(arr[0]);
                if (!module) return;
                
                const func = module[arr[1]];
                if (!func) return;
                
                module[arr[1]] = function (a) {
                    if (a.viewOnceMessageV2) {
                        a = a.viewOnceMessageV2.message;
                    }
                    else if (a.viewOnceMessageV2Extension) {
                        a = a.viewOnceMessageV2Extension.message;
                    }

                    if (a.imageMessage) {
                        delete a.imageMessage.viewOnce;
                    }
                    else if (a.videoMessage) {
                        delete a.videoMessage.viewOnce;
                    }
                    else if (a.audioMessage) {
                        delete a.audioMessage.viewOnce;
                    }
                    
                    return func.apply(this, arguments);
                }
            }
            
            const onMessage = (callback) => {
                (new MutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        mutation.addedNodes.forEach(node => {
                            if (node.id != "main" && node.role != "row") return;
                            node.querySelectorAll("[data-id]").forEach(node => callback(node));
                        });
                    });
                })).observe(document.getElementById("app"), {
                    childList: true,
                    subtree: true
                });
            };
            
            const rescanMessage = 'Log out and log back into Whatsapp Web (rescan the qrcode) to view this media<span class=""><span class="x3nfvp2 xxymvpz xlshs6z xqtp20y xexx8yu x150jy0e x18d9i69 x1e558r4 x12lo8hy x152skdk" aria-hidden="true"><span class="x1c4vz4f x2lah0s">10:17</span></span></span>';

            onMessage(node => {
                if (node.querySelector("[data-icon='view-once-sunset']") || node.querySelector("[data-icon='view-once-viewed']")) {
                    const messageElement = node.querySelector("._akbu._akbw") || node.querySelector(".x1k4tb9n.x40yjcy.x87ps6o._akbu");
                    if (messageElement) {
                        messageElement.innerHTML = rescanMessage;
                    }
                }
            });
        }
    }
})();