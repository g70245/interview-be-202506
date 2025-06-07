const fs = require('fs');

async function getPage(url) {
  var response = await fetch(url);
  var data = await response.text();
  console.log(response.ok, response.status, url);
  return data;
}

async function getYoutubeData(youtubeIds) {
  var promises = [];
  for (var i = 0; i < youtubeIds.length; i++) {
    var promise = new Promise(async (resolve, reject) => {
      try {
        var channelURL = `https://www.youtube.com/${youtubeIds[i]}`;
        var channelPage = await getPage(channelURL);

        var videosURL = `https://www.youtube.com/${youtubeIds[i]}/videos`;
        var videosPage = await getPage(videosURL);

        resolve({ channelPage, videosPage });
      } catch (e) {
        reject(e);
      }
    });
    promises.push(promise);
  }
  var results = await Promise.all(promises);
  return results;
}

var youtubeIds = ['@darbbq', '@oojimateru', '@homemeat_clip'];
getYoutubeData(youtubeIds);
