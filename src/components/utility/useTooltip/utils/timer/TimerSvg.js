import React from 'react'

import './TimerSvg.css'

function TimerSvg(timer, status) {
	if (!timer) {
		return null
	} else {
		const style = {
			animation: `TimerSvgCountdown ${timer}s linear ${status} 1 forwards`,
		}
		return (
			<svg>
				<circle
					style={style}
					r="5"
					cx="9"
					cy="9"
					fill="#330099"
				></circle>
			</svg>
		)
	}
}

export default TimerSvg
