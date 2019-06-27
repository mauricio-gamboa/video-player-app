import React, { useEffect } from 'react';

function Video(props) {
    useEffect(() => {
        if (!window.YT) {
            // This code loads the IFrame Player API code asynchronously.
            // https://developers.google.com/youtube/iframe_api_reference
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = function () {
            createPlayer(props.id);
        }
    }, []);

    const createPlayer = id => {
        new window.YT.Player(`youtube-player-${id}`, {
            videoId: id,
            events: {
                onReady: onPlayerReady
            }
        });
    };

    const onPlayerReady = event => {
        event.target.playVideo();
    };

    return (<div id={`youtube-player-${props.id}`} />);
}

export default Video;