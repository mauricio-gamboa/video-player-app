import React, { useState, useEffect } from 'react';

function Video(props) {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        console.log('use effect 1');
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

    useEffect(() => {
        console.log('use effect 2');
        if (window.YT) {
            player.loadVideoById(props.id);
        }
    }, [props.id]);

    const createPlayer = id => {
        const player = new window.YT.Player(`youtube-player-${id}`, {
            videoId: id,
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });

        setPlayer(player);
    };

    const onPlayerReady = event => {
        event.target.playVideo();
    };

    const onPlayerStateChange = event => {
        if (event.data === 0) {
            props.videoEndCallBack();
        }
    };

    return (<div id={`youtube-player-${props.id}`} />);
}

export default Video;