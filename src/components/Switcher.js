import React, { useState } from 'react'
import useUndertool from 'undertool'

import './Switcher.css'
import PaletteItem from './PaletteItem'
import ModalEditWindow from './ModalEditWindow'
import { DIV, P, BTN } from './_styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { nextPalette, prevPalette, createNewPalette } from '../logic/actions'

function Switcher() {
	const { activePalette, paletteData } = useSelector(state => state)
	const dispatch = useDispatch()

	const [, , closeAll] = useUndertool()
	const opened = '>'

	const [isOpen, setIsOpen] = useState(false)
	const [swatchVisible, setSwatchVisible] = useState(false)

	const positionHandler = () => {
		setIsOpen(!isOpen)
	}

	DIV.defaultProps = {
		bg: '#333',
	}
	P.defaultProps = {
		color: 'white',
	}
	BTN.defaultProps = {
		color: 'white',
		bg: '#333',
	}

	const [isBtnDisabled, setIsBtnDisabled] = useState(false)
	const [modalIsOpen, setModalIsOpen] = useState(false)

	function modalEditHandler() {
		closeAll(true)
		setModalIsOpen(!modalIsOpen)
		setSwatchVisible(!swatchVisible)
	}

	//disable navigation if there's only one palette
	if (paletteData.length < 2 && !isBtnDisabled) {
		setIsBtnDisabled(true)
	} else if (paletteData.length > 2 && isBtnDisabled) {
		setIsBtnDisabled(false)
	}

	const isLastPalette = () => {
		if (paletteData.length > 1) {
			return false
		} else {
			return true
		}
	}

	function help() {
		localStorage.removeItem('tutorial')
		document.location.reload()
	}

	return (
		<div>
			<div className="switcher">
				<DIV id="switch-button" className={isOpen ? 'small opened' : 'small'} onClick={positionHandler}>
					<span className={isOpen ? '' : 'rotate'}>{opened}</span>
				</DIV>
				<DIV className={isOpen ? 'big opened' : 'big'}>
					<div className="palette-wrapper">
						<div className="nav-wrapper">
							<BTN className="nav-btn" onClick={() => dispatch(prevPalette())} disabled={isBtnDisabled}>
								Prev
							</BTN>
							<BTN className="nav-btn" onClick={() => dispatch(nextPalette())} disabled={isBtnDisabled}>
								Next
							</BTN>
						</div>
						<P className="index">
							{activePalette + 1} out of {paletteData.length}
						</P>
						<PaletteItem data={paletteData[activePalette]} />
						<div className="controls-wrapper">
							<button className="edit controls-btn" onClick={modalEditHandler}>
								Edit
							</button>
							<button
								className="new controls-btn"
								onClick={() => {
									dispatch(createNewPalette())
									modalEditHandler()
								}}
							>
								New
							</button>
						</div>
					</div>
					<button className="help-button" onClick={help}>
						?
					</button>
				</DIV>
			</div>
			{swatchVisible ? <ModalEditWindow status={modalIsOpen} isLastPalette={isLastPalette} close={modalEditHandler} /> : null}
		</div>
	)
}

export default Switcher
