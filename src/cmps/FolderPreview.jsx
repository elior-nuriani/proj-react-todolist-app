import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrFolder } from '../actions/folderAction'


class FolderPreview extends Component {
    handleFolderClick = async (id) => {
        await this.props.setCurrFolder(id);
        this.props.history.push(`/todos/${id}`)
    }

    render() {
        const { folder, todos } = this.props;
        var folderTodos = todos.filter((todo) => { return todo.belongTo[0].toLowerCase() === folder.name.toLowerCase() })
        if (folder.name.toLowerCase() === 'all schedule') folderTodos = todos;

        return (
            <section className="folder-container flex row" onClick={() => { this.handleFolderClick(folder._id) }}>
                <FontAwesomeIcon className="homepage-icon" icon={faCircle}></FontAwesomeIcon>
                <div className="flex column">
                    <h3>{folder.name}</h3>
                    <span>{folderTodos.length} tasks</span>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos
    }
}

const maspDispatchToProps = {
    setCurrFolder
}
export default withRouter(connect(mapStateToProps,maspDispatchToProps)(FolderPreview))