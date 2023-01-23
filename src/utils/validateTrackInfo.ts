import { TrackInfo } from '../types';
import { LASTFM_API_KEY } from '../config';

export default async function validateTrackInfo(
	trackInfo: TrackInfo
): Promise<boolean> {
	const url = new URL('http://ws.audioscrobbler.com/2.0/');
	const addParams = {
		track: trackInfo.trackName,
		artist: trackInfo.artist,
		api_key: LASTFM_API_KEY,
		method: 'track.search',
		format: 'json',
	};
	const params = new URLSearchParams([...Object.entries(addParams)]);
	const newUrl = new URL(`${url.origin}${url.pathname}?${params}`);

	const response = await fetch(newUrl);
	const data = await response.json();
	const trackMatches = data.results.trackmatches;
	// loop through results and check
	console.log(trackMatches);
	// const data = JSON.parse(response.data);
	return true;
}
