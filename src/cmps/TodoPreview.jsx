import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheckCircle, faCalendarDay, faEdit, faTrashAlt, faStar, faMagic } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { updateTodo,removeTodo } from '../actions/todosAction'
import { withRouter } from 'react-router-dom'

class TodoPreview extends Component {
    state = {
        isTodoTabOpen: false
    }

    handleTodoClick = () => {
        this.setState((prevState) => {
            return {
                isTodoTabOpen: (!prevState.isTodoTabOpen)
            }
        })
    }

    removeTodo = async (ev,id) => {
        ev.stopPropagation();
        await this.props.removeTodo(id);
    }

    editTodo = async (ev,id) => {
        this.props.history.push('/todos/todo/edit/' + id);
    }

    changeTodo = async (ev,todo,property) => {
        ev.stopPropagation();
        var newTodo = Object.assign({},todo)
        newTodo[property] = !newTodo[property]
        await this.props.updateTodo(newTodo);
    }
    render() {
        const { todo } = this.props;
        const elMark = (todo.isDone) ?
            (<FontAwesomeIcon onClick={(ev) => {this.changeTodo(ev,todo,'isDone')}} className="todo-check-icon" icon={faCheckCircle} />) :
            (<FontAwesomeIcon onClick={(ev) => {this.changeTodo(ev,todo,'isDone')}} className="todo-check-icon" icon={faCircleNotch} />)
        const [, month, day, year] = new Date(todo.lastDay).toDateString().split(' ')

        const open = (this.state.isTodoTabOpen) ? 'open' : null;
        const priority = (todo.isPriority)? 'priority': null;
        const elTodo = (<div onClick={this.handleTodoClick}>
            <div className="todo-container-basic todo-container-open flex column justify-start align-start">
                <div className="todo-basic flex row center justify-start">
                    {elMark}
                    <div className="todo-info center align-start">
                        <div className="todo-title-main">{todo.task}</div>
                        <div className={`todo-title-second ${open}`}>
                            {todo.belongTo[0]}
                        </div>
                        <div className={`todo-last-day flex row center justify-start ${open}`}>
                            <FontAwesomeIcon icon={faCalendarDay} />
                            <span>
                                {month} {day} , {year}
                            </span>
                        </div>
                        <div className={`todo-container-more flex row center space-between ${open}`}>
                            <FontAwesomeIcon className="more-icon recycle" icon={faMagic} />
                            <FontAwesomeIcon onClick={(ev) => {this.changeTodo(ev,todo,'isPriority')}} className={`more-icon star ${priority}`} icon={faStar} />
                            <FontAwesomeIcon onClick={(ev) => {this.editTodo(ev,todo._id)}} className="more-icon edit" icon={faEdit} />
                            <FontAwesomeIcon onClick={(ev) => {this.removeTodo(ev,todo._id)}} className="more-icon remove" icon={faTrashAlt} />
                        </div>
                    </div>
                </div>
            </div>
        </div>)

        return (
            <div key={todo._id}>
                {elTodo}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        todos:state.todo.todos
    }
}


const mapDispatchToProps = {
    updateTodo,
    removeTodo
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(TodoPreview))