import shortUrlCreate from './shortUrl.js';
import urlFeature from './urlFeature.js';

const createShort = async () => {
  const shortUrl : string = shortUrlCreate(5);
  const result = await urlFeature.shortUrl(shortUrl);
  // 若隨機的短網址重複，即回傳 createShort 本身並重新執行
  if(result){
    return createShort()
  }else{
    return shortUrl;
  }
}

export default createShort;
