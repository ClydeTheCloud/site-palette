import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Item from './Item'
import './MainFrame.css'
import { H1, H2, H3, P, BTN_BORDER } from './_styled-components'
import useTooltip from './utility/useTooltip/useTooltip'
import ColorToggle from './ColorToggle'

function MainFrame() {
	const { activePalette, paletteData } = useSelector(state => state)
	const [tooltips, handler] = useTooltip({
		children: {
			title: <ColorToggle section="main" address="title" description="Title text" />,
			subTitle: <ColorToggle section="main" address="subTitle" description="Sub-Title text" />,
			text: <ColorToggle section="main" address="text" description="Paragraph text" />,
			button: (
				<div>
					<ColorToggle section="main" address="btn" description="Button text" />
					<ColorToggle section="main" address="btnBg" description="Button background" />
					<ColorToggle section="main" address="btnOffset" description="Button text on hover" />
					<ColorToggle section="main" address="btnBgOffset" description="Button background on hover" />
					<ColorToggle section="main" address="btnBorder" description="Button border" />
				</div>
			),
			body: <ColorToggle section="main" address="bg" description="Body background" />,
		},
	})

	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	function getItems() {
		fetch(
			'https://api.unsplash.com/search/photos?query=web&page=1&per_page=6&client_id=TOtBpPWZNPVXNxTI7xvV6A6x5lCl0f59Hj1e0LDUwtk'
		).then(response => {
			response.json().then(com => {
				setData(com.results)
				setIsLoading(false)
			})
		})
	}

	let items = data.map((item, index) => {
		return <Item data={item} key={index} />
	})

	useEffect(() => {
		getItems()
	}, [])

	H1.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.main.title],
	}
	H2.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.main.title],
	}
	H3.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.main.subTitle],
	}
	P.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.main.text],
	}
	BTN_BORDER.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.main.btn],
		bg: paletteData[activePalette].colors[paletteData[activePalette].addresses.main.btnBg],
		border: paletteData[activePalette].colors[paletteData[activePalette].addresses.main.btnBorder],
		colorHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.main.btnOffset],
		bgHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.main.btnBgOffset],
	}

	document.body.style = `background: ${paletteData[activePalette].colors[paletteData[activePalette].addresses.main.bg]}`

	const loadingMessage = <H2 className="loading-item">Loading, please wait...</H2>

	return (
		<>
			<div className="wrapper main" onClick={handler} data-tooltip-content-id="body" data-tooltip-config="auto pop3">
				<div className="main-text">
					<H1 onClick={handler} data-tooltip-content-id="title" data-tooltip-config="bottom pop3">
						Some title text go here.
					</H1>
					<H3 onClick={handler} data-tooltip-content-id="subTitle" data-tooltip-config="right pop3">
						Some more text to explain something very important. You need to hear this.
					</H3>
					<P onClick={handler} data-tooltip-content-id="text" data-tooltip-config="bottom pop3">
						This is where we go in detail. Take a closer look. We sure you'll like it. A lot. But don't take my word for
						it, go on and try it yourself! I'll wait for you here, don't worry, i'm not going anywhere. Take your time.
					</P>
					<BTN_BORDER
						className="main-btn"
						onClick={handler}
						data-tooltip-content-id="button"
						data-tooltip-config="left pop3"
					>
						TRY IT OUT NOW
					</BTN_BORDER>
				</div>
				<div className="main-background-image"></div>
				<div className="wrapper wrapper-items">
					<H2 onClick={handler} data-tooltip-content-id="title">
						Here are some items from unsplash API:
					</H2>
					<div className="items">{isLoading ? loadingMessage : items}</div>
				</div>
			</div>
			{tooltips}
		</>
	)
}

export default MainFrame
