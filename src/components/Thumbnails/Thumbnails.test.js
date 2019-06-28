import React from 'react';
import ReactDOM from 'react-dom';
import Thumbnails from './Thumbnails';

describe('Thumbnails', () => {
	test('renders without crashing (smoke test)', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Thumbnails />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
