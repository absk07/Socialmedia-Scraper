require('dotenv').config();
const fetch = require('node-fetch');
const { downloadableUrl, processShorts } = require('../utils/yt-downloader');

module.exports = {

    getInstaPosts: async (req, res) => {
        const { username, page = 1 } = req.body;
        try {
            const root = process.env.ROOT_URL;
            const endpoint1 = '/instagram/user/info';
            const params1 = {
                "username": req.body.username,
                "token": process.env.TOKEN
            }
            const queryString1 = new URLSearchParams(params1).toString();
            const url1 = `${root}${endpoint1}?${queryString1}`;
            const response1 = await fetch(url1);
            const user_id = await response1.json();
            

            const endpoint = '/instagram/user/reels';
            const params = {
                "user_id": user_id?.data?.pk,
                "depth": page,
                "include_feed_video": true,
                "token": process.env.TOKEN
            }
            const queryString = new URLSearchParams(params).toString();
            const url = `${root}${endpoint}?${queryString}`;
            const response = await fetch(url);
            const data = await response.json();
            const posts = data?.data?.reels?.map(reel => (
                { 
                    url: reel.media.video_versions[0].url, 
                    thumbnail: reel.media.image_versions2.candidates[0].url 
                }
            ));
            console.log(posts);
            res.json({
                success: true,
                data: posts
            });
        } catch (e) {
            // console.log(e);
            res.json({
                error: true,
                message: e.message
            });
        }
    },
    getTiktokPosts: async (req, res) => {
        const { username, page = 1 } = req.body;
        try {
            const root = process.env.ROOT_URL;
            const endpoint = '/tt/user/posts';
            const params = {
                "username": username,
                "depth": page,
                "token": process.env.TOKEN
            }
            const queryString = new URLSearchParams(params).toString();
            const url = `${root}${endpoint}?${queryString}`;
            const response = await fetch(url);
            const data = await response.json();
            const posts = data?.data?.map(tiktok => (
                { 
                    url: tiktok.video.download_addr.url_list[0],
                    thumbnail: tiktok.video.origin_cover.url_list[0]
                }
            ));
            // console.log(data);
            res.json({
                success: true,
                data: posts
            });
        } catch (e) {
            // console.log(e);
            res.json({
                error: true,
                message: e.message
            });
        }
    },
    getYoutubePosts: async (req, res) => {
        const { username, page = 1 } = req.body;
        try {
            const root = process.env.ROOT_URL;
            const endpoint1 = '/youtube/channel/name-to-id';
            const params1 = {
                "name": username,
                "token": process.env.TOKEN
            }
            const queryString1 = new URLSearchParams(params1).toString();
            const url1 = `${root}${endpoint1}?${queryString1}`;
            const response1 = await fetch(url1);
            const channelId = await response1.json();

            const endpoint2 = '/youtube/channel/shorts';
            const params2 = {
                "browseId": channelId?.data,
                "depth": page,
                "token": process.env.TOKEN
            }
            const queryString2 = new URLSearchParams(params2).toString();
            const url2 = `${root}${endpoint2}?${queryString2}`;
            const response2 = await fetch(url2);
            const data = await response2.json();
            const postsPromises = data?.data?.shorts?.map(async (short) => {
                    const d_url = {
                        url: await downloadableUrl(`http://www.youtube.com${short.richItemRenderer.content.reelItemRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`),
                        thumbnail: short.richItemRenderer.content.reelItemRenderer.thumbnail.thumbnails[0].url
                    };
                    return d_url;
                }
            );
            Promise.all(postsPromises)
            .then(posts => {
                res.json({
                    success: true,
                    data: posts
                });
            }).catch(e => {
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