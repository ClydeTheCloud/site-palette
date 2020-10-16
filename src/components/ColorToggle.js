import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { nextColor, prevColor } from '../logic/actions'
import './ColorToggle.css'
import getContrast from './utility/getContrast'

function ColorToggle({ section, address, description }) {
	const dispatch = useDispatch()
	const { activePalette, paletteData } = useSelector(state => state)

	const bg = paletteData[activePalette].colors[paletteData[activePalette].addresses[section][address]]

	function togglePrevColor() {
		dispatch(prevColor(section, address))
	}

	function toggleNextColor() {
		dispatch(nextColor(section, address))
	}

	return (
		<div className="toggle-wrapper">
			<p>{description}</p>
			<div className="swatch" style={{ backgroundColor: bg, color: getContrast(bg) }}>
				{bg}
			</div>
			<div className="toggle-navigation">
				<button onClick={togglePrevColor}>{'<'}</button>
				<div>{paletteData[activePalette].addresses[section][address] + 1}</div>
				<button onClick={toggleNextColor}>{'>'}</button>
			</div>
		</div>
	)
}

export default ColorToggle
