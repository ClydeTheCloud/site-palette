import { createStore } from 'redux';
import { palettes } from './reducers';

export const store = createStore(
	palettes,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
