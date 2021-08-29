var inspection = false;
var inspectBegin;
var inspectionTime = 15;

document.onclick = function(e) {
	if ((e.target.id === "timesListDiv" || e.target.id === "aboutDiv") && (e.target.id !== "timesList" || e.target.id !== "about")) {
		closeDiv();
	}
}

document.onkeyup = function(e) {
	if (e.keyCode === 32) {
		if (!inspection) {
			inspection = true;
			inspectBegin = setInterval(outOfInspectTime, 1000);
			document.getElementById("input").value = "";
			document.getElementById("inspectionDiv").style.display = "flex";
			document.getElementById("inputDiv").style.display = "none";
		} else {
			clearInterval(inspectBegin);
			inspection = false;
			inspectionTime = 15;
			document.getElementById("inspection").innerHTML = "15";
			document.getElementById("inspectionDiv").style.display = "none";
			document.getElementById("inputDiv").style.display = "flex";
			document.getElementById("input").focus();
		}
	}
}

document.onkeydown = function(e) {
	if (e.altKey && e.keyCode === 50) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 1;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();

	} else if (e.altKey && e.keyCode === 51) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 0;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();

	} else if (e.altKey && e.keyCode === 52) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 2;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 53) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 3;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 54) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 4;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 55) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 5;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 77) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 6;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 80) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 7;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 49) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 8;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 83) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 9;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 67) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 10;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 79) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 11;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 66) {
		e.preventDefault();
		document.getElementById("scramSelect").selectedIndex = 12;
		generateScramble(document.getElementById('scramSelect').value);
		saveSettings();
		
	} else if (e.altKey && e.keyCode === 76) {
		e.preventDefault();
		toggleTheme();
		
	} else if (e.keyCode === 13) {
		e.preventDefault();
		if (document.getElementById("timesListDiv").style.display !== "block" && document.getElementById("aboutDiv").style.display !== "block" ) {

			if (document.getElementById("input").value !== "") {
				getTimeInput();

			} else {
				generateScramble(document.getElementById('scramSelect').value);
			}
			
		}
	} else if (e.altKey && e.keyCode === 90) {
		e.preventDefault();
		delSolve(session.length - 1);
		
	} else if (e.altKey && e.keyCode === 68) {
		e.preventDefault();
		resetSession();
		
	} else if (e.altKey && e.keyCode === 37) {
		e.preventDefault();
		getLastScramble();
		
	} else if (e.altKey && e.keyCode === 39) {
		e.preventDefault();
		generateScramble(document.getElementById('scramSelect').value);
		
	} else if (e.ctrlKey && e.keyCode === 49) {
		e.preventDefault();
		setOK(session.length - 1);
		
	} else if (e.ctrlKey && e.keyCode === 50) {
		e.preventDefault();
		setP2(session.length - 1);
		
	} else if (e.ctrlKey && e.keyCode === 51) {
		e.preventDefault();
		setDNF(session.length - 1);
		
	} else if (e.altKey && e.keyCode === 73) {
		e.preventDefault();
		
		var newCount = prompt("mean of X average(s) of 5: X =", avgCount);

		if (newCount != null && parseInt(newCount) > 0) {

			document.getElementById("avgCountInput").value = parseInt(newCount);
			updateAvgCount();
			saveSettings();
		}
		
	}
}
