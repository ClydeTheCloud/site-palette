import React, { useContext, useState } from 'react';
import { PalettesContext } from '../PalettesContext';
import './ModalEditWindow.css';
import ModalEditItem from './ModalEditItem';

function ModalEditWindow(props) {
	let context = useContext(PalettesContext);

	const allPalette_BUFFER = context[0];
	const setPalette = context[6];

	// console.log(context[0][props.edit]);

	const [nameValue, setNameValue] = useState(context[0][props.edit].name);
	function handleNameChange(event) {
		setNameValue(event.target.value);
	}

	function setNewColor(colorValue, index) {
		const hexRegExp = /^#[0-9a-f]{6}/i;
		if (hexRegExp.test(colorValue)) {
			allPalette_BUFFER[props.edit].palette[index] = colorValue;
		} else {
			console.log('Wrong hex color:', colorValue);
		}
	}

	let swatchEditGenerator = context[0][props.edit].palette.map(
		(item, index) => {
			let colorName, bgColor;
			if (context[0][props.edit].palette[index] === '') {
				bgColor = 'black';
				colorName = 'EMPTY';
			} else {
				colorName = context[0][props.edit].palette[index];
				bgColor = context[0][props.edit].palette[index];
			}

			return (
				<ModalEditItem
					editing={props.edit}
					data={item}
					index={index}
					key={index}
					colorName={colorName}
					bgColor={bgColor}
					set={setNewColor}
				/>
			);
		}
	);

	function savePalette() {
		allPalette_BUFFER[props.edit].name = nameValue;
		setPalette(allPalette_BUFFER);
		props.close();
	}

	return (
		<div className={props.status ? 'modal' : 'modal modal-closed'}>
			<div className="modal-edit">
				<div className="modal-edit-close-btn" onClick={props.close}>
					&times;
				</div>
				<h2>Palette number {props.edit + 1}</h2>
				<p>Name: </p>
				<input
					type="text"
					placeholder={context[0][props.edit].name}
					value={nameValue}
					onChange={handleNameChange}
				/>
				<div className="modal-swatch-wrapper">{swatchEditGenerator}</div>
				<button onClick={savePalette}>SAVE</button>
			</div>
		</div>
	);
}

export default ModalEditWindow;
