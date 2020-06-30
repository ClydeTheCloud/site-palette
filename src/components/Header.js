import React from 'react';
import Logo from './img/Logo';
import './Header.css';
import { useSelector } from 'react-redux';
import { LI, BTN } from './_styled-components';

function Header() {
	const { activePalette, paletteData } = useSelector(state => state);

	LI.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.header.menuItem
			],
		colorHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.header.menuItemOffset
			],
	};

	BTN.defaultProps = {
		bg:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.header.menuBtnBg
			],
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.header.menuBtn
			],

		bgHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.header.menuBtnBgOffset
			],
		colorHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.header.menuBtnOffset
			],
	};

	const style = {
		header: {
			backgroundColor:
				paletteData[activePalette].colors[
					paletteData[activePalette].addresses.header.bg
				],
		},
	};

	let defaultLogoColor =
		paletteData[activePalette].colors[
			paletteData[activePalette].addresses.header.logo
		];

	return (
		<div>
			<header style={style.header}>
				<div className="wrapper">
					<Logo color={defaultLogoColor} />
					<div className="menu-wrapper">
						<div className="menu-item">
							<LI className="menu-link">Item 1</LI>
						</div>
						<div className="menu-item">
							<LI className="menu-link">Item 2</LI>
						</div>
						<div className="menu-item">
							<LI className="menu-link">Item 3</LI>
						</div>
						<div className="menu-item">
							<LI className="menu-link">Item 4</LI>
						</div>
						<div className="menu-item">
							<BTN className="menu-button">Button</BTN>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}

export default Header;
