import { Schema, model } from "mongoose";

interface Iurl {
  orginUrl: string;
  shortUrl: string;
}

const urlSchema = new Schema<Iurl>({
  orginUrl:{
    type : String,
    require : true
  },
  shortUrl : {
    type : String,
    require : true 
  }
})

export default model<Iurl>('ShortUrl',urlSchema);
