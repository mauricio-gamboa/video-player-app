import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';

import Video from './Video';

describe('Video', () => {
	test('renders without crashing (smoke test)', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Video />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	describe('rendering the component', () => {
		let props;

		beforeEach(() => {
			props = {
				id: 'Jne9t8sHpUc',
				videoId: 'Jne9t8sHpUc',
				metaData: {
					artist: 'Alanis',
					title: 'Ironic'
				}
			};
		});

		it('renders the meta data', () => {
			const text = `Playing ${props.metaData.title} by ${props.metaData.artist}`;
			const { container } = render(<Video {...props} />);
			const metaData = container.querySelector('.metaData');
			expect(metaData.textContent).toBe(` ${text} `);
		});
	});
});
