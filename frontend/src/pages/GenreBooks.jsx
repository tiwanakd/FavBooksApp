import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../api';
import Book from '../components/Book';

const GenreBooks = () => {

    const [ books, setBooks ] = useState([]);
    const {genre} = useParams()

    useEffect(() => {
        getGenreBooks();
    }, [genre]);

    const getGenreBooks = () => {
        api
            .get(`/api/genrebooks/?genre=${genre}`)
            .then(res => res.data)
            .then(data => setBooks(data))
            .catch(err => console.error(err));
    }

  return (
    <>
        <h1 className="display-2"><span style={{fontStyle: 'italic'}}>{genre}</span> Books</h1>
        <div className='book-container' style={{display:"flex", flexWrap:"wrap", justifyContent: "center", gap: "20px"}}>
            {books.map(book => <Book book={book} key={book.id}/>)}
        </div>
    </>
  )
}

export default GenreBooks