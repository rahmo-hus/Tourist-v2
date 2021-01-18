export const createTask = (task) =>{
    return (dispatch, getState, {getFirebase, getFirestore}) =>{
        //in this function we will do some async code to database

        const firestore = getFirestore()

        firestore.collection('tasks').add({
            ...task,
            createdAt: new Date(),
            authorFirstName:'Author',
            authorLastName: 'Someone'
        }).then(() =>{
            dispatch({
              type: "CREATE_TASK",
              task: task
            });
        }).catch(err =>{
            dispatch({
                type: "CREATE_TASK_ERROR",
                err: err
            })
        })
    }
}