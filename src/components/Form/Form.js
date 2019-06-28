import React, { useState, useEffect } from 'react';

function Form(props) {
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [errors, setErros] = useState([]);

    useEffect(() => {
        const getIdFromUrl = () => {
            if (!url) {
                return false;
            }

            const urlObject = new URL(url);
            return urlObject.searchParams.get('v');
        };

        const id = getIdFromUrl();

        if (id) {
            setVideoId(id);
        }
    }, [url]);

    const resetForm = () => {
        setArtist('');
        setTitle('');
        setUrl('');
        setVideoId('');
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (hasErrors()) {
            return;
        }

        const video = await getVideoData(videoId);

        resetForm();
        props.callback(video);
    };

    const getVideoData = async id => {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyBikKSktaOVOJp35PAezdVFBEPoikRnmcc`);
        const data = await res.json();
        insertMetaData(data);
        return insertMetaData(data);
    };

    const insertMetaData = data => {
        const newData = Object.assign({}, data);

        newData.items[0].metaData = {
            artist: artist,
            title: title
        };

        return newData;
    };

    const isAlreadyinQueue = () => {
        return props.videos.findIndex(video => video.id === videoId) !== -1;
    }

    const hasErrors = () => {
        const liveErrors = [];

        if (!artist) {
            liveErrors.push('Enter the artist name.');
        }

        if (!title) {
            liveErrors.push('Enter the title of the video.');
        }

        if (!url) {
            liveErrors.push('Enter the URL of the video.');
        }

        if (url && !videoId) {
            liveErrors.push('Enter a valid YouTube URL.');
        }

        if (videoId && isAlreadyinQueue()) {
            liveErrors.push('The videos is already in the queue.');
        }

        setErros(liveErrors);

        return liveErrors.length > 0;
    };

    return (
        <form
            onSubmit={event => handleSubmit(event)}>
            <fieldset className='box'>
                <input
                    type='text'
                    name='artist'
                    value={artist}
                    onChange={event => setArtist(event.target.value)}
                    placeholder='Artist' />
            </fieldset>
            <fieldset className='box'>
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    placeholder='Title' />
            </fieldset>
            <fieldset className='box'>
                <input
                    type='url'
                    name='url'
                    value={url}
                    onChange={event => setUrl(event.target.value)}
                    placeholder='URL of the YouTube Video' />
            </fieldset>
            <fieldset className='box'>
                <button type='submit'>Add to queue!</button>
            </fieldset>
            {errors.length > 0 && errors.map(error => <p>{error}</p>)}
        </form>
    );
}

export default Form;