# View Once Bypass extension - Paywalls Removed
[original chrome extension](https://chromewebstore.google.com/detail/view-once-photos-bypass-f/ceklhmaklgibacknihbkcookmfiddkeb?hl=en) 

![image](https://github.com/user-attachments/assets/1be70d54-c7f3-4ec9-bb0b-3ce06ad253de)
  
Note: You need to log out and log back in from WhatsApp Web (rescan the QR code) every time you want to access a new view once media.  With recent updates, the chances of recovering previously opened media are very low. It is recommended that you do not open the media on your phone for the extension to work properly.  

### Installation:
1. [Download the source zip](https://github.com/clashhsalc/viewoncewhatsapp/archive/refs/tags/release.zip) and extract it to a folder.
2. Load the unpacked extension:
    - Enable developer mode on your browser's extensions page.
    - Load the folder containing the .js files.


<br/><br/>

## DIY method using the original extension:
1. Get the extension link.   
2. Get a decompiled version of the extension on this site: https://extensiondock.com/en
    - [decompiled Dec 2024 extension archive for reference](https://drive.google.com/file/d/119zyUDCNLS5-hcgf4oDa-aOCzsLU1mfZ/view) 
3. Extract it, navigate to ```service_worker.js``` and locate this part of the code:        
    ```javascript 
    let r = await fetch(`https://2qb6jslkzncor6z7rovl3kgy6y0xapbu.lambda-url.us-east-1.on.aws/?phone=${request}`);
    ```

    - Explanation: This link checks if your phone number is in the subscribers list or not and if it is, sends a response ```["WAWebE2EProtoParser", "parseMsgProto"]```   

4. Change it to:  
    ```javascript 
    let r = await fetch(`https://viewonce.yan.wf/?phone=${request}`);
    ```
    - This link sends the same hardcoded response no matter what the phone number (query parameter) is. 
    - [```https://viewonce.yan.wf/```'s code](https://github.com/clashhsalc/viewoncewhatsapp-server)

4. Save the file
5. Load the unpacked extension:
    - Enable developer mode on your browser's extensions page.
    - Load the folder containing the .js files.

6. Reload WhatsApp Web and re-login. You might need to log in more than once, as the process can be inconsistent.
