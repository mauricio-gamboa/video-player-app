import React from 'react';
import ReactDOM from 'react-dom';
import Video from './Video';

describe('Video', () => {
	test('renders without crashing (smoke test)', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Video />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
