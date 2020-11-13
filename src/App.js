import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MainFrame from './components/MainFrame'
import Switcher from './components/Switcher'
import { useEffect } from 'react'
import { init } from './logic/actions'

function App() {
	const dispatch = useDispatch()
	const state = useSelector(state => state)

	useEffect(() => {
		dispatch(init())
	}, [dispatch])

	useEffect(() => {
		localStorage.setItem('palette', JSON.stringify(state))
	})

	return (
		<>
			<Switcher />
			<div className="app">
				<Header />
				<MainFrame />
				<Footer />
			</div>
		</>
	)
}

export default App
