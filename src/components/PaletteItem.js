import React from 'react'
import './PaletteItem.css'
import getContrast from './utility/getContrast'

function PaletteItem(props) {
	let paletteName = props.data.name

	function swatchGenerator() {
		const swatches = []

		for (const color in props.data.colors) {
			let contrastColor = getContrast(props.data.colors[color])
			let colorName, bgColor
			if (props.data.colors[color] === '') {
				contrastColor = 'white'
				bgColor = 'black'
				colorName = 'EMPTY'
			} else {
				colorName = props.data.colors[color]
				bgColor = props.data.colors[color]
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
			)
		}

		return swatches
	}

	return (
		<div className="swatches-wrapper">
			<p>{paletteName}</p>
			{swatchGenerator()}
		</div>
	)
}

export default PaletteItem
