import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addFolder } from '../actions/folderAction';


class AddFolder extends Component {
    state = {
        folder: {
            name: ''
        }
    }

    handleInputChange = async (ev) => {
        ev.persist();
        var { value } = ev.target;
        this.setState((prevState) => {
            return {
                ...prevState,
                folder: {
                    ...prevState.folder,
                    name: value
                }
            }
        })
    }

    addFolder = async () => {
        var { folder } = this.state;
        var { folders } = this.props;

        var isFolderExist = folders.find((existFolder) => {
            return existFolder.name.toLowerCase() === folder.name.toLocaleLowerCase();
        })

        if (folder.name && !isFolderExist) {
            this.props.addFolder(folder);
            console.log('Folder Has Been Adden')
        } else console.log('Cannot Add Folder - Alreay Exist or Undefiend')
    }

    render() {
        return (
                <div className="input-folder flex row center">
                    <input onChange={(ev) => { this.handleInputChange(ev) }} type="text" placeholder="Type Folder Name" />
                    <button onClick={this.addFolder}>Add Folder</button>
                </div>
        
        )
    }
}

const mapStateToProps = (state) => {
    return {
        folders: state.folder.folders
    }
}

const mapDispatchToProps = {
    addFolder
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFolder)

