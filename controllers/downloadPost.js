require('dotenv').config();
const fetch = require('node-fetch');
const { downloadableUrl, processShorts } = require('../utils/yt-downloader');

module.exports = {

    downloadInstagramPosts: async (req, res) => {
        const { videoUrl } = req.body;
        try {
            const root = process.env.ROOT_URL;
            const endpoint = '/instagram/post/details';
            const code = videoUrl.match(/\/p\/([A-Za-z0-9_\-]+)\/?/)[1];
            const params = {
                "code": code,
                "token": process.env.TOKEN
            }
            const queryString = new URLSearchParams(params).toString();
            const url = `${root}${endpoint}?${queryString}`;
            const response = await fetch(url);
            const data = await response.json();
            const reelUrl = {
                url: data?.data?.video_url,
                thumbnail: data?.data?.display_url
            };
            // console.log(reelUrl);
            res.json({
                success: true,
                data: reelUrl
            });
        } catch (e) {
            // console.log(e);
            res.json({
                error: true,
                message: e.message
            });
        }
    },
    downloadTiktokPosts: async (req, res) => {
        const { videoUrl } = req.body;
        try {
            const root = process.env.ROOT_URL;
            const endpoint = '/tt/post/info';
            const params = {
                "url": videoUrl,
                "token": process.env.TOKEN
            }
            const queryString = new URLSearchParams(params).toString();
            const url = `${root}${endpoint}?${queryString}`;
            const response = await fetch(url);
            const data = await response.json();
            const tiktokUrl = {
                url: data?.data[0]?.video?.download_addr?.url_list[0],
                thumbnail: data?.data[0]?.video?.origin_cover?.url_list[0]
            };
            // console.log(tiktokUrl);
            res.json({
                success: true,
                data: tiktokUrl
            });
        } catch (e) {
            console.log(e);
            res.json({
                error: true,
                message: e.message
            });
        }
    },
    downloadYoutubePosts: async (req, res) => {
        const { videoUrl } = req.body;
        const vidId = videoUrl.match(/\/shorts\/([A-Za-z0-9_\-]+)/)[1];
        try {
            const root = process.env.ROOT_URL;
            const endpoint = '/youtube/channel/get-short-stats';
            const params = {
                "id": vidId,
                "token": process.env.TOKEN
            }
            const queryString = new URLSearchParams(params).toString();
            const url = `${root}${endpoint}?${queryString}`;
            const response = await fetch(url);
            const shortInfo = await response.json();
            const channelUsername =  shortInfo?.data?.reelPlayerHeaderSupportedRenderers?.reelPlayerHeaderRenderer?.channelNavigationEndpoint?.commandMetadata?.webCommandMetadata?.url?.split('@')[1];
            // console.log(channelUsername)
            const endpoint1 = '/youtube/channel/name-to-id';
            const params1 = {
                "name": channelUsername,
                "token": process.env.TOKEN
            }
            const queryString1 = new URLSearchParams(params1).toString();
            const url1 = `${root}${endpoint1}?${queryString1}`;
            const response1 = await fetch(url1);
            const channelId = await response1.json();

            const endpoint2 = '/youtube/channel/shorts';
            const params2 = {
                "browseId": channelId?.data,
                "depth": 50,
                "token": process.env.TOKEN
            }
            const queryString2 = new URLSearchParams(params2).toString();
            const url2 = `${root}${endpoint2}?${queryString2}`;
            const response2 = await fetch(url2);
            const data = await response2.json();
            processShorts(data, vidId)
            .then(result => {
                // console.log(result);
                res.json({
                    success: true,
                    data: result
                });
            })
            .catch(e => {
                throw Error(e.message);
            });
        } catch (e) {
            // console.log(e);
            res.json({
                error: true,
                message: e.message
            });
        }
    }

}