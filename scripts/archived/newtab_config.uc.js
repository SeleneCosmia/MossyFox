// ==UserScript==
// @name          new tab config
// @author        SeleneCosmia
// @version       0.0.1
// @include       main
// @onlyonce
// ==/UserScript==

(() => {
  function startup() {
    const NEW_TAB_CONFIG_PATH = 'browser.newtab.url'
    const FALLBACK_CONFIG_URL = 'about:blank'
    const { AboutNewTab } = ChromeUtils.import('resource:///modules/AboutNewTab.sys.mjs')

    let newTabURL = UC_API.Prefs.get('browser.newtab.url')

  // check if the pref is already defined
  // and set it to default if it is not.
    if (!newTabURL.exists()) {
      UC_API.Prefs.set(
        NEW_TAB_CONFIG_PATH,
        FALLBACK_CONFIG_URL
      );
    }

    AboutNewTab.newTabURL = newTabURL;
    let callback = (pref) => (AboutNewTab.newTabURL = pref);
    let prefListener = UC_API.Prefs.addListener('browser.newtab',callback);
    prefListener();
  };

  startup();
  console.log(`New Tab Config Loaded`);
  UC_API.Prefs.removeListener(prefListener);
})();
