import React, { useContext } from 'react';
import Logo from './img/Logo';
import './Header.css';
import { PalettesContext } from '../PalettesContext';
import styled from 'styled-components';

function Header() {
	let context = useContext(PalettesContext);

	const style = {
		header: {
			backgroundColor: context[3].palette[context[4].addresses.header.bg],
		},
	};

	const MenuA = styled.a`
		color: ${context[3].palette[context[4].addresses.header.menuItem]};
		&:hover {
			color: ${context[3].palette[context[4].addresses.header.menuItemOffset]};
		}
	`;

	const MenuBtn = styled.button`
		background-color: ${context[3].palette[
			context[4].addresses.header.menuBtnBg
		]};
		color: ${context[3].palette[context[4].addresses.header.menuBtn]};
		&:hover {
			background-color: ${context[3].palette[
				context[4].addresses.header.menuBtnBgOffset
			]};
			color: ${context[3].palette[context[4].addresses.header.menuBtnOffset]};
		}
	`;

	let defaultLogoColor = context[3].palette[context[4].addresses.header.logo];

	return (
		<div>
			<header style={style.header}>
				<div className="wrapper">
					<Logo color={defaultLogoColor} />
					<div className="menu-wrapper">
						<div className="menu-item">
							<MenuA href="http://localhost:3000/#" className="menu-link">
								Item 1
							</MenuA>
						</div>
						<div className="menu-item">
							<MenuA href="http://localhost:3000/#" className="menu-link">
								Item 2
							</MenuA>
						</div>
						<div className="menu-item">
							<MenuA href="http://localhost:3000/#" className="menu-link">
								Item 3
							</MenuA>
						</div>
						<div className="menu-item">
							<MenuA href="http://localhost:3000/#" className="menu-link">
								Item 4
							</MenuA>
						</div>
						<div className="menu-item">
							<MenuBtn className="menu-button">Button</MenuBtn>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}

export default Header;
