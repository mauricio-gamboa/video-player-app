import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';

import Thumbnails from './Thumbnails';

describe('Thumbnails', () => {
	test('renders without crashing (smoke test)', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Thumbnails />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	describe('rendering component', () => {
		let props;

		beforeEach(() => {
			props = {
				handleClick: jest.fn(),
				videos: [
					{
						id: 'Jne9t8sHpUc',
						snippet: {
							thumbnails: {
								default: {
									url: 'https://i.ytimg.com/vi/Jne9t8sHpUc/default.jpg',
								}
							}
						},
						metaData: {
							artist: 'Alanis',
							title: 'Ironic'
						}
					},
					{
						id: 'asdfasdasd',
						snippet: {
							thumbnails: {
								default: {
									url: 'https://i.ytimg.com/vi/Jne9t8sHpUc/default.jpg',
								}
							}
						},
						metaData: {
							artist: 'Rosalia',
							title: 'Con Altura'
						}
					}
				]
			}
		});

		test('calls the handleClick prop', () => {
			const { container } = render(<Thumbnails {...props} />);
			const button = container.querySelector('button');
			fireEvent.click(button);
			expect(props.handleClick).toHaveBeenCalledTimes(1);
		});

		test('does not render a thumbnail if there is only one video', () => {
			props.videos.length = 1;
			const { container } = render(<Thumbnails {...props} />);
			const thumbnail = container.querySelector('.thumbnail');
			expect(thumbnail).toBe(null);
		});

		test('adds title to button', () => {
			const title = `${props.videos[1].metaData.title} by ${props.videos[1].metaData.artist}`;
			const { container } = render(<Thumbnails {...props} />);
			const button = container.querySelector('button');
			expect(button).toHaveAttribute('title', title);
		});

		test('adds alt to image', () => {
			const title = `${props.videos[1].metaData.title} by ${props.videos[1].metaData.artist}`;
			const { container } = render(<Thumbnails {...props} />);
			const img = container.querySelector('img');
			expect(img).toHaveAttribute('alt', title);
		});

		test('adds src to image', () => {
			const { container } = render(<Thumbnails {...props} />);
			const img = container.querySelector('img');
			expect(img).toHaveAttribute('src', props.videos[1].snippet.thumbnails.default.url);
		});
	});
});
