const initState = {
    error: '',
    success:'',
    uploadProgress:0,
    imageURL:''
}
const taskReducer = (state = initState, action) =>{

    switch (action.type) {
        case "CREATE_TASK":
            console.log("created task", action.task)
            return{
                ...state,
                inProgress:false,
                success: 'Uspjesno dodato'
            }
        case "CREATE_TASK_ERROR":
            console.log("error create task", action.err);
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
        default:
            return state;
    }
}

export default taskReducer