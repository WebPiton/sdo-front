
import { SELECTED_STUDENT, STUDENT_ERROR } from './actionTypes'

export function studentSuccess(name, group, uid, sessionStudent) {
    return {
        type: SELECTED_STUDENT,
        group,
        name,
        uid,
        sessionStudent
    }
}

export function studentError(error) {
    return {
        type: STUDENT_ERROR,
        error
    }
}