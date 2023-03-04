import Url from '../Models/urlModel.js';
import urlFeature from "../utils/urlFeature.js";
import createShort from "../utils/createShort.js";
class urlController {
    urlRender(req, res) {
        res.render('index');
    }
    async shortUrlMaker(req, res) {
        const orginUrl = req.body.orginUrl;
        try {
            // 確認該網址是否縮址過
            const result = await urlFeature.orginUrlCheck(orginUrl);
            console.log(result);
            if (result.length) {
                console.log('checked');
                res.status(200).json({
                    result,
                    message: 'repeat url'
                });
            }
            else {
                const shortUrl = await createShort();
                const newUrl = await Url.create({ orginUrl, shortUrl });
                if (!newUrl)
                    throw newUrl;
                res.status(200).json({
                    newUrl,
                    message: 'successful treatment'
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
export default urlController;
//# sourceMappingURL=urlController.js.map