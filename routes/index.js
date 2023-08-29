const express = require('express');
const router = express.Router();

const getPostRoutes = require('./getPosts');
const downloadPostRoutes = require('./downloadPost');
const uploadPostRoutes = require('./uploadPost');

router.use('/', getPostRoutes);

router.use('/', downloadPostRoutes);

router.use('/', uploadPostRoutes);


module.exports = router;