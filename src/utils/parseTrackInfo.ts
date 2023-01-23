import ytdl from 'ytdl-core';
import { TrackInfo } from '../types';

export function cleanUpTrackName(trackName: string): string {
	// Strip parentheticals at the end of track name... e.g. Beat It (Original Version), Parallel Jalebi (2019)
	const parenRegEx = /\s\([^)]*\)$/;
	const parenMatches = parenRegEx.exec(trackName);
	if (parenMatches) {
		const cleanedTrackName = trackName.replace(parenMatches[0], '');
		return cleanedTrackName;
	}
	return trackName;
}

export async function parseYoutubeTrackInfo(url: string): Promise<TrackInfo> {
	if (!ytdl.validateURL(url)) {
		throw new Error('Invalid Youtube video URL');
	}

	try {
		const songInfo = await ytdl.getInfo(url);
		const author = songInfo.videoDetails.author.name;
		const title = songInfo.videoDetails.title;

		// If title is in format ARTIST - TRACKNAME, parse info from the title
		const regex = /^(.*?)\s-\s(.*?)$/;
		const matchList = regex.exec(title);
		if (regex.exec(title)) {
			const trackName = matchList[2];
			return {
				url: url,
				artist: matchList[1],
				trackName: cleanUpTrackName(trackName),
			};
		}

		// Otherwise, try to get the artist from the author
		const artistRegex = /^(.*?)\s-\s(Topic)$/;
		const artistMatchList = artistRegex.exec(author);
		if (artistMatchList) {
			return {
				url: url,
				artist: artistMatchList[1],
				trackName: cleanUpTrackName(title),
			};
		}

		// Otherwise, just use video author and title
		return {
			url: url,
			artist: author,
			trackName: cleanUpTrackName(title),
		};
	} catch (error) {
		throw new Error(error);
	}
}

export default async function parseTrackInfo(url: string): Promise<TrackInfo> {
	if (url.includes('youtu')) {
		const trackInfo = await parseYoutubeTrackInfo(url);
		return trackInfo;
	}
}
