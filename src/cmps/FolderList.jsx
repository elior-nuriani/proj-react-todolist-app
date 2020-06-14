import React, { Component } from 'react';
import FolderPreview from './FolderPreview'

export default class FolderList extends Component {
    render() {
        const elFolders = this.props.folders.map((folder) => {
            return (
                    <FolderPreview key={folder._id} folder={folder}></FolderPreview>
            )
        })
        return (<section className="homepage-main flex row center space-between wrap">
            {elFolders}
        </section>)
    }
}