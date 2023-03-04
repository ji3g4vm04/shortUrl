import { Router } from "express";
import urlRouter from './urlRoute.js';

const router : Router = Router();

router.use(urlRouter);

export default router;
