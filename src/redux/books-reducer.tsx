import { ThunkAction } from "redux-thunk";
import { booksAPI } from "../api/api";
import { BookType, RequestBooksType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./store";


let initialState = {
    books: [] as BookType[],
    value: '',
    valueSorting: 'relevance',
    valueCategories: '',
    currentPage: 0,
    total: 0,
    error: '',
    isLoading: false,
    isLoadingButton: false
}


const booksReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'GET_BOOKS':
            return {
                ...state,
                books: action.payload.items as BookType[],
                total: action.payload.totalItems as number,
                error: '',
                isLoading: false,
            }
        case 'GET_MORE_BOOKS':
            return {
                ...state,
                books: [...state.books, ...action.payload.items] as BookType[],
                currentPage: state.currentPage + 1,
                isLoadingButton: false
            }
        case 'SET_VALUE':
            return {
                ...state,
                value: action.payload as string
            }
        case 'SET_VALUE_SORTING':
            return {
                ...state,
                valueSorting: action.payload as string
            }
        case 'SET_VALUE_CATEGORIES':
            return {
                ...state,
                valueCategories: action.payload as string
            }
        case 'SET_NOTHING_FOUND':
            return {
                ...state,
                error: 'Ничего не найден',
                books: [],
                total: 0,
                isLoading: false,
            }
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'SET_IS_LOADING_BUTTON':
            return {
                ...state,
                isLoadingButton: true
            }
        default:
            return state;
    }
}


export const actions = {
    getBooksAction: (data: RequestBooksType) => ({ type: 'GET_BOOKS', payload: data } as const),
    getMoreBooksAction: (data: RequestBooksType) => ({ type: 'GET_MORE_BOOKS', payload: data } as const),
    setValue: (value: string) => ({ type: 'SET_VALUE', payload: value } as const),
    setValueSorting: (value: string) => ({ type: 'SET_VALUE_SORTING', payload: value } as const),
    setValueCategories: (value: string) => ({ type: 'SET_VALUE_CATEGORIES', payload: value } as const),
    setNothingFound: () => ({ type: 'SET_NOTHING_FOUND' } as const),
    setIsLoading: () => ({ type: 'SET_IS_LOADING' } as const),
    setIsLoadingButton: () => ({ type: 'SET_IS_LOADING_BUTTON' } as const),
}









export const getBooks = (value: string, orderBy: string, category: string): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(actions.setIsLoading())
            let data = await booksAPI.getBooks(value, orderBy, category)
            if (data && data.totalItems !== 0) {
                dispatch(actions.getBooksAction(data))
            } if (data.totalItems == 0) {
                dispatch(actions.setNothingFound())
            }
        } catch (error) {
            console.log(error)
            alert('Не удалось выполнить запрос')
        }
    }
}

export const getMoreBooks = (value: string, orderBy: string, category: string, page: number): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(actions.setIsLoadingButton())
            let data = await booksAPI.getBooks(value, orderBy, category, page)
            if (data.items) {
                dispatch(actions.getMoreBooksAction(data))
            }
        } catch (error) {
            console.log(error)
            alert('Не удалось выполнить запрос')
        }
    }
}


export default booksReducer;



type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
