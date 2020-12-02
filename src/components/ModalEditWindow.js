import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './ModalEditWindow.css'
import ModalEditItem from './ModalEditItem'
import { savePalette, deletePalette } from '../logic/actions'
import ModalImportWindow from './ModalImportWindow'
import useError from './ErrorPopUp'

function ModalEditWindow(props) {
	const { activePalette, paletteData } = useSelector(state => state)
	const dispatch = useDispatch()
	const [modalImportVisible, setModalImportVisible] = useState(false)
	const [colors, setColors] = useState(paletteData[activePalette].colors)
	const oldColors = paletteData[activePalette].colors
	const [error, setError] = useError()

	const hexRegExp = /^#(?:[0-9a-fA-F]{3}){1,2}$/

	const [nameValue, setNameValue] = useState(paletteData[activePalette].name)
	function handleNameChange(event) {
		setNameValue(event.target.value)
	}

	function setNewColor(colorValue, index) {
		if (hexRegExp.test(colorValue)) {
			const alteredColors = [...colors]
			alteredColors[index] = colorValue
			setColors(alteredColors)
		} else {
			setError(`Invalid hex color: ${colorValue}`)
		}
	}

	let swatchEditGenerator = colors.map((item, index) => {
		return <ModalEditItem data={item} index={index} key={index} bgColor={colors[index]} set={setNewColor} />
	})

	function savePaletteHandler() {
		dispatch(savePalette(activePalette, { name: nameValue, colors, addresses: paletteData[activePalette].addresses }))
		props.close()
	}

	function deletePaletteHandler() {
		if (!props.isLastPalette()) {
			dispatch(deletePalette(activePalette))
			props.close()
		} else {
			setError('This is your last palette')
		}
	}

	function modalImportToggle() {
		setModalImportVisible(!modalImportVisible)
	}

	function importHandler(importedPalette) {
		if (importedPalette.every(color => color.match(hexRegExp))) {
			const newColors = importedPalette.length > 10 ? importedPalette.slice(0, 10) : importedPalette
			const mergedColors = [...colors]
			newColors.forEach((newColor, index) => {
				mergedColors[index] = newColor
			})
			setColors(mergedColors)
			modalImportToggle()
		} else {
			setError('Something went wrong while importing')
		}
	}

	function cancelChanges() {
		setColors(oldColors)
		props.close()
	}

	return (
		<div className={props.status ? 'modal' : 'modal modal-closed'}>
			<div className="modal-edit">
				<div className="modal-edit-close-btn" onClick={cancelChanges}>
					&times;
				</div>
				<h2>Palette number {activePalette + 1}</h2>
				<p>Name: </p>
				<input type="text" placeholder={paletteData[activePalette].name} value={nameValue} onChange={handleNameChange} />
				<div className="modal-swatch-wrapper">{swatchEditGenerator}</div>
				<div className="modal-btn-wrapper">
					<button className="modal-btn delete" onClick={deletePaletteHandler}>
						Delete
					</button>
					<button className="modal-btn save" onClick={savePaletteHandler}>
						Save
					</button>
					<button className="modal-btn import" onClick={modalImportToggle}>
						Import
					</button>
				</div>
			</div>
			{modalImportVisible ? <ModalImportWindow modalImportToggle={modalImportToggle} importHandler={importHandler} /> : null}
			{error}
		</div>
	)
}

export default ModalEditWindow
