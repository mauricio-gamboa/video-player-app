const ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=';
const KEY = 'AIzaSyBikKSktaOVOJp35PAezdVFBEPoikRnmcc';

const getVideo = async id => {
    const res = await fetch(`${ENDPOINT_URL}${id}&key=${KEY}`);
    const data = await res.json();
    return data;
};

export default getVideo;