function timeContainSession() {
	let text = "Total solves: " + (session.length - sessionDNFcount) + "/" + session.length + " <br>";
	text += "Session mean: " + sessionMean.string + " <br><br>";

	text += "Current single: " + session[session.length - 1].string + " <br>" + "Best single: " + session[bestSingleIndex].string + " <br><br>";
	text += (session.length > 2) ? ("Current mo3: " + mo3s[mo3s.length - 1].string + " <br>" + "Best mo3: " + mo3s[bestMo3Index].string + " <br><br>") : "";
	text += (session.length > 4) ? ("Current ao5: " + ao5s[ao5s.length - 1].string + " <br>" + "Best ao5: " + ao5s[bestAo5Index].string + " <br><br>") : "";
	text += (session.length > 11) ? ("Current ao12: " + ao12s[ao12s.length - 1].string + " <br>" + "Best ao12: " + ao12s[bestAo12Index].string + " <br><br>") : "";
	text += (session.length > 24) ? ("Current ao25: " + ao25s[ao25s.length - 1].string + " <br>" + "Best ao25: " + ao25s[bestAo25Index].string + " <br><br>") : "";
	text += (session.length > 49) ? ("Current ao50: " + ao50s[ao50s.length - 1].string + " <br>" + "Best ao50: " + ao50s[bestAo50Index].string + " <br><br>") : "";
	text += (session.length > 99) ? ("Current ao100: " + ao100s[ao100s.length - 1].string + " <br>" + "Best ao100: " + ao100s[bestAo100Index].string + " <br><br>") : "";
	text += (session.length > 199) ? ("Current ao200: " + ao200s[ao200s.length - 1].string + " <br>" + "Best ao200: " + ao200s[bestAo200Index].string + " <br><br>") : "";

	text += "Time list: <br>";

	for (let i = 0; i < session.length; i++) {
		text += " <br>" + (i + 1) + ") " + session[i].string + " &emsp; " + session[i].scramble;
	}

	return text;
}

function timeContainSingle(index) {
	let text = "single: " + session[index].string + " &emsp; " + session[index].scramble;

	return text;
}

function timeContainMo3(index) {
	let text = "mean of 3: " + mo3s[index].string + " <br><br>";

	text += "Time list: <br>";

	for (let i = 0; i < 3; i++) {
		text += " <br>" + (i + 1) + ") " + session[index + i].string + " &emsp; " + session[index + i].scramble;
	}

	return text;
}

function timeContainAoX(X, trim, arr, index) {
	let text = "average of " + X + ": " + arr[index].string + " <br><br>";

	let a = [];
	let ia = [];

	for (var i = 0; i < X; i++) {
		a.push(session[session.length - X + i]);
	}

	for (let i = 0; i < trim; i++) {
		ia.push(getIndexInOrder(a, i), getIndexInOrder(a, X - 1 - i));
	}

	text += "Time list: <br>";

	for (let i = 0; i < X; i++) {

		if (!contain(ia, i)) {
			text += " <br>" + (i + 1) + ") " + session[index + i].string + " &emsp; " + session[index + i].scramble;

		} else {
			text += " <br>" + (i + 1) + ") (" + session[index + i].string + ") &emsp; " + session[index + i].scramble;
		}
	}

	return text;
}

function timeContainMo10Ao5(count) {
	let text = "mean of " + count + " average" + ((count > 1) ? "s" : "") +  " of 5: " + mo10Ao5.string + " <br><br>";

	text += "Time list: <br>";

	for (let i = 0; i < count; i++) {

		let a = [];
		let ia = [];

		for (var k = 0; k < 5; k++) {
			a.push(session[session.length - avgCount * 5 + i * 5 + k]);
		}

		ia.push(getIndexInOrder(a, 0), getIndexInOrder(a, 4));

		for (let j = 0; j < 5; j++) {

			let ind = session.length - (session.length % 5) - avgCount * 5 + i * 5 + j;

			if (!contain(ia, j)) {
				text += " <br>" + (i + 1) + "-" + (j + 1) + ") " + session[ind].string + " &emsp; " + session[ind].scramble;

			} else {
				text += " <br>" + (i + 1) + "-" + (j + 1) + ") (" + session[ind].string + ") &emsp; " + session[ind].scramble;
			} 
		}

		text += "<br> &emsp; &emsp; => " + nonRollingAo5s[nonRollingAo5s.length - count + i].string + " avg of 5 <br><br>";
	}

	return text;
}
