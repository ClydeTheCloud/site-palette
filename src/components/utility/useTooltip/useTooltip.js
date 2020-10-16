import React, { useState, useRef } from 'react'

import './Main.css'
import Tooltip from './Tooltip'
import configParser from './utils/configParser'
import vaultCheck from './utils/vault'

// Object for storing timeOut-IDs of different Tooltips, both for close-animation and rendering
const timeoutIds = { closedelay: {}, animation: {}, hover: {} }

function useTooltip({ children, defaultConfigString = 'top delay1-3 pop3', clipPaths = {}, commonClipPath }) {
	const [tooltips, setTooltips] = useState({})

	// useRef is used for access to current version of state inside timers.
	const tooltipsRef = useRef(tooltips)
	tooltipsRef.current = tooltips

	// Main function - universal event handler
	const tooltipEventHandler = event => {
		const isTargetCompatible = Boolean(
			event.target.getAttribute('data-tooltip-config') || event.target.getAttribute('data-tooltip-content-id')
		)

		console.log('T', event.target)
		console.log('CT', event.currentTarget)

		if (isTargetCompatible && event.target !== event.currentTarget) {
			return
		}

		const targetElement = isTargetCompatible ? event.target : event.currentTarget

		// Get unique for every target ID
		const parentId = vaultCheck(targetElement)
		console.log('fired')

		if (tooltips[parentId] && event.type === 'mouseenter') {
			const tooltip = document.getElementById(`ttid-${parentId}`)
			if (tooltip.style.animationName.endsWith('-close')) {
				tooltip.style.animationName = tooltip.style.animationName.replace('-close', '')
			}
			clearTimeout(timeoutIds.animation[parentId])
			return
		}
		// console.log('target is', event.target, 'currentTarget is', event.currentTarget, 'TE is', targetElement)

		// Get value of tooltipConfig attribute and send it to helper function
		const configString = targetElement.getAttribute('data-tooltip-config')
		let config
		try {
			config = configParser(configString || defaultConfigString, event.type)
		} catch (e) {
			console.error('Something is wrong with your config')
			console.error('Target is:', targetElement)
			console.error('Config is:', configString)
			console.error(e)
		}

		// if ((config.method === 'click' && event.type !== 'click') || (config.method === 'hover' && event.type === 'click')) {
		// 	throw new Error('Conflict between method of tooltip opening and event type')
		// }

		// if (config.nested) {
		// 	// return if event happened not on the element itself
		// 	if (event.target !== event.currentTarget) {
		// 		return
		// 	}
		// }

		if (event.type === 'click') {
			// Check if tooltip associated with targeted element is on the list of active tooltips
			if (Object.entries(tooltips).some(t => parseInt(t[0]) === parentId)) {
				// If it is, remove this target and respective Tooltip.
				close(targetElement, config, parentId)
				return
			}
		}

		if (config.delay && event.type === 'mouseleave' && !tooltipsRef.current[parentId]) {
			clearTimeout(timeoutIds.hover[parentId])
			return
		}

		if (event.type === 'mouseenter' && config.delay) {
			clearTimeout(timeoutIds.closedelay[parentId])
		}

		if (event.type === 'mouseleave' && !config.delay) {
			close(targetElement, config, parentId)
			return
		} else if (event.type === 'mouseleave' && config.delay && config.delay[1]) {
			timeoutIds.closedelay[parentId] = setTimeout(() => {
				close(targetElement, config, parentId)
			}, config.delay[1] * 500)
			return
		}

		// Get position of clicked element and calculate position of a Tooltip based on config.position property.
		// let [horizontalDirection, horizontalValue, verticalDirection, verticalValue] = coordinator(
		// 	event.currentTarget,
		// 	config.position
		// )

		// get tooltipcontentid attribute to find required child
		const tooltipContentId = targetElement.getAttribute('data-tooltip-content-id')

		const targetIndex = event.target.style.zIndex
		const tooltipIndex = targetIndex ? parseInt(targetIndex) + 2 : 3

		// console.log(targetIndex)
		// console.log(tooltipIndex)
		// console.log(config)
		// console.log(clipPaths)

		// Generate new Tooltip.
		const tooltip = (
			<Tooltip
				child={tooltipContentId ? children[tooltipContentId] : null}
				clipPath={clipPaths[tooltipContentId] ? clipPaths[tooltipContentId].current : null}
				commonClipPath={commonClipPath}
				position={config.position}
				id={targetElement}
				key={parentId}
				parentId={parentId}
				tooltipTextContent={targetElement.getAttribute('data-tooltip-content')}
				zIndex={tooltipIndex}
				animation={config.animation[0] || null}
				animationLength={config.animation[1] || null}
				customClass={config.class}
				arrow={config.arrow}
				flip={config.flip}
			/>
		)

		// Set timeout to adding new Tooltip to state if method in config have length...
		if (config.delay && event.type === 'mouseenter') {
			timeoutIds.hover[parentId] = setTimeout(() => {
				setTooltips({
					...tooltipsRef.current,
					[parentId]: tooltip,
				})
			}, config.delay[0] * 500)
			//... or Add new Tooltip right away.
		} else {
			setTooltips({
				...tooltipsRef.current,
				[parentId]: tooltip,
			})
		}
	}

	// Array of all rendered Tooltips.
	const allTooltips = Object.values(tooltips)

	// Function for closing Tooltips
	function close(targetElement, config, key) {
		const tooltip = document.getElementById(`ttid-${key}`)
		if (config && config.animation[0] && tooltip) {
			tooltip.style.animationName = config.animation[0].concat('-close')
			timeoutIds.animation[key] = setTimeout(
				() => {
					setTooltips(Object.fromEntries(Object.entries(tooltipsRef.current).filter(t => t[1].props.id !== targetElement)))
				},
				config.animation[1] ? config.animation[1] * 100 : 200
			)
			return
		}
		setTooltips(Object.fromEntries(Object.entries(tooltipsRef.current).filter(t => t[1].props.id !== targetElement)))
	}

	return [allTooltips, tooltipEventHandler]
}

export default useTooltip
