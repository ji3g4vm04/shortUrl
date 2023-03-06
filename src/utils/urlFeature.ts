import Url from '../Models/urlModel.js';

class urlFeature{
  static async orginUrlStatus(orginUrl : string) : Promise<boolean>{
    try{
      const response = await fetch(orginUrl,{
        credentials: 'include',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.status)
      if(response.status === 404){
        throw 'error';
      }
      return true;
    }catch(err){
      return false;
    }
  }
  static async orginUrlCheck(orginUrl : string) : Promise<any>{
    const result = await Url.find({ orginUrl });
    return result;
  }
  static async shortUrlCheck(shortUrl : string) : Promise<any>{
    const result = await Url.find({ shortUrl });
    return result;
  }
}

export default urlFeature;
