//     This file is part of Bandcamp Volume add-on for Mozilla Firefox
//     https://github.com/DanielKamkha/bandcamp_volume_firefox
//     (c) 2015 Daniel Kamkha
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

(function () {
  "use strict";

  let chrome = { storage: { local: {} } };

  chrome.storage.local.get = function (name, getter) {
    self.port.once("get", getter);
    self.port.emit("get");
  };

  chrome.storage.local.set = function (items) {
    self.port.emit("set", items);
  };

  window.chrome = chrome;
})();
