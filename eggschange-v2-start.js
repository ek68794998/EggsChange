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

		var $stats = $('#egg-stats .egg-stat'),
		    $actions = $('#egg-actions .egg-action');
		var allStatsFull = $('#egg-stats .egg-empty').length === 0,
		    isPrivateBeta = $stats.length == 2,
		    isGraduated = $('#egg-stat-traffic').length > 0,
		    vote = undefined;
		var statMap = {
			questions: 'ask',
			answers: 'answer',
			quality: 'downvote',
			users: 'upvote',
		};

		// Constants
		var warningErrorThreshold = (isPrivateBeta ? 3 : 2) - $('#egg-stats .egg-bad-stat').length + 1;

		// Tier 1: Game over
		if ($actions.length == 1 && $actions.first().find('button') == 'Restart') {
			// If the only option is restart, do it.
			vote = $actions.first().attr('id').replace(/^egg-action-/, '');
			console.log('Voting to restart');
		}

		// Tier 2: Update levels, warning counts, and check if anything is desperately failing and requires a vote.
		if (!vote) {
			for (var key in levels) {
				levels[key][levels[key].length] = $('#egg-stat-' + key + ' .egg-full').length;

				if ($('#egg-stat-' + key).hasClass('egg-bad-stat')) {
					warnings[key]++;
				} else {
					warnings[key] = 0;
				}

				if (warnings[key] >= warningErrorThreshold && key in statMap) {
					vote = statMap[key];
					break;
				}
			}
		}

		if (!vote) {
			 if ($('#egg-action-restartdecline').length > 0) {
				// Otherwise, if we can decline a restart, do it.
				vote = 'restartdecline';
				console.log('Voting to not restart');
			} else if (isPrivateBeta && allStatsFull) {
				// Otherwise, if we're in beta and both stats are full, then alternate
				if (previousVote == 'ask') {
					vote = 'answer';
				}
			} else {
				// Otherwise, pick the optimal stat in order from statMap
				for (var stat in statMap) {
					var action = statMap[stat];
					var eggsMissing = $('#egg-stat-' + stat + ' .egg-empty').length;
					if (eggsMissing > 0) {
						vote = action;
						break;
					}
				}
				console.log('Voting for:', $('#egg-action-' + vote + ' button').text());
			}
		}

		if (!vote) {
			vote = (isGraduated ? 'downvote' : 'ask');
		}

		previousVote = vote;

		$('.egg-action button').css('color', '');
		$('#egg-action-' + vote + ' button').css('color', 'white').click();
	}

	previousCounter = counter;
}

setInterval(checkEggs, 1000);
