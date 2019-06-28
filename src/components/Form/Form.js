import React, { useState } from 'react';

function Form(props) {
    const { callback } = props;
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErros] = useState([]);

    const getIdFromUrl = urlString => {
        if (!urlString) {
            return false;
        }

        const urlObject = new URL(urlString);
        return urlObject.searchParams.get('v');
    };

    const resetForm = () => {
        setArtist('');
        setTitle('');
        setUrl('');
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (hasErrors()) {
            return;
        }

        const id = getIdFromUrl(url);
        const video = await getVideoData(id);

        resetForm();
        callback(video);
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

    const hasErrors = () => {
        const liveErrors = [];

        // Artist field is empty
        if (!artist) {
            liveErrors.push('Enter the artist name.');
        }

        // Title field is empty
        if (!title) {
            liveErrors.push('Enter the title of the video.');
        }

        // Url field is empty
        if (!url) {
            liveErrors.push('Enter the URL of the video.');
        }

        // URL is not valid
        if (!getIdFromUrl(url)) {
            liveErrors.push('Enter a valid YouTube URL.');
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