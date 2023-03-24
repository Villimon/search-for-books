import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { getMoreBooks } from '../../redux/books-reducer';
import { AppStateType } from '../../redux/store';

import Preloader from '../Common/preloader/Preloader';
import BooksItem from './BooksItem';






const Books = () => {
    const dispatch = useDispatch()

    const books = useSelector((state: AppStateType) => state.books.books)
    const totalItems = useSelector((state: AppStateType) => state.books.total)
    const value = useSelector((state: AppStateType) => state.books.value)
    const valueSorting = useSelector((state: AppStateType) => state.books.valueSorting)
    const valueCategories = useSelector((state: AppStateType) => state.books.valueCategories)
    const currentPage = useSelector((state: AppStateType) => state.books.currentPage)
    const error = useSelector((state: AppStateType) => state.books.error)
    const isLoading = useSelector((state: AppStateType) => state.books.isLoading)
    const isLoadingButton = useSelector((state: AppStateType) => state.books.isLoadingButton)

    const nextPage = currentPage + 1;


    const handleOnClick = () => {
        dispatch(getMoreBooks(value, valueSorting, valueCategories, nextPage) as unknown as AnyAction)
    }


    return (
        <section className="books">
            {
                isLoading
                    ? <Preloader />
                    : <div className="books__container">
                        {error && <h3 className="books__result">{error}</h3>}
                        {totalItems !== 0 && <h3 className="books__result">
                            Found {totalItems} results
                        </h3>}
                        <div className="books__body">
                            <div className="books__item item">
                                {books && books.map(book => (
                                    <BooksItem
                                        key={book.id}
                                        obj={book}
                                    />
                                ))
                                }
                            </div>
                        </div>
                        {books?.length < totalItems &&
                            <button
                                className={isLoadingButton ? "books__btn disabled" : "books__btn"}
                                onClick={handleOnClick}
                                disabled={isLoadingButton}
                            >
                                Load more
                            </button>}
                    </div>
            }
        </section>
    );
}

export default Books;
