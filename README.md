# EggsChange

A JavaScript snippet which implements a slightly better-than-naive solution to win the StackEgg contest in approximately 275 days (far from the best solutions under 230 days). It was initially designed to provide a consistent strategy to overcome raids.

![The StackEgg game.](http://i.imgur.com/ZFHArx3.png)

It is based on the [first consistent strategy discovered](http://gaming.stackexchange.com/a/211951), though was eventually tweaked to favor Quality over Questions (if the hearts were all full), among other minor tweaks. It was also fitted to handle automatic restarting, and resistance to raids by always declining a restart vote.

This script was best run using something like [CJS](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) or TamperMonkey.

## Files

The primary file which was used most, and which was the last stable revision, is `eggschange.js`. Other files which may have been used to gather data or develop new strategies have been provided here for legacy sake (and are obviously not guaranteed to be bug free).

## Disclaimer

The game will most likely be removed on April 2, 2015, so... yeah. It's not like there was any point to this.