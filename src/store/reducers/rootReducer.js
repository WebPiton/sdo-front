import {combineReducers} from 'redux'
import authReducer from './Auth'
import studentReducer from './Student'

export default combineReducers ({
    auth: authReducer,
    student: studentReducer
})