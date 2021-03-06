#############################################################################
# Dev Build Script
# - Create "ava-debug" WebPart (SPFx) sample
# - Repo: https://github.com/omg1978/SPFxAva
# - 03/2017 Oscar Martin
#############################################################################

# Define unit to create samples
C:
cd\
# Create all projects folder
cd "C:\SPFx\SPFx"
# Create HolaMundo WebPart project
md ava-debug
cd ava-debug
# Create SPFx project temaplete
yo @microsoft/sharepoint
#############################################################################

# Install the developer certificate for use with SPFx development (only the first time)
gulp trust-dev-cert
# Ejecute on workbench
gulp serve
#gulp serve --verbose
#############################################################################

# Generate the files to deploy in the SharePoint Library
gulp bundle --ship
cd c:\SPFx\SPFx\ava-debug\temp\deploy
explorer .
# TODO: Edit CDN url on project (\ava-debug\config\write-manifests.json)
# Create a .spapp file for this webpart to upload in App Catalog
gulp package-solution --ship
cd c:\SPFx\ava-debug\sharepoint\solution
explorer .
#############################################################################


#############################################################################
# Debug
# https://www.eliostruyf.com/how-to-debug-your-sharepoint-framework-web-part/
#############################################################################

# Option 1:
debugger;
#############################################################################

# Option 2:
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
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
#############################################################################
