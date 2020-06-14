import utilService from '../services/utilService'

// var localFolders = []
// if (sessionStorage.folders) localFolders = utilService.loadFromSession('folders');

var localCurrFolder = null;
if (sessionStorage.currFolder) localCurrFolder = utilService.loadFromSession('currFolder')


const INITIAL_STATE = {
    folders: [],
    currFolder: localCurrFolder
}


export default function foldersReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_FOLDERS':
            return {
                ...state,
                folders: action.folders
            }
        case 'SET_CURR_FOLDER':

            return {
                ...state,
                currFolder: action.folder
            }
        case 'ADD_FOLDER':
            //Check .... !
            var res = state.folders.findIndex((folder) => { return folder._id === action.addedFolder._id });
            var folders = (res !== -1) ? [...state.folders] : [...state.folders, action.addedFolder];
            return {
                ...state,
                folders
            }
        default:
            return state;
    }
}