import React, { useState, useRef } from 'react'

import './Main.css'
import Tooltip from './Tooltip'
import configParser from './utils/configParser'
import vaultCheck from './utils/vault'

// Object for storing timeOut-IDs of different Tooltips, both for close-animation and rendering
const timeoutIds = { closedelay: {}, animation: {}, hover: {} }
const configs = {}

function useTooltip({ children, defaultConfigString = 'top delay1-3 pop3', clipPaths = {}, commonClipPath }) {
	const [tooltips, setTooltips] = useState({})

	// useRef is used for access to current version of state inside timers.
	const tooltipsRef = useRef(tooltips)
	tooltipsRef.current = tooltips

	// function closeOnEmptyClick() {
	// 	document.body.addEventListener('click', emptyClickHandler)
	// }

	// Main function - universal event handler
	const tooltipEventHandler = event => {
		// Prevent default is used to determine if event had already fired on any other element
		if (event.defaultPrevented) {
			console.log('prevented!')
			return
		} else {
			event.preventDefault()
		}

		// const isTargetCompatible = Boolean(
		// 	event.target.dataset.tooltipConfig || event.target.dataset.tooltipContent || event.target.dataset.tooltipContentId
		// )

		// console.log('T', event.target)
		// console.log('CT', event.currentTarget)

		// if (isTargetCompatible && event.target !== event.currentTarget) {
		// 	console.log('break')
		// 	return
		// }
		const targetElement = event.currentTarget

		const data = {
			configString: targetElement.dataset.tooltipConfig,
			content: targetElement.dataset.tooltipContent,
			contentId: targetElement.dataset.tooltipContentId,
		}

		// console.log('fire')
		// event.hasFired = true

		// console.log(data)

		// Get value of tooltipConfig attribute and parse it
		let config
		try {
			config = configParser(data.configString || defaultConfigString, event.type)
		} catch (e) {
			console.error('Something is wrong with your config')
			console.error('Tooltip anchor is:', targetElement)
			console.error('Config is:', data.configString)
			console.error(e)
		}

		// Get unique ID based on config or target element
		const identifier = vaultCheck(config.group || targetElement)

		console.log(identifier)

		configs[identifier] = config

		if (tooltips[identifier] && event.type === 'mouseenter') {
			const tooltip = document.getElementById(`ttid-${identifier}`)
			if (tooltip.style.animationName.endsWith('-close')) {
				tooltip.style.animationName = tooltip.style.animationName.replace('-close', '')
			}
			clearTimeout(timeoutIds.animation[identifier])
			return
		}

		if (event.type === 'click') {
			// Check if tooltip associated with targeted element is on the list of active tooltips
			if (Object.entries(tooltips).some(t => parseInt(t[0]) === identifier)) {
				// If it is, remove this target and respective Tooltip.
				close(identifier, config)
				return
			}
		}

		if (config.delay && event.type === 'mouseleave' && !tooltipsRef.current[identifier]) {
			clearTimeout(timeoutIds.hover[identifier])
			return
		}

		if (event.type === 'mouseenter' && config.delay) {
			clearTimeout(timeoutIds.closedelay[identifier])
		}

		if (event.type === 'mouseleave' && !config.delay) {
			close(targetElement, config, identifier)
			return
		} else if (event.type === 'mouseleave' && config.delay && config.delay[1]) {
			timeoutIds.closedelay[identifier] = setTimeout(() => {
				close(identifier, config)
			}, config.delay[1] * 500)
			return
		}

		const targetIndex = event.target.style.zIndex
		const tooltipIndex = targetIndex ? parseInt(targetIndex) + 2 : 3

		// console.log(targetIndex)
		// console.log(tooltipIndex)
		// console.log(config)
		// console.log(clipPaths)

		// Generate new Tooltip.
		const tooltip = (
			<Tooltip
				child={data.contentId ? children[data.contentId] : null}
				clipPath={clipPaths[data.contentId] ? clipPaths[data.contentId].current : null}
				commonClipPath={commonClipPath}
				position={config.position}
				anchor={targetElement}
				key={identifier}
				identifier={identifier}
				tooltipTextContent={data.content}
				zIndex={tooltipIndex}
				animation={config.animation[0] || null}
				animationLength={config.animation[1] || null}
				customClass={config.class}
				arrow={config.arrow}
				flip={config.flip}
				clickMagnet={config.clickMagnet}
				magnetCoordinates={{ x: event.clientX, y: event.clientY }}
			/>
		)

		// Set timeout to adding new Tooltip to state if method in config have length...
		if (config.delay && event.type === 'mouseenter') {
			timeoutIds.hover[identifier] = setTimeout(() => {
				setTooltips({
					...tooltipsRef.current,
					[identifier]: tooltip,
				})
			}, config.delay[0] * 500)
			//... or Add new Tooltip right away.
		} else {
			setTooltips({
				...tooltipsRef.current,
				[identifier]: tooltip,
			})
		}
	}

	// Array of all rendered Tooltips.
	const allTooltips = tooltips ? Object.values(tooltips) : null

	////////////////////////////////////////////////////////////////////////////////////// dig down from here
	////////////////////////////////////////////////////////////////////////////////////// tragetElement and filtering when closing

	// Function for closing Tooltips
	function close(identifier, config) {
		const tooltip = document.getElementById(`ttid-${identifier}`)
		if (config && config.animation[0] && tooltip) {
			tooltip.style.animationName = config.animation[0].concat('-close')
			timeoutIds.animation[identifier] = setTimeout(
				() => {
					setTooltips(
						Object.fromEntries(Object.entries(tooltipsRef.current).filter(t => t[1].props.identifier !== identifier))
					)
					configs[identifier] = null
				},
				config.animation[1] ? config.animation[1] * 100 : 200
			)
			return
		}
		setTooltips(Object.fromEntries(Object.entries(tooltipsRef.current).filter(t => t[1].props.identifier !== identifier)))
		configs[identifier] = null
	}

	return [allTooltips, tooltipEventHandler]
}

export default useTooltip
