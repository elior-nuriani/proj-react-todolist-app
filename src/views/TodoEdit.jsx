import React, { Component } from 'react';
import Form from '../cmps/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class TodoEdit extends Component {
    render() {
        const { id } = this.props.match.params;
        const elSpanTitle = (id) ? <span>Edit Task Section</span> : <span>Create New Task</span>

        return (
            <section className="todo-edit-container">
                <div className="todos-header todo-edit flex row center space-between">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={this.props.history.goBack} />
                    <div className="todos-header-title flex column center space-between">
                        {elSpanTitle}
                    </div>
                    {/* Bars */}
                    <div></div>
                </div>
                <div className="todo-edit-main flex column">
                    <Form id={id}/>
                </div>
            </section>
        )
    }
}