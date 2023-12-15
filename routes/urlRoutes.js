const express=require("express");
const router=express.Router();

const urlController=require("../controllers/url");

router.get('/',urlController.getAllUrls);
router.post('/',urlController.handleGenerateShortUrl);
router.get('/:shortId',urlController.redirectToUrl);
router.get('/analytics/:shortId',urlController.getAnalytics);

module.exports=router;