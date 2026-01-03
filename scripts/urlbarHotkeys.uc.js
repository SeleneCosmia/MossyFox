// ==UserScript==
// @name          Urlbar Hotkeys
// @author        SeleneCosmia
// @version       1.0.0
// ==/UserScript==

class CopyCurrentURL {
  shortcut = {
    id: "key_copyCurrentUrl",
    modifiers: "ctrl alt",
    key: "C",
  };
};

constructor() {
  XPCOMUtils.defineLazyServiceGetter(
    this,
    "ClipboardHelper",
    "@mozilla.org/widget/clipboardhelper;1",
    "nsIClipboardHelper"
  );
}
