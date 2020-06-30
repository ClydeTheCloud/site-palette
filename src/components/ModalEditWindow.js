import React, { useState, useEffect } from 'react';
import './ModalEditWindow.css';
import ModalEditItem from './ModalEditItem';
import { useDispatch } from 'react-redux';
import { savePalette, deletePalette } from '../logic/actions';

function ModalEditWindow(props) {
	const dispatch = useDispatch();
	let { name, colors } = props.edit;
	console.log(colors);

	const [nameValue, setNameValue] = useState(props.edit.name);
	function handleNameChange(event) {
		setNameValue(event.target.value);
	}

	function setNewColor(colorValue, index) {
		const hexRegExp = /^#[0-9a-f]{6}/i;
		if (hexRegExp.test(colorValue)) {
			props.edit.colors[index] = colorValue;
		} else {
			console.log('Wrong hex color:', colorValue);
		}
	}

	const swatchEditGenerator = colors.map((item, index) => {
		return (
			<ModalEditItem
				data={item}
				index={index}
				key={index}
				bgColor={colors[index]}
				set={setNewColor}
			/>
		);
	});

	function savePaletteHandler() {
		const addresses = props.edit.addresses;
		dispatch(
			savePalette(props.paletteIndex, { name: nameValue, colors, addresses })
		);
		props.close();
	}

	function deletePaletteHandler() {
		if (!props.isLastPalette()) {
			dispatch(deletePalette(props.paletteIndex));
			props.close();
		} else {
			alert('This is your last palette');
		}
	}

	useEffect(() => {
		setNameValue(props.edit.name);
	}, []);

	return (
		<div className={props.status ? 'modal' : 'modal modal-closed'}>
			<div className="modal-edit">
				<div className="modal-edit-close-btn" onClick={props.close}>
					&times;
				</div>
				<h2>Palette number {props.paletteIndex + 1}</h2>
				<p>Name: </p>
				<input
					type="text"
					placeholder={props.edit.name}
					value={nameValue}
					onChange={handleNameChange}
				/>
				<div className="modal-swatch-wrapper">{swatchEditGenerator}</div>
				<div className="modal-btn-wrapper">
					<button className="modal-btn delete" onClick={deletePaletteHandler}>
						Delete
					</button>
					<button className="modal-btn save" onClick={savePaletteHandler}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalEditWindow;
