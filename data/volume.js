//     This file is part of Bandcamp Volume add-on for Mozilla Firefox
//     https://github.com/DanielKamkha/BandcampVolumeFirefox
//     (c) 2015 Daniel Kamkha
//     Based on Bandcamp Volume extension for Google Chrome
//     https://github.com/ubercow/bandcamp_volume
//     (c) 2013 Zak Kristjanson
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

(function() {
  "use strict";

  function BandcampVolume() {
    let rangesCache = [];
    let audioTag = null;
    let rowspanRow = null;
    let sliderRow = null;

    function _slider_change(evt) {
      // Set the audio tag's volume to the slider's volume
      audioTag.volume = evt.target.value;
    }

    function _slider_mouseup(evt) {
      // Get the value of the input
      let newVol = evt.target.value;

      // Put it in storage for global persistence
      self.port.emit("set", {"volume": newVol});

      // Yes I know I am going to set the slider that's triggering this event to it's own value.
      rangesCache.forEach(function (element) {
        element.value = newVol;
      });
    }

    function attach() {
      audioTag = document.getElementsByTagName("audio")[0];

      self.port.once("get", function (items) {
        let newVol = items["volume"] || audioTag.volume;
        rangesCache.forEach(function (element) {
          element.value = newVol;
        });
        audioTag.volume = newVol
      });
      self.port.emit("get");

      // Create the volume layout
      let desktop_view = document.getElementsByClassName("inline_player")[0];
      rowspanRow = desktop_view.querySelector("tr:first-child td:first-child");
      rowspanRow.setAttribute("rowspan", "3");

      sliderRow = document.createElement("tr");
      let col = sliderRow.appendChild(document.createElement("td"));
      col.setAttribute("colspan", "3");

      let volContainer = document.createElement("div");
      volContainer.style.marginLeft = "0.83em";

      let volumeIcon = document.createElement("span");
      volumeIcon.className = "fa fa-lg volumeIcon fa-volume-up";

      // Get some stuff from the player progress bar to add style to the volume bar
      let playProgbar = desktop_view.querySelector(".progbar_empty");
      let playProgbar_style = (playProgbar.currentStyle || window.getComputedStyle(playProgbar, null));

      let volumeSlider = document.createElement("input");
      volumeSlider.className = "volumeSlider";
      volumeSlider.style.border = playProgbar_style.border;

      volumeSlider.type = "range";
      volumeSlider.max = 1;
      volumeSlider.step = 0.01;
      volumeSlider.min = 0;
      volumeSlider.value = audioTag.volume;
      volumeSlider.addEventListener("change", _slider_change);
      volumeSlider.addEventListener("mouseup", _slider_mouseup);
      rangesCache.push(volumeSlider);

      volContainer.appendChild(volumeIcon);
      volContainer.appendChild(volumeSlider);
      col.appendChild(volContainer);
      desktop_view.querySelector("tbody").appendChild(sliderRow);
    }

    function detach() {
      if (sliderRow) {
        sliderRow.parentNode.removeChild(sliderRow);
        sliderRow = null;
      }
      if (rowspanRow) {
        rowspanRow.setAttribute("rowspan", "2");
        rowspanRow = null;
      }
    }

    return {
      attach: attach,
      detach: detach
    }
  }

  let controller = new BandcampVolume();
  controller.attach();

  self.port.on("detach", function() {
    controller.detach();
    controller = null;
  });
})();
