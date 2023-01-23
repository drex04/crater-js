import { Options, Curators, OutputService, NumberOfResults } from '../types';

const defaultOptions = {
	curator: <Curators>['nts'],
	outputService: <OutputService>'youtube',
	numberOfResults: <NumberOfResults>1,
};

export default function getMusicRecc(
	url: string,
	options: Options = defaultOptions
): string {
	if (options.curator.includes('nts')) {
		if (options.outputService.includes('youtube')) {
			const youtubeUrl = '';
			return youtubeUrl;
		}
	}
}
