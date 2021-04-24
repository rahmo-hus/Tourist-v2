export const createTask = (task) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

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
      .then((ref) => {
        dispatch({
          type: "CREATE_TASK",
          task: task
        });
        firestore.collection("statistics").doc(ref.id).set({title:task.title, timesSolved:0}).then(() => {console.log('success add stat')})
      .catch((err) => {console.log('error add stat')});
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

    const firebase = getFirebase();

    var uploadTask= firebase.storage().ref(`nesto/${file.name}`).put(file);

    uploadTask.on('state_changed' , (snapshot) =>{
      dispatch({
        type: "UPLOAD_PENDING",
        uploadProgress: Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
      });
    } , (error) => {
      dispatch({
        type:"UPLOAD_ERROR",
        err:error
      })
    }, ()=> {
      firebase.storage().ref('nesto').child(file.name).getDownloadURL().then(url=>{
        console.log(url)
        dispatch({
          type:"UPLOAD_SUCCESS",
          imageURL:url,
          uploadProgress: 0
        })
      })
    })

   // firebase.uploadFile('/nesto', file, '/nesto');

  }
}

export const deleteTask = (id) =>{
  return(dispatch, state, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('tasks').doc(id).delete()
    .then(()=>{
      dispatch({
        type:"DELETE_SUCCESS"
      })
    }).catch(err=>{
      dispatch({
        type:"DELETE_ERROR",
        err
      })
    })
  }
}
export const restoreDefaults = () =>{
    return (dispatch, state, {getFirebase, getFirestore}) =>{
      dispatch({
        type:"RESTORE_DEFAULTS",
        err:null,
        imageURL: '',
        uploadProgress: 0,
      })
    }
}

export const updateTask = (task, id) =>{
    return (dispatch, state, {getFirebase, getFirestore}) =>{
      const firestore = getFirestore();

      firestore.collection('tasks').doc(id).update({
          ...task
      }).then(()=>{
        dispatch({
          type:"UPDATE_SUCCESS"
        })
      }).catch(err =>{
        dispatch({
          type:"UPDATE_ERROR",
          err
        })
      })

      firestore.collection('statistics').doc(id).update({title:task.title}).then(() => {console.log('do some dispatch')})
      .catch(err => {console.log('catch error')});
    }
}