import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import LoginReducer from './Reducers/loginReducer';

const configureStore = () => {
    return createStore(
        LoginReducer,
        compose(applyMiddleware(thunk))
    );
};

export default configureStore;