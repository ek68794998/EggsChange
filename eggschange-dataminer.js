var levels = {
	questions: [],
	answers: [],
	quality: [],
	users: [],
	traffic: [],
}

var warnings = {
	questions: 0,
	answers: 0,
	quality: 0,
	users: 0,
	traffic: 0,
}

var globalEnabled = true;
var previousCounter = 0;
var previousVote = '';
var hasCastCloseVote = false;

function checkEggs() {
	var counter = parseInt($('#egg-clock-text').text());

	if (!globalEnabled) {
		return;
	}

	if (counter > previousCounter) {
		// New round

		for (var key in levels) {
			levels[key][levels[key].length] = $('#egg-stat-' + key + ' .egg-full').length;

			if ($('#egg-stat-' + key).hasClass('egg-bad-stat')) {
				warnings[key]++;
			} else {
				warnings[key] = 0;
			}
		}
	}

	previousCounter = counter;
}

setInterval(checkEggs, 1000);
