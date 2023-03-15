// legacy terbaru dari create store
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
// thunk untuk asyncronus method
import thunk from 'redux-thunk';
// kumpulan dari beberapa reducer reducer
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
