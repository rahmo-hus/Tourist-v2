const initState = {
    authError: '',
    inProgress: false,
    resetError: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            return {
                ...state,
                authError: "Login failed",
                inProgress: false
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                authError: '',
                inProgress: false
            };
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                inProgress: false
            }
        case "LOGGING_IN":
            return {
                ...state,
                inProgress: true
            }
        case "PASSWORD_RESET_PROGRESS":
            return {
                ...state,
                inProgress: true
            }
        case "PASSWORD_RESET_EMAIL_SENT_SUCCESS":
            return {
                ...state,
                resetError: '',
                inProgress: false
            }
        case "PASSWORD_RESET_FAILED":
            return {
                ...state,
                resetError: 'Korisnik sa zadatim e-mailom ne postoji',
                inProgress: false
            }
        default:
            return state;
    }
}

export default authReducer
