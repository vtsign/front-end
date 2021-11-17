import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	userLoginReducer,
	userRegisterReducer,
} from './reducers/userReducers.js'
import {
	editDocReducer
} from './reducers/documentReducers.js'

import { manageDocumentReducer } from './reducers/manageReducer.js';

const initialState = {
	userInfo: { name: 'abc'}
}

const middleware = [thunk]

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	editDoc: editDocReducer,
	manageDoc: manageDocumentReducer
})

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
