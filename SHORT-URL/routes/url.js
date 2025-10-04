const express = require('express')
const router = express.Router();
const { handleGenerateNewShortUrl, handleSetUrl, handleGetAnalytics } = require('../controller/url')

router.post('/', handleGenerateNewShortUrl);
router.get('/:shortId',handleSetUrl )

router.get('/analytics/:shortId',handleGetAnalytics )



module.exports = router;
