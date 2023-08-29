const express = require('express');
const router = express.Router();

const { downloadInstagramPosts, downloadTiktokPosts, downloadYoutubePosts } = require('../controllers/downloadPost');

router.post('/instagram/download-posts', downloadInstagramPosts);

router.post('/tiktok/download-posts', downloadTiktokPosts);

router.post('/youtube/download-posts', downloadYoutubePosts);

module.exports = router;