import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	userLoginReducer,
	userRegisterReducer,
} from './reducers/userReducers.js'
import {
	addDocListReducer,
	editDocReducer
} from './reducers/documentReducers.js'
import {
	receiverReducer
} from './reducers/receiverReducers.js'
import {
	webviewerReducer
} from './reducers/webviewerReducers.js'

const initialState = {
	userInfo: { name: 'abc'},
	documentList: []
}

const middleware = [thunk]

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	addDocList: addDocListReducer,
	editDoc: editDocReducer,
	receivers: receiverReducer,
	webviewer: webviewerReducer
})

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
