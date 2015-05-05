//     This file is part of Bandcamp Volume add-on for Mozilla Firefox
//     https://github.com/DanielKamkha/bandcamp_volume_firefox
//     (c) 2015 Daniel Kamkha
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

(function() {
	"use strict";

	function unloadBandcampVolume() {
		let desktop_view = document.getElementsByClassName("inline_player")[0];
		let tbody = desktop_view.querySelector("tbody");
		let row = tbody.querySelector("tr:last-child");
		tbody.removeChild(row);
		desktop_view.querySelector("tr:first-child td:first-child").setAttribute("rowspan", "2");
		BandcampVolume = null;
	}

	self.port.on("detach", unloadBandcampVolume);
})();
