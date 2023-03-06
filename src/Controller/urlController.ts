import { Request, Response } from "express";
import Url from '../Models/urlModel.js';
import urlFeature from "../utils/urlFeature.js";
import createShort from "../utils/createShort.js";

class urlController{
  urlRender(req : Request, res : Response){
    res.render('index');
  }
  async shortUrlMaker(req : Request, res : Response){
    console.log(req.body);
    const orginUrl : string = req.body.orginUrl;
    try{
      // 確認該網址是否存在
      const urlStatus : boolean = await urlFeature.orginUrlStatus(orginUrl);
      if(!urlStatus){
        const error : any = [
          '錯誤的網址，請再次確認。',
          {
            message: '錯誤的網址，請再次確認。',
            status: 'fail'
          }
      ]
        throw new Error(error)
      }
      // 確認該網址是否縮址過
      const result = await urlFeature.orginUrlCheck(orginUrl);
      console.log(result)
      if(result.length){
        console.log('checked')
        res.status(200).json({
          result,
          message: 'repeat url',
          status: 'success'
        })
      }else{
        const shortUrl = await createShort();
        const newUrl = await Url.create({orginUrl,shortUrl});
        if(!newUrl) throw newUrl;
        res.status(200).json({
          status: 'success',
          newUrl,
          message: 'successful treatment'
        })
      }
    }catch(err : any){
      console.log(err)
      res.status(404).json({
        message: 'Woops! Something went wrong.',
        status: 'fail'
      });
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
