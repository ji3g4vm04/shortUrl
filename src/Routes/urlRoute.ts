import { Router } from "express";
import urlController from "../Controller/urlController.js";

const router : Router = Router();
const controller = new urlController;


router.route('/').get(controller.urlRender)
                 .post(controller.shortUrlMaker);
                 
router.route('/urls').get(controller.urls);

router.route('/:shortUrl').get(controller.hrefSwtich);


export default router;
