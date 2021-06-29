import {
    ADDING_QUEST,
    CREATE_QUEST,
    CREATE_QUEST_ERROR,
    GALLERY_UPLOAD_SUCCESS,
    QUEST_DELETE_ERROR,
    QUEST_DELETE_SUCCESS,
    QUEST_UPDATE_ERROR,
    QUEST_UPDATE_SUCCESS,
    RESTORE_DEFAULTS,
    UPLOAD_ERROR,
    UPLOAD_PROGRESS
} from "../types";

export const createQuest = (quest) => {
    return (dispatch, getState, {getFirestore}) => {

        const firestore = getFirestore();
        dispatch({type: ADDING_QUEST})
        firestore
            .collection("quests")
            .add({
                ...quest,
                createdAt: new Date()
            })
            .then((ref) => {
                console.log(ref)
                dispatch({
                    type: CREATE_QUEST,
                    quest: quest,
                    id:ref.id
                });
                firestore.collection("statistics").doc(ref.id).set({title: quest.title, timesSolved: 0});
            })
            .catch((err) => {
                dispatch({
                    type: CREATE_QUEST_ERROR,
                    err: err,
                });
            });
    };
};

export const uploadMultipleFiles = (files) => {

    return (dispatch, state, {getFirebase}) => {

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
                            type: UPLOAD_PROGRESS,
                            uploadProgress: Math.round(progress),
                            success: false
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
                    type: GALLERY_UPLOAD_SUCCESS,
                    gallery: imageURLs,
                    success: true
                })
            })
            .catch(err => dispatch({
                type: UPLOAD_ERROR,
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
                    type: QUEST_DELETE_SUCCESS
                });
                firestore.collection('statistics').doc(id).delete().then().catch();
            }).catch(err => {
            dispatch({
                type: QUEST_DELETE_ERROR,
                err
            })
        })
    }
}
export const restoreDefaults = () => {
    return (dispatch) => {
        dispatch({
            type: RESTORE_DEFAULTS,
            err: null,
            imageURL: '',
            uploadProgress: 0,
            gallery: [],
            success: false
        })
    }
}

export const updateQuest = (quest, id) => {
    return (dispatch, state, {getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('quests').doc(id).update({
            ...quest
        }).then(() => {
            dispatch({
                type: QUEST_UPDATE_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type: QUEST_UPDATE_ERROR,
                err
            })
        })

        firestore.collection('statistics').doc(id).update({title: quest.title});
    }
}
