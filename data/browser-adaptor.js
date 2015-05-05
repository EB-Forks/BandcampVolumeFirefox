//     This file is part of Bandcamp Volume add-on for Mozilla Firefox
//     https://github.com/DanielKamkha/bandcamp_volume_firefox
//     (c) 2015 Daniel Kamkha
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

(function () {
  "use strict";

  let chrome = { storage: { local: {} } };

  chrome.storage.local.get = function (name, getter) {

  };

  chrome.storage.local.set = function (items) {

  };

  window.chrome = chrome;
})();
