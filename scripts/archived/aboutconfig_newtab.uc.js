// ==UserScript==
// @name          About New Tab Config
// @author        SeleneCosmia
// @version       0.0.5
// @homepage      https://github.com/SeleneCosmia
// @description   Restores the about:newtab page config option in about:config
// @include       main
// @onlyonce
// ==/UserScript==

(() => {
  const NewTabModule = 'resource:///modules/AboutNewTab.sys.mjs';
  const UtilsModule = 'chrome://userchromejs/content/uc_api.sys.mjs';
  const { AboutNewTab } = ChromeUtils.importESModule(NewTabModule);
  const { UC_API } = ChromeUtils.importESModule(UtilsModule);

  function setup() {
    const NEW_TAB_CONFIG_PATH = 'browser.newtab.url';
    const DEFAULT_URL_VALUE = 'about:blank';

    let newTabURL = UC_API.Prefs.get(NEW_TAB_CONFIG_PATH);


    function restoreConfig(config) {
      config.newtab.url =
        newTabURL.hasUserValue() ? newTabURL.value : 'about:blank'
    }
    function updateConfig(config) {
      newTabURL.value = config.newtab.url
    }
  }

  function init() {
    setup();
    setup.restoreConfig();
    setup.updateConfig();
  }

  if (gBrowserInit.delayedStartupFinished) {
    init()
  } else {
    let delayedListener = (subject, topic) => {
      if (topic == `browser-delayed-startup-finished` && subject == window) {
        Services.obs.removeObserver(delayedListener, topic)
        init()
      }
    };
    Services.obs.addObserver(
      delayedListener,
      `browser-delayed-startup-finished`
    )
  }
})()


// Config.init = function() {
//   let newTabURL = Pref.get("browser.newtab.url");
//
//   if (!newTabURL) {
//     let newTabURL = Pref.set("browser.newtab.url", "about:blank");
//   }
//   try {
//     Cu.import("resource:///modules/AboutNewTab.jsm");
//     AboutNewTab._newTabURL = newTabURL;
//   } catch(e) {
//     Cu.reportError(e);
//   }
// }

