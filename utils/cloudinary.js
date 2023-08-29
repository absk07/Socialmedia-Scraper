require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadVideoFromUrl = async (videoUrl) => {
    try {
        const result = await cloudinary.uploader.upload(videoUrl, {
            folder: 'social-media-posts',
            resource_type: 'video'
        });
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = uploadVideoFromUrl;
