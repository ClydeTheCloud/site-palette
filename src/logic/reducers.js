import { CREATE_NEW_PALETTE, DELETE_PALETTE, NEXT_PALETTE, PREV_PALETTE, SAVE_PALETTE, NEXT_COLOR, PREV_COLOR } from './actions'
import { initialState, paletteTemplate } from './initialState.js'

export const palettes = (state = initialState, action) => {
	let { activePalette, paletteData } = state
	switch (action.type) {
		case NEXT_PALETTE:
			if (activePalette + 1 !== paletteData.length) {
				return {
					...state,
					activePalette: activePalette + 1,
				}
			} else {
				return {
					...state,
					activePalette: 0,
				}
			}
		case PREV_PALETTE:
			if (activePalette !== 0) {
				return {
					...state,
					activePalette: activePalette - 1,
				}
			} else {
				return {
					...state,
					activePalette: paletteData.length - 1,
				}
			}
		case SAVE_PALETTE:
			paletteData.splice(action.data.paletteId, 1, action.data.newPalette)
			return {
				...state,
				paletteData,
			}
		case DELETE_PALETTE:
			if (paletteData.length > 1) {
				paletteData.splice(action.data.paletteId, 1)
				return {
					activePalette: activePalette > paletteData.length - 1 ? activePalette - 1 : activePalette,
					paletteData,
				}
			} else {
				return state
			}
		case CREATE_NEW_PALETTE:
			paletteData.push(paletteTemplate)
			return {
				paletteData,
				activePalette: paletteData.length - 1,
			}
		case NEXT_COLOR:
			if (paletteData[activePalette].addresses[action.data.section][action.data.address] < 9) {
				paletteData[activePalette].addresses[action.data.section][action.data.address]++
				return { activePalette, paletteData }
			} else {
				paletteData[activePalette].addresses[action.data.section][action.data.address] = 0
				return { activePalette, paletteData }
			}
		case PREV_COLOR:
			if (paletteData[activePalette].addresses[action.data.section][action.data.address] > 0) {
				paletteData[activePalette].addresses[action.data.section][action.data.address]--
				return { activePalette, paletteData }
			} else {
				paletteData[activePalette].addresses[action.data.section][action.data.address] = 9
				return { activePalette, paletteData }
			}
		default:
			return state
	}
}
