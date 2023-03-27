import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actions, getBooks } from '../../redux/books-reducer';
import { AnyAction } from 'redux';
import { AppStateType } from '../../redux/store';
import HeaderSelectBlock from './HeaderSelectBlock';




const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const value = useSelector((state: AppStateType) => state.books.value)
    const valueSorting = useSelector((state: AppStateType) => state.books.valueSorting)
    const valueCategories = useSelector((state: AppStateType) => state.books.valueCategories)


    const handleOnChangeSorting = (value: string) => {
        dispatch(actions.setValueSorting(value))
    }
    const handleOnChangeCategories = (value: string) => {
        dispatch(actions.setValueCategories(value))
    }

    const searchBooks = () => {
        navigate({ pathname: '/' });
        dispatch(getBooks(value, valueSorting, valueCategories) as unknown as AnyAction)
    }


    return (
        <header className="header">
            <div className="header__body">
                <h1 className="header__title">Search for books</h1>
                <div className="header__form">
                    <div className="header__search">
                        <input
                            type="text"
                            className="header__input"
                            placeholder='Поиск'
                            value={value}
                            onChange={(e) => dispatch(actions.setValue(e.target.value))}
                            onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
                        />
                        <button
                            className="header__btn"
                            onClick={searchBooks}
                        >
                            Найти
                        </button>
                    </div>
                    <div className="header__selects">
                        <HeaderSelectBlock
                            lable='Categories'
                            options={[
                                { value: '', name: 'all' },
                                { value: 'art', name: 'art' },
                                { value: 'biography', name: 'biography' },
                                { value: 'computers', name: 'computers' },
                                { value: 'history', name: 'history' },
                                { value: 'medical', name: 'medical' },
                                { value: 'poetry', name: 'poetry' },
                            ]}
                            value={valueCategories}
                            onChange={handleOnChangeCategories}
                        />
                        <HeaderSelectBlock
                            lable='Sorting by'
                            options={[
                                { value: 'relevance', name: 'relevance' },
                                { value: 'newest', name: 'newest' },
                            ]}
                            value={valueSorting}
                            onChange={handleOnChangeSorting}
                        />
                    </div>
                </div>
            </div>
        </header>

    );
}

export default Header;
