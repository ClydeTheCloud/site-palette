import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MainFrame from './components/MainFrame'
import Switcher from './components/Switcher'
import Help from './components/help'
import { init } from './logic/actions'

function App() {
	const tutorialFinished = localStorage.getItem('tutorial')
	const [scroll, setScroll] = useState(Boolean(tutorialFinished))
	const dispatch = useDispatch()
	const state = useSelector(state => state)

	useEffect(() => {
		dispatch(init())
	}, [dispatch])

	useEffect(() => {
		localStorage.setItem('palette', JSON.stringify(state))
	})

	return (
		<div className={scroll ? '' : 'no-scroll'}>
			<Switcher />
			{scroll || tutorialFinished ? null : <Help setScroll={setScroll} />}
			<div className="app">
				<Header />
				<MainFrame />
				<Footer />
			</div>
		</div>
	)
}

export default App
