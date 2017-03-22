#############################################################################
# Dev Build Script
# - Create "ava-webcast" WebPart (SPFx) sample
# - Repo: https://github.com/omg1978/SPFxAva
# - 03/2017 Oscar Martin
#############################################################################

# Define unit to create samples
C:
cd\
# Create all projects folder
cd "C:\SPFx\SPFxAva"
# Create HolaMundo WebPart project
md ava-webcast
cd ava-webcast
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
cd C:\SPFx\SPFxAva\ava-webcast\temp\deploy
# Create a .spapp file for this webpart to upload in App Catalog
gulp package-solution --ship
cd C:\SPFx\SPFxAva\ava-webcast\sharepoint\solution
#############################################################################

