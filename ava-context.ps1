#############################################################################
# Dev Build Script
# - Create "ava-context" WebPart (SPFx) sample
# - Source: https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/connect-to-sharepoint
# - Repo: https://github.com/omg1978/SPFxAva
# - 03/2017 Oscar Martin
#############################################################################

# Define unit to create samples
C:
cd\
# Create all projects folder
cd "C:\SPFx\SPFx"
# Create HolaMundo WebPart project
md ava-context
cd ava-context
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
cd c:\SPFx\SPFx\ava-context\temp\deploy
explorer .
# TODO: Edit CDN url on project (\ava-context\config\write-manifests.json)
# Create a .spapp file for this webpart to upload in App Catalog
gulp package-solution --ship
cd c:\SPFx\ava-context\sharepoint\solution
explorer .
#############################################################################

