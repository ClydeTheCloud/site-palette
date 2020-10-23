let vaultCounter = 0
const vault = {}

function vaultCheck(id) {
	const entry = Object.entries(vault).find(v => v[1] === id)
	if (!entry) {
		const currentCounter = vaultCounter
		vaultCounter = vaultCounter + 1
		vault[currentCounter] = id
		return currentCounter
	}
	return parseInt(entry[0])
}

export default vaultCheck
