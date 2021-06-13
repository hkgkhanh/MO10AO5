var avgCount = 10;
var solveCount = 50;

var solveInAvg = 0;
var avg = 0;

var ao5s = [];

var mo10Ao5 = {
	time: 0,
	string: ""
}

var sessionMean = {
	time: 0,
	string: ""
}

function selectText(element) {
	if (/INPUT|TEXTAREA/i.test(element.tagName)) {
		element.focus();
		if (element.setSelectionRange) {
			element.setSelectionRange(0, element.value.length);
		} else {
			element.select();
		}
		return;
	}
	if (window.getSelection) {
		window.getSelection().selectAllChildren(element);
	} else if (document.body.createTextRange) {
		var range = document.body.createTextRange();
		range.moveToElementText(element);
		range.select();
	}
}

function updateAvgCount() {
	avgCount = parseInt(document.getElementById("avgCountInput").value);
	solveCount = avgCount * 5;
}

function getSolveNumAndAvgNum() {
	solveInAvg = session.length % 5 + 1;
	avg = Math.floor(session.length / 5) + 1;

	document.getElementById("solveInAvg").innerHTML = solveInAvg;
	document.getElementById("avg").innerHTML = avg;
}

function calc() {
	getSolveNumAndAvgNum();

	if (session.length > 0) {

		// CALC BEST SINGLE INDEX
		for (let i = 0; i < session.length; i++) {
			if (session[i].pen !== "dnf") {
				bestSingleIndex = i;
				break;
			}
		}

		for (let i = 0; i < session.length; i++) {
			if (session[i].pen !== "dnf" && session[i].time < session[bestSingleIndex].time) {
				bestSingleIndex = i;
			}
		}
		//////////

		// CALC AO5
		ao5s = [];

		for (let i = 0; i < avg - 1; i++) {

			var ao5Arr = [];
			for (let j = 0; j < 5; j++) {
				ao5Arr.push(session[i * 5 + j]);
			}

			calcAo5(ao5Arr);
		}
		//////////////

		// CALC BEST AO5 INDEX
		for (let i = 0; i < ao5s.length; i++) {
			if (ao5s[i].string !== "DNF") {
				bestAo5Index = i;
				break;
			}
		}

		for (let i = 0; i < ao5s.length; i++) {
			if (ao5s[i].string !== "DNF" && ao5s[i].time < ao5s[bestAo5Index].time) {
				bestAo5Index = i;
			}
		}
		//////////

		// CALC SESSION MEAN
		sessionMean.time = calcMean(session, session.length).time;
		sessionMean.string = calcMean(session, session.length).string;
		///////////

		// CALC MO10AO5
		if (ao5s.length >= avgCount) {

			mo10Ao5.time = calcMean(ao5s, avgCount).time;
			mo10Ao5.string = calcMean(ao5s, avgCount).string;
		}
		//////////
	}
}

function calcAo5(arr) {
	let dnfCount = 0;
	for (let i = 0; i < 5; i++) {
		if (arr[i].pen === "dnf") {
			dnfCount++;
		}
	}

	if (dnfCount > 1) {
		var avg = {
			time: Math.pow(2, 53) - 1, // or 0
			string: "DNF"
		}
		ao5s.push(avg);

	} else if (dnfCount === 1) {

		var maxI = 0;
		var minI = 0;
		var avg = {
			time: 0,
			string: ""
		}

		for (let i = 0; i < 5; i++) {
			if (arr[i].pen === "dnf") {
				maxI = i;
				break;
			}
		}

		for (let i = 0; i < 5; i++) {
			if (arr[i].pen !== "dnf") {
				minI = i;
				break;
			}
		}

		for (let i = 0; i < 5; i++) {
			if (arr[i].time < arr[minI].time && arr[i].pen !== "dnf") {
				minI = i;
			}
		}

		for (let i = 0; i < 5; i++) {
			if (i !== minI && i !== maxI) {
				avg.time += arr[i].time;
			}
		}
		avg.time /= 3;

		var avgMnt = Math.floor(avg.time / 60);
		var avgSec = Math.round((avg.time % 60) * 100) / 100;

		if (avgMnt == 0) {
			avg.string = avgSec.toFixed(2);

		} else {
			if (avgSec < 10) {
				avg.string = avgMnt + ":0" + avgSec.toFixed(2);

			} else {
				avg.string = avgMnt + ":" + avgSec.toFixed(2);
			}
		}

		ao5s.push(avg);

	} else {

		var copy = [];
		var maxI = 0;
		var minI = 0;
		var avg = {
			time: 0,
			string: ""
		}

		for (let i = 0; i < 5; i++) {
			copy.push(arr[i].time);
		}

		copy.sort(compare);

		avg.time = copy[1] + copy[2] + copy[3];
		avg.time /= 3;

		var avgMnt = Math.floor(avg.time / 60);
		var avgSec = Math.round((avg.time % 60) * 100) / 100;

		if (avgMnt == 0) {
			avg.string = avgSec.toFixed(2);

		} else {
			if (avgSec < 10) {
				avg.string = avgMnt + ":0" + avgSec.toFixed(2);

			} else {
				avg.string = avgMnt + ":" + avgSec.toFixed(2);
			}
		}

		ao5s.push(avg);
	}
}

function calcMean(arr, len) {
	var dnfCount = 0;
	var mean = {
		time: 0,
		string: ""
	}

	for (let i = arr.length - 1; i > arr.length - len - 1; i--) {
		if (arr[i].string === "DNF" || arr[i].pen === "dnf") {
			dnfCount++;

		} else {
			mean.time += arr[i].time;
		}
	}

	if (dnfCount === arr.length) {
		mean.string = "DNF";

	} else {
		mean.time /= len - dnfCount;

		var meanMnt = Math.floor(mean.time / 60);
		var meanSec = Math.round((mean.time % 60) * 100) / 100;

		if (meanMnt == 0) {
			mean.string = meanSec.toFixed(2);

		} else {
			if (meanSec < 10) {
				mean.string = meanMnt + ":0" + meanSec.toFixed(2);

			} else {
				mean.string = meanMnt + ":" + meanSec.toFixed(2);
			}
		}
	}

	return mean;
}

function compare(truoc, sau) {
	return truoc - sau;
}
