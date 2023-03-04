import Url from '../Models/urlModel.js';

class urlFeature{
  static async orginUrlStatus(orginUrl : string){
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
  static orginUrlCheck(orginUrl : string) : any{
    const result = Url.find({ orginUrl });
    return result;
  }
  static shortUrlCheck(shortUrl : string) : any{
    const result = Url.find({ shortUrl });
    return result;
  }
}

export default urlFeature;
