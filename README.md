# Chromium Go Back With Backspace <img src="https://raw.githubusercontent.com/Alex313031/Chromium-Backspace/main/logo.png" width="64"></img>

Chromium/Chrome extension which re-enables the backspace key as a back navigation button (except when writing text).

 &ndash; It is a fork of https://chrome.google.com/webstore/detail/go-back-with-backspace/eekailopagacbcdloonjhbiecobagjci

> 3.0.2
> - Updated some css and manifest.json homepage_url
> - Updated icon sizes and readme.txt
> 
> 3.0.1
> - Updated some strings and .css
> 
> 3.0.0
> - Updated to Manifest V3

## About

Go back with the backspace button! This extension re-enables the backspace key as a back navigation button -- except if you're writing text.

Before Chromium 52, the backspace key navigated back (if you weren't writing text). Many people lost their progress while working online by accidentally
pressing backspace and leaving a page -- so Google removed the feature from Chromium, and created this extension for those who prefer the old behavior.

This extension can't restore the backspace behavior on certain special pages, for example any of the "chrome://" pages such as Settings or Extensions, or in the Chrome Web Store.

### About the requested permissions:

"Read and modify all your data": In order to capture backspace on every page, 
the extension needs to install a little piece of code on each one, including 
tabs that are already open when the extension itself is installed or updated. 
It does nothing else with the page, its information, or your typing.

"Manage your apps, extensions, and themes": This lets the extension detect when it has been re-enabled and install its code into tabs that are already open then, too.
