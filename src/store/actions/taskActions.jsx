export const createTask = (task) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //in this function we will do some async code to database

    const firestore = getFirestore();
    dispatch({type:"ADDING_TASK"})
    firestore
      .collection("tasks")
      .add({
        ...task,
        createdAt: new Date(),
        authorFirstName: "Author",
        authorLastName: "Someone",
      })
      .then(() => {
        dispatch({
          type: "CREATE_TASK",
          task: task,
        });
      })
      .catch((err) => {
        dispatch({
          type: "CREATE_TASK_ERROR",
          err: err,
        });
      });
  };
};

export const uploadFile = (file) =>{
  return (dispatch, state, {getFirebase, getFirestore}) => {

    const firestore = getFirestore()
    const uploadTask = firestore.storage().ref(`/files/${file.name}`).put(file);
    dispatch({
      type:"UPLOAD_PENDING"
    })
    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot.bytesTransferred/snapshot.totalBytes)
    }, 
    (error) =>{
      console.log('error occured during upload', error)
      dispatch({
        type:"UPLOAD_ERROR",
        err:error
      })
    }, 
    () => dispatch({
      type:"UPLOAD_SUCCESSFUL",
      file: file
    }))


  }
}