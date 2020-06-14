import React, { Component } from 'react';
import { changeFilter } from '../actions/todosAction';
import { connect } from 'react-redux'

class TaskFilter extends Component {

    setFilter = async (filter) => {
        await this.props.changeFilter(filter);
    }

    render() {
        const filters = ['All', 'Completed', 'Priority', 'Today'];
        const elFilters = filters.map((filter, idx) => {
            return (<div className="filter" key={filter} onClick={(ev) => {this.setFilter(filter)}}>
                {filter}
            </div>)
        })

        return (
            <section className="filters-container flex row center space-evenly">
                {elFilters}
            </section>
        )
    }
}

const mapStateToProps = (state) =>{
    return{ 
        filterBy:state.todo.filterBy
    }
}

const mapDispatchToProps = {
    changeFilter
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskFilter)