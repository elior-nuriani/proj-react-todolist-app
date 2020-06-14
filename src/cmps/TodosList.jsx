import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoPreview from '../cmps/TodoPreview';

class TodosList extends Component {

    filterTodos = (todos, filterBy) => {
        switch (filterBy) {
            case ('Completed'):
                return todos.filter((todo) => { return todo.isDone });
            case ('Priority'):
                return todos.filter((todo) => { return todo.isPriority })
            case ('Today'):
                return todos.filter((todo) => {
                    var today = new Date();
                    var dateTime = new Date(todo.lastDay)
                    const [,month,day,year] = dateTime.toDateString().split(' ');
                    const [,todayMonth,todayDay,todayYear] = today.toDateString().split(' ');
                    if(month === todayMonth && day === todayDay && year === todayYear) return true;
                    return false;
                })
            default:
                return todos;
        }
    }

    render() {
        const { todos, filterBy, folder } = this.props;
        console.log(folder)
        var folderTodos = todos.filter((todo) => {return todo.belongTo[0].toLowerCase() === folder.name.toLowerCase()})
        if(folder.name.toLowerCase() === 'all schedule') folderTodos = todos;
        
        const filterdTodos = this.filterTodos(folderTodos, filterBy);
        const elTodoList = filterdTodos.map((todo,idx) => {
            return (
                <TodoPreview todo={todo} key={idx} />
            )
        })

        return (<section>
            {elTodoList}
        </section>)
        
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos,
        filterBy: state.todo.filterBy,
        folder: state.folder.currFolder
    }
}

export default connect(mapStateToProps)(TodosList);