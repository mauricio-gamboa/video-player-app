import React from 'react';

// CSS
import './Thumbnails.scss';

function Thumbnails(props) {
    return (
        <div className='thumbnails'>
            {props.videos.map((video, index) => {
                if (index === 0) {
                    return null
                }

                const title = `${video.metaData.title} by ${video.metaData.artist}`;

                return (
                    <div
                        className='thumbnail'
                        key={video.id}>
                        <button
                            title={title}
                            onClick={() => props.handleClick(video.id)}
                            type='button'>
                            <img
                                alt={title}
                                src={video.snippet.thumbnails.default.url} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default Thumbnails;