// Copyright 2016 Google Inc. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Inject the content scripts into all open tabs on first install or update.
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == 'install' || details.reason === 'update')
    injectContentScripts();
});

// Inject the content scripts into all open tabs when this extension is
// re-enabled.
chrome.management.onEnabled.addListener(function(info) {
  if (info.id === chrome.runtime.id)
    injectContentScripts();
});

// Listen for messages from the content script, so an old version can detect
// the loss of connection and disable itself when the extension has been
// updated, disabled, or uninstalled.
chrome.runtime.onMessage.addListener(function(message, from, reply) {
  reply();
});

// Inject the content scripts into every open tab, on every window.
function injectContentScripts() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
        chrome.scripting.executeScript({
          target: {tabId: tab.id, allFrames: true},
          files: chrome.runtime.getManifest().content_scripts[0].js,
          injectImmediately: true
        },
        function() {
          if (chrome.runtime.lastError) {
            // An error will occur if extensions are prohibited on the
            // tab (e.g., chrome:// pages). We don't need to do anything
            // about that, but we do need to catch it here to avoid an
            // error message on the Extensions page.
            var message = chrome.runtime.lastError.message;
            if (message != 'Cannot access a chrome:// URL' &&
                message != 'The extensions gallery cannot be scripted.' &&
                message != 'This page cannot be scripted due to an ' +
                           'ExtensionsSettings policy.' &&
                !message.startsWith('Cannot access contents of the page.')) {
              throw message;
            }
          }
      });
    });
  });
}
