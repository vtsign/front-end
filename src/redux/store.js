import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
	userLoginReducer,
	userRegisterReducer
} from './reducers/userReducers.js'

const initialState = {

}

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
})

const store = createStore(
	reducer,
	initialState
)

export default store;
