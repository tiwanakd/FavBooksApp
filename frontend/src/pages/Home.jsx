import React from 'react'
import api from '../api'
import { useState, useEffect } from 'react'
import Book from '../components/Book'
import "../styles/home.css"
import { ACCESS_TOKEN } from '../constants'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination'


const Home = ({ isHome = true }) => {

    const [ books, setBooks ] = useState([]);
    const token = localStorage.getItem(ACCESS_TOKEN);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(18);
    const navigate = useNavigate();

    const apiUrl = isHome ? "/api/books/" : "/api/mybooks/";

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = () => {

        if(isHome){
            api
                .get(apiUrl)
                .then(res => res.data)
                .then(data => {setBooks(data)})
                .catch(err => console.error(err));
        }
        else{
            api
                .get(apiUrl)
                .then(res => res.data)
                .then(data => {
                    const bookIds = data.map(item => item.book)
                    Promise.all(bookIds.map(id => api.get(`/api/books/${id}`)))
                    .then(responses => Promise.all(responses.map(res => res.data)))
                    .then(booksData  => {setBooks(booksData)})
                    .catch(err => console.error(err))
                })
                .catch(err => console.error(err));
        }
    }

    const addFavBook = (book) => {
        if(token){
            api.post("/api/mybooks/", {book: book}).then((res) => {
                if(res.status === 201){
                    toast.success('Book Added to Favorites.', {
                        autoClose:2000,
                        theme: "dark",
                    });
                }
                else alert("Unable to Add Book")
            }).catch(err => {
                if (err.response.data.message) {
                    toast.error("Book Already in your Favorites!", {
                        position:"top-center",
                        autoClose:2000,
                        theme: "dark",
                    });
                }
                else alert("Unable to Add Book. An unknown error occurred.");
            })
        }
        else{
            navigate("/login");
        }
    }

    const removeFromFav = (book_id) => {

        api.delete(`/api/mybooks/delete/?book=${book_id}`).then((res) => {
            if(res.status === 204) {
                toast.warn("Book Removed!", {
                    autoClose:2000,
                    theme: "dark",
                })
            }
            else alert ("Failed to delete Book");
            getBooks();
        }).catch((error) => alert(error));
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => {setCurrentPage(pageNumber); window.scrollTo(0, 0);}

    const bookComponet = isHome ? currentBooks.map(book => <Book book={book} key={book.id} addFavBook={addFavBook} isHome={true}/>) : 
                                  books.map(book => book.map(b => <Book book={b} key={b.id} isHome={false} removeFromFav={removeFromFav}/>))

    return (
        <>  
        
            <h1 className="display-2">{isHome ? "Books": "My Books"}</h1>
            <div className='book-container' style={{display:"flex", flexWrap:"wrap", justifyContent: "center", gap: "20px"}}>
                {bookComponet}
            </div>
            { books.length === 0 ? <h4 className='display-fav-books'>You do not have any books in your Favorites, please add books.</h4>: 
            <Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate} currentPage={currentPage}/>}
            
        </>
    )
}

export default Home