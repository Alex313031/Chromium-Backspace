// Copyright 2016 Google Inc. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Disable the whitelist field when it's not relevant.
function updateEnabledInputs() {
  $('whitelist').disabled = !$('disableInApplets').checked;
}

// Initialize the page.
function init() {
  loadInternationalizedStrings();

  // Configure the textboxes, allowing 200 characters for JSON serialization
  // and key length.
  $('blacklist').maxlength = chrome.storage.sync.QUOTA_BYTES_PER_ITEM - 200;
  $('whitelist').maxlength = chrome.storage.sync.QUOTA_BYTES_PER_ITEM - 200;

  // Set event handlers.
  $('done-button').onclick = function() {
    chrome.storage.sync.set({
      // Split the lists into arrays at whitespace before saving.
      // TODO: Validate the items as URLs and display a warning in case of
      // errors.
      blacklist: $('blacklist').value.split(/\s+/),
      disableInApplets: $('disableInApplets').checked,
      whitelist: $('whitelist').value.split(/\s+/)
    }, function() {
      // One easy way to force an error for testing is to change "sync" to
      // "managed" in the chrome.storage.sync.set() call above.
      if (chrome.runtime.lastError) {
        $('error').textContent =
            chrome.i18n.getMessage('errorSaving',
                                   chrome.runtime.lastError.message);
      } else {
        window.close();
      }
    });
  };

  $('disableInApplets').onchange = updateEnabledInputs;
  $('cancel-button').onclick = window.close.bind(window);
  $('feedback-link').onclick = function() {
    sendFeedback();
  };

  // Load saved settings into the form fields.
  chrome.storage.sync.get({
    blacklist: [],
    disableInApplets: true,
    whitelist: []
  }, function(items) {
    $('blacklist').value = items.blacklist.join('\n');
    $('disableInApplets').checked = items.disableInApplets;
    $('whitelist').value = items.whitelist.join('\n');

    updateEnabledInputs();
  });
}

window.addEventListener('load', init);
