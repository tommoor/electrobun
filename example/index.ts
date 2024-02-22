import Electrobun, {BrowserWindow} from '../src/bun'


const win2 = new BrowserWindow({
    title: 'my url window',
    url: 'https://google.com',
    frame: {
		width: 1800,
		height: 600,
		x: 1000,
		y: 500,
    }
});


win2.setTitle('New title from bun')


const win = new BrowserWindow({
    title: 'my url window',
    html: `
    <html>
        <head></head>
        <body>
            <script>
                window.webkit.messageHandlers.bunBridge.postMessage("Hello from JavaScript!");                
                window.electrobun.bunBridge("Hello from bun bridge!");
            </script>
            <h1>hi</h1>
        </body>
    </html>
    `,
    frame: {
		width: 1800,
		height: 600,
		x: 1000,
		y: 500,
    }
});


// todo (yoav): typescript types should resolve for e and e.setResponse
Electrobun.events.on('will-navigate', (e) => {
    console.log('example global will navigate handler', e.data.url, e.data.windowId )
    e.response = {allow: false};
})

win.webview.on('will-navigate', (e) => {
    console.log('example webview will navigate handler', e.data.url, e.data.windowId )
    if (e.responseWasSet && e.response.allow === false) {
        e.response.allow = true;
        // e.clearResponse();
    }    
})

win.setTitle('New title from bun')

setTimeout(() => {
    win.webview.executeJavascript('document.body.innerHTML = "wow yeah! . !";');
    // win.webview.loadURL('https://google.com');
    win.webview.sendMessageToWebview({msg: 'hello from bun'});
}, 5000)

