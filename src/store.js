import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import todosReducer from './reducers/todosReducer';
import foldersReducer from './reducers/folderReducer';

const rootReducer = combineReducers({
    todo:todosReducer,
    folder:foldersReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store;