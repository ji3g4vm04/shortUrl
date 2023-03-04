import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const password = process.env.DATABASE_PASSWORD;
const dbUrl = process.env.DATABASE.replace('<password>', password);
mongoose.connect(dbUrl);
const db = mongoose.connection;
export default db;
//# sourceMappingURL=mongoose.js.map