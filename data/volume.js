//     This file is part of Bandcamp Volume add-on for Mozilla Firefox
//     https://github.com/DanielKamkha/bandcamp_volume_firefox
//     (c) 2015 Daniel Kamkha
//     Based on Bandcamp Volume extension for Google Chrome
//     https://github.com/ubercow/bandcamp_volume
//     (c) 2013 Zak Kristjanson
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

(function() {
  "use strict";

  let BandcampVolume =
  {
    _ranges: [],
    _audioTag: null,
    _rowspanRow: null,
    _sliderRow: null,
    _slider_change: function(evt) {
      // Set the audio tag's volume to the slider's volume
      this._audioTag.volume = evt.target.value
    },
    _slider_mouseup: function(evt) {
      // Get the value of the input
      let newVol = evt.target.value;

      // Put it in storage for global persistence
      self.port.emit("set", {"volume": newVol});

      // Yes I know I am going to set the slider that's triggering this event to it's own value.
      this._ranges.forEach( function(element) { element.value = newVol; });
    },
    load: function() {
      this._audioTag = document.getElementsByTagName("audio")[0];

      let that = this;
      self.port.once("get", function(items) {
        let newVol = items["volume"] || that._audioTag.volume;
        that._ranges.forEach(function(element) { element.value = newVol; });
        that._audioTag.volume = newVol
      });
      self.port.emit("get");

      // Create the volume layout
      let desktop_view = document.getElementsByClassName("inline_player")[0];
      this._rowspanRow = desktop_view.querySelector("tr:first-child td:first-child");
      this._rowspanRow.setAttribute("rowspan", "3");

      this._sliderRow = document.createElement("tr");
      let col = this._sliderRow.appendChild(document.createElement("td"));
      col.setAttribute("colspan", "3");

      let volContainer = document.createElement("div");
      volContainer.style.marginLeft = "0.83em";

      let volumeSpan = document.createElement("span");
      volumeSpan.style.fontWeight = "bold";
      volumeSpan.style.display = "inline-block";
      volumeSpan.style.verticalAlign = "middle";
      volumeSpan.style.height = "14px";
      volumeSpan.className = "fa fa-volume-up fa-lg";

      // Get some stuff from the player progress bar to add style to the volume bar
      let playProgbar = desktop_view.querySelector(".progbar_empty");
      let playProgbar_style = (playProgbar.currentStyle || window.getComputedStyle(playProgbar, null));

      let range = document.createElement("input");
      range.style.display = "inline-block";
      range.style.verticalAlign = "middle";

      range.style.height = "4px";
      range.style.webkitAppearance = "none";
      range.style.background = "none";
      range.style.border = playProgbar_style.border;
      range.style.outline = "none";

      range.type="range";
      range.max = 1;
      range.step = 0.01;
      range.min = 0;
      range.value = this._audioTag.volume;
      range.addEventListener("change", this._slider_change.bind(this));
      range.addEventListener("mouseup", this._slider_mouseup.bind(this));
      this._ranges.push(range);

      volContainer.appendChild(volumeSpan);
      volContainer.appendChild(range);
      col.appendChild(volContainer);
      desktop_view.querySelector("tbody").appendChild(this._sliderRow);
    },
    unload: function () {
      if (this._sliderRow) {
        this._sliderRow.parentNode.removeChild(this._sliderRow);
        this._sliderRow = null;
      }
      if (this._rowspanRow) {
        this._rowspanRow.setAttribute("rowspan", "2");
        this._rowspanRow = null;
      }
    }
  };

  BandcampVolume.load();

  self.port.on("detach", function () {
    if (BandcampVolume) {
      BandcampVolume.unload();
      BandcampVolume = null;
    }
  });
})();
