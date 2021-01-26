const initState={
    authError:'',
    inProgress: false
}

const authReducer = (state = initState, action) =>{
    switch (action.type) {
      case "LOGIN_ERROR":
        console.log('login error', action.err)
        return {
          ...state,
          authError: "Login failed",
          inProgress:false
        };
      case "LOGIN_SUCCESS":
        console.log('login success')
        return {
          ...state,
          authError: '',
          inProgress:false
        };
        case "LOGOUT_SUCCESS":
        console.log('logout success')
        return {
            ...state,
            inProgress:false
        }
        case "LOGGING_IN":
        console.log('waiting')
        return{
            ...state,
            inProgress:true
        }
      default:
        return state;
    }
}

export default authReducer