import {
	CREATE_NEW_PALETTE,
	DELETE_PALETTE,
	NEXT_PALETTE,
	PREV_PALETTE,
	SAVE_PALETTE,
} from './actions';
import { initialState, paletteTemplate } from './initialState.js';

export const palettes = (state = initialState, action) => {
	let { activePalette, paletteData } = state;
	switch (action.type) {
		case NEXT_PALETTE:
			if (activePalette + 1 !== paletteData.length) {
				return {
					...state,
					activePalette: activePalette + 1,
				};
			} else {
				return {
					...state,
					activePalette: 0,
				};
			}
		case PREV_PALETTE:
			if (activePalette !== 0) {
				return {
					...state,
					activePalette: activePalette - 1,
				};
			} else {
				return {
					...state,
					activePalette: paletteData.length - 1,
				};
			}
		case SAVE_PALETTE:
			paletteData.splice(action.data.paletteId, 1, action.data.newPalette);
			return {
				...state,
				paletteData,
			};
		case DELETE_PALETTE:
			if (paletteData.length > 1) {
				paletteData.splice(action.data.paletteId, 1);
				return {
					activePalette:
						activePalette > paletteData.length - 1
							? activePalette - 1
							: activePalette,
					paletteData,
				};
			} else {
				return state;
			}
		case CREATE_NEW_PALETTE:
			paletteData.push(paletteTemplate);
			return {
				paletteData,
				activePalette: paletteData.length - 1,
			};
		default:
			return state;
	}
};
