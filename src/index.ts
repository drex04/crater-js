import parseTrackInfo from './utils/parseTrackInfo';
import { Options, Curators, OutputService, NumberOfResults } from './types';

const defaultOptions = {
	curator: <Curators>['nts'],
	outputService: <OutputService>'youtube',
	numberOfResults: <NumberOfResults>1,
};

const crater = (url: string, options: Options = defaultOptions) => {
	return { url, options };
};

module.exports = crater;

crater.getInfo = parseTrackInfo;
