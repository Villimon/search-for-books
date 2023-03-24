import axios from 'axios';
import { BookType, RequestBooksType } from '../types/types';


const instance = axios.create({
    baseURL: `https://www.googleapis.com/books/v1/volumes`

})


export const booksAPI = {
    getBooks(value: string, orderBy: string, category: string = '', page: number = 0) {
        let maxResults = 30
        let startIndex = maxResults * page

        return instance.get<RequestBooksType>(`?q=${value}+subject:${category}&orderBy=${orderBy}&maxResults=${maxResults}&startIndex=${startIndex}&key=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                return response.data
            })
    },
    getCurrentBook(id: string) {
        return instance.get<BookType>(`/${id}`)
    }
}