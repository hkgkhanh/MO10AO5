function getDataStorage() {
	if (window.localStorage !== undefined) {

		if (localStorage.theme) {
			var jsonThemeText = localStorage.getItem("theme");
			darkMode = JSON.parse(jsonThemeText);

		} else {
			darkMode = false;
		}

		if (localStorage.avgCount) {
			var jsonAvgCountText = localStorage.getItem("avgCount");
			document.getElementById("avgCountInput").value = JSON.parse(jsonAvgCountText);

		} else {
			document.getElementById("avgCountInput").value = 10;
		}

		if (localStorage.scrambleType) {
			var jsonscrambleTypeText = localStorage.getItem("scrambleType");
			document.getElementById("scramSelect").selectedIndex = JSON.parse(jsonscrambleTypeText);

		} else {
			document.getElementById("scramSelect").selectedIndex = "0";
		}

		if (localStorage.session) {
			var jsonSessionText = localStorage.getItem("session");
			session = JSON.parse(jsonSessionText);

		} else {
			session = [];
		}
		
	}
}

function saveSettings() {
	var jsonTheme;
	var jsonAvgCount;
	var jsonScrambleType;
	var jsonSession;

	if (window.localStorage !== undefined) {

   		jsonTheme = JSON.stringify(darkMode);
   		jsonAvgCount = JSON.stringify(avgCount);
   		jsonScrambleType = JSON.stringify(document.getElementById('scramSelect').selectedIndex);
   		jsonSession = JSON.stringify(session);

	  	localStorage.setItem("theme", jsonTheme);
   		localStorage.setItem("avgCount", jsonAvgCount);
   		localStorage.setItem("scrambleType", jsonScrambleType);
   		localStorage.setItem("session", jsonSession);
  		return;
 	};
}
