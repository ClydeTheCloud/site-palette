import React from 'react';
import './PaletteItem.css';

function PaletteItem(props) {
	let paletteName = props.data.name;

	function getContrast(hexcolor) {
		hexcolor = hexcolor.slice(1);

		// Convert to RGB value
		const r = parseInt(hexcolor.substr(0, 2), 16);
		const g = parseInt(hexcolor.substr(2, 2), 16);
		const b = parseInt(hexcolor.substr(4, 2), 16);

		// Get YIQ ratio
		const yiq = (r * 299 + g * 587 + b * 114) / 1000;

		// Check contrast
		return yiq >= 128 ? 'black' : 'white';
	}

	function swatchGenerator() {
		const swatches = [];

		for (const color in props.data.colors) {
			let contrastColor = getContrast(props.data.colors[color]);
			let colorName, bgColor;
			if (props.data.colors[color] === '') {
				contrastColor = 'white';
				bgColor = 'black';
				colorName = 'EMPTY';
			} else {
				colorName = props.data.colors[color];
				bgColor = props.data.colors[color];
			}
			swatches.push(
				<div
					key={swatches.length}
					className="swatch"
					style={{
						backgroundColor: bgColor,
						color: contrastColor,
					}}
				>
					{swatches.length + 1}: {colorName}
				</div>
			);
		}

		return swatches;
	}

	return (
		<div className="swatches-wrapper">
			<p>{paletteName}</p>
			{swatchGenerator()}
		</div>
	);
}

export default PaletteItem;
