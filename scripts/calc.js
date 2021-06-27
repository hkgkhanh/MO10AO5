var avgCount = 10;
var solveCount = 50;

var solveInAvg = 0;
var avg = 0;

var sessionDNFcount = 0;

var ao5s = [];
var mo3s = [];
var ao12s = [];
var mo25s = [];
var ao50s = [];
var mo100s = [];
var ao200s = [];
var mo10ao5s = [];
var nonRollingAo5s = [];

var bestSingleIndex = 0;
var bestMo3Index = 0;
var bestAo5Index = 0;
var bestAo12Index = 0;
var bestAo25Index = 0;
var bestAo50Index = 0;
var bestAo100Index = 0;
var bestAo200Index = 0;
var bestMo10Ao5Index = 0;

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

	calc();

	document.getElementById("table_avgCount").innerHTML = avgCount;
}

function getSolveNumAndAvgNum() {
	solveInAvg = session.length % 5 + 1;
	avg = Math.floor(session.length / 5) + 1;

	//document.getElementById("solveInAvg").innerHTML = solveInAvg;
	//document.getElementById("avg").innerHTML = avg;
}

function calc() {
	getSolveNumAndAvgNum();

	sessionDNFcount = 0;

	sessionMean = {
		time: 0,
		string: "DNF"
	}

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

		// CALC MO3
		mo3s = [];

		if (session.length > 2) {
			for (let i = 0; i < session.length - 2; i++) {

				mo3s.push(calcMean([session[i], session[i + 1], session[i + 2]]));
			}

			for (let i = 0; i < mo3s.length; i++) {
				if (mo3s[i].string !== "DNF") {
					bestMo3Index = i;
					break;
				}
			}

			for (let i = 0; i < mo3s.length; i++) {
				if (mo3s[i].string !== "DNF" && mo3s[i].time < mo3s[bestMo3Index].time) {
					bestMo3Index = i;
				}
			}
		}
		///////////

		// CALC AO5
		ao5s = [];

		if (session.length > 4) {
			for (let i = 0; i < session.length - 4; i++) {

				ao5s.push(calcAoX([session[i], session[i + 1], session[i + 2], session[i + 3], session[i + 4]], 5, 1));
			}

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
		}
		////////////

		// CALC AO12
		ao12s = [];

		if (session.length > 11) {
			for (let i = 0; i < session.length - 11; i++) {

				let arrCalc = [];
				for (let j = 0; j < 12; j++) {
					arrCalc.push(session[i + j]);
				}

				ao12s.push(calcAoX(arrCalc, 12, 1));
			}

			for (let i = 0; i < ao12s.length; i++) {
				if (ao12s[i].string !== "DNF") {
					bestAo12Index = i;
					break;
				}
			}

			for (let i = 0; i < ao12s.length; i++) {
				if (ao12s[i].string !== "DNF" && ao12s[i].time < ao12s[bestAo12Index].time) {
					bestAo12Index = i;
				}
			}
		}
		////////////

		// CALC AO25
		ao25s = [];

		if (session.length > 24) {
			for (let i = 0; i < session.length - 24; i++) {

				let arrCalc = [];
				for (let j = 0; j < 25; j++) {
					arrCalc.push(session[i + j]);
				}

				ao25s.push(calcAoX(arrCalc, 25, 2));
			}

			for (let i = 0; i < ao25s.length; i++) {
				if (ao25s[i].string !== "DNF") {
					bestAo25Index = i;
					break;
				}
			}

			for (let i = 0; i < ao25s.length; i++) {
				if (ao25s[i].string !== "DNF" && ao25s[i].time < ao25s[bestAo25Index].time) {
					bestAo25Index = i;
				}
			}
		}
		////////////

		// CALC AO50
		ao50s = [];

		if (session.length > 49) {
			for (let i = 0; i < session.length - 49; i++) {

				let arrCalc = [];
				for (let j = 0; j < 50; j++) {
					arrCalc.push(session[i + j]);
				}

				ao50s.push(calcAoX(arrCalc, 50, 3));
			}

			for (let i = 0; i < ao50s.length; i++) {
				if (ao50s[i].string !== "DNF") {
					bestAo50Index = i;
					break;
				}
			}

			for (let i = 0; i < ao50s.length; i++) {
				if (ao50s[i].string !== "DNF" && ao50s[i].time < ao50s[bestAo50Index].time) {
					bestAo50Index = i;
				}
			}
		}
		////////////

		// CALC AO100
		ao100s = [];

		if (session.length > 99) {
			for (let i = 0; i < session.length - 99; i++) {

				let arrCalc = [];
				for (let j = 0; j < 100; j++) {
					arrCalc.push(session[i + j]);
				}

				ao100s.push(calcAoX(arrCalc, 100, 5));
			}

			for (let i = 0; i < ao100s.length; i++) {
				if (ao100s[i].string !== "DNF") {
					bestAo100Index = i;
					break;
				}
			}

			for (let i = 0; i < ao100s.length; i++) {
				if (ao100s[i].string !== "DNF" && ao100s[i].time < ao100s[bestAo100Index].time) {
					bestAo100Index = i;
				}
			}
		}
		////////////

		// CALC AO200
		ao200s = [];

		if (session.length > 199) {
			for (let i = 0; i < session.length - 199; i++) {

				let arrCalc = [];
				for (let j = 0; j < 200; j++) {
					arrCalc.push(session[i + j]);
				}

				ao200s.push(calcAoX(arrCalc, 200, 10));
			}

			for (let i = 0; i < ao200s.length; i++) {
				if (ao200s[i].string !== "DNF") {
					bestAo200Index = i;
					break;
				}
			}

			for (let i = 0; i < ao200s.length; i++) {
				if (ao200s[i].string !== "DNF" && ao200s[i].time < ao200s[bestAo200Index].time) {
					bestAo200Index = i;
				}
			}
		}
		////////////

		// CALC SESSION MEAN
		sessionMean.time = calcMeanUncountDNF(session).time;
		sessionMean.string = calcMeanUncountDNF(session).string;
		sessionDNFcount = calcMeanUncountDNF(session).dnfCount;
		///////////

		// CALC MO10AO5
		mo10ao5s = [];
		nonRollingAo5s = [];
		if (session.length >= avgCount * 5) {

			for (let i = 0; i < ao5s.length; i++) {

				if (i % 5 === 0) {
					nonRollingAo5s.push(ao5s[i]);
				}
			}

			//mo10Ao5.time = calcMo10Ao5(nonRollingAo5s, avgCount).time;
			//mo10Ao5.string = calcMo10Ao5(nonRollingAo5s, avgCount).string;
			//mo10ao5s.push(calcMo10Ao5(nonRollingAo5s, avgCount));
			for (let i = 0; i < nonRollingAo5s.length - avgCount + 1; i++) {

				let arrCalc = [];
				for (let j = 0; j < avgCount; j++) {
					arrCalc.push(nonRollingAo5s[i + j]);
				}

				mo10ao5s.push(calcMo10Ao5(arrCalc, avgCount));
			}

			for (let i = 0; i < mo10ao5s.length; i++) {
				if (mo10ao5s[i].string !== "DNF") {
					bestMo10Ao5Index = i;
					break;
				}
			}

			for (let i = 0; i < mo10ao5s.length; i++) {
				if (mo10ao5s[i].string !== "DNF" && mo10ao5s[i].time < mo10ao5s[bestMo10Ao5Index].time) {
					bestMo10Ao5Index = i;
				}
			}
		}
		//////////
	}

	// DISPLAY INTO THE BEST RESULT TABLE
	displayBestResultTable();
}

function calcMean(arr) {
	var dnfCount = 0;
	var mean = {
		time: 0,
		string: ""
	}

	for (let i = 0; i < arr.length; i++) {
		if (arr[i].string === "DNF" || arr[i].pen === "dnf") {
			dnfCount++;

		} else {
			mean.time += arr[i].time;
		}
	}

	if (dnfCount !== 0) {
		mean.string = "DNF";
		mean.time = Math.pow(2, 53) - 1;

	} else {
		mean.time /= arr.length;

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

function calcAoX(arr, X, trim) {
	let dnfCount = 0;
	let avg = {
			time: 0,
			string: ""
		}
	for (let i = 0; i < X; i++) {
		if (arr[i].pen === "dnf") {
			dnfCount++;
		}
	}

	if (dnfCount > trim) {
		avg.time = Math.pow(2, 53) - 1; // or 0
		avg.string = "DNF";

	} else {

		var copy = [];

		for (let i = 0; i < X; i++) {
			copy.push(arr[i].time);
		}

		copy.sort(compare);

		for (let i = 0; i < X; i++) {
			if (i >= trim && i < X - trim) {
				avg.time += copy[i];
			}
		}

		avg.time /= X - trim * 2;

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
	}

	return avg;
}

function calcMeanUncountDNF(arr) {
	var dnfCount = 0;
	var mean = {
		time: 0,
		string: "",
		dnfCount: 0
	}

	for (let i = 0; i < arr.length; i++) {
		if (arr[i].string === "DNF" || arr[i].pen === "dnf") {
			dnfCount++;

		} else {
			mean.time += arr[i].time;
		}
	}

	if (dnfCount === arr.length) {
		mean.string = "DNF";
		mean.time = Math.pow(2, 53) - 1;

	} else {
		mean.time /= arr.length;

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

	mean.dnfCount = dnfCount;

	return mean;
}

function calcMo10Ao5(arr, len) {
	var dnfCount = 0;
	var copy = [];
	var mean = {
		time: 0,
		string: ""
	}

	for (let i = 0; i < len; i++) {
		copy.unshift(arr[arr.length - i - 1]);
	}

	for (let i = 0; i < len; i++) {
		if (copy[i].string === "DNF" || copy[i].pen === "dnf") {
			dnfCount++;

		} else {
			mean.time += copy[i].time;
		}
	}

	if (dnfCount === len) {
		mean.string = "DNF";
		mean.time = Math.pow(2, 53) - 1;

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

function getIndexInOrder(arr, ind) {
	var orderedArr = [];
	for (let i = 0; i < arr.length; i++) { orderedArr.push(i);}

	var swapp;
	var n = arr.length - 1;
	var x = [];
	for (let i = 0; i < arr.length; i++) { x.push(arr[i].time);}

	do {
		swapp = false;
		for (var i = 0; i < n; i++) {
			if (x[i] > x[i + 1]) {
				var temp1 = x[i];
				x[i] = x[i + 1];
				x[i + 1] = temp1;

				var temp2 = orderedArr[i];
				orderedArr[i] = orderedArr[i + 1];
				orderedArr[i + 1] = temp2;

				swapp = true;
			}
		}
		n--;
	} while (swapp);

	return orderedArr[ind];
}

function displayBestResultTable() {
	document.getElementById("cSingle").innerHTML = (session.length > 0) ? session[session.length - 1].string : "-";
	document.getElementById("bSingle").innerHTML = (session.length > 0) ? session[bestSingleIndex].string : "-";
	document.getElementById("cSingle").className = (session.length > 0) ?  "cell" : "";
	document.getElementById("bSingle").className = (session.length > 0) ?  "cell" : "";

	document.getElementById("cMo3").innerHTML = (session.length > 2) ? mo3s[mo3s.length - 1].string : "-";
	document.getElementById("bMo3").innerHTML = (session.length > 2) ? mo3s[bestMo3Index].string : "-";
	document.getElementById("cMo3").className = (session.length > 2) ?  "cell" : "";
	document.getElementById("bMo3").className = (session.length > 2) ?  "cell" : "";

	document.getElementById("cAo5").innerHTML = (session.length > 4) ? ao5s[ao5s.length - 1].string : "-";
	document.getElementById("bAo5").innerHTML = (session.length > 4) ? ao5s[bestAo5Index].string : "-";
	document.getElementById("cAo5").className = (session.length > 4) ?  "cell" : "";
	document.getElementById("bAo5").className = (session.length > 4) ?  "cell" : "";

	document.getElementById("cAo12").innerHTML = (session.length > 11) ? ao12s[ao12s.length - 1].string : "-";
	document.getElementById("bAo12").innerHTML = (session.length > 11) ? ao12s[bestAo12Index].string : "-";
	document.getElementById("cAo12").className = (session.length > 11) ?  "cell" : "";
	document.getElementById("bAo12").className = (session.length > 11) ?  "cell" : "";

	document.getElementById("cAo25").innerHTML = (session.length > 24) ? ao25s[ao25s.length - 1].string : "-";
	document.getElementById("bAo25").innerHTML = (session.length > 24) ? ao25s[bestAo25Index].string : "-";
	document.getElementById("cAo25").className = (session.length > 24) ?  "cell" : "";
	document.getElementById("bAo25").className = (session.length > 24) ?  "cell" : "";

	document.getElementById("cAo50").innerHTML = (session.length > 49) ? ao50s[ao50s.length - 1].string : "-";
	document.getElementById("bAo50").innerHTML = (session.length > 49) ? ao50s[bestAo50Index].string : "-";
	document.getElementById("cAo50").className = (session.length > 49) ?  "cell" : "";
	document.getElementById("bAo50").className = (session.length > 49) ?  "cell" : "";

	document.getElementById("cAo100").innerHTML = (session.length > 99) ? ao100s[ao100s.length - 1].string : "-";
	document.getElementById("bAo100").innerHTML = (session.length > 99) ? ao100s[bestAo100Index].string : "-";
	document.getElementById("cAo100").className = (session.length > 99) ?  "cell" : "";
	document.getElementById("bAo100").className = (session.length > 99) ?  "cell" : "";

	document.getElementById("cAo200").innerHTML = (session.length > 199) ? ao200s[ao200s.length - 1].string : "-";
	document.getElementById("bAo200").innerHTML = (session.length > 199) ? ao200s[bestAo200Index].string : "-";
	document.getElementById("cAo200").className = (session.length > 199) ?  "cell" : "";
	document.getElementById("bAo200").className = (session.length > 199) ?  "cell" : "";

	document.getElementById("cMo10Ao5").innerHTML = (session.length > (avgCount * 5 - 1)) ? mo10ao5s[mo10ao5s.length - 1].string : "-";
	document.getElementById("bMo10Ao5").innerHTML = (session.length > (avgCount * 5 - 1)) ? mo10ao5s[bestMo10Ao5Index].string : "-";
	document.getElementById("cMo10Ao5").className = (session.length > (avgCount * 5 - 1)) ?  "cell" : "";
	document.getElementById("bMo10Ao5").className = (session.length > (avgCount * 5 - 1)) ?  "cell" : "";
}
