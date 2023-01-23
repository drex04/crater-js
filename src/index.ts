import parseTrackInfo from './utils/parseTrackInfo';
import validateTrackInfo from './utils/validateTrackInfo';
import getMusicRecc from './utils/getMusicRecc';
export default function crater(): void {
	return;
}

crater.getInfo = parseTrackInfo;

crater.validateInfo = validateTrackInfo;

crater.recommend = getMusicRecc;

module.exports = crater;
