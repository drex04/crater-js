export type Curator = 'nts' | 'spotify' | '1001tracklists';

export type Curators = Curator[];

export type OutputService = 'youtube' | 'spotify';

export type NumberOfResults = 1 | 2 | 3 | 4 | 5;

export type Options = {
	// Desired sources of music recommendation data
	curator: Curators;
	outputService: OutputService;
	numberOfResults: NumberOfResults;
};

export type TrackInfo = {
	url: string;
	artist: string;
	trackName: string;
};
