import Url from '../Models/urlModel.js';
import urlFeature from "../utils/urlFeature.js";
import createShort from "../utils/createShort.js";
class urlController {
    async urlRender(req, res) {
        const urls = await Url.find().lean();
        res.render('index', { urls });
    }
    async urls(req, res) {
        const urls = await Url.find();
        res.status(200).json(urls);
    }
    async shortUrlMaker(req, res) {
        const orginUrl = req.body.orginUrl;
        try {
            // 確認該網址是否存在
            const urlStatus = await urlFeature.orginUrlStatus(orginUrl);
            if (!urlStatus) {
                const error = [
                    '錯誤的網址，請再次確認。',
                    {
                        message: '錯誤的網址，請再次確認。',
                        status: 'fail'
                    }
                ];
                throw new Error(error);
            }
            // 確認該網址是否縮址過
            const result = await urlFeature.orginUrl(orginUrl);
            if (result) {
                res.status(200).json({
                    result,
                    message: 'repeat url',
                    status: 'success'
                });
            }
            else {
                const shortUrl = await createShort();
                const result = await Url.create({ orginUrl, shortUrl });
                if (!result)
                    throw 'Error';
                res.status(200).json({
                    status: 'success',
                    result,
                    message: 'successful treatment'
                });
            }
        }
        catch (err) {
            // 錯誤回傳
            res.status(404).json({
                message: 'Woops! Something went wrong.',
                status: 'fail'
            });
        }
    }
    async hrefSwtich(req, res) {
        const shortUrl = req.params.shortUrl;
        const result = await urlFeature.shortUrl(shortUrl);
        // 重新導向原始網址
        if (!result) {
            res.redirect('/');
        }
        else {
            const orginUrl = result.orginUrl;
            res.redirect(orginUrl);
        }
    }
}
export default urlController;
//# sourceMappingURL=urlController.js.map