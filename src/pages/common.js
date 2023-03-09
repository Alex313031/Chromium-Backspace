// Copyright 2016 Google Inc. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Define the customary shorthand for getElementById.
var $ = document.getElementById.bind(document);

// Load strings from messages.json into the HTML page. Each element that needs
// an internationalized string should have an 'i18n' property holding the
// name of the message to be used. If the element instead has an 'i18n-alt'
// property, that message will be used for the alt and title attributes of the
// element (generally an image).
function loadInternationalizedStrings() {
  var all = document.querySelectorAll('[i18n]');
  for (var i = 0; i < all.length; ++i)
    all[i].textContent = chrome.i18n.getMessage(all[i].getAttribute('i18n'));

  all = document.querySelectorAll('[i18n-alt]');
  for (var i = 0; i < all.length; ++i) {
      var message = chrome.i18n.getMessage(all[i].getAttribute('i18n-alt'));
      all[i].alt = message;
      all[i].title = message;
  }
}

// Open a pre-filled email to send feedback to the extension developers. The
// initial content of the email depends on whether the URL of the current page
// is provided.
function sendFeedback(opt_url) {
  var subject = chrome.i18n.getMessage('reportSubject');
  var body = '';
  if (opt_url)
    body = chrome.i18n.getMessage('reportBodyWithURL', opt_url);
  else
    body = chrome.i18n.getMessage('reportBody');
  var msg = 'mailto:alex313031@gmail.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  chrome.tabs.create({
    url: msg,
    active: true});
}
