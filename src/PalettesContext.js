import React, { useState, createContext } from 'react';

let storedPalettes_BUFFER;
let storedColorsAddress_BUFFER;
let activeName_BUFFER;

const defaultPalettes = [
	{
		name: 'Default',
		palette: [
			'#dddddd',
			'#999999',
			'#ffffff',
			'#000000',
			'#0282fa',
			'#555555',
			'#99dddd',
			'#222222',
			'#ffaa00',
			'',
		],
	},
	{
		name: 'Default2',
		palette: [
			'#dddd00',
			'#990099',
			'#00ffff',
			'#000099',
			'#6200fa',
			'#005555',
			'#9900dd',
			'#228800',
			'#ff0000',
			'',
		],
	},
	{
		name: 'White',
		palette: [
			'#eeeeee',
			'#ffffff',
			'#dddddd',
			'#aaaaaa',
			'#bbbbbb',
			'#cccccc',
			'#eeeeee',
			'#999999',
			'#888888',
			'',
		],
	},
];

const defaultColorsAddress = [
	{
		name: 'Default',
		addresses: {
			header: {
				bg: 0,
				logo: 7,
				menuItem: 7,
				menuItemOffset: 4,
				menuBtn: 2,
				menuBtnBg: 1,
				menuBtnOffset: 3,
				menuBtnBgOffset: 4,
			},
			main: {
				bg: 2,
				title: 7,
				subTitle: 7,
				text: 7,
				btn: 2,
				btnBg: 3,
				btnOffset: 7,
				btnBgOffset: 2,
				btnBorder: 7,
			},
			items: {
				bg: 0,
				name: 3,
				text: 3,
				btn: 3,
				btnBg: 6,
				btnOffset: 3,
				btnBgOffset: 4,
			},
			footer: {
				bg: 0,
				titles: 5,
				text: 5,
				link: 3,
				linkOffset: 4,
				social: 3,
				socialOffset: 4,
				btn: 2,
				btnBg: 3,
				btnOffset: 7,
				btnBgOffset: 2,
				btnBorder: 7,
			},
		},
	},
	{
		name: 'Default2',
		addresses: {
			header: {
				bg: 0,
				logo: 7,
				menuItem: 7,
				menuItemOffset: 4,
				menuBtn: 2,
				menuBtnBg: 1,
				menuBtnOffset: 3,
				menuBtnBgOffset: 4,
			},
			main: {
				bg: 2,
				title: 7,
				subTitle: 7,
				text: 7,
				btn: 2,
				btnBg: 3,
				btnOffset: 7,
				btnBgOffset: 2,
				btnBorder: 7,
			},
			items: {
				bg: 0,
				name: 3,
				text: 3,
				btn: 3,
				btnBg: 6,
				btnOffset: 3,
				btnBgOffset: 4,
			},
			footer: {
				bg: 0,
				titles: 5,
				text: 5,
				link: 3,
				linkOffset: 4,
				social: 3,
				socialOffset: 4,
				btn: 2,
				btnBg: 3,
				btnOffset: 7,
				btnBgOffset: 2,
				btnBorder: 7,
			},
		},
	},
	{
		name: 'White',
		addresses: {
			header: {
				bg: 0,
				logo: 7,
				menuItem: 7,
				menuItemOffset: 4,
				menuBtn: 2,
				menuBtnBg: 1,
				menuBtnOffset: 3,
				menuBtnBgOffset: 4,
			},
			main: {
				bg: 2,
				title: 7,
				subTitle: 7,
				text: 7,
				btn: 2,
				btnBg: 3,
				btnOffset: 7,
				btnBgOffset: 2,
				btnBorder: 7,
			},
			items: {
				bg: 0,
				name: 3,
				text: 3,
				btn: 3,
				btnBg: 6,
				btnOffset: 3,
				btnBgOffset: 4,
			},
			footer: {
				bg: 0,
				titles: 5,
				text: 5,
				link: 3,
				linkOffset: 4,
				social: 3,
				socialOffset: 4,
				btn: 2,
				btnBg: 3,
				btnOffset: 7,
				btnBgOffset: 2,
				btnBorder: 7,
			},
		},
	},
];

if (localStorage.getItem('palettes') !== null) {
	storedPalettes_BUFFER = JSON.parse(localStorage.getItem('palettes'));
} else {
	storedPalettes_BUFFER = defaultPalettes;
}

if (localStorage.getItem('addresses') !== null) {
	storedColorsAddress_BUFFER = JSON.parse(localStorage.getItem('addresses'));
} else {
	storedColorsAddress_BUFFER = defaultColorsAddress;
}

if (localStorage.getItem('activeName') !== null) {
	activeName_BUFFER = JSON.parse(localStorage.getItem('activeName'));
} else {
	activeName_BUFFER = 'Default';
}

export const PalettesContext = createContext();

export const PaletteProvider = (props) => {
	const [allPalettes, setPalettes] = useState(storedPalettes_BUFFER);
	const [allAddresses, setAddresses] = useState(storedColorsAddress_BUFFER);
	const [activePaletteName, setActivePalette] = useState(activeName_BUFFER);

	let activeColors = allPalettes.find((x) => x.name === activePaletteName);
	let activeAddress = allAddresses.find((x) => x.name === activePaletteName);

	console.log('This is active name', activePaletteName);
	console.log('This is active colors', activeColors);
	console.log('This is active address', activeAddress);
	console.log('This is all Palettes', allPalettes);

	return (
		<PalettesContext.Provider
			value={[
				allPalettes,
				allAddresses,
				activePaletteName,
				activeColors,
				activeAddress,
				setActivePalette,
				setPalettes,
			]}
		>
			{props.children}
		</PalettesContext.Provider>
	);
};
