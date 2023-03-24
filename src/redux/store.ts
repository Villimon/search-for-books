import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import booksReducer from './books-reducer';


let rootReducers = combineReducers({
    books: booksReducer
})

type RootReducersType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducersType>


export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))



export default store;
