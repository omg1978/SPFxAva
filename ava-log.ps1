#############################################################################
# Dev Build Script
# - Create "ava-log" WebPart (SPFx) sample
# - Repo: https://github.com/omg1978/SPFxAva
# - 03/2017 Oscar Martin
#############################################################################

# Define unit to create samples
C:
cd\
# Create all projects folder
cd "C:\SPFx\SPFx"
# Create HolaMundo WebPart project
md ava-log
cd ava-log
# Create SPFx project temaplete
yo @microsoft/sharepoint
#############################################################################

# Ejecute on workbench
gulp serve
#gulp serve --verbose
#############################################################################

# Generate the files to deploy in the SharePoint Library
gulp bundle --ship
cd c:\SPFx\SPFx\ava-log\temp\deploy
explorer .
# TODO: Edit CDN url on project (C:\SPFx\ava-log\config\write-manifests.json)
# Create a .spapp file for this webpart to upload in App Catalog
gulp package-solution --ship
cd c:\SPFx\ava-log\sharepoint\solution
explorer .
#############################################################################

# load static images
npm install --save-dev file-loader
#############################################################################
