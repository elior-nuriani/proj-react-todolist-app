import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import TaskFilter from '../cmps/TaskFilter';
import TodoList from '../cmps/TodosList';
import { Link } from 'react-router-dom'

class Todos extends Component {
    
    render() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date();
        const [, shortMonth, day, year] = date.toDateString().split(' ');
        const month = monthNames.find(monthName => { return monthName.startsWith(shortMonth) });
        const { currFolder } = this.props;
        const elCurr = (currFolder) ?
            (<div className="todos-header flex row center space-between">
                <FontAwesomeIcon icon={faArrowLeft} onClick={this.props.history.goBack} />
                <div className="todos-header-title flex column center space-between">
                    <span>{currFolder.name}</span>
                    <span>{month} {day} {year}</span>
                </div>
                <FontAwesomeIcon icon={faBars} />
            </div>) :

            (<div className="todos-header">Folder Doesnt Exicst</div>)

        return (
            <section className="todo-section-container">
                {elCurr}
                <TaskFilter />
                <TodoList />
                <Link className="add flex column center" to="todo/edit/">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </Link>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    const currFolder = state.folder.currFolder
    return {
        currFolder
    }
}


export default connect(mapStateToProps)(Todos)
