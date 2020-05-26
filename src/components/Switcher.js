import React, { useState, useContext } from 'react';
import './Switcher.css';
import PaletteItem from './PaletteItem';
import { PalettesContext } from '../PalettesContext';
import ModalEditWindow from './ModalEditWindow';

function Switcher() {
	const opened = '>';

	const [isOpen, setIsOpen] = useState(false);

	const positionHandler = () => {
		setIsOpen(!isOpen);
	};

	let context = useContext(PalettesContext);

	let renderPalletes = context[0].map((item, index) => {
		return <PaletteItem data={item} key={index} />;
	});

	const style = {
		div: {
			backgroundColor: context[3].palette[context[4].addresses.items.bg],
		},
		p: {
			color: context[3].palette[context[4].addresses.items.name],
		},
		button: {
			color: context[3].palette[context[4].addresses.items.btn],
			backgroundColor: context[3].palette[context[4].addresses.items.btnBg],
		},
	};

	// PALETTE NAVIGATION - START OF BLOCK
	const [isBtnDisabled, setIsBtnDisabled] = useState(false);
	const [currentlyDisplaying, setCurrentlyDisplaying] = useState(0);

	let numberOfPalettes = renderPalletes.length;
	if (numberOfPalettes < 2) {
		setIsBtnDisabled(true);
	}

	function movePrev() {
		if (currentlyDisplaying !== 0) {
			setCurrentlyDisplaying(currentlyDisplaying - 1);
		} else {
			setCurrentlyDisplaying(numberOfPalettes - 1);
		}
	}

	function moveNext() {
		if (currentlyDisplaying + 1 !== numberOfPalettes) {
			setCurrentlyDisplaying(currentlyDisplaying + 1);
		} else {
			setCurrentlyDisplaying(0);
		}
	}

	function applyNewPalette() {
		const setActivePalette = context[5];
		setActivePalette(context[0][currentlyDisplaying].name);
	}
	// PALETTE NAVIGATION - END OF BLOCK

	const [modalIsOpen, setModalIsOpen] = useState(false);

	function modalEditHandler() {
		setModalIsOpen(!modalIsOpen);
	}

	return (
		<div>
			<div className="switcher">
				<div
					style={style.div}
					className={isOpen ? 'small opened' : 'small'}
					onClick={positionHandler}
				>
					<span className={isOpen ? '' : 'rotate'}>{opened}</span>
				</div>
				<div style={style.div} className={isOpen ? 'big opened' : 'big'}>
					<div className="palette-wrapper">
						<div className="nav-wrapper">
							<button
								className="nav-btn"
								onClick={movePrev}
								disabled={isBtnDisabled}
								style={style.button}
							>
								Prev
							</button>
							<button
								className="nav-btn"
								onClick={moveNext}
								disabled={isBtnDisabled}
								style={style.button}
							>
								Next
							</button>
						</div>
						<p className="index" style={style.p}>
							{currentlyDisplaying + 1} out of {numberOfPalettes}
						</p>
						{renderPalletes[currentlyDisplaying]}
						<div className="controls-wrapper">
							<button className="edit controls-btn" onClick={modalEditHandler}>
								Edit
							</button>
							<button className="new controls-btn">New</button>
							<button className="apply controls-btn" onClick={applyNewPalette}>
								Apply
							</button>
						</div>
					</div>
				</div>
			</div>
			<ModalEditWindow
				status={modalIsOpen}
				edit={currentlyDisplaying}
				close={modalEditHandler}
			/>
		</div>
	);
}

export default Switcher;
