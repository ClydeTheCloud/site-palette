import React, { useState, useEffect, useContext } from 'react';
import Item from './Item';
import './MainFrame.css';
import { PalettesContext } from '../PalettesContext';
import styled from 'styled-components';

function MainFrame() {
	let context = useContext(PalettesContext);

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	function getItems() {
		fetch(
			'https://api.unsplash.com/search/photos?query=web&page=1&per_page=6&client_id=TOtBpPWZNPVXNxTI7xvV6A6x5lCl0f59Hj1e0LDUwtk'
		).then((response) => {
			response.json().then((com) => {
				setData(com.results);
				setIsLoading(false);
			});
		});
	}

	let items = data.map((item, index) => {
		return <Item data={item} key={index} />;
	});

	useEffect(() => {
		getItems();
	}, []);

	const H1 = styled.h1`
		color: ${context[3].palette[context[4].addresses.main.title]};
	`;
	const H2 = styled.h2`
		color: ${context[3].palette[context[4].addresses.main.title]};
	`;
	const H3 = styled.h3`
		color: ${context[3].palette[context[4].addresses.main.subTitle]};
	`;
	const P = styled.p`
		color: ${context[3].palette[context[4].addresses.main.text]};
	`;
	const Btn = styled.button`
		color: ${context[3].palette[context[4].addresses.main.btn]};
		background-color: ${context[3].palette[context[4].addresses.main.btnBg]};
		border: 1px solid ${context[3].palette[context[4].addresses.main.btnBorder]};
		&:hover {
			color: ${context[3].palette[context[4].addresses.main.btnOffset]};
			background-color: ${context[3].palette[
				context[4].addresses.main.btnBgOffset
			]};
		}
	`;

	document.body.style = `background: ${
		context[3].palette[context[4].addresses.main.bg]
	}`;

	const loadingMessage = (
		<H2 className="loading-item">Loading, please wait...</H2>
	);

	return (
		<div className="wrapper main">
			<div className="main-text">
				<H1>Some title text go here.</H1>
				<H3>
					Some more text to explain something very important. You need to hear
					this.
				</H3>
				<P>
					This is where we go in detail. Take a closer look. We sure you'll like
					it. A lot. But don't take my word for it, go on and try it yourself!
					I'll wait for you here, don't worry, i'm not going anywhere. Take your
					time.
				</P>
				<Btn className="main-btn">TRY IT OUT NOW</Btn>
			</div>
			<div className="main-background-image"></div>
			<div className="wrapper wrapper-items">
				<H2>Here are some items from unsplash API:</H2>
				<div className="items">{isLoading ? loadingMessage : items}</div>
			</div>
		</div>
	);
}

export default MainFrame;
