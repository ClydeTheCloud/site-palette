import React, { useState } from 'react'
import './ErrorPopUp.css'

function ErrorPopUp({ message, close }) {
	return (
		<div className="modal modal-3">
			<div className="modal-error-window">
				<h4 className="modal-error">Error:</h4>
				<p className="modal-error-message">{message}</p>
				<button className="modal-error-btn" onClick={close}>
					Ok
				</button>
			</div>
		</div>
	)
}

function useError() {
	const [isOpen, setIsOpen] = useState(false)
	const [message, setMessage] = useState('Error message is not yet initialized')

	function isOpenToggle() {
		setIsOpen(!isOpen)
	}

	function setError(message) {
		setIsOpen(true)
		setMessage(message)
	}

	return [isOpen ? <ErrorPopUp message={message} close={isOpenToggle} /> : null, setError]
}

export default useError
