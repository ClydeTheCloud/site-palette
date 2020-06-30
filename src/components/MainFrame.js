import React, { useState, useEffect } from 'react';
import Item from './Item';
import './MainFrame.css';
import { useSelector } from 'react-redux';
import { H1, H2, H3, P, BTN_BORDER } from './_styled-components';

function MainFrame() {
	const { activePalette, paletteData } = useSelector(state => state);

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	function getItems() {
		fetch(
			'https://api.unsplash.com/search/photos?query=web&page=1&per_page=6&client_id=TOtBpPWZNPVXNxTI7xvV6A6x5lCl0f59Hj1e0LDUwtk'
		).then(response => {
			response.json().then(com => {
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

	H1.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.main.title
			],
	};
	H2.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.main.title
			],
	};
	H3.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.main.subTitle
			],
	};
	P.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.main.text
			],
	};
	BTN_BORDER.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.main.btn
			],
		bg:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.main.btnBg
			],
		border:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.main.btnBorder
			],
		colorHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.main.btnOffset
			],
		bgHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.main.btnBgOffset
			],
	};

	document.body.style = `background: ${
		paletteData[activePalette].colors[
			paletteData[activePalette].addresses.main.bg
		]
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
				<BTN_BORDER className="main-btn">TRY IT OUT NOW</BTN_BORDER>
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
