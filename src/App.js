import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainFrame from './components/MainFrame';
import Switcher from './components/Switcher';
import { PaletteProvider } from './PalettesContext';

function App() {
	return (
		<PaletteProvider>
			<div className="app">
				<Switcher />
				<Header />
				<MainFrame />
				<Footer />
			</div>
		</PaletteProvider>
	);
}

export default App;
