export const createQuest = (quest) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        const firestore = getFirestore();
        dispatch({type: "ADDING_TASK"})
        firestore
            .collection("quests")
            .add({
                ...quest,
                createdAt: new Date()
            })
            .then((ref) => {
                dispatch({
                    type: "CREATE_TASK",
                    quest: quest
                });
                firestore.collection("statistics").doc(ref.id).set({title: quest.title, timesSolved: 0});
            })
            .catch((err) => {
                dispatch({
                    type: "CREATE_TASK_ERROR",
                    err: err,
                });
            });
    };
};

export const uploadMultipleFiles = (files) => {

    return (dispatch, state, {getFirebase, getFirestore}) => {

        const firebase = getFirebase();
        const imageURLs = [];

        const promises = [];
        files.forEach(file => {
            const uploadTask = firebase.storage().ref(`photos/${file.name}`).put(file);
            promises.push(uploadTask);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    const progress = snapshot.bytesTransferred * 100 / snapshot.totalBytes;
                    if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                        dispatch({
                            type: "UPLOAD_PROGRESS",
                            uploadProgress: Math.round(progress),
                            success:false
                        })
                    }
                },
                err => console.log(err),
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    imageURLs.push(downloadURL);
                }
            )
        });
        Promise.all(promises)
            .then(() => {
                dispatch({
                    type: "GALLERY_UPLOAD_SUCCESS",
                    gallery: imageURLs,
                    success: true
                })
            })
            .catch(err => dispatch({
                type: "UPLOAD_ERROR",
                err
            }));
    }

}

export const deleteTask = (id) => {
    return (dispatch, state, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('quests').doc(id).delete()
            .then(() => {
                dispatch({
                    type: "DELETE_SUCCESS"
                });
                firestore.collection('statistics').doc(id).delete().then().catch();
            }).catch(err => {
            dispatch({
                type: "DELETE_ERROR",
                err
            })
        })
    }
}
export const restoreDefaults = () => {
    return (dispatch, state, {getFirebase, getFirestore}) => {
        dispatch({
            type: "RESTORE_DEFAULTS",
            err: null,
            imageURL: '',
            uploadProgress: 0,
            gallery: [],
            success:false
        })
    }
}

export const updateQuest = (task, id) => {
    return (dispatch, state, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('quests').doc(id).update({
            ...task
        }).then(() => {
            dispatch({
                type: "UPDATE_SUCCESS"
            })
        }).catch(err => {
            dispatch({
                type: "UPDATE_ERROR",
                err
            })
        })

        firestore.collection('statistics').doc(id).update({title: task.title});
    }
}
