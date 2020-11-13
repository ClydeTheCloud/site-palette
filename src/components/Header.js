import React from 'react'
import { useSelector } from 'react-redux'
import { LI, BTN } from './_styled-components'

import Logo from './img/Logo'
import './Header.css'
import useTooltip from './utility/useTooltip/useTooltip'
import ColorToggle from './ColorToggle'

function Header() {
	const { activePalette, paletteData } = useSelector(state => state)
	const [tooltips, handler] = useTooltip({
		children: {
			header: <ColorToggle section="header" address="bg" description="Header Background" />,
			logo: <ColorToggle section="header" address="logo" description="Logo" />,
			menuItem: (
				<div>
					<ColorToggle section="header" address="menuItem" description="Menu text" />
					<ColorToggle section="header" address="menuItemOffset" description="Menu on hover" />
				</div>
			),
			button: (
				<div>
					<ColorToggle section="header" address="menuBtn" description="Button text" />
					<ColorToggle section="header" address="menuBtnBg" description="Button background" />
					<ColorToggle section="header" address="menuBtnOffset" description="Button text on hover" />
					<ColorToggle section="header" address="menuBtnBgOffset" description="Button background on hover" />
				</div>
			),
		},
		globalOptions: { single: true },
	})

	LI.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.header.menuItem],
		colorHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.header.menuItemOffset],
	}

	BTN.defaultProps = {
		bg: paletteData[activePalette].colors[paletteData[activePalette].addresses.header.menuBtnBg],
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.header.menuBtn],

		bgHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.header.menuBtnBgOffset],
		colorHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.header.menuBtnOffset],
	}

	const style = {
		header: {
			backgroundColor: paletteData[activePalette].colors[paletteData[activePalette].addresses.header.bg],
		},
	}

	return (
		<>
			<header style={style.header} onClick={handler} data-tooltip-content-id="header">
				<div className="wrapper">
					<Logo handler={handler} dataTooltipContentId="logo" />
					<div className="menu-wrapper">
						<div className="menu-item">
							<LI
								className="menu-link"
								onClick={handler}
								data-tooltip-config="group:menu bottom pop3"
								data-tooltip-content-id="menuItem"
							>
								Item 1
							</LI>
						</div>
						<div className="menu-item">
							<LI
								className="menu-link"
								onClick={handler}
								data-tooltip-config="group:menu bottom pop3"
								data-tooltip-content-id="menuItem"
							>
								Item 2
							</LI>
						</div>
						<div className="menu-item">
							<LI
								className="menu-link"
								onClick={handler}
								data-tooltip-config="group:menu bottom pop3"
								data-tooltip-content-id="menuItem"
							>
								Item 3
							</LI>
						</div>
						<div className="menu-item">
							<LI
								className="menu-link"
								onClick={handler}
								data-tooltip-config="group:menu bottom pop3"
								data-tooltip-content-id="menuItem"
							>
								Item 4
							</LI>
						</div>
						<div className="menu-item">
							<BTN className="menu-button" onClick={handler} data-tooltip-content-id="button">
								Button
							</BTN>
						</div>
					</div>
				</div>
			</header>
			{tooltips}
		</>
	)
}

export default Header
