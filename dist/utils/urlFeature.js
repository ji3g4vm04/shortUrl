import Url from '../Models/urlModel.js';
class urlFeature {
    static orginUrlCheck(orginUrl) {
        const result = Url.find({ orginUrl });
        return result;
    }
    static shortUrlCheck(shortUrl) {
        const result = Url.find({ shortUrl });
        return result;
    }
}
export default urlFeature;
//# sourceMappingURL=urlFeature.js.map