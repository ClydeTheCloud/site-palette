import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainFrame from './components/MainFrame';
import Switcher from './components/Switcher';
import { Provider } from 'react-redux';
import { store } from './logic/store';
import { Tooltip } from './components/utility/Tooltip';

function App() {
	return (
		<Provider store={store}>
			<Switcher />
			<div className="app">
				<Header />
				<MainFrame />
				<Footer />
			</div>
		</Provider>
	);
}

export default App;
