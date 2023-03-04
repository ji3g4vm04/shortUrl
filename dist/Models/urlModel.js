import { Schema, model } from "mongoose";
const urlSchema = new Schema({
    orginUrl: {
        type: String,
        require: true
    },
    shortUrl: {
        type: String,
        require: true
    }
});
export default model('ShortUrl', urlSchema);
//# sourceMappingURL=urlModel.js.map