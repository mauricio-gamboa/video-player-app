import React from 'react';
import youTubePlayer from 'youtube-player';

function shouldUpdateVideo(prevProps, props) {
	return prevProps.videoId !== props.videoId;
}

function shouldUpdatePlayer(prevProps, props) {
	return prevProps.id !== props.id;
}

class Video extends React.Component {
	constructor(props) {
		super(props);
		this.container = null;
		this.internalPlayer = null;
	}

	componentDidMount() {
		this.createPlayer();
	}

	componentDidUpdate(prevProps) {
		if (shouldUpdatePlayer(prevProps, this.props)) {
			this.updatePlayer();
		}

		if (shouldUpdateVideo(prevProps, this.props)) {
			this.updateVideo();
		}
	}

	componentWillUnmount() {
		this.internalPlayer.destroy();
	}

	createPlayer = () => {
		const options = {
			videoId: this.props.videoId,
			playerVars: {
				autoplay: 1
			}
		};

		this.internalPlayer = youTubePlayer(this.container, options);
		this.internalPlayer.on('stateChange', this.props.onStateChange);
	};

	updatePlayer = () => {
		this.internalPlayer.getIframe().then(iframe => {
			if (this.props.id) {
				iframe.setAttribute('id', this.props.id);
			} else {
				iframe.removeAttribute('id');
			}
		});
	};

	updateVideo = () => {
		this.internalPlayer.loadVideoById({
			videoId: this.props.videoId
		});
	};

	render() {
		return (
			<div>
				<p>Title: {this.props.metaData.title}</p>
				<p>Artists: {this.props.metaData.artist}</p>
				<div id={this.props.id} ref={container => this.container = container} />
			</div>
		);
	}
}

export default Video;