const express = require('express');
const router = express.Router();

const { getInstaPosts, getTiktokPosts, getYoutubePosts } = require('../controllers/getPosts');

router.post('/instagram/get-user-posts', getInstaPosts);

router.post('/tiktok/get-user-posts', getTiktokPosts);

router.post('/youtube/get-user-posts', getYoutubePosts);

module.exports = router;