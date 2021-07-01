function displayTimes() {
	document.getElementById("total").innerHTML = (session.length - sessionDNFcount) + "/" + session.length;

	document.getElementById("sessionList").innerHTML = "";
	var table = document.createElement("table");
	table.id = "sessionTable";

	var headerRow = table.insertRow();
	var headerCell = headerRow.insertCell();
	headerCell.innerHTML = "<b>mean: " + sessionMean.string + " (" + (session.length - sessionDNFcount) + "/" + session.length + ") </b>";
	headerCell.colSpan = "4";
	headerCell.style.padding = "1rem";
	headerCell.className = (session.length > 0) ? "cell" : "";

	headerCell.addEventListener("click", function() {
		timeContain("session");
	});

	var row = table.insertRow();

	var indCell = row.insertCell();
	indCell.innerHTML = "<b>ind</b>";
	//indCell.style.width = "10%";

	var timeCell = row.insertCell();
	timeCell.innerHTML = "<b>time</b>";
	//timeCell.style.width = "30%";

	var ao5Cell = row.insertCell();
	ao5Cell.innerHTML = "<b>ao5</b>";
	//ao5Cell.style.width = "30%";

	var ao12Cell = row.insertCell();
	ao12Cell.innerHTML = "<b>ao12</b>";
	//ao12Cell.style.width = "30%";



	for (let i = 0; i < session.length; i++) {
		var newRow = table.insertRow(2);

			// INDEX CELL
			var newIndCell = newRow.insertCell();
			newIndCell.innerHTML = (i + 1);

			// SINGLE CELL
			var newTimeCell = newRow.insertCell();
			newTimeCell.innerHTML = (session[i].string[0] === "D" ? session[i].string.slice(0, 3) : session[i].string);
			
			newTimeCell.addEventListener("click", function() {
				timeContainRandomSingle(i);
				showEditSolve(i, this.getBoundingClientRect().left, this.getBoundingClientRect().top);
			});

			newTimeCell.className = "cell";

			// AO5 CELL
			var newAo5Cell = newRow.insertCell();
			if (i < 4) {
				newAo5Cell.innerHTML = "-";

			} else {
				newAo5Cell.innerHTML = ao5s[i - 4].string;

				newAo5Cell.addEventListener("click", function() {
					timeContainRandomAo5(i - 4);
				});

				newAo5Cell.className = "cell";
			}

			// AO12 CELL
			var newAo12Cell = newRow.insertCell();
			if (i < 11) {
				newAo12Cell.innerHTML = "-";

			} else {
				newAo12Cell.innerHTML = ao12s[i - 11].string;

				newAo12Cell.addEventListener("click", function() {
					timeContainRandomAo12(i - 11);
				});

				newAo12Cell.className = "cell";
			}
	}


	document.getElementById("sessionList").appendChild(table);
	document.getElementById("sessionList").scrollTo(0, 0);
}

function showEditSolve(i, x, y) {
	document.getElementById("editSolveDiv").style.display = "inline-grid";
	//showDiv("editSolveDiv");

	solveIndex = i;

	let offY = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
	$("#editSolveDiv").offset({left: x, top: y + offY * 2});
}

function closeEditSolve() {
	document.getElementById("editSolveDiv").style.display = "none";
}
