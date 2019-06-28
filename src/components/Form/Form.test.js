import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

describe('Form', () => {
	test('renders without crashing (smoke test)', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Form />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
