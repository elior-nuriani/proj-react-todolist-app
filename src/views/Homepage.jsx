import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import FolderList from '../cmps/FolderList';
import { connect } from 'react-redux';
import TaskStats from '../cmps/TaskStats';
import AddFolder from '../cmps/AddFolder';

class HomePage extends Component {
    state = {
        isAddFolderSectionOpen: false
    }

    changeSection = () => {
        this.setState((prevState) => {
            return {
                isAddFolderSectionOpen: !prevState.isAddFolderSectionOpen
            }
        })
    }


    render() {
        const { folders, todos } = this.props;
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date();
        const [day, shortMonth, numericDay, year] = date.toDateString().split(' ');
        const month = monthNames.find(monthName => { return monthName.startsWith(shortMonth) });

        const completeTodos = todos.filter((todo) => { return todo.isDone });

        const elSection = (!this.state.isAddFolderSectionOpen) ?
            (<TaskStats completeTodos={completeTodos} todos={todos} />) :
            (<AddFolder />)
        const elIconType = (!this.state.isAddFolderSectionOpen) ?
            (<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>) :
            (<FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>)


        return (
            <section>
                <div className="hero flex column align-start space-between">
                    <FontAwesomeIcon className="bars-icon" icon={faBars}></FontAwesomeIcon>
                    <h1>Welcome Back</h1>
                    <div className="hero-details flex row center space-between">
                        <div><span className="day">{day}</span>{month} {numericDay} , {year}</div>
                        <div className="celsius">24&deg;C</div>
                    </div>
                </div>
                {elSection}
                <div className="homepage-main-wrapper">
                    <FolderList folders={folders}></FolderList>
                </div>

                <div className="add flex column center" onClick={this.changeSection}>
                    {elIconType}
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        folders: state.folder.folders,
        todos: state.todo.todos
    }
}


export default connect(mapStateToProps)(HomePage)