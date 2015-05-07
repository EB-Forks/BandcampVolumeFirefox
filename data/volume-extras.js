//     This file is part of Bandcamp Volume add-on for Mozilla Firefox
//     https://github.com/DanielKamkha/bandcamp_volume_firefox
//     (c) 2015 Daniel Kamkha
//     Bandcamp Volume is free software distributed under the terms of the MIT license.

(function() {
	"use strict";

	function setVolumeIcon() {
		let inline_player = document.getElementsByClassName("inline_player")[0];
		let tbody = inline_player.querySelector("tbody");
		let cell = tbody.querySelector("tr:last-child td:first-child");
		let volumeSpan = cell.querySelector("tr:last-child td:first-child span");
		volumeSpan.innerHTML = "";
		volumeSpan.className = "fa fa-volume-up fa-lg";
		volumeSpan.style.marginRight = 0;
	}

	function unloadBandcampVolume() {
		if (!BandcampVolume) {
			return;
		}
		let inline_player = document.getElementsByClassName("inline_player")[0];
		if (inline_player) {
			let tbody = inline_player.querySelector("tbody");
			if (tbody && tbody.children.length > 2) {
				tbody.removeChild(tbody.querySelector("tr:last-child"));
				inline_player.querySelector("tr:first-child td:first-child").setAttribute("rowspan", "2");
			}
		}
		BandcampVolume = null;
	}

	setVolumeIcon();
	self.port.on("detach", unloadBandcampVolume);
})();
