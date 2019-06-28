import React from 'react';

function Thumbnails(props) {
    return (
        <ul>
            {props.videos.map((video, index) => {
                if (index === 0) {
                    return null
                };

                return (
                    <li key={video.id}>
                        <button
                            onClick={() => props.handleClick(video.id)}
                            type='button'>
                            <img alt='' src={video.snippet.thumbnails.default.url} />
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default Thumbnails;