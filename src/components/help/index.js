import React, { useState, useRef, useEffect } from 'react'
import './style.css'

function Help({ setScroll }) {
	const [spotlightStyle, setSpotlightStyle] = useState({ top: '50%', left: '-110px' })
	const [title, setTitle] = useState('Wellcome!')
	const [step, setStep] = useState(0)
	const [running, setRunning] = useState(true)
	const btn = useRef()
	const spotlight = useRef()
	const menuBtn = useRef()
	const scrollContainer = useRef()

	const btnRect = useRef()

	useEffect(() => {
		btn.current = document.getElementById('switch-button')
		spotlight.current = document.getElementById('help-spotlight')
		menuBtn.current = document.querySelector('.menu-button')
		btnRect.current = btn.current.getBoundingClientRect()
		scrollContainer.current = document.getElementById('scroll-container')
	}, [])

	function nextStep() {
		if (!running) {
			setStep(step + 1)
		}
	}

	function runningToggle(time) {
		setRunning(true)
		setTimeout(() => {
			setRunning(false)
		}, time)
	}

	function animate() {
		switch (step) {
			case 0:
				runningToggle(3500)
				setTimeout(() => {
					setTitle(`I'll show you around. Click anywhere whenever you're ready to go on.`)
				}, 3000)
				break
			case 1:
				runningToggle(2500)
				setTimeout(() => {
					setSpotlightStyle({
						left: `${btnRect.current.x + btnRect.current.width / 2}px`,
						top: `${btnRect.current.y + btnRect.current.height / 2}px`,
					})
				}, 500)
				setTimeout(() => {
					setTitle('Click this button to open up menu.')
				}, 2000)
				break
			case 2:
				runningToggle(2000)
				btn.current.click()
				setTimeout(() => {
					const switcherRect = btn.current.nextElementSibling.getBoundingClientRect()
					setSpotlightStyle({
						left: `${switcherRect.x + switcherRect.width / 2}px`,
						top: `${switcherRect.y + switcherRect.height / 2}px`,
						width: `${switcherRect.width + 100}px`,
						height: `${switcherRect.height + 50}px`,
						borderRadius: '25px',
					})
					setTitle('Here you can manage your palettes.')
				}, 500)

				break
			case 3:
				btn.current.click()
				const menuBtnRect = menuBtn.current.getBoundingClientRect()
				menuBtn.current.click()
				runningToggle(2000)
				setTimeout(() => {
					setSpotlightStyle({
						left: `${menuBtnRect.x + menuBtnRect.width / 2}px`,
						top: `${menuBtnRect.y + menuBtnRect.height / 2}px`,
						width: `${menuBtnRect.width + 50}px`,
						height: `${menuBtnRect.height + 25}px`,
						borderRadius: '25px',
					})
					setTitle('Click on any element to open a pop-up.')
				}, 500)
				break
			case 4:
				const tooltip = document.querySelector('.tooltip-helper-class')
				const tooltipRect = tooltip.getBoundingClientRect()
				runningToggle(2000)
				setTimeout(() => {
					setSpotlightStyle({
						left: `${tooltipRect.x + tooltipRect.width / 2}px`,
						top: `${tooltipRect.y + tooltipRect.height / 2}px`,
						width: `${tooltipRect.width + 50}px`,
						height: `${tooltipRect.height + 25}px`,
						borderRadius: '15px',
					})
					setTitle('Here you can adjust colors used in this element.')
				}, 500)
				break
			default:
				break
		}
	}

	useEffect(() => {
		animate()
		if (step > 4) {
			setScroll(true)
			localStorage.setItem('tutorial', 'done')
		}
	}, [step]) // eslint-disable-line

	return step > 4 ? null : (
		<>
			<div onClick={nextStep} className="help-overlay">
				<div style={spotlightStyle} id="help-spotlight"></div>
			</div>
			<div className="help-title-bg">
				<h2 className="help-title">{title}</h2>
			</div>
		</>
	)
}

export default Help
