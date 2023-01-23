import assert from 'node:assert/strict';
import crater from '../src/index';
import {
	cleanUpTrackName,
	parseYoutubeTrackInfo,
} from '../src/utils/parseTrackInfo';
import validateTrackInfo from '../src/utils/validateTrackInfo';

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

describe('cleanUpTrackName()', () => {
	for (const [input, expected] of trackNames) {
		it(`removes parentheticals from the end of track name "${input}"`, () => {
			assert.equal(cleanUpTrackName(input), expected);
		});
	}
});

describe('parseYoutubeInfo()', () => {
	for (const [url, expectedArtist, expectedTrackName] of youtubeUrls) {
		it('parses artist and track name from youtube URL', async () => {
			const { artist, trackName } = await parseYoutubeTrackInfo(url);
			assert.equal(artist, expectedArtist);
			assert.equal(trackName, expectedTrackName);
		});
	}
});
describe('crater.getInfo()', () => {
	for (const [url, expectedArtist, expectedTrackName] of youtubeUrls) {
		it('parses artist and track name from youtube URL', async () => {
			const { artist, trackName } = await crater.getInfo(url);
			assert.equal(artist, expectedArtist);
			assert.equal(trackName, expectedTrackName);
		});
	}
});

describe('validateTrackInfo()', () => {
	it.only('checks if the track and artist names are valid', async () => {
		const trackInfo = {
			url: 'https://www.youtube.com/watch?v=xPMucX6Gkfw&list=OLAK5uy_k0GrzqoJGFrlMTXzRkph11VKvfm41q6XY&ab_channel=FourTet-Topic',
			artist: 'Four Tet',
			trackName: 'Hands',
		};
		const isValid = await validateTrackInfo(trackInfo);
		assert(isValid);
	});
});
