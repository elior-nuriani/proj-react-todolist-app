import React from 'react';

export default function TaskStas({ completeTodos, todos }) {
    return (
            <div className="tasks-stats flex row center space-evenly">
                <div className="flex row center">
                    <span className="count">
                        {todos.length}
                    </span>
                    <span className="count-desc">
                        Created Tasks
                        </span>
                </div>
                <div className="flex row center">
                    <span className="count">
                        {completeTodos.length}
                    </span>
                    <span className="count-desc">
                        Completed Tasks
                        </span>
                </div>
            </div>
    )
}