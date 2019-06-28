import React, { useState, useEffect } from 'react';

// CSS
import './Form.scss';

// Services
import getVideo from '../../services/api';

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

            let id;

            try {
                const urlObject = new URL(url);
                id = urlObject.searchParams.get('v');
            } catch (error) {
                id = '';
            }

            return id;
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

        const video = await getVideo(videoId);
        const videoWithMetaData = insertMetaData(video);
        props.callback(videoWithMetaData);
        resetForm();
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

        if (!title) {
            liveErrors.push('Enter the title of the video.');
        }

        if (!artist) {
            liveErrors.push('Enter the name of the artist.');
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
            className='form'
            onSubmit={event => handleSubmit(event)}>
            <div className='row'>
                <div className='col'>
                    <input
                        className='input'
                        type='text'
                        name='title'
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        placeholder='Title' />
                </div>
                <div className='col'>
                    <input
                        className='input'
                        type='text'
                        name='artist'
                        value={artist}
                        onChange={event => setArtist(event.target.value)}
                        placeholder='Artist' />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <input
                        className='input'
                        type='url'
                        name='url'
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                        placeholder='URL of the YouTube Video' />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <button className='button' type='submit'>
                        Add video to the list!
                        {' '}
                        <i className='fas fa-list'></i>
                    </button>
                </div>
            </div>
            {errors.length > 0 &&
                <div className='errors'>
                    {errors.map((error, index) => <p key={index}>{`- ${error}`}</p>)}
                </div>
            }
        </form>
    );
}

export default Form;