import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { booksAPI } from '../../api/api';
import { BookType } from '../../types/types';

import Preloader from '../Common/preloader/Preloader';






const Book = () => {
    const [currentBook, setCurrentBook] = useState<BookType>()
    const params = useParams()


    useEffect(() => {
        if (params.id) {
            booksAPI.getCurrentBook(params.id).then(response => {
                setCurrentBook(response.data)
            })
        }
    }, [params])

    if (!currentBook) {
        return <Preloader />
    }


    return (
        <section className="book">
            <div className="book__body">
                <div className="book__left">
                    <img src={currentBook?.volumeInfo.imageLinks?.thumbnail} alt="" />
                </div>
                <div className="book__info">
                    <div className="book__categories">
                        {currentBook?.volumeInfo.categories?.join(',').replace(/, /g, "/")}
                    </div>
                    <h2 className="book__title">{currentBook?.volumeInfo.title}</h2>
                    <h3 className="book__author">{currentBook?.volumeInfo.authors?.join(', ')}</h3>
                    <div className="book__description">
                        <p className="book__text">{currentBook?.volumeInfo.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Book;
