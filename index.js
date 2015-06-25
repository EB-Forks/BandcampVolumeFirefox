//     This file is part of Bandcamp Volume extension for Mozilla Firefox
//     https://github.com/DanielKamkha/BandcampVolumeFirefox
//     (c) 2015 Daniel Kamkha
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

// TODO: 64x64 icon for extension page
// TODO: change volume icon to fa-volume-down below 50% volume
// TODO: make extension work on custom Bandcamp sites (i.e. not ending with .bandcamp.com)

(function() {
  "use strict";

  exports.main = function () {
    let self = require("sdk/self");
    let storage = require("sdk/simple-storage").storage;

    function startListening(worker) {
      worker.port.on("get", function () {
        worker.port.emit("get", { volume: storage.volume });
      });
      worker.port.on("set", function (items) {
        if (items.volume !== undefined) {
          storage.volume = items.volume;
        }
      });
      worker.port.on("disable", function () {
        worker.destroy();
      });
    }

    require("sdk/page-mod").PageMod({
      include: "*", // Match everything
      attachTo: ["existing", "top"],
      contentStyleFile: [
        self.data.url("font-awesome.css"),
        self.data.url("content-style.css")
      ],
      contentScriptFile: self.data.url("volume.js"),
      onAttach: startListening
    });
  };
})();
