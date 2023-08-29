const ytdl = require('ytdl-core');

const downloadableUrl = (videoUrl) => {
    return new Promise(async (resolve, reject) => {
        try {
            const info = await ytdl.getInfo(videoUrl);
            const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
            resolve(format.url);
        } catch (error) {
            reject(error);
        }
    });
}

const processShorts = async (data, vidId) => {
    const shortUrl = {};
    for (const short of data?.data?.shorts) {
        if (vidId === short.richItemRenderer.content.reelItemRenderer.videoId) {
            shortUrl.url = await downloadableUrl(`http://www.youtube.com${short.richItemRenderer.content.reelItemRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`);
            shortUrl.thumbnail = short.richItemRenderer.content.reelItemRenderer.thumbnail.thumbnails[0].url;
            break;
        }
    }
    return shortUrl;
};

module.exports = {downloadableUrl, processShorts};


