import React from 'react';
import './Item.css';
import { useSelector } from 'react-redux';
import { DIV, H3, P, BTN } from './_styled-components';

function Item(props) {
	const { activePalette, paletteData } = useSelector(state => state);

	DIV.defaultProps = {
		bg:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.items.bg
			],
	};

	H3.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.items.name
			],
	};

	P.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.items.text
			],
	};

	BTN.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.items.btn
			],
		bg:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.items.btnBg
			],

		colorHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.items.btnOffset
			],
		bgHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.items.btnBgOffset
			],
	};

	return (
		<DIV className="item">
			<div className="img-container">
				<img src={props.data.urls.thumb} alt={props.data.user.first_name} />
			</div>
			<H3>
				{props.data.user.first_name} {props.data.user.last_name}
			</H3>
			<P>{props.data.description}</P>
			<BTN>BUTTON!</BTN>
		</DIV>
	);
}

export default Item;
