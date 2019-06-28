import React, { useState, useEffect } from 'react';

// CSS
import './App.scss';

// Components
import Form from '../Form/Form';
import Video from '../Video/Video';
import Thumbnails from '../Thumbnails/Thumbnails';

// Services
import {
	getItem,
	setItem
} from '../../services/store';

function App() {
	const [videos, setVideos] = useState(() => getItem('videos'));

	useEffect(() => {
		setItem('videos', videos)
	}, [videos]);

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
			<Form
				videos={videos}
				callback={handleSubmit} />

			{!hasVideos &&
				<div className='empty'>
					Start adding your favorite videos! 
					{' '}
					<i className='fab fa-youtube'></i>
				</div>
			}

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