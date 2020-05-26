import React, { useContext } from 'react';
import './Item.css';
import { PalettesContext } from '../PalettesContext';
import styled from 'styled-components';

function Item(props) {
	let context = useContext(PalettesContext);

	const DIV = styled.div`
		background-color: ${context[3].palette[context[4].addresses.items.bg]};
	`;
	const H3 = styled.h3`
		color: ${context[3].palette[context[4].addresses.items.name]};
	`;
	const P = styled.p`
		color: ${context[3].palette[context[4].addresses.items.text]};
	`;

	const BTN = styled.button`
		color: ${context[3].palette[context[4].addresses.items.btn]};
		background-color: ${context[3].palette[context[4].addresses.items.btnBg]};
		&:hover {
			color: ${context[3].palette[context[4].addresses.items.btnOffset]};
			background-color: ${context[3].palette[
				context[4].addresses.items.btnBgOffset
			]};
		}
	`;

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
