// combineReducers dari redux
import {combineReducers} from 'redux';
// class video reducer dari video
import {videoReducer} from './video';

// kombinasi kan
const reducer = combineReducers({videoReducer});
export default reducer;
