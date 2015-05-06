//     This file is part of Bandcamp Volume add-on for Mozilla Firefox
//     https://github.com/DanielKamkha/bandcamp_volume_firefox
//     (c) 2015 Daniel Kamkha
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

(function() {
	"use strict";

	function unloadBandcampVolume() {
		if (!BandcampVolume) {
			return;
		}
		let inline_player = document.getElementsByClassName("inline_player")[0];
		if (inline_player) {
			let tbody = inline_player.querySelector("tbody");
			if (tbody && tbody.children.length > 2) {
				tbody.removeChild(tbody.children[2]);
				inline_player.querySelector("tr:first-child td:first-child").setAttribute("rowspan", "2");
			}
		}
		BandcampVolume = null;
	}

	self.port.on("detach", unloadBandcampVolume);
})();
