import React, { useState, useRef } from 'react'

import './Main.css'
import Tooltip from './Tooltip'
import configParser from './utils/configParser'
import vaultCheck from './utils/vault'

// Object for storing timeOut-IDs of different Tooltips, both for close-animation and rendering
const timeoutIds = { closedelay: {}, animation: {}, hover: {} }
// const configs = {}
const globalStorage = []
const outerGlobalOptions = {}

function useTooltip({ children, defaultConfigString = 'top delay1-3 pop3', clipPaths = {}, commonClipPath, globalOptions }) {
	const [tooltips, setTooltips] = useState({})
	if (!outerGlobalOptions.single && globalOptions.single) {
		outerGlobalOptions.single = globalOptions.single
	}

	// useRef is used to access current version of state inside timers.
	const tooltipsRef = useRef(tooltips)
	tooltipsRef.current = tooltips

	// Main function - universal event handler
	const tooltipEventHandler = event => {
		// nativeEvent.fired is used to determine if event had already fired on any other element
		if (event.nativeEvent.fired) {
			console.log('prevented!')
			return
		} else {
			event.nativeEvent.fired = true
		}

		const targetElement = event.currentTarget

		const data = {
			configString: targetElement.dataset.tooltipConfig,
			content: targetElement.dataset.tooltipContent,
			contentId: targetElement.dataset.tooltipContentId,
		}

		// REWRITE{

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

		// }REWRITE

		// Get unique ID based on config or target element
		const identifier = vaultCheck(config.group || targetElement)

		// configs[identifier] = config

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
				close(identifier, config, targetElement)
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
			close(identifier, config, targetElement)
			return
		} else if (event.type === 'mouseleave' && config.delay && config.delay[1]) {
			timeoutIds.closedelay[identifier] = setTimeout(() => {
				close(identifier, config, targetElement)
			}, config.delay[1] * 500)
			return
		}

		const targetIndex = event.target.style.zIndex
		const tooltipIndex = targetIndex ? parseInt(targetIndex) + 2 : 3

		if (outerGlobalOptions && outerGlobalOptions.single) {
			closeAll(true)
		}

		console.log(config)

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
				magnet={config.magnet}
				magnetCoordinates={{ x: event.clientX, y: event.clientY }}
			/>
		)

		if (config.delay && event.type === 'mouseenter') {
			timeoutIds.hover[identifier] = setTimeout(() => {
				setTooltips({
					...tooltipsRef.current,
					[identifier]: tooltip,
				})
			}, config.delay[0] * 500)
		} else {
			setTooltips({
				...tooltipsRef.current,
				[identifier]: tooltip,
			})
		}

		globalStorage.push(tooltip)
	}

	// Array of all rendered Tooltips.
	const allTooltips = tooltips ? Object.values(tooltips) : null

	////////////////////////////////////////////////////////////////////////////////////// dig down from here
	////////////////////////////////////////////////////////////////////////////////////// tragetElement and filtering when closing

	// Function for closing Tooltips
	function close(identifier, config, anchor) {
		const tooltip = document.getElementById(`ttid-${identifier}`)
		if (config && config.animation[0] && tooltip) {
			tooltip.style.animationName = config.animation[0].concat('-close')
			timeoutIds.animation[identifier] = setTimeout(
				() => {
					setTooltips(
						Object.fromEntries(Object.entries(tooltipsRef.current).filter(t => t[1].props.identifier !== identifier))
					)
					// configs[identifier] = null
				},
				config.animation[1] ? config.animation[1] * 100 : 200
			)
			globalStorage.filter(tt => tt.props.anchor !== anchor)
			return
		}
		setTooltips(Object.fromEntries(Object.entries(tooltipsRef.current).filter(t => t[1].props.identifier !== identifier)))
		// configs[identifier] = null
	}

	function closeAll(global) {
		;(global ? globalStorage : allTooltips).forEach(tt => {
			close(tt.props.identifier, { animation: [tt.props.animation, tt.props.animationLength] })
		})
	}

	return [allTooltips, tooltipEventHandler, closeAll]
}

export default useTooltip
