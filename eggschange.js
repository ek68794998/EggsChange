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
		var $badStats = $('#egg-stats .egg-bad-stat'),
		    $stats = $('#egg-stats .egg-stat'),
		    $actions = $('#egg-actions .egg-action');
		var allStatsFull = $('#egg-stats .egg-empty').length === 0,
		    isPrivateBeta = $stats.length == 2,
		    isGraduated = $('#egg-stat-traffic').length > 0,
		    vote = (isGraduated ? 'downvote' : 'ask');
		var statMap = {
			questions: 'ask',
			answers: 'answer',
			quality: 'downvote',
			users: 'upvote',
		};

		if ($actions.length == 1 && $actions.first().find('button') == 'Restart') {
			// If the only option is restart, do it.
			vote = $actions.first().attr('id').replace(/^egg-action-/, '');
			console.log('Voting to restart');
		} else if ($('#egg-action-restartdecline').length > 0) {
			// Otherwise, if we can decline a restart, do it.
			vote = 'restartdecline';
			console.log('Voting to not restart');
		} else if ($badStats.length > 0) {
			// Otherwise, if there are any bad stats, pick the first one and vote for it.
			vote = statMap[$badStats.first().attr('id').replace(/^egg-stat-/, '')];
			console.log('Voting for bad stat:', $('#egg-action-' + vote + ' button').text());
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

		previousVote = vote;

		$('.egg-action button').css('color', '');
		$('#egg-action-' + vote + ' button').css('color', 'white').click();
	}

	previousCounter = counter;
}

setInterval(checkEggs, 1000);
