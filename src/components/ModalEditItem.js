import React, { useState } from 'react'
import './ModalEditItem.css'
import getContrast from './utility/getContrast'

function ModalEditItem(props) {
	const [bg, setBg] = useState(props.bgColor)
	const [colorValue, setColorValue] = useState(bg)
	function handleColorChange(event) {
		setColorValue(event.target.value)
	}

	function setNewColor() {
		setBg(colorValue)
		props.set(colorValue, props.index)
	}

	return (
		<div className="swatch-edit-wrapper">
			<div className="swatch-edit-number">{props.index + 1}</div>
			<div
				className="swatch-edit-display"
				style={{
					backgroundColor: bg,
					color: getContrast(bg),
				}}
			>
				{bg}
			</div>
			<input type="text" className="swatch-edit-input" value={colorValue} onChange={handleColorChange} />
			<button className="swatch-edit-set-btn" onClick={setNewColor}>
				Set
			</button>
		</div>
	)
}

export default ModalEditItem
