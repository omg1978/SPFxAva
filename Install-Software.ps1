#############################################################################
# Dev Build Script
# - Downloads and installs applications and components
# - 02/2017 Oscar Martin
#############################################################################

[CmdletBinding()]Param();
 
$0 = $myInvocation.MyCommand.Definition 
$env:dp0 = [System.IO.Path]::GetDirectoryName($0) 

# Software to download
$global:downloads = @{
    "VSCode-Stable.exe" = @("https://vscode-update.azurewebsites.net/latest/win32/stable", "Microsoft Visual Studio Code", @("/SILENT", "/NORESTART", "/NOCANCEL"));
    "node-v6.9.4-x64.msi" = @("https://nodejs.org/dist/v6.9.4/node-v6.9.4-x64.msi", "Node.js", @("/PASSIVE", "/NORESTART")); 
    "Git-2.11.1-64-bit.exe" = @("https://github.com/git-for-windows/git/releases/download/v2.11.1.windows.1/Git-2.11.1-64-bit.exe", "Git", @("/SILENT", "/NORESTART", "/NOCANCEL"));
}

$global:npm = "C:\Program Files\nodejs\npm.cmd";

# Function to download all software from Internet
function Download-All {
    $global:downloads.GetEnumerator() | % {
        $fileName = $_.Key;
        $url = ($_.Value)[0];
        try {
            if (!(Test-Path "$env:dp0\$fileName")) {
                Write-Host -ForegroundColor Yellow "Downloading $fileName";
                Invoke-WebRequest -Uri $url -Outfile "$env:dp0\$fileName";
            } else {
                Write-Host "$fileName already downloaded";
            }
        } catch {
            $ReturnCode = -1 
            Write-Warning " - An error occurred downloading `'$fileName`'" 
            Write-Error $_ 
            break; 
        }
    }
}

# Function to install all software downloaded
function Install-All {
    $global:downloads.GetEnumerator() | % {
        $fileName = $_.Key;
        $name = $_.Value[1];
        $exeArgs = $_.Value[2];
        try {
            Install-App -name $name -exe "$($env:dp0)\$fileName" -exeArgs $exeArgs;
        } catch {
            $ReturnCode = -1 
            Write-Warning " - An error occurred installing `'$fileName`'" 
            Write-Error $_ 
            break; 
        }
    }
}

# Function to check if software is installed
function Is-Installed {
    param($name);
    $item = Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | ? DisplayName -ilike "$($name)*";
    if ($item -eq $null) {
        $item = Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* |  ? DisplayName -ilike "$($name)*";
    }
    return ($item -ne $null);
}

# Function to install software
function Install-App {
    param($name, $exe, [string[]]$exeArgs);
    if (!(Is-Installed -name $name)) {
        Write-Host -ForegroundColor Yellow "Installing $name";
        &$exe $exeArgs;
    } else {
        Write-Host "$name is already installed";
    }
}

# Configure all aplications
try {
    Download-All;
    Install-All;
    Write-Host -ForegroundColor Yellow "Updating NPM";
    npm install npm@latest -g 
    &$global:npm ("i", "-g", "npm@latest", "--loglevel silent");
    Write-Host -ForegroundColor Yellow "Installing Windows Build Tools";
    &$global:npm ("i", "-g", "--production", "windows-build-tools", "--loglevel silent");
    Write-Host -ForegroundColor Yellow "Installing Yeoman and Gulp";
    &$global:npm ("i", "-g", "yo", "gulp", "--loglevel silent");
    Write-Host -ForegroundColor Yellow "Installing TypeScript";
    &$global:npm ("i", "-g", "typescript@next", "--loglevel silent");
    Write-Host -ForegroundColor Yellow "Installing Yeoman SharePoint Generator";
    &$global:npm ("i", "-g", "@microsoft/generator-sharepoint", "--loglevel silent");
} catch {
    Write-Host -ForegroundColor Red $_.Exception;
}