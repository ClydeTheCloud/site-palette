export const NEXT_PALETTE = 'NEXT_PALETTE';
export const nextPalette = () => ({
	type: NEXT_PALETTE,
});

export const PREV_PALETTE = 'PREV_PALETTE';
export const prevPalette = () => ({
	type: PREV_PALETTE,
});

export const CREATE_NEW_PALETTE = 'CREATE_NEW_PALETTE';
export const createNewPalette = () => ({
	type: CREATE_NEW_PALETTE,
});

export const DELETE_PALETTE = 'DELETE_PALETTE';
export const deletePalette = paletteId => ({
	type: DELETE_PALETTE,
	data: { paletteId },
});

export const SAVE_PALETTE = 'SAVE_PALETTE';
export const savePalette = (paletteId, newPalette) => ({
	type: SAVE_PALETTE,
	data: { paletteId, newPalette },
});
