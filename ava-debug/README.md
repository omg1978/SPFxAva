## ava-debug

Demonstration of debugging in a SPFx WebPart

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp serve
```

### Debug using browser - AvanadeDebugWebPart.ts

1) Debug using browser. Add the "debugger;" statement where you want the Web Browser debug to stop

```bash
debugger;
```

### Debug using Visual Studio Code and Chrome -  

1) Install "Debugger for Chrome" extension, in Visual Studio Code

2) Run the Chrome app, with the necessary parameters to enable the debug options:

```bash
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

3) Add new debug configuration in Visual Studio Code (only for Chrome browser):

```bash
{
	"name": "Launch localhost with sourcemaps",
	"type": "chrome",
	"request": "launch",
	"url": "https://localhost:4321/temp/workbench.html",
	"webRoot": "${workspaceRoot}",
	"sourceMaps": true,
	"sourceMapPathOverrides": {
		"webpack:///../../../../*": "${webRoot}/*"
	}
}
```
