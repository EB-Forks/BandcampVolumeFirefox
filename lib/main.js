//     This file is part of Bandcamp Volume add-on for Mozilla Firefox
//     https://github.com/DanielKamkha/bandcamp_volume_firefox
//     (c) 2015 Daniel Kamkha
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

(function() {
  "use strict";

  exports.main = function () {
    let self = require("sdk/self");
    let simplePrefs = require("sdk/simple-prefs");

    function startListening(worker) {
      worker.port.on("get", function () {
        worker.port.emit("get", { volume: simplePrefs.prefs["volume"] });
      });
      worker.port.on("set", function (items) {
        if (items.volume !== undefined) {
          simplePrefs.prefs["volume"] = items.volume;
        }
      });
    }

    require("sdk/page-mod").PageMod({
      include: /.*\.bandcamp.com\/.*/, // Match anything containing ".bandcamp.com/"
      attachTo: ["existing", "top"],
      contentScriptFile: [
        self.data.url("browser-adaptor.js"),
        self.data.url("volume.js"),
        self.data.url("volume-unload.js")
      ],
      onAttach: startListening
    });

  };

  exports.onUnload = function () {

  };
})();
