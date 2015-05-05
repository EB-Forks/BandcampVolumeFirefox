//     This file is part of Bandcamp Volume add-on for Mozilla Firefox
//     https://github.com/DanielKamkha/bandcamp_volume_firefox
//     (c) 2015 Daniel Kamkha
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

// TODO: remove volume slider on unload

(function() {
  "use strict";

  exports.main = function () {
    let self = require("sdk/self");

    require("sdk/page-mod").PageMod({
      include: /.*\.bandcamp.com\/.*/, // Match anything containing ".bandcamp.com/"
      attachTo: ["existing", "top"],
      contentScriptFile: [
        self.data.url("browser-adaptor.js"),
        self.data.url("volume.js")
      ],
      onAttach: function () {}
    });

  };

  exports.onUnload = function () {

  };
})();
