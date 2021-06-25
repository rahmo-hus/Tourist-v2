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

const initState = {
    error: '',
    success: '',
    uploadProgress: 0,
    imageURL: '',
    gallery: [],
    uploadSuccess: false
}
const taskReducer = (state = initState, action) => {

    switch (action.type) {
        case CREATE_QUEST:
            return {
                ...state,
                inProgress: false,
                success: 'Uspjesno dodato'
            }
        case CREATE_QUEST_ERROR:
            return {
                ...state,
                inProgress: false,
                error: action.err
            }
        case ADDING_QUEST:
            return {
                ...state,
                inProgress: true
            }
        case UPLOAD_ERROR:
            return {
                ...state,
                err: action.err
            }

        case UPLOAD_PROGRESS:
            return {
                ...state,
                uploadProgress: action.uploadProgress
            }
        case GALLERY_UPLOAD_SUCCESS:
            return {
                ...state,
                gallery: action.gallery,
                uploadSuccess: action.success
            }
        case RESTORE_DEFAULTS:
            return {
                ...state,
                imageURL: action.imageURL,
                uploadProgress: action.uploadProgress,
                err: action.err,
                success: '',
                uploadSuccess: action.success
            }
        case QUEST_DELETE_SUCCESS:
            return state;
        case QUEST_DELETE_ERROR:
            return {
                ...state,
                err: action.err
            }
        case QUEST_UPDATE_SUCCESS:
            return state;
        case QUEST_UPDATE_ERROR:
            return {
                ...state,
                err: action.err
            }
        default:
            return state;
    }
}

export default taskReducer
