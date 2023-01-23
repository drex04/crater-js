import assert from 'node:assert/strict';

import {
	cleanUpTrackName,
	parseYoutubeTrackInfo,
} from '../src/utils/parseTrackInfo';

describe('cleanUpTrackName()', () => {
	const trackNames = [
		['Parallel Jalebi (2019)', 'Parallel Jalebi'],
		["This Is Why I'm Hot (Original Mix)", "This Is Why I'm Hot"],
		['Man! (I Feel Like a Woman) (2002)', 'Man! (I Feel Like a Woman)'],
		['Some Sunsick Day [OFFICIAL VIDEO]', 'Some Sunsick Day'],
		['Elokishini [Feat. Daliwonga] (Visualiser)', 'Elokishini'],
		[
			'Sem Perceber (Ao Vivo) Feat. Pixote',
			'Sem Perceber (Ao Vivo) Feat. Pixote',
		],
		['Grafts (full 12")', 'Grafts'],
	];
	for (const [input, expected] of trackNames) {
		it(`removes parentheticals from the end of track name "${input}"`, () => {
			assert.equal(cleanUpTrackName(input), expected);
		});
	}
});

describe('parseYoutubeInfo()', () => {
	const youtubeUrls = [
		[
			'https://www.youtube.com/watch?v=nFk20L7MrDw&ab_channel=KaytranadaVEVO',
			'KAYTRANADA, Anderson .Paak',
			'Twin Flame',
		],
		[
			'https://www.youtube.com/watch?v=xPMucX6Gkfw&list=OLAK5uy_k0GrzqoJGFrlMTXzRkph11VKvfm41q6XY&ab_channel=FourTet-Topic',
			'Four Tet',
			'Hands',
		],
		[
			'https://www.youtube.com/watch?v=SmJNEzlFmYM&ab_channel=SoulConnection-Topic',
			'Soul Connection',
			'Change / Love',
		],
		[
			'https://www.youtube.com/watch?v=vhTWI1BM-wk&ab_channel=SeriousPenguin',
			'Kara-Lis Coverdale',
			'Grafts',
		],
	];
	for (const [url, expectedArtist, expectedTrackName] of youtubeUrls) {
		it('parses artist and track name from youtube URL', async () => {
			const { artist, trackName } = await parseYoutubeTrackInfo(url);
			assert.equal(artist, expectedArtist);
			assert.equal(trackName, expectedTrackName);
		});
	}
});
