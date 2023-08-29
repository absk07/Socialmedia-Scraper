const uploadVideoFromUrl = require('../utils/cloudinary');

module.exports = {

    uploadInstaPost: async (req, res) => {
        try {
            const { videoUrl } = req.body;
            const result = await uploadVideoFromUrl(videoUrl);
            res.json({
                success: true,
                data: result.url
            });
        } catch (e) {
            // console.log(e);
            res.json({
                error: true,
                message: e.message
            });
        }
    },
    uploadTiktokPost: async (req, res) => {
        try {
            const { videoUrl } = req.body;
            const result = await uploadVideoFromUrl(videoUrl);
            res.json({
                success: true,
                data: result.url
            });
        } catch (e) {
            // console.log(e);
            res.json({
                error: true,
                message: e.message
            });
        }
    },
    uploadYoutubePost: async (req, res) => {
        try {
            const { videoUrl } = req.body;
            const result = await uploadVideoFromUrl(videoUrl);
            res.json({
                success: true,
                data: result.url
            });
        } catch (e) {
            // console.log(e);
            res.json({
                error: true,
                message: e.message
            });
        }
    },

}