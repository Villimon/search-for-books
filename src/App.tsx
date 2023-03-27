import Books from './components/Page/Books';
import Book from './components/Page/Book';
import Header from './components/Header/Header';

import './styles/styles.scss'

import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";



function App() {

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/books/:id' element={<Book />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
