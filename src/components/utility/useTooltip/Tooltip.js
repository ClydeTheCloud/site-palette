import React from 'react'
import { createPopper } from '@popperjs/core'
import './Tooltip.css'

// import TimerSvg from './utils/timer/TimerSvg'

class Tooltip extends React.Component {
	constructor(props) {
		super(props)
		this.tooltipRef = React.createRef()
		this.wrapperId = `ttid-${this.props.parentId}`
		this.bodyId = `ttid-${this.props.parentId}-body`
		this.arrowId = `ttid-${this.props.parentId}-arrow`
		this.arrowWrapperId = `ttid-${this.props.parentId}-arrow-wrapper`
	}

	setArrow() {
		const arrow = document.getElementById(this.arrowId)
		const arrowWrapper = document.getElementById(this.arrowWrapperId)

		switch (this.props.arrow) {
			case 'arrow:sm':
				arrowWrapper.style.height = '10px'
				arrowWrapper.style.width = '10px'
				arrow.style.height = '10px'
				arrow.style.width = '10px'
				arrowWrapper.classList.replace('tooltip-arrow-wrapper', 'tooltip-arrow-wrapper-sm')
				break
			case 'arrow:md':
				arrowWrapper.style.height = '20px'
				arrowWrapper.style.width = '20px'
				arrow.style.height = '20px'
				arrow.style.width = '20px'
				arrowWrapper.classList.replace('tooltip-arrow-wrapper', 'tooltip-arrow-wrapper-md')
				break
			case 'arrow:lg':
				arrowWrapper.style.height = '30px'
				arrowWrapper.style.width = '30px'
				arrow.style.height = '30px'
				arrow.style.width = '30px'
				arrowWrapper.classList.replace('tooltip-arrow-wrapper', 'tooltip-arrow-wrapper-lg')
				break
			case 'arrow:rd':
				arrowWrapper.style.height = '15px'
				arrowWrapper.style.width = '15px'
				arrow.style.height = '15px'
				arrow.style.width = '15px'
				arrow.style.borderRadius = '100%'
				arrowWrapper.classList.replace('tooltip-arrow-wrapper', 'tooltip-arrow-wrapper-rd')
				break
			case 'arrow:none':
				arrowWrapper.style.display = 'none'
				arrow.style.display = 'none'
				break
			default:
				break
		}
	}

	styles = {
		tooltipBody: {
			position: 'relative',
			zIndex: this.props.zIndex,
		},

		tooltipWrapper: {
			animationName: this.props.animation,
			animationDuration: this.props.animationLength ? `${this.props.animationLength * 0.1}s` : '0.2s',
			animationFillMode: 'forwards',
		},

		tooltipContent: {
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	}

	componentDidMount() {
		const body = document.getElementById(this.bodyId)
		const paddingOffset = Number(window.getComputedStyle(body, null).borderRadius.replace(/\D/g, ''))
		let isFlipEndbled = this.props.flip === 'flip:off' ? false : true
		let fixedOrAbsolute = this.props.flip === 'fixed:on' ? 'fixed' : 'absolute'
		const clipPath = this.props.clipPath || this.props.commonClipPath

		createPopper(this.props.id, this.tooltipRef.current, {
			placement: this.props.position,
			modifiers: [
				{ name: 'arrow', options: { padding: paddingOffset } },
				{ name: 'offset', options: { offset: [0, 20] } },
				{ name: 'flip', options: { boundary: clipPath }, enabled: isFlipEndbled },
			],
			strategy: fixedOrAbsolute,
		})

		if (this.props.customClass) {
			const bg = window.getComputedStyle(body, null).backgroundColor
			document.getElementById(this.arrowId).style.backgroundColor = bg
		}

		if (this.props.arrow) {
			this.setArrow()
		}
	}

	render() {
		return (
			<div ref={this.tooltipRef} className={'tooltip-helper-class'}>
				<div style={this.styles.tooltipWrapper} id={this.wrapperId}>
					<div
						id={this.bodyId}
						style={this.styles.tooltipBody}
						className={`${this.props.customClass || 'tooltip-default-style'} `}
						key={this.props.parentId}
					>
						<div style={this.styles.tooltipContent}>
							{this.props.child || this.props.tooltipTextContent}
							{/* {this.setTimer()} */}
						</div>
					</div>
					<div className="tooltip-arrow-wrapper" id={this.arrowWrapperId} data-popper-arrow>
						<div className="tooltip-arrow-inner" id={this.arrowId}></div>
					</div>
				</div>
			</div>
		)
	}
}

export default Tooltip
