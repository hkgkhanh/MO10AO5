function outOfInspectTime() {
	inspectionTime--;

	if (inspectionTime > 0) {
		document.getElementById("inspection").innerHTML = inspectionTime;
	} else if (inspectionTime > -2 && inspectionTime <= 0) {
		document.getElementById("inspection").innerHTML = "+2";
	} else if (inspectionTime <= -2) {
		document.getElementById("inspection").innerHTML = "DNF";
	}
}