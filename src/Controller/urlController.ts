import { Request, Response } from "express";
import Url from '../Models/urlModel.js';
import urlFeature from "../utils/urlFeature.js";
import createShort from "../utils/createShort.js";

class urlController{
  urlRender(req : Request, res : Response){
    res.render('index');
  }
  async shortUrlMaker(req : Request, res : Response){
    const orginUrl : string = req.body.orginUrl;
    try{
      // 確認該網址是否存在
      const urlStatus = await urlFeature.orginUrlStatus(orginUrl);
      if(!urlStatus) throw new Error('網址錯誤')
      // 確認該網址是否縮址過
      const result = await urlFeature.orginUrlCheck(orginUrl);
      console.log(result)
      if(result.length){
        console.log('checked')
        res.status(200).json({
          result,
          message: 'repeat url'
        })
      }else{
        const shortUrl = await createShort();
        const newUrl = await Url.create({orginUrl,shortUrl});
        if(!newUrl) throw newUrl;
        res.status(200).json({
          newUrl,
          message: 'successful treatment'
        })
      }
    }catch(err){
      console.log(err)
    }
  }
  async hrefSwtich(req : Request, res : Response){
    const shortUrl : string = req.params.shortUrl;
    const result : any[] = await Url.find({ shortUrl });
    // 重新導向原始網址
    if(!result.length){
      res.redirect('/');
    }else{
      const orginUrl : string = result[0].orginUrl;
      res.redirect(orginUrl)
    }
  }
}

export default urlController;
