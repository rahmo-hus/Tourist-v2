const initState = {
    error: '',
    success:false
}
const taskReducer = (state = initState, action) =>{

    switch (action.type) {
        case "CREATE_TASK":
            console.log("created task", action.task)
            return{
                ...state,
                inProgress:false,
                success: true
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
        default:
            return state;
    }
}

export default taskReducer