import Url from '../Models/urlModel.js';

class urlFeature{
  static async orginUrlStatus(orginUrl : string) : Promise<boolean>{
    try{
      const response = await fetch(orginUrl,{
        credentials: 'include',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if(response.status === 404){
        throw 'error';
      }
      return true;
    }catch(err){
      return false;
    }
  }
  static async orginUrl(orginUrl : string) : Promise<any>{
    const result = await Url.findOne({ orginUrl });
    return result;
  }
  static async shortUrl(shortUrl : string) : Promise<any>{
    const result = await Url.findOne({ shortUrl });
    return result;
  }
}

export default urlFeature;
