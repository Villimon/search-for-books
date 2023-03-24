import React from 'react';

import { NavLink } from 'react-router-dom';
import { BookType } from '../../types/types';



type PropsType = {
    obj: BookType
}


const BooksItem: React.FC<PropsType> = ({ obj }) => {

    const path = '/books/' + obj.id

    return (
        <div className="item__column">
            <NavLink to={path} className="item__body" >
                <div className="item__img">
                    <img src={obj.volumeInfo.imageLinks?.thumbnail} alt="" />
                </div>
                <h4 className="item__categories">
                    {obj.volumeInfo.categories && obj.volumeInfo.categories[0]}
                </h4>
                <h3 className="item__title">{obj.volumeInfo.title}</h3>
                <h4 className="item__author">{obj.volumeInfo.authors?.join(', ')}</h4>
            </NavLink>
        </div>
    );
}

export default BooksItem;
