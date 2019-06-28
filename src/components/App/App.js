import React, { useState } from 'react';

// Components
import Form from '../Form/Form';
import Video from '../Video/Video';
import Thumbnails from '../Thumbnails/Thumbnails';

function App() {
	const [videos, setVideos] = useState([]);

	const handleThumbnailClick = id => {
		const newVideos = [...videos];
		const videoPosition = videos.findIndex(video => video.id === id);
		const video = newVideos[videoPosition];

		newVideos.splice(videoPosition, 1);
		newVideos.splice(0, 1, video);

		setVideos(newVideos);
	};

	const handleSubmit = video => {
		setVideos(prevState => [...prevState, ...[video.items[0]]]);
	};

	const onVideoEnd = event => {
		const VIDEO_ENDED = 0;

		if (event.data === VIDEO_ENDED) {
			setVideos(prevState => {
				const newVideos = [...prevState];

				if (newVideos.length >= 1) {
					newVideos.shift();
				}

				return newVideos;
			});
		}
	};

	const hasVideos = videos && videos.length > 0;
	const hasQueue = videos && videos.length > 1;

	return (
		<div className='app'>
			<p>https://www.youtube.com/watch?v=p7bfOZek9t4</p>
			<p>https://www.youtube.com/watch?v=QYh6mYIJG2Y</p>
			<p>https://www.youtube.com/watch?v=ptG2ZhCaflw</p>

			<Form
				videos={videos}
				callback={handleSubmit} />

			{hasVideos &&
				<Video
					id={videos[0].id}
					videoId={videos[0].id}
					metaData={videos[0].metaData}
					onStateChange={onVideoEnd} />
			}

			{hasQueue &&
				<Thumbnails
					videos={videos}
					handleClick={handleThumbnailClick} />
			}
		</div>
	);
}

export default App;
