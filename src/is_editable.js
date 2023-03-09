// Copyright 2016 Google Inc. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Determine whether focus is in an editable text field.
function isEditable(target) {
  // Elements may be explicitly marked as editable.
  if (target.isContentEditable)
    return true;

  // Entire documents may be editable.
  if (target.ownerDocument.designMode.toLowerCase() === 'on')
    return true;

  // Many types of input fields are editable, but not all (e.g., checkboxes).
  var nodeName = target.nodeName.toUpperCase();
  var nodeType = target.type || '';
  nodeType = nodeType.toLowerCase();
  if (nodeName === 'TEXTAREA' ||
      (nodeName === 'INPUT' && (nodeType === 'text' ||
                                nodeType === 'password' ||
                                nodeType === 'search' ||
                                nodeType === 'date' ||
                                nodeType === 'datetime' ||
                                nodeType === 'datetime-local' ||
                                nodeType === 'email' ||
                                nodeType === 'month' ||
                                nodeType === 'number' ||
                                nodeType === 'tel' ||
                                nodeType === 'time' ||
                                nodeType === 'url' ||
                                nodeType === 'week'))) {
    return true;
  }

  // Certain CSS styles, on elements or their parents, also indicate editable
  // fields.
  while (target) {
    if (target.nodeType == 1) { // Only Elements have computed styles.
      var userModify = getComputedStyle(target)['-webkit-user-modify'];
      if (userModify === 'read-write' ||
          userModify === 'write-only' ||
          userModify === 'read-write-plaintext-only') {
        return true;
      }
    }
    target = target.parentNode || null;
  }
  return false;
}
