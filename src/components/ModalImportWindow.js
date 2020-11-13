import React from 'react'
import { useState } from 'react'

import './ModalImportWindow.css'

function ModalImportWindow(props) {
	const [type, setType] = useState('')
	const [textareaValue, setTextareaValue] = useState('')

	let arrayButtonClasses,
		coolorsButtonClasses = 'type-btn'

	function handleTypeChange(newType) {
		setType(newType)
	}

	function parseImportString() {
		let importString = textareaValue
		let hexArray
		if (type === 'array') {
			importString = importString.trim().replace(/[\][,"]/g, '')
			importString = importString.replace(/[\n\r]/g, ' ')
			hexArray = importString.split(' ')
			props.importHandler(hexArray.map(str => (str.startsWith('#') ? str : `#${str}`)))
		} else if (type === 'coolors.co') {
			importString = importString.trim().replace('https://', '')
			importString = importString.replace('coolors.co/', '')
			hexArray = importString.split('-')
			props.importHandler(hexArray.map(str => `#${str}`))
		}
	}

	arrayButtonClasses = type === 'array' ? 'type-btn type-btn-active' : 'type-btn'
	coolorsButtonClasses = type === 'coolors.co' ? 'type-btn type-btn-active' : 'type-btn'

	return (
		<div className="modal modal-2">
			<div className="modal-import">
				<div className="modal-edit-close-btn" onClick={props.modalImportToggle}>
					&times;
				</div>
				<div className="modal-btn-wrapper">
					<button
						className={arrayButtonClasses}
						onClick={() => {
							handleTypeChange('array')
						}}
					>
						Array
					</button>
					<button
						className={coolorsButtonClasses}
						onClick={() => {
							handleTypeChange('coolors.co')
						}}
					>
						coolors.co
					</button>
				</div>
				<textarea
					value={textareaValue}
					onChange={e => setTextareaValue(e.target.value)}
					className="import-textarea"
					disabled={!type}
				></textarea>
				<button onClick={parseImportString} disabled={!type} className="modal-btn import">
					Import
				</button>
			</div>
		</div>
	)
}

export default ModalImportWindow
