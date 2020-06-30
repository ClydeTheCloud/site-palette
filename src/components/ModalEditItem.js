import React, { useState } from 'react';
import './ModalEditItem.css';

function ModalEditItem(props) {
	const [bg, setBg] = useState(props.bgColor);
	const [colorValue, setColorValue] = useState(bg);
	function handleColorChange(event) {
		setColorValue(event.target.value);
	}

	function setNewColor() {
		setBg(colorValue);
		props.set(colorValue, props.index);
	}

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

	return (
		<div className="swatch-edit-wrapper">
			<div className="swatch-edit-number">{props.index}</div>
			<div
				className="swatch-edit-display"
				style={{
					backgroundColor: bg,
					color: getContrast(bg),
				}}
			>
				{bg}
			</div>
			<input
				type="text"
				className="swatch-edit-input"
				value={colorValue}
				onChange={handleColorChange}
			/>
			<button className="swatch-edit-set-btn" onClick={setNewColor}>
				Set
			</button>
		</div>
	);
}

export default ModalEditItem;
