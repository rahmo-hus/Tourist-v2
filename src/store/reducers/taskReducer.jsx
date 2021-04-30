const initState = {
    error: '',
    success:'',
    uploadProgress:0,
    imageURL:''
}
const taskReducer = (state = initState, action) =>{

    switch (action.type) {
        case "CREATE_TASK":
            return{
                ...state,
                inProgress:false,
                success: 'Uspjesno dodato'
            }
        case "CREATE_TASK_ERROR":
            return {
                ...state,
                inProgress:false,
                error:action.err
            }
        case "ADDING_TASK":
            return{
                ...state,
                inProgress:true
            }
        case "UPLOAD_SUCCESS":
            return {
                ...state,
                imageURL:action.imageURL
            }

        case "UPLOAD_ERROR":
            return {
                ...state,
                err:action.err
            }

        case "UPLOAD_PENDING":
            return {
                ...state,
                uploadProgress:action.uploadProgress
            }
        case "RESTORE_DEFAULTS":
            return {
                ...state,
                imageURL:action.imageURL,
                uploadProgress:action.uploadProgress,
                err:action.err,
                success:''
            }
        case "DELETE_SUCCESS":
            return state;
        case "DELETE_ERROR":
            return {
                ...state,
                err: action.err
            }
        case "UPDATE_SUCCESS":
            return state;
        case "UPDATE_FAILED":
            return {
                ...state,
                err: action.err
            }
        default:
            return state;
    }
}

export default taskReducer
