import React, { Component } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { addTodo, updateTodo } from '../actions/todosAction';
import { withRouter } from 'react-router-dom';
import utilService from '../services/utilService'


class Form extends Component {
    state = {
        todo: {
            task: '',
            belongTo: [],
            isPriority: false,
            isDone: false,
            lastDay: new Date()
        }
    }

    async componentDidMount() {
        const currFolder = await this.props.currFolder;
        this.setState((prevState) => {
            return {
                todo: {
                    ...prevState.todo,
                    belongTo: [currFolder.name]
                }
            }
        })
        const { id } = this.props;
        if (id) {
            var todos = await this.props.todos;
            if(!todos.length) todos = utilService.loadFromSession('todos');
            const todo = todos.find((todo) => { 
                return todo._id === id });
            this.setState((prevState) => {
                return {
                    todo
                }
            })
        }
    }

    handleInputChange = (ev, field) => {
        ev.persist();
        const { value } = ev.target;
        var val = (field.toLowerCase() === 'belongto') ? [value] : value;
        if (typeof val === 'string' && val.toLowerCase() === "true") val = !true;
        if (typeof val === 'string' && val.toLowerCase() === "false") val = !false;
        this.setState((prevState) => {
            return {
                todo: {
                    ...prevState.todo,
                    [field]: val
                }
            }
        })
    }

    handleInputChangeLastDay = (date) => {
        this.setState((prevState) => {
            return {
                todo: {
                    ...prevState.todo,
                    lastDay: new Date(date)
                }
            }
        })
    }

    sendForm = async (field) => {
        const { folders } = this.props;
        const { todo } = this.state;

        const res = folders.find((folder) => {
            return folder.name.toLowerCase() === todo.belongTo[0].toLowerCase();
        })
        if (res && todo.task) {
            todo.belongTo[0] = todo.belongTo[0].toLowerCase();
            await this.props[field](todo)
            console.log('Form Sent')
            this.props.history.push('/todos/' + this.props.currFolder._id)
        } else console.log('Folder Name Doesnt Exist Or Task Doesnt Exist')
    }


    useStyles = () => {
        makeStyles((theme) => ({
            root: {
                '&': {
                    width: '100%',
                },
            },
        }))
    };

    render() {
        const classes = this.useStyles();

        const { todo } = this.state;
        const isDone = (todo.isDone) ? true : false;
        const isPriority = (todo.isPriority) ? true : false;

        const { id } = this.props;
        const elBtn = (id) ?
            (<input className="btn-form" value="Edit Todo" type="button" onClick={() => {this.sendForm('updateTodo')}} />) :
            (<input className="btn-form" value="Add Todo" type="button" onClick={ () => {this.sendForm('addTodo')}} />);


        return (
            <form className="form flex column justify-start">
                <TextField onChange={(ev) => { this.handleInputChange(ev, 'belongTo') }}
                    value={todo.belongTo} className={classes} id="standard-basic" label="Folder Name" />
                <TextField onChange={(ev) => { this.handleInputChange(ev, 'task') }}
                    value={todo.task} className={classes} id="standard-basic" label="Your Task" />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">

                        <KeyboardDatePicker
                            className="date-picker"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="dd/MM/yyyy"
                            value={todo.lastDay}
                            onChange={(date) => { this.handleInputChangeLastDay(date) }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <div className="checkbox">
                    <label htmlFor="priority">Priority</label>
                    <input onChange={(ev) => { this.handleInputChange(ev, 'isPriority') }}
                        value={todo.isPriority} id="priority" type="checkbox" checked={isPriority} />
                </div>
                <div className="checkbox">
                    <label htmlFor="completed">Completed</label>
                    <input onChange={(ev) => { this.handleInputChange(ev, 'isDone') }}
                        value={todo.isDone} id="completed" type="checkbox" checked={isDone} />
                </div>

                {elBtn}
                
            </form>)
    }
}

const mapStateToProps = (state) => {
    return {
        currFolder: state.folder.currFolder,
        folders: state.folder.folders,
        todos: state.todo.todos
    }
}

const mapDispatchToProps = {
    addTodo,
    updateTodo
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form))