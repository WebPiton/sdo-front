import { AUTH_LOGOUT_STUDENT, SELECTED_STUDENT, STUDENT_ERROR } from "../actions/actionTypes"

const initialState = {
    idSchool: null,
    idGroup: null,
    idStudent: null,
    token: null,
    error: null
}


export default function studentReducer(state = initialState, action) {
    switch (action.type) {
        case SELECTED_STUDENT:
            return {
                ...state, idSchool: action.idSchool, idGroup: action.idGroup, idStudent: action.idStudent, token: action.token
            }
        case STUDENT_ERROR:
            return {
                ...state, error: action.error
            }
        default:
            return state
    }
}