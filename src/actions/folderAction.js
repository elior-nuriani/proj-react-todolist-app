import folderService from '../services/folderService';

export const loadFolders = () => {
    return async (dispatch) => {
        const folders = await folderService.query();
        return dispatch({type:'SET_FOLDERS',folders}) 
    }
}

export const setCurrFolder = (folderId) => {
    return async (dispatch) => {
        const folder = await folderService.getFolderById(folderId);
        return dispatch({type:'SET_CURR_FOLDER',folder})
    }
}

export const addFolder = (folder) => {
    return async (dispatch) => {
        const addedFolder = await folderService.addFolder(folder);
        return dispatch({type:'ADD_FOLDER',addedFolder})
    }
}

