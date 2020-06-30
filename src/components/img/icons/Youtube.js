import React from 'react';
import { useSelector } from 'react-redux';
import { SVG } from '../../_styled-components';

function Youtube() {
	const { activePalette, paletteData } = useSelector(state => state);

	SVG.defaultProps = {
		fill:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.social
			],
		fillHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.socialOffset
			],
	};

	return (
		<SVG
			className="social-img"
			alt="youtube"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<title>YouTube icon</title>
			<path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
		</SVG>
	);
}

export default Youtube;
