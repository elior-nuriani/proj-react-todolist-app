import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import Homepage from './views/Homepage';
import Todos from './views/Todos';
import TodoEdit from './views/TodoEdit';
import { connect } from 'react-redux'
import { loadFolders } from './actions/folderAction'
import { loadTodos } from './actions/todosAction'



class App extends Component {
  async componentDidMount() {
    await this.props.loadFolders();
    await this.props.loadTodos();

}
  render(){
    return (
      <section className="App container">
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/todos/:folderId" component={Todos}></Route>
          <Route exact path="/todos/todo/edit/:id?" component={TodoEdit}></Route>
        </Switch>
      </section> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    folders:state.folder.folders
  }
}

const mapDispatchToProps = {
  loadFolders,
  loadTodos
}


export default connect(mapStateToProps,mapDispatchToProps)(App)



