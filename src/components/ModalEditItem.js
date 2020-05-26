import React, { useState, useContext, useEffect } from 'react';
import './ModalEditItem.css';
import { PalettesContext } from '../PalettesContext';

function ModalEditItem(props) {
	let context = useContext(PalettesContext);

	const [colorValue, setColorValue] = useState('');
	function handleColorChange(event) {
		setColorValue(event.target.value);
	}

	const [bg, setBg] = useState(props.bgColor);
	const [name, setName] = useState(props.colorName);

	function setNewColor() {
		setBg(colorValue);
		setName(colorValue);
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

	useEffect(() => {
		setColorValue(props.colorName);
	}, []);

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
				{name}
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
