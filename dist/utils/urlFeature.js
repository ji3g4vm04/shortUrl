import Url from '../Models/urlModel.js';
import fetch from 'node-fetch';
class urlFeature {
    static async orginUrlStatus(orginUrl) {
        try {
            const response = await fetch(orginUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 404) {
                throw 'error';
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
    static async orginUrl(orginUrl) {
        const result = await Url.findOne({ orginUrl });
        return result;
    }
    static async shortUrl(shortUrl) {
        const result = await Url.findOne({ shortUrl });
        return result;
    }
}
export default urlFeature;
//# sourceMappingURL=urlFeature.js.map