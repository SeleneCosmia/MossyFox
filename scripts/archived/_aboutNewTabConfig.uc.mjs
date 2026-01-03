// ==UserScript==
// @name          newTabConfig.uc.mjs
// @author        SeleneCosmia
// @onlyonce
// @ignorecache
// ==/UserScript==

import {
  Prefs,
  Windows
} from 'chrome://userchromejs/content/uc_api.sys.mjs'

(() => {
  const PREF_NEWTAB = 'browser.newtab.url';


  const { AboutNewTab } =
    ChromeUtils.importESModule('resource:///modules/AboutNewTab.sys.mjs');

  function init() {
    let defaultURL = 'about:blank';
    let newTabPage = Prefs.get(PREF_NEWTAB);

    if ( newTabPage.exists() === false ) {
      Prefs.set(PREF_NEWTAB, defaultURL);
      let newTabURL = Prefs.get(PREF_NEWTAB);
    }

    try {
      AboutNewTab.newTabURL = newTabPage
      let newTabListener = Prefs.addListener('browser.newtab.url',
        (value, pref) => {
          AboutNewTab.newTabURL.name = pref;
          AboutNewTab.newTabURL.value = value;
        }
      )
    } catch (e) {
      console.error(e)
    };
  }

  Windows.waitWindowLoading(window).then(() => {
    init()
  })
})();
