import React, { useState, useEffect } from 'react';

// KEY = AIzaSyBikKSktaOVOJp35PAezdVFBEPoikRnmcc
// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=ptG2ZhCaflw&key=AIzaSyBikKSktaOVOJp35PAezdVFBEPoikRnmcc
// https://www.youtube.com/watch?v=p7bfOZek9t4

// Components
import Video from '../Video/Video'

function App() {
	const [videos, setVideos] = useState([]);
	const [url, setUrl] = useState('');
	const [errors, setErros] = useState([]);

	const handleOnChange = event => {
		setUrl(event.target.value);
	};

	const getIdFromUrl = urlString => {
		const url = new URL(urlString);
		return url.searchParams.get('v');
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const id = getIdFromUrl(url);
		const video = await getVideoData(id);
		setVideos(prevState => [...prevState, ...[video.items[0]]]);
	};

	const getVideoData = async id => {
		const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyBikKSktaOVOJp35PAezdVFBEPoikRnmcc`);
		const data = await res.json();
		return data;
	};

	return (
		<div className='app'>
			<form
				onSubmit={handleSubmit}>
				<fieldset className='box'>
					<input
						type='url'
						name='url'
						value={url}
						onChange={handleOnChange}
						placeholder='URL of the YouTube Video' />
				</fieldset>
				<fieldset className='box'>
					<button type='submit'>Add to queue!</button>
				</fieldset>
			</form>
			{videos && videos.length > 0 && <Video id={videos[0].id} />}
			{videos && videos.length > 0 &&
				<ul>
					{videos.map(video => {
						return (
							<li key={video.id}><img src={video.snippet.thumbnails.default.url} /></li>
						);
					})}
				</ul>
			}
		</div>
	);
}

export default App;
