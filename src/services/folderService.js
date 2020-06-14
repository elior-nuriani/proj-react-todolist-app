import utilService from './utilService'

var gFolders = [];
_createFolders();

async function _createFolders() {
    var folders = utilService.loadFromSession('folders');
    gFolders = (folders)? folders :  [
        {_id:utilService.generateId(), name:'All Schedule'},
        {_id:utilService.generateId(), name:'Personal Errands'},
        {_id:utilService.generateId(), name:'Work Projects'},
        {_id:utilService.generateId(), name:'Grocery List'},
        {_id:utilService.generateId(), name:'University'},
    ]

    utilService.saveToSession('folders',gFolders)
}

async function query(){
    return gFolders;
}

async function addFolder(folder){
    folder.id = utilService.generateId()
    gFolders.push(folder);
    utilService.saveToSession('folders',gFolders)
    return folder;
}

async function removeFolder(id){
    var idx = gFolders.findIndex(folder => {
        return folder._id === id
    })
    gFolders.splice(idx,1);
    utilService.saveToSession('folders',gFolders)
    return;
}

async function getFolderById(id){
    const folder = gFolders.find((folder) => { return folder._id === id });
    utilService.saveToSession('currFolder',folder)
    return folder;
}

export default{
    addFolder,
    removeFolder,
    query,
    getFolderById
}