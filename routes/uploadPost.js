const express = require('express');
const router = express.Router();

const { uploadInstaPost, uploadTiktokPost, uploadYoutubePost } = require('../controllers/uploadPost');

router.post('/instagram/upload-post', uploadInstaPost);

router.post('/tiktok/upload-post', uploadTiktokPost);

router.post('/youtube/upload-post', uploadYoutubePost);

module.exports = router;
